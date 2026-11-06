import React from "react";
import Link from "next/link";
import { Camera, Sparkles, Layers } from "lucide-react";
import {
  getAlbumsWithFallback,
  getLiveCarouselRows,
  getPhotostreamWithFallback,
} from "@/lib/flickr/client";
import AlbumCatalogClient from "@/components/gallery/AlbumCatalogClient";
import RevolvingGalleryCarousel from "@/components/gallery/RevolvingGalleryCarousel";

export const metadata = {
  title: "Photo & Media Gallery | Cultural Council IIIT Allahabad",
  description:
    "Curated photo albums, festival pro-nights, street plays, and performance archives captured by the Acoustics & Media Society (AMS).",
};

export const revalidate = 600;

export default async function GalleryPage() {
  const [albumsData, liveCarousel, photostreamData] = await Promise.all([
    getAlbumsWithFallback({ page: 1, per_page: 30 }),
    getLiveCarouselRows(),
    getPhotostreamWithFallback({ page: 1, per_page: 48 }),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F5] text-ink selection:bg-stone-300">
      {/* Editorial Header - Expansive and Wide */}
      <section className="border-b border-stone-300/80 bg-[#FAF8F5] px-4 pb-10 pt-12 sm:px-6 md:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-[1920px]">
          <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
            <Link href="/" className="transition-colors hover:text-ink">
              HOME
            </Link>
            <span>/</span>
            <span className="font-semibold text-ink">MEDIA &amp; PHOTO ARCHIVE</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-4xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-200/70 px-3 py-1 font-mono text-xs uppercase tracking-wider text-ink">
                <Camera className="h-3.5 w-3.5 text-amber-600" />
                <span>OFFICIAL REPOSITORY • ACOUSTICS &amp; MEDIA SOCIETY (AMS)</span>
              </div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                The Visual Ledger of IIIT Allahabad
              </h1>
              <p className="font-serif text-lg italic text-ink-muted sm:text-2xl leading-relaxed">
                High-resolution moments, dramatic stages, quiet rehearsals, and
                festival euphoria preserved across campus history.
              </p>
            </div>

            <div className="font-mono text-xs text-ink-faint flex flex-col items-start lg:items-end gap-1">
              <span>Primary NSID: 129074767@N06</span>
              <span>Repository: 217,620+ Photographs • 968 Albums</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Row Revolving Carousel Showcase with Live Flickr / Archival Stream */}
      <RevolvingGalleryCarousel
        chapterLabel={
          liveCarousel.isLive
            ? "LIVE FLICKR ARCHIVAL STREAM // REST UPSTREAM"
            : "CONTINUOUS ARCHIVAL STREAM // 50-PLATE RESERVE"
        }
        curatorLabel={
          liveCarousel.isLive
            ? "AMS REPOSITORY • STREAMING LIVE VIA FLICKR API"
            : "AMS REPOSITORY • 50 CURATED PERFORMANCE PLATES"
        }
        title="Living Exhibition Stream"
        subtitle={
          liveCarousel.isLive
            ? "Three revolving streams of festival pro-nights, dance battles, theatrical plays, and classical concerts streamed live via Flickr."
            : "Three revolving streams of pro-night symphonies, arena crowds, dance choreography, and dramatic moments drawn from the 50-image reserve."
        }
        showCatalogLink={false}
        row1={liveCarousel.row1}
        row2={liveCarousel.row2}
        row3={liveCarousel.row3}
      />

      {/* Main Expansive Gallery Section (Photostream & Albums) */}
      <main className="mx-auto w-full max-w-[1920px] flex-1 px-3 sm:px-6 md:px-8 xl:px-12 py-10 border-t border-stone-300/80">
        <AlbumCatalogClient
          initialAlbums={albumsData.albums}
          isLiveFlickr={albumsData.isLiveFlickr}
          initialPhotostream={photostreamData.photos}
          photostreamTotal={photostreamData.total}
          isLivePhotostream={photostreamData.isLiveFlickr}
        />
      </main>
    </div>
  );
}
