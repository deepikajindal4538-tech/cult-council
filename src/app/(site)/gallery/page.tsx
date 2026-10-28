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

      {/* 3-Row Revolving Carousel Showcase */}
      <RevolvingGalleryCarousel
        chapterLabel="CURATED EXHIBITION // CONTINUOUS RECORD"
        curatorLabel="AMS REPOSITORY • 24 HIGH-RES PLATES"
        title="Living Exhibition Stream"
        subtitle="Three revolving streams of performance plates, pro-night symphonies, street plays, and quiet midnight canvases."
        showCatalogLink={false}
      />

      {/* Flickr Album Catalog */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-16 sm:px-6 lg:px-8 border-t border-stone-300/80">
        <div className="mb-7">
          <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
            Explore the photo archive
          </h2>
          <p className="mt-2 font-serif italic text-ink-muted">
            Browse and search albums curated by the Acoustics &amp; Media
            Society.
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
