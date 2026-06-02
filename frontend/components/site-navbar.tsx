"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export function SiteNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinkClass =
    "text-sm font-medium text-white transition-opacity hover:opacity-80 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:opacity-70";
  const ctaClass =
    "btn-on-dark inline-flex items-center px-5 py-2.5 text-sm font-semibold";

  return (
    <header className="w-full sticky top-0 z-50 border-b border-white/20 bg-black text-white">
      <div className="content-shell flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center border-2 border-white bg-white text-sm font-semibold text-black">
            HI
          </span>
          <span className="text-sm font-semibold tracking-[0.18em] uppercase">
            Home Inspection
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
          <Link href="/quote" className={ctaClass}>
            Request Quote
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Link href="/quote" className={ctaClass}>
            Request Quote
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center border-2 border-white text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:opacity-80"
          >
            <span className="sr-only">Toggle menu</span>
            <span className="flex flex-col gap-1.5">
              <span className="h-0.5 w-4 rounded-full bg-current" />
              <span className="h-0.5 w-4 rounded-full bg-current" />
              <span className="h-0.5 w-4 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="w-full border-t border-white/20 bg-black px-4 py-4 md:hidden sm:px-6 lg:px-12">
          <div className="content-shell flex w-full flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="border-2 border-white px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:opacity-80"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
