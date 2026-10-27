"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "INDEX", href: "/" },
  { label: "ABOUT", href: "/about" },
  {
    label: "SOCIETIES",
    href: "/societies",
    subItems: [
      { name: "AMS — Photography & Film", href: "/societies/ams" },
      { name: "Geneticx — Dance Crew", href: "/societies/geneticx" },
      { name: "Sarasva — Literature & Debate", href: "/societies/sarasva" },
      { name: "Nirmiti — Fine Arts & Scenography", href: "/societies/nirmiti" },
      { name: "Rangtarangini — Theatrics", href: "/societies/rangtarangini" },
      { name: "Virtuosi — Live Band & Acoustics", href: "/societies/virtuosi" },
    ],
  },
  { label: "EVENTS", href: "/events" },
  { label: "FESTIVALS", href: "/fests" },
  { label: "GALLERY", href: "/gallery" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [societiesDropdownOpen, setSocietiesDropdownOpen] = useState(false);
  const isHome = pathname === "/";

  return (
    <header
      className={`z-50 w-full transition-colors duration-300 ${
        isHome
          ? "absolute top-0 left-0 right-0 border-b border-white/15 bg-transparent"
          : "sticky top-0 backdrop-blur-md bg-[#FAF8F5]/90 border-b border-stone-300/80 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* College & Council Brand Identity */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group focus:outline-none"
        >
          <div className="w-7 h-7 rounded bg-ink text-[#FAF8F5] flex flex-col items-center justify-center font-mono font-bold text-xs tracking-tighter shadow-sm group-hover:bg-stone-800 transition-colors">
            <span className="leading-none text-[9px]">CC</span>
            <span className="text-[6px] text-amber-300 tracking-normal font-sans">IIITA</span>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-serif font-medium text-base sm:text-lg tracking-tight leading-none ${
                isHome ? "text-white" : "text-ink"
              }`}
            >
              Cultural Council
            </span>
            <span
              className={`font-mono text-[9px] uppercase tracking-[0.25em] pt-0.5 ${
                isHome ? "text-stone-300" : "text-ink-faint"
              }`}
            >
              IIIT Allahabad
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8 font-mono text-[11px] uppercase tracking-[0.2em]">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            if (item.subItems) {
              return (
                <div
                  key={item.href}
                  className="relative group py-2"
                  onMouseEnter={() => setSocietiesDropdownOpen(true)}
                  onMouseLeave={() => setSocietiesDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 transition-colors duration-150 ${
                      isHome
                        ? isActive
                          ? "text-white font-semibold"
                          : "text-stone-300 hover:text-white"
                        : isActive
                        ? "text-ink font-semibold"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform group-hover:rotate-180 duration-200 ${
                        isHome ? "text-stone-400 group-hover:text-white" : "text-stone-400 group-hover:text-ink"
                      }`}
                    />
                  </Link>

                  {/* Minimalist Dropdown */}
                  <div className="absolute top-full -left-4 pt-2 w-72 hidden group-hover:block transition-all duration-200">
                    <div className="bg-[#FAF8F5] border border-stone-300/80 rounded-xl shadow-lg p-2 space-y-0.5 text-ink">
                      <div className="px-3 py-1.5 text-[9px] uppercase tracking-[0.25em] text-ink-faint border-b border-stone-200 font-semibold">
                        The Six Autonomous Guilds
                      </div>
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-3 py-2 text-xs text-ink-muted hover:text-ink hover:bg-stone-200/50 rounded-lg transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                      <div className="border-t border-stone-200 pt-1 mt-1">
                        <Link
                          href="/societies"
                          className="px-3 py-1.5 text-[11px] font-semibold text-ink hover:bg-stone-200/50 rounded-lg flex items-center justify-between"
                        >
                          <span>Guild Register</span>
                          <span>&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 transition-colors duration-150 relative ${
                  isHome
                    ? isActive
                      ? "text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-white"
                      : "text-stone-300 hover:text-white"
                    : isActive
                    ? "text-ink font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}

          <Link
            href="/fests"
            className={`inline-flex items-center gap-2 px-4 py-2 border transition-all font-mono text-[10px] uppercase tracking-[0.2em] rounded-full ${
              isHome
                ? "border-white/30 text-white hover:bg-white hover:text-black"
                : "border-ink text-ink hover:bg-ink hover:text-[#FAF8F5]"
            }`}
          >
            <span>Effervescence &apos;26</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 focus:outline-none ${isHome ? "text-white" : "text-ink"}`}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-300 bg-[#FAF8F5] px-6 pt-4 pb-8 space-y-3 font-mono text-xs uppercase tracking-widest text-ink animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="pb-2 border-b border-stone-200 text-[10px] text-ink-faint">
            IIIT Allahabad • Cultural Council
          </div>
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 py-2 text-ink hover:text-stone-600 border-b border-stone-200/60 font-semibold ${
                  pathname === item.href ? "text-amber-800 font-bold" : ""
                }`}
              >
                <span>{item.label}</span>
              </Link>
              {item.subItems && (
                <div className="pl-4 py-1.5 space-y-2 border-b border-stone-200/60">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-[11px] text-ink-muted hover:text-ink"
                    >
                      • {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3">
            <Link
              href="/fests"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center py-2.5 bg-ink text-[#FAF8F5] font-semibold rounded-full"
            >
              <span>EFFERVESCENCE &apos;26 →</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
