"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DropdownArrow } from "../icons/DropDownArrow";
import { InteractiveLightboxImage } from "../InteractiveLightboxImage";
import {
  type GallerySectionClientData,
  type GallerySectionClientImage,
} from "./gallerySectionClientData";
import "./GallerySection.css";

const INITIAL_BATCH = 24;
const BATCH_SIZE = 24;
const GALLERY_GAP = 16;

type JustifiedRowItem = {
  image: GallerySectionClientImage;
  width: number;
  height: number;
};

type JustifiedRow = {
  items: JustifiedRowItem[];
  height: number;
};

const getRowTargetHeight = (containerWidth: number) => {
  if (containerWidth < 640) return Math.max(200, Math.round(containerWidth * 0.62));
  if (containerWidth < 1024) return 220;
  if (containerWidth < 1440) return 250;
  return 280;
};

const getOrientationRatio = (image: GallerySectionClientImage) => image.width / image.height;

const buildJustifiedRow = (
  images: GallerySectionClientImage[],
  containerWidth: number,
) => {
  const rowAspectSum = images.reduce((sum, image) => sum + getOrientationRatio(image), 0);
  const availableWidth = Math.max(containerWidth - (GALLERY_GAP * Math.max(images.length - 1, 0)), 1);
  const height = Math.max(160, Math.round(availableWidth / Math.max(rowAspectSum, 0.1)));
  let consumedWidth = 0;

  return {
    height,
    items: images.map((image, index) => {
      const remainingImages = images.length - index - 1;
      const remainingMinWidth = Math.max(remainingImages, 0);
      const proposedWidth = Math.max(
        1,
        Math.round(height * getOrientationRatio(image)),
      );
      const width = index === images.length - 1
        ? Math.max(1, availableWidth - consumedWidth)
        : Math.max(1, Math.min(proposedWidth, availableWidth - consumedWidth - remainingMinWidth));

      consumedWidth += width;

      return {
        image,
        height,
        width,
      };
    }),
  };
};

const normalizeTrailingRows = (
  rows: GallerySectionClientImage[][],
  containerWidth: number,
) => {
  if (rows.length < 2) {
    return rows;
  }

  const desiredMinTailCount = containerWidth < 640 ? 1 : containerWidth < 1024 ? 2 : 3;
  const lastRow = rows[rows.length - 1] ?? [];

  if (lastRow.length >= desiredMinTailCount) {
    return rows;
  }

  let tailStart = -1;
  for (let index = rows.length - 2; index >= 0; index -= 1) {
    if ((rows[index]?.length ?? 0) > desiredMinTailCount) {
      tailStart = index;
      break;
    }
  }

  if (tailStart < 0) {
    return rows;
  }

  const tailRows = rows.slice(tailStart);
  const flattened = tailRows.flat();
  const rowCount = tailRows.length;
  const baseCount = Math.floor(flattened.length / rowCount);
  const remainder = flattened.length % rowCount;

  const redistributed: GallerySectionClientImage[][] = [];
  let cursor = 0;

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    const count = baseCount + (rowIndex < remainder ? 1 : 0);
    redistributed.push(flattened.slice(cursor, cursor + count));
    cursor += count;
  }

  return [
    ...rows.slice(0, tailStart),
    ...redistributed,
  ];
};

const buildJustifiedRows = (
  images: GallerySectionClientImage[],
  containerWidth: number,
) => {
  if (!images.length || containerWidth <= 0) {
    return [] as JustifiedRow[];
  }

  const targetHeight = getRowTargetHeight(containerWidth);
  const targetAspectSum = Math.max(containerWidth / targetHeight, 1.15);
  const maxItemsPerRow = containerWidth < 640 ? 2 : containerWidth < 1024 ? 3 : 4;
  const minItemsPerRow = containerWidth < 640 ? 1 : 2;

  const rows: GallerySectionClientImage[][] = [];
  let currentRow: GallerySectionClientImage[] = [];
  let currentAspectSum = 0;

  images.forEach((image, index) => {
    currentRow.push(image);
    currentAspectSum += getOrientationRatio(image);

    const isLastImage = index === images.length - 1;
    const shouldCommit = isLastImage ||
      (currentRow.length >= minItemsPerRow && currentAspectSum >= targetAspectSum) ||
      currentRow.length >= maxItemsPerRow;

    if (shouldCommit) {
      rows.push(currentRow);
      currentRow = [];
      currentAspectSum = 0;
    }
  });

  const normalizedRows = normalizeTrailingRows(rows, containerWidth);

  return normalizedRows.map((row) => buildJustifiedRow(row, containerWidth));
};

const Modal = ({
  selectedImage,
  currentIndex,
  totalCount,
  onClose,
  onPrev,
  onNext,
  isLoading,
  onLoad,
}: {
  selectedImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isLoading: boolean;
  onLoad: () => void;
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

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/85 p-2 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="mx-auto flex h-full w-full max-w-[min(96vw,1700px)] flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 flex items-start justify-between gap-3 px-1 text-white sm:mb-3 sm:items-center sm:px-0">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium sm:text-base">{selectedImage.alt}</p>
            <p className="text-xs text-white/70 sm:text-sm">{currentIndex + 1} / {totalCount}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-white/12 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            aria-label="Close gallery image"
          >
            Close
          </button>
        </div>
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-black px-1 py-1 sm:bg-[#d7dfde] sm:px-14 sm:py-8">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#d7dfde]/65">
              <div className="h-16 w-16 animate-spin rounded-full border-8 border-solid border-blue-400 border-t-transparent" />
            </div>
          )}
          <button
            onClick={onPrev}
            className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-gray-900/65 p-3 text-white backdrop-blur transition hover:bg-gray-900/80 sm:block"
            aria-label="Previous image"
          >
            <DropdownArrow className="h-6 w-6" direction="left" />
          </button>
          <InteractiveLightboxImage
            src={selectedImage.src}
            alt={selectedImage.alt}
            width={selectedImage.width}
            height={selectedImage.height}
            isLoading={isLoading}
            onLoad={onLoad}
          />
          <button
            onClick={onNext}
            className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-gray-900/65 p-3 text-white backdrop-blur transition hover:bg-gray-900/80 sm:block"
            aria-label="Next image"
          >
            <DropdownArrow className="h-6 w-6" direction="right" />
          </button>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:hidden">
          <button
            onClick={onPrev}
            className="flex items-center justify-center gap-2 rounded-full bg-white/12 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20"
            aria-label="Previous image"
          >
            <DropdownArrow className="h-5 w-5" direction="left" />
            Prev
          </button>
          <button
            onClick={onNext}
            className="flex items-center justify-center gap-2 rounded-full bg-white/12 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20"
            aria-label="Next image"
          >
            Next
            <DropdownArrow className="h-5 w-5" direction="right" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const GallerySectionClient = ({
  sections,
}: {
  sections: GallerySectionClientData[];
}) => {
  const [selectedImage, setSelectedImage] = useState<GallerySectionClientImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentGalleryType, setCurrentGalleryType] = useState(
    sections[0]?.id ?? "gallery",
  );
  const [activeSectionIds, setActiveSectionIds] = useState<Record<string, boolean>>(
    () => ({
      [sections[0]?.id ?? "gallery"]: true,
    }),
  );
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    sections.forEach((section, index) => {
      initial[section.id] = index === 0
        ? Math.min(INITIAL_BATCH, section.images.length)
        : 0;
    });
    return initial;
  });
  const sentinelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const visibleSections = useMemo<GallerySectionClientData[]>(() => sections, [sections]);
  const firstSectionId = visibleSections[0]?.id ?? sections[0]?.id ?? "gallery";
  const activeSections = useMemo(() => (
    visibleSections.filter((section, index) => index === 0 || activeSectionIds[section.id])
  ), [activeSectionIds, visibleSections]);

  useEffect(() => {
    if (!firstSectionId) return;

    setActiveSectionIds((prev) => {
      if (prev[firstSectionId]) return prev;
      return { [firstSectionId]: true, ...prev };
    });
  }, [firstSectionId]);

  useEffect(() => {
    setVisibleCounts((prev) => {
      let changed = false;
      const next: Record<string, number> = {};

      visibleSections.forEach((section, index) => {
        const total = section.images.length;
        const current = prev[section.id] ?? 0;
        const isActive = index === 0 || activeSectionIds[section.id];
        const target = isActive
          ? Math.min(current || Math.min(INITIAL_BATCH, total), total)
          : 0;

        next[section.id] = target;
        if (target !== current) {
          changed = true;
        }
      });

      if (Object.keys(prev).length !== Object.keys(next).length) {
        changed = true;
      }

      return changed ? next : prev;
    });
  }, [activeSectionIds, visibleSections]);

  const activateSectionsThrough = useCallback((sectionId: string) => {
    const targetIndex = visibleSections.findIndex((section) => section.id === sectionId);
    if (targetIndex < 0) return;

    setActiveSectionIds((prev) => {
      let changed = false;
      const next = { ...prev };

      for (let index = 0; index <= targetIndex; index += 1) {
        const id = visibleSections[index]?.id;
        if (!id || next[id]) continue;
        next[id] = true;
        changed = true;
      }

      return changed ? next : prev;
    });
  }, [visibleSections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.getAttribute("data-gallery-section");
          if (!sectionId) return;

          setActiveSectionIds((prev) => {
            if (prev[sectionId]) return prev;
            return {
              ...prev,
              [sectionId]: true,
            };
          });
        });
      },
      { rootMargin: "1000px 0px" },
    );

    visibleSections.forEach((section, index) => {
      if (index === 0 || activeSectionIds[section.id]) return;

      const node = sectionRefs.current[section.id];
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [activeSectionIds, visibleSections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.getAttribute("data-section-id");
          if (!sectionId) return;

          const total = visibleSections.find((section) => section.id === sectionId)?.images.length ?? 0;
          if (!total) return;

          setVisibleCounts((prev) => {
            const count = prev[sectionId] ?? 0;
            if (count >= total) return prev;
            return {
              ...prev,
              [sectionId]: Math.min(count + BATCH_SIZE, total),
            };
          });
        });
      },
      { rootMargin: "900px 0px" },
    );

    activeSections.forEach((section) => {
      const node = sentinelRefs.current[section.id];
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [activeSections, visibleSections]);

  const getAllSectionImages = useCallback((sectionId: string) => (
    visibleSections.find((section) => section.id === sectionId)?.images ?? []
  ), [visibleSections]);

  const getRenderableImages = useCallback((sectionId: string) => (
    getAllSectionImages(sectionId).slice(0, visibleCounts[sectionId] ?? 0)
  ), [getAllSectionImages, visibleCounts]);

  const handleImageClick = (
    image: GallerySectionClientImage,
    index: number,
    galleryType: string,
  ) => {
    activateSectionsThrough(galleryType);
    setIsLoading(false);
    setSelectedImage(image);
    setCurrentIndex(index);
    setCurrentGalleryType(galleryType);
    window.location.hash = `${galleryType}-${index}`;
  };

  const handlePrev = () => {
    const currentImages = getAllSectionImages(currentGalleryType);
    if (!currentImages.length) return;

    const newIndex = (currentIndex - 1 + currentImages.length) %
      currentImages.length;
    setIsLoading(true);
    setSelectedImage(currentImages[newIndex] ?? null);
    setCurrentIndex(newIndex);
    window.location.hash = `${currentGalleryType}-${newIndex}`;
  };

  const handleNext = () => {
    const currentImages = getAllSectionImages(currentGalleryType);
    if (!currentImages.length) return;

    const newIndex = (currentIndex + 1) % currentImages.length;
    setIsLoading(true);
    setSelectedImage(currentImages[newIndex] ?? null);
    setCurrentIndex(newIndex);
    window.location.hash = `${currentGalleryType}-${newIndex}`;
  };

  useEffect(() => {
    const hash = window.location.hash;
    const match = /^#([a-z0-9-]+)-(\d+)$/.exec(hash);
    if (!match) return;

    const galleryType = match[1] ?? "";
    const index = parseInt(match[2] ?? "0", 10);
    const currentImages = getAllSectionImages(galleryType);

    if (index >= 0 && index < currentImages.length) {
      activateSectionsThrough(galleryType);
      setSelectedImage(currentImages[index] ?? null);
      setCurrentIndex(index);
      setCurrentGalleryType(galleryType);
    }
  }, [activateSectionsThrough, getAllSectionImages]);

  if (!visibleSections.length) {
    return null;
  }

  return (
    <section id="Gallery" className="gallery-section scroll-mt-32">
      <div className="padding">
        <div className="rounded-lg bg-[#b9c5c4] p-4">
          <div className="gallery-container-inner">
            <div id="Hotel-Gallery" className="scroll-mt-32" />
            {visibleSections.map((section, index) => {
              const isActive = index === 0 || activeSectionIds[section.id];

              return (
              <div
                key={section.id}
                className="w-full"
                ref={(node) => {
                  sectionRefs.current[section.id] = node;
                }}
                data-gallery-section={section.id}
              >
                <div className={`text-center ${index === 0 ? "" : "mt-12"}`}>
                  <div className="spacing-block" />
                  <h2 id={`${section.id}-gallery`} className="gallery-heading">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-sm text-[#2c2c2c] sm:text-base">
                    {section.subtitle}
                  </p>
                </div>
                <div className="large-spacing-block" />
                {isActive
                  ? (
                    <GalleryGrid
                      sectionIndex={index}
                      sectionId={section.id}
                      images={getRenderableImages(section.id)}
                      onImageClick={(image, imageIndex) =>
                        handleImageClick(image, imageIndex, section.id)}
                    />
                  )
                  : <div className="min-h-12" />}
                <div
                  ref={(node) => {
                    sentinelRefs.current[section.id] = node;
                  }}
                  data-section-id={section.id}
                  className="h-2"
                />
              </div>
              );
            })}
          </div>
        </div>
      </div>
      {selectedImage && (
        <Modal
          selectedImage={{
            src: selectedImage.lightboxSrc,
            alt: selectedImage.alt,
            width: getAllSectionImages(currentGalleryType)[currentIndex]?.width ?? 500,
            height: getAllSectionImages(currentGalleryType)[currentIndex]?.height ?? 500,
          }}
          currentIndex={currentIndex}
          totalCount={getAllSectionImages(currentGalleryType).length}
          onClose={() => {
            setSelectedImage(null);
            window.location.hash = `#${firstSectionId}-gallery`;
          }}
          onPrev={handlePrev}
          onNext={handleNext}
          isLoading={isLoading}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </section>
  );
};

const GalleryGrid = ({
  sectionIndex,
  sectionId,
  images,
  onImageClick,
}: {
  sectionIndex: number;
  sectionId: string;
  images: GallerySectionClientImage[];
  onImageClick: (image: GallerySectionClientImage, index: number) => void;
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const priorityCount = sectionIndex === 0 ? 8 : 4;
  const rows = useMemo(
    () => buildJustifiedRows(images, containerWidth),
    [containerWidth, images],
  );

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const updateWidth = () => {
      setContainerWidth(Math.round(node.clientWidth));
    };

    updateWidth();

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="gallery-stack">
      {(rows.length ? rows : buildJustifiedRows(images, 960)).map((row, rowIndex) => {
        const rowStartIndex = (rows.length ? rows : buildJustifiedRows(images, 960))
          .slice(0, rowIndex)
          .reduce((sum, previousRow) => sum + previousRow.items.length, 0);

        return (
          <div
            key={`${sectionId}-row-${rowIndex}`}
            className="gallery-row"
            style={{ gap: `${GALLERY_GAP}px`, height: `${row.height}px` }}
          >
            {row.items.map(({ image, width, height }, indexInRow) => {
              const absoluteIndex = rowStartIndex + indexInRow;
              const shouldPrioritize = absoluteIndex < priorityCount;

              return (
                <div
                  key={image.originalPath}
                  className="gallery-tile"
                  style={{ width: `${width}px`, flexBasis: `${width}px` }}
                >
                  <div className="group relative h-full overflow-hidden rounded-xl bg-[#c6cfce]">
                    <a
                      href="#"
                      className="block h-full w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        onImageClick(image, absoluteIndex);
                      }}
                    >
                      <Image
                        src={image.thumbSrc}
                        alt={image.alt}
                        priority={shouldPrioritize}
                        loading={shouldPrioritize ? "eager" : "lazy"}
                        fetchPriority={shouldPrioritize ? "high" : undefined}
                        unoptimized
                        sizes={`${Math.round(width)}px`}
                        className="h-full w-full rounded-xl object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
                        width={image.width}
                        height={image.height}
                        style={{ height: `${height}px`, width: `${width}px` }}
                        placeholder="empty"
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
