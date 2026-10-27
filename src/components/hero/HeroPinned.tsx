"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ISociety } from "@/models/Society";
import { SocietyObject } from "./SocietyObject";
import { SocietyInfoPanel } from "./SocietyInfoPanel";
import { SocietyIndex } from "./SocietyIndex";
import { ArrowDown, Disc } from "lucide-react";

interface HeroPinnedProps {
  societies: (ISociety | any)[];
}

export function HeroPinned({ societies }: HeroPinnedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const n = Math.max(1, societies.length);

  // Monitor document scroll across the pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 22,
    restDelta: 0.001,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      setCurrentProgress(latest);
      const computed = Math.min(n - 1, Math.max(0, Math.floor(latest * n)));
      setActiveIndex(computed);
    });
  }, [smoothProgress, n]);

  const handleSelectIndex = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollDistance = containerRef.current.offsetHeight - (window.innerHeight - 64);
    const targetScroll = containerTop + (index / (n - 1 || 1)) * scrollDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const activeSociety = societies[activeIndex] || societies[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${Math.max(250, n * 85)}vh` }}
    >
      {/* Pinned Sticky Stage */}
      <section
        aria-label="A24-Style Physical Artifacts Crate Showcase"
        className="sticky w-full overflow-hidden flex flex-col justify-between transition-colors duration-700 ease-out select-none border-b border-stone-300"
        style={{
          top: "4rem",
          height: "calc(100vh - 4rem)",
          backgroundColor: activeSociety?.washColor || "#F4F1EA",
        }}
      >
        {/* Subtle Editorial Grain Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#1C1917 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top Editorial Ticker Bar */}
        <div className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 flex items-center justify-between border-b border-stone-300/70 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-ink" />
            <span className="font-mono text-xs uppercase tracking-widest text-ink font-semibold">
              IIIT ALLAHABAD // CULTURAL ARCHIVE
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-ink-muted">
            <span className="hidden sm:inline">CRATE SYSTEM</span>
            <div className="flex items-center gap-2 text-ink">
              <Disc className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
              <span>ACTIVE ARTIFACT [{String(activeIndex + 1).padStart(2, "0")}]</span>
            </div>
          </div>
        </div>

        {/* Main Central Artifact Stage */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col lg:flex-row items-center justify-between py-6 gap-8">
          {/* Left: Editorial Dossier Metadata Panel */}
          <div className="w-full lg:w-5/12 flex items-center justify-start order-2 lg:order-1">
            <SocietyInfoPanel
              society={activeSociety}
              index={activeIndex}
              total={n}
            />
          </div>

          {/* Center: Horizontal Physical Artifact Carousel */}
          <div
            className="w-full lg:w-5/12 h-72 sm:h-96 md:h-[460px] relative flex items-center justify-center order-1 lg:order-2"
            style={{ perspective: 1200 }}
          >
            {societies.map((soc, idx) => {
              const offset = idx - activeIndex;
              const isCurrent = idx === activeIndex;

              // Normalized local progress for scroll interactions
              const sliceStart = idx / n;
              const sliceEnd = (idx + 1) / n;
              const localProgress = Math.min(
                1,
                Math.max(0, (currentProgress - sliceStart) / (sliceEnd - sliceStart || 1))
              );

              // 3D Crate Carousel spacing & depth
              const xOffset = offset * 260;
              const scale = isCurrent ? 1 : Math.max(0.6, 1 - Math.abs(offset) * 0.28);
              const opacity = isCurrent ? 1 : Math.max(0, 0.35 - Math.abs(offset) * 0.2);
              const rotateY = offset * -28;
              const zIndex = 25 - Math.abs(offset) * 5;

              return (
                <motion.div
                  key={soc.slug || idx}
                  onClick={() => handleSelectIndex(idx)}
                  className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-transform duration-300 ${
                    isCurrent ? "" : "hover:opacity-60"
                  }`}
                  animate={{
                    x: xOffset,
                    scale,
                    opacity,
                    rotateY,
                    zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 24,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <SocietyObject
                    society={soc}
                    isActive={isCurrent}
                    progress={localProgress}
                    globalProgress={currentProgress}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Right: Minimalist Crate Index */}
          <div className="hidden lg:flex w-2/12 justify-end order-3">
            <SocietyIndex
              societies={societies}
              activeIndex={activeIndex}
              onSelectIndex={handleSelectIndex}
            />
          </div>
        </div>

        {/* Bottom Pinned Status Rail & Progress Scrub */}
        <div className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-5 sm:pb-7 flex items-center justify-between border-t border-stone-300/70 pt-4 text-xs font-mono text-ink-muted">
          <div className="flex items-center gap-3">
            <span className="text-ink font-bold">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="w-32 sm:w-48 h-1 bg-stone-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-ink transition-all duration-300"
                style={{
                  width: `${(currentProgress * 100).toFixed(1)}%`,
                }}
              />
            </div>
            <span>{String(n).padStart(2, "0")}</span>
          </div>

          <a
            href="#about-section"
            className="flex items-center gap-1.5 text-ink hover:text-stone-600 transition-colors uppercase tracking-widest font-semibold"
          >
            <span>SCROLL TO PROLOGUE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </section>
    </div>
  );
}
