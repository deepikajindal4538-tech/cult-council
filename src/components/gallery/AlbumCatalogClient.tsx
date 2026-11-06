"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Camera,
  Layers,
  ArrowUpRight,
  Filter,
  Sparkles,
  Calendar,
  Eye,
  CheckCircle2,
  Bookmark,
  Award,
  Grid,
} from "lucide-react";
import { TrimmedAlbum, TrimmedPhoto } from "@/lib/flickr/schemas";
import FlickrPhotostream from "./FlickrPhotostream";

interface AlbumCatalogClientProps {
  initialAlbums: TrimmedAlbum[];
  isLiveFlickr: boolean;
  initialPhotostream?: TrimmedPhoto[];
  photostreamTotal?: number;
  isLivePhotostream?: boolean;
}

const CATEGORIES = [
  "All Major Events",
  "Effervescence Fest",
  "Goonj Theatrics",
  "Virtuosi Music",
  "Geneticx Dance",
  "Couture & Fine Arts",
  "Sarasva Literary",
  "Techno-Cultural & Sports",
];

export default function AlbumCatalogClient({
  initialAlbums,
  isLiveFlickr,
  initialPhotostream = [],
  photostreamTotal = 0,
  isLivePhotostream = true,
}: AlbumCatalogClientProps) {
  const [activeTab, setActiveTab] = useState<"photostream" | "albums">("photostream");
  const [selectedCategory, setSelectedCategory] = useState("All Major Events");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlbums = useMemo(() => {
    return initialAlbums.filter((album) => {
      // Category match
      let matchesCategory = true;
      if (selectedCategory !== "All Major Events") {
        const catLower = selectedCategory.toLowerCase();
        const titleLower = album.title.toLowerCase();
        const descLower = (album.description || "").toLowerCase();

        if (catLower.includes("effervescence")) {
          matchesCategory =
            titleLower.includes("effervescence") ||
            titleLower.includes("fest") ||
            descLower.includes("pro-night");
        } else if (catLower.includes("goonj") || catLower.includes("theatrics")) {
          matchesCategory =
            titleLower.includes("goonj") ||
            titleLower.includes("rangtarangini") ||
            titleLower.includes("theatrics") ||
            titleLower.includes("drama") ||
            descLower.includes("thespian") ||
            descLower.includes("nukkad");
        } else if (catLower.includes("virtuosi") || catLower.includes("music")) {
          matchesCategory =
            titleLower.includes("virtuosi") ||
            titleLower.includes("unplugged") ||
            titleLower.includes("band") ||
            titleLower.includes("music") ||
            descLower.includes("acoustic");
        } else if (catLower.includes("geneticx") || catLower.includes("dance")) {
          matchesCategory =
            titleLower.includes("geneticx") ||
            titleLower.includes("footloose") ||
            titleLower.includes("dance") ||
            descLower.includes("choreography") ||
            descLower.includes("cypher");
        } else if (catLower.includes("couture") || catLower.includes("fine arts")) {
          matchesCategory =
            titleLower.includes("couture") ||
            titleLower.includes("nirmiti") ||
            titleLower.includes("runway") ||
            titleLower.includes("scenography") ||
            descLower.includes("fashion") ||
            descLower.includes("mural");
        } else if (catLower.includes("sarasva") || catLower.includes("literary")) {
          matchesCategory =
            titleLower.includes("sarasva") ||
            titleLower.includes("kavya") ||
            titleLower.includes("sahitya") ||
            titleLower.includes("literary") ||
            descLower.includes("mushaira") ||
            descLower.includes("poetry");
        } else if (catLower.includes("techno") || catLower.includes("sports")) {
          matchesCategory =
            titleLower.includes("aparoksha") ||
            titleLower.includes("asmita") ||
            titleLower.includes("techno") ||
            titleLower.includes("march-past");
        }
      }

      // Search query match
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch =
          album.title.toLowerCase().includes(q) ||
          (album.description || "").toLowerCase().includes(q) ||
          album.id.includes(q);
      }

      return matchesCategory && matchesSearch;
    });
  }, [initialAlbums, selectedCategory, searchQuery]);

  return (
    <div className="w-full space-y-8">
      {/* Primary Section Mode Selector (Photostream vs Event Albums) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div className="inline-flex rounded-2xl bg-stone-100 p-1.5 border border-stone-200 shadow-2xs self-start">
          <button
            onClick={() => setActiveTab("photostream")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "photostream"
                ? "bg-white text-ink font-bold shadow-xs"
                : "text-stone-500 hover:text-ink"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Flickr Photostream</span>
            <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded-full text-stone-600 font-normal">
              {photostreamTotal || initialPhotostream.length} Photos
            </span>
          </button>

          <button
            onClick={() => setActiveTab("albums")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "albums"
                ? "bg-white text-ink font-bold shadow-xs"
                : "text-stone-500 hover:text-ink"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            <span>Event Albums &amp; Dossiers</span>
            <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded-full text-stone-600 font-normal">
              {initialAlbums.length} Collections
            </span>
          </button>
        </div>

        <div className="font-mono text-xs text-ink-faint">
          {activeTab === "photostream"
            ? "Continuous justified photographic ledger (100% original aspect ratio)"
            : `${filteredAlbums.length} collective event dossiers ready for exploration`}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. FLICKR PHOTOSTREAM TAB                                                 */}
      {/* ========================================================================= */}
      {activeTab === "photostream" && (
        <div className="space-y-6">
          <FlickrPhotostream
            photos={initialPhotostream}
            isLiveFlickr={isLivePhotostream}
            totalCount={photostreamTotal}
            showToolbar={true}
            defaultRowHeight={290}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. EVENT ALBUMS & DOSSIERS TAB                                            */}
      {/* ========================================================================= */}
      {activeTab === "albums" && (
        <div className="space-y-8">
          {/* Search & Category Filter Bar */}
          <div className="bg-white/90 backdrop-blur-md border border-stone-200/90 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-5">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search major event archives by festival, society, year..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 font-mono text-xs text-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-500 transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-ink font-mono text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Status & Count */}
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-200 bg-stone-50 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isLiveFlickr ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                    }`}
                  />
                  <span>
                    {isLiveFlickr ? "Live Flickr Repository" : "Curated High-Res Archive"}
                  </span>
                </div>
                <div className="font-mono text-xs text-ink-faint hidden sm:block">
                  {filteredAlbums.length} of {initialAlbums.length} DOSSIERS
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              <div className="flex items-center gap-1.5 text-stone-400 mr-1 flex-shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-widest">FILTER:</span>
              </div>
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-ink text-white font-semibold shadow-xs"
                        : "bg-white border border-stone-200 text-ink-muted hover:border-stone-400 hover:text-ink shadow-2xs"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Album Cards Grid: Expansive, Full-Bleed, Clean Minimal Borders */}
          {filteredAlbums.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAlbums.map((album, idx) => {
                const formattedDate = album.dateCreated
                  ? new Date(album.dateCreated).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })
                  : "Archival Record";

                return (
                  <Link
                    key={album.id}
                    href={`/gallery/${album.id}`}
                    className="group flex flex-col bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-stone-400 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    {/* Full-Bleed Clean Image Header (No bulky beige mats or thick frames) */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                      <Image
                        src={album.coverImageUrl}
                        alt={album.title}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        priority={idx < 4}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-stone-100 font-mono text-[10px] uppercase tracking-wider font-semibold shadow-xs">
                          <Camera className="w-3 h-3 text-amber-300" />
                          <span>{album.photoCount} PLATES</span>
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-stone-800 font-mono text-[10px] uppercase tracking-wider font-semibold shadow-xs">
                          <Bookmark className="w-3 h-3 text-amber-600" />
                          <span>DOSSIER-{String(idx + 1).padStart(2, "0")}</span>
                        </span>
                      </div>

                      {/* Bottom Floating Hover Pill */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-ink font-mono text-xs uppercase tracking-wider font-semibold shadow-md group-hover:scale-105 transition-transform">
                          <span>Examine</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Album Dossier Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between font-mono text-[11px] text-ink-faint border-b border-stone-100 pb-2">
                          <span className="uppercase tracking-widest flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-stone-400" />
                            {formattedDate}
                          </span>
                          <span className="font-mono text-[10px] text-stone-400">
                            ID: {album.id.slice(-6)}
                          </span>
                        </div>

                        <h2 className="font-serif text-xl font-bold text-ink group-hover:text-amber-900 transition-colors line-clamp-2 leading-snug">
                          {album.title}
                        </h2>

                        {album.description && (
                          <p className="font-sans text-xs text-ink-muted line-clamp-2 leading-relaxed">
                            {album.description}
                          </p>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between font-mono text-xs text-ink-muted group-hover:text-ink transition-colors">
                        <span className="uppercase tracking-wider text-[11px] font-medium text-stone-500">
                          Official Collection
                        </span>
                        <span className="flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform text-amber-800">
                          <span>View Plates</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center bg-white border border-stone-200/90 rounded-2xl p-8 space-y-4 shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-ink">
                  No matching major event dossiers found
                </h3>
                <p className="font-mono text-xs text-ink-muted">
                  Try adjusting your event filter or search query.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory("All Major Events");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-ink text-white font-mono text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-2xs"
              >
                Reset Event Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
