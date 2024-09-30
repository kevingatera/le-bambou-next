import Image from 'next/image'
import React from 'react'

export const InsideAttractionsListSection = () => {
  return (
    <section className="attractionslist-section">
      <div className="attraction-page-padding">
        <div className="attraction-container">
          <div className="verticle-padding outside-the-park">
            <div className="attraction-max-width-heading">
              <h2 className="attraction-heading"><strong id="Inside-volcanoes-park" className="bold-text-4">Inside Volcanoes National Park</strong></h2>
              <div className="attractions-text py-8">Unveiling the Wonders: Exploring the Treasures Inside Volcanoes National Park</div>
            </div>
            <div className="grid gap-16 bg-[#b9c5c4] rounded-lg p-8 grid-cols-4">
              <div className="attractions-item">
                <div className="image-wrapper">
                  <Image loading="lazy" src="/images/volcanoes-rwanda-gorilla-tour-0014-1200x675-cropped.jpg" alt="" className="uui-team04_image" width={100} height={100} />
                </div>
                <div className="attraction-text"><strong>Gorilla Trekking:</strong></div>
                <div className="small-space"></div>
                <div className="attraction-text">Gorilla trekking: an unforgettable wildlife experience where you observe and interact with endangered mountain gorillas in their natural habitat.<br />Fee of $1500 USD per person, payable to the Rwanda Development Board</div>
              </div>
              <div className="attractions-item">
                <div className="image-wrapper">
                  <Image loading="lazy" src="/images/5-Days-Rwanda-Primates-safari-gorilla-trekking-and-golden-monkey-tracking-tour.jpg" alt="" className="uui-team04_image" width={100} height={100} />
                </div>
                <div className="attraction-text"><strong>Golden Monkey Tracking:</strong></div>
                <div className="small-space"></div>
                <div className="attraction-text">Apart from gorillas, Volcanoes National Park is also home to the rare golden monkeys. Visitors can embark on guided treks to observe these playful and endangered primates.<br />Fee of $100 USD per person, payable to the Rwanda Development Board</div>
              </div>
              <div className="attractions-item">
                <div className="image-wrapper">
                  <Image loading="lazy" src="/images/2-Days-Mount-Bisoke-Climbing-Safari.jpg" alt="" className="uui-team04_image" width={100} height={100} />
                </div>
                <div className="attraction-text"><strong>Mount Bisoke Hike:</strong></div>
                <div className="small-space"></div>
                <div className="attraction-text">Embark on a rewarding hike up Mount Bisoke, an active volcano with breathtaking crater lake views.<br />Fee of $75 USD per person, payable to the Rwanda Development Board</div>
              </div>
              <div className="attractions-item">
                <div className="image-wrapper">
                  <Image loading="lazy" src="/images/Digitgrave.jpg" alt="" className="uui-team04_image" width={100} height={100} />
                </div>
                <div className="attraction-text"><strong>Dian Fossey's Tomb:</strong></div>
                <div className="small-space"></div>
                <div className="attraction-text">Visit Dian Fossey's burial site in the park to honor her conservation legacy.<br />Fee of $75 USD per person, payable to the Rwanda Development Board</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
