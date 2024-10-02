import Image from 'next/image'
import React from 'react'

export const InsideAttractionsListSection = () => {
  return (
    <section className="mx-auto max-w-[calc(100vw-4rem)]">
      <div className="px-4 md:px-8 lg:px-16">
        <div className="">
          <div className="">
            <div className="">
              <h2 className="text-2xl md:text-3xl lg:text-4xl"><strong id="Inside-volcanoes-park" className="font-bold">Inside Volcanoes National Park</strong></h2>
              <div className="py-8 text-sm md:text-base lg:text-lg">Unveiling the Wonders: Exploring the Treasures Inside Volcanoes National Park</div>
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
                  <div className="text-lg md:text-xl lg:text-2xl mt-4"><strong>{attraction.title}</strong></div>
                  <div className="mt-2"></div>
                  <div className="text-sm md:text-base">{attraction.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const attractions = [
  {
    title: "Gorilla Trekking:",
    image: "/images/volcanoes-rwanda-gorilla-tour-0014-1200x675-cropped.jpg",
    description: "Gorilla trekking: an unforgettable wildlife experience where you observe and interact with endangered mountain gorillas in their natural habitat. Fee of $1500 USD per person, payable to the Rwanda Development Board"
  },
  {
    title: "Golden Monkey Tracking:",
    image: "/images/5-Days-Rwanda-Primates-safari-gorilla-trekking-and-golden-monkey-tracking-tour.jpg",
    description: "Apart from gorillas, Volcanoes National Park is also home to the rare golden monkeys. Visitors can embark on guided treks to observe these playful and endangered primates. Fee of $100 USD per person, payable to the Rwanda Development Board"
  },
  {
    title: "Mount Bisoke Hike:",
    image: "/images/2-Days-Mount-Bisoke-Climbing-Safari.jpg",
    description: "Embark on a rewarding hike up Mount Bisoke, an active volcano with breathtaking crater lake views. Fee of $75 USD per person, payable to the Rwanda Development Board"
  },
  {
    title: "Dian Fossey's Tomb:",
    image: "/images/Digitgrave.jpg",
    description: "Visit Dian Fossey's burial site in the park to honor her conservation legacy. Fee of $75 USD per person, payable to the Rwanda Development Board"
  }
];
