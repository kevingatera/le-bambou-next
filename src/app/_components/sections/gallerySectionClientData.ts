import type { GallerySectionData } from "~/app/_data/gallerySections";
import { withGalleryBaseUrl } from "~/app/_utils/galleryImages";
import { getGalleryVariantPath } from "~/app/_utils/galleryImageVariants";

export type GallerySectionClientImage = GallerySectionData["images"][number] & {
  originalSrc: string;
  originalPath: string;
  thumbSrc: string;
  lightboxSrc: string;
};

export type GallerySectionClientData = Omit<GallerySectionData, "images"> & {
  images: GallerySectionClientImage[];
};

export const toGallerySectionClientData = (
  sections: GallerySectionData[],
): GallerySectionClientData[] =>
  sections.map((section) => ({
    ...section,
    images: section.images.map((image) => ({
      ...image,
      src: withGalleryBaseUrl(
        getGalleryVariantPath(image.src, "thumb") ?? image.src,
      ),
      originalSrc: withGalleryBaseUrl(image.src),
      originalPath: image.src,
      thumbSrc: withGalleryBaseUrl(
        getGalleryVariantPath(image.src, "thumb") ?? image.src,
      ),
      lightboxSrc: withGalleryBaseUrl(
        getGalleryVariantPath(image.src, "lightbox") ?? image.src,
      ),
    })),
  }));
