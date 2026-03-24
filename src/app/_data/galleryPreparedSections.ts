import preparedImageRecordsJson from "./generated/galleryPreparedImageRecords.json";
import type { GallerySectionData } from "./galleryTypes";

type PreparedImageRecordMap = Record<string, GallerySectionData["images"]>;

const preparedImageRecords = preparedImageRecordsJson as PreparedImageRecordMap;

const preparedSectionConfig = [
  {
    id: "lodge",
    title: "Lodge & Grounds",
    subtitle: "Explore the exterior, lobby, bamboo garden, and grounds.",
    recordKeys: [
      "images/gallery/lodge/exterior",
      "images/gallery/lodge/grounds",
      "images/gallery/lodge/bamboo-garden",
      "images/gallery/lodge/lobby",
    ],
  },
  {
    id: "rooms",
    title: "Rooms & Suites",
    subtitle: "Comfortable rooms for every kind of stay.",
    recordKeys: [
      "images/gallery/rooms/single",
      "images/gallery/rooms/double",
      "images/gallery/rooms/family-cottage",
      "images/gallery/rooms/twin",
      "images/gallery/rooms/triple",
    ],
  },
  {
    id: "dining",
    title: "Dining & Cuisine",
    subtitle: "A taste of Le Bambou, from restaurant to table.",
    recordKeys: [
      "images/gallery/dining/restaurant",
      "images/gallery/dining/food",
    ],
  },
  {
    id: "attractions",
    title: "Attractions & Culture",
    subtitle: "Discover the Ellen campus and Gorilla Guardians Village.",
    recordKeys: [
      "images/gallery/attractions/ellen-campus",
      "images/gallery/attractions/gorilla-guardians/cultural",
    ],
  },
  {
    id: "road-journey",
    title: "Road Journey",
    subtitle: "Scenes from the drive to Le Bambou.",
    recordKeys: [
      "images/gallery/road-journey",
    ],
  },
] as const;

const getPreparedImages = (recordKey: string) => {
  const images = preparedImageRecords[recordKey];

  if (!images) {
    throw new Error(`Missing prepared gallery record: ${recordKey}`);
  }

  return images;
};

export const galleryPreparedSections: GallerySectionData[] = preparedSectionConfig.map((section) => ({
  id: section.id,
  title: section.title,
  subtitle: section.subtitle,
  images: section.recordKeys.flatMap(getPreparedImages),
}));
