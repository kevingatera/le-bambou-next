import Image from "next/image";
import React from "react";
import { dynamicBlurDataUrl } from "~/app/_utils/ImageUtils";

export const HistoryVisionValuesSection = async () => {
    return (
        <section className="mx-auto max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-4rem)] py-12">
            <div className="px-0 sm:px-4 md:px-8 lg:px-16">

                <div className="">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl py-4"><strong id="Kinigi-journey" className="font-[400]">Our commitment to exceptional service, sustainable practices, and embracing the natural beauty of Volcanoes National Park sets us apart.</strong></h2>
                    <div className="small-space"></div>
                </div>
                <div className="bg-[#b9c5c4] flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 rounded-lg items-center p-4 sm:p-8 md:p-10">
                    <div className="w-full md:w-2/3 flex items-center mx-2 max-w-sm">
                        <Image
                            src="/images/Smiling-Worker.jpg"
                            loading="eager"
                            sizes="(max-width: 479px) 83vw, (max-width: 767px) 81vw, (max-width: 991px) 83vw, 18vw"
                            alt=""
                            className="rounded-lg w-full h-[27rem] object-cover object-center md:h-auto"
                            width={708}
                            height={472}
                            blurDataURL={await dynamicBlurDataUrl('/images/Smiling-Worker.jpg')}
                            placeholder="blur"
                        />
                    </div>
                    <div className="flex flex-col gap-8 md:w-2/3">
                        <div>
                            <h5 className="text-xl font-semibold mb-2">History</h5>
                            <p className="text-[rgba(0,0,0,.76)] mb-4">
                                Le Bambou Gorilla Lodge Ltd was founded in Rwanda&apos;s northern province to enhance eco-lodging in the hotel industry. We have become a unique destination that combines warmth, comfort, and sustainable living.
                            </p>
                        </div>
                        <div>
                            <h5 className="text-xl font-semibold mb-2">Vision</h5>
                            <p className="text-[rgba(0,0,0,.76)] mb-4">
                                Our vision is to be Rwanda&apos;s premier safari lodge in the Volcanoes National Park, offering exceptional flexible service that meets every guest&apos;s needs and showcases Rwanda&apos;s beauty as a top tourism destination.
                            </p>
                            <p className="text-[rgba(0,0,0,.76)] mb-4">
                                We plan to expand with eco-friendly lodges across Rwanda and Uganda, ensuring our growth is sustainable and memorable.
                            </p>
                        </div>
                        <div>
                            <h5 className="text-xl font-semibold mb-2">Values</h5>
                            <p className="text-[rgba(0,0,0,.76)] mb-4">
                                We uphold professionalism, integrity, respect, and dignity, treating every guest like family. Innovation and flexibility allow us to adapt to our guests&apos; needs, while quality service and community investment drive our operations.
                            </p>
                            <p className="text-[rgba(0,0,0,.76)] mb-4">
                                We ensure accessibility through easy communication, making the guest experience seamless from booking to stay.
                            </p>
                            <p className="text-[rgba(0,0,0,.76)] mb-4">
                                Our goal is to blend luxury with nature, offering unforgettable experiences in Rwanda&apos;s wilderness without sacrificing comfort.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};