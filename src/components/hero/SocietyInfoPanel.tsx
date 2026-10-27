"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ISociety } from "@/models/Society";

interface SocietyInfoPanelProps {
  society: ISociety | any;
  index: number;
  total: number;
}

export function SocietyInfoPanel({ society, index, total }: SocietyInfoPanelProps) {
  return (
    <div className="w-full max-w-xl select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={society.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* A24-Style Technical Monospace Dossier Index Header */}
          <div className="flex items-center gap-4 text-[11px] font-mono tracking-widest text-ink-muted uppercase border-b border-stone-300/80 pb-3">
            <span className="font-bold text-ink">
              [{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}]
            </span>
            <span className="text-stone-400">•</span>
            <span style={{ color: society.accentColor }} className="font-semibold">
              {society.category}
            </span>
            <span className="text-stone-400">•</span>
            <span>DOSSIER</span>
          </div>

          {/* Large Editorial Serif Society Title */}
          <div>
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[0.98]">
              {society.name}
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint mt-2">
              IIIT ALLAHABAD // {society.slug.toUpperCase()}
            </p>
          </div>

          {/* Editorial Critic Pull Quote / Tagline */}
          <blockquote className="font-serif italic text-xl sm:text-2xl text-ink/90 leading-relaxed pl-4 border-l-2 border-stone-400">
            &ldquo;{society.tagline}&rdquo;
          </blockquote>

          {/* Narrative Body */}
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            {society.description}
          </p>

          {/* Exhibition / Production Technical Credits (A24 film credits aesthetic) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-300/80 text-xs">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                Leadership
              </span>
              <span className="font-serif font-semibold text-ink text-sm">
                {society.leads?.[0]?.name || "Student Head"}
              </span>
              <span className="block text-[11px] text-ink-muted">
                {society.leads?.[0]?.role || "Society Head"}
              </span>
            </div>

            <div>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                Active Troupe
              </span>
              <span className="font-serif font-semibold text-ink text-sm">
                {society.stats?.membersCount || 40}+ Artists
              </span>
              <span className="block text-[11px] text-ink-muted">
                {society.stats?.eventsPerYear || 12} Productions / yr
              </span>
            </div>

            <div>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                Established
              </span>
              <span className="font-serif font-semibold text-ink text-sm">
                Circa {society.stats?.foundedYear || 2004}
              </span>
              <span className="block text-[11px] text-ink-muted">Campus Guild</span>
            </div>
          </div>

          {/* Action Link: Enter Society Dossier */}
          <div className="pt-2">
            <Link
              href={`/societies/${society.slug}`}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-ink text-canvas text-xs font-mono uppercase tracking-widest hover:bg-ink/90 transition-all shadow-soft"
            >
              <span>Explore Dossier</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
