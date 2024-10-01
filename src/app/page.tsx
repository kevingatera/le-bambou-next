import { HydrateClient } from "~/trpc/server";
import { HeroSection } from "./_components/sections/HeroSection";
import { HotelDescriptionSection } from "./_components/sections/HotelDescriptionSection";
import { BookingCallToActionWithReservationSection } from "./_components/sections/BookingCallToActionWithReservationSection";
import { TestimonialSection } from "./_components/sections/TestimonialSection";
import { DiscoverRoomsSection } from "./_components/sections/DiscoverRoomsSection";
import { LocalStorageProvider } from "./_components/LoacalStorageProvider";

export default async function Home() {

  return (
    <HydrateClient>
      <LocalStorageProvider>
        <main>
          <HeroSection />
          <BookingCallToActionWithReservationSection />
          <HotelDescriptionSection />
          <DiscoverRoomsSection />
          <TestimonialSection />
        </main>
      </LocalStorageProvider>
    </HydrateClient>
  );
}
