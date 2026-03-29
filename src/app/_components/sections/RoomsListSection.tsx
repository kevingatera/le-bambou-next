"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { BookingSection } from "./BookingSection";
import { roomShowcases } from "~/app/_data/roomShowcase";
import { withGalleryBaseUrl } from "~/app/_utils/galleryImages";
import { getGalleryVariantPath } from "~/app/_utils/galleryImageVariants";
import { roomPrices, type RoomType } from "~/types/booking";
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

type RoomCard = typeof roomShowcases[number] & {
    images: RoomCarouselImage[];
};

const roomCards: RoomCard[] = roomShowcases.map((room) => ({
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
    onClose,
    onPrev,
    onNext,
    isLoading,
    onLoad,
}: {
    image: { src: string; alt: string; width: number; height: number };
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

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative bg-[#d7dfde] p-2 sm:p-5 rounded-lg max-h-screen overflow-auto min-w-80 min-h-60 md:min-h-[25rem] sm:min-w-[500px]"
                onClick={(e) => e.stopPropagation()}
            >
                {isLoading && (
                    <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                        <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-16 w-16" />
                    </div>
                )}
                <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    priority
                    unoptimized
                    className={`object-contain max-h-[calc(100dvh-100px)] max-w-full ${isLoading ? "opacity-0" : "opacity-100"
                        }`}
                    onLoadingComplete={onLoad}
                />
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
                    setIsLoading(true);
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
                    className="room-image h-auto !w-full max-w-full"
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
                            className="room-wrapped-card spaced !w-full !flex-col gap-4 sm:!flex-wrap lg:!flex-row"
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
