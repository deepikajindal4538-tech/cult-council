import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera, ArrowUpRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Photo & Media Gallery | Cultural Council IIIT Allahabad",
  description:
    "Curated photo albums, festival pro-nights, street plays, and performance archives captured by the Acoustics & Media Society (AMS).",
};

const albums = [
  {
    id: "effervescence-pronite",
    title: "Effervescence: Pro-Night Concert & Arena",
    coverImage: "/images/gallery/pronite-crowd.jpg",
    photosCount: 142,
    date: "October 2025",
    category: "Festivals",
    coverTag: "Celebrity Arena & EDM Crowds",
    society: "AMS x Effervescence Team",
    aspect: "aspect-[3/2]",
  },
  {
    id: "virtuosi-live",
    title: "Virtuosi Stage: Acoustic & Rock Production",
    coverImage: "/images/gallery/band-night.jpg",
    photosCount: 84,
    date: "October 2025",
    category: "Music",
    coverTag: "Stage Laser Cues & Live Bands",
    society: "Virtuosi Collective",
    aspect: "aspect-[3/2]",
  },
  {
    id: "geneticx-crew",
    title: "Geneticx: Main Stage Choreography Showcase",
    coverImage: "/images/gallery/geneticx-dance.jpg",
    photosCount: 96,
    date: "September 2025",
    category: "Dance",
    coverTag: "Urban Precision & Synchronized Crew",
    society: "Geneticx Dance Crew",
    aspect: "aspect-[3/2]",
  },
  {
    id: "theatre-persona",
    title: "Rangtarangini: Backstage Persona & Face Art",
    coverImage: "/images/gallery/theatre-prep.jpg",
    photosCount: 68,
    date: "September 2025",
    category: "Theatrics",
    coverTag: "Social Drama & Street Play Backstage",
    society: "Rangtarangini Troupe",
    aspect: "aspect-[3/2]",
  },
  {
    id: "cultural-runway",
    title: "Campus Couture: Cultural Runway & Design",
    coverImage: "/images/gallery/ramp-walk.jpg",
    photosCount: 52,
    date: "April 2025",
    category: "Fine Arts & Design",
    coverTag: "Traditional & Avant-Garde Runway",
    society: "Nirmiti & Cultural Council",
    aspect: "aspect-[3/2]",
  },
  {
    id: "sarasva-kavya",
    title: "Sarasva: Kavya Sandhya & Literary Salon",
    coverImage: "/images/gallery/band-night.jpg",
    photosCount: 46,
    date: "February 2025",
    category: "Literature",
    coverTag: "Spoken Word, Mushaira & Ghazals",
    society: "Sarasva Society",
    aspect: "aspect-[3/2]",
  },
];

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-ink selection:bg-stone-300">
      {/* Header */}
      <section className="border-b border-stone-300/80 bg-[#FAF8F5] pt-14 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint mb-3">
            <Link href="/" className="hover:text-ink transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">MEDIA &amp; PHOTO ARCHIVE</span>
          </div>

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/70 border border-stone-300 text-ink font-mono text-xs uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5 text-amber-600" />
              <span>OFFICIAL REPOSITORY • ACOUSTICS &amp; MEDIA SOCIETY (AMS)</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-ink">
              The Visual Ledger of IIIT Allahabad
            </h1>
            <p className="font-serif italic text-lg sm:text-2xl text-ink-muted">
              High-resolution moments, dramatic stages, quiet rehearsals, and festival euphoria preserved across campus history.
            </p>
          </div>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {albums.map((album) => (
            <div
              key={album.id}
              className="group bg-white p-4 sm:p-5 rounded-2xl border border-stone-300/90 shadow-2xs hover:shadow-lg hover:border-ink hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Photo Mount Frame */}
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-stone-900 border border-stone-200 shadow-2xs">
                  <Image
                    src={album.coverImage}
                    alt={album.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <span className="font-mono text-[10px] text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      {album.photosCount} HIGH-RES PLATES
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-ink-faint border-b border-stone-200 pb-2 mb-2">
                    <span className="uppercase tracking-wider font-semibold text-amber-800">
                      {album.category}
                    </span>
                    <span>{album.date}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink group-hover:text-amber-900 transition-colors leading-snug">
                    {album.title}
                  </h3>
                  <p className="font-mono text-xs text-stone-500 mt-1">
                    Captured by {album.society}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-200 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-ink font-semibold">
                <span>View Plates</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-amber-700" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
