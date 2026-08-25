"use client";

import React from "react";
import Image from "next/image";

export const HeroSection = () => {
  const heroImage = "/images/DSC_3675.jpg";

  const scrollToEvent = () => {
    const eventSection = document.getElementById("kwita-izina-event");
    if (eventSection) {
      eventSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const eventYear = new Date().getFullYear();

  return (
    <section className="relative flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden bg-gray-700 sm:min-h-[calc(100dvh-6rem)]">
      <Image
        src={heroImage}
        alt="Le Bambou bamboo-lined lodge entrance"
        fill={true}
        className="object-cover opacity-70"
        quality={75}
        loading="eager"
        priority={true}
      />

      {/* Kwita Izina Event Callout - Bottom Center Button */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex animate-bounce-subtle justify-center">
        <button
          onClick={scrollToEvent}
          className="group flex items-center gap-2.5 rounded-full bg-[#7d8f5f] px-8 py-4 text-base text-white shadow-lg transition-all duration-300 hover:bg-[#6b7c50] hover:shadow-xl"
        >
          <span className="relative flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-white"></span>
          </span>
          <span className="text-lg font-bold">Kwita Izina {eventYear}</span>
          <svg
            className="h-5 w-5 rotate-90 transition-transform group-hover:translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

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
