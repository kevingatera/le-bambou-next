import Image from "next/image";
import React from "react";
import { dynamicBlurDataUrl } from "~/app/_utils/ImageUtils";
import { withGalleryBaseUrl } from "~/app/_utils/galleryImages";

export const AttractionsUsBannerSection = async () => {
  const imageSrc = withGalleryBaseUrl(
    "/images/gallery/attractions/ellen-campus/ellendegenerescampus-001.webp",
  );

  return (
    <section className="flex items-center min-h-[calc(100dvh-7rem)] relative bg-gray-700">
      <Image
        src={imageSrc}
        alt="Ellen DeGeneres Campus view"
        fill={true}
        className="opacity-70 object-cover"
        quality={75}
        priority={true}
        blurDataURL={await dynamicBlurDataUrl(
          imageSrc,
        )}
        placeholder="blur"
      />
      <div className="max-w-[calc(100vw-2rem)] mx-auto relative">
        <div className="max-w-[900px] text-center bg-[rgba(121,98,90,.89)] rounded-lg flex flex-col justify-center items-center py-4 px-3">
          <h1 className="text-[#ebf8f7] mt-0 mb-8 pt-5 text-[38px] font-normal leading-[1.1]">
            Unveiling Kinigi
          </h1>
          <p className="text-[#ebf8f7] mb-0 px-5 pb-5 text-[18px]">
            Discover the Charm and Wonders of Our Enchanting Destination
          </p>
        </div>
      </div>
    </section>
  );
};
