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
      aria-label="Cultural Archive Crate Index"
      className="hidden lg:flex flex-col gap-2 py-4 select-none z-30 min-w-[200px]"
    >
      <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-ink-faint border-b border-stone-300 pb-2 mb-2">
        <span>ARCHIVE CRATE</span>
        <span>INDEX</span>
      </div>

      <div className="flex flex-col gap-1.5">
        {societies.map((society, idx) => {
          const isActive = idx === activeIndex;

          return (
            <button
              key={society.slug || idx}
              type="button"
              onClick={() => onSelectIndex(idx)}
              className={`group flex items-center justify-between text-left py-2 px-3 rounded-lg text-xs font-mono transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-ink ${
                isActive
                  ? "bg-canvas text-ink shadow-soft border border-stone-300 font-bold"
                  : "text-ink-muted hover:text-ink hover:bg-canvas/50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? "scale-125" : "bg-stone-300 group-hover:bg-stone-400"
                  }`}
                  style={isActive ? { backgroundColor: society.accentColor } : {}}
                />
                <span className="tracking-tight uppercase">
                  {society.slug}
                </span>
              </div>

              <span className="text-[10px] text-ink-faint font-mono">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
