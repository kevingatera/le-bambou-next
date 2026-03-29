import React from "react";
import Image from "next/image";
import { dynamicBlurDataUrl } from "~/app/_utils/ImageUtils";
import { withGalleryBaseUrl } from "~/app/_utils/galleryImages";

export const AboutUsBannerSection = async () => {
    const imageSrc = withGalleryBaseUrl(
        "/images/gallery/lodge/lobby/lebambou-lobby-001.webp",
    );

    return (
        <section className="relative flex min-h-[calc(100dvh-5rem)] items-end overflow-hidden bg-gray-700 sm:min-h-[calc(100dvh-6rem)]">
            <Image
                src={imageSrc}
                alt="Lobby view at Le Bambou Gorilla Lodge"
                fill={true}
                className="opacity-50 object-cover"
                quality={90}
                priority={true}
                blurDataURL={await dynamicBlurDataUrl(
                    imageSrc,
                )}
                placeholder="blur"
            />
            <div className="absolute inset-0 bg-[#2a3332] opacity-20 pointer-events-none 
                before:absolute before:inset-0 
                before:bg-[radial-gradient(rgba(86,108,106,0.1)_1px,transparent_1px)] 
                before:bg-[length:16px_16px] 
                before:opacity-50">
            </div>
            <div className="relative z-10 mx-auto w-full max-w-[calc(100vw-2rem)] px-2 pb-16 sm:max-w-[calc(100vw-4rem)] sm:px-0 sm:pb-20">
                <div className="mx-auto max-w-[720px] rounded-[22px] bg-[rgba(121,98,90,0.78)] px-6 py-6 text-center backdrop-blur-[3px] sm:px-10 sm:py-8">
                    <h1 className="mb-5 text-[2.35rem] font-normal leading-[0.98] text-[#ebf8f7] sm:text-[3.1rem]">
                        The Story of Le Bambou Gorilla Lodge
                    </h1>
                    <p className="mx-auto mb-0 max-w-[34ch] text-base leading-7 text-[#ebf8f7] sm:text-[1.1rem]">
                        Rooted in Kinigi and shaped by Rwandan hospitality, Le Bambou offers a quieter, more personal base for guests exploring Volcanoes National Park.
                    </p>
                </div>
            </div>
        </section>
    );
};
