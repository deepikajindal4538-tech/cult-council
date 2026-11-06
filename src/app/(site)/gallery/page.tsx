import React from "react";
import Link from "next/link";
import { Camera } from "lucide-react";
import { getAlbumsWithFallback } from "@/lib/flickr/client";
import AlbumCatalogClient from "@/components/gallery/AlbumCatalogClient";
import RevolvingGalleryCarousel from "@/components/gallery/RevolvingGalleryCarousel";

export const metadata = {
  title: "Photo & Media Gallery | Cultural Council IIIT Allahabad",
  description:
    "Curated photo albums, festival pro-nights, street plays, and performance archives captured by the Acoustics & Media Society (AMS).",
};

export const revalidate = 600;

export default async function GalleryPage() {
  const albumsData = await getAlbumsWithFallback({ page: 1, per_page: 30 });

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F5] text-ink selection:bg-stone-300">
      {/* Editorial Header */}
      <section className="border-b border-stone-300/80 bg-[#FAF8F5] px-4 pb-12 pt-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
            <Link href="/" className="transition-colors hover:text-ink">
              HOME
            </Link>
            <span>/</span>
            <span className="font-semibold text-ink">MEDIA &amp; PHOTO ARCHIVE</span>
          </div>

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-200/70 px-3 py-1 font-mono text-xs uppercase tracking-wider text-ink">
              <Camera className="h-3.5 w-3.5 text-amber-600" />
              <span>OFFICIAL REPOSITORY • ACOUSTICS &amp; MEDIA SOCIETY (AMS)</span>
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-ink sm:text-6xl">
              The Visual Ledger of IIIT Allahabad
            </h1>
            <p className="font-serif text-lg italic text-ink-muted sm:text-2xl">
              High-resolution moments, dramatic stages, quiet rehearsals, and
              festival euphoria preserved across campus history.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Row Revolving Carousel Showcase with 50-Plate Reserve */}
      <RevolvingGalleryCarousel
        chapterLabel="CONTINUOUS ARCHIVAL STREAM // 50-PLATE RESERVE"
        curatorLabel="AMS REPOSITORY • 50 CURATED PERFORMANCE PLATES"
        title="Living Exhibition Stream"
        subtitle="Three revolving streams of pro-night symphonies, arena crowds, dance choreography, and dramatic moments drawn from the 50-image reserve."
        showCatalogLink={false}
      />

      {/* Major Event Collective Albums Catalog */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-16 sm:px-6 lg:px-8 border-t border-stone-300/80">
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-800">
            <span>COLLECTIVE EVENT DOSSIERS</span>
            <span>•</span>
            <span>CAMPUS FLAGSHIP GATHERINGS</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
            Major Campus Event Archives
          </h2>
          <p className="font-serif italic text-lg text-ink-muted max-w-3xl">
            Comprehensive collective dossiers preserving complete photo narratives for each major cultural festival, championship, and seasonal production.
          </p>
        </div>
        <AlbumCatalogClient
          initialAlbums={albumsData.albums}
          isLiveFlickr={albumsData.isLiveFlickr}
        />
      </main>
    </div>
  );
}
