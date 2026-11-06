"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Maximize2, Pause, Play, Camera, Sparkles } from "lucide-react";
import GalleryLightbox from "./GalleryLightbox";
import { TrimmedPhoto } from "@/lib/flickr/schemas";

export interface CarouselPlate {
  id: string;
  title: string;
  discipline: string;
  category: string;
  url: string;
  width?: number;
  height?: number;
}

const GENUINE_PLATES: CarouselPlate[] = [
  {
    id: "plate-pronite",
    title: "Effervescence Main Stage Arena Crowd",
    discipline: "AMS // Festival Arena",
    category: "Effervescence",
    url: "/images/gallery/pronite-crowd.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: "plate-virtuosi",
    title: "Virtuosi Stage & Live Concert",
    discipline: "Virtuosi // Music & Band",
    category: "Live Concert",
    url: "/images/gallery/band-night.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: "plate-geneticx",
    title: "Geneticx Dance Crew Stage Production",
    discipline: "Geneticx // Kinetic Choreography",
    category: "Dance",
    url: "/images/gallery/geneticx-dance.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: "plate-theatre",
    title: "Rangtarangini Thespians Backstage Face Art",
    discipline: "Rangtarangini // Theatrics & Drama",
    category: "Theatrics",
    url: "/images/gallery/theatre-prep.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: "plate-ramp",
    title: "Campus Couture Cultural Runway",
    discipline: "Nirmiti // Fashion & Scenography",
    category: "Fine Arts",
    url: "/images/gallery/ramp-walk.jpg",
    width: 2400,
    height: 1600,
  },
];

// Row 1: Concerts & Arena (Starts with Pronite & Band)
const ROW_1: CarouselPlate[] = [
  GENUINE_PLATES[0],
  GENUINE_PLATES[1],
  GENUINE_PLATES[2],
  GENUINE_PLATES[3],
  GENUINE_PLATES[4],
];

// Row 2: Kinetic Dance & Street Drama (Starts with Dance & Theatre)
const ROW_2: CarouselPlate[] = [
  GENUINE_PLATES[2],
  GENUINE_PLATES[3],
  GENUINE_PLATES[4],
  GENUINE_PLATES[0],
  GENUINE_PLATES[1],
];

// Row 3: Scenography & Arena Highlights (Starts with Runway & Drama)
const ROW_3: CarouselPlate[] = [
  GENUINE_PLATES[4],
  GENUINE_PLATES[3],
  GENUINE_PLATES[1],
  GENUINE_PLATES[2],
  GENUINE_PLATES[0],
];

export interface RevolvingGalleryCarouselProps {
  chapterLabel?: string;
  curatorLabel?: string;
  title?: string;
  subtitle?: string;
  showCatalogLink?: boolean;
  row1?: CarouselPlate[];
  row2?: CarouselPlate[];
  row3?: CarouselPlate[];
}

export default function RevolvingGalleryCarousel({
  chapterLabel = "CHAPTER 04 // THE PHOTOGRAPHIC RECORD",
  curatorLabel = "CURATED BY ACOUSTICS & MEDIA SOCIETY",
  title = "Living Chronicle of the Arts",
  subtitle = "Three revolving streams of performance plates, pro-night symphonies, street plays, and quiet midnight canvases.",
  showCatalogLink = true,
  row1 = ROW_1,
  row2 = ROW_2,
  row3 = ROW_3,
}: RevolvingGalleryCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const allPlates = [...row1, ...row2, ...row3];

  const openLightboxForPlate = (plate: CarouselPlate) => {
    const idx = allPlates.findIndex((p) => p.id === plate.id);
    setActivePhotoIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  // Convert CarouselPlates to TrimmedPhoto schema for Lightbox
  const lightboxPhotos: TrimmedPhoto[] = allPlates.map((p) => ({
    id: p.id,
    title: `${p.title} (${p.discipline})`,
    thumbnailUrl: p.url,
    displayUrl: p.url,
    fullUrl: p.url,
    width: p.width || 2400,
    height: p.height || 1600,
  }));

  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28 bg-[#FAF8F5] border-t border-stone-300/80">
      {/* Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        photos={lightboxPhotos}
        currentIndex={activePhotoIndex}
        onIndexChange={setActivePhotoIndex}
        albumTitle="Visual Archives & Photographic Record"
      />

      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-12 sm:mb-16">
        <div className="border-b border-stone-300/70 pb-3 mb-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
          <span>{chapterLabel}</span>
          <span>{curatorLabel}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink leading-[1.04]">
              {title}
            </h2>
            <p className="font-serif italic text-base sm:text-xl text-ink-muted leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 font-mono text-xs uppercase tracking-widest">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-300 bg-white text-ink hover:bg-stone-100 transition-colors shadow-sm"
              aria-label={isPaused ? "Resume carousel stream" : "Pause carousel stream"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? "Resume Stream" : "Pause Stream"}</span>
            </button>

            {showCatalogLink && (
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-[#FAF8F5] hover:bg-stone-800 transition-colors shadow-sm"
              >
                <span>Flickr Catalog</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 3-ROW REVOLVING CAROUSEL CONTAINER */}
      <div className="relative w-full space-y-2.5 sm:space-y-3">
        {/* Left & Right Soft Vignette Fade Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 z-20 pointer-events-none bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 z-20 pointer-events-none bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent" />

        {/* --- ROW 1 (Revolves Left: Concerts, Music & Main Stage) --- */}
        <div className="overflow-hidden flex w-full">
          <div
            className={`flex gap-3 sm:gap-3.5 shrink-0 ${
              isPaused ? "" : "animate-marquee-left"
            } hover:[animation-play-state:paused]`}
            style={{ width: "max-content" }}
          >
            {[...row1, ...row1].map((plate, index) => (
              <CarouselCard
                key={`r1-${plate.id}-${index}`}
                plate={plate}
                onInspect={() => openLightboxForPlate(plate)}
              />
            ))}
          </div>
        </div>

        {/* --- ROW 2 (Revolves Right: Dance Battles & Street Theatrics) --- */}
        <div className="overflow-hidden flex w-full">
          <div
            className={`flex gap-3 sm:gap-3.5 shrink-0 ${
              isPaused ? "" : "animate-marquee-right"
            } hover:[animation-play-state:paused]`}
            style={{ width: "max-content" }}
          >
            {[...row2, ...row2].map((plate, index) => (
              <CarouselCard
                key={`r2-${plate.id}-${index}`}
                plate={plate}
                onInspect={() => openLightboxForPlate(plate)}
              />
            ))}
          </div>
        </div>

        {/* --- ROW 3 (Revolves Left: Fine Arts, Murals & Literary Salons) --- */}
        <div className="overflow-hidden flex w-full">
          <div
            className={`flex gap-3 sm:gap-3.5 shrink-0 ${
              isPaused ? "" : "animate-marquee-left-fast"
            } hover:[animation-play-state:paused]`}
            style={{ width: "max-content" }}
          >
            {[...row3, ...row3].map((plate, index) => (
              <CarouselCard
                key={`r3-${plate.id}-${index}`}
                plate={plate}
                onInspect={() => openLightboxForPlate(plate)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Curatorial Notice */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-ink-faint uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <Camera className="w-3.5 h-3.5 text-stone-500" />
          <span>Acoustics &amp; Media Society (AMS) • High-Resolution Plates</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Click any plate to inspect in Lightbox</span>
          {showCatalogLink && (
            <>
              <span>•</span>
              <Link href="/gallery" className="text-ink hover:underline font-semibold">
                View All 6 Guild Collections &rarr;
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Single Plate Component with Museum Mat Mount Frame
 * Pure photography plate: No info, no tags, only the high-res image and the expand option.
 */
function CarouselCard({
  plate,
  onInspect,
}: {
  plate: CarouselPlate;
  onInspect: () => void;
}) {
  return (
    <div
      onClick={onInspect}
      className="group relative cursor-pointer w-72 sm:w-80 md:w-96 aspect-[16/10] shrink-0 rounded-2xl bg-[#F4F1EA] p-1.5 sm:p-2 border border-stone-300/80 shadow-xs hover:shadow-xl hover:border-stone-400 transition-all duration-300 overflow-hidden"
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-stone-200">
        <Image
          src={plate.url}
          alt=""
          fill
          unoptimized
          sizes="(max-width: 768px) 280px, 384px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Expand / Maximize Option ONLY — Pure minimal icon */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="p-2.5 rounded-full bg-stone-900/85 backdrop-blur-md text-white shadow-lg flex items-center justify-center hover:bg-black hover:scale-110 transition-all">
            <Maximize2 className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
