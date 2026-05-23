import { spawn } from "node:child_process";
import type { S3Client as S3ClientType } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { galleryPreparedRecords } from "../src/app/_data/galleryPreparedRecords";
import { gallerySections } from "../src/app/_data/gallerySections";
import {
  GALLERY_LIGHTBOX_QUALITY,
  GALLERY_LIGHTBOX_WIDTH,
  GALLERY_THUMB_QUALITY,
  GALLERY_THUMB_WIDTH,
  getGalleryVariantPath,
} from "../src/app/_utils/galleryImageVariants";

const uploadMode = process.env.R2_UPLOAD_MODE === "wrangler" ? "wrangler" : "s3";

const requiredEnvVars =
  uploadMode === "s3"
    ? ([
        "R2_ACCOUNT_ID",
        "R2_ACCESS_KEY_ID",
        "R2_SECRET_ACCESS_KEY",
        "R2_BUCKET",
      ] as const)
    : (["R2_BUCKET"] as const);

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`${key} is required`);
  }
}

const force = process.argv.includes("--force");
const includeOriginals = !process.argv.includes("--variants-only");
const concurrency = Number(
  process.env.GALLERY_VARIANT_CONCURRENCY ??
    (uploadMode === "wrangler" ? "2" : "6"),
);
const limit = Number(process.env.GALLERY_VARIANT_LIMIT ?? "0");
const match = process.env.GALLERY_VARIANT_MATCH ?? "";
const sourceBaseUrl = (
  process.env.GALLERY_SOURCE_BASE_URL ??
  process.env.NEXT_PUBLIC_GALLERY_BASE_URL ??
  ""
).replace(/\/$/, "");

const bucket = process.env.R2_BUCKET!;
const cacheControl = "public, max-age=31536000, immutable";

let s3ClientPromise: Promise<S3ClientType> | undefined;

const getS3Client = async () => {
  s3ClientPromise ??= import("@aws-sdk/client-s3").then(({ S3Client }) => {
    return new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        sessionToken: process.env.R2_SESSION_TOKEN,
      },
    });
  });

  return s3ClientPromise;
};

const withSourceBaseUrl = (path: string) =>
  path.startsWith("http://") || path.startsWith("https://")
    ? path
    : `${sourceBaseUrl}${path}`;

const getObjectKey = (path: string) => path.replace(/^\//, "");

const getContentType = (path: string) => {
  const lower = path.toLowerCase();
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".mp4")) return "video/mp4";
  return "application/octet-stream";
};

const objectExists = async (key: string) => {
  if (uploadMode === "wrangler") {
    return false;
  }

  try {
    const { HeadObjectCommand } = await import("@aws-sdk/client-s3");
    const client = await getS3Client();
    await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch {
    return false;
  }
};

const fetchOriginal = async (path: string) => {
  if (!sourceBaseUrl && !path.startsWith("http")) {
    throw new Error(
      "GALLERY_SOURCE_BASE_URL or NEXT_PUBLIC_GALLERY_BASE_URL is required to fetch gallery originals",
    );
  }

  const response = await fetch(withSourceBaseUrl(path), {
    headers: { "cache-control": "no-cache" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  return Buffer.from(await response.arrayBuffer());
};

const uploadObject = async (path: string, body: Buffer, contentType: string) => {
  if (uploadMode === "wrangler") {
    await uploadWithWrangler(path, body, contentType);
    return;
  }

  const { PutObjectCommand } = await import("@aws-sdk/client-s3");
  const client = await getS3Client();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: getObjectKey(path),
      Body: body,
      ContentType: contentType,
      CacheControl: cacheControl,
    }),
  );
};

const uploadWithWrangler = async (
  path: string,
  body: Buffer,
  contentType: string,
) => {
  const key = getObjectKey(path);
  const args = [
    "wrangler",
    "r2",
    "object",
    "put",
    `${bucket}/${key}`,
    "--remote",
    "--pipe",
    "--content-type",
    contentType,
    "--cache-control",
    cacheControl,
    "--force",
  ];

  await new Promise<void>((resolve, reject) => {
    const child = spawn("npx", args, {
      stdio: ["pipe", "ignore", "pipe"],
    });
    let stderr = "";

    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          `wrangler upload failed for ${path} with exit code ${code}: ${stderr}`,
        ),
      );
    });
    child.stdin.end(body);
  });
};

const allOriginals = [
  ...gallerySections.flatMap((section) => section.images),
  ...Object.values(galleryPreparedRecords).flat(),
];
const originals = Array.from(
  new Map(allOriginals.map((image) => [image.src, image])).values(),
);
const matchedOriginals = match
  ? originals.filter((image) => image.src.includes(match))
  : originals;
const selectedOriginals = limit > 0 ? matchedOriginals.slice(0, limit) : matchedOriginals;

const workItems = selectedOriginals.flatMap((image) => {
  const variants = [
    {
      kind: "thumb" as const,
      originalPath: image.src,
      outputPath: getGalleryVariantPath(image.src, "thumb"),
      width: GALLERY_THUMB_WIDTH,
      quality: GALLERY_THUMB_QUALITY,
    },
    {
      kind: "lightbox" as const,
      originalPath: image.src,
      outputPath: getGalleryVariantPath(image.src, "lightbox"),
      width: GALLERY_LIGHTBOX_WIDTH,
      quality: GALLERY_LIGHTBOX_QUALITY,
    },
  ].filter((item) => item.outputPath);

  return includeOriginals
    ? [
        {
          kind: "original" as const,
          originalPath: image.src,
          outputPath: image.src,
        },
        ...variants,
      ]
    : variants;
});

const sourceCache = new Map<string, Promise<Buffer>>();

const getOriginalBuffer = (path: string) => {
  const cached = sourceCache.get(path);
  if (cached) return cached;
  const promise = fetchOriginal(path);
  sourceCache.set(path, promise);
  return promise;
};

const processItem = async (item: typeof workItems[number]) => {
  if (!item.outputPath) {
    return { status: "skipped" as const, item };
  }

  const key = getObjectKey(item.outputPath);
  if (!force && await objectExists(key)) {
    return { status: "exists" as const, item };
  }

  const inputBuffer = await getOriginalBuffer(item.originalPath);
  const outputBuffer = item.kind === "original"
    ? inputBuffer
    : await sharp(inputBuffer)
      .rotate()
      .resize({
        width: item.width,
        withoutEnlargement: true,
        fit: "inside",
      })
      .webp({
        quality: item.quality,
        effort: 6,
      })
      .toBuffer();

  await uploadObject(item.outputPath, outputBuffer, getContentType(item.outputPath));

  return { status: "uploaded" as const, item, bytes: outputBuffer.length };
};

const queue = [...workItems];
let uploaded = 0;
let exists = 0;
let skipped = 0;

const worker = async () => {
  while (queue.length) {
    const next = queue.shift();
    if (!next) return;

    const result = await processItem(next);
    if (result.status === "uploaded") {
      uploaded += 1;
      console.log(`uploaded ${next.kind} ${next.outputPath} (${result.bytes} bytes)`);
    } else if (result.status === "exists") {
      exists += 1;
      console.log(`exists ${next.kind} ${next.outputPath}`);
    } else {
      skipped += 1;
      console.log(`skipped ${next.kind} ${next.originalPath}`);
    }
  }
};

await Promise.all(
  Array.from({ length: Math.max(1, concurrency) }, () => worker()),
);

console.log(
  JSON.stringify({
    total: workItems.length,
    uploaded,
    exists,
    skipped,
    force,
    includeOriginals,
    concurrency,
    limit,
    match,
    bucket,
    uploadMode,
  }, null, 2),
);
