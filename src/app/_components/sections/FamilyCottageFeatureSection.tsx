import Image from "next/image";
import Link from "next/link";
import { familyCottageShowcase } from "~/app/_data/roomShowcase";
import { withGalleryBaseUrl } from "~/app/_utils/galleryImages";
import { getGalleryVariantPath } from "~/app/_utils/galleryImageVariants";
import { PreconfiguredBookingButton } from "../PreconfiguredBookingButton";

const heroImage = familyCottageShowcase.images[0];

export const FamilyCottageFeatureSection = () => {
  const imageSrc = withGalleryBaseUrl(
    getGalleryVariantPath(heroImage.src, "lightbox") ?? heroImage.src,
  );

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 rounded-lg bg-[#b9c5c4] p-4 sm:p-6 lg:grid-cols-[1.25fr_0.95fr] lg:p-8">
        <div className="relative min-h-[320px] overflow-hidden rounded-lg bg-[#9caead] sm:min-h-[420px]">
          <Image
            src={imageSrc}
            alt={heroImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority={false}
          />
        </div>
        <div className="flex flex-col justify-between gap-6 rounded-lg bg-[#d7dfde] p-5 sm:p-7">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-[#566c6a]">
              Featured Stay
            </p>
            <h2 className="text-3xl leading-tight text-[#2c2c2c] sm:text-4xl">
              Family Cottage
            </h2>
            <p className="text-base leading-7 text-[#2c2c2c] sm:text-lg">
              A larger standalone cottage for families or longer stays, with more privacy,
              more room to settle in, and a layout designed around shared time together.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm text-[#2c2c2c] sm:text-base">
              <div className="rounded-md bg-white/50 p-3">
                <div className="font-semibold">Full Board</div>
                <div>$500 / night</div>
              </div>
              <div className="rounded-md bg-white/50 p-3">
                <div className="font-semibold">Capacity</div>
                <div>Up to 4 guests</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/family-cottage"
              className="rounded-md bg-[#79625a] px-5 py-3 text-center text-white transition hover:bg-[#67524c]"
            >
              Explore Family Cottage
            </Link>
            <PreconfiguredBookingButton
              roomType="Family"
              className="rounded-md border border-[#79625a] px-5 py-3 text-center text-[#2c2c2c] transition hover:bg-white/50"
            >
              Book Family Cottage
            </PreconfiguredBookingButton>
          </div>
        </div>
      </div>
    </section>
  );
};
