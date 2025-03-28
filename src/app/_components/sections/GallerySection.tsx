"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DropdownArrow } from "../icons/DropDownArrow";
import { dynamicBlurDataUrl } from "~/app/_utils/ImageUtils";
import Masonry from "react-masonry-css";
import "./GallerySection.css";

// Modal component for image previews
const Modal = ({
  selectedImage,
  onClose,
  onPrev,
  onNext,
  isLoading,
}: {
  selectedImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
    blurDataURL: string;
  };
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isLoading: boolean;
}) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-[#d7dfde] p-2 sm:p-5 rounded-lg max-h-screen overflow-auto min-w-80 min-h-60 md:min-h-[25rem] sm:min-w-[500px] max-w-[calc(100dvw-5%)]"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        {isLoading
          ? (
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2">
              <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-16 w-16">
              </div>
            </div>
          )
          : (
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              placeholder="blur"
              blurDataURL={selectedImage.blurDataURL}
              priority
              className="object-contain max-h-[calc(100dvh-100px)] max-w-full"
            />
          )}
        <button
          onClick={onPrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full m-2"
        >
          <DropdownArrow className="w-6 h-6" direction="left" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full m-2"
        >
          <DropdownArrow className="w-6 h-6" direction="right" />
        </button>
      </motion.div>
    </div>
  );
};

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<
    { src: string; alt: string; blurDataURL: string } | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentGalleryType, setCurrentGalleryType] = useState<
    "hotel" | "clients" | "checkIn" | "helene"
  >("hotel");

  const images = useMemo(() => ({
    hotel: [
      {
        src: "/images/rooms/single/Single-room-Entrance-door.jpg",
        alt: "Single room entrance door",
        width: 4608,
        height: 3072,
        blurDataURL: "",
      },
      {
        src: "/images/rooms/single/Single-Room-Exterior-View.jpg",
        alt: "Single room exterior view",
        width: 2592,
        height: 1728,
        blurDataURL: "",
      },
      {
        src: "/images/DSC_3622.jpg",
        alt: "DSC 3622",
        width: 4512,
        height: 3008,
        blurDataURL: "",
      },
      {
        src: "/images/DSC_3675.jpg",
        alt: "DSC 3675",
        width: 3008,
        height: 2000,
        blurDataURL: "",
      },
      {
        src: "/images/garden-2.jpg",
        alt: "Garden",
        width: 3718,
        height: 2479,
        blurDataURL: "",
      },
      {
        src: "/images/thumbnail_PXL_20230612_150622773.jpg",
        alt: "Thumbnail PXL",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
      {
        src: "/images/DSC_3546.jpg",
        alt: "DSC 3546",
        width: 4512,
        height: 3008,
        blurDataURL: "",
      },
      // {
      //   src: "/images/le-bambou-gorilla-lodge.jpg",
      //   alt: "Le Bambou Gorilla Lodge",
      //   width: 1100,
      //   height: 733,
      //   blurDataURL: "",
      // },
      {
        src: "/images/DSC_3572.jpg",
        alt: "DSC 3572",
        width: 4512,
        height: 3008,
        blurDataURL: "",
      },
      // {
      //   src: "/images/DSC_3563.jpg",
      //   alt: "DSC 3563",
      //   width: 4512,
      //   height: 3008,
      //   blurDataURL: "",
      // },
      // {
      //   src: "/images/rooms/lobby/lobby----Le-Bambou-Gorilla-Lodge.jpg",
      //   alt: "Lobby at Le Bambou Gorilla Lodge",
      //   width: 1594,
      //   height: 1063,
      //   blurDataURL: "",
      // },
    ],
    clients: [
      {
        src: "/images/client_experiences/relaxing/IMG_2649.webp",
        alt: "Client enjoying the lodge",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
      {
        src: "/images/client_experiences/relaxing/IMG_2650.webp",
        alt: "Client relaxing in the garden",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
      // {
      //   src: "/images/client_experiences/relaxing/IMG_2652.webp",
      //   alt: "Group photo at the lodge",
      //   width: 1920,
      //   height: 1080,
      //   blurDataURL: "",
      // },
      {
        src: "/images/client_experiences/relaxing/IMG_2656.webp",
        alt: "Guests enjoying dinner",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
      // {
      //   src: "/images/client_experiences/relaxing/IMG_2658.webp",
      //   alt: "Happy guests at the lodge",
      //   width: 1920,
      //   height: 1080,
      //   blurDataURL: "",
      // },
      // {
      //   src: "/images/client_experiences/relaxing/IMG_2659.webp",
      //   alt: "Guests having fun",
      //   width: 1920,
      //   height: 1080,
      //   blurDataURL: "",
      // },
    ],
    checkIn: [
      {
        src: "/images/client_experiences/checking_in/20240701_175712.webp",
        alt: "Clients checking in at the lodge",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
      // {
      //   src: "/images/client_experiences/checking_in/20240701_175738.webp",
      //   alt: "Clients receiving their keys",
      //   width: 1920,
      //   height: 1080,
      //   blurDataURL: "",
      // },
      {
        src: "/images/client_experiences/checking_in/20240701_175747.webp",
        alt: "Clients at the reception",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
      {
        src: "/images/client_experiences/checking_in/20240701_175717.webp",
        alt: "Clients enjoying welcome drinks",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
      // {
      //   src: "/images/client_experiences/checking_in/20240701_175744.webp",
      //   alt: "Clients with staff during check-in",
      //   width: 1920,
      //   height: 1080,
      //   blurDataURL: "",
      // },
    ],
    helene: [
      {
        src:
          "/images/Helene DeGeneres Campus/Cafeteria 2 inside Helene DeGeneres Campus.webp",
        alt: "Cafeteria 2 inside Helene DeGeneres Campus",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
      {
        src:
          "/images/Helene DeGeneres Campus/Cafeteria inside Helene DeGeneres Campus.webp",
        alt: "Cafeteria inside Helene DeGeneres Campus",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
      {
        src:
          "/images/Helene DeGeneres Campus/Entrance view at Helene DeGeneres Campus.webp",
        alt: "Entrance view at Helene DeGeneres Campus",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
      {
        src:
          "/images/Helene DeGeneres Campus/Exhibit inside Helene DeGeneres Campus.webp",
        alt: "Exhibit inside Helene DeGeneres Campus",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
      {
        src:
          "/images/Helene DeGeneres Campus/Landscape view of Helene DeGeneres Campus.webp",
        alt: "Landscape view of Helene DeGeneres Campus",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
      {
        src:
          "/images/Helene DeGeneres Campus/Map inside Helene DeGeneres Campus.webp",
        alt: "Map inside Helene DeGeneres Campus",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
      {
        src:
          "/images/Helene DeGeneres Campus/Path leading to Helene DeGeneres Campus.webp",
        alt: "Path leading to Helene DeGeneres Campus",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
      {
        src:
          "/images/Helene DeGeneres Campus/Sitting outside Helene DeGeneres Campus.webp",
        alt: "Sitting outside Helene DeGeneres Campus",
        width: 1920,
        height: 1080,
        blurDataURL: "",
      },
    ],
  }), []);

  const [imagesWithBlur, setImagesWithBlur] = useState<{
    hotel: Array<{
      src: string;
      alt: string;
      width: number;
      height: number;
      blurDataURL: string;
    }>;
    clients: Array<{
      src: string;
      alt: string;
      width: number;
      height: number;
      blurDataURL: string;
    }>;
    checkIn: Array<{
      src: string;
      alt: string;
      width: number;
      height: number;
      blurDataURL: string;
    }>;
    helene: Array<{
      src: string;
      alt: string;
      width: number;
      height: number;
      blurDataURL: string;
    }>;
  }>({
    hotel: images.hotel.map((img) => ({ ...img, blurDataURL: "" })),
    clients: images.clients.map((img) => ({ ...img, blurDataURL: "" })),
    checkIn: images.checkIn.map((img) => ({ ...img, blurDataURL: "" })),
    helene: images.helene.map((img) => ({ ...img, blurDataURL: "" })),
  });

  const loadBlurPlaceholders = useCallback(async () => {
    const hotelImagesWithBlur = await Promise.all(
      images.hotel.map(async (image) => ({
        ...image,
        blurDataURL: await dynamicBlurDataUrl(image.src),
      })),
    );
    const clientImagesWithBlur = await Promise.all(
      images.clients.map(async (image) => ({
        ...image,
        blurDataURL: await dynamicBlurDataUrl(image.src),
      })),
    );
    const checkInImagesWithBlur = await Promise.all(
      images.checkIn.map(async (image) => ({
        ...image,
        blurDataURL: await dynamicBlurDataUrl(image.src),
      })),
    );
    const heleneImagesWithBlur = await Promise.all(
      images.helene.map(async (image) => ({
        ...image,
        blurDataURL: await dynamicBlurDataUrl(image.src),
      })),
    );
    setImagesWithBlur({
      hotel: hotelImagesWithBlur,
      clients: clientImagesWithBlur,
      checkIn: checkInImagesWithBlur,
      helene: heleneImagesWithBlur,
    });
  }, [images]);

  useEffect(() => {
    void loadBlurPlaceholders();
  }, [loadBlurPlaceholders]);

  const handleImageClick = (
    image: { src: string; alt: string; blurDataURL: string },
    index: number,
    galleryType: "hotel" | "clients" | "checkIn" | "helene",
  ) => {
    setIsLoading(true);
    setSelectedImage(image);
    setCurrentIndex(index);
    setCurrentGalleryType(galleryType);
    window.location.hash = `${galleryType}-${index}`;
  };

  const handlePrev = () => {
    const currentImages = imagesWithBlur[currentGalleryType];
    const newIndex = (currentIndex - 1 + currentImages.length) %
      currentImages.length;
    setIsLoading(true);
    setSelectedImage(currentImages[newIndex] ?? null);
    setCurrentIndex(newIndex);
    window.location.hash = `${currentGalleryType}-${newIndex}`;
  };

  const handleNext = () => {
    const currentImages = imagesWithBlur[currentGalleryType];
    const newIndex = (currentIndex + 1) % currentImages.length;
    setIsLoading(true);
    setSelectedImage(currentImages[newIndex] ?? null);
    setCurrentIndex(newIndex);
    window.location.hash = `${currentGalleryType}-${newIndex}`;
  };

  useEffect(() => {
    if (selectedImage) {
      const img = new window.Image();
      img.src = selectedImage.src;
      img.onload = () => setIsLoading(false);
    }
  }, [selectedImage]);

  useEffect(() => {
    const hash = window.location.hash;
    const match = /^#(hotel|clients|checkIn|helene)-(\d+)$/.exec(hash);
    if (match) {
      const galleryType = match[1] as
        | "hotel"
        | "clients"
        | "checkIn"
        | "helene";
      const index = parseInt(match[2] ?? "0", 10);
      const currentImages = imagesWithBlur[galleryType];

      if (index >= 0 && index < currentImages.length) {
        setSelectedImage(currentImages[index] ?? null);
        setCurrentIndex(index);
        setCurrentGalleryType(galleryType);
      }
    }
  }, [imagesWithBlur]);

  return (
    <section className="gallery-section">
      <div className="padding">
        <div className="bg-[#b9c5c4] rounded-lg p-4">
          <div className="">
            <div className="gallery-container-inner">
              <div className="text-center">
                <div className="spacing-block"></div>
                <h2 id="Hotel-Gallery" className="gallery-heading">
                  Immerse Yourself in the Splendor:<br />Our Hotel Gallery
                </h2>
              </div>
              <div className="large-spacing-block"></div>
              <GalleryGrid
                images={imagesWithBlur.hotel}
                onImageClick={(image, index) =>
                  handleImageClick(image, index, "hotel")}
              />

              <div className="text-center mt-12">
                <div className="spacing-block"></div>
                <h2 id="Clients-Gallery" className="gallery-heading">
                  Cherished Moments:<br />Our Happy Guests
                </h2>
              </div>
              <div className="large-spacing-block"></div>
              <GalleryGrid
                images={imagesWithBlur.clients}
                onImageClick={(image, index) =>
                  handleImageClick(image, index, "clients")}
              />

              <div className="text-center mt-12">
                <div className="spacing-block"></div>
                <h2 id="Clients-Checking-In" className="gallery-heading">
                  Welcoming Our Guests:<br />Guests Check In Time
                </h2>
              </div>
              <div className="large-spacing-block"></div>
              <GalleryGrid
                images={imagesWithBlur.checkIn}
                onImageClick={(image, index) =>
                  handleImageClick(image, index, "checkIn")}
              />

              <div className="text-center mt-12">
                <div className="spacing-block"></div>
                <h2 id="Helene-Campus" className="gallery-heading">
                  Conservation Hub:<br />Helene DeGeneres Campus
                </h2>
              </div>
              <div className="large-spacing-block"></div>
              <GalleryGrid
                images={imagesWithBlur.helene}
                onImageClick={(image, index) =>
                  handleImageClick(image, index, "helene")}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedImage && (
        <Modal
          selectedImage={{
            src: selectedImage.src,
            alt: selectedImage.alt,
            width: images[currentGalleryType][currentIndex]?.width ?? 500,
            height: images[currentGalleryType][currentIndex]?.height ?? 500,
            blurDataURL: selectedImage.blurDataURL,
          }}
          onClose={() => {
            setSelectedImage(null);
            window.location.hash = "#Hotel-Gallery";
          }}
          onPrev={handlePrev}
          onNext={handleNext}
          isLoading={isLoading}
        />
      )}
    </section>
  );
};

const GalleryGrid = ({
  images,
  onImageClick,
}: {
  images: Array<
    {
      src: string;
      alt: string;
      width: number;
      height: number;
      blurDataURL: string;
    }
  >;
  onImageClick: (
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
      blurDataURL: string;
    },
    index: number,
  ) => void;
}) => {
  // Reduce number of columns for better layout
  const breakpointColumnsObj: {
    default: number;
    [key: number]: number;
  } = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  // Sort images by aspect ratio to better distribute them
  const sortedImages = [...images].sort((a, b) => {
    const aspectRatioA = a.width / a.height;
    const aspectRatioB = b.width / b.height;
    return aspectRatioB - aspectRatioA; // Sort from widest to tallest
  });

  return (
    <div className="w-full">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {sortedImages.map((image, index) => {
          const aspectRatio = image.width / image.height;
          // Calculate height based on aspect ratio to prevent layout shifts
          const containerStyle = {
            paddingBottom: `${(image.height / image.width) * 100}%`,
            position: "relative" as const,
          };

          return (
            <div key={index} className="mb-4 break-inside-avoid">
              <a
                href="#"
                className="block w-full relative"
                style={containerStyle}
                onClick={(e) => {
                  e.preventDefault();
                  onImageClick(image, index);
                }}
              >
                {!image.blurDataURL
                  ? (
                    <div className="absolute inset-0 animate-pulse bg-gray-400 rounded-lg" />
                  )
                  : (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      sizes="(max-width: 500px) 100vw, (max-width: 700px) 50vw, 33vw"
                      className={`absolute inset-0 w-full h-full object-cover rounded-lg ${
                        aspectRatio > 1.2
                          ? "landscape"
                          : aspectRatio < 0.8
                          ? "portrait"
                          : "square"
                      }`}
                      width={image.width}
                      height={image.height}
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                    />
                  )}
              </a>
            </div>
          );
        })}
      </Masonry>
    </div>
  );
};
