"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { BookingSection } from "./BookingSection";
import { standardRoomShowcases } from "~/app/_data/roomShowcase";
import { withGalleryBaseUrl } from "~/app/_utils/galleryImages";
import { getGalleryVariantPath } from "~/app/_utils/galleryImageVariants";
import { roomPrices, type RoomType } from "~/types/booking";
import { InteractiveLightboxImage } from "../InteractiveLightboxImage";
import {
    getStoredBookingData,
    setStoredBookingData,
} from "~/app/_utils/localStorage";
import { InfoCircle } from "../icons/InfoCirlce";
import { DropdownArrow } from "../icons/DropDownArrow";
import { motion } from "framer-motion";

const BoardTypeInfo = {
    fullBoard: "Includes breakfast, lunch, and dinner.",
    halfBoard:
        "Typically includes breakfast and dinner, with guests choosing where to eat their third meal. Half board is a good option for travelers who want to explore the area and try local cuisine.",
    bedAndBreakfast: "Includes overnight stay and breakfast only.",
};

type RoomCarouselImage = {
    src: string;
    lightboxSrc: string;
    alt: string;
    width: number;
    height: number;
};

type RoomCard = typeof standardRoomShowcases[number] & {
  images: RoomCarouselImage[];
};

const roomCards: RoomCard[] = standardRoomShowcases.map((room) => ({
    ...room,
    images: room.images.map((image) => ({
        ...image,
        src: withGalleryBaseUrl(getGalleryVariantPath(image.src, "thumb") ?? image.src),
        lightboxSrc: withGalleryBaseUrl(
            getGalleryVariantPath(image.src, "lightbox") ?? image.src,
        ),
    })),
}));

const Modal = ({
    image,
    roomTitle,
    currentIndex,
    totalCount,
    onClose,
    onPrev,
    onNext,
    isLoading,
    onLoad,
}: {
    image: { src: string; alt: string; width: number; height: number };
    roomTitle: string;
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
                className="mx-auto flex h-full w-full max-w-[min(96vw,1500px)] flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-2 flex items-start justify-between gap-3 px-1 text-white sm:mb-3 sm:items-center sm:px-0">
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium sm:text-base">{roomTitle}</p>
                        <p className="text-xs text-white/70 sm:text-sm">
                            {currentIndex + 1} / {totalCount}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full bg-white/12 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                        aria-label={`Close ${roomTitle} image viewer`}
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
                        aria-label={`Previous ${roomTitle} image`}
                    >
                        <DropdownArrow className="h-6 w-6" direction="left" />
                    </button>
                    <InteractiveLightboxImage
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        isLoading={isLoading}
                        onLoad={onLoad}
                    />
                    <button
                        onClick={onNext}
                        className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-gray-900/65 p-3 text-white backdrop-blur transition hover:bg-gray-900/80 sm:block"
                        aria-label={`Next ${roomTitle} image`}
                    >
                        <DropdownArrow className="h-6 w-6" direction="right" />
                    </button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:hidden">
                    <button
                        onClick={onPrev}
                        className="flex items-center justify-center gap-2 rounded-full bg-white/12 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20"
                        aria-label={`Previous ${roomTitle} image`}
                    >
                        <DropdownArrow className="h-5 w-5" direction="left" />
                        Prev
                    </button>
                    <button
                        onClick={onNext}
                        className="flex items-center justify-center gap-2 rounded-full bg-white/12 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20"
                        aria-label={`Next ${roomTitle} image`}
                    >
                        Next
                        <DropdownArrow className="h-5 w-5" direction="right" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const RoomImageCarousel = ({ images, roomTitle, isPriority = false }: {
    images: RoomCarouselImage[];
    roomTitle: string;
    isPriority?: boolean;
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!images || images.length === 0) return null;

    const nextImage = (e?: React.MouseEvent) => {
        e?.preventDefault();
        setIsLoading(true);
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.preventDefault();
        setIsLoading(true);
        setCurrentImageIndex((prev) =>
            (prev - 1 + images.length) % images.length
        );
    };

    const currentImage = images[currentImageIndex];

    if (!currentImage) {
        return null;
    }

    return (
        <div className="relative group">
            <a
                href="#"
                className="inline-block w-full"
                onClick={(e) => {
                    e.preventDefault();
                    setIsLoading(false);
                    setIsModalOpen(true);
                }}
            >
                <Image
                    src={currentImage.src}
                    loading={isPriority ? "eager" : "lazy"}
                    fetchPriority={isPriority ? "high" : undefined}
                    width={currentImage.width}
                    height={currentImage.height}
                    sizes="(max-width: 767px) 92vw, (max-width: 991px) 78vw, 500px"
                    alt={currentImage.alt}
                    className="room-image max-w-full"
                    unoptimized
                    onLoad={() => setIsLoading(false)}
                />
            </a>
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`Previous ${roomTitle} image`}
                    >
                        <DropdownArrow className="w-4 h-4" direction="left" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`Next ${roomTitle} image`}
                    >
                        <DropdownArrow className="w-4 h-4" direction="right" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === currentImageIndex
                                    ? "bg-white"
                                    : "bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}

            {isModalOpen && currentImage && (
                <Modal
                    image={{
                        ...currentImage,
                        src: currentImage.lightboxSrc,
                    }}
                    roomTitle={roomTitle}
                    currentIndex={currentImageIndex}
                    totalCount={images.length}
                    onClose={() => setIsModalOpen(false)}
                    onPrev={prevImage}
                    onNext={nextImage}
                    isLoading={isLoading}
                    onLoad={() => setIsLoading(false)}
                />
            )}
        </div>
    );
};

export const RoomsListSection = () => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(
        null,
    );

    useEffect(() => {
        const storedData = getStoredBookingData();
        if (storedData?.roomSelections?.[0]) {
            setSelectedRoomType(storedData.roomSelections[0].type);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeBookingModal();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const openBookingModal = (roomType: RoomType) => {
        setSelectedRoomType(roomType);
        setStoredBookingData({
            roomSelections: [{
                type: roomType,
                count: 1,
                boardType: "fullBoard",
            }],
        });
        setIsBookingModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
        setSelectedRoomType(null);
    };

    return (
        <section className="room-section wf-section">
            <div id="Rooms" className="rooms-container w-container">
                <div className="roomcentered-title-900">
                    <h2 id="Room-Selection">
                        Discover Your Perfect Retreat: Our Diverse Room
                        Selection
                    </h2>
                </div>
                <div className="room-flex-row rounded-lg p-4">
                    {roomCards.map((
                        room,
                        index,
                    ) => (
                        <div
                            key={room.type}
                            className="room-wrapped-card spaced !w-full max-md:!flex-col max-md:gap-4"
                        >
                            <RoomImageCarousel
                                images={room.images}
                                roomTitle={room.title}
                                isPriority={index === 0}
                            />
                            <div className="room-details w-full max-w-full lg:max-w-[590px]">
                                <h4 className="font-['Varela_Round',sans-serif] rooms-margin-bottom-1rem">
                                    {room.title}
                                </h4>
                                <p className="rooms-paragraph">
                                    {room.description}
                                </p>
                                <div className="mt-4 space-y-2">
                                    <p className="font-semibold">
                                        Pricing Options:
                                    </p>
                                    <div className="flex flex-wrap items-start gap-x-2 gap-y-2">
                                        <div className="group relative flex items-center">
                                            Full Board:{" "}
                                            <b>
                                                ${roomPrices[room.type]
                                                    .fullBoard}
                                            </b>
                                            <InfoCircle className="inline-block w-4 h-4 ml-1 text-gray-500 align-middle" />
                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white text-sm p-2 rounded w-48">
                                                {BoardTypeInfo.fullBoard}
                                            </span>
                                        </div>
                                        <div className="hidden sm:block">|</div>
                                        <div className="group relative flex items-center">
                                            Half Board:{" "}
                                            <b>
                                                ${roomPrices[room.type]
                                                    .halfBoard}
                                            </b>
                                            <InfoCircle className="inline-block w-4 h-4 ml-1 text-gray-500 align-middle" />
                                            <span className="absolute bottom-full left-1/2 z-10 hidden w-72 -translate-x-1/2 rounded bg-black p-2 text-sm text-white group-hover:block sm:w-96">
                                                {BoardTypeInfo.halfBoard}
                                            </span>
                                        </div>
                                        <div className="hidden sm:block">|</div>
                                        <div className="group relative flex items-center">
                                            Bed & Breakfast:{" "}
                                            <b>
                                                ${roomPrices[room.type]
                                                    .bedAndBreakfast}
                                            </b>
                                            <InfoCircle className="inline-block w-4 h-4 ml-1 text-gray-500 align-middle" />
                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white text-sm p-2 rounded w-48">
                                                {BoardTypeInfo.bedAndBreakfast}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => openBookingModal(room.type)}
                                    className="mt-4 px-6 py-2 bg-button text-white rounded-md hover:bg-[#2c2c2c] transition duration-300"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isBookingModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeBookingModal}
                >
                    <div
                        className="bg-[#d7dfde] p-6 rounded-lg max-w-3xl w-full max-h-[100dvh] md:max-h-[95dvh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeBookingModal}
                            className="float-right text-4xl"
                        >
                            &times;
                        </button>
                        <BookingSection
                            initialRoomType={selectedRoomType}
                            onClose={closeBookingModal}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};
