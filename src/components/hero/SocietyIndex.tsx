"use client";

import React from "react";
import { ISociety } from "@/models/Society";

interface SocietyIndexProps {
  societies: (ISociety | any)[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export function SocietyIndex({
  societies,
  activeIndex,
  onSelectIndex,
}: SocietyIndexProps) {
  return (
    <nav
      aria-label="Societies Ladder Index"
      className="hidden md:flex flex-col gap-2 py-3 px-3.5 select-none z-30 min-w-[215px] bg-[#FAF8F5]/95 backdrop-blur-md rounded-2xl border border-stone-300/80 shadow-[0_4px_20px_rgba(28,25,23,0.06)]"
    >
      <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-ink-faint border-b border-stone-200/80 pb-2 mb-1">
        <span>SOCIETIES LADDER</span>
        <span className="font-semibold text-ink">0{activeIndex + 1} / 0{societies.length}</span>
      </div>

      <div className="relative flex flex-col gap-1">
        {/* Subtle Vertical Ladder Rail */}
        <div className="absolute left-[13px] top-3 bottom-3 w-[1.5px] bg-stone-300/70 pointer-events-none" />

        {societies.map((society, idx) => {
          const isActive = idx === activeIndex;

          return (
            <button
              key={society.slug || idx}
              type="button"
              onClick={() => onSelectIndex(idx)}
              className={`group relative flex items-center justify-between text-left py-2 px-2.5 rounded-xl text-xs font-mono transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-ink z-10 ${
                isActive
                  ? "bg-canvas text-ink shadow-sm border border-stone-300 font-bold scale-[1.02]"
                  : "text-ink-muted hover:text-ink hover:bg-stone-200/50 hover:translate-x-0.5"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Rung node dot on ladder rail */}
                <span
                  className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 flex-shrink-0 ${
                    isActive
                      ? "scale-125 border-white shadow-sm ring-2 ring-stone-300"
                      : "bg-stone-200 border-stone-400 group-hover:border-ink"
                  }`}
                  style={isActive ? { backgroundColor: society.accentColor, borderColor: society.accentColor } : {}}
                />
                <span className="tracking-tight uppercase text-[11px] font-medium">
                  {society.slug}
                </span>
              </div>

              <span
                className={`text-[10px] font-mono transition-colors ${
                  isActive ? "text-ink font-bold" : "text-ink-faint group-hover:text-ink-muted"
                }`}
              >
                0{idx + 1}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
