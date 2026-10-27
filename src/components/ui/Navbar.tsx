"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "SOCIETIES", href: "/societies" },
  { label: "EVENTS", href: "/events" },
  { label: "FESTS", href: "/fests" },
  { label: "GALLERY", href: "/gallery" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // On the landing page, the A24 full-window 3D stage has its own embedded editorial navigation
  if (pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#FAF8F5]/90 border-b border-stone-300 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-ink"
        >
          <div className="w-7 h-7 bg-ink text-canvas flex items-center justify-center font-mono font-bold text-xs tracking-tighter shadow-sm">
            CC
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base tracking-tight text-ink leading-none">
              Cultural Council
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">
              IIIT Allahabad
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
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
            className="px-4 py-1.5 border border-ink text-ink hover:bg-ink hover:text-canvas transition-all font-mono text-xs uppercase tracking-widest"
          >
            EFFERVESCENCE &apos;26
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
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-300 bg-[#FAF8F5] px-6 pt-4 pb-8 space-y-4 font-mono text-xs uppercase tracking-widest">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-ink hover:text-stone-600 border-b border-stone-200"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/fests"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 bg-ink text-canvas font-semibold"
            >
              EFFERVESCENCE &apos;26
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
