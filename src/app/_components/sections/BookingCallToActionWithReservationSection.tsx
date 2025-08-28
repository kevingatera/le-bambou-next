"use client";

import React, { useEffect, useRef, useState } from "react";
import { BookingSection } from "./BookingSection";
import {
  getStoredBookingData,
  setStoredBookingData,
} from "~/app/_utils/localStorage";

export const BookingCallToActionWithReservationSection = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children05, setChildren05] = useState(0);
  const [children616, setChildren616] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const callToActionRef = useRef<HTMLElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const lastStickyDismissedRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const STICKY_TOP_OFFSET_PX = 16; // extra buffer before sticking to avoid flicker on tiny scrolls
  const [sectionMaxHeight, setSectionMaxHeight] = useState<number>(0);

  useEffect(() => {
    const storedData = getStoredBookingData();
    if (storedData) {
      setCheckIn(storedData.checkIn || "");
      setCheckOut(storedData.checkOut || "");
      setAdults(storedData.adults || 1);
      setChildren05(storedData.children05 || 0);
      setChildren616(storedData.children616 || 0);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isBookingModalOpen) {
        closeBookingModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isBookingModalOpen]);

  useEffect(() => {
    // Measure navbar height for precise threshold and update on resize
    const measureNav = () => {
      const nav = document.getElementById("navigation-bar");
      if (nav) setNavbarHeight(nav.getBoundingClientRect().height);
    };
    const measureSection = () => {
      if (callToActionRef.current) {
        // Measure full content height for smooth max-height transitions
        setSectionMaxHeight(callToActionRef.current.scrollHeight);
      }
    };
    measureNav();
    measureSection();
    window.addEventListener("resize", measureNav);
    window.addEventListener("resize", measureSection);
    // Re-measure after images/fonts settle
    window.setTimeout(measureSection, 50);
    return () => {
      window.removeEventListener("resize", measureNav);
      window.removeEventListener("resize", measureSection);
    };
  }, []);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const element = sentinelRef.current;
    // rootMargin top is negative so the sentinel is considered "out" a bit earlier
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const nextSticky = !entry.isIntersecting;
        if (nextSticky !== isSticky) {
          setIsSticky(nextSticky);
          if (nextSticky) {
            setIsDismissed(lastStickyDismissedRef.current);
          } else {
            setIsDismissed(false);
          }
        }
      },
      {
        root: null,
        rootMargin: `${-(navbarHeight + STICKY_TOP_OFFSET_PX)}px 0px 0px 0px`,
        threshold: 0,
      },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [navbarHeight, isSticky]);

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredBookingData({
      checkIn,
      checkOut,
      adults,
      children05,
      children616,
    });
    setIsBookingModalOpen(true);
    document.body.classList.add("overflow-hidden");
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  const dismissBookingBar = () => {
    if (isSticky) {
      setIsDismissed(true);
      lastStickyDismissedRef.current = true; // remember user's sticky preference
    }
  };

  const restoreBookingBar = () => {
    setIsDismissed(false);
    lastStickyDismissedRef.current = false; // remember user's sticky preference
  };

  return (
    <>
      {isDismissed && isSticky && (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 md:hidden transition-transform duration-300 ease-out">
          <button
            onClick={restoreBookingBar}
            className="bg-[rgba(121,98,90,1)] text-white px-3 py-4 rounded-l-lg shadow-md hover:bg-[rgba(121,98,90,0.8)] transition-opacity duration-300"
            aria-label="Restore booking bar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      )}
      {/* Sentinel used to determine when the section reaches the top of the viewport. Invisible, no layout impact. */}
      <div ref={sentinelRef} className="h-0" />
      <section
        id="booking-call-to-action-with-reservation-section"
        ref={callToActionRef}
        className={`${isSticky ? "bg-[rgba(121,98,90,1)] shadow-md" : "bg-[rgba(121,98,90,.89)]"} sticky top-0 z-50 overflow-hidden transition-[max-height] duration-300 ease-in-out`}
        style={{ maxHeight: isSticky && isDismissed ? 0 : sectionMaxHeight || undefined }}
        aria-hidden={isSticky && isDismissed}
      >
        <div className={`container mx-auto md:px-4 relative transition-all duration-300 ease-in-out ${isSticky && isDismissed ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}`}>
          {isSticky && (
            <button
              onClick={dismissBookingBar}
              className="absolute right-4 top-4 md:hidden bg-[rgba(121,98,90,0.8)] text-white p-2 rounded-full hover:bg-[rgba(121,98,90,1)] transition-colors duration-200"
              aria-label="Dismiss booking bar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <form
            onSubmit={handleBookNow}
            className="rounded-lg p-6 pb-7 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
              <div className="col-span-2 md:col-span-2">
                <label
                  htmlFor="checkIn"
                  className="block text-sm text-white font-medium mb-1 mx-1"
                >
                  Check-in
                </label>
                <input
                  type="date"
                  id="checkIn"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-2">
                <label
                  htmlFor="checkOut"
                  className="block text-sm text-white font-medium mb-1 mx-1"
                >
                  Check-out
                </label>
                <input
                  type="date"
                  id="checkOut"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent"
                  required
                />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <label
                  htmlFor="adults"
                  className="block text-sm text-white font-medium mb-1 mx-1"
                >
                  Adults
                </label>
                <input
                  type="number"
                  id="adults"
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value))}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent"
                  required
                />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <label
                  htmlFor="children05"
                  className="block text-sm text-white font-medium mb-1 mx-1"
                >
                  Kids 0-5
                </label>
                <input
                  type="number"
                  id="children05"
                  value={children05}
                  onChange={(e) => setChildren05(parseInt(e.target.value))}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent"
                />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <label
                  htmlFor="children616"
                  className="block text-sm text-white font-medium mb-1 mx-1"
                >
                  Kids 6-16
                </label>
                <input
                  type="number"
                  id="children616"
                  value={children616}
                  onChange={(e) => setChildren616(parseInt(e.target.value))}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent"
                />
              </div>
              <div className="text-center content-end col-span-4 md:col-span-2 lg:col-span-2">
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-button text-white rounded-md hover:bg-[#2c2c2c] transition duration-300"
                >
                  Book
                </button>
              </div>
            </div>
          </form>
        </div>
        {isBookingModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeBookingModal}
          >
            <div
              className="bg-[#d7dfde] p-6 rounded-lg max-w-3xl w-full max-h-[100dvh] md:max-h-[90dvh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeBookingModal}
                className="float-right text-4xl"
              >
                &times;
              </button>
              <BookingSection
                initialRoomType={null}
                onClose={closeBookingModal}
                initialCheckIn={checkIn}
                initialCheckOut={checkOut}
                initialAdults={adults}
                initialChildren05={children05}
                initialChildren616={children616}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};
