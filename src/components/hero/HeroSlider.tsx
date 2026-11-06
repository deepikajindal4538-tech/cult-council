"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import FoldText from "@/components/ui/FoldText";
import type { ISociety } from "@/models/Society";

const SLIDES = [
  {
    id: "band-night",
    src: "/images/gallery/band-night.jpg",
    title: "Virtuosi Stage & Live Concert",
    category: "Acoustics & Pro-Night",
    caption: "Live band acoustics under the festival stage floodlights",
  },
  {
    id: "geneticx-dance",
    src: "/images/gallery/geneticx-dance.jpg",
    title: "Geneticx Dance Crew",
    category: "Kinetic Choreography",
    caption: "Synchronized hip-hop and western dance stage production",
  },
  {
    id: "theatre-prep",
    src: "/images/gallery/theatre-prep.jpg",
    title: "Rangtarangini Thespians",
    category: "Theatrics & Face Art",
    caption: "Theatrical mask and persona formulation backstage",
  },
  {
    id: "pronite-crowd",
    src: "/images/gallery/pronite-crowd.jpg",
    title: "Effervescence Arena",
    category: "Campus Celebration",
    caption: "Thousands of students gathered under the arena floodlights",
  },
  {
    id: "ramp-walk",
    src: "/images/gallery/ramp-walk.jpg",
    title: "Cultural Runway & Couture",
    category: "Fashion & Avant-Garde",
    caption: "Mythological motifs and high-fashion runway showcase",
  },
];

interface HeroSliderProps {
  societies?: (ISociety | any)[];
}

export function HeroSlider({}: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  // Smooth background autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.06,
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 30 },
        opacity: { duration: 0.7 },
        scale: { duration: 7, ease: "easeOut" },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 30 },
        opacity: { duration: 0.5 },
      },
    }),
  };

  return (
    <section
      id="hero-title"
      className="relative w-full min-h-screen lg:min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-stone-950 select-none"
      aria-label="Cultural Council Hero Showcase"
    >
      {/* 1. SLIDING BACKGROUND PHOTOS & SEAMLESS DISSOLVE */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-stone-950">
        {/* Photo Container with subtle edge mask only at the very bottom */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.4) 96%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.4) 96%, rgba(0,0,0,0) 100%)",
          }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={SLIDES[current].src}
                alt={SLIDES[current].title}
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Contrast scrim concentrated across the upper title area */}
          <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-black/85 via-black/50 to-transparent z-10 pointer-events-none" />

          {/* Center Vignette for focal clarity */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.6) 100%)",
            }}
          />
        </div>

        {/* Subtle dot mesh texture */}
        <div
          className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Reduced, subtle bottom fade to connect smoothly with the canvas background */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 sm:h-24 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(250,248,245,0) 0%, rgba(250,248,245,0.3) 60%, #FAF8F5 100%)",
          }}
        />
      </div>

      {/* Top spacing buffer for fixed navbar */}
      <div className="h-16 sm:h-20" />

      {/* 2. CENTER MONUMENTAL CULTURAL COUNCIL TITLE */}
      <div className="relative z-20 max-w-5xl mx-auto w-full text-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 my-auto space-y-5">
        {/* The Hero Title */}
        <div className="space-y-1">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white uppercase leading-[0.92] drop-shadow-2xl">
            <FoldText
              text="CULTURAL COUNCIL"
              foldStyle="paper"
              hinge="top"
              splitBy="char"
              duration={0.8}
              stagger={0.035}
              foldAngle={92}
              creaseShading={0.45}
              hoverRefold={true}
              refoldRadius={120}
              refoldAngle={35}
              className="drop-shadow-2xl"
            />
          </h1>
          <p className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-amber-200/90 tracking-tight drop-shadow-lg">
            IIIT Allahabad
          </p>
        </div>

        {/* Narrative Subtitle */}
        <p className="max-w-2xl mx-auto font-serif text-sm sm:text-lg md:text-xl text-stone-200 leading-relaxed pt-2 drop-shadow">
          Where technical precision yields to unfiltered artistic fervor. The statutory apex body governing music, dramatics, choreography, fine arts, literature, and visual storytelling.
        </p>
      </div>

      {/* 3. BOTTOM SCROLL CUE */}
      <footer className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 flex justify-center">
        <a
          href="#societies-stage"
          className="group inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/80 hover:text-ink transition-colors py-2.5 px-6 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-stone-300 shadow-sm hover:shadow"
        >
          <span>EXPLORE SOCIETIES LADDER</span>
          <ArrowDown className="w-3.5 h-3.5 text-amber-800 animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </a>
      </footer>
    </section>
  );
}
