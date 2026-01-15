"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DropdownArrow } from "../icons/DropDownArrow";
import { dynamicBlurDataUrl } from "~/app/_utils/ImageUtils";
import {
  gallerySections,
  type GalleryImage,
  type GallerySection,
} from "~/app/_data/gallerySections";
import { withGalleryBaseUrl } from "~/app/_utils/galleryImages";
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
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sections = useMemo<GallerySection[]>(() => (
    gallerySections.map((section) => ({
      ...section,
      images: section.images.map((image) => ({
        ...image,
        src: withGalleryBaseUrl(image.src),
      })),
    }))
  ), []);

  const [currentGalleryType, setCurrentGalleryType] = useState(() =>
    sections[0]?.id ?? "",
  );

  const [imagesWithBlur, setImagesWithBlur] = useState<
    Record<string, GalleryImage[]>
  >(() => {
    const initial: Record<string, GalleryImage[]> = {};
    sections.forEach((section) => {
      initial[section.id] = section.images.map((img) => ({
        ...img,
        blurDataURL: "",
      }));
    });
    return initial;
  });

  const loadBlurPlaceholders = useCallback(async () => {
    const blurredEntries = await Promise.all(
      sections.map(async (section) => ({
        id: section.id,
        images: await Promise.all(
          section.images.map(async (image) => ({
            ...image,
            blurDataURL: await dynamicBlurDataUrl(image.src),
          })),
        ),
      })),
    );
    const next: Record<string, GalleryImage[]> = {};
    blurredEntries.forEach(({ id, images }) => {
      next[id] = images;
    });
    setImagesWithBlur(next);
  }, [sections]);

  useEffect(() => {
    void loadBlurPlaceholders();
  }, [loadBlurPlaceholders]);

  const handleImageClick = (
    image: GalleryImage,
    index: number,
    galleryType: string,
  ) => {
    setIsLoading(true);
    setSelectedImage(image);
    setCurrentIndex(index);
    setCurrentGalleryType(galleryType);
    window.location.hash = `${galleryType}-${index}`;
  };

  const handlePrev = () => {
    const currentImages = imagesWithBlur[currentGalleryType] ?? [];
    const newIndex = (currentIndex - 1 + currentImages.length) %
      currentImages.length;
    setIsLoading(true);
    setSelectedImage(currentImages[newIndex] ?? null);
    setCurrentIndex(newIndex);
    window.location.hash = `${currentGalleryType}-${newIndex}`;
  };

  const handleNext = () => {
    const currentImages = imagesWithBlur[currentGalleryType] ?? [];
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
    const match = /^#([a-z0-9-]+)-(\d+)$/.exec(hash);
    if (match) {
      const galleryType = match[1] ?? "";
      const index = parseInt(match[2] ?? "0", 10);
      const currentImages = imagesWithBlur[galleryType] ?? [];

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
                <h2 id={`${sections[0]?.id ?? "gallery"}-gallery`} className="gallery-heading">
                  {sections[0]?.title ?? "Gallery"}
                </h2>
                <p className="text-sm sm:text-base text-[#2c2c2c] mt-4">
                  {sections[0]?.subtitle ?? ""}
                </p>
              </div>
              <div className="large-spacing-block"></div>
              <GalleryGrid
                images={imagesWithBlur[sections[0]?.id ?? ""] ?? []}
                onImageClick={(image, index) =>
                  handleImageClick(image, index, sections[0]?.id ?? "")}
              />

              {sections.slice(1).map((section) => (
                <div key={section.id}>
                  <div className="text-center mt-12">
                    <div className="spacing-block"></div>
                    <h2 id={`${section.id}-gallery`} className="gallery-heading">
                      {section.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[#2c2c2c] mt-4">
                      {section.subtitle}
                    </p>
                  </div>
                  <div className="large-spacing-block"></div>
                  <GalleryGrid
                    images={imagesWithBlur[section.id] ?? []}
                    onImageClick={(image, index) =>
                      handleImageClick(image, index, section.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedImage && (
        <Modal
          selectedImage={{
            src: selectedImage.src,
            alt: selectedImage.alt,
            width: imagesWithBlur[currentGalleryType]?.[currentIndex]?.width ?? 500,
            height: imagesWithBlur[currentGalleryType]?.[currentIndex]?.height ?? 500,
            blurDataURL: selectedImage.blurDataURL,
          }}
          onClose={() => {
            setSelectedImage(null);
            window.location.hash = `#${sections[0]?.id ?? "gallery"}-gallery`;
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
                      className={`absolute inset-0 w-full h-full object-cover rounded-lg ${aspectRatio > 1.2
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
