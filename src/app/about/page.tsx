import { HydrateClient } from "~/trpc/server";
import { HistoryVisionValuesSection } from "../_components/sections/HistoryVisionValuesSection";
import { AboutUsBannerSection } from "../_components/sections/AboutUsBannerSection";

export default async function Home() {

  return (
    <HydrateClient>
      <main>
        <AboutUsBannerSection />
        <div className="h-[120px] min-h-[7.5rem] bg-[#566c6a] py-[60px]"></div>
        <HistoryVisionValuesSection />

        <div className="max-w-4xl mx-auto text-center text-3xl py-8 mb-12">Join us on a journey to create cherished moments in Rwanda's captivating landscapes.</div>
      </main>
    </HydrateClient>
  );
}
