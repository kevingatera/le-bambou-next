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
  // Remove leading slash if present
  const imagePath = url.startsWith("/") ? url.slice(1) : url;

  const base64str = await fetch(`${baseUrl}/${imagePath}`)
    .then(async (res) => {
      const arrayBuffer = await res.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      return Buffer.from(uint8Array).toString("base64");
    });

  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1' />
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
      href='data:image/jpeg;base64,${base64str}' />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
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
