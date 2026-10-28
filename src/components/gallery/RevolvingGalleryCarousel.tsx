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

const ROW_1: CarouselPlate[] = [
  {
    id: "r1-1",
    title: "Virtuosi Stage & Live Concert",
    discipline: "Virtuosi // Music",
    category: "Pro-Night",
    url: "/images/gallery/band-night.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: "r1-2",
    title: "Main Stage Light Rig Ignition at Twilight",
    discipline: "AMS // Optics",
    category: "Effervescence",
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r1-3",
    title: "Pyrotechnics Finale Over the Arena Ground",
    discipline: "Effervescence // Main Stage",
    category: "Festival",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r1-4",
    title: "Effervescence Arena Arena Crowd",
    discipline: "AMS // Media",
    category: "Crowd",
    url: "/images/gallery/pronite-crowd.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: "r1-5",
    title: "Sound Engineers Operating Soundcraft Board",
    discipline: "AMS // Acoustics",
    category: "Engineering",
    url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r1-6",
    title: "Lead Vocalist Mid-Crescendo Under Strobes",
    discipline: "Virtuosi // Concert",
    category: "Live Vocal",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r1-7",
    title: "Violin Bow Technique during Raga-Jazz Fusion",
    discipline: "Virtuosi // Strings",
    category: "Classical",
    url: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r1-8",
    title: "The Midnight Confetti Swirl Over the Crowd",
    discipline: "Effervescence // Finale",
    category: "Celebration",
    url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
];

const ROW_2: CarouselPlate[] = [
  {
    id: "r2-1",
    title: "Geneticx Choreography Showcase",
    discipline: "Geneticx // Dance",
    category: "Break Battle",
    url: "/images/gallery/geneticx-dance.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: "r2-2",
    title: "Opening Dholak Cadence at Central Pavilion",
    discipline: "Rangtarangini // Theatre",
    category: "Nukkad Natak",
    url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r2-3",
    title: "B-Boy Freezes and Cypher Battles",
    discipline: "Geneticx // Hip-Hop",
    category: "Stage Routine",
    url: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r2-4",
    title: "Rangtarangini Face Art and Thespian Prep",
    discipline: "Rangtarangini // Thespians",
    category: "Social Truth",
    url: "/images/gallery/theatre-prep.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: "r2-5",
    title: "Popping and Locking Isolations by Lead",
    discipline: "Geneticx // Cypher",
    category: "Freestyle",
    url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r2-6",
    title: "Choral Formation in Red Kurta Uniform",
    discipline: "Rangtarangini // Drama",
    category: "Street Act",
    url: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r2-7",
    title: "Chalk Dust Explosion from Sneaker Spin",
    discipline: "Geneticx // Street",
    category: "Power Moves",
    url: "https://images.unsplash.com/photo-1545224144-b38cd309ef69?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r2-8",
    title: "The Final Bow and Standing Ovation",
    discipline: "Rangtarangini // Production",
    category: "Curtain Call",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
];

const ROW_3: CarouselPlate[] = [
  {
    id: "r3-1",
    title: "Palette Knives and Acrylic Mixing on Glass",
    discipline: "Nirmiti // Fine Arts",
    category: "Studio",
    url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r3-2",
    title: "Poet Holding Parchment Manuscript Under Lantern",
    discipline: "Sarasva // Literature",
    category: "Kavya Sandhya",
    url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r3-3",
    title: "Artist on Scaffolding Painting Surrealist Eye",
    discipline: "Nirmiti // Murals",
    category: "Installation",
    url: "/images/gallery/ramp-walk.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: "r3-4",
    title: "Intense Spoken Word Delivery in Slam Finals",
    discipline: "Sarasva // Spoken Word",
    category: "Slam Poetry",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r3-5",
    title: "Charcoal Sketching Architectural Foundation",
    discipline: "Nirmiti // Charcoal",
    category: "Drawing",
    url: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r3-6",
    title: "Handwritten Verse and Ink Pen on Deckle Edge",
    discipline: "Sarasva // Verse",
    category: "Gazette",
    url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
  {
    id: "r3-7",
    title: "Campus Couture Cultural Runway",
    discipline: "Nirmiti // Scenography",
    category: "Wall Decor",
    url: "/images/gallery/ramp-walk.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: "r3-8",
    title: "Completed 30-Meter Mural Unveiled to Campus",
    discipline: "Nirmiti // Campus Canvas",
    category: "Masterpiece",
    url: "https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?auto=format&fit=crop&w=1200&q=85",
    width: 2400,
    height: 1600,
  },
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
      <div className="relative w-full space-y-5 sm:space-y-6">
        {/* Left & Right Soft Vignette Fade Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 z-20 pointer-events-none bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 z-20 pointer-events-none bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent" />

        {/* --- ROW 1 (Revolves Left: Concerts, Music & Main Stage) --- */}
        <div className="overflow-hidden flex w-full">
          <div
            className={`flex gap-5 sm:gap-6 shrink-0 ${
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
            className={`flex gap-5 sm:gap-6 shrink-0 ${
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
            className={`flex gap-5 sm:gap-6 shrink-0 ${
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
      className="group relative cursor-pointer w-72 sm:w-80 md:w-96 aspect-[16/10] shrink-0 rounded-2xl bg-[#F4F1EA] p-2.5 sm:p-3 border border-stone-300/80 shadow-sm hover:shadow-xl hover:border-stone-400 transition-all duration-300 overflow-hidden"
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
