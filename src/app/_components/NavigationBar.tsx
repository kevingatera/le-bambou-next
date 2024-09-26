import React from 'react';
import { DropdownArrow } from '~/app/_components/icons/DropDownArrow';
import Image from 'next/image';

export const NavigationBar = () => {
  return (
    <div className="navbar w-nav" role="banner">
      <div className="navbar-container">
        <div className="navbar-menu-button w-nav-button">
          <div className="menu-icon">
            <div className="menu-icon-line-top" />
            <div className="menu-icon-line-middle" />
            <div className="menu-icon-line-bottom" />
          </div>
        </div>
        <nav role="navigation" className="navbar-menu w-nav-menu">
          <a href="#" className="navbar-logo-link-menu w-nav-brand">
            <Image
              src="/images/Asset-24x.png"
              loading="eager"
              alt=""
              className="navbar-logo"
              width={100}
              height={100}
              priority={true}
            />
          </a>
          <div className="group relative">
            <div className="navbar-dropdown-toggle w-dropdown-toggle flex items-center">
              <a href="stay" className="link-block-2 w-inline-block">
                <div className="rnavbar-link-text">Stay</div>
              </a>
              <link rel="prefetch" href="/stay" />
              <div className="dropdown-icon w-embed ml-1">
                <DropdownArrow isOpen={false} />
              </div>
            </div>
            <nav className="absolute left-0 transform translate-y-20 opacity-0 bg-[#b9c5c4] border border-black/75 transition-all duration-300 ease-in-out p-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible">
              <a href="/stay#Amenities" className="navbar-dropdown-link w-dropdown-link block px-6 py-2 text-[#2c2c2c] hover:bg-[#d7dfde] font-['Varela_Round',sans-serif] text-base font-normal leading-6">
                Amenities
              </a>
              <a href="/stay#Rooms" className="navbar-dropdown-link w-dropdown-link block px-6 py-2 text-[#2c2c2c] hover:bg-[#d7dfde] font-['Varela_Round',sans-serif] text-base font-normal leading-6">
                Room&nbsp;Types
              </a>
              <a href="/stay#Hotel-Gallery" className="navbar-dropdown-link w-dropdown-link block px-6 py-2 text-[#2c2c2c] hover:bg-[#d7dfde] font-['Varela_Round',sans-serif] text-base font-normal leading-6">
                Hotel&nbsp;Gallery
              </a>
            </nav>
          </div>
          <div className="group relative">
            <div className="navbar-dropdown-toggle w-dropdown-toggle flex items-center">
              <a href="explore" className="link-block-3 w-inline-block">
                <div className="rnavbar-link-text">Explore</div>
              </a>
              <div className="dropdown-icon w-embed ml-1">
                <DropdownArrow isOpen={false} />
              </div>
            </div>
            <nav className="absolute left-0 transform translate-y-20 opacity-0 bg-[#b9c5c4] border border-black/75 transition-all duration-300 ease-in-out p-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible">
              <a href="/explore#Kinigi-journey" className="navbar-dropdown-link w-dropdown-link block px-6 py-2 text-[#2c2c2c] hover:bg-[#d7dfde] font-['Varela_Round',sans-serif] text-base font-normal leading-6">
                Journey
              </a>
              <a href="/explore#Inside-volcanoes-park" className="navbar-dropdown-link w-dropdown-link block px-6 py-2 text-[#2c2c2c] hover:bg-[#d7dfde] font-['Varela_Round',sans-serif] text-base font-normal leading-6">
                Inside The Park
              </a>
              <a href="/explore#outside-volcanoes-park" className="navbar-dropdown-link w-dropdown-link block px-6 py-2 text-[#2c2c2c] hover:bg-[#d7dfde] font-['Varela_Round',sans-serif] text-base font-normal leading-6">
                Outside The Park
              </a>
            </nav>
          </div>
          <a href="about" className="navbar-link sidenavbar w-nav-link">
            About
          </a>
          <a href="contact" className="navbar-link sidenavbar w-nav-link">
            Contact
          </a>
        </nav>
        <a
          href="/"
          aria-current="page"
          className="navbar-logo-link w-nav-brand w--current"
        >
          <Image
            src="/images/Asset-34x.png"
            loading="lazy"
            width={100}
            height={100}
            alt=""
            className="navbar-logo"
          />
        </a>
        <a
          href="contact"
          className="navbarbutton align-end"
        // className="w-button navbarbutton align-end"
        >
          Book Now
        </a>
        <link rel="prefetch" href="/contact" />
        <div style={{ opacity: 0 }} className="navbar-menu-background" />
      </div>
    </div>
  )
}
