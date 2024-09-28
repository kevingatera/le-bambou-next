import { HydrateClient } from "~/trpc/server";
import { BookingSection } from "../_components/sections/BookingSection";
import { useState } from 'react';
import { RoomType } from "~/types/booking";

export default function Home() {
  const [initialRoomType, setInitialRoomType] = useState<RoomType | null>("Double");

  const handleClose = () => { };

  return (
    <HydrateClient>
      <main>
        <BookingSection initialRoomType={initialRoomType} onClose={handleClose} />
      </main>
    </HydrateClient>
  );
}
