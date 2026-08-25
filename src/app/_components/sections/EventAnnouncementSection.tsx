import React from "react";
import Image from "next/image";
import Link from "next/link";

type KwitaIzinaDetails = {
  ceremonyDate?: string;
  dateStatus: "confirmed" | "projected";
  eventNumber?: number;
  babiesNamed?: number;
  theme?: string;
};

const confirmedEvents: Record<number, KwitaIzinaDetails> = {
  2026: {
    ceremonyDate: "2026-09-04",
    dateStatus: "confirmed",
    eventNumber: 21,
    babiesNamed: 22,
    theme: "Conservation is Life: Sustaining the Future",
  },
};

// Since 2016, the normal pattern has been the first Friday of September.
// Confirmed dates above override this forecast when RDB publishes an official
// schedule or an exceptional event date.
const getFirstFridayOfSeptember = (year: number) => {
  const date = new Date(Date.UTC(year, 8, 1));
  const daysUntilFriday = (5 - date.getUTCDay() + 7) % 7;
  date.setUTCDate(1 + daysUntilFriday);
  return date.toISOString().slice(0, 10);
};

const getOrdinal = (value: number) => {
  const remainder = value % 100;
  if (remainder >= 11 && remainder <= 13) return `${value}th`;

  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
};

export const EventAnnouncementSection = () => {
  const year = new Date().getFullYear();
  const details = confirmedEvents[year] ?? {
    ceremonyDate: getFirstFridayOfSeptember(year),
    dateStatus: "projected" as const,
  };
  const ceremonyDate = details.ceremonyDate
    ? new Date(`${details.ceremonyDate}T12:00:00Z`)
    : null;
  const ceremonyDateText = ceremonyDate
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(ceremonyDate)
    : "Date to be announced";
  const ceremonyDateLabel =
    details.dateStatus === "projected"
      ? `Projected: ${ceremonyDateText}`
      : ceremonyDateText;
  const eventTitle = details.eventNumber
    ? `${getOrdinal(details.eventNumber)} Kwita Izina Gorilla Naming Ceremony`
    : `Kwita Izina Gorilla Naming Ceremony`;
  const eventDescription = details.babiesNamed
    ? `Join Rwanda's flagship conservation event as we celebrate naming ${details.babiesNamed} baby mountain gorillas`
    : "Join Rwanda's flagship conservation event as we celebrate mountain gorilla conservation";

  return (
    <section
      id="kwita-izina-event"
      className="homepage wf-section pb-16 pt-12"
      style={{ background: "linear-gradient(to bottom, #fdfcfb, #fff)" }}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <span className="text-md mb-8 inline-block rounded-full bg-[#6b8e7f] px-4 py-2 font-semibold text-white">
              KWITA IZINA {year}
            </span>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              {eventTitle}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              {eventDescription}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-white shadow-lg">
            <div className="md:flex">
              <div className="bg-[#d7dfde] p-8 md:w-1/2 md:p-12">
                <h3 className="mb-6 text-2xl font-bold text-gray-900">
                  Event Highlights
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#e8ede9]">
                      <svg
                        className="h-6 w-6 text-[#4a6358]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {ceremonyDateLabel}
                      </h4>
                      <p className="text-gray-600">
                        {details.dateStatus === "projected"
                          ? "Forecast from the recent first-Friday pattern"
                          : "Annual celebration of conservation"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#e8ede9]">
                      <svg
                        className="h-6 w-6 text-[#4a6358]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Volcanoes National Park
                      </h4>
                      <p className="text-gray-600">Kinigi, Musanze District</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#e8ede9]">
                      <svg
                        className="h-6 w-6 text-[#4a6358]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Special Features
                      </h4>
                      <ul className="mt-2 space-y-1 text-gray-600">
                        <li>
                          •{" "}
                          {details.babiesNamed
                            ? `Naming of ${details.babiesNamed} baby mountain gorillas`
                            : "Naming of baby mountain gorillas"}
                        </li>
                        <li>• Honoring local communities & rangers</li>
                        <li>• Conservation exhibitions and storytelling</li>
                        <li>• Traditional Rwandan naming ceremonies</li>
                        <li>• Conservation success celebrations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <Link
                    href="/contact"
                    className="block w-full rounded-lg bg-[#566c6a] px-6 py-4 text-center font-semibold text-white transition duration-200 hover:bg-[#445452]"
                  >
                    Reserve Your Spot Now
                  </Link>
                  <Link
                    href="https://kwitaizina.rw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-lg border-2 border-[#4a6358] bg-white px-6 py-4 text-center font-semibold text-[#4a6358] transition duration-200 hover:bg-[#f5f7f6]"
                  >
                    Visit Official Event Site
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[24rem] overflow-hidden md:min-h-0 md:w-1/2">
                <picture className="absolute inset-0 block">
                  <source
                    media="(max-width: 767px)"
                    srcSet="/images/kwita-izina-annual-portrait.png"
                  />
                  <Image
                    src="/images/kwita-izina-annual-banner.png"
                    alt="Young mountain gorilla in the Virunga rainforest"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-l from-[#0d2117]/90 via-[#163022]/45 to-transparent" />
                <div className="relative z-10 flex min-h-[24rem] items-center justify-end p-8 text-right text-white md:p-10">
                  <div className="max-w-xs">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#dce8df]">
                      Save the date
                    </p>
                    <p className="mt-3 text-3xl font-bold leading-tight">
                      Gorilla Naming Ceremony
                    </p>
                    <p className="mt-4 text-lg text-[#edf5ef]">
                      {ceremonyDateLabel}
                    </p>
                    <p className="mt-1 text-sm text-[#dce8df]">
                      Kinigi, Musanze
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Kwita Izina celebrates Rwanda&apos;s centuries-old tradition of
              naming children in the presence of family and friends, adapted to
              honor precious mountain gorillas and conservation heroes.
            </p>
          </div>

          {/* Conservation Stats Banner */}
          <div className="mb-8 mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-[#b2b9b8] p-2 text-center text-[#2c2c2c]">
              <h4 className="mb-1 text-xl font-bold">{year}</h4>
              <p className="text-sm opacity-90">Annual celebration</p>
            </div>
            <div className="rounded-xl bg-[#b2b9b8] p-2 text-center text-[#2c2c2c]">
              <h4 className="mb-1 text-xl font-bold">
                {details.babiesNamed ?? "TBA"}
              </h4>
              <p className="text-sm opacity-90">Gorillas to be named</p>
            </div>
            <div className="rounded-xl bg-[#b2b9b8] p-2 text-center text-[#2c2c2c]">
              <h4 className="text-md mb-1 font-bold">
                {details.theme ?? "Conservation"}
              </h4>
              <p className="text-sm opacity-90">
                Protecting Rwanda&apos;s mountain gorillas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
