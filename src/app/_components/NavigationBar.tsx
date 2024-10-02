'use client';

import React, { useState, useEffect } from 'react';
import { DropdownArrow } from '~/app/_components/icons/DropDownArrow';
import Image from 'next/image';

export const NavigationBar = () => {
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(null);

  // Effect to toggle body scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Clean up on unmount
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex items-center min-h-[7rem] bg-[#b9c5c4] border border-black px-1 md:px-10 lg:px-[95px]">
      <div className="flex items-center justify-between w-full">
        {/* Logo - visible on mobile, hidden on desktop */}
        <a href="/" aria-current="page" className="navbar-logo-link w-nav-brand w--current md:hidden">
          <Image
            src="/images/Asset-34x.png"
            width={75}
            height={75}
            alt=""
            className="navbar-logo"
            priority={true}
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:justify-between md:w-full">
          {/* Left side navigation items */}
          <div className="flex items-center justify-start flex-1">
            {/* Stay Dropdown */}
            <div
              className="group relative"
              onMouseEnter={() => setHoveredDropdown('stay')}
              onMouseLeave={() => setHoveredDropdown(null)}
            >
              <div className="navbar-dropdown-toggle w-dropdown-toggle flex items-center">
                <a href="stay" className="link-block-2 w-inline-block">
                  <div className="rnavbar-link-text">Stay</div>
                </a>
                <div className="w-4 h-4 flex flex-col justify-center items-center my-auto mr-4 absolute top-0 bottom-0 right-0">
                  <DropdownArrow direction={hoveredDropdown === 'stay' ? 'down' : 'up'} />
                </div>
              </div>
              <nav className="absolute left-0 top-full transform translate-y-2 z-10 opacity-0 invisible bg-[#b9c5c4] border border-black/75 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible">
                <a
                  href="/stay#Amenities"
                  className="navbar-dropdown-link block px-6 py-2 text-[#2c2c2c] hover:bg-[#d7dfde] text-base"
                >
                  Amenities
                </a>
                <a
                  href="/stay#Rooms"
                  className="navbar-dropdown-link block px-6 py-2 text-[#2c2c2c] hover:bg-[#d7dfde] text-base"
                >
                  Room&nbsp;Types
                </a>
                <a
                  href="/stay#Hotel-Gallery"
                  className="navbar-dropdown-link block px-6 py-2 text-[#2c2c2c] hover:bg-[#d7dfde] text-base"
                >
                  Hotel&nbsp;Gallery
                </a>
              </nav>
            </div>

            {/* Explore Dropdown */}
            <div
              className="group relative"
              onMouseEnter={() => setHoveredDropdown('explore')}
              onMouseLeave={() => setHoveredDropdown(null)}
            >
              <div className="navbar-dropdown-toggle w-dropdown-toggle flex items-center">
                <a href="explore" className="link-block-3 w-inline-block">
                  <div className="rnavbar-link-text">Explore</div>
                </a>
                <div className="w-4 h-4 flex flex-col justify-center items-center my-auto mr-4 absolute top-0 bottom-0 right-0">
                  <DropdownArrow direction={hoveredDropdown === 'explore' ? 'down' : 'up'} />
                </div>
              </div>
              <nav className="absolute w-[185px] left-0 top-full transform translate-y-2 z-10 opacity-0 invisible bg-[#b9c5c4] border border-black/75 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible">
                <a
                  href="/explore#Kinigi-journey"
                  className="navbar-dropdown-link block px-6 py-2 text-[#2c2c2c] hover:bg-[#d7dfde] text-base"
                >
                  Journey
                </a>
                <a
                  href="/explore#Inside-volcanoes-park"
                  className="navbar-dropdown-link block px-6 py-2 text-[#2c2c2c] hover:bg-[#d7dfde] text-base"
                >
                  Inside The Park
                </a>
                <a
                  href="/explore#outside-volcanoes-park"
                  className="navbar-dropdown-link block px-6 py-2 text-[#2c2c2c] hover:bg-[#d7dfde] text-base"
                >
                  Outside The Park
                </a>
              </nav>
            </div>

            {/* About Link */}
            <a href="about" className="navbar-link sidenavbar mr-4">
              About
            </a>
            {/* Contact Link */}
            <a href="contact" className="navbar-link sidenavbar mr-4">
              Contact
            </a>
          </div>

          {/* Centered Logo - visible only on desktop */}
          <div className="flex items-center justify-center flex-1">
            <a href="/" aria-current="page" className="navbar-logo-link w-nav-brand w--current hidden md:block">
              <Image
                src="/images/Asset-34x.png"
                priority={true}
                width={100}
                height={100}
                alt=""
                className="navbar-logo"
              />
            </a>
          </div>

          {/* Right side navigation items */}
          <div className="flex items-center justify-end flex-1">
            {/* Book Now Button */}
            <a href="booking" className="navbarbutton align-end">
              Book Now
            </a>
          </div>
        </nav>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-gray-700 focus:outline-none px-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              // Close icon
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Hamburger icon
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-white z-50 flex flex-col p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <a href="/" aria-current="page" className="navbar-logo-link w-nav-brand w--current">
              <Image
                src="/images/Asset-34x.png"
                loading="lazy"
                width={100}
                height={100}
                alt=""
                className="navbar-logo"
              />
            </a>
            {/* Close Button */}
            <button
              className="text-gray-700 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {/* Close icon */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Mobile Menu Items */}
          <nav className="flex flex-col flex-grow">
            <div className="py-5 px-3 space-y-5 flex-grow">
              {/* Stay Dropdown */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-left text-gray-700 text-lg font-medium focus:outline-none"
                  onClick={() => setMobileSubMenuOpen(mobileSubMenuOpen === 'stay' ? null : 'stay')}
                >
                  Stay
                  <div className="w-4 h-4 flex flex-col justify-center items-center my-auto mr-4 top-0 bottom-0 right-0">
                    <DropdownArrow direction={mobileSubMenuOpen === 'stay' ? 'down' : 'up'} />
                  </div>
                </button>
                {mobileSubMenuOpen === 'stay' && (
                  <div className="mt-2 ml-4 flex flex-col space-y-2">
                    <a href="/stay#Amenities" className="text-gray-600 text-base">
                      Amenities
                    </a>
                    <a href="/stay#Rooms" className="text-gray-600 text-base">
                      Room Types
                    </a>
                    <a href="/stay#Hotel-Gallery" className="text-gray-600 text-base">
                      Hotel Gallery
                    </a>
                  </div>
                )}
              </div>

              {/* Explore Dropdown */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-left text-gray-700 text-lg font-medium focus:outline-none"
                  onClick={() => setMobileSubMenuOpen(mobileSubMenuOpen === 'explore' ? null : 'explore')}
                >
                  Explore
                  <div className="w-4 h-4 flex flex-col justify-center items-center my-auto mr-4 top-0 bottom-0 right-0">
                    <DropdownArrow direction={mobileSubMenuOpen === 'explore' ? 'down' : 'up'} />
                  </div>
                </button>
                {mobileSubMenuOpen === 'explore' && (
                  <div className="mt-2 ml-4 flex flex-col space-y-2">
                    <a href="/explore#Kinigi-journey" className="text-gray-600 text-base">
                      Journey
                    </a>
                    <a href="/explore#Inside-volcanoes-park" className="text-gray-600 text-base">
                      Inside The Park
                    </a>
                    <a href="/explore#outside-volcanoes-park" className="text-gray-600 text-base">
                      Outside The Park
                    </a>
                  </div>
                )}
              </div>

              {/* Other Links */}
              <div>
                <a href="about" className="text-gray-700 text-lg font-medium">
                  About
                </a>
              </div>


              <div>
                <a href="contact" className="text-gray-700 text-lg font-medium">
                  Contact
                </a>
              </div>
            </div>
            <div className="flex items-center justify-end flex-1 md:hidden mt-6">
              {/* Book Now Button */}
              <a href="booking" className="navbarbutton w-full text-center py-2 bg-button text-white rounded block">
                Book Now
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};