import { HydrateClient } from "~/trpc/server";
import { CommunitySection } from "../_components/sections/CommunitySection";
import { InsideAttractionsListSection } from "../_components/sections/InsideAttractionsListSection";
import { OutsideAttractionsListSection } from "../_components/sections/OutsideAttractionsListSection";
import { AttractionsUsBannerSection } from "../_components/sections/AttractionsUsBannerSection";
import { type Metadata } from "next";
import { sharedMetadata } from "../metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Explore Rwanda | Le Bambou Gorilla Lodge Activities & Attractions",
  description: "Discover the wonders of Rwanda with Le Bambou Gorilla Lodge. From gorilla trekking to cultural experiences, explore the best activities and attractions near our eco-lodge.",
  keywords: "Rwanda attractions, gorilla trekking, Volcanoes National Park, Rwanda activities, cultural experiences",
  openGraph: {
    ...sharedMetadata.openGraph,
    url: "https://lebambougorillalodge.com/explore",
    title: "Explore Rwanda | Le Bambou Gorilla Lodge Activities & Attractions",
    description: "Discover the wonders of Rwanda with Le Bambou Gorilla Lodge. From gorilla trekking to cultural experiences, explore the best activities and attractions near our eco-lodge.",
    images: [
      {
        url: "/images/1200px-Sabyinyo_volcanoe_view_from_Kinigi_sector_Musanze_district_Rwanda.jpg",
        width: 1200,
        height: 900,
        alt: "Le Bambou Gorilla Lodge - Explore Rwanda",
      },
    ],
  },
};

export default async function Home() {

  return (
    <HydrateClient>
      <main>
        <AttractionsUsBannerSection />
        <div className="h-[120px] min-h-[7.5rem] bg-[#566c6a] py-[60px]"></div>
        <CommunitySection />
        <InsideAttractionsListSection />
        <div className="learn-more-padding">
            <div className="learn-more-container-smalller">
              <div className="py-12">
                <div className="align-text-center">
                  <a href="https://visitrwandabookings.rdb.rw/rdbportal/web/rdb/home" target="_blank" className="link-block-4 w-inline-block">
                    <h1 className="learn-more-heading">Learn More</h1>
                  </a>
                  <div className="small-space"></div>
                </div>
              </div>
            </div>
          </div>
        <OutsideAttractionsListSection />
      </main>
    </HydrateClient>
  );
}
