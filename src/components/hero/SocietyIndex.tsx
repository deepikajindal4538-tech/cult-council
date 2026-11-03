"use client";

import React from "react";
import { ISociety } from "@/models/Society";

interface SocietyIndexProps {
  societies: (ISociety | any)[];
  activeIndex: number;
  continuousProgress?: number;
  onSelectIndex: (index: number) => void;
}

export function SocietyIndex({
  societies,
  activeIndex,
  continuousProgress = 0,
  onSelectIndex,
}: SocietyIndexProps) {
  const n = societies.length;
  const activeSociety = societies[activeIndex] || societies[0];

  // Vertical layout metrics for ladder rungs
  const itemHeight = 38; // px per rung button
  const railTopOffset = 19; // center Y of the first rung circle

  // Clamped continuous progress for rail indicator
  const safeProgress = Math.max(0, Math.min(n - 1, continuousProgress));
  const indicatorY = railTopOffset + safeProgress * itemHeight;
  const activeFillHeight = safeProgress * itemHeight;

  return (
    <nav
      aria-label="Societies Ladder Rail"
      className="hidden md:flex flex-col select-none z-30"
    >
      {/* Editorial Header Tag */}
      <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.2em] text-ink-faint border-b border-stone-300/80 pb-2 mb-2">
        <span
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{ backgroundColor: activeSociety?.accentColor || "#1C1917" }}
        />
        <span>SOCIETIES LADDER</span>
        <span className="text-stone-400">//</span>
        <span className="font-semibold text-ink">
          0{activeIndex + 1}
        </span>
      </div>

      {/* The Vertical Rail Ladder Track */}
      <div className="relative flex flex-col">
        {/* Continuous Delicate Background Rail Hairline */}
        <div
          className="absolute left-[7px] w-[1px] bg-stone-300/80 pointer-events-none"
          style={{
            top: `${railTopOffset}px`,
            height: `${(n - 1) * itemHeight}px`,
          }}
        />

        {/* Active Animated Fill Hairline */}
        <div
          className="absolute left-[7px] w-[1px] pointer-events-none transition-none"
          style={{
            top: `${railTopOffset}px`,
            height: `${activeFillHeight}px`,
            backgroundColor: activeSociety?.accentColor || "#1C1917",
          }}
        />

        {/* Continuous Gliding Precision Indicator Bead */}
        <div
          className="absolute left-[2px] w-[11px] h-[11px] rounded-full pointer-events-none -translate-y-1/2 z-20 flex items-center justify-center transition-none"
          style={{
            top: `${indicatorY}px`,
          }}
        >
          {/* Subtle outer halo */}
          <span
            className="absolute inset-0 rounded-full opacity-25 animate-ping"
            style={{ backgroundColor: activeSociety?.accentColor || "#1C1917" }}
          />
          {/* Solid core bead with border */}
          <span
            className="w-2.5 h-2.5 rounded-full ring-2 ring-[#FAF8F5] shadow-xs"
            style={{ backgroundColor: activeSociety?.accentColor || "#1C1917" }}
          />
        </div>

        {/* The Ladder Rungs */}
        {societies.map((society, idx) => {
          const isActive = idx === activeIndex;
          const proximity = Math.max(0, 1 - Math.abs(safeProgress - idx));

          return (
            <button
              key={society.slug || idx}
              type="button"
              onClick={() => onSelectIndex(idx)}
              className="group relative flex items-center gap-3.5 pl-0 pr-3 text-left focus:outline-none rounded-lg transition-colors hover:bg-stone-200/40 cursor-pointer"
              style={{ height: `${itemHeight}px` }}
              aria-label={`Jump to Society 0${idx + 1}: ${society.name}`}
            >
              {/* Rung Node on the Vertical Rail */}
              <div className="relative z-10 flex items-center justify-center w-3.5 h-3.5">
                <span
                  className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                  style={{
                    backgroundColor:
                      isActive
                        ? (society.accentColor || "#1C1917")
                        : proximity > 0.45
                        ? "#78716C"
                        : "#D6D3D1",
                    transform: isActive ? "scale(1.25)" : proximity > 0.45 ? "scale(1.1)" : "scale(1)",
                  }}
                />
              </div>

              {/* Number and Name */}
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-[10px] tracking-wider transition-colors duration-200 ${
                    isActive
                      ? "font-bold text-ink"
                      : proximity > 0.45
                      ? "text-stone-600 font-semibold"
                      : "text-stone-400 group-hover:text-stone-600"
                  }`}
                >
                  0{idx + 1}
                </span>

                <span
                  className={`font-mono text-xs uppercase tracking-widest transition-all duration-200 ${
                    isActive
                      ? "font-bold text-ink translate-x-1"
                      : proximity > 0.45
                      ? "text-stone-700 font-medium translate-x-0.5"
                      : "text-stone-500 group-hover:text-ink group-hover:translate-x-0.5"
                  }`}
                  style={
                    isActive
                      ? { color: society.accentColor || "#1C1917" }
                      : {}
                  }
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
