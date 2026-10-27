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
} from "lucide-react";
import { TrimmedAlbum } from "@/lib/flickr/schemas";

interface AlbumCatalogClientProps {
  initialAlbums: TrimmedAlbum[];
  isLiveFlickr: boolean;
}

const CATEGORIES = [
  "All Plates",
  "Festivals",
  "Theatrics",
  "Music",
  "Dance",
  "Fine Arts",
  "Literature",
];

export default function AlbumCatalogClient({
  initialAlbums,
  isLiveFlickr,
}: AlbumCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Plates");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlbums = useMemo(() => {
    return initialAlbums.filter((album) => {
      // Category match
      let matchesCategory = true;
      if (selectedCategory !== "All Plates") {
        const catLower = selectedCategory.toLowerCase();
        const titleLower = album.title.toLowerCase();
        const descLower = (album.description || "").toLowerCase();

        if (catLower === "festivals") {
          matchesCategory =
            titleLower.includes("effervescence") ||
            titleLower.includes("fest") ||
            descLower.includes("crowd") ||
            descLower.includes("pro-night");
        } else if (catLower === "theatrics") {
          matchesCategory =
            titleLower.includes("rangtarangini") ||
            titleLower.includes("nukkad") ||
            titleLower.includes("street play") ||
            titleLower.includes("drama");
        } else if (catLower === "music") {
          matchesCategory =
            titleLower.includes("virtuosi") ||
            titleLower.includes("unplugged") ||
            titleLower.includes("acoustic") ||
            titleLower.includes("band");
        } else if (catLower === "dance") {
          matchesCategory =
            titleLower.includes("geneticx") ||
            titleLower.includes("cypher") ||
            titleLower.includes("dance") ||
            titleLower.includes("break");
        } else if (catLower === "fine arts") {
          matchesCategory =
            titleLower.includes("nirmiti") ||
            titleLower.includes("canvas") ||
            titleLower.includes("mural") ||
            titleLower.includes("art");
        } else if (catLower === "literature") {
          matchesCategory =
            titleLower.includes("sarasva") ||
            titleLower.includes("kavya") ||
            titleLower.includes("literary") ||
            titleLower.includes("poetry");
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
    <div className="space-y-12">
      {/* Control bar: Category filter pills & search */}
      <div className="bg-[#FAF8F5] border border-stone-300 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search albums by title, artist, festival..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white font-mono text-xs text-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400 hover:text-ink px-1"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sync status indicator */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-200 bg-white font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              <span
                className={`w-2 h-2 rounded-full ${
                  isLiveFlickr ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              <span>
                {isLiveFlickr ? "Live Flickr Stream" : "Curated Photographic Archive"}
              </span>
            </div>
            <div className="font-mono text-xs text-ink-faint hidden sm:block">
              {filteredAlbums.length} of {initialAlbums.length} COLLECTIONS
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <div className="flex items-center gap-1.5 text-stone-400 mr-1 flex-shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-widest">DISCIPLINE:</span>
          </div>
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-ink text-white font-semibold shadow-sm"
                    : "bg-white border border-stone-200 text-ink-muted hover:border-stone-400 hover:text-ink"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Album Cards Grid */}
      {filteredAlbums.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlbums.map((album, idx) => {
            const formattedDate = album.dateCreated
              ? new Date(album.dateCreated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })
              : "Archival Plate";

            return (
              <Link
                key={album.id}
                href={`/gallery/${album.id}`}
                className="group flex flex-col bg-white rounded-2xl border border-stone-300 shadow-sm hover:shadow-xl hover:border-stone-400 transition-all duration-300 overflow-hidden"
              >
                {/* Museum Mat Frame */}
                <div className="p-3 bg-[#F4F1EA] border-b border-stone-200">
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-stone-200">
                    <Image
                      src={album.coverImageUrl}
                      alt={album.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority={idx < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Top badging */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-sm text-stone-100 font-mono text-[10px] uppercase tracking-wider font-semibold border border-white/10">
                        <Camera className="w-3 h-3 text-amber-300" />
                        <span>{album.photoCount} PLATES</span>
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/90 backdrop-blur-sm text-stone-700 font-mono text-[10px] uppercase tracking-wider font-semibold">
                        ALB-{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Hover Explore Indicator */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-ink font-mono text-xs uppercase tracking-wider font-semibold shadow-md">
                        <span>Examine Dossier</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Album Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-[11px] text-ink-faint border-b border-stone-100 pb-2">
                      <span className="uppercase tracking-widest flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formattedDate}
                      </span>
                      <span className="font-mono text-[10px] text-stone-400">
                        ID: {album.id.slice(0, 8)}...
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-ink group-hover:text-amber-900 transition-colors line-clamp-2 leading-tight">
                      {album.title}
                    </h2>

                    {album.description && (
                      <p className="font-sans text-xs text-ink-muted line-clamp-2 leading-relaxed">
                        {album.description}
                      </p>
                    )}
                  </div>

                  {/* Footer link line */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between font-mono text-xs text-ink-muted group-hover:text-ink transition-colors">
                    <span className="uppercase tracking-wider">Acoustics &amp; Media Society</span>
                    <span className="flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                      <span>View Gallery</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-24 px-4 bg-white rounded-2xl border border-dashed border-stone-300">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-ink mb-2">No photographic plates found</h3>
          <p className="font-sans text-sm text-ink-muted max-w-md mx-auto mb-6">
            We could not find any photographic albums matching &quot;{searchQuery}&quot; under the &quot;{selectedCategory}&quot; category.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Plates");
            }}
            className="px-5 py-2 rounded-full bg-ink text-white font-mono text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
