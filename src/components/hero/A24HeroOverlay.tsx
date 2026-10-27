"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
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
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden select-none">
      {/* 1. TOP HEADER: Society Dossier Ledger */}
      <header className="w-full flex items-start justify-between">
        <div className="pointer-events-auto max-w-md sm:max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={society.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              {/* Discipline Eyebrow */}
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
                <span className="font-semibold text-ink">
                  WING 0{activeIndex + 1}
                </span>
                <span>/</span>
                <span>{society.category}</span>
              </div>

              {/* Serif Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink leading-[1.02]">
                {society.name}
              </h1>

              {/* Curatorial Ledger */}
              <div className="pt-2 border-t border-stone-300/70 font-mono text-xs max-w-sm space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="uppercase tracking-widest text-ink-faint">STUDENT LEAD</span>
                  <span className="font-serif italic text-ink text-sm">
                    {society.leads?.[0]?.name || "Student Head"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] border-t border-stone-200/60 pt-1.5">
                  <span className="uppercase tracking-widest text-ink-faint">FOUNDATION</span>
                  <span className="font-mono text-ink">
                    EST. {society.stats?.foundedYear || 2004}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] border-t border-stone-200/60 pt-1.5">
                  <span className="uppercase tracking-widest text-ink-faint">COLLECTIVE</span>
                  <span className="font-mono text-ink">
                    {society.stats?.membersCount || 45}+ ACTIVE ARTISTS
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Top-Right: Institute Badge */}
        <div className="pointer-events-auto hidden sm:flex flex-col items-end text-right font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
          <span className="font-semibold text-ink">IIIT ALLAHABAD</span>
          <span>APEX CULTURAL BODY</span>
          <span className="text-stone-400">DEVGHAT, PRAYAGRAJ</span>
        </div>
      </header>

      {/* Center-Right: Minimalist Society Navigation Timeline */}
      <div className="pointer-events-auto hidden md:flex absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 z-30">
        <SocietyIndex
          societies={societies}
          activeIndex={activeIndex}
          onSelectIndex={onSelectIndex}
        />
      </div>

      {/* 2. FOOTER: Curatorial Statement & Dossier Entry Link */}
      <footer className="w-full flex flex-col md:flex-row items-end justify-between gap-6 pt-6 border-t border-stone-300/40">
        {/* Left: Artistic Manifesto Quote */}
        <div className="pointer-events-auto max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={society.slug + "-quote"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1.5"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
                ARTISTIC MANIFESTO
              </div>
              <p className="font-serif italic text-base sm:text-lg text-ink/85 leading-snug">
                &ldquo;{society.tagline}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: Subtle Scroll Prompt */}
        <div className="pointer-events-auto hidden lg:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          <span>SCROLL TO ADVANCE CHRONOLOGY</span>
        </div>

        {/* Right: Clean Editorial Entry Button */}
        <div className="pointer-events-auto">
          <Link
            href={`/societies/${society.slug}`}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-ink text-[#FAF8F5] font-mono text-xs uppercase tracking-[0.2em] hover:bg-stone-800 transition-all duration-300 shadow-sm"
          >
            <span>Open Guild Register</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
