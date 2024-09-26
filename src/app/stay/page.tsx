import { HydrateClient } from "~/trpc/server";
import { RoomAmenitiesSection } from "../_components/sections/RoomAmenitiesSection";

export default async function Home() {

  return (
    <HydrateClient>
      <main>
        <RoomAmenitiesSection />
      </main>
    </HydrateClient>
  );
}
