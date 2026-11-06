"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Layers,
  ArrowLeft,
  Maximize2,
  Calendar,
  Sparkles,
  Share2,
  Check,
  ExternalLink,
} from "lucide-react";
import { TrimmedPhoto } from "@/lib/flickr/schemas";
import GalleryLightbox from "./GalleryLightbox";

interface AlbumExhibitionClientProps {
  album: {
    albumId: string;
    title: string;
    total: number;
    photos: TrimmedPhoto[];
    isLiveFlickr: boolean;
    curator?: string;
    category?: string;
    description?: string;
  };
}

export default function AlbumExhibitionClient({ album }: AlbumExhibitionClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

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
    <div className="space-y-12">
      {/* Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        photos={album.photos}
        currentIndex={currentPhotoIndex}
        onIndexChange={setCurrentPhotoIndex}
        albumTitle={album.title}
      />

      {/* Exhibition Actions Bar */}
      <div className="bg-[#FAF8F5] border border-stone-300 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-300 text-ink font-mono text-xs uppercase tracking-wider hover:bg-stone-100 hover:border-stone-400 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Catalog</span>
          </Link>

          <div className="font-mono text-xs text-ink-muted">
            EXHIBITION {album.albumId.slice(0, 8)} • {album.photos.length} PHOTOGRAPHS
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-stone-300 text-ink font-mono text-xs uppercase tracking-wider hover:bg-stone-100 transition-colors"
            title="Copy link to this exhibition"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-stone-500" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            onClick={() => openLightbox(0)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ink text-white font-mono text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Full Lightbox</span>
          </button>
        </div>
      </div>

      {/* Photo Plates Grid with Clean Minimalist Framing: Only Image & File Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {album.photos.map((photo, index) => {
          const plateNumber = String(index + 1).padStart(2, "0");

          return (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer bg-white rounded-2xl border border-stone-300 shadow-2xs hover:shadow-xl hover:border-stone-400 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Mat Mount Frame & Image */}
              <div className="p-3 bg-[#F4F1EA] border-b border-stone-200">
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-200">
                  <Image
                    src={photo.displayUrl || photo.thumbnailUrl}
                    alt={photo.title || `Exhibition plate ${plateNumber}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={index < 4}
                  />

                  {/* Clean minimal expand icon on hover */}
                  <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="p-2 rounded-full bg-stone-900/80 backdrop-blur-md text-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Only File Name */}
              <div className="px-5 py-3.5 bg-white">
                <h3 className="font-serif text-lg font-bold text-ink group-hover:text-amber-900 transition-colors truncate">
                  {photo.title || `Plate ${plateNumber}`}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Attribution & Archive Footer */}
      <div className="mt-16 bg-[#F4F1EA] border border-stone-300 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-faint">
            <Camera className="w-3.5 h-3.5 text-stone-600" />
            <span>Curatorial Archive Compliance</span>
          </div>
          <h4 className="font-serif text-lg font-bold text-ink">
            Acoustics &amp; Media Society (AMS) Photographic Collection
          </h4>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            All photographs preserved under the cultural charter of IIIT Allahabad. Hotlinked via Flickr CDN with strictly enforced read-only schemas and server-side rate limits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/societies/ams"
            className="px-4 py-2 rounded-xl bg-white border border-stone-300 text-ink font-mono text-xs uppercase tracking-wider hover:border-stone-400 transition-colors shadow-sm"
          >
            Visit AMS Dossier
          </Link>
          <Link
            href="/gallery"
            className="px-4 py-2 rounded-xl bg-ink text-white font-mono text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-sm"
          >
            Catalog Index
          </Link>
        </div>
      </div>
    </div>
  );
}
