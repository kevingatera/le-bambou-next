import Image from 'next/image'
import React from 'react'

export const OutsideAttractionsListSection = () => {
  return (
    <section className="attractionslist-section">
      <div className="attraction-page-padding">
        <div className="attraction-container">
          <div className="verticle-padding outside-the-park">
            <div className="attraction-max-width-heading">
              <h2 className="attraction-heading"><strong id="Outside-volcanoes-park" className="bold-text-4">Outside Volcanoes National Park</strong></h2>
              <div className="attractions-text py-8">Beyond the Park's Borders: Discovering Exquisite Delights in the Surrounding Environs</div>
            </div>
            <div className="grid gap-16 bg-[#b9c5c4] rounded-lg p-8 grid-cols-3">
              <div className="attractions-item">
                <div className="image-wrapper">
                  <Image loading="lazy" src="/images/iba.png" alt="" className="uui-team04_image" width={100} height={100} />
                </div>
                <div className="attraction-text"><strong>Iby'Iwacu Cultural Village:</strong></div>
                <div className="small-space"></div>
                <div className="attraction-text">Immerse yourself in the vibrant culture of a nearby village, where you can witness traditional dances, engage with local communities, and discover Rwandan customs, music, and crafts.</div>
              </div>
              <div className="attractions-item">
                <div className="image-wrapper">
                  <Image loading="lazy" src="/images/DwiI_I7WkAATzND.jpg" alt="" className="uui-team04_image" width={100} height={100} />
                </div>
                <div className="attraction-text"><strong>Musanze Caves:</strong></div>
                <div className="small-space"></div>
                <div className="attraction-text">Explore the Musanze Caves, a network of lava tubes located a short distance from Kinigi. Marvel at the geological formations and learn about the volcanic history of the region.</div>
              </div>
              <div className="attractions-item">
                <div className="image-wrapper">
                  <Image loading="lazy" src="/images/Twin-Lakes-of-Burera-and-Ruhondo-750x450.jpg" alt="" className="uui-team04_image" width={100} height={100} />
                </div>
                <div className="attraction-text"><strong>Twin Lakes:</strong></div>
                <div className="small-space"></div>
                <div className="attraction-text">Visit the picturesque Twin Lakes of Burera and Ruhondo near Kinigi. Enjoy scenic boat rides, birdwatching, and picnics while soaking in the tranquil atmosphere and stunning views.</div>
              </div>
              <div className="attractions-item">
                <div className="image-wrapper">
                  <Image loading="lazy" src="/images/buhanga-eco-park.jpg" alt="" className="uui-team04_image" width={100} height={100} />
                </div>
                <div className="attraction-text"><strong>Buhanga Eco-Park:</strong></div>
                <div className="small-space"></div>
                <div className="attraction-text">Discover the Buhanga Eco-Park, located in Musanze District. Explore the forest reserve, guided by locals, and learn about traditional rituals, cultural practices, and medicinal plants.</div>
              </div>
              <div className="attractions-item">
                <div className="image-wrapper">
                  <Image loading="lazy" src="/images/Kings-Palace-Museum-in-Rwanda.jpg" alt="" className="uui-team04_image" width={100} height={100} />
                </div>
                <div className="attraction-text"><strong>Iby'Iwacu Community Center:</strong></div>
                <div className="small-space"></div>
                <div className="attraction-text">Engage with the local community at the Iby'Iwacu Community Center, where you can learn about traditional Rwandan lifestyles, participate in activities like pottery making, and enjoy cultural performance</div>
              </div>
              <div className="attractions-item">
                <div className="image-wrapper">
                  <Image loading="lazy" src="/images/intore-dancers-performance-visit-rwanda_2x3.jpg" alt="" className="uui-team04_image" width={100} height={100} />
                </div>
                <div className="attraction-text"><strong>Intore dancers:</strong></div>
                <div className="small-space"></div>
                <div className="attraction-text">Engage with the local community at the Iby'Iwacu Community Center, where you can learn about traditional Rwandan lifestyles, participate in activities like pottery making, and enjoy cultural performance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
