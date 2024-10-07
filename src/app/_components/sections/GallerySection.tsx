'use client'

import Image from 'next/image'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { DropdownArrow } from '../icons/DropDownArrow'
import { dynamicBlurDataUrl } from '~/app/_utils/ImageUtils'

// Modal component for image previews
const Modal = ({ selectedImage, onClose, onPrev, onNext, isLoading }: { selectedImage: { src: string; alt: string; width: number; height: number; blurDataURL: string }, onClose: () => void, onPrev: () => void, onNext: () => void, isLoading: boolean }) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-[#d7dfde] p-2 sm:p-5 rounded-lg max-h-screen overflow-auto min-w-80 min-h-60 md:min-h-[25rem] sm:min-w-[500px] max-w-[calc(100dvw-5%)]"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        {isLoading ? (
          <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-16 w-16"></div>
          </div>
        ) : (
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
        <button onClick={onPrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full m-2">
          <DropdownArrow className="w-6 h-6" direction="left" />
        </button>
        <button onClick={onNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full m-2">
          <DropdownArrow className="w-6 h-6" direction="right" />
        </button>
      </motion.div>
    </div>
  )
}

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string, blurDataURL: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = useMemo(() => [
    { src: '/images/Single-room-Entrance-door.jpg', alt: 'Single room entrance door', width: 4608, height: 3072 },
    { src: '/images/Single-Room-Exterior-View.jpg', alt: 'Single room exterior view', width: 2592, height: 1728 },
    { src: '/images/DSC_3622.jpg', alt: 'DSC 3622', width: 4512, height: 3008 },
    { src: '/images/DSC_3675.jpg', alt: 'DSC 3675', width: 3008, height: 2000 },
    { src: '/images/garden-2.jpg', alt: 'Garden', width: 3718, height: 2479 },
    { src: '/images/thumbnail_PXL_20230612_150622773.jpg', alt: 'Thumbnail PXL', width: 1920, height: 1080 },
    { src: '/images/DSC_3546.jpg', alt: 'DSC 3546', width: 4512, height: 3008 },
    { src: '/images/le-bambou-gorilla-lodge.jpg', alt: 'Le Bambou Gorilla Lodge', width: 1100, height: 733 },
    { src: '/images/DSC_3572.jpg', alt: 'DSC 3572', width: 4512, height: 3008 },
    { src: '/images/DSC_3563.jpg', alt: 'DSC 3563', width: 4512, height: 3008 },
    { src: '/images/lobby----Le-Bambou-Gorilla-Lodge.jpg', alt: 'Lobby at Le Bambou Gorilla Lodge', width: 1594, height: 1063 },
  ], [])

  const [imagesWithBlur, setImagesWithBlur] = useState<Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
    blurDataURL: string;
  }>>([]);
  
  const loadBlurPlaceholders = useCallback(async () => {
    const imagesWithBlurData = await Promise.all(
      images.map(async (image) => ({
        ...image,
        blurDataURL: await dynamicBlurDataUrl(image.src),
      }))
    );
    setImagesWithBlur(imagesWithBlurData);
  }, [images]);
  
  useEffect(() => {
    void loadBlurPlaceholders();
  }, [loadBlurPlaceholders]);

  const handleImageClick = (image: { src: string, alt: string, blurDataURL: string }, index: number) => {
    setIsLoading(true);
    setSelectedImage(image);
    setCurrentIndex(index);
    window.location.hash = `image-${index}`;
  }

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length
    setIsLoading(true)
    setSelectedImage(imagesWithBlur[newIndex] ?? null)
    setCurrentIndex(newIndex)
    window.location.hash = `image-${newIndex}`;
  }


  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length
    setIsLoading(true)
    setSelectedImage(imagesWithBlur[newIndex] ?? null)
    setCurrentIndex(newIndex)
    window.location.hash = `image-${newIndex}`;
  }

  useEffect(() => {
    if (selectedImage) {
      const img = new window.Image()
      img.src = selectedImage.src
      img.onload = () => setIsLoading(false)
    }
  }, [selectedImage])

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#image-')) {
      const index = parseInt(hash.replace('#image-', ''), 10);
      if (index >= 0 && index < imagesWithBlur.length) {
        setSelectedImage(imagesWithBlur[index] ?? null);
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
                <h2 id="Hotel-Gallery" className="gallery-heading">Immerse Yourself in the Splendor:<br />Our Hotel Gallery</h2>
              </div>
              <div className="large-spacing-block"></div>
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 mt-4 sm:space-y-4">
                {imagesWithBlur.length === 0 && !isLoading ? (
                  // Show skeleton loaders while loading
                  Array.from({ length: images.length }).map((_, index) => (
                    <div key={index} className="animate-pulse bg-gray-400 rounded-lg h-60 w-full mb-4"></div>
                  ))
                ) : (
                  imagesWithBlur.map((image, index) => (
                    <a
                      key={index}
                      href="#"
                      className="gallery-link w-full break-inside-avoid"
                      onClick={(e) => {
                        e.preventDefault()
                        handleImageClick(image, index)
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        sizes="(max-width: 479px) 86vw, (max-width: 767px) 82vw, (max-width: 991px) 26vw, 25vw"
                        className="gallery-image w-full object-cover mb-4"
                        width={image.width}
                        height={image.height}
                        placeholder="blur"
                        blurDataURL={image.blurDataURL}
                      />
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedImage && (
        <Modal
          selectedImage={{
            src: selectedImage.src,
            alt: selectedImage.alt,
            width: images[currentIndex]?.width ?? 500,
            height: images[currentIndex]?.height ?? 500,
            blurDataURL: selectedImage.blurDataURL,
          }}
          onClose={() => {
            setSelectedImage(null);
            window.location.hash = '#Hotel-Gallery';
          }}
          onPrev={handlePrev}
          onNext={handleNext}
          isLoading={isLoading}
        />
      )}
    </section>
  )
}
