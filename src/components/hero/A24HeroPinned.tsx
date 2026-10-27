"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useSpring } from "framer-motion";
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

  // Monitor document scroll with optimized responsive spring
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
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
      style={{ height: `${Math.max(200, n * 65)}vh` }}
    >
      {/* 100% Full-Window Sticky Viewport with Warm Wash */}
      <section
        aria-label="A24-Style Full Window 3D Cultural Objects Showcase"
        className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden transition-colors duration-700 ease-out select-none border-b border-stone-300/80"
        style={{
          backgroundColor: scrollProgress < 0.04 ? "#FAF8F5" : (activeSociety?.washColor || "#FAF8F5"),
        }}
      >
        {/* Subtle Paper Noise Background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
          style={{
            backgroundImage: `radial-gradient(#1C1917 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

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
      </section>
    </div>
  );
}
