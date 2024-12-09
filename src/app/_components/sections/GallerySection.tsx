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

  const images = useMemo(() => ({
    hotel: [
      {
        src: "/images/Single-room-Entrance-door.jpg",
        alt: "Single room entrance door",
        width: 4608,
        height: 3072,
      },
      {
        src: "/images/Single-Room-Exterior-View.jpg",
        alt: "Single room exterior view",
        width: 2592,
        height: 1728,
      },
      {
        src: "/images/DSC_3622.jpg",
        alt: "DSC 3622",
        width: 4512,
        height: 3008,
      },
      {
        src: "/images/DSC_3675.jpg",
        alt: "DSC 3675",
        width: 3008,
        height: 2000,
      },
      { src: "/images/garden-2.jpg", alt: "Garden", width: 3718, height: 2479 },
      {
        src: "/images/thumbnail_PXL_20230612_150622773.jpg",
        alt: "Thumbnail PXL",
        width: 1920,
        height: 1080,
      },
      {
        src: "/images/DSC_3546.jpg",
        alt: "DSC 3546",
        width: 4512,
        height: 3008,
      },
      {
        src: "/images/le-bambou-gorilla-lodge.jpg",
        alt: "Le Bambou Gorilla Lodge",
        width: 1100,
        height: 733,
      },
      {
        src: "/images/DSC_3572.jpg",
        alt: "DSC 3572",
        width: 4512,
        height: 3008,
      },
      {
        src: "/images/DSC_3563.jpg",
        alt: "DSC 3563",
        width: 4512,
        height: 3008,
      },
      {
        src: "/images/lobby----Le-Bambou-Gorilla-Lodge.jpg",
        alt: "Lobby at Le Bambou Gorilla Lodge",
        width: 1594,
        height: 1063,
      },
    ],
    clients: [
      {
        src: "/images/clients_relaxing/IMG_2649.webp",
        alt: "Client enjoying the lodge",
        width: 1920,
        height: 1080,
      },
      {
        src: "/images/clients_relaxing/IMG_2650.webp",
        alt: "Client relaxing in the garden",
        width: 1920,
        height: 1080,
      },
      {
        src: "/images/clients_relaxing/IMG_2652.webp",
        alt: "Group photo at the lodge",
        width: 1920,
        height: 1080,
      },
      {
        src: "/images/clients_relaxing/IMG_2656.webp",
        alt: "Guests enjoying dinner",
        width: 1920,
        height: 1080,
      },
      {
        src: "/images/clients_relaxing/IMG_2658.webp",
        alt: "Happy guests at the lodge",
        width: 1920,
        height: 1080,
      },
      {
        src: "/images/clients_relaxing/IMG_2659.webp",
        alt: "Guests having fun",
        width: 1920,
        height: 1080,
      },
    ],
    checkIn: [
      {
        src: "/images/client_checking_in/20240701_175712.webp",
        alt: "Clients checking in at the lodge",
        width: 1920,
        height: 1080,
      },
      {
        src: "/images/client_checking_in/20240701_175738.webp",
        alt: "Clients receiving their keys",
        width: 1920,
        height: 1080,
      },
      {
        src: "/images/client_checking_in/20240701_175747.webp",
        alt: "Clients at the reception",
        width: 1920,
        height: 1080,
      },
      {
        src: "/images/client_checking_in/20240701_175717.webp",
        alt: "Clients enjoying welcome drinks",
        width: 1920,
        height: 1080,
      },
      {
        src: "/images/client_checking_in/20240701_175744.webp",
        alt: "Clients with staff during check-in",
        width: 1920,
        height: 1080,
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
  }>({
    hotel: images.hotel.map((img) => ({ ...img, blurDataURL: "" })),
    clients: images.clients.map((img) => ({ ...img, blurDataURL: "" })),
    checkIn: images.checkIn.map((img) => ({ ...img, blurDataURL: "" })),
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
    setImagesWithBlur({
      hotel: hotelImagesWithBlur,
      clients: clientImagesWithBlur,
      checkIn: checkInImagesWithBlur,
    });
  }, [images]);

  useEffect(() => {
    void loadBlurPlaceholders();
  }, [loadBlurPlaceholders]);

  const handleImageClick = (
    image: { src: string; alt: string; blurDataURL: string },
    index: number,
  ) => {
    setIsLoading(true);
    setSelectedImage(image);
    setCurrentIndex(index);
    window.location.hash = `image-${index}`;
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + images.hotel.length) %
      images.hotel.length;
    setIsLoading(true);
    setSelectedImage(imagesWithBlur.hotel[newIndex] ?? null);
    setCurrentIndex(newIndex);
    window.location.hash = `image-${newIndex}`;
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.hotel.length;
    setIsLoading(true);
    setSelectedImage(imagesWithBlur.hotel[newIndex] ?? null);
    setCurrentIndex(newIndex);
    window.location.hash = `image-${newIndex}`;
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
    if (hash.startsWith("#image-")) {
      const index = parseInt(hash.replace("#image-", ""), 10);
      if (index >= 0 && index < imagesWithBlur.hotel.length) {
        setSelectedImage(imagesWithBlur.hotel[index] ?? null);
        setCurrentIndex(index);
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
                onImageClick={handleImageClick}
                isLoading={isLoading}
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
                onImageClick={handleImageClick}
                isLoading={isLoading}
              />

              <div className="text-center mt-12">
                <div className="spacing-block"></div>
                <h2 id="Clients-Checking-In" className="gallery-heading">
                  Welcoming Our Guests:<br />Clients Checking In
                </h2>
              </div>
              <div className="large-spacing-block"></div>
              <GalleryGrid
                images={imagesWithBlur.checkIn}
                onImageClick={handleImageClick}
                isLoading={isLoading}
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
            width: images.hotel[currentIndex]?.width ?? 500,
            height: images.hotel[currentIndex]?.height ?? 500,
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
  isLoading,
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
  isLoading: boolean;
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
