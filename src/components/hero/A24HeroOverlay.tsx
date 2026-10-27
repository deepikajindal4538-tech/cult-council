"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight, Sparkles, X } from "lucide-react";
import { ISociety } from "@/models/Society";

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
  const [indexMenuOpen, setIndexMenuOpen] = useState(false);
  const society = societies[activeIndex] || societies[0];

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-12 pt-20 sm:pt-24 overflow-hidden select-none">
      {/* 1. TOP HEADER (Society Identity & Quick Switcher) */}
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

        {/* Top-Right: Minimalist Society Crate Index Control */}
        <div className="pointer-events-auto flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-ink">
          <div className="hidden sm:flex items-center gap-2 bg-stone-200/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-stone-300/80 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            <span>DISC 0{activeIndex + 1} OF 0{societies.length}</span>
          </div>

          {/* Index Dropdown Toggle */}
          <button
            type="button"
            onClick={() => setIndexMenuOpen(!indexMenuOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5]/90 border border-stone-300 rounded shadow-sm hover:bg-stone-100 transition-colors focus:outline-none"
          >
            <span>WING INDEX</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${indexMenuOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </header>

      {/* 2. BOTTOM CONTROLS & CRITIC PULL QUOTES (Exact A24 Layout) */}
      <footer className="w-full flex flex-col md:flex-row items-end justify-between gap-6 pt-8">
        {/* Left Ticker / Hint */}
        <div className="pointer-events-auto hidden lg:flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-ink-faint">
          <span className="w-2 h-2 rounded-full bg-ink" />
          <span>DRAG OR SCROLL TO ROTATE CRATE DISCS</span>
        </div>

        {/* Center: Twin Critic Pull Quotes with Star Ratings (As shown in user's image) */}
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

      {/* 3. Index Dropdown Drawer / Modal */}
      <AnimatePresence>
        {indexMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 right-6 sm:right-12 z-50 w-72 bg-[#FAF8F5] border border-stone-300 rounded-xl shadow-soft-xl p-5"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                ARCHIVAL CRATE INDEX
              </span>
              <button
                type="button"
                onClick={() => setIndexMenuOpen(false)}
                className="text-ink-muted hover:text-ink focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              {societies.map((soc, idx) => (
                <button
                  key={soc.slug}
                  type="button"
                  onClick={() => {
                    onSelectIndex(idx);
                    setIndexMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                    idx === activeIndex
                      ? "bg-ink text-canvas font-semibold"
                      : "text-ink-muted hover:text-ink hover:bg-stone-200/50"
                  }`}
                >
                  <span className="uppercase">{soc.name}</span>
                  <span className="text-[10px] opacity-60">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
