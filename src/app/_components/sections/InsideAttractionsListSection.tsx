import Image from "next/image";
import React from "react";

export const InsideAttractionsListSection = () => {
  const attractions = [
    {
      title: "Mountain Gorilla Trekking",
      image:
        "/images/client_experiences/with_gorillas/IMG-20241113-WA0011.webp",
      description:
        "Embark on an extraordinary journey tracking endangered Mountain gorillas in Volcanoes National Park. This immersive experience offers a rare, up-close encounter with these magnificent creatures across 10 habituated gorilla groups throughout the year.",
      price: "1500 USD per person payable to Rwanda Development Board",
    },
    {
      title: "Golden Monkey Tracking",
      image:
        "/images/5-Days-Rwanda-Primates-safari-gorilla-trekking-and-golden-monkey-tracking-tour.jpg",
      description:
        "Discover the rare golden monkeys in Volcanoes National Park, home to two habituated troops of about 80 members each. The tracking experience begins at 7:00 AM, offering a unique wildlife encounter in their natural habitat.",
      price: "100 USD per person payable to Rwanda Development Board",
    },
    {
      title: "Volcano Hiking",
      image: "/images/2-Days-Mount-Bisoke-Climbing-Safari.jpg",
      description:
        "Challenge yourself with a breathtaking hike through the majestic volcanoes of the Virunga Massif. Explore iconic peaks like Bisoke and Karisimbi, experiencing stunning landscapes and panoramic views of the surrounding wilderness.",
      price: "75 USD for foreigners, 65 USD for East Africa Residents",
    },
    {
      title: "Dian Fossey Tomb Trek",
      image: "/images/Digitgrave.jpg",
      description:
        "Follow in the footsteps of legendary primatologist Dian Fossey on a meaningful trek to her tomb and the historic Karisoke Research Camp. A 30-minute drive and short walk reveal the site of her groundbreaking conservation work.",
      price: "75 USD per person payable to Rwanda Development Board",
    },
  ];

  return (
    <section className="mx-auto max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-4rem)]">
      <div className="px-0 sm:px-4 md:px-8 lg:px-16">
        <div className="">
          <div className="">
            <div className="">
              <h2 className="text-2xl md:text-3xl lg:text-4xl">
                <strong id="inside-volcanoes-park" className="font-bold">
                  Inside Volcanoes National Park
                </strong>
              </h2>
              <div className="py-8 text-sm md:text-base lg:text-lg">
                Unveiling the Wonders: Exploring the Treasures Inside Volcanoes
                National Park
              </div>
            </div>
            <div className="grid gap-8 md:gap-12 lg:gap-16 bg-[#b9c5c4] rounded-lg p-4 md:p-6 lg:p-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {attractions.map((attraction, index) => (
                <div key={index} className="attractions-item">
                  <div className="image-wrapper aspect-w-16 aspect-h-9 mb-4">
                    <Image
                      loading="lazy"
                      src={attraction.image}
                      alt={attraction.title}
                      className="object-cover rounded-lg"
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="text-lg md:text-xl lg:text-2xl mt-4">
                    <strong>{attraction.title}</strong>
                  </div>
                  <div className="mt-2">{attraction.description}</div>
                  <div className="mt-4 text-sm font-bold">
                    {attraction.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
