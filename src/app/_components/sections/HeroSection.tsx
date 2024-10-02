import React from 'react'
import Image from 'next/image'
import { dynamicBlurDataUrl } from '~/app/_utils/ImageUtils'

export const HeroSection = async () => {
  return (
    <section className="flex items-center min-h-[calc(100dvh-7rem)] relative bg-gray-700">
      <Image 
        src="/images/DSC_3675.jpg" 
        alt="Le Bambou Gorilla Lodge" 
        layout="fill"
        className="opacity-70 object-cover"
        blurDataURL={await dynamicBlurDataUrl('/images/DSC_3675.jpg')}
        placeholder="blur"
        quality={100}
        priority={true}
      />
      <div className="max-w-[calc(100vw-4rem)] mx-auto relative">
        <div className="max-w-[900px] text-center bg-[rgba(121,98,90,.89)] rounded-lg flex flex-col justify-center items-center p-5">
          <h1 className="text-[#ebf8f7] mt-0 mb-8 pt-5 text-[38px] font-normal leading-[1.1]">Welcome to Le Bambou Gorilla Lodge</h1>
          <p className="text-[#ebf8f7] mb-0 px-5 pb-5 text-[18px]">
            At the heart of the Volcanoes National Park.
          </p>
        </div>
      </div>
    </section>
  )
}
