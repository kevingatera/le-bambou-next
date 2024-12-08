import { HydrateClient } from "~/trpc/server";
import { HotelPoliciesSection } from "../_components/sections/HotelPoliciesSection";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <HotelPoliciesSection />
      </main>
    </HydrateClient>
  );
}
