"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowDown, ArrowUpRight, X } from "lucide-react";
import { ISociety } from "@/models/Society";
import { SocietyIndex } from "./SocietyIndex";

interface A24HeroOverlayProps {
  societies: (ISociety | any)[];
  activeIndex: number;
  continuousProgress?: number;
  onSelectIndex: (index: number) => void;
}

export function A24HeroOverlay({
  societies,
  activeIndex,
  continuousProgress = 0,
  onSelectIndex,
}: A24HeroOverlayProps) {
  const [indexMenuOpen, setIndexMenuOpen] = useState(false);
  const society = societies[activeIndex] || societies[0];

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-12 pt-8 sm:pt-10 overflow-hidden select-none">
      {/* 1. TOP HEADER (A24 Navigation & Index Dropdown Button) */}
      <header className="w-full flex items-start justify-between">
        {/* Top-Left: Active Society Title & Hairline Metadata Table (.experience_info) */}
        <div className="pointer-events-auto max-w-xs sm:max-w-sm lg:max-w-md">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={society.slug}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {/* Category Eyebrow */}
              <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                <span
                  className="w-2 h-2 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: society.accentColor || "#1C1917" }}
                />
                <span className="font-semibold text-ink">
                  SECTOR 0{activeIndex + 1} // {society.category}
                </span>
              </div>

              {/* Massive Editorial Serif Title */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink uppercase leading-none mb-4">
                {society.name}
              </h2>

              {/* A24 Hairline Credits Ledger Table (.info-content) */}
              <div className="w-full border-t border-stone-300/90 text-xs font-mono">
                <div className="grid grid-cols-12 py-1.5 border-b border-stone-200/80 items-center">
                  <span className="col-span-4 text-[10px] uppercase tracking-wider text-ink-faint">
                    DIRECTED BY
                  </span>
                  <span className="col-span-8 font-serif font-medium text-ink text-right truncate">
                    {society.leads?.[0]?.name || "Student Head"}
                  </span>
                </div>

                <div className="grid grid-cols-12 py-1.5 border-b border-stone-200/80 items-center">
                  <span className="col-span-4 text-[10px] uppercase tracking-wider text-ink-faint">
                    FOUNDED
                  </span>
                  <span className="col-span-8 font-serif font-medium text-ink text-right">
                    {society.stats?.foundedYear || 2004}
                  </span>
                </div>

                <div className="grid grid-cols-12 py-1.5 border-b border-stone-200/80 items-center">
                  <span className="col-span-4 text-[10px] uppercase tracking-wider text-ink-faint">
                    DISCIPLINE
                  </span>
                  <span className="col-span-8 font-serif font-medium text-ink text-right truncate">
                    {society.category}
                  </span>
                </div>

                <div className="grid grid-cols-12 py-1.5 border-b border-stone-300/90 items-center">
                  <span className="col-span-4 text-[10px] uppercase tracking-wider text-ink-faint">
                    MEMBERSHIP
                  </span>
                  <span className="col-span-8 font-serif font-medium text-ink text-right">
                    {society.stats?.membersCount || 45}+ Active Artists
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Top-Right: A24 Centered Pill Navigation with Index Button */}
        <div className="pointer-events-auto flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-ink">
          <div className="hidden sm:flex items-center gap-2.5">
            <div className="relative w-9 h-9 shrink-0">
              <Image
                src="/images/council-logo.png"
                alt="Cultural Council Logo"
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col items-end text-right text-[10px] tracking-[0.2em] text-ink-faint">
              <span className="font-semibold text-ink">IIIT ALLAHABAD</span>
              <span>CULTURAL COUNCIL</span>
            </div>
          </div>
          {/* Index Dropdown Toggle (Matching A24 Television Navigation) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIndexMenuOpen(!indexMenuOpen)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-300/90 bg-[#FAF8F5]/80 hover:bg-stone-200/60 backdrop-blur-md text-ink text-xs transition-colors duration-200 cursor-pointer"
              aria-label="Toggle Societies Index"
              aria-expanded={indexMenuOpen}
            >
              <span className="font-semibold">INDEX</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  indexMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* A24 Archival Index Dropdown Menu */}
            <AnimatePresence>
              {indexMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-[#FAF8F5]/98 backdrop-blur-lg border border-stone-300 rounded-2xl shadow-xl p-3 z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-stone-200/90 pb-2 mb-2 px-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint font-semibold">
                      ARCHIVAL SOCIETIES INDEX
                    </span>
                    <button
                      type="button"
                      onClick={() => setIndexMenuOpen(false)}
                      className="text-stone-400 hover:text-ink transition-colors cursor-pointer"
                      aria-label="Close index"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    {societies.map((soc, idx) => {
                      const isItemActive = idx === activeIndex;
                      return (
                        <button
                          key={soc.slug}
                          type="button"
                          onClick={() => {
                            onSelectIndex(idx);
                            setIndexMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                            isItemActive
                              ? "bg-stone-900 text-white font-bold shadow-xs"
                              : "text-stone-600 hover:text-ink hover:bg-stone-200/60"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{
                                backgroundColor: isItemActive ? "#FAF8F5" : (soc.accentColor || "#1C1917"),
                              }}
                            />
                            <span className="uppercase truncate">{soc.name}</span>
                          </div>
                          <span className={`text-[10px] shrink-0 ${isItemActive ? "text-stone-300" : "text-stone-400"}`}>
                            {soc.stats?.foundedYear || 2004}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Right Side: The Minimalist A24 Vertical Societies Ladder Rail */}
      <div className="pointer-events-auto hidden md:flex absolute right-6 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30">
        <SocietyIndex
          societies={societies}
          activeIndex={activeIndex}
          continuousProgress={continuousProgress}
          onSelectIndex={onSelectIndex}
        />
      </div>

      {/* 2. BOTTOM SECTION: CENTER TESTIMONIAL, MOBILE LADDER, & RIGHT DOSSIER CTA */}
      <footer className="w-full flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
        {/* Left Indicator / Drag Cue */}
        <div className="pointer-events-auto hidden lg:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-ink-faint w-48">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          <span>SCROLL TO ADVANCE</span>
        </div>

        {/* Center: Society Artistic Manifesto & Mobile Mini Ladder */}
        <div className="pointer-events-auto flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-2">
          {/* Mobile Mini Societies Ladder Track */}
          <div className="flex md:hidden items-center justify-center gap-1.5 py-1">
            {societies.map((soc, idx) => {
              const isPillActive = idx === activeIndex;
              return (
                <button
                  key={soc.slug || idx}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  className="p-1 focus:outline-none cursor-pointer"
                  aria-label={`Jump to ${soc.name}`}
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isPillActive ? "w-6 bg-stone-900" : "w-2 bg-stone-300 hover:bg-stone-400"
                    }`}
                    style={isPillActive ? { backgroundColor: soc.accentColor || "#1C1917" } : {}}
                  />
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={society.slug + "-testimonial"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="space-y-1"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink-faint font-semibold">
                ARTISTIC MANIFESTO
              </div>

              <p className="font-serif italic text-sm sm:text-base text-ink leading-tight max-w-xs sm:max-w-sm">
                &ldquo;{society.tagline || society.description}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Explore Dossier CTA Link */}
        <div className="pointer-events-auto flex justify-end w-48">
          <Link
            href={`/societies/${society.slug}`}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-canvas font-mono text-[11px] uppercase tracking-widest hover:bg-stone-800 transition-all duration-200 shadow-xs hover:shadow cursor-pointer"
          >
            <span>Explore Dossier</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
