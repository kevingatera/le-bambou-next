import { HydrateClient } from "~/trpc/server";
import { GorillaVisitationGuidelinesSection } from "../_components/sections/GorillaVisitationGuidelinesSection";
import { type Metadata } from "next";
import { sharedMetadata } from "../metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Gorilla Visitation Guidelines | Le Bambou Gorilla Lodge",
  description:
    "Official guidelines for visiting Rwanda's mountain gorillas. Help us keep them healthy and safe during your trek.",
  keywords:
    "gorilla visitation guidelines, gorilla trekking rules, Rwanda gorilla health, Volcanoes National Park gorilla visit",
  openGraph: {
    ...sharedMetadata.openGraph,
    url: "https://lebambougorillalodge.com/gorilla-visitation-guidelines",
    title: "Gorilla Visitation Guidelines | Le Bambou Gorilla Lodge",
    description:
      "Learn how to responsibly visit Rwanda's mountain gorillas. Follow these guidelines to protect endangered gorillas during your trek.",
  },
};

export default async function GorillaVisitationGuidelinesPage() {
  return (
    <HydrateClient>
      <main>
        <GorillaVisitationGuidelinesSection />
      </main>
    </HydrateClient>
  );
} 