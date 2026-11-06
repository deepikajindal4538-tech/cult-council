"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Camera, ShieldCheck, ExternalLink } from "lucide-react";
import { TrimmedPhoto } from "@/lib/flickr/schemas";
import FlickrPhotostream from "./FlickrPhotostream";

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
  return (
    <div className="w-full space-y-8">
      {/* Return to Catalog Sub-Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-stone-300 text-ink font-mono text-xs uppercase tracking-wider hover:bg-stone-100 hover:border-stone-400 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Catalog</span>
          </Link>

          <span className="font-mono text-xs text-ink-faint hidden sm:inline">
            // PHOTOSYNC: {album.albumId}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-ink-muted">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{album.isLiveFlickr ? "Live Flickr Repository" : "Curated High-Res Archive"}</span>
        </div>
      </div>

      {/* Flickr Signature Photostream (100% Original Aspect Ratio, Zero Crop, Zoom Immune) */}
      <FlickrPhotostream
        photos={album.photos}
        title={album.title}
        subtitle={album.description}
        isLiveFlickr={album.isLiveFlickr}
        totalCount={album.total}
        showToolbar={true}
        defaultRowHeight={290}
      />

      {/* Curatorial Attribution Footer */}
      <div className="mt-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xs">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-800">
            <Camera className="w-3.5 h-3.5" />
            <span>Curatorial Archive Compliance • Acoustics &amp; Media Society (AMS)</span>
          </div>
          <h4 className="font-serif text-lg font-bold text-ink">
            Official Photography Ledger of IIIT Allahabad
          </h4>
          <p className="font-sans text-xs text-ink-muted leading-relaxed">
            All photographs preserved under the cultural charter of the Acoustics &amp; Media Society, Indian Institute of Information Technology, Allahabad. Hotlinked via Flickr CDN with verified read-only schemas and server-side edge caching.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/societies/ams"
            className="px-4 py-2 rounded-xl bg-stone-100 border border-stone-300 text-ink font-mono text-xs uppercase tracking-wider hover:bg-stone-200 transition-colors shadow-2xs"
          >
            AMS Society Dossier
          </Link>
          <Link
            href="/gallery"
            className="px-4 py-2 rounded-xl bg-ink text-white font-mono text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-2xs"
          >
            Catalog Index
          </Link>
        </div>
      </div>
    </div>
  );
}
