"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDown, Sparkles } from "lucide-react";
import { ISociety } from "@/models/Society";
import { SocietyIndex } from "./SocietyIndex";

interface A24HeroOverlayProps {
  societies: (ISociety | any)[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  scrollProgress?: number;
}

export function A24HeroOverlay({
  societies,
  activeIndex,
  onSelectIndex,
  scrollProgress = 0,
}: A24HeroOverlayProps) {
  const society = societies[activeIndex] || societies[0];

  // Ultra-smooth interpolation for seamless transition from Title to Ladder
  // Intro title is 100% visible at scroll 0, dissolves away smoothly as user scrolls past 0.08
  const titleOpacity = Math.max(0, 1 - scrollProgress / 0.09);
  const titleY = -scrollProgress * 160;
  const isIntroActive = titleOpacity > 0.01;

  // Society details & Ladder smoothly fade in as title dissolves
  const contentOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.04) / 0.08));
  const isContentActive = contentOpacity > 0.01;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-12 pt-6 sm:pt-8 overflow-hidden select-none">
      {/* 0. SEAMLESS TITLE HERO (Visible at scroll 0, smoothly dissolves as you scroll) */}
      {isIntroActive && (
        <div
          className="absolute inset-0 z-30 flex flex-col justify-between p-6 sm:p-10 lg:p-12 pt-10 sm:pt-14 transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          {/* Top Ledger Bar */}
          <div className="w-full flex items-center justify-between border-b border-stone-300/80 pb-3 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-ink font-semibold">INSTITUTE OF NATIONAL IMPORTANCE</span>
              <span className="hidden sm:inline">// ESTD. 1999</span>
            </div>
            <div className="text-[10px] tracking-wider text-amber-800 font-semibold">
              APEX ARTS &amp; CULTURE BODY
            </div>
          </div>

          {/* Central Monumental Title */}
          <div className="my-auto text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto py-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5]/90 border border-stone-300/90 font-mono text-xs uppercase tracking-widest text-ink shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>OFFICIAL CULTURAL PORTAL</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-ink uppercase leading-[0.92]">
                CULTURAL COUNCIL
              </h1>
              <p className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-stone-700 tracking-tight">
                IIIT Allahabad
              </p>
            </div>

            <p className="max-w-2xl mx-auto font-serif text-base sm:text-xl text-ink-muted leading-relaxed">
              Where technical precision yields to unfiltered artistic fervor. The statutory body governing music, dramatics, choreography, fine arts, literature, and visual storytelling.
            </p>

            {/* The Six Autonomous Societies Tags */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 font-mono text-xs">
              {societies.map((soc) => (
                <span
                  key={soc.slug}
                  className="px-3 py-1 rounded-md bg-[#FAF8F5]/80 border border-stone-300/80 text-ink-muted font-medium shadow-xs"
                >
                  <strong style={{ color: soc.accentColor }}>{soc.name}</strong> • {soc.category?.split(" ")[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Cue */}
          <div className="w-full flex items-center justify-between border-t border-stone-300/80 pt-3 font-mono text-xs uppercase tracking-widest text-ink-muted">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-ink" />
              <span>06 AUTONOMOUS WINGS</span>
            </div>

            <div className="flex items-center gap-2 font-semibold text-ink text-[11px] animate-pulse">
              <span>SCROLL DOWN TO START SOCIETIES LADDER</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </div>
        </div>
      )}

      {/* 1. TOP HEADER (Society Dossier - Fades in as user scrolls) */}
      <header
        className="w-full flex items-start justify-between transition-opacity duration-300"
        style={{
          opacity: contentOpacity,
          pointerEvents: isContentActive ? "auto" : "none",
        }}
      >
        {/* Top-Left: Active Society Title & Hairline Metadata Table */}
        <div className="max-w-sm sm:max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={society.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Massive Editorial Serif Title */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink uppercase leading-none mb-4">
                {society.name}
              </h1>

              {/* A24-Style Hairline Credits Ledger Table */}
              <div className="w-full border-t border-stone-300 text-xs font-mono">
                <div className="grid grid-cols-12 py-1.5 border-b border-stone-200">
                  <span className="col-span-4 text-[10px] uppercase tracking-wider text-ink-faint">
                    DIRECTED BY
                  </span>
                  <span className="col-span-8 font-serif font-medium text-ink">
                    {society.leads?.[0]?.name || "Student Head"}
                  </span>
                </div>

                <div className="grid grid-cols-12 py-1.5 border-b border-stone-200">
                  <span className="col-span-4 text-[10px] uppercase tracking-wider text-ink-faint">
                    FOUNDED
                  </span>
                  <span className="col-span-8 font-serif font-medium text-ink">
                    {society.stats?.foundedYear || 2004}
                  </span>
                </div>

                <div className="grid grid-cols-12 py-1.5 border-b border-stone-200">
                  <span className="col-span-4 text-[10px] uppercase tracking-wider text-ink-faint">
                    DISCIPLINE
                  </span>
                  <span className="col-span-8 font-serif font-medium text-ink">
                    {society.category}
                  </span>
                </div>

                <div className="grid grid-cols-12 py-1.5 border-b border-stone-300">
                  <span className="col-span-4 text-[10px] uppercase tracking-wider text-ink-faint">
                    MEMBERSHIP
                  </span>
                  <span className="col-span-8 font-serif font-medium text-ink">
                    {society.stats?.membersCount || 45}+ Active Campus Artists
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </header>

      {/* Right Side: The Interactive Societies Ladder Rail Index */}
      <div
        className="absolute right-6 sm:right-10 lg:right-12 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-300"
        style={{
          opacity: contentOpacity,
          pointerEvents: isContentActive ? "auto" : "none",
        }}
      >
        <SocietyIndex
          societies={societies}
          activeIndex={activeIndex}
          onSelectIndex={onSelectIndex}
        />
      </div>

      {/* 2. BOTTOM CONTROLS & CRITIC PULL QUOTES */}
      <footer
        className="w-full flex flex-col md:flex-row items-end justify-between gap-6 pt-8 transition-opacity duration-300"
        style={{
          opacity: contentOpacity,
          pointerEvents: isContentActive ? "auto" : "none",
        }}
      >
        {/* Left Ticker / Hint */}
        <div className="hidden lg:flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-ink-faint">
          <span className="w-2 h-2 rounded-full bg-ink" />
          <span>DRAG OR SCROLL TO ROTATE CRATE DISCS</span>
        </div>

        {/* Center: Twin Critic Pull Quotes with Star Ratings */}
        <div className="flex items-start gap-8 sm:gap-16 max-w-xl text-center md:text-left mx-auto md:mx-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={society.slug + "-quote1"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-1.5 max-w-[240px]"
            >
              <div className="text-amber-600 text-xs tracking-wider">
                ★★★★★
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-ink-faint">
                CAMPUS RECORD
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-ink leading-snug">
                &ldquo;{society.tagline}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={society.slug + "-quote2"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="space-y-1.5 max-w-[240px] hidden sm:block"
            >
              <div className="text-amber-600 text-xs tracking-wider">
                ★★★★½
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-ink-faint">
                COUNCIL CITATION
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-ink leading-snug line-clamp-2">
                &ldquo;{society.description}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Explore Dossier CTA Link */}
        <div>
          <Link
            href={`/societies/${society.slug}`}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-ink text-canvas font-mono text-xs uppercase tracking-widest hover:bg-stone-800 transition-all shadow-soft"
          >
            <span>Explore Dossier</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
