"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BookingSection } from "./BookingSection";
import { RoomType } from "~/types/booking";
import { getStoredBookingData, setStoredBookingData } from "~/app/_utils/localStorage";

export const RoomsListSection = () => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null);

    useEffect(() => {
        const storedData = getStoredBookingData();
        if (storedData && storedData.roomSelections && storedData.roomSelections.length > 0) {
            const roomSelection = storedData.roomSelections[0];
            if (roomSelection) {
                setSelectedRoomType(roomSelection.type);
            }
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
        setStoredBookingData({ roomSelections: [{ type: roomType, count: 1 }] });
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
                    <h2 id="Room-Selection">Discover Your Perfect Retreat: Our Diverse Room Selection</h2>
                </div>
                <div className="room-flex-row">
                    <div className="room-wrapped-card spaced">
                        <a href="#" className="w-inline-block">
                            <Image src="/images/double-bed-room.jpg" loading="eager" width="80" height="80" sizes="(max-width: 479px) 83vw, (max-width: 767px) 80vw, (max-width: 991px) 78vw, 500.0000305175781px" alt="" className="room-image" />
                        </a>
                        <div className="room-details">
                            <h4 className="font-['Varela_Round',sans-serif] rooms-margin-bottom-1rem">Double Bed Room</h4>
                            <p className="rooms-paragraph">Indulge in the comfort and charm of our recently decorated Double Bed Room, tucked away in the serene northern wing of our property. This cozy retreat offers a delightful en-suite bathroom, coffee-making facilities for your convenience, and a welcoming chimney that creates a warm and inviting ambiance. Immerse yourself in picturesque views of the majestic Sabyinyo Mountain Volcano, adding an extra touch of natural beauty to your stay.</p>
                            <button
                                onClick={() => openBookingModal("Double")}
                                className="mt-4 px-6 py-2 bg-button text-white rounded-md hover:bg-[#2c2c2c] transition duration-300"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                    <div className="room-wrapped-card spaced">
                        <a href="#" className="w-inline-block">
                            <Image src="/images/single-bed-room.jpg" loading="eager" width="80" height="80" sizes="(max-width: 479px) 83vw, (max-width: 767px) 80vw, (max-width: 991px) 78vw, 500.0000305175781px" alt="" className="room-image" />
                        </a>
                        <div className="room-details">
                            <h4 className="font-['Varela_Round',sans-serif] rooms-margin-bottom-1rem">Single Bed Room</h4>
                            <p className="rooms-paragraph">Experience comfort and tranquility in our beautifully decorated Single Bed Room, nestled in the peaceful southern wing of our property. This cozy retreat offers a private en-suite bathroom, coffee-making facilities, and a charming chimney that adds warmth and ambiance to the room. Step outside and enjoy the serene beauty of our wonderful gardens, creating a serene and refreshing atmosphere.</p>
                            <button
                                onClick={() => openBookingModal("Single")}
                                className="mt-4 px-6 py-2 bg-button text-white rounded-md hover:bg-[#2c2c2c] transition duration-300"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                    <div className="room-wrapped-card spaced">
                        <a href="#" className="w-inline-block">
                            <Image src="/images/1340973158.jpg" loading="eager" width="80" height="80" sizes="(max-width: 479px) 83vw, (max-width: 767px) 80vw, (max-width: 991px) 78vw, 500.0000305175781px" alt="" className="room-image" />
                        </a>
                        <div className="room-details">
                            <h4 className="font-['Varela_Round',sans-serif] rooms-margin-bottom-1rem">Triple Bed Room</h4>
                            <p className="rooms-paragraph">Indulge in the comfort and space of our beautifully decorated Triple Bed Room, located in the peaceful northern wing of our property. This cozy retreat offers a delightful en-suite bathroom, coffee-making facilities, and a charming chimney that adds warmth and ambiance to the room. From the windows, behold stunning views of the majestic Sabyinyo Mountain Volcano, allowing you to connect with nature&#x27;s grandeur during your stay.</p>
                            <button
                                onClick={() => openBookingModal("Triple")}
                                className="mt-4 px-6 py-2 bg-button text-white rounded-md hover:bg-[#2c2c2c] transition duration-300"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                    <div className="room-wrapped-card spaced">
                        <a href="#" className="w-inline-block">
                            <Image src="/images/1340975342.jpg" loading="eager" width="80" height="80" sizes="(max-width: 479px) 83vw, (max-width: 767px) 80vw, (max-width: 991px) 78vw, 500.0000305175781px" alt="" className="room-image" />
                        </a>
                        <div className="room-details">
                            <h4 className="font-['Varela_Round',sans-serif] rooms-margin-bottom-1rem">Twin Bed Room</h4>
                            <p className="rooms-paragraph">Experience comfort and flexibility in our beautifully decorated Double Twin Bed Room, located in the serene northern wing of our property. This cozy retreat offers two comfortable twin beds, perfect for friends or family traveling together. Enjoy the convenience of an en-suite bathroom, coffee-making facilities, and a charming chimney that adds warmth and ambiance to the room. Admire the picturesque views of our wonderful gardens, creating a tranquil and refreshing atmosphere for your stay.</p>
                            <button
                                onClick={() => openBookingModal("Twin")}
                                className="mt-4 px-6 py-2 bg-button text-white rounded-md hover:bg-[#2c2c2c] transition duration-300"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isBookingModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeBookingModal}>
                    <div className="bg-[#d7dfde] p-6 rounded-lg max-w-3xl w-full max-h-[100dvh] md:max-h-[90dvh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
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