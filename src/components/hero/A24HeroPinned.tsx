"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import { ISociety } from "@/models/Society";
import { A24SmoothHeroStage } from "./A24SmoothHeroStage";
import { A24HeroOverlay } from "./A24HeroOverlay";

interface A24HeroPinnedProps {
  societies: (ISociety | any)[];
}

export function A24HeroPinned({ societies }: A24HeroPinnedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const n = Math.max(1, societies.length);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  // 1. Entry scroll monitor: smoothly crossfades the A24 stage when entering viewport
  const { scrollYProgress: entryProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const smoothEntry = useSpring(entryProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  // Crossfade opacity & scale so the stage smoothly emerges without any direct cut
  const stageOpacity = useTransform(smoothEntry, [0.15, 0.88], [0, 1]);
  const stageScale = useTransform(smoothEntry, [0.15, 0.88], [0.97, 1]);

  // 2. Internal pin scroll progress across all societies
  const { scrollYProgress: stageScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // High-performance spring: instant response feel, buttery smooth deceleration, zero lag
  const smoothProgress = useSpring(stageScrollProgress, {
    stiffness: 150,
    damping: 24,
    mass: 0.2,
    restDelta: 0.0001,
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      const clamped = Math.max(0, Math.min(1, latest));
      setScrollProgress(clamped);

      // Continuous float progress from 0 to n - 1
      const rawProgress = clamped * (n - 1);
      const curr = activeIndexRef.current;

      // Hysteresis deadband: prevents boundary flickering between adjacent societies
      let nextIndex = curr;
      if (rawProgress > curr + 0.55 && curr < n - 1) {
        nextIndex = Math.min(n - 1, Math.floor(rawProgress + 0.45));
      } else if (rawProgress < curr - 0.55 && curr > 0) {
        nextIndex = Math.max(0, Math.ceil(rawProgress - 0.45));
      }

      if (nextIndex !== curr) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    });
  }, [smoothProgress, n]);

  const handleSelectIndex = (index: number) => {
    // Prime active index immediately for zero-latency UI feedback
    activeIndexRef.current = index;
    setActiveIndex(index);

    if (!containerRef.current) return;
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = containerRef.current.offsetHeight - window.innerHeight;
    const target = containerTop + (index / (n - 1 || 1)) * scrollDistance;

    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
  };

  const activeSociety = societies[activeIndex] || societies[0];
  const continuousProgress = scrollProgress * (n - 1);

  return (
    <div
      id="societies-stage"
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${Math.max(250, n * 75)}vh` }}
    >
      {/* 100% Full-Viewport Pinned Stage */}
      <section
        aria-label="A24 Cultural Objects Exhibition"
        className="sticky top-0 h-screen w-full overflow-hidden transition-colors duration-700 ease-out select-none border-b border-stone-300/80"
        style={{
          backgroundColor: scrollProgress < 0.03 ? "#FAF8F5" : (activeSociety?.washColor || "#FAF8F5"),
        }}
      >
        {/* Subtle Paper Noise Watermark */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none z-10"
          style={{
            backgroundImage: `radial-gradient(#1C1917 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Soft top gradient dissolve transitioning seamlessly from hero section */}
        <div className="absolute top-0 inset-x-0 h-28 sm:h-36 pointer-events-none z-30 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/70 to-transparent" />

        {/* Smooth Crossfade Stage Wrapper: Eliminates direct cut from previous section */}
        <motion.div
          style={{ opacity: stageOpacity, scale: stageScale }}
          className="relative w-full h-full"
        >
          {/* 1. Full-Window Ultra-Smooth GPU Trajectory Stage */}
          <A24SmoothHeroStage
            societies={societies}
            progress={continuousProgress}
            activeIndex={activeIndex}
            onSelectIndex={handleSelectIndex}
          />

          {/* 2. Full-Window A24 Editorial Overlay with Smooth Ladder */}
          <A24HeroOverlay
            societies={societies}
            activeIndex={activeIndex}
            continuousProgress={continuousProgress}
            onSelectIndex={handleSelectIndex}
          />
        </motion.div>
      </section>
    </div>
  );
}
