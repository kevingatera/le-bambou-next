import { HydrateClient } from "~/trpc/server";
import { StayBannerSection } from "../_components/sections/StayBannerSection";
import { RoomsListSection } from "../_components/sections/RoomsListSection";
import { RoomAmenitiesSection } from "../_components/sections/RoomAmenitiesSection";
import { GallerySection } from "../_components/sections/GallerySection";
import { FamilyCottageFeatureSection } from "../_components/sections/FamilyCottageFeatureSection";
import { type Metadata } from "next";
import { sharedMetadata } from "../metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Stay at Le Bambou Gorilla Lodge | Luxury Rooms & Amenities",
  description:
    "Discover our luxurious rooms and amenities at Le Bambou Gorilla Lodge. Experience comfort and tranquility in the heart of Rwanda's natural beauty.",
  keywords:
    "Le Bambou Gorilla Lodge, accommodation, luxury rooms, amenities, Rwanda lodging",
  alternates: {
    canonical: "https://lebambougorillalodge.com/stay",
  },
  openGraph: {
    ...sharedMetadata.openGraph,
    url: "https://lebambougorillalodge.com/stay",
    title: "Stay at Le Bambou Gorilla Lodge | Luxury Rooms & Amenities",
    description:
      "Discover our luxurious rooms and amenities at Le Bambou Gorilla Lodge. Experience comfort and tranquility in the heart of Rwanda's natural beauty.",
    images: [
      {
        url: "/images/Rooms---Aerial-view.webp",
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
        <nav className="sticky top-0 z-50 min-h-[80px] bg-[#566c6a] px-4 py-4 shadow-md transition-shadow sm:min-h-[7.5rem] sm:py-[45px]">
          <div className="container mx-auto">
            <ul className="mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm sm:gap-x-8 sm:text-lg">
              {[
                { href: "/family-cottage", label: "Family Cottage" },
                { href: "#Rooms", label: "Rooms" },
                { href: "#Amenities", label: "Amenities" },
                { href: "#Gallery", label: "Gallery" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-white hover:text-[#ebf8f7] transition-colors relative group py-2"
                  >
                    {label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ebf8f7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <FamilyCottageFeatureSection />
        <RoomsListSection />
        <RoomAmenitiesSection />
        <GallerySection />
      </main>
    </HydrateClient>
  );
}
