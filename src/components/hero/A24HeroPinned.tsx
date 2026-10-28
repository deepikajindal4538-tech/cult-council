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
  const [selectedTargetIndex, setSelectedTargetIndex] = useState<number | undefined>(undefined);

  // 1. Entry scroll monitor: smoothly crossfades the A24 stage when entering the viewport
  const { scrollYProgress: entryProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const smoothEntry = useSpring(entryProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Crossfade opacity & scale so the stage smoothly emerges without any direct cut
  const stageOpacity = useTransform(smoothEntry, [0.15, 0.88], [0, 1]);
  const stageScale = useTransform(smoothEntry, [0.15, 0.88], [0.97, 1]);

  // 2. Internal pin scroll progress across all 6 societies
  const { scrollYProgress: stageScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(stageScrollProgress, {
    stiffness: 95,
    damping: 22,
    restDelta: 0.001,
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
  }, [smoothProgress]);

  const handleSelectIndex = (index: number) => {
    setSelectedTargetIndex(index);
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollDistance = containerRef.current.offsetHeight - window.innerHeight;
    const target = containerTop + (index / (n - 1 || 1)) * scrollDistance;

    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
  };

  const activeSociety = societies[activeIndex] || societies[0];

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
            targetIndex={selectedTargetIndex}
            externalProgress={scrollProgress}
            onIndexChange={(idx) => setActiveIndex(idx)}
          />

          {/* 2. Full-Window A24 Editorial Overlay */}
          <A24HeroOverlay
            societies={societies}
            activeIndex={activeIndex}
            onSelectIndex={handleSelectIndex}
          />
        </motion.div>
      </section>
    </div>
  );
}
