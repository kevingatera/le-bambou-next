import {
  gallerySections,
} from "~/app/_data/gallerySections";
import { GallerySectionClient } from "./GallerySectionClient";
import { toGallerySectionClientData } from "./gallerySectionClientData";

const sections = toGallerySectionClientData(gallerySections);

export const GallerySection = () => {
  return <GallerySectionClient sections={sections} />;
};
