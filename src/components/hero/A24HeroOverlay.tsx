"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ISociety } from "@/models/Society";
import { SocietyIndex } from "./SocietyIndex";

interface A24HeroOverlayProps {
  societies: (ISociety | any)[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export function A24HeroOverlay({
  societies,
  activeIndex,
  onSelectIndex,
}: A24HeroOverlayProps) {
  const society = societies[activeIndex] || societies[0];

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-12 pt-20 sm:pt-24 overflow-hidden select-none">
      {/* 1. TOP HEADER (Society Details Only) */}
      <header className="w-full flex items-start justify-between">
        {/* Top-Left: Active Society Title & Hairline Metadata Table */}
        <div className="pointer-events-auto max-w-sm sm:max-w-md">
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
      <div className="pointer-events-auto hidden md:flex absolute right-6 sm:right-10 lg:right-12 top-1/2 -translate-y-1/2 z-30">
        <SocietyIndex
          societies={societies}
          activeIndex={activeIndex}
          onSelectIndex={onSelectIndex}
        />
      </div>

      {/* 2. BOTTOM CONTROLS & CRITIC PULL QUOTES */}
      <footer className="w-full flex flex-col md:flex-row items-end justify-between gap-6 pt-8">
        {/* Left Ticker / Hint */}
        <div className="pointer-events-auto hidden lg:flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-ink-faint">
          <span className="w-2 h-2 rounded-full bg-ink" />
          <span>DRAG OR SCROLL TO ROTATE CRATE DISCS</span>
        </div>

        {/* Center: Twin Critic Pull Quotes with Star Ratings */}
        <div className="pointer-events-auto flex items-start gap-8 sm:gap-16 max-w-xl text-center md:text-left mx-auto md:mx-0">
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
        <div className="pointer-events-auto">
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
