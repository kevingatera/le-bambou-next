import Image from 'next/image'
import React from 'react'
import { dynamicBlurDataUrl } from '~/app/_utils/ImageUtils'

export const CommunitySection = async () => {
  return (
    <section className="mx-auto max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-4rem)] py-12">
      <div className="px-0 sm:px-4 md:px-8 lg:px-16">
        <div className="">
          <h2 className="text-2xl md:text-3xl lg:text-4xl py-4"><strong id="Kinigi-journey" className="font-[400]">Journey into Kinigi: A Tapestry of Adventure, Nature, and Culture in Rwanda&apos;s Enchanting Landscapes</strong></h2>
          <div className="py-8 text-sm md:text-base lg:text-lg">Immerse yourself in the enchanting allure of Kinigi...</div>
          <div className="small-space"></div>
        </div>
        <div className="w-auto flex-[0_auto]">
          <div className="w-layout-grid grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-[#b9c5c4] rounded-lg flex flex-col justify-start overflow-hidden">
              <div className="w-full h-48 md:h-56 lg:h-64 flex justify-center items-start overflow-hidden">
                <Image src="/images/19766800508_882bbef5d2_b.jpg" loading="lazy" sizes="(max-width: 767px) 92vw, 88vw" alt="" width={767} height={767} className="community-image object-cover w-full h-full"
                  blurDataURL={await dynamicBlurDataUrl('/images/19766800508_882bbef5d2_b.jpg')}
                  placeholder="blur"
                />
              </div>
              <div className="flex flex-col justify-center pt-6 pb-6 px-[2rem] gap-[1.2em]">
                <h3 className="text-[#2c2c2c] mt-0 mb-0 font-sans text-[1.6em] font-normal"><strong className="font-[Arial, Helvetica Neue, Helvetica, sans-serif] font-[400]">Buhanga Eco Park<br />‍</strong></h3>
              </div>
            </div>
            <div className="bg-[#b9c5c4] rounded-lg flex flex-col justify-start overflow-hidden">
              <div className="w-full h-48 md:h-56 lg:h-64 flex justify-center items-start overflow-hidden">
                <Image src="/images/p1080087-large.jpg" loading="lazy" sizes="(max-width: 767px) 92vw, 88vw" alt="" width={767} height={767} className="object-cover w-full h-full"
                  blurDataURL={await dynamicBlurDataUrl('/images/p1080087-large.jpg')}
                  placeholder="blur"
                />
              </div>
              <div className="flex flex-col justify-center pt-6 pb-6 px-[2rem] gap-[1.2em]">
                <h3 className="text-[#2c2c2c] mt-0 mb-0 font-sans text-[1.6em] font-normal"><strong className="font-[Arial, Helvetica Neue, Helvetica, sans-serif] font-[400]">Musanze Caves<br />‍</strong></h3>
              </div>
            </div>
            <div className="bg-[#b9c5c4] rounded-lg flex flex-col justify-start overflow-hidden">
              <div className="w-full h-48 md:h-56 lg:h-64 flex justify-center items-start overflow-hidden">
                <Image src="/images/Ibyiwacu-community-volcanoe-national-park.jpg" loading="lazy" sizes="(max-width: 767px) 92vw, 88vw" alt="" width={767} height={767} className="object-cover w-full h-full"
                  blurDataURL={await dynamicBlurDataUrl('/images/Ibyiwacu-community-volcanoe-national-park.jpg')}
                  placeholder="blur"
                />
              </div>
              <div className="flex flex-col justify-center pt-6 pb-[45px] px-[2rem] gap-[1.2em]">
                <h3 className="text-[#2c2c2c] mt-0 mb-0 text-[1.6em] leading-[1.2]">
                  <strong className="font-[Arial, Helvetica Neue, Helvetica,  sans-serif] font-[400]">Iby&apos;iwacu Cultural Village</strong>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
