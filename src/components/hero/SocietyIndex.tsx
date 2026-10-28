"use client";

import React from "react";
import { motion } from "framer-motion";
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
      aria-label="A24-Style Societies Rail Index"
      className="hidden md:flex flex-col select-none z-30"
    >
      {/* Editorial Header Tag */}
      <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.2em] text-ink-faint border-b border-stone-300/80 pb-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-ink" />
        <span>SOCIETIES INDEX</span>
        <span className="text-stone-400">//</span>
        <span className="font-semibold text-ink">
          0{activeIndex + 1}
        </span>
      </div>

      {/* The Vertical Rail Ladder */}
      <div className="relative flex flex-col gap-2">
        {/* Continuous Delicate Hairline Rail Track */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-stone-300/80 pointer-events-none" />

        {societies.map((society, idx) => {
          const isActive = idx === activeIndex;

          return (
            <button
              key={society.slug || idx}
              type="button"
              onClick={() => onSelectIndex(idx)}
              className="group relative flex items-center gap-3.5 py-1.5 pl-0 pr-3 text-left transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
            >
              {/* Rung Node on the Vertical Rail */}
              <div className="relative z-10 flex items-center justify-center w-3.5 h-3.5">
                {isActive ? (
                  <motion.span
                    layoutId="a24-rail-active-node"
                    className="w-2.5 h-2.5 rounded-full ring-2 ring-offset-2 ring-stone-900 bg-ink shadow-xs"
                    style={{
                      backgroundColor: society.accentColor || "#1C1917",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-ink group-hover:scale-125 transition-all duration-200" />
                )}
              </div>

              {/* Number and Name */}
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-[10px] tracking-wider transition-colors duration-200 ${
                    isActive ? "font-bold text-ink" : "text-stone-400 group-hover:text-stone-600"
                  }`}
                >
                  0{idx + 1}
                </span>

                <span
                  className={`font-mono text-xs uppercase tracking-widest transition-all duration-200 ${
                    isActive
                      ? "font-bold text-ink translate-x-0.5"
                      : "text-stone-500 group-hover:text-ink group-hover:translate-x-0.5"
                  }`}
                  style={isActive ? { color: society.accentColor || "#1C1917" } : {}}
                >
                  {society.slug}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
