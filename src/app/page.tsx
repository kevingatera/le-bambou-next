import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import { HeroSection } from "./_components/sections/HeroSection";
import { HotelDescriptionSection } from "./_components/sections/HotelDescriptionSection";
import { BookingCallToActionWithReservationSection } from "./_components/sections/BookingCallToActionWithReservationSection";
import { TestimonialSection } from "./_components/sections/TestimonialSection";
import { DiscoverRoomsSection } from "./_components/sections/DiscoverRoomsSection";

export default async function Home() {

  return (
    <HydrateClient>
      <main>
        <HeroSection />
        <BookingCallToActionWithReservationSection />
        <HotelDescriptionSection />
        <DiscoverRoomsSection />
        <TestimonialSection />
      </main>
    </HydrateClient>
  );
}
