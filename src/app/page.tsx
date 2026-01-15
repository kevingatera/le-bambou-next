import { HydrateClient } from "~/trpc/server";
import { HeroSection } from "./_components/sections/HeroSection";
import { HotelDescriptionSection } from "./_components/sections/HotelDescriptionSection";
import { BookingCallToActionWithReservationSection } from "./_components/sections/BookingCallToActionWithReservationSection";
import { TestimonialSection } from "./_components/sections/TestimonialSection";
import { DiscoverRoomsSection } from "./_components/sections/DiscoverRoomsSection";
import { EventAnnouncementSection } from "./_components/sections/EventAnnouncementSection";
import { LocalStorageProvider } from "./_components/LoacalStorageProvider";
import { type Metadata } from "next";
import { sharedMetadata } from "./metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Le Bambou Gorilla Lodge | #1 Eco-Lodge in Volcanoes National Park",
  description:
    "Experience the pinnacle of luxury at Rwanda's top-rated eco-lodge. Nestled in Kinigi, we offer unparalleled access to gorilla trekking and stunning views of the Virunga mountains.",
  keywords:
    "best hotel Kinigi, top-rated Volcanoes National Park accommodation, luxury eco-lodge Rwanda, premier gorilla trekking base, Virunga mountains view, sustainable tourism, Rwandan hospitality",
  openGraph: {
    ...sharedMetadata.openGraph,
    url: "https://lebambougorillalodge.com",
    title: "Le Bambou Gorilla Lodge | #1 Eco-Lodge in Volcanoes National Park",
    description:
      "Discover why we're the top-rated lodge in Kinigi. Unmatched luxury, prime location for gorilla trekking, and breathtaking Virunga views await at Rwanda's finest eco-retreat.",
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
          <EventAnnouncementSection />
          <DiscoverRoomsSection />
          <TestimonialSection />
        </LocalStorageProvider>
      </main>
    </HydrateClient>
  );
}
