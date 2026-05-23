const STATIC_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTYnIGhlaWdodD0nMTAnIHZpZXdCb3g9JzAgMCAxNiAxMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSdub25lJz48cmVjdCB3aWR0aD0nMTYnIGhlaWdodD0nMTAnIGZpbGw9JyNiOWM1YzQnLz48cGF0aCBkPSdNMCwxMCBMMTYsMCBMMTYsMTAgWicgZmlsbD0nI2Q3ZGZkZScgZmlsbC1vcGFjaXR5PScwLjQ1Jy8+PC9zdmc+";

export async function dynamicBlurDataUrl(url: string) {
  void url;

  return STATIC_BLUR_DATA_URL;
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
