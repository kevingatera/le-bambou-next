'use client'

import React, { useCallback } from 'react'
import { FacebookIcon } from './icons/social/FacebookIcon'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Footer = () => {
    const pathname = usePathname();

    const isActive = useCallback((href: string) => {
        if (typeof window !== 'undefined') {
            return href == pathname + window?.location.hash || href == pathname;
        }
        return href == pathname;
    }, [pathname]);
    

    return (
        <footer className="footer wf-section">
            <footer className="footer-section website-bottom-border">
                <div className="footer-container">
                    <div className="w-layout-grid footer-small-grid">
                        <div
                            className="max-width-416"
                        >
                            <a
                                href="/"
                                aria-current="page"
                                className="logo spark-margin-bottom-32px w-inline-block text-[#2c2c2c] font-bold"
                            >
                                <Image src="/images/White-writing4x.png"
                                    loading="lazy"
                                    alt=""
                                    width={200}
                                    height={200} />
                            </a>
                            <p className="text-[rgba(0,0,0,.76)]">
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
                                <p className="text-[rgba(0,0,0,.76)]">
                                    info@lebambougorillalodge.com
                                </p>
                            </a>
                            <p className="footer-bold-heading">Location</p>
                            <p className="text-[rgba(0,0,0,.76)]">
                                Kinigi Sector, Musanze District, Northern Province - RWANDA
                            </p>
                            <p className="footer-bold-heading center-of-reservations-header">
                                Centre of Reservations (COR)
                            </p>
                            <p className="text-[rgba(0,0,0,.76)]">
                                (+250) 784753415 (Reception)
                                <br />
                                <br />
                                (+250) 788307374 (reservations)
                            </p>
                        </div>
                        <div
                            className="flexed-row-of-links pt-4"
                        >
                            <Link
                                href="/about"
                                className={`font-bold bg-transparent border-none py-3 mr-6 leading-none transition-colors duration-150 hover:text-[#ebf8f7] ${isActive('/about') ? 'text-[#2c2c2c]' : 'text-[#ebf8f7]'}`}
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className={`font-bold bg-transparent border-none py-3 mr-6 leading-none transition-colors duration-150 hover:text-[#ebf8f7 ${isActive('/contact') ? 'text-[#2c2c2c]' : 'text-[#ebf8f7]'}`}
                            >
                                Contact
                            </Link>
                            <Link
                                href="/hotel-policies"
                                className={`font-bold bg-transparent border-none py-3 mr-6 leading-none transition-colors duration-150 hover:text-[#ebf8f7] ${isActive('/hotel-policies') ? 'text-[#2c2c2c]' : 'text-[#ebf8f7]'}`}
                            >
                                Bookings & Cancellations
                            </Link>
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
