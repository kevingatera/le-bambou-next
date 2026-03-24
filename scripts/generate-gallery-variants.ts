import sharp from "sharp";
import { head, put } from "@vercel/blob";
import { gallerySections } from "../src/app/_data/gallerySections";
import { withGalleryBaseUrl } from "../src/app/_utils/galleryImages";
import {
  GALLERY_LIGHTBOX_QUALITY,
  GALLERY_LIGHTBOX_WIDTH,
  GALLERY_THUMB_QUALITY,
  GALLERY_THUMB_WIDTH,
  getGalleryVariantPath,
} from "../src/app/_utils/galleryImageVariants";

const force = process.argv.includes("--force");
const concurrency = Number(process.env.GALLERY_VARIANT_CONCURRENCY ?? "6");
const limit = Number(process.env.GALLERY_VARIANT_LIMIT ?? "0");
const match = process.env.GALLERY_VARIANT_MATCH ?? "";
const cacheControlMaxAge = 60 * 60 * 24 * 365;

const originals = gallerySections.flatMap((section) => section.images);

const allVariants = originals.flatMap((image) => [
  {
    kind: "thumb",
    originalPath: image.src,
    originalUrl: withGalleryBaseUrl(image.src),
    variantPath: getGalleryVariantPath(image.src, "thumb"),
    width: GALLERY_THUMB_WIDTH,
    quality: GALLERY_THUMB_QUALITY,
  },
  {
    kind: "lightbox",
    originalPath: image.src,
    originalUrl: withGalleryBaseUrl(image.src),
    variantPath: getGalleryVariantPath(image.src, "lightbox"),
    width: GALLERY_LIGHTBOX_WIDTH,
    quality: GALLERY_LIGHTBOX_QUALITY,
  },
]).filter((item) => item.variantPath);

const matchedVariants = match
  ? allVariants.filter((variant) => variant.originalPath.includes(match))
  : allVariants;
const variants = limit > 0 ? matchedVariants.slice(0, limit) : matchedVariants;

const processVariant = async (variant: typeof variants[number]) => {
  if (!variant.variantPath) {
    return { status: "skipped" as const, variant };
  }

  if (!force) {
    try {
      await head(variant.variantPath);
      return { status: "exists" as const, variant };
    } catch {
      // Upload below.
    }
  }

  const response = await fetch(variant.originalUrl, {
    headers: { "cache-control": "no-cache" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${variant.originalUrl}: ${response.status}`);
  }

  const inputBuffer = Buffer.from(await response.arrayBuffer());
  const outputBuffer = await sharp(inputBuffer)
    .rotate()
    .resize({
      width: variant.width,
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({
      quality: variant.quality,
      effort: 6,
    })
    .toBuffer();

  await put(variant.variantPath, outputBuffer, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge,
    contentType: "image/webp",
  });

  return { status: "uploaded" as const, variant, bytes: outputBuffer.length };
};

const queue = [...variants];
let uploaded = 0;
let exists = 0;
let skipped = 0;

const worker = async () => {
  while (queue.length) {
    const next = queue.shift();
    if (!next) return;

    const result = await processVariant(next);
    if (result.status === "uploaded") {
      uploaded += 1;
      console.log(`uploaded ${next.kind} ${next.variantPath} (${result.bytes} bytes)`);
    } else if (result.status === "exists") {
      exists += 1;
      console.log(`exists ${next.kind} ${next.variantPath}`);
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
    total: variants.length,
    uploaded,
    exists,
    skipped,
    force,
    concurrency,
    limit,
    match,
  }, null, 2),
);
