import { HydrateClient } from "~/trpc/server";
import { ContactSection } from "../_components/sections/ContactSection";
import { type Metadata } from "next";
import { sharedMetadata } from "../metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Contact Le Bambou Gorilla Lodge | Inquiries & Reservations",
  description:
    "Get in touch with Le Bambou Gorilla Lodge for inquiries, reservations, or any questions about your stay in Rwanda. We're here to help plan your perfect eco-lodge experience.",
  keywords:
    "contact Le Bambou Gorilla Lodge, Rwanda lodge reservations, eco-lodge inquiries",
  openGraph: {
    ...sharedMetadata.openGraph,
    url: "https://lebambougorillalodge.com/contact",
    title: "Contact Le Bambou Gorilla Lodge | Inquiries & Reservations",
    description:
      "Get in touch with Le Bambou Gorilla Lodge for inquiries, reservations, or any questions about your stay in Rwanda. We're here to help plan your perfect eco-lodge experience.",
    images: [
      {
        url: "/images/DSC_3662.webp",
        width: 3008,
        height: 2000,
        alt: "Le Bambou Gorilla Lodge - Contact Us",
      },
    ],
  },
};

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <ContactSection />
      </main>
    </HydrateClient>
  );
}
