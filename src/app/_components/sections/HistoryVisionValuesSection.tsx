import Image from "next/image";
import React from "react";
import { dynamicBlurDataUrl } from "~/app/_utils/ImageUtils";

export const HistoryVisionValuesSection = async () => {
    return (
        <section className="history-vision-values-section wf-section">
            <div className="about-description-container w-container">
                <div className="about-flex-row _5-spacing about-column">
                    <Image
                        src="/images/Smiling-Worker.jpg"
                        loading="eager"
                        sizes="(max-width: 479px) 83vw, (max-width: 767px) 81vw, (max-width: 991px) 83vw, 18vw"
                        alt=""
                        className="rounded-image"
                        width={708}
                        height={472}
                        blurDataURL={await dynamicBlurDataUrl('/images/Smiling-Worker.jpg')}
                        placeholder="blur"
                    />
                    <div className="about-flexed-rows about-max-width-row grid-rows-2 gap-y-4">
                        <div>
                            <h5 className="mb-2">History</h5>
                            <p className="text-[rgba(0,0,0,.76)] mb-4">
                                Le Bambou Gorilla Lodge Ltd was founded in Rwanda&apos;s northern province to enhance eco-lodging in the hotel industry. We have become a unique destination that combines warmth, comfort, and sustainable living.
                            </p>
                        </div>
                        <div>
                            <h5 className="mb-2">Vision</h5>
                            <p className="text-[rgba(0,0,0,.76)] mb-4">
                                Our vision is to be Rwanda&apos;s premier safari lodge in the Volcanoes National Park, offering exceptional flexible service that meets every guest&apos;s needs and showcases Rwanda&apos;s beauty as a top tourism destination.
                            </p>
                            <p className="text-[rgba(0,0,0,.76)] mb-4">
                                We plan to expand with eco-friendly lodges across Rwanda and Uganda, ensuring our growth is sustainable and memorable.
                            </p>
                        </div>
                        <div>
                            <h5 className="mb-2">Values</h5>
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