import { HydrateClient } from "~/trpc/server";
import { HeroSection } from "./_components/sections/HeroSection";
import { HotelDescriptionSection } from "./_components/sections/HotelDescriptionSection";
import { BookingCallToActionWithReservationSection } from "./_components/sections/BookingCallToActionWithReservationSection";
import { TestimonialSection } from "./_components/sections/TestimonialSection";
import { DiscoverRoomsSection } from "./_components/sections/DiscoverRoomsSection";
import { LocalStorageProvider } from "./_components/LoacalStorageProvider";
import { type Metadata } from "next";
import { sharedMetadata } from "./metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Le Bambou Gorilla Lodge | Luxury Eco-Lodge in Rwanda",
  description: "Experience luxury eco-lodging at Le Bambou Gorilla Lodge, nestled near Volcanoes National Park in Rwanda. Perfect for gorilla trekking and exploring Rwanda's natural beauty.",
  keywords: "Le Bambou Gorilla Lodge, Rwanda, eco-lodge, gorilla trekking, Volcanoes National Park, luxury accommodation",
  openGraph: {
    ...sharedMetadata.openGraph,
    url: "https://lebambougorillalodge.com",
    title: "Le Bambou Gorilla Lodge | Luxury Eco-Lodge in Rwanda",
    description: "Experience luxury eco-lodging at Le Bambou Gorilla Lodge, nestled near Volcanoes National Park in Rwanda. Perfect for gorilla trekking and exploring Rwanda's natural beauty.",
  },
};

export default async function Home() {

  return (
    <HydrateClient>
      <main className="flex flex-col flex-grow min-h-screen">
        <HeroSection />
        <LocalStorageProvider>
          <BookingCallToActionWithReservationSection />
          <HotelDescriptionSection />
          <DiscoverRoomsSection />
          <TestimonialSection />
        </LocalStorageProvider>
      </main>
    </HydrateClient>
  );
}
