export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export type GallerySectionData = {
  id: string;
  title: string;
  subtitle: string;
  images: GalleryImage[];
};
