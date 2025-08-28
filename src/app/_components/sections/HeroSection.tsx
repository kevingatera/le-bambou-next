"use client";

import React from "react";
import Image from "next/image";

export const HeroSection = () => {
  const scrollToEvent = () => {
    const eventSection = document.getElementById('kwita-izina-event');
    if (eventSection) {
      eventSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="flex items-center min-h-[calc(100dvh-7rem)] relative bg-gray-700">
      <Image
        src="/images/DSC_3675.jpg"
        alt="Le Bambou Gorilla Lodge"
        fill={true}
        className="opacity-70 object-cover"
        quality={75}
        loading="eager"
        priority={true}
      />

      {/* Kwita Izina Event Callout - Bottom Center Button */}
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

      <div className="max-w-[calc(100vw-2rem)] mx-auto relative">
        <div className="max-w-[900px] text-center bg-[rgba(121,98,90,.89)] rounded-lg flex flex-col justify-center items-center p-5">
          <h1 className="text-[#ebf8f7] mt-0 mb-8 pt-5 text-[38px] font-normal leading-[1.1]">
            Welcome to Le Bambou Gorilla Lodge
          </h1>
          <p className="text-[#ebf8f7] mb-0 px-5 pb-5 text-[18px]">
            At the heart of the Volcanoes National Park.
          </p>
        </div>
      </div>
    </section>
  );
};
