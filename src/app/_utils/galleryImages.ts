const galleryBaseUrl = process.env.NEXT_PUBLIC_GALLERY_BASE_URL ?? "";
const normalizedBaseUrl = galleryBaseUrl.replace(/\/$/, "");

export const withGalleryBaseUrl = (path: string) =>
  normalizedBaseUrl ? `${normalizedBaseUrl}${path}` : path;
