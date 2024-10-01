import Image from 'next/image'
import React from 'react'

export const TestimonialSection = () => {
  return (
    <div className="testimonial-section wf-section">
      <div className="testimonial-main-container w-container">
        <div className="testimonial-center-heading">
          <h1 className="testimonial-heading-no-margins">
            <em className="italic-text">
              Testimonials: &quot;Hear What Our Guests Have to Say&quot;
            </em>
          </h1>
        </div>
        <div className="w-layout-grid grid-testimonials">
          <div
            id="w-node-_0a892dcf-633e-3167-8034-1a1903b2a15b-1bbca51c"
            className="tile-testimonial"
          >
            <Image
              src="/images/Stars.svg"
              loading="lazy"
              alt=""
              className="stars-testimonial"
              width={150}
              height={150}
            />
            <div className="testimonial-paragraph">
              &quot;Le Bambou Gorilla Lodge enveloped us in pure comfort and coziness.
              The evenings were made even more enchanting as they lit fires,
              casting a warm glow that invited relaxation and storytelling. The
              thoughtful touch of hot water bottles placed on the bed ensured that
              we drifted off to sleep in ultimate comfort. It&apos;s the little details
              like these that made our stay truly unforgettable.&quot;
              <br />
            </div>
            <div className="name-wrap-testimonial">
              <div className="heading-no-margins">Rachel H.</div>
            </div>
          </div>
          <div
            id="w-node-_0a892dcf-633e-3167-8034-1a1903b2a164-1bbca51c"
            className="tile-testimonial"
          >
            <Image
              src="/images/Stars.svg"
              loading="lazy"
              alt=""
              className="stars-testimonial"
              width={150}
              height={150}
            />
            <div className="testimonial-paragraph">
              &quot;Le Bambou Gorilla Lodge provided us with a magical retreat amidst
              Rwanda&apos;s natural wonders. From the warm hospitality to the stunning
              mountain vistas outside our window, every moment was pure bliss. We
              highly recommend this haven for an unforgettable Rwandan getaway.&quot;
              <br />
              <br />
            </div>
            <div className="name-wrap-testimonial">
              <div className="heading-no-margins">Benjamin and Natalie S.</div>
            </div>
          </div>
          <div
            id="w-node-_0a892dcf-633e-3167-8034-1a1903b2a16d-1bbca51c"
            className="tile-testimonial"
          >
            <Image
              src="/images/Stars.svg"
              loading="lazy"
              alt=""
              className="stars-testimonial"
              width={150}
              height={150}
            />
            <div className="testimonial-paragraph">
              &quot;My experience at Le Bambou Gorilla Lodge was truly extraordinary.
              &nbsp;I thoroughly enjoyed the delicious dining options and
              appreciated the clean, fresh room thanks to daily housekeeping. The
              staff&apos;s insightful local area suggestions added richness to my stay,
              especially the vibrant Kinigi market visit. I&apos;m eagerly anticipating
              my return to this exceptional sanctuary.&quot;
            </div>
            <div className="name-wrap-testimonial">
              <div className="heading-no-margins">Michael and Sophia D.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
