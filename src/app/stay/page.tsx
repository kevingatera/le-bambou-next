import { HydrateClient } from "~/trpc/server";
import { StayBannerSection } from "../_components/sections/StayBannerSection";
import { RoomsListSection } from "../_components/sections/RoomsListSection";
import { RoomAmenitiesSection } from "../_components/sections/RoomAmenitiesSection";
import { GallerySection } from "../_components/sections/GallerySection";

export default async function Home() {

  return (
    <HydrateClient>
      <main>
        <StayBannerSection />
        <RoomsListSection />
        <RoomAmenitiesSection />
        <GallerySection />
      </main>
    </HydrateClient>
  );
}
