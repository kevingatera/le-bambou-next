import { HydrateClient } from "~/trpc/server";
import { ContactSection } from "../_components/sections/ContactSection";

export default async function Home() {

  return (
    <HydrateClient>
      <main>
        <ContactSection />
      </main>
    </HydrateClient>
  );
}
