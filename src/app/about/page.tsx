import { HydrateClient } from "~/trpc/server";
import { HistoryVisionValuesSection } from "../_components/sections/HistoryVisionValuesSection";
import { AboutUsBannerSection } from "../_components/sections/AboutUsBannerSection";
import { type Metadata } from "next";
import { sharedMetadata } from "../metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "About Le Bambou Gorilla Lodge | Our Story & Commitment",
  description:
    "Learn about Le Bambou Gorilla Lodge's commitment to sustainable luxury and conservation in Rwanda. Discover our story, values, and dedication to providing unforgettable experiences.",
  keywords:
    "Le Bambou Gorilla Lodge history, eco-lodge Rwanda, sustainable tourism, conservation efforts",
  openGraph: {
    ...sharedMetadata.openGraph,
    url: "https://lebambougorillalodge.com/about",
    title: "About Le Bambou Gorilla Lodge | Our Story & Commitment",
    description:
      "Learn about Le Bambou Gorilla Lodge's commitment to sustainable luxury and conservation in Rwanda. Discover our story, values, and dedication to providing unforgettable experiences.",
    images: [
      {
        url:
          "/images/rooms/lobby/View of the main lobby-house lit at night-2.webp",
        width: 4512,
        height: 3008,
        alt: "Le Bambou Gorilla Lodge - About Us",
      },
    ],
  },
};

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <AboutUsBannerSection />
        <div className="h-[120px] min-h-[7.5rem] bg-[#566c6a] py-[60px]"></div>
        <HistoryVisionValuesSection />

        <section className="mx-auto max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-4rem)]">
          <div className="max-w-4xl mx-auto text-center text-3xl mb-12">
            Join us on a journey to create cherished moments in Rwanda&apos;s
            captivating landscapes.
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
