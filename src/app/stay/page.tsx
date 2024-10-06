import { HydrateClient } from "~/trpc/server";
import { StayBannerSection } from "../_components/sections/StayBannerSection";
import { RoomsListSection } from "../_components/sections/RoomsListSection";
import { RoomAmenitiesSection } from "../_components/sections/RoomAmenitiesSection";
import { GallerySection } from "../_components/sections/GallerySection";
import { type Metadata } from "next";
import { sharedMetadata } from "../metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Stay at Le Bambou Gorilla Lodge | Luxury Rooms & Amenities",
  description: "Discover our luxurious rooms and amenities at Le Bambou Gorilla Lodge. Experience comfort and tranquility in the heart of Rwanda's natural beauty.",
  keywords: "Le Bambou Gorilla Lodge, accommodation, luxury rooms, amenities, Rwanda lodging",
  openGraph: {
    ...sharedMetadata.openGraph,
    url: "https://lebambougorillalodge.com/stay",
    title: "Stay at Le Bambou Gorilla Lodge | Luxury Rooms & Amenities",
    description: "Discover our luxurious rooms and amenities at Le Bambou Gorilla Lodge. Experience comfort and tranquility in the heart of Rwanda's natural beauty.",
    images: [
      {
        url: "/images/Rooms---Aerial-view.JPG",
        width: 1600,
        height: 1200,
        alt: "Le Bambou Gorilla Lodge - Accommodations",
      },
    ],
  },
};
export default async function Home() {

  return (
    <HydrateClient>
      <main>
        <StayBannerSection />
        <div className="h-[120px] min-h-[7.5rem] bg-[#566c6a] py-[60px]"></div>
        <RoomsListSection />
        <RoomAmenitiesSection />
        <GallerySection />
      </main>
    </HydrateClient>
  );
}
