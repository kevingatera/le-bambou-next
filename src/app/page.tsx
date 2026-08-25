import { HydrateClient } from "~/trpc/server";
import { HeroSection } from "./_components/sections/HeroSection";
import { HotelDescriptionSection } from "./_components/sections/HotelDescriptionSection";
import { BookingCallToActionWithReservationSection } from "./_components/sections/BookingCallToActionWithReservationSection";
import { TestimonialSection } from "./_components/sections/TestimonialSection";
import { DiscoverRoomsSection } from "./_components/sections/DiscoverRoomsSection";
import { EventAnnouncementSection } from "./_components/sections/EventAnnouncementSection";
import { type Metadata } from "next";
import { sharedMetadata } from "./metadata";

// The homepage contains the annual Kwita Izina announcement, whose year and
// confirmed details must be evaluated when the page is requested.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Le Bambou Gorilla Lodge | #1 Eco-Lodge in Volcanoes National Park",
  description:
    "Experience the pinnacle of luxury at Rwanda's top-rated eco-lodge. Nestled in Kinigi, we offer unparalleled access to gorilla trekking and stunning views of the Virunga mountains.",
  keywords:
    "best hotel Kinigi, top-rated Volcanoes National Park accommodation, luxury eco-lodge Rwanda, premier gorilla trekking base, Virunga mountains view, sustainable tourism, Rwandan hospitality",
  alternates: {
    canonical: "https://lebambougorillalodge.com",
  },
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
      <main className="flex min-h-screen flex-grow flex-col">
        <HeroSection />
        <BookingCallToActionWithReservationSection />
        <HotelDescriptionSection />
        <EventAnnouncementSection />
        <DiscoverRoomsSection />
        <TestimonialSection />
      </main>
    </HydrateClient>
  );
}
