import React from 'react';
import Image from 'next/image';

export const StayBannerSection = () => {
  return (
    <section className="flex items-center min-h-[calc(100dvh-7rem)] relative bg-gray-700">
      <Image 
        src="/images/Rooms---Aerial-view.JPG" 
        alt="Background Image" 
        fill={true}
        className="opacity-70 object-cover"
        quality={100}
        priority={true}
      />
      <div className="max-w-[calc(100vw-rem)] mx-auto relative">
        <div className="max-w-[900px] text-center bg-[rgba(121,98,90,.89)] rounded-lg flex flex-col justify-center items-center py-4">
          <h1 className="text-[#ebf8f7] mt-0 mb-8 pt-5 text-[38px] font-normal leading-[1.1]">Rooms Available</h1>
          <p className="text-[#ebf8f7] mb-0 px-5 pb-5 text-[18px]">
            Indulge in a selection of exquisite rooms designed to exceed your expectations. 
            Explore our range of exceptional accommodations below.
          </p>
        </div>
      </div>
    </section>
  );
}
