import Image from 'next/image'
import React from 'react'

export const ContactSection = () => {
  return (
    <section className="contact-section">
      <div className="contact-padding">
        <div className="contact-container">
          <div className="contact---verticle-padding">
            <div className="w-layout-grid contact-grid-component">
              <div className="contact-form">
                <h2 className="contact-us-heading">Contact us</h2>
                <div className="small-space"></div>
                <div className="contact-text">Feel free to contact us anytime through: <a href="mailto:info@lebambougorillalodge.com?subject=Booking!" className="text-style-link">info@lebambougorillalodge.com</a>
                </div>
                <div className="contact-form-wrapper w-form">
                  <form id="wf-form-Contact-05-form" name="wf-form-Contact-05-form" data-name="Contact 05 form" method="get" className="contact-us-form" data-wf-page-id="6494e15ced7138ebf2a6c59f" data-wf-element-id="b69ac441-1943-2f40-be61-18d3c4cc4154" aria-label="Contact 05 form">
                    <div className="field-form-wrapper">
                      <label htmlFor="Contact-05-name" className="contact-form-label">Name</label>
                      <input type="text" className="form-input w-input" maxLength={256} name="Contact-05-name" data-name="Contact 05 name" placeholder="Your name" id="Contact-05-name" required={true} />
                    </div>
                    <div className="field-form-wrapper">
                      <label htmlFor="Contact-05-email" className="contact-form-label">Email</label>
                      <input type="email" className="form-input w-input" maxLength={256} name="Contact-05-email" data-name="Contact 05 email" placeholder="you@company.com" id="Contact-05-email" required={true} />
                    </div>
                    <div className="field-form-wrapper">
                      <label htmlFor="Contact-05-message" className="contact-form-label">Message</label>
                      <textarea id="Contact-05-message" name="Contact-05-message" maxLength={5000} data-name="Contact 05 message" placeholder="Type your message..." required={true} className="form-input text-area w-input" />
                    </div>
                    <div id="w-node-b69ac441-1943-2f40-be61-18d3c4cc4168-f2a6c59f" className="contact-form-button-wrapper">
                      <input type="submit" value="Send message" data-wait="Please wait..." id="w-node-b69ac441-1943-2f40-be61-18d3c4cc4169-f2a6c59f" className="discover-button w-button" />
                    </div>
                  </form>
                  <div className="success-message w-form-done" tabIndex={-1} role="region" aria-label="Contact 05 form success">
                    <div className="success-text">Thank you! Your submission has been received!</div>
                  </div>
                  <div className="error-message w-form-fail" tabIndex={-1} role="region" aria-label="Contact 05 form failure">
                    <div className="error-text">Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
              </div>
              <div className="contact-image-wrapper">
                <Image src="/images/DSC_3662.webp"
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 767px) 96vw, 44vw"
                  alt="Contact image"
                  className="contact-image"
                  width={3008}
                  height={2000}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}
