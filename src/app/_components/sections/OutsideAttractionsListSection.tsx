import Image from "next/image";
import React from "react";

export const OutsideAttractionsListSection = () => {
  return (
    <section className="mx-auto max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-4rem)]">
      <div className="px-0 sm:px-4 md:px-8 lg:px-16">
        <div className="attraction-container">
          <div className="verticle-padding outside-the-park">
            <div className="attraction-max-width-heading">
              <h2 className="text-2xl md:text-3xl lg:text-4xl">
                <strong id="outside-volcanoes-park" className="font-bold">
                  Outside Volcanoes National Park
                </strong>
              </h2>
              <div className="py-8 text-sm md:text-base lg:text-lg">
                Beyond the Park&apos;s Borders: Discovering Exquisite Delights
                in the Surrounding Environs
              </div>
            </div>
            <div className="grid gap-8 md:gap-12 lg:gap-16 bg-[#b9c5c4] rounded-lg p-4 md:p-6 lg:p-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {attractions.map((attraction, index) => (
                <div key={index} className="attractions-item">
                  <div className="image-wrapper aspect-w-16 aspect-h-9 mb-4">
                    <Image
                      loading="lazy"
                      src={attraction.image}
                      alt={attraction.title}
                      className="object-cover rounded-lg"
                      fill={true}
                    />
                  </div>
                  <div className="text-lg md:text-xl lg:text-xl mt-4">
                    <strong>{attraction.title}</strong>
                  </div>
                  <div className="mt-2"></div>
                  <div className="text-sm md:text-base">
                    {attraction.description}
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

const attractions = [
  {
    title: "Iby'Iwacu Cultural Village:",
    image: "/images/iba.png",
    description:
      "Immerse yourself in the vibrant culture of a nearby village, where you can witness traditional dances, engage with local communities, and discover Rwandan customs, music, and crafts.",
  },
  {
    title: "Musanze Caves:",
    image: "/images/DwiI_I7WkAATzND.jpg",
    description:
      "Explore the Musanze Caves, a network of lava tubes located a short distance from Kinigi. Marvel at the geological formations and learn about the volcanic history of the region.",
  },
  {
    title: "Twin Lakes:",
    image: "/images/Twin-Lakes-of-Burera-and-Ruhondo-750x450.jpg",
    description:
      "Visit the picturesque Twin Lakes of Burera and Ruhondo near Kinigi. Enjoy scenic boat rides, birdwatching, and picnics while soaking in the tranquil atmosphere and stunning views.",
  },
  {
    title: "Buhanga Eco-Park:",
    image: "/images/buhanga-eco-park.jpg",
    description:
      "Discover the Buhanga Eco-Park, located in Musanze District. Explore the forest reserve, guided by locals, and learn about traditional rituals, cultural practices, and medicinal plants.",
  },
  {
    title: "Iby'Iwacu Community Center:",
    image: "/images/Kings-Palace-Museum-in-Rwanda.jpg",
    description:
      "Engage with the local community at the Iby'Iwacu Community Center, where you can learn about traditional Rwandan lifestyles, participate in activities like pottery making, and enjoy cultural performances.",
  },
  {
    title: "Intore dancers:",
    image: "/images/intore-dancers-performance-visit-rwanda_2x3.jpg",
    description:
      "Experience the vibrant and energetic performances of Intore dancers, showcasing traditional Rwandan dance and culture through their captivating routines and colorful costumes.",
  },
];
