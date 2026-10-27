import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera, Sparkles } from "lucide-react";
import { getAlbumsWithFallback } from "@/lib/flickr/client";
import AlbumCatalogClient from "@/components/gallery/AlbumCatalogClient";

export const metadata = {
  title: "Photo & Media Gallery | Cultural Council IIIT Allahabad",
  description:
    "Curated photo albums, festival pro-nights, street plays, and performance archives captured by the Acoustics & Media Society (AMS).",
};

export const revalidate = 600;

const featuredAlbums = [
  {
    id: "effervescence-pronite",
    title: "Effervescence: Pro-Night Concert & Arena",
    coverImage: "/images/gallery/pronite-crowd.jpg",
    date: "October 2025",
    category: "Festivals",
    coverTag: "Celebrity Arena & EDM Crowds",
    society: "AMS x Effervescence Team",
  },
  {
    id: "virtuosi-live",
    title: "Virtuosi Stage: Acoustic & Rock Production",
    coverImage: "/images/gallery/band-night.jpg",
    date: "October 2025",
    category: "Music",
    coverTag: "Stage Laser Cues & Live Bands",
    society: "Virtuosi Collective",
  },
  {
    id: "geneticx-crew",
    title: "Geneticx: Main Stage Choreography Showcase",
    coverImage: "/images/gallery/geneticx-dance.jpg",
    date: "September 2025",
    category: "Dance",
    coverTag: "Urban Precision & Synchronized Crew",
    society: "Geneticx Dance Crew",
  },
  {
    id: "theatre-persona",
    title: "Rangtarangini: Backstage Persona & Face Art",
    coverImage: "/images/gallery/theatre-prep.jpg",
    date: "September 2025",
    category: "Theatrics",
    coverTag: "Social Drama & Street Play Backstage",
    society: "Rangtarangini Troupe",
  },
  {
    id: "cultural-runway",
    title: "Campus Couture: Cultural Runway & Design",
    coverImage: "/images/gallery/ramp-walk.jpg",
    date: "April 2025",
    category: "Fine Arts & Design",
    coverTag: "Traditional & Avant-Garde Runway",
    society: "Nirmiti & Cultural Council",
  },
];

export default async function GalleryPage() {
  const albumsData = await getAlbumsWithFallback({ page: 1, per_page: 30 });

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F5] text-ink selection:bg-stone-300">
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

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-700" />
          <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
            Featured campus moments
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredAlbums.map((album) => (
            <article
              key={album.id}
              className="group rounded-2xl border border-stone-300/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-lg sm:p-5"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-900">
                <Image
                  src={album.coverImage}
                  alt={album.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3">
                  <span className="rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] text-white/90 backdrop-blur-xs">
                    {album.coverTag}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between border-b border-stone-200 pb-2 font-mono text-xs text-ink-faint">
                  <span className="font-semibold uppercase tracking-wider text-amber-800">
                    {album.category}
                  </span>
                  <span>{album.date}</span>
                </div>
                <h3 className="font-serif text-xl font-bold leading-snug text-ink transition-colors group-hover:text-amber-900 sm:text-2xl">
                  {album.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-stone-500">
                  Captured by {album.society}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
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
