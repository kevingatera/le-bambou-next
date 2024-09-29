import { HydrateClient } from "~/trpc/server";
import { BookingSection } from "../_components/sections/BookingSection";
import { useState } from 'react';
import { RoomType } from "~/types/booking";

export default function Home() {


  return (
    <HydrateClient>
      <main>
        <BookingSection initialRoomType={null} />
      </main>
    </HydrateClient>
  );
}
