import React from "react";
import Link from "next/link";
import { Camera, Sparkles, Image as ImageIcon } from "lucide-react";
import { getAlbumsWithFallback } from "@/lib/flickr/client";
import AlbumCatalogClient from "@/components/gallery/AlbumCatalogClient";

export const metadata = {
  title: "Photo & Media Gallery | Cultural Council IIIT Allahabad",
  description:
    "Curated photo albums, festival pro-nights, street plays, and performance archives captured by the Acoustics & Media Society (AMS).",
};

export const revalidate = 600; // 10 minutes cache

export default async function GalleryPage() {
  const albumsData = await getAlbumsWithFallback({ page: 1, per_page: 30 });

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
            <span className="text-ink font-semibold">PHOTOGRAPHIC LEDGER</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-mono text-xs uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>CURATED BY ACOUSTICS &amp; MEDIA SOCIETY (AMS)</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-ink">
              The Photographic Record of IIIT Allahabad
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-ink-muted">
              High-resolution moments, dramatic stages, quiet rehearsals, and festival euphoria preserved across campus history.
            </p>
          </div>
        </div>
      </section>

      {/* Main Albums Section */}
      <main className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <AlbumCatalogClient
          initialAlbums={albumsData.albums}
          isLiveFlickr={albumsData.isLiveFlickr}
        />
      </main>
    </div>
  );
}
