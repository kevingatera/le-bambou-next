import React from "react";
import Image from "next/image";
import { dynamicBlurDataUrl } from "~/app/_utils/ImageUtils";

export const DiscoverRoomsSection = async () => {
  return (
    <section className="discover-rooms-section flex items-center mb-2.5 pt-[140px] font-sans relative">
      <Image
        src="/images/DSC_3572.jpg"
        alt="Discover Rooms Background"
        fill={true}
        className="opacity-70 object-cover"
        loading="lazy"
        blurDataURL={await dynamicBlurDataUrl("/images/DSC_3572.jpg")}
        placeholder="blur"
      />
      <div className="absolute inset-0 bg-[rgba(44,44,44,0.21)] z-10"></div>
      <div className="discover-rooms-container centered-content w-container relative z-20">
        <h2>
          <strong className="bold-text-11">
            Experience Le Bambou Gorilla Lodge
          </strong>
        </h2>
        <p className="discover-sub-paragraph">
          Discover luxury and convenience at Le Bambou Gorilla Lodge. Start your
          day with a complimentary breakfast, stay connected with high-speed
          Wi-Fi, and enjoy hassle-free parking. Our 24-hour front desk service
          is here to assist you in our smoke-free environment. Savor an array of
          local and international cuisines at our on-site restaurant, unwind at
          our bar, or grab a hot cup of coffee or tea from our lobby. Regardless
          of the weather, our efficient air conditioning ensures a comfortable
          stay. Welcome to the Le Bambou Gorilla Lodge experience, where your
          comfort is our priority.
        </p>
      </div>
    </section>
  );
};
