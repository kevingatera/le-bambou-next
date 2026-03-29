"use client";

import Link from "next/link";
import React from "react";

const navItems = [
  { href: "/family-cottage", label: "Family Cottage" },
  { href: "#Rooms", label: "Rooms" },
  { href: "#Amenities", label: "Amenities" },
  { href: "#Gallery", label: "Gallery" },
] as const;

export const StaySectionNav = () => {
  return (
    <nav
      className="-mt-px sticky z-40 border-t border-white/10 bg-[#566c6a] px-4 py-3 shadow-md transition-[top,padding,box-shadow] duration-300 ease-out sm:py-5"
      style={{ top: "calc(var(--navigation-bar-height, 7rem) - 1px)" }}
    >
      <div className="container mx-auto">
        <ul className="mx-auto grid max-w-4xl grid-cols-4 gap-2 text-[13px] sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-2 sm:text-base">
          {navItems.map(({ href, label }) => (
            <li key={href} className="min-w-0 sm:min-w-fit">
              <Link
                href={href}
                className="group relative flex min-h-[2.75rem] items-center justify-center rounded-md px-2 py-2 text-center leading-tight text-[#ebf8f7] transition-colors hover:bg-white/8 hover:text-white sm:min-h-0 sm:rounded-none sm:px-0"
              >
                <span>{label}</span>
                <span className="absolute bottom-0 left-1/2 hidden h-0.5 w-full max-w-[3.5rem] -translate-x-1/2 origin-center scale-x-0 bg-[#ebf8f7] transition-transform duration-300 group-hover:scale-x-100 sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
