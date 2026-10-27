import React from "react";
import Link from "next/link";
import { Camera, Sparkles, ArrowUpRight, Image as ImageIcon } from "lucide-react";

export const metadata = {
  title: "Photo & Media Gallery | Cultural Council IIIT Allahabad",
  description:
    "Curated photo albums, festival pro-nights, street plays, and performance archives captured by the Acoustics & Media Society (AMS).",
};

const albums = [
  {
    id: "effervescence-2025",
    title: "Effervescence 2025: Pro-Nights & Main Stage",
    photosCount: 142,
    date: "October 2025",
    category: "Festivals",
    coverTag: "Celebrity Night & EDM Arena",
    society: "AMS x Effervescence Team",
  },
  {
    id: "nukkad-natak-2025",
    title: "Rangtarangini: Annual Street Play Showcase",
    photosCount: 88,
    date: "September 2025",
    category: "Theatrics",
    coverTag: "Social Truths in Motion",
    society: "Rangtarangini Troupe",
  },
  {
    id: "acoustic-evening-fall",
    title: "Virtuosi Unplugged: Autumn Starlight Session",
    photosCount: 64,
    date: "August 2025",
    category: "Music",
    coverTag: "Acoustic Harmonies & Strings",
    society: "Virtuosi Collective",
  },
  {
    id: "geneticx-cypher",
    title: "Geneticx: Street Cypher & Break Battles",
    photosCount: 95,
    date: "July 2025",
    category: "Dance",
    coverTag: "Kinetic Motion & Popping",
    society: "Geneticx Crew",
  },
  {
    id: "nirmiti-canvas",
    title: "Campus Canvas: 48-Hour Live Mural Installation",
    photosCount: 52,
    date: "April 2025",
    category: "Fine Arts",
    coverTag: "Wall Artistry & Charcoal",
    society: "Nirmiti Arts",
  },
  {
    id: "sarasva-kavya",
    title: "Sarasva: Kavya Sandhya & Literary Salon",
    photosCount: 46,
    date: "February 2025",
    category: "Literature",
    coverTag: "Spoken Word & Ghazals",
    society: "Sarasva Society",
  },
];

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-ink selection:bg-stone-300">
      {/* Header */}
      <section className="border-b border-stone-300 bg-[#F4F1EA] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint mb-4">
            <Link href="/" className="hover:text-ink transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">MEDIA &amp; PHOTO ARCHIVE</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-mono text-xs uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>CURATED BY ACOUSTICS &amp; MEDIA SOCIETY (AMS)</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-ink">
              The Visual Ledger of IIIT Allahabad
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-ink-muted">
              High-resolution moments, dramatic stages, quiet rehearsals, and festival euphoria preserved across campus history.
            </p>
          </div>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <div
              key={album.id}
              className="group bg-[#FAF8F5] p-6 rounded-2xl border border-stone-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Photo Mount Frame */}
                <div className="w-full h-48 bg-stone-200/70 rounded-xl border border-stone-300/80 flex flex-col items-center justify-center p-4 text-center group-hover:bg-stone-300/60 transition-colors">
                  <ImageIcon className="w-8 h-8 text-stone-500 mb-2" />
                  <span className="font-mono text-xs uppercase tracking-wider text-stone-600 font-semibold">
                    {album.coverTag}
                  </span>
                  <span className="font-mono text-[10px] text-stone-400 mt-1">
                    {album.photosCount} HIGH-RES PLATES
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-ink-faint border-b border-stone-200 pb-2 mb-2">
                    <span className="uppercase tracking-wider">{album.category}</span>
                    <span>{album.date}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-stone-700 transition-colors">
                    {album.title}
                  </h3>
                  <p className="font-mono text-xs text-ink-muted mt-1">
                    Captured by {album.society}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-200 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-ink">
                <span>View Plates</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
