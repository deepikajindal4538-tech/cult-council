"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";

const navItems = [
  { label: "ABOUT", href: "/about" },
  {
    label: "SOCIETIES",
    href: "/societies",
    subItems: [
      { name: "AMS (Photography & Film)", href: "/societies/ams" },
      { name: "Geneticx (Dance Crew)", href: "/societies/geneticx" },
      { name: "Sarasva (Literature & Debate)", href: "/societies/sarasva" },
      { name: "Nirmiti (Fine Arts & Design)", href: "/societies/nirmiti" },
      { name: "Rangtarangini (Dramatics & Theatre)", href: "/societies/rangtarangini" },
      { name: "Virtuosi (Music & Band)", href: "/societies/virtuosi" },
    ],
  },
  { label: "EVENTS", href: "/events" },
  { label: "FESTS", href: "/fests" },
  { label: "GALLERY", href: "/gallery" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [societiesDropdownOpen, setSocietiesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#FAF8F5]/95 border-b border-stone-300 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* College & Council Brand Identity */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-ink"
        >
          <div className="w-8 h-8 rounded bg-ink text-[#FAF8F5] flex flex-col items-center justify-center font-mono font-bold text-xs tracking-tighter shadow-sm group-hover:bg-stone-800 transition-colors">
            <span className="leading-none text-[10px]">CC</span>
            <span className="text-[7px] text-amber-300 tracking-normal font-sans">IIITA</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-ink leading-tight">
              Cultural Council
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">
              IIIT Allahabad • Apex Arts Body
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 font-mono text-xs tracking-widest">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            if (item.subItems) {
              return (
                <div
                  key={item.href}
                  className="relative group"
                  onMouseEnter={() => setSocietiesDropdownOpen(true)}
                  onMouseLeave={() => setSocietiesDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`py-1 inline-flex items-center gap-1 transition-colors duration-150 relative ${
                      isActive
                        ? "text-ink font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-ink"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3 text-ink-muted group-hover:text-ink transition-transform group-hover:rotate-180 duration-200" />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full -left-2 pt-2 w-64 hidden group-hover:block transition-all duration-200">
                    <div className="bg-[#FAF8F5] border border-stone-300 rounded-lg shadow-lg p-2 space-y-1">
                      <div className="px-3 py-1 text-[10px] uppercase tracking-widest text-ink-faint border-b border-stone-200 font-bold">
                        The Six Wings
                      </div>
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-3 py-2 text-xs text-ink-muted hover:text-ink hover:bg-stone-200/50 rounded transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                      <div className="border-t border-stone-200 pt-1 mt-1">
                        <Link
                          href="/societies"
                          className="block px-3 py-1.5 text-[11px] font-semibold text-ink hover:bg-stone-200/50 rounded flex items-center justify-between"
                        >
                          <span>View All Societies</span>
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
                className={`py-1 transition-colors duration-150 relative ${
                  isActive
                    ? "text-ink font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/fests"
            className="flex items-center gap-1.5 px-3.5 py-1.5 border border-ink text-ink hover:bg-ink hover:text-canvas transition-all font-mono text-[11px] uppercase tracking-widest rounded-sm"
          >
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>EFFERVESCENCE &apos;26</span>
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-ink focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-300 bg-[#FAF8F5] px-6 pt-4 pb-8 space-y-3 font-mono text-xs uppercase tracking-widest animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="pb-2 border-b border-stone-200 text-[10px] text-ink-faint">
            IIIT Allahabad • Cultural Council
          </div>
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-ink hover:text-stone-600 border-b border-stone-200/60 font-semibold"
              >
                {item.label}
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
              className="flex items-center justify-center gap-2 w-full text-center py-2.5 bg-ink text-canvas font-semibold rounded"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>EFFERVESCENCE &apos;26</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
