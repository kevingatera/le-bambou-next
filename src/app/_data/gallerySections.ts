import { galleryLegacySections } from "./galleryLegacySections";
import { galleryPreparedSections } from "./galleryPreparedSections";
import type { GallerySectionData } from "./galleryTypes";

export type { GalleryImage, GallerySectionData } from "./galleryTypes";

export const gallerySections: GallerySectionData[] = [
  ...galleryPreparedSections,
  ...galleryLegacySections,
];
