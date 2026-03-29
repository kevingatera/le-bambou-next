import Image from "next/image";
import React from "react";
import { ContactForm } from "../ContactForm";

export const ContactSection = () => {
  return (
    <section className="mx-auto max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-4rem)] py-12">
      <div className="container mx-auto md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="contact-form flex flex-col justify-center w-full max-w-2xl mx-auto md:mx-0 px-4 sm:pl-16">
            <h1 className="text-[#2c2c2c] mt-0 mb-0 text-3xl font-normal leading-snug">
              Contact us
            </h1>
            <div className="mb-4"></div>
            <p className="mb-6 text-lg">
              Feel free to contact us anytime through:{" "}
              <a
                href="mailto:info@lebambougorillalodge.com?subject=Booking!"
                className="text-[#2c2c2c] font-semibold hover:underline"
              >
                info@lebambougorillalodge.com
              </a>
            </p>
            <ContactForm />
          </div>
          <div className="contact-image-wrapper relative flex justify-center items-center w-full">
            <Image
              src="/images/DSC_3662.webp"
              alt="Contact image"
              className="inset-0 h-[360px] w-full rounded-lg object-cover sm:h-[460px] xl:h-[550px] 2xl:w-[600px]"
              width={3008}
              height={2000}
              quality={75}
              priority
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) 50vw, 600px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
