import { HydrateClient } from "~/trpc/server";
import { BookingSection } from "../_components/sections/BookingSection";

export default function Home() {
  return (
    <HydrateClient>
      <main>
        <BookingSection initialRoomType={null} />
      </main>
    </HydrateClient>
  );
}
