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
      aria-label="Guild Chronology Index"
      className="hidden md:flex flex-col gap-3 select-none text-right"
    >
      <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink-faint pb-1 border-b border-stone-300/60 mb-1">
        INDEX // 0{activeIndex + 1}
      </div>

      <div className="flex flex-col gap-2">
        {societies.map((society, idx) => {
          const isActive = idx === activeIndex;

          return (
            <button
              key={society.slug || idx}
              type="button"
              onClick={() => onSelectIndex(idx)}
              className="group flex items-center justify-end gap-3 py-1 font-mono text-xs transition-all duration-300 focus:outline-none"
            >
              <span
                className={`uppercase tracking-[0.15em] transition-all duration-300 ${
                  isActive
                    ? "text-ink font-semibold"
                    : "text-stone-400 group-hover:text-ink"
                }`}
              >
                {society.slug}
              </span>

              <span
                className={`text-[10px] tabular-nums transition-colors duration-300 ${
                  isActive ? "text-ink font-bold" : "text-stone-300 group-hover:text-stone-500"
                }`}
              >
                0{idx + 1}
              </span>

              {/* Minimal hairline active dash */}
              <span
                className={`h-[1px] transition-all duration-300 ${
                  isActive
                    ? "w-6 bg-ink"
                    : "w-2 bg-stone-300 group-hover:w-4 group-hover:bg-stone-500"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
