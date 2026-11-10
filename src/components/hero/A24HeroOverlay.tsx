"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
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
                  {society.category}
                </span>
              </div>

              {/* Massive Editorial Serif Title */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink uppercase leading-none mb-3">
                {society.name}
              </h2>

              {/* A24 Hairline Credits Ledger Table (.info-content) */}
              {(() => {
                const isAms = society.slug === "ams";

                const coordinators = isAms
                  ? "Aditya Halwai, Jashan Goyal, Rajiv Teja"
                  : society.leads?.map((l: any) => l.name).join(", ") || "Society Head";

                const teamStrength = isAms
                  ? "3 Coordinators, 8 Senior Members, 18 Members, 67 Volunteers"
                  : society.stats?.teamStrengthBreakdown || `${society.stats?.membersCount || 40}+ Active Members`;

                const email = isAms
                  ? "ams.society@iiita.ac.in"
                  : society.email || `${society.slug}@iiita.ac.in`;

                const instagramUrl = isAms
                  ? "https://instagram.com/thunderboltams"
                  : society.socialLinks?.instagram ||
                    `https://instagram.com/${
                      society.slug === "geneticx"
                        ? "geneticx_crew"
                        : `${society.slug}_iiita`
                    }`;

                const instagramHandle = isAms
                  ? "@thunderboltams"
                  : society.socialLinks?.instagram
                    ? `@${society.socialLinks.instagram
                        .replace(/^https?:\/\/(www\.)?instagram\.com\//, "")
                        .replace(/\/$/, "")}`
                    : `@${
                        society.slug === "geneticx"
                          ? "geneticx_crew"
                          : `${society.slug}_iiita`
                      }`;

                return (
                  <div className="w-full border-t border-stone-300/90 text-xs font-mono">
                    {/* 1. COORDINATORS */}
                    <div className="grid grid-cols-12 py-1.5 border-b border-stone-200/80 items-center">
                      <span className="col-span-4 text-[10px] uppercase tracking-wider text-ink-faint">
                        COORDINATORS
                      </span>
                      <span className="col-span-8 font-serif font-medium text-ink text-right text-xs leading-tight">
                        {coordinators}
                      </span>
                    </div>

                    {/* 2. TEAM STRENGTH */}
                    <div className="grid grid-cols-12 py-1.5 border-b border-stone-200/80 items-center">
                      <span className="col-span-4 text-[10px] uppercase tracking-wider text-ink-faint">
                        TEAM STRENGTH
                      </span>
                      <span className="col-span-8 font-serif font-medium text-ink text-right text-xs leading-tight">
                        {teamStrength}
                      </span>
                    </div>

                    {/* 3. EMAIL */}
                    <div className="grid grid-cols-12 py-1.5 border-b border-stone-200/80 items-center">
                      <span className="col-span-4 text-[10px] uppercase tracking-wider text-ink-faint">
                        EMAIL
                      </span>
                      <a
                        href={`mailto:${email}`}
                        className="col-span-8 font-serif font-medium text-ink text-right text-xs truncate hover:underline hover:text-stone-600 transition-colors"
                      >
                        {email}
                      </a>
                    </div>

                    {/* 4. INSTAGRAM */}
                    <div className="grid grid-cols-12 py-1.5 border-b border-stone-200/80 items-center">
                      <span className="col-span-4 text-[10px] uppercase tracking-wider text-ink-faint">
                        INSTAGRAM
                      </span>
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="col-span-8 font-serif font-medium text-amber-800 text-right text-xs truncate hover:underline transition-colors"
                      >
                        {instagramHandle}
                      </a>
                    </div>

                    {/* 5. ABOUT THE SOCIETY */}
                    <div className="py-2 border-b border-stone-300/90">
                      <span className="block text-[10px] uppercase tracking-wider text-ink-faint mb-1">
                        ABOUT THE SOCIETY
                      </span>
                      <p className="font-serif text-xs text-stone-700 leading-snug italic line-clamp-2">
                        &ldquo;{society.description || society.tagline}&rdquo;
                      </p>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Top-Right: Council Branding */}
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
        </div>
      </header>

      {/* Right Side: The Minimalist A24 Vertical Societies Ladder Rail (Shifted Downwards) */}
      <div className="pointer-events-auto hidden md:flex absolute right-6 sm:right-8 lg:right-12 bottom-20 sm:bottom-24 lg:bottom-28 z-30">
        <SocietyIndex
          societies={societies}
          activeIndex={activeIndex}
          continuousProgress={continuousProgress}
          onSelectIndex={onSelectIndex}
        />
      </div>

      {/* 2. BOTTOM SECTION: CENTER TESTIMONIAL, MOBILE LADDER, & RIGHT SOCIETY CTA */}
      <footer className="w-full flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
        {/* Left Indicator / Drag Cue */}
        <div className="pointer-events-auto hidden lg:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-ink-faint w-48">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          <span>SCROLL TO ADVANCE</span>
        </div>

        {/* Center: Society Overview & Mobile Mini Ladder */}
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
                ABOUT THE SOCIETY
              </div>

              <p className="font-serif italic text-sm sm:text-base text-ink leading-tight max-w-xs sm:max-w-sm">
                &ldquo;{society.tagline || society.description}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Explore Society CTA Link */}
        <div className="pointer-events-auto flex justify-end w-48">
          <Link
            href={`/societies/${society.slug}`}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-canvas font-mono text-[11px] uppercase tracking-widest hover:bg-stone-800 transition-all duration-200 shadow-xs hover:shadow cursor-pointer"
          >
            <span>Explore Society</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
