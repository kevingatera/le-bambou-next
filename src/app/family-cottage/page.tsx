import { type Metadata } from "next";
import Image from "next/image";
import { HydrateClient } from "~/trpc/server";
import { sharedMetadata } from "../metadata";
import { familyCottageShowcase } from "../_data/roomShowcase";
import { getPreparedGalleryImages } from "../_data/galleryPreparedRecords";
import { GallerySectionClient } from "../_components/sections/GallerySectionClient";
import { type GallerySectionData } from "../_data/gallerySections";
import { toGallerySectionClientData } from "../_components/sections/gallerySectionClientData";
import { withGalleryBaseUrl } from "../_utils/galleryImages";
import { getGalleryVariantPath } from "../_utils/galleryImageVariants";
import { PreconfiguredBookingButton } from "../_components/PreconfiguredBookingButton";

const heroImage =
  familyCottageShowcase.images[0] ??
  (() => {
    throw new Error("Family cottage showcase requires at least one image.");
  })();

const gallerySections: GallerySectionData[] = [
  {
    id: "family-cottage-gallery",
    title: "Family Cottage Gallery",
    subtitle: "Interior and exterior views of the cottage and its surrounding setting.",
    images: getPreparedGalleryImages("images/gallery/rooms/family-cottage"),
  },
];

const galleryClientSections = toGallerySectionClientData(gallerySections);

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Family Cottage | Le Bambou Gorilla Lodge",
  description:
    "Discover Le Bambou Gorilla Lodge's Family Cottage, a more private, spacious accommodation for families and small groups staying near Volcanoes National Park.",
  keywords:
    "Family Cottage Le Bambou Gorilla Lodge, family accommodation Kinigi, Rwanda family lodge, Volcanoes National Park cottage",
  alternates: {
    canonical: "https://lebambougorillalodge.com/family-cottage",
  },
  openGraph: {
    ...sharedMetadata.openGraph,
    url: "https://lebambougorillalodge.com/family-cottage",
    title: "Family Cottage | Le Bambou Gorilla Lodge",
    description:
      "A spacious standalone cottage at Le Bambou Gorilla Lodge for families and small groups seeking extra room and privacy in Kinigi.",
    images: [
      {
        url: heroImage.src,
        width: heroImage.width,
        height: heroImage.height,
        alt: heroImage.alt,
      },
    ],
  },
};

export default function FamilyCottagePage() {
  const heroImageSrc = withGalleryBaseUrl(
    getGalleryVariantPath(heroImage.src, "lightbox") ?? heroImage.src,
  );

  return (
    <HydrateClient>
      <main>
        <section className="relative min-h-[calc(100dvh-7rem)] bg-[#2c2c2c]">
          <Image
            src={heroImageSrc}
            alt={heroImage.alt}
            fill
            priority
            className="object-cover opacity-70"
            sizes="100vw"
          />
          <div className="relative mx-auto flex min-h-[calc(100dvh-7rem)] max-w-6xl items-end px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="max-w-3xl rounded-lg bg-[rgba(121,98,90,0.9)] px-5 py-6 text-[#ebf8f7] sm:px-8 sm:py-8">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.08em] text-[#d7dfde]">
                Standalone Accommodation
              </p>
              <h1 className="text-4xl leading-tight sm:text-5xl">
                Family Cottage
              </h1>
              <p className="mt-4 text-base leading-7 text-[#ebf8f7] sm:text-lg">
                A more spacious, private stay for families and small groups, designed for
                guests who want the comfort of Le Bambou with extra room to spread out.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <PreconfiguredBookingButton
                  roomType="Family"
                  className="rounded-md bg-[#ebf8f7] px-5 py-3 text-center text-[#2c2c2c] transition hover:bg-white"
                >
                  Book Family Cottage
                </PreconfiguredBookingButton>
                <a
                  href="#family-cottage-gallery-gallery"
                  className="rounded-md border border-[#ebf8f7] px-5 py-3 text-center text-[#ebf8f7] transition hover:bg-white/10"
                >
                  View Gallery
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-lg bg-[#b9c5c4] p-5 sm:p-7">
              <h2 className="text-3xl text-[#2c2c2c]">Why Choose The Cottage</h2>
              <p className="mt-4 text-base leading-7 text-[#2c2c2c] sm:text-lg">
                The Family Cottage is positioned as its own accommodation product for guests
                who need more privacy, more sleeping space, and a stay that feels less like
                a standard room and more like a base for a shared trip.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md bg-[#d7dfde] p-4">
                  <h3 className="font-semibold text-[#2c2c2c]">Best For</h3>
                  <p className="mt-2 text-sm leading-6 text-[#2c2c2c]">
                    Families, small groups, and longer stays that benefit from extra room.
                  </p>
                </div>
                <div className="rounded-md bg-[#d7dfde] p-4">
                  <h3 className="font-semibold text-[#2c2c2c]">Capacity</h3>
                  <p className="mt-2 text-sm leading-6 text-[#2c2c2c]">
                    Sleeps up to 4 guests with the privacy and flexibility a cottage layout allows.
                  </p>
                </div>
                <div className="rounded-md bg-[#d7dfde] p-4">
                  <h3 className="font-semibold text-[#2c2c2c]">Atmosphere</h3>
                  <p className="mt-2 text-sm leading-6 text-[#2c2c2c]">
                    Quiet, comfortable, and set up for shared downtime between excursions.
                  </p>
                </div>
                <div className="rounded-md bg-[#d7dfde] p-4">
                  <h3 className="font-semibold text-[#2c2c2c]">Access</h3>
                  <p className="mt-2 text-sm leading-6 text-[#2c2c2c]">
                    Full lodge services with the feel of a more independent accommodation.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-[#d7dfde] p-5 sm:p-7">
              <h2 className="text-3xl text-[#2c2c2c]">Rates</h2>
              <div className="mt-6 space-y-3 text-[#2c2c2c]">
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <span>Full Board</span>
                  <strong>$500</strong>
                </div>
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <span>Half Board</span>
                  <strong>$480</strong>
                </div>
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <span>Bed & Breakfast</span>
                  <strong>$450</strong>
                </div>
              </div>
              <p className="mt-6 text-sm leading-6 text-[#2c2c2c]">
                Rates match the Family room type in the booking flow, but the cottage now
                stands on its own as a featured accommodation with a dedicated page.
              </p>
            </div>
          </div>
        </section>

        <GallerySectionClient sections={galleryClientSections} />
      </main>
    </HydrateClient>
  );
}
