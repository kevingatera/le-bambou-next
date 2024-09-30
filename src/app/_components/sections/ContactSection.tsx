import Image from 'next/image'
import React from 'react'
import { dynamicBlurDataUrl } from '~/app/_utils/ImageUtils'
import { ContactForm } from '../ContactForm'

export const ContactSection = async () => {
  return (
    <section className="contact-section">
      <div className="container mx-auto px-4 py-16 max-w-[80rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="contact-form flex flex-col justify-center">
            <h2 className="text-[#2c2c2c] mt-0 mb-0 text-3xl font-normal leading-snug">Contact us</h2>
            <div className="mb-4"></div>
            <p className="mb-6 text-lg">
              Feel free to contact us anytime through: <a href="mailto:info@lebambougorillalodge.com?subject=Booking!" className="text-[#2c2c2c] font-semibold hover:underline">info@lebambougorillalodge.com</a>
            </p>
            <ContactForm />
          </div>
          <div className="contact-image-wrapper">
            <Image
              src="/images/DSC_3662.webp"
              alt="Contact image"
              className="w-full h-[45rem] object-cover rounded-lg"
              width={3008}
              height={2000}
              blurDataURL={await dynamicBlurDataUrl('/images/DSC_3662.webp')}
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </section>
  )
}