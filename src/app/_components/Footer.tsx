import React from 'react'
import { FacebookIcon } from './icons/social/FacebookIcon'
import Image from 'next/image'

export const Footer = () => {
    return (
        <footer className="footer wf-section">
            <footer className="footer-section website-bottom-border">
                <div className="footer-container">
                    <div className="w-layout-grid footer-small-grid">
                        <div
                            id="w-node-c21ffc44-39b8-7728-0e92-1efa1a22a70e-1bbca51c"
                            className="max-width-416"
                        >
                            <a
                                href="/"
                                aria-current="page"
                                className="logo spark-margin-bottom-32px w-inline-block w--current"
                            >
                                <Image src="/images/White-writing4x.png"
                                    loading="lazy"
                                    alt=""
                                    width={200}
                                    height={200} />
                            </a>
                            <p className="foreground-secondary">
                                Nestled at the foothills of Volcanoes National Park in Kinigi,
                                Rwanda, Le Bambou Gorilla Lodge offers a captivating retreat
                                amidst the majestic home of mountain gorillas.
                            </p>
                        </div>
                        <div
                            id="w-node-c21ffc44-39b8-7728-0e92-1efa1a22a713-1bbca51c"
                            className="footer-column right-side-footer-column"
                        >
                            <p className="footer-bold-heading">Email</p>
                            <a
                                href="mailto:info@lebambougorillalodge.com?subject=Booking!"
                                className="link-block w-inline-block"
                            >
                                <p className="foreground-secondary">
                                    info@lebambougorillalodge.com
                                </p>
                            </a>
                            <p className="footer-bold-heading">Location</p>
                            <p className="foreground-secondary">
                                Kinigi Sector, Musanze District, Northern Province - RWANDA
                            </p>
                            <p className="footer-bold-heading center-of-reservations-header">
                                Centre of Reservations (COR)
                            </p>
                            <p className="foreground-secondary">
                                (+250) 784753415 (Reception)
                                <br />
                                <br />
                                (+250) 788307374 (reservations)
                            </p>
                        </div>
                        <div
                            id="w-node-c21ffc44-39b8-7728-0e92-1efa1a22a720-1bbca51c"
                            className="flexed-row-of-links"
                        >
                            <a
                                href="/about"
                                className="footer-button light-button w-button"
                            >
                                About
                            </a>
                            <a
                                href="/contact"
                                className="footer-button light-button w-button"
                            >
                                Contact
                            </a>
                            <a
                                href="/bookings-cancellations"
                                className="footer-button light-button w-button"
                            >
                                Bookings &amp; Cancellations
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="footer-bottom footer-background">
                <div className="footer-container w-container">
                    <div className="flex-row _24px-row-spacing">
                        <p className="footer-text">
                            Copyright © 2024 | Le Bambou Gorilla Lodge
                        </p>
                        <div className="social-link-row">
                            <a
                                aria-label="Facebook"
                                href="https://www.facebook.com/lebambougorillalodge"
                                target="_blank"
                                className="social-link w-inline-block"
                            >
                                <div className="social-icon-svg w-embed">
                                    <FacebookIcon />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
