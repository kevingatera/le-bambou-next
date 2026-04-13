import Image from "next/image";
import React from "react";
import { dynamicBlurDataUrl } from "~/app/_utils/ImageUtils";
import { withGalleryBaseUrl } from "~/app/_utils/galleryImages";

export const AttractionsUsBannerSection = async () => {
  const imageSrc = withGalleryBaseUrl(
    "/images/gallery/attractions/ellen-campus/ellendegenerescampus-001.webp",
  );

  return (
    <section className="relative flex min-h-[calc(100dvh-5rem)] items-end overflow-hidden bg-gray-700 sm:min-h-[calc(100dvh-6rem)]">
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
      <div className="relative mx-auto w-full max-w-[calc(100vw-2rem)] px-2 pb-16 sm:max-w-[calc(100vw-4rem)] sm:px-0 sm:pb-20">
        <div className="mx-auto max-w-[720px] rounded-[22px] bg-[rgba(121,98,90,0.78)] px-6 pb-6 pt-3 text-center backdrop-blur-[3px] sm:px-10 sm:pb-8 sm:pt-4">
          <h1 className="mb-5 text-[2.35rem] font-normal leading-[0.98] text-[#ebf8f7] sm:text-[3.1rem]">
            Unveiling Kinigi
          </h1>
          <p className="mx-auto mb-0 max-w-[34ch] text-base leading-7 text-[#ebf8f7] sm:text-[1.1rem]">
            Discover the Charm and Wonders of Our Enchanting Destination
          </p>
        </div>
      </div>
    </section>
  );
};
