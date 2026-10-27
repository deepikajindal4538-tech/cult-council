"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Camera,
  Sparkles,
  Layers,
  LayoutGrid,
} from "lucide-react";

export interface HeroPhoto {
  id: string;
  src: string;
  title: string;
  society: string;
  tag: string;
  description: string;
  credit: string;
}

export const HERO_PHOTOS: HeroPhoto[] = [
  {
    id: "band-night",
    src: "/images/gallery/band-night.jpg",
    title: "Virtuosi Stage & Live Concert",
    society: "Virtuosi // Music Society",
    tag: "LIVE ACOUSTICS",
    description: "Main arena live band showcase with dynamic lighting and sound engineering.",
    credit: "AMS Photography",
  },
  {
    id: "geneticx-dance",
    src: "/images/gallery/geneticx-dance.jpg",
    title: "Geneticx Dance Crew",
    society: "Geneticx // Dance Wing",
    tag: "KINETIC CHOREOGRAPHY",
    description: "Synchronized hip-hop and western dance crew executing precision stage choreography.",
    credit: "AMS Photography",
  },
  {
    id: "theatre-prep",
    src: "/images/gallery/theatre-prep.jpg",
    title: "Thespian Persona & Face Art",
    society: "Rangtarangini // Dramatics",
    tag: "STAGE & BACKSTAGE",
    description: "Intricate theatrical mask preparation and makeup artistry before the street play.",
    credit: "AMS Photography",
  },
  {
    id: "pronite-crowd",
    src: "/images/gallery/pronite-crowd.jpg",
    title: "Effervescence Pro-Night Arena",
    society: "Annual Cultural Fest",
    tag: "CAMPUS ARENA",
    description: "Thousands of students under the floodlights at the annual marquee festival pro-night.",
    credit: "AMS Photography",
  },
  {
    id: "ramp-walk",
    src: "/images/gallery/ramp-walk.jpg",
    title: "Cultural Runway & Couture",
    society: "Fine Arts & Design Wing",
    tag: "FASHION & COSTUME",
    description: "Mythological, traditional, and contemporary sartorial design on the festival stage.",
    credit: "AMS Photography",
  },
];

export function HeroPhotoStrip() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalPhoto, setModalPhoto] = useState<HeroPhoto | null>(null);
  const [viewMode, setViewMode] = useState<"strip" | "carousel">("strip");
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance in carousel mode
  useEffect(() => {
    if (viewMode !== "carousel" || isPaused || modalPhoto !== null) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_PHOTOS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [viewMode, isPaused, modalPhoto]);

  const nextPhoto = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_PHOTOS.length);
  };

  const prevPhoto = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_PHOTOS.length) % HERO_PHOTOS.length);
  };

  return (
    <div className="w-full select-none" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {/* Editorial Top Bar for the Photo Showcase */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-300/80 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
        <div className="flex items-center gap-2">
          <Camera className="w-3.5 h-3.5 text-amber-600" />
          <span className="font-semibold text-ink">CAMPUS CULTURAL ARCHIVE</span>
          <span className="hidden sm:inline text-stone-400">//</span>
          <span className="hidden sm:inline text-stone-500">5 LIVE CAPTURES • AMS PHOTO VAULT</span>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="inline-flex items-center bg-stone-200/70 p-0.5 rounded-md border border-stone-300 text-[10px]">
            <button
              type="button"
              onClick={() => setViewMode("strip")}
              className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${
                viewMode === "strip"
                  ? "bg-[#FAF8F5] text-ink font-bold shadow-2xs"
                  : "text-stone-600 hover:text-ink"
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              <span>Strip</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("carousel")}
              className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${
                viewMode === "carousel"
                  ? "bg-[#FAF8F5] text-ink font-bold shadow-2xs"
                  : "text-stone-600 hover:text-ink"
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Carousel</span>
            </button>
          </div>

          {/* Quick controls for carousel */}
          {viewMode === "carousel" && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="w-6 h-6 rounded border border-stone-300 bg-[#FAF8F5] flex items-center justify-center text-ink hover:bg-stone-200 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-ink-faint font-mono px-1">
                0{activeIndex + 1} / 0{HERO_PHOTOS.length}
              </span>
              <button
                type="button"
                onClick={nextPhoto}
                aria-label="Next photo"
                className="w-6 h-6 rounded border border-stone-300 bg-[#FAF8F5] flex items-center justify-center text-ink hover:bg-stone-200 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* VIEW 1: Responsive 5-Photo Editorial Strip */}
      {viewMode === "strip" && (
        <div className="pt-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
            {HERO_PHOTOS.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => setModalPhoto(photo)}
                className="group relative cursor-pointer rounded-xl overflow-hidden border border-stone-300/90 bg-white p-1.5 shadow-2xs hover:shadow-md hover:border-ink hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image Container with 3:2 Aspect Ratio */}
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-stone-100">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Subtle vignette gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2 text-white">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs">
                        0{idx + 1}
                      </span>
                      <Maximize2 className="w-3 h-3 text-stone-200" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-xs leading-tight line-clamp-1">
                        {photo.title}
                      </p>
                      <p className="font-mono text-[9px] text-amber-300 uppercase tracking-widest line-clamp-1">
                        {photo.tag}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Caption Below Image */}
                <div className="pt-1.5 px-0.5 flex items-center justify-between text-ink">
                  <div className="overflow-hidden">
                    <p className="font-mono text-[10px] font-bold text-ink truncate leading-tight">
                      0{idx + 1} // {photo.title.split(" ")[0]}
                    </p>
                    <p className="font-mono text-[9px] text-stone-500 truncate leading-tight">
                      {photo.tag}
                    </p>
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-amber-700 bg-amber-50 px-1 py-0.5 rounded border border-amber-200/80">
                    AMS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: Featured Cinematic Carousel */}
      {viewMode === "carousel" && (
        <div className="pt-3">
          <div className="relative w-full rounded-2xl overflow-hidden border border-stone-300 bg-white p-2 shadow-sm">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-xl bg-stone-900">
              <Image
                src={HERO_PHOTOS[activeIndex].src}
                alt={HERO_PHOTOS[activeIndex].title}
                fill
                priority
                sizes="100vw"
                className="object-cover transition-all duration-700 ease-out"
              />

              {/* Dark Gradient Overlay with Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4 sm:p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 font-mono text-[10px] uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{HERO_PHOTOS[activeIndex].tag}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalPhoto(HERO_PHOTOS[activeIndex])}
                    className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-colors"
                    aria-label="Enlarge image"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1 max-w-2xl">
                  <div className="font-mono text-xs text-amber-300 uppercase tracking-widest">
                    {HERO_PHOTOS[activeIndex].society}
                  </div>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold tracking-tight">
                    {HERO_PHOTOS[activeIndex].title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-stone-200 line-clamp-2">
                    {HERO_PHOTOS[activeIndex].description}
                  </p>
                </div>
              </div>

              {/* Prev / Next overlay buttons */}
              <button
                type="button"
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="mt-2 grid grid-cols-5 gap-2">
              {HERO_PHOTOS.map((photo, idx) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative aspect-[3/2] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    idx === activeIndex
                      ? "border-amber-600 ring-2 ring-amber-500/20 shadow-xs"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="15vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-1 right-1 font-mono text-[8px] font-bold text-white bg-black/70 px-1 rounded">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {modalPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setModalPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1C1917] border border-stone-700 rounded-2xl overflow-hidden shadow-2xl text-stone-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-semibold">
                  {modalPhoto.tag}
                </span>
                <span className="text-stone-500">•</span>
                <span className="font-mono text-xs text-stone-400 uppercase tracking-wider">
                  {modalPhoto.credit}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setModalPhoto(null)}
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-[3/2] w-full bg-black">
              <Image
                src={modalPhoto.src}
                alt={modalPhoto.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
              />
            </div>

            {/* Modal Caption */}
            <div className="p-5 sm:p-6 bg-stone-900 border-t border-stone-800 space-y-1.5">
              <div className="font-mono text-xs text-amber-400 uppercase tracking-widest">
                {modalPhoto.society}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {modalPhoto.title}
              </h2>
              <p className="font-sans text-sm text-stone-300 leading-relaxed pt-1">
                {modalPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
