'use client'

import React, { useState, useEffect, useRef } from 'react';
import { DropdownArrow } from '~/app/_components/icons/DropDownArrow';
import Image from 'next/image';

import "~/styles/le-bambou-gorilla-lodge.webflow.css"
import "~/styles/normalize.css";

export const NavigationBar = () => {
  const [stayDropdownOpen, setStayDropdownOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const stayDropdownRef = useRef(null);
  const exploreDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (stayDropdownRef.current && !(stayDropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setStayDropdownOpen(false);
      }
      if (exploreDropdownRef.current && !(exploreDropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setExploreDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-animation="over-left"
      className="navbar w-nav"
      data-easing2="ease"
      fs-scrolldisable-element="smart-nav"
      data-easing="ease"
      data-collapse="medium"
      // data-w-id="7a7cb080-2523-a875-f3c4-67132ef3e9bc"
      role="banner"
      data-duration={400}
    >
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
            />
          </a>
          <div
            ref={stayDropdownRef}
            data-hover="true"
            data-delay={200}
            data-w-id="7a7cb080-2523-a875-f3c4-67132ef3e9c4"
            className={`navbar-menu-dropdown w-dropdown ${stayDropdownOpen ? 'w--open' : ''}`}
            onMouseEnter={() => setStayDropdownOpen(true)}
            onMouseLeave={() => setStayDropdownOpen(false)}
          >
            <div className="navbar-dropdown-toggle w-dropdown-toggle">
              <a href="stay" className="link-block-2 w-inline-block">
                <div className="rnavbar-link-text">Stay</div>
              </a>
              <link rel="prefetch" href="/stay" />
              <div className="dropdown-icon w-embed">
                <DropdownArrow />
              </div>
            </div>
            <nav
              data-w-id="7a7cb080-2523-a875-f3c4-67132ef3e9ca"
              className={`navbar-dropdown-list w-dropdown-list ${stayDropdownOpen ? 'w--open' : ''}`}
            >
              <a
                href="/lebambou/stay#Amenities"
                className="navbar-dropdown-link w-dropdown-link"
              >
                Amenities
              </a>
              <a
                href="/lebambou/stay#Rooms"
                className="navbar-dropdown-link w-dropdown-link"
              >
                Room&nbsp;Types
              </a>
              <a
                href="/lebambou/stay#Hotel-Gallery"
                className="navbar-dropdown-link w-dropdown-link"
              >
                Hotel&nbsp;Gallery
              </a>
            </nav>
          </div>
          <div
            ref={exploreDropdownRef}
            data-hover="true"
            data-delay={200}
            data-w-id="7a7cb080-2523-a875-f3c4-67132ef3e9d3"
            className={`navbar-menu-dropdown w-dropdown ${exploreDropdownOpen ? 'w--open' : ''}`}
            onMouseEnter={() => setExploreDropdownOpen(true)}
            onMouseLeave={() => setExploreDropdownOpen(false)}
          >
            <div className="navbar-dropdown-toggle w-dropdown-toggle">
              <a href="explore" className="link-block-3 w-inline-block">
                <div className="rnavbar-link-text">Explore</div>
              </a>
              <div className="dropdown-icon w-embed">
                <DropdownArrow />
              </div>
            </div>
            <nav
              data-w-id="7a7cb080-2523-a875-f3c4-67132ef3e9d9"
              className={`navbar-dropdown-list w-dropdown-list ${exploreDropdownOpen ? 'w--open' : ''}`}
            >
              <a
                href="/lebambou/explore#Kinigi-journey"
                className="navbar-dropdown-link w-dropdown-link"
              >
                Journey
              </a>
              <a
                href="/lebambou/explore#Inside-volcanoes-park"
                className="navbar-dropdown-link w-dropdown-link"
              >
                Inside The Park
              </a>
              <a
                href="/lebambou/explore#outside-volcanoes-park"
                className="navbar-dropdown-link w-dropdown-link"
              >
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
