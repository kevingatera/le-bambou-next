import { HydrateClient } from "~/trpc/server";
import { type Metadata } from "next";
import { HotelPoliciesSection } from "../_components/sections/HotelPoliciesSection";
import { sharedMetadata } from "../metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Hotel Policies | Le Bambou Gorilla Lodge",
  description:
    "Review check-in, check-out, payment, cancellation, and guest policies for Le Bambou Gorilla Lodge before your stay in Kinigi.",
  keywords:
    "Le Bambou Gorilla Lodge policies, hotel cancellation policy, check-in check-out Kinigi lodge",
  alternates: {
    canonical: "https://lebambougorillalodge.com/hotel-policies",
  },
  openGraph: {
    ...sharedMetadata.openGraph,
    url: "https://lebambougorillalodge.com/hotel-policies",
    title: "Hotel Policies | Le Bambou Gorilla Lodge",
    description:
      "Review check-in, check-out, payment, cancellation, and guest policies for Le Bambou Gorilla Lodge before your stay in Kinigi.",
  },
};

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <HotelPoliciesSection />
      </main>
    </HydrateClient>
  );
}
