import React from "react";
import Image from "next/image";

export const AboutUsBannerSection = () => {
    return (
        <section className="flex items-center min-h-[calc(100dvh-7rem)] relative bg-gray-700">
            <Image 
                src="/images/DSC_3494.jpg" 
                alt="Background Image" 
                layout="fill" 
                objectFit="cover" 
                className=" opacity-70"
                quality={100}
                priority={true}
            />
            <div className="max-w-[1440px] mx-auto relative">
                <div className="max-w-[900px] text-center bg-[rgba(121,98,90,.89)] rounded-lg flex flex-col justify-center items-center py-4">
                    <h1 className="text-[#ebf8f7] mt-0 mb-8 pt-5 text-[38px] font-normal leading-[1.1]">About Le Bambou Gorilla Lodge:</h1>
                    <p className="text-[#ebf8f7] mb-0 px-5 pb-5 text-[18px]">Experience the essence of Rwanda. Our commitment to exceptional service, sustainable practices, and embracing the natural beauty of Volcanoes National Park sets us apart.</p>
                </div>
            </div>
        </section>
    );
};