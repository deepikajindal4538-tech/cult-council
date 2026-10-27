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

      {/* Photo Plates Grid with Museum Mat Framing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {album.photos.map((photo, index) => {
          const plateNumber = String(index + 1).padStart(2, "0");

          return (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer bg-white rounded-2xl border border-stone-300 shadow-sm hover:shadow-xl hover:border-stone-400 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Mat Mount Frame */}
              <div className="p-4 bg-[#F4F1EA] border-b border-stone-200">
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-200">
                  <Image
                    src={photo.displayUrl || photo.thumbnailUrl}
                    alt={photo.title || `Exhibition plate ${plateNumber}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={index < 4}
                  />

                  {/* Dark gradient on hover */}
                  <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm text-ink font-mono text-xs uppercase tracking-wider font-semibold shadow-xl scale-95 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect Plate</span>
                    </span>
                  </div>

                  {/* Plate label badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-stone-900/80 backdrop-blur-sm text-white font-mono text-[10px] uppercase tracking-wider font-semibold">
                      PL-{plateNumber}
                    </span>
                  </div>

                  {/* Resolution tag */}
                  {photo.width && photo.height && (
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-stone-200 font-mono text-[10px]">
                        {photo.width} × {photo.height}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px] text-ink-faint">
                    <span className="uppercase tracking-widest">
                      Plate {plateNumber} of {album.photos.length}
                    </span>
                    <span>ID: {photo.id}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ink group-hover:text-amber-900 transition-colors line-clamp-2 leading-snug">
                    {photo.title || `Exhibition Plate #${plateNumber}`}
                  </h3>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between font-mono text-xs text-ink-muted">
                  <span className="text-[11px]">AMS Photographic Archive</span>
                  <span className="text-amber-800 font-medium group-hover:underline">
                    Expand →
                  </span>
                </div>
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
