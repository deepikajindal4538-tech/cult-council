"use client";

import React, { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ExternalLink,
  Camera,
  Info,
} from "lucide-react";
import { TrimmedPhoto } from "@/lib/flickr/schemas";

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  photos: TrimmedPhoto[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  albumTitle?: string;
}

export default function GalleryLightbox({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onIndexChange,
  albumTitle,
}: GalleryLightboxProps) {
  const [showInfo, setShowInfo] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentPhoto = photos[currentIndex];

  const handleNext = useCallback(() => {
    setImageLoaded(false);
    onIndexChange((currentIndex + 1) % photos.length);
  }, [currentIndex, photos.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    setImageLoaded(false);
    onIndexChange((currentIndex - 1 + photos.length) % photos.length);
  }, [currentIndex, photos.length, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox Exhibition"
      className="fixed inset-0 z-50 flex flex-col bg-stone-950/95 backdrop-blur-xl text-stone-100 select-none animate-in fade-in duration-200"
    >
      {/* Top Ledger Header */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-xs uppercase tracking-wider font-semibold">
            <Camera className="w-3.5 h-3.5" />
            <span>
              PLATE {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(photos.length).padStart(2, "0")}
            </span>
          </span>

          {albumTitle && (
            <span className="hidden md:inline-block font-mono text-xs text-stone-400 truncate max-w-sm">
              // {albumTitle}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2 rounded-full border transition-colors ${
              showInfo
                ? "bg-white/20 border-white/40 text-white"
                : "border-white/10 text-stone-400 hover:text-white hover:border-white/20"
            }`}
            title="Toggle caption details"
          >
            <Info className="w-4 h-4" />
          </button>

          <a
            href={currentPhoto.fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-white/10 text-stone-400 hover:text-white hover:border-white/20 transition-colors"
            title="Open original high-res in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onClose}
            className="p-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-colors"
            title="Close Lightbox (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Viewport Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Previous Button */}
        {photos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-stone-900/80 hover:bg-white/20 border border-white/10 text-stone-200 hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95"
            aria-label="Previous photograph (Left arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Center Photograph Frame */}
        <div className="relative max-w-6xl max-h-[75vh] w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={currentPhoto.fullUrl || currentPhoto.displayUrl}
              alt={currentPhoto.title || "Exhibition plate"}
              fill
              priority
              sizes="100vw"
              onLoad={() => setImageLoaded(true)}
              className={`object-contain transition-opacity duration-300 drop-shadow-2xl ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Next Button */}
        {photos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-stone-900/80 hover:bg-white/20 border border-white/10 text-stone-200 hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95"
            aria-label="Next photograph (Right arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Information Ledger & Thumbnail Navigator */}
      <div className="border-t border-white/10 bg-black/60 backdrop-blur-md px-4 sm:px-8 py-3 space-y-3">
        {/* Caption bar */}
        {showInfo && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                {currentPhoto.title || "Untitled Exhibition Plate"}
              </h4>
              <p className="font-mono text-[11px] text-stone-400">
                Photographed by Acoustics &amp; Media Society (AMS) • Cultural Council, IIIT Allahabad
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] text-stone-400">
              {currentPhoto.width && currentPhoto.height && (
                <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-stone-300">
                  {currentPhoto.width} × {currentPhoto.height} PX
                </span>
              )}
              <span className="text-stone-500">ID: {currentPhoto.id}</span>
            </div>
          </div>
        )}

        {/* Thumbnail Filmstrip */}
        {photos.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin">
            {photos.map((photo, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={photo.id}
                  onClick={() => {
                    setImageLoaded(false);
                    onIndexChange(index);
                  }}
                  className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    isActive
                      ? "border-amber-400 scale-105 ring-2 ring-amber-400/40"
                      : "border-transparent opacity-50 hover:opacity-100 hover:border-white/40"
                  }`}
                  title={`Jump to plate ${index + 1}: ${photo.title}`}
                >
                  <Image
                    src={photo.thumbnailUrl || photo.displayUrl}
                    alt={photo.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
