"use client";

import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  Maximize2,
  ExternalLink,
  Layers,
  LayoutGrid,
  Columns3,
  SlidersHorizontal,
  Sparkles,
  Camera,
  Check,
  Share2,
} from "lucide-react";
import { TrimmedPhoto } from "@/lib/flickr/schemas";
import GalleryLightbox from "./GalleryLightbox";

interface FlickrPhotostreamProps {
  photos: TrimmedPhoto[];
  title?: string;
  subtitle?: string;
  isLiveFlickr?: boolean;
  totalCount?: number;
  showToolbar?: boolean;
  defaultRowHeight?: number;
}

type ViewMode = "justified" | "masonry" | "grid";
type Density = "dense" | "standard" | "immersive";
type Spacing = "flush" | "standard" | "roomy";

export default function FlickrPhotostream({
  photos,
  title,
  subtitle,
  isLiveFlickr = true,
  totalCount,
  showToolbar = true,
  defaultRowHeight = 290,
}: FlickrPhotostreamProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("justified");
  const [density, setDensity] = useState<Density>("standard");
  const [spacing, setSpacing] = useState<Spacing>("standard");
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic natural ratio map for images that didn't report dimensions from API
  const [naturalRatios, setNaturalRatios] = useState<Record<string, number>>({});

  const rowHeight = useMemo(() => {
    switch (density) {
      case "dense":
        return 220;
      case "immersive":
        return 380;
      case "standard":
      default:
        return defaultRowHeight;
    }
  }, [density, defaultRowHeight]);

  const gapClass = useMemo(() => {
    switch (spacing) {
      case "flush":
        return "gap-1";
      case "roomy":
        return "gap-3 sm:gap-4";
      case "standard":
      default:
        return "gap-1.5 sm:gap-2";
    }
  }, [spacing]);

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  const handleImageLoad = useCallback((id: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth && img.naturalHeight) {
      const ratio = img.naturalWidth / img.naturalHeight;
      setNaturalRatios((prev) => {
        if (prev[id] && Math.abs(prev[id] - ratio) < 0.01) return prev;
        return { ...prev, [id]: ratio };
      });
    }
  }, []);

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        photos={photos}
        currentIndex={currentPhotoIndex}
        onIndexChange={setCurrentPhotoIndex}
        albumTitle={title}
      />

      {/* Flickr Control Bar & View Toolbar */}
      {showToolbar && (
        <div className="w-full bg-white/90 backdrop-blur-md border border-stone-200/90 rounded-2xl px-4 py-3 sm:px-6 sm:py-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          {/* Left: Stream Info & Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
                {isLiveFlickr ? "FLICKR PHOTOSTREAM" : "ARCHIVAL PHOTOSTREAM"}
              </span>
            </div>

            <span className="text-stone-300 hidden sm:inline">•</span>

            <span className="font-mono text-xs text-ink-muted">
              {totalCount || photos.length} PHOTOGRAPHS
            </span>

            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 font-mono text-[11px] text-stone-600">
              <Camera className="w-3 h-3 text-amber-600" />
              <span>100% Original Ratio (Zero Crop)</span>
            </span>
          </div>

          {/* Right: Layout Switcher & Density Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Switcher */}
            <div className="inline-flex items-center rounded-xl bg-stone-100 p-1 border border-stone-200">
              <button
                onClick={() => setViewMode("justified")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                  viewMode === "justified"
                    ? "bg-white text-ink font-semibold shadow-2xs"
                    : "text-stone-500 hover:text-ink"
                }`}
                title="Flickr Justified Row Flow (Preserves Exact Aspect Ratios)"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Justified</span>
              </button>

              <button
                onClick={() => setViewMode("masonry")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                  viewMode === "masonry"
                    ? "bg-white text-ink font-semibold shadow-2xs"
                    : "text-stone-500 hover:text-ink"
                }`}
                title="Masonry Waterfall Columns"
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Masonry</span>
              </button>

              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-ink font-semibold shadow-2xs"
                    : "text-stone-500 hover:text-ink"
                }`}
                title="Uniform Square Grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            {/* Density Selector (only for justified mode) */}
            {viewMode === "justified" && (
              <div className="inline-flex items-center rounded-xl bg-stone-100 p-1 border border-stone-200">
                <button
                  onClick={() => setDensity("dense")}
                  className={`px-2 py-1 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all ${
                    density === "dense"
                      ? "bg-white text-ink font-semibold shadow-2xs"
                      : "text-stone-500 hover:text-ink"
                  }`}
                  title="Compact / Dense Row Height (220px)"
                >
                  Dense
                </button>
                <button
                  onClick={() => setDensity("standard")}
                  className={`px-2 py-1 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all ${
                    density === "standard"
                      ? "bg-white text-ink font-semibold shadow-2xs"
                      : "text-stone-500 hover:text-ink"
                  }`}
                  title="Standard Flickr Row Height (290px)"
                >
                  Standard
                </button>
                <button
                  onClick={() => setDensity("immersive")}
                  className={`px-2 py-1 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all ${
                    density === "immersive"
                      ? "bg-white text-ink font-semibold shadow-2xs"
                      : "text-stone-500 hover:text-ink"
                  }`}
                  title="Immersive Row Height (380px)"
                >
                  Large
                </button>
              </div>
            )}

            {/* Spacing Selector */}
            <div className="hidden lg:inline-flex items-center rounded-xl bg-stone-100 p-1 border border-stone-200">
              <button
                onClick={() => setSpacing("flush")}
                className={`px-2 py-1 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all ${
                  spacing === "flush"
                    ? "bg-white text-ink font-semibold shadow-2xs"
                    : "text-stone-500 hover:text-ink"
                }`}
                title="Flush Margins (4px)"
              >
                Flush
              </button>
              <button
                onClick={() => setSpacing("standard")}
                className={`px-2 py-1 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all ${
                  spacing === "standard"
                    ? "bg-white text-ink font-semibold shadow-2xs"
                    : "text-stone-500 hover:text-ink"
                }`}
                title="Standard Flickr Gap (8px)"
              >
                Normal
              </button>
            </div>

            {/* Share & Lightbox */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors shadow-2xs"
              title="Copy photostream link"
            >
              {copiedLink ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              onClick={() => openLightbox(0)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ink text-white font-mono text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-2xs"
              title="Launch Full Lightbox Exhibition"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Slideshow</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. FLICKR JUSTIFIED PHOTOSTREAM (Default signature Flickr layout)         */}
      {/* ========================================================================= */}
      {viewMode === "justified" && (
        <div
          className={`flex flex-wrap ${gapClass} justify-start items-stretch select-none`}
          style={{ width: "100%" }}
        >
          {photos.map((photo, index) => {
            // Determine accurate aspect ratio: API width/height or dynamic onLoad ratio
            const naturalRatio = naturalRatios[photo.id];
            const ratio =
              naturalRatio ||
              (photo.width && photo.height && photo.width > 0 && photo.height > 0
                ? photo.width / photo.height
                : 1.5);

            const basisWidth = Math.round(ratio * rowHeight);
            const flexGrowValue = Math.round(ratio * 100);

            return (
              <div
                key={photo.id}
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden bg-stone-900 cursor-pointer rounded-xs transition-transform duration-200 ease-out flex-shrink-0"
                style={{
                  height: `${rowHeight}px`,
                  flexGrow: flexGrowValue,
                  flexBasis: `${basisWidth}px`,
                  aspectRatio: `${ratio}`,
                  minWidth: `${Math.round(ratio * rowHeight * 0.65)}px`,
                }}
              >
                <Image
                  src={photo.displayUrl || photo.thumbnailUrl}
                  alt={photo.title || `Photograph ${index + 1}`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  onLoad={(e) => handleImageLoad(photo.id, e)}
                  priority={index < 8}
                />

                {/* Flickr Signature Hover Vignette & Metadata Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 pointer-events-none">
                  {/* Top: Index Badge & Quick Actions */}
                  <div className="flex items-center justify-between pointer-events-auto">
                    <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white font-mono text-[10px] font-semibold tracking-wider shadow-sm">
                      #{String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(index);
                        }}
                        className="p-1.5 rounded bg-black/60 hover:bg-black/90 backdrop-blur-md text-white transition-colors"
                        title="Fullscreen Lightbox"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={photo.fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded bg-black/60 hover:bg-black/90 backdrop-blur-md text-white transition-colors"
                        title="Open Original High-Res"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Bottom: Clean Title & Attribution */}
                  <div className="space-y-0.5 pointer-events-auto text-left">
                    <h3 className="font-sans text-sm font-semibold text-white drop-shadow truncate">
                      {photo.title || `Photograph ${index + 1}`}
                    </h3>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-stone-300">
                      <span>AMS IIITA</span>
                      <span>•</span>
                      <span>
                        {photo.width && photo.height
                          ? `${photo.width}×${photo.height}`
                          : "High-Res"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Flickr Last Row Spacer: prevents the final row from stretching wide */}
          <div
            className="h-0 flex-shrink-0"
            style={{
              flexGrow: 10000000,
              flexBasis: `${Math.round(rowHeight * 1.5)}px`,
            }}
            aria-hidden="true"
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MASONRY WATERFALL LAYOUT (Columns keeping natural heights)              */}
      {/* ========================================================================= */}
      {viewMode === "masonry" && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 sm:gap-3 space-y-2 sm:space-y-3">
          {photos.map((photo, index) => {
            const naturalRatio = naturalRatios[photo.id];
            const ratio =
              naturalRatio ||
              (photo.width && photo.height && photo.width > 0 && photo.height > 0
                ? photo.width / photo.height
                : 1.5);

            return (
              <div
                key={photo.id}
                onClick={() => openLightbox(index)}
                className="group relative break-inside-avoid overflow-hidden bg-stone-900 cursor-pointer rounded-xs transition-transform duration-200"
                style={{ aspectRatio: `${ratio}` }}
              >
                <Image
                  src={photo.displayUrl || photo.thumbnailUrl}
                  alt={photo.title || `Photograph ${index + 1}`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
                  onLoad={(e) => handleImageLoad(photo.id, e)}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
                  <h3 className="font-sans text-xs font-semibold text-white truncate">
                    {photo.title || `Plate ${index + 1}`}
                  </h3>
                  <span className="font-mono text-[10px] text-stone-300">
                    Acoustics &amp; Media Society
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SQUARE UNIFORM GRID LAYOUT                                             */}
      {/* ========================================================================= */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square overflow-hidden bg-stone-900 cursor-pointer rounded-xs"
            >
              <Image
                src={photo.thumbnailUrl || photo.displayUrl}
                alt={photo.title || `Photograph ${index + 1}`}
                fill
                unoptimized
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-2 text-center">
                <span className="font-sans text-xs font-semibold text-white drop-shadow truncate">
                  {photo.title || `#${index + 1}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
