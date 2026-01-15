const baseUrl = (() => {
  if (typeof window === "undefined") {
    // Server-side
    return process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://lebambougorillalodge.com";
  } else {
    // Client-side
    return window.location.origin;
  }
})();

export async function dynamicBlurDataUrl(url: string) {
  // Support absolute URLs (e.g., Vercel Blob) and local paths
  const isAbsolute = /^https?:\/\//.test(url);
  const pathOnly = isAbsolute ? url : `/${url.startsWith("/") ? url.slice(1) : url}`;
  const optimizerUrl = `${baseUrl}/_next/image?url=${encodeURIComponent(pathOnly)}&w=16&q=50`;

  // Try fetching a tiny optimized image via Next's optimizer (small, cacheable under 2MB)
  try {
    const res = await fetch(
      optimizerUrl,
      typeof window === "undefined" ? { next: { revalidate: 86400 } } : undefined,
    );
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      const base64 = Buffer.from(new Uint8Array(buffer)).toString("base64");
      return `data:image/webp;base64,${base64}`;
    }
  } catch {
    // ignore and fall back
  }

  // Fallback: fetch original with no-store (avoids Next data cache) and inline it
  const res = await fetch(isAbsolute ? url : `${baseUrl}/${url.startsWith("/") ? url.slice(1) : url}`,
    { cache: "no-store" },
  );
  const buffer = await res.arrayBuffer();
  const lower = url.toLowerCase();
  const mime = lower.endsWith(".png") ? "image/png" : lower.endsWith(".webp") ? "image/webp" : "image/jpeg";
  return `data:${mime};base64,${Buffer.from(new Uint8Array(buffer)).toString("base64")}`;
}

// import imagemin from "imagemin";
// import imageminJpegtran from "imagemin-jpegtran";

// export async function getBase64ImageUrl(imageUrl: string) {
//   // Fetch image and convert it to base64
//   const response = await fetch(imageUrl);
//   const buffer = await response.arrayBuffer();

//   // Minify the image
//   const minified = await imagemin.buffer(Buffer.from(buffer), {
//     plugins: [imageminJpegtran()],
//   });

//   // Convert to base64
//   const base64 = Buffer.from(minified).toString("base64");
//   return `data:image/jpeg;base64,${base64}`;
// }
