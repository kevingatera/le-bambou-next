import Image from "next/image";
import Link from "next/link";
import { familyCottageShowcase } from "~/app/_data/roomShowcase";
import { withGalleryBaseUrl } from "~/app/_utils/galleryImages";
import { getGalleryVariantPath } from "~/app/_utils/galleryImageVariants";
import { PreconfiguredBookingButton } from "../PreconfiguredBookingButton";

const heroImage = familyCottageShowcase.images[0];
const supportingImages = familyCottageShowcase.images.slice(1);

export const FamilyCottageFeatureSection = () => {
  const imageSrc = withGalleryBaseUrl(
    getGalleryVariantPath(heroImage.src, "lightbox") ?? heroImage.src,
  );

  return (
    <section className="px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
      <div className="mx-auto max-w-[82rem]">
        <div className="grid items-center gap-8 rounded-[28px] bg-[#dfe5e4] px-5 py-5 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset] sm:gap-10 sm:px-6 sm:py-6 lg:grid-cols-[1.32fr_0.92fr]">
          <div className="space-y-7">
            <div className="inline-flex self-start rounded-full bg-[#748963] px-4 py-2 text-[13px] font-medium uppercase tracking-[0.24em] text-[#f3f7f6] shadow-sm">
              New cottage
            </div>
            <div className="grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,0.94fr)_232px]">
              <div className="relative min-h-[360px] overflow-hidden rounded-[22px] bg-[#9caead] sm:min-h-[500px]">
                <Image
                  src={imageSrc}
                  alt={heroImage.alt}
                  fill
                  className="object-cover object-[42%_center] transition duration-700 hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority={false}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1">
                {supportingImages.map((image) => {
                  const supportingImageSrc = withGalleryBaseUrl(
                    getGalleryVariantPath(image.src, "lightbox") ?? image.src,
                  );

                  return (
                    <div
                      key={image.src}
                      className="relative min-h-[156px] overflow-hidden rounded-[18px] bg-[#9caead] sm:min-h-[200px]"
                    >
                      <Image
                        src={supportingImageSrc}
                        alt={image.alt}
                        fill
                        className="object-cover transition duration-700 hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 45vw, 220px"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col justify-between gap-8 px-2 py-3 sm:px-4">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#566c6a]/80 sm:text-xs">
                Family cottage
              </p>
              <h2 className="max-w-[12ch] text-[2rem] leading-[0.95] text-[#2c2c2c] sm:text-[2.5rem]">
                Family Cottage
              </h2>
              <p className="max-w-[34ch] text-sm leading-6 text-[#2c2c2c]/82 sm:text-base">
                A newer standalone cottage designed for families and longer stays, with extra privacy, more space, and a layout made for settling in together.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#2c2c2c]/72">
                <span>Full board from $500</span>
                <span className="hidden h-1 w-1 rounded-full bg-[#566c6a]/45 sm:block" />
                <span>Up to 4 guests</span>
                <span className="hidden h-1 w-1 rounded-full bg-[#566c6a]/45 sm:block" />
                <span>Recently added</span>
              </div>
            </div>
            <div className="grid gap-4 rounded-[20px] border border-[#8ca09f]/35 bg-white/45 p-5 text-sm text-[#2c2c2c]/82">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#566c6a]/75">
                  Why it stands apart
                </p>
                <p className="mt-1 leading-6">
                  Set slightly apart from the main room mix, the cottage offers a more private footprint and a calmer setup for shared stays.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <p className="font-medium text-[#2c2c2c]">Best for</p>
                  <p className="mt-1 leading-6">Families, small groups, and longer stays.</p>
                </div>
                <div>
                  <p className="font-medium text-[#2c2c2c]">Feel</p>
                  <p className="mt-1 leading-6">More private, more spacious, more self-contained.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/family-cottage"
              className="inline-flex items-center rounded-full bg-[#79625a] px-5 py-2.5 text-sm text-white transition hover:bg-[#67524c]"
            >
              View cottage
            </Link>
            <PreconfiguredBookingButton
              roomType="Family"
              className="inline-flex items-center rounded-full border border-[#79625a]/35 px-5 py-2.5 text-sm text-[#2c2c2c] transition hover:border-[#79625a] hover:bg-[#d7dfde]/75"
            >
              Book now
            </PreconfiguredBookingButton>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
