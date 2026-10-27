"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowDown,
  Pause,
  Play,
  Camera,
} from "lucide-react";
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
  societies: (ISociety | any)[];
}

export function HeroSlider({ societies }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.08,
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 280, damping: 32 },
        opacity: { duration: 0.6 },
        scale: { duration: 6, ease: "easeOut" },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 280, damping: 32 },
        opacity: { duration: 0.5 },
      },
    }),
  };

  return (
    <section
      id="hero-title"
      className="relative w-full min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-between overflow-hidden bg-black text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Cultural Council Hero Slider"
    >
      {/* 1. SLIDING BACKGROUND PHOTOS */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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

        {/* High-Legibility Cinematic Gradient Overlays */}
        {/* Top Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/90 z-10 pointer-events-none" />
        {/* Radial Center Vignette for focal clarity */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)",
          }}
        />
        {/* Subtle dot mesh texture */}
        <div
          className="absolute inset-0 opacity-[0.07] z-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#FAF8F5 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* 2. TOP LEDGER BAR (OVERLAYED) */}
      <header className="relative z-20 max-w-7xl mx-auto w-full pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-white/15 pb-4 font-mono text-[11px] uppercase tracking-widest text-stone-300">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-white font-semibold tracking-wider">
            INSTITUTE OF NATIONAL IMPORTANCE
          </span>
          <span className="hidden sm:inline text-stone-400">// ESTD. 1999</span>
        </div>

        <div className="flex items-center gap-4 text-[10px]">
          <div className="hidden sm:flex items-center gap-1.5 text-amber-300 font-medium">
            <Camera className="w-3.5 h-3.5" />
            <span>AMS VAULT: 0{current + 1} / 0{SLIDES.length}</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-white/10 text-stone-200 border border-white/15">
            APEX ARTS BODY
          </span>
        </div>
      </header>

      {/* 3. CENTER MONUMENTAL CULTURAL COUNCIL TITLE (WRITTEN ON THE SLIDER) */}
      <div className="relative z-20 max-w-5xl mx-auto w-full text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 my-auto space-y-4 sm:space-y-5">
        {/* Official Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 font-mono text-[11px] uppercase tracking-widest text-amber-300 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>OFFICIAL CULTURAL PORTAL</span>
        </div>

        {/* The Hero Title */}
        <div className="space-y-1">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white uppercase leading-[0.92] drop-shadow-lg">
            CULTURAL COUNCIL
          </h1>
          <p className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-amber-200/90 tracking-tight drop-shadow-md">
            IIIT Allahabad
          </p>
        </div>

        {/* Narrative Description */}
        <p className="max-w-2xl mx-auto font-serif text-sm sm:text-lg md:text-xl text-stone-200 leading-relaxed pt-1 drop-shadow">
          Where technical precision yields to unfiltered artistic fervor. The statutory apex body governing music, dramatics, choreography, fine arts, literature, and visual storytelling.
        </p>

        {/* 6 Autonomous Societies Quick Pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
          {societies.map((soc) => (
            <Link
              key={soc.slug}
              href={`/societies/${soc.slug}`}
              className="group px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-stone-200 text-xs font-mono hover:bg-white hover:text-black hover:border-white transition-all duration-200 shadow-sm hover:scale-105"
            >
              <strong style={{ color: soc.accentColor }} className="group-hover:text-black">
                {soc.name}
              </strong>{" "}
              <span className="text-stone-400 group-hover:text-stone-700">
                • {soc.category?.split(" ")[0]}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. BOTTOM BAR: SLIDER CONTROLS, CAPTIONS & SCROLL CUE */}
      <footer className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 pt-4 text-xs font-mono">
        {/* Active Slide Info */}
        <div className="flex items-center gap-3 text-stone-300">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <div className="flex flex-col">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              {SLIDES[current].title}
            </span>
            <span className="text-[10px] text-stone-400">
              {SLIDES[current].category} // {SLIDES[current].caption}
            </span>
          </div>
        </div>

        {/* Slider Controls: Dots + Prev/Next + Pause/Play */}
        <div className="flex items-center gap-3">
          {/* Slide Dots / Indicators */}
          <div className="flex items-center gap-1.5">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  idx === current
                    ? "w-7 bg-amber-400"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1 pl-2 border-l border-white/20">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors backdrop-blur-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Play slider" : "Pause slider"}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 text-stone-300 hover:text-white flex items-center justify-center transition-colors backdrop-blur-xs"
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors backdrop-blur-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll Cue to Societies Ladder Stage */}
        <a
          href="#societies-stage"
          className="group inline-flex items-center gap-2 text-stone-300 hover:text-white transition-colors uppercase tracking-widest text-[11px]"
        >
          <span>EXPLORE SOCIETIES LADDER</span>
          <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </a>
      </footer>
    </section>
  );
}
