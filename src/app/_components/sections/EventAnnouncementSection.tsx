import React from "react";
import Link from "next/link";

export const EventAnnouncementSection = () => {
  return (
    <section id="kwita-izina-event" className="homepage wf-section pt-12 pb-16" style={{ background: 'linear-gradient(to bottom, #fdfcfb, #fff)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 bg-[#6b8e7f] text-white text-md font-semibold rounded-full mb-8">
              KWITA IZINA 2025
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              20th Anniversary Gorilla Naming Ceremony
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join Rwanda&apos;s flagship conservation event as we celebrate naming 40 baby mountain gorillas
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12 bg-[#d7dfde]">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Event Highlights</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#e8ede9] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#4a6358]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg text-gray-900">Friday, September 5, 2025</h4>
                      <p className="text-gray-600">Week-long celebration of conservation</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#e8ede9] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#4a6358]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg text-gray-900">Volcanoes National Park</h4>
                      <p className="text-gray-600">Kinigi, Musanze District</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#e8ede9] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#4a6358]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg text-gray-900">Special Features</h4>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Naming of 40 baby mountain gorillas</li>
                        <li>• Honoring local communities & rangers</li>
                        <li>• Launch of smart green agricultural project</li>
                        <li>• Traditional Rwandan naming ceremonies</li>
                        <li>• Conservation success celebrations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-[#566c6a] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#445452] transition duration-200"
                  >
                    Reserve Your Spot Now
                  </Link>
                  <Link
                    href="https://x.com/Kwitaizina/status/1960661267158282719"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-white border-2 border-[#4a6358] text-[#4a6358] font-semibold py-4 px-6 rounded-lg hover:bg-[#f5f7f6] transition duration-200"
                  >
                    Learn More on X/Twitter
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                {/* Video Background */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/videos/kwita-izina-background.mp4" type="video/mp4" />
                  <source src="/videos/kwita-izina-background.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-br from-[#4a6358] to-[#3a4f47] opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
                  {/* <div className="text-white text-center">
                    <h3 className="text-3xl font-bold mb-2">20 Years of Conservation</h3>
                    <p className="text-xl opacity-90">397 Gorillas Named Since 2005</p>
                    <div className="mt-6">
                      <p className="text-2xl font-bold">Special Packages</p>
                      <p className="text-lg opacity-90">Exclusive gorilla trekking experiences</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Kwita Izina celebrates Rwanda&apos;s centuries-old tradition of naming children in the presence of family and friends,
              adapted to honor our precious mountain gorillas and conservation heroes.
            </p>
          </div>

          {/* Conservation Stats Banner */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 mt-8">
            <div className="bg-[#b2b9b8] text-[#2c2c2c] p-2 rounded-xl text-center">
              <h4 className="text-xl font-bold mb-1">20 Years</h4>
              <p className="text-sm opacity-90">of Conservation Success</p>
            </div>
            <div className="bg-[#b2b9b8] text-[#2c2c2c] p-2 rounded-xl text-center">
              <h4 className="text-xl font-bold mb-1">397 Gorillas</h4>
              <p className="text-sm opacity-90">Named Since 2005</p>
            </div>
            <div className="bg-[#b2b9b8] text-[#2c2c2c] p-2 rounded-xl text-center">
              <h4 className="text-md font-bold mb-1">Special Packages</h4>
              <p className="text-sm opacity-90">Exclusive Trekking Experiences</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};