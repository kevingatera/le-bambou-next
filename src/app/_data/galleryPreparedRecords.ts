import preparedImageRecordsJson from "./generated/galleryPreparedImageRecords.json";
import type { GallerySectionData } from "./galleryTypes";

type PreparedImageRecordMap = Record<string, GallerySectionData["images"]>;

export const galleryPreparedRecords =
  preparedImageRecordsJson as PreparedImageRecordMap;

export const getPreparedGalleryImages = (recordKey: string) => {
  const images = galleryPreparedRecords[recordKey];

  if (!images) {
    throw new Error(`Missing prepared gallery record: ${recordKey}`);
  }

  return images;
};
