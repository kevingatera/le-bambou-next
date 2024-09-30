import Image from 'next/image'
import React from 'react'
import { dynamicBlurDataUrl } from '~/app/_utils/ImageUtils'

export const CommunitySection = async () => {
  return (
    <div className="content-section attractions-page wf-section">
      <div className="contentcontainer attractions-page w-container">
        <div className="content-width">
          <h1 id="Kinigi-journey" className="hotel-description">
            <em className="italic-text">Journey into Kinigi: A Tapestry of Adventure, Nature, and Culture in Rwanda's Enchanting Landscapes</em>
          </h1>
          <div className="attraction-text pt-4 pb-8">Immerse yourself in the enchanting allure of Kinigi...</div>
          <div className="small-space"></div>
        </div>
      </div>
      <div className="community-container">
        <div className="w-layout-grid community-main-grid grid grid-cols-3 gap-4">
          <div className="bg-[#b9c5c4] rounded-lg flex flex-col justify-start overflow-hidden">
            <div className="w-full h-[22em] flex justify-center items-start overflow-hidden">
              <Image src="/images/19766800508_882bbef5d2_b.jpg" loading="lazy" sizes="(max-width: 767px) 92vw, 88vw" alt="" width={767} height={767} className="community-image"
                blurDataURL={await dynamicBlurDataUrl('/images/19766800508_882bbef5d2_b.jpg')}
                placeholder="blur"
              />
            </div>
            <div className="community-inner-card-bottom">
              <h3 className="ommunity-heading-regular"><strong className="bold-text">Buhanga Eco Park<br />‍</strong></h3>
            </div>
          </div>
          <div className="bg-[#b9c5c4] rounded-lg flex flex-col justify-start overflow-hidden">
            <div className="w-full h-[22em] flex justify-center items-start overflow-hidden">
              <Image src="/images/p1080087-large.jpg" loading="lazy" sizes="(max-width: 767px) 92vw, 88vw" alt="" width={767} height={767} className="community-image"
                blurDataURL={await dynamicBlurDataUrl('/images/p1080087-large.jpg')}
                placeholder="blur"
              />
            </div>
            <div className="community-inner-card-bottom">
              <h3 className="ommunity-heading-regular"><strong className="bold-text">Musanze Caves<br />‍</strong></h3>
            </div>
          </div>
          <div className="bg-[#b9c5c4] rounded-lg flex flex-col justify-start overflow-hidden">
            <div className="w-full h-[22em] flex justify-center items-start overflow-hidden">
              <Image src="/images/Ibyiwacu-community-volcanoe-national-park.jpg" loading="lazy" sizes="(max-width: 767px) 92vw, 88vw" alt="" width={767} height={767} className="community-image"
                blurDataURL={await dynamicBlurDataUrl('/images/Ibyiwacu-community-volcanoe-national-park.jpg')}
                placeholder="blur"
              />
            </div>
            <div className="community-inner-card-bottom last">
              <h3 className="ommunity-heading-regular"><strong className="bold-text">Iby'iwacu Cultural Village</strong></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
