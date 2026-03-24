const IMAGES_ROOT = "/images/";
const GALLERY_ROOT = "/images/gallery/";
const GALLERY_VARIANT_ROOT = "/images/gallery-variants/";
const IMAGE_VARIANT_ROOT = "/images/variants/";

export const GALLERY_THUMB_WIDTH = 960;
export const GALLERY_LIGHTBOX_WIDTH = 1800;
export const GALLERY_THUMB_QUALITY = 72;
export const GALLERY_LIGHTBOX_QUALITY = 86;

export type GalleryVariant = "thumb" | "lightbox";

export const getGalleryPathname = (src: string) => {
  if (!src) return null;

  if (src.startsWith("http://") || src.startsWith("https://")) {
    try {
      return new URL(src).pathname;
    } catch {
      return null;
    }
  }

  return src.startsWith("/") ? src : `/${src}`;
};

export const isGalleryOriginalPath = (pathname: string) =>
  pathname.startsWith(IMAGES_ROOT) &&
  !pathname.startsWith(GALLERY_VARIANT_ROOT) &&
  !pathname.startsWith(IMAGE_VARIANT_ROOT);

export const getGalleryVariantPath = (originalPath: string, variant: GalleryVariant) => {
  const pathname = getGalleryPathname(originalPath);
  if (!pathname || !isGalleryOriginalPath(pathname)) {
    return null;
  }

  const variantPath = pathname.startsWith(GALLERY_ROOT)
    ? pathname.replace(GALLERY_ROOT, `${GALLERY_VARIANT_ROOT}${variant}/`)
    : pathname.replace(IMAGES_ROOT, `${IMAGE_VARIANT_ROOT}${variant}/`);

  return variantPath.replace(/\.(jpe?g|png)$/i, ".webp");
};

export const getGalleryVariantPaths = (originalPath: string) => {
  const pathname = getGalleryPathname(originalPath);
  if (!pathname || !isGalleryOriginalPath(pathname)) {
    return [];
  }

  if (pathname.startsWith(GALLERY_ROOT)) {
    return [
      getGalleryVariantPath(pathname, "thumb"),
      getGalleryVariantPath(pathname, "lightbox"),
    ].filter((value): value is string => Boolean(value));
  }

  return [
    getGalleryVariantPath(pathname, "thumb"),
    getGalleryVariantPath(pathname, "lightbox"),
  ].filter((value): value is string => Boolean(value));
};
