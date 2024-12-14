import React from "react";
import Image from "next/image";
import { dynamicBlurDataUrl } from "~/app/_utils/ImageUtils";

export const AboutUsBannerSection = async () => {
    return (
        <section className="flex items-center min-h-[calc(100dvh-7rem)] relative bg-gray-700">
            <Image
                src="/images/rooms/lobby/View of the main lobby-house lit at night-2.webp"
                alt="Background Image"
                fill={true}
                className="opacity-50 object-cover"
                quality={90}
                priority={true}
                blurDataURL={await dynamicBlurDataUrl(
                    "/images/rooms/lobby/View of the main lobby-house lit at night-2.webp",
                )}
                placeholder="blur"
            />
            <div className="absolute inset-0 bg-[#2a3332] opacity-20 pointer-events-none 
                before:absolute before:inset-0 
                before:bg-[radial-gradient(rgba(86,108,106,0.1)_1px,transparent_1px)] 
                before:bg-[length:16px_16px] 
                before:opacity-50">
            </div>
            <div className="max-w-[calc(100vw-2rem)] mx-auto relative z-10">
                <div className="max-w-[900px] text-center bg-[rgba(121,98,90,.89)] rounded-lg flex flex-col justify-center items-center py-4 px-3">
                    <h1 className="text-[#ebf8f7] mt-0 mb-8 pt-5 text-[38px] font-normal leading-[1.1]">
                        About Le Bambou Gorilla Lodge:
                    </h1>
                    <p className="text-[#ebf8f7] mb-0 px-5 pb-5 text-[18px]">
                        Experience the essence of Rwanda.
                    </p>
                </div>
            </div>
        </section>
    );
};
