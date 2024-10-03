'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DropdownArrow } from '~/app/_components/icons/DropDownArrow';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const NavigationBar = () => {
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(null);
  const pathname = usePathname();

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

  const isActive = useCallback((href: string) => {
    if (typeof window !== 'undefined') {
      console.log(href, pathname + window?.location.hash);
      return href == pathname + window?.location.hash || href == pathname;
    }
    return href == pathname;
  }, [pathname]);

  useEffect(() => {
    // Check if the current pathname matches any of the dropdowns
    const activeDropdown = ['stay', 'explore'].find(dropdown => isActive(`/${dropdown}`));
    setMobileSubMenuOpen(activeDropdown ?? null);
  }, [pathname]);

  return (
    <div className="flex items-center min-h-[7rem] bg-[#b9c5c4] px-1 md:px-10 lg:px-[95px]">
      <div className="flex items-center justify-between w-full">
        {/* Logo - visible on mobile, hidden on desktop */}
        <Link href="/" aria-current="page" className="w-nav-brand text-[#2c2c2c] font-bold md:hidden">
          <Image
            src="/images/Asset-34x.png"
            width={75}
            height={75}
            alt=""
            className="navbar-logo"
            priority={true}
          />
        </Link>

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
              <div className="mr-auto pr-8 flex items-center">
                <a href="stay" className="link-block-2 w-inline-block">
                  <div className={`text-xl ${isActive('/stay') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'}`}>Stay</div>
                </a>
                <div className="w-4 h-4 flex flex-col justify-center items-center my-auto mr-[0.8rem] absolute top-0 bottom-0 right-0">
                  <DropdownArrow direction={hoveredDropdown === 'stay' ? 'down' : 'up'} />
                </div>
              </div>
              <nav className="absolute left-0 top-full transform translate-y-2 z-10 opacity-0 invisible bg-[#b9c5c4] border border-black/75 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible mt-2">
                <Link
                  href="/stay#Amenities"
                  className={`navbar-dropdown-link block px-6 py-2 hover:bg-[#d7dfde] text-base ${
                    isActive('/stay#Amenities') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'
                  }`}
                >
                  Amenities
                </Link>
                <Link
                  href="/stay#Rooms"
                  className={`navbar-dropdown-link block px-6 py-2 hover:bg-[#d7dfde] text-base ${
                    isActive('/stay#Rooms') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'
                  }`}
                >
                  Room&nbsp;Types
                </Link>
                <Link
                  href="/stay#Hotel-Gallery"
                  className={`navbar-dropdown-link block px-6 py-2 hover:bg-[#d7dfde] text-base ${
                    isActive('/stay#Hotel-Gallery') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'
                  }`}
                >
                  Hotel&nbsp;Gallery
                </Link>
              </nav>
            </div>

            {/* Explore Dropdown */}
            <div
              className="group relative"
              onMouseEnter={() => setHoveredDropdown('explore')}
              onMouseLeave={() => setHoveredDropdown(null)}
            >
              <div className="pr-8 flex items-center">
                <a href="explore" className="link-block-3 w-inline-block">
                  <div className={`text-xl ${isActive('/explore') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'}`}>Explore</div>
                </a>
                <div className="w-4 h-4 flex flex-col justify-center items-center my-auto mr-[0.8rem] absolute top-0 bottom-0 right-0">
                  <DropdownArrow direction={hoveredDropdown === 'explore' ? 'down' : 'up'} />
                </div>
              </div>
              <nav className="absolute w-[185px] left-0 top-full transform translate-y-2 z-10 opacity-0 invisible bg-[#b9c5c4] border border-black/75 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible mt-2">
                <Link
                  href="/explore#Kinigi-journey"
                  className={`navbar-dropdown-link block px-6 py-2 hover:bg-[#d7dfde] text-base ${
                    isActive('/explore#Kinigi-journey') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'
                  }`}
                >
                  Journey
                </Link>
                <Link
                  href="/explore#Inside-volcanoes-park"
                  className={`navbar-dropdown-link block px-6 py-2 hover:bg-[#d7dfde] text-base ${
                    isActive('/explore#Inside-volcanoes-park') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'
                  }`}
                >
                  Inside The Park
                </Link>
                <Link
                  href="/explore#outside-volcanoes-park"
                  className={`navbar-dropdown-link block px-6 py-2 hover:bg-[#d7dfde] text-base ${
                    isActive('/explore#outside-volcanoes-park') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'
                  }`}
                >
                  Outside The Park
                </Link>
              </nav>
            </div>

            {/* About Link */}
            <a href="about" className={`text-xl mr-4 ${isActive('/about') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'}`}>
              About
            </a>
            {/* Contact Link */}
            <a href="contact" className={`text-xl mr-4 ${isActive('/contact') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'}`}>
              Contact
            </a>
          </div>

          {/* Centered Logo - visible only on desktop */}
          <div className="flex items-center justify-center flex-1">
            <a href="/" aria-current="page" className="w-nav-brand text-[#2c2c2c] font-bold hidden md:block">
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
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden absolute top-0 left-0 w-full h-dvh bg-white z-50 flex flex-col p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <a href="/" aria-current="page" className="w-nav-brand text-[#2c2c2c] font-bold">
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
              <svg className="w-8 h-8 mb-8 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className={`flex items-center justify-between w-full text-left text-gray-700 text-lg focus:outline-none ${isActive('/stay') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'}`}
                  onClick={() => setMobileSubMenuOpen(mobileSubMenuOpen === 'stay' ? null : 'stay')}
                >
                  Stay
                  <div className="w-4 h-4 flex flex-col justify-center items-center my-auto mr-4 top-0 bottom-0 right-0">
                    <DropdownArrow direction={mobileSubMenuOpen === 'stay' ? 'down' : 'up'} />
                  </div>
                </button>
                {mobileSubMenuOpen === 'stay' && (
                  <div className="mt-2 ml-4 flex flex-col space-y-2">
                    <Link
                      href="/stay#Amenities"
                      className={`text-gray-600 text-base ${
                        isActive('/stay#Amenities') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'
                      }`}
                    >
                      Amenities
                    </Link>
                    <Link
                      href="/stay#Rooms"
                      className={`text-gray-600 text-base ${
                        isActive('/stay#Rooms') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'
                      }`}
                    >
                      Room Types
                    </Link>
                    <Link
                      href="/stay#Hotel-Gallery"
                      className={`text-gray-600 text-base ${
                        isActive('/stay#Hotel-Gallery') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'
                      }`}
                    >
                      Hotel Gallery
                    </Link>
                  </div>
                )}
              </div>

              {/* Explore Dropdown */}
              <div>
                <button
                  className={`flex items-center justify-between w-full text-left text-gray-700 text-lg focus:outline-none ${isActive('/explore') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'}`}
                  onClick={() => setMobileSubMenuOpen(mobileSubMenuOpen === 'explore' ? null : 'explore')}
                >
                  Explore
                  <div className="w-4 h-4 flex flex-col justify-center items-center my-auto mr-4 top-0 bottom-0 right-0">
                    <DropdownArrow direction={mobileSubMenuOpen === 'explore' ? 'down' : 'up'} />
                  </div>
                </button>
                {mobileSubMenuOpen === 'explore' && (
                  <div className="mt-2 ml-4 flex flex-col space-y-2">
                    <Link
                      href="/explore#Kinigi-journey"
                      className={`text-gray-600 text-base ${
                        isActive('/explore#Kinigi-journey') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'
                      }`}
                    >
                      Journey
                    </Link>
                    <Link
                      href="/explore#Inside-volcanoes-park"
                      className={`text-gray-600 text-base ${
                        isActive('/explore#Inside-volcanoes-park') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'
                      }`}
                    >
                      Inside The Park
                    </Link>
                    <Link
                      href="/explore#outside-volcanoes-park"
                      className={`text-gray-600 text-base ${
                        isActive('/explore#outside-volcanoes-park') ? 'text-[#2c2c2c] font-bold' : 'text-[#2c2c2c]'
                      }`}
                    >
                      Outside The Park
                    </Link>
                  </div>
                )}
              </div>

              {/* Other Links */}
              <div>
                <a href="about" className="text-gray-700 text-lg">
                  About
                </a>
              </div>


              <div>
                <a href="contact" className="text-gray-700 text-lg">
                  Contact
                </a>
              </div>
            </div>
            <div className="flex items-end justify-end flex-1 md:hidden mt-6">
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