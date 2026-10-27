import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Camera, Calendar, ArrowLeft, Sparkles, Layers } from "lucide-react";
import { getAlbumPhotosWithFallback } from "@/lib/flickr/client";
import { FALLBACK_ALBUMS } from "@/lib/flickr/fallbackData";
import AlbumExhibitionClient from "@/components/gallery/AlbumExhibitionClient";

interface AlbumPageProps {
  params: {
    albumId: string;
  };
}

export const dynamicParams = true;
export const revalidate = 600; // 10 minutes cache

export async function generateStaticParams() {
  return FALLBACK_ALBUMS.map((album) => ({
    albumId: album.id,
  }));
}

export async function generateMetadata({ params }: AlbumPageProps) {
  const album = await getAlbumPhotosWithFallback(params.albumId);
  if (!album) {
    return {
      title: "Exhibition Not Found | Cultural Council IIIT Allahabad",
    };
  }

  return {
    title: `${album.title} | Media Gallery IIIT Allahabad`,
    description:
      album.description ||
      `Archival exhibition of ${album.total} photographs captured by the Acoustics & Media Society.`,
  };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const album = await getAlbumPhotosWithFallback(params.albumId);

  if (!album || !album.photos || album.photos.length === 0) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-ink selection:bg-stone-300">
      {/* Editorial Header */}
      <section className="border-b border-stone-300 bg-[#F4F1EA] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint mb-4">
            <Link href="/" className="hover:text-ink transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/gallery" className="hover:text-ink transition-colors">
              GALLERY
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold truncate max-w-xs sm:max-w-md">
              {album.title}
            </span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-semibold">
                <Camera className="w-3.5 h-3.5" />
                <span>{album.category || "EXHIBITION"}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-300 text-ink-muted">
                <Layers className="w-3.5 h-3.5" />
                <span>{album.photos.length} HIGH-RES PLATES</span>
              </span>

              {album.isLiveFlickr ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>LIVE FLICKR</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 border border-stone-300 text-stone-700">
                  <span>CURATED ARCHIVE</span>
                </span>
              )}
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-ink leading-tight">
              {album.title}
            </h1>

            {album.description && (
              <p className="font-serif italic text-xl sm:text-2xl text-ink-muted max-w-3xl leading-relaxed">
                {album.description}
              </p>
            )}

            <div className="pt-2 font-mono text-xs text-ink-faint flex items-center gap-4">
              <span>Curated by {album.curator || "Acoustics & Media Society (AMS)"}</span>
              <span>•</span>
              <span>Photoset ID: {album.albumId}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Exhibition Grid */}
      <main className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <AlbumExhibitionClient album={album} />
      </main>
    </div>
  );
}
