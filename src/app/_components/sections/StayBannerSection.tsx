import React from "react";
import Image from "next/image";
import { withGalleryBaseUrl } from "~/app/_utils/galleryImages";

export const StayBannerSection = () => {
  const imageSrc = withGalleryBaseUrl(
    "/images/gallery/rooms/twin/lebambou-twinroom-001.webp",
  );

  return (
    <section className="relative flex min-h-[calc(100dvh-5rem)] items-end overflow-hidden bg-gray-700 sm:min-h-[calc(100dvh-6rem)]">
      <Image
        src={imageSrc}
        alt="Twin room at Le Bambou Gorilla Lodge"
        fill={true}
        className="object-cover opacity-70"
        quality={75}
        priority={true}
      />
      <div className="relative mx-auto w-full max-w-[calc(100vw-2rem)] px-2 pb-16 sm:max-w-[calc(100vw-4rem)] sm:px-0 sm:pb-20">
        <div className="mx-auto max-w-[720px] rounded-[22px] bg-[rgba(121,98,90,0.78)] px-6 py-6 text-center backdrop-blur-[3px] sm:px-10 sm:py-8">
          <h1 className="mb-5 text-[2.35rem] font-normal leading-[0.98] text-[#ebf8f7] sm:text-[3.1rem]">
            Rooms Available
          </h1>
          <p className="mx-auto mb-0 max-w-[34ch] text-base leading-7 text-[#ebf8f7] sm:text-[1.1rem]">
            Explore the lodge’s room types, amenities, and gallery before choosing the stay that fits your trip.
          </p>
        </div>
      </div>
    </section>
  );
};
