"use client";

import React from "react";
import Image from "next/image";

export const HeroSection = () => {
  const heroImage = "/images/DSC_3675.jpg";

  const scrollToEvent = () => {
    const eventSection = document.getElementById('kwita-izina-event');
    if (eventSection) {
      eventSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Hide the button after 2025 ends
  const endOf2025 = new Date('2026-01-01');
  const now = new Date();
  const shouldShowButton = now < endOf2025;

  return (
    <section className="relative flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden bg-gray-700 sm:min-h-[calc(100dvh-6rem)]">
      <Image
        src={heroImage}
        alt="Le Bambou bamboo-lined lodge entrance"
        fill={true}
        className="opacity-70 object-cover"
        quality={75}
        loading="eager"
        priority={true}
      />

      {/* Kwita Izina Event Callout - Bottom Center Button */}
      {shouldShowButton && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 animate-bounce-subtle">
          <button
            onClick={scrollToEvent}
            className="bg-[#7d8f5f] text-white px-8 py-4 text-base rounded-full shadow-lg hover:bg-[#6b7c50] hover:shadow-xl transition-all duration-300 flex items-center gap-2.5 group"
          >
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
            </span>
            <span className="font-bold text-lg">Kwita Izina 2025</span>
            <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      <div className="relative mx-auto w-full max-w-[calc(100vw-2rem)] px-2 sm:max-w-[calc(100vw-4rem)] sm:px-0">
        <div className="mx-auto max-w-[720px] rounded-[22px] bg-[rgba(121,98,90,0.78)] px-6 pb-6 pt-3 text-center backdrop-blur-[3px] sm:px-10 sm:pb-8 sm:pt-4">
          <h1 className="mb-5 text-[2.35rem] font-normal leading-[0.98] text-[#ebf8f7] sm:text-[3.1rem]">
            Welcome to Le Bambou Gorilla Lodge
          </h1>
          <p className="mx-auto mb-0 max-w-[34ch] text-base leading-7 text-[#ebf8f7] sm:text-[1.1rem]">
            At the heart of the Volcanoes National Park.
          </p>
        </div>
      </div>
    </section>
  );
};
