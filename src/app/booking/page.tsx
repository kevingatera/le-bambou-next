import { HydrateClient } from "~/trpc/server";
import { type Metadata } from "next";
import { BookingSection } from "../_components/sections/BookingSection";
import { sharedMetadata } from "../metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Book Your Stay | Le Bambou Gorilla Lodge Reservations",
  description:
    "Reserve your stay at Le Bambou Gorilla Lodge in Kinigi. Choose your room, travel dates, and guest details for a smooth gorilla trekking lodge booking.",
  keywords:
    "book Le Bambou Gorilla Lodge, Rwanda lodge reservation, Kinigi accommodation booking, gorilla trekking lodge",
  alternates: {
    canonical: "https://lebambougorillalodge.com/booking",
  },
  openGraph: {
    ...sharedMetadata.openGraph,
    url: "https://lebambougorillalodge.com/booking",
    title: "Book Your Stay | Le Bambou Gorilla Lodge Reservations",
    description:
      "Reserve your stay at Le Bambou Gorilla Lodge in Kinigi. Choose your room, travel dates, and guest details for a smooth gorilla trekking lodge booking.",
  },
};

export default function Home() {
  return (
    <HydrateClient>
      <main>
        <BookingSection mode="page" initialRoomType={null} />
      </main>
    </HydrateClient>
  );
}
