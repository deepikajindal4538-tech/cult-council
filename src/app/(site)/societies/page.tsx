import React from "react";
import Link from "next/link";
import { getAllSocieties } from "@/lib/societies";
import { ArrowUpRight, Users, Calendar, Award } from "lucide-react";
import { Society3DVectorObject } from "@/components/hero/Society3DVectorObject";

export const metadata = {
  title: "Cultural Societies Register | Cultural Council IIIT Allahabad",
  description:
    "Explore the six autonomous student guilds under the Cultural Council: AMS, Geneticx, Sarasva, Nirmiti, Rangtarangini, and Virtuosi.",
};

export default async function SocietiesPage() {
  const societies = await getAllSocieties();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-ink pb-28">
      {/* 1. Archival Register Header */}
      <section className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-stone-300">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-faint mb-6">
          <span>DIRECTORY // 06 GUILDS</span>
          <span>EST. 1999 — 2026</span>
        </div>

        <div className="max-w-4xl space-y-6">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.02]">
            The Six Pillars of <br />
            <span className="italic font-normal text-stone-600">Student Expression</span>
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-ink-muted leading-relaxed pl-6 border-l-2 border-stone-400">
            &ldquo;From quiet darkrooms and acoustic chambers to open-air amphitheatre battles,
            each society operates as a dedicated home for artistic exploration.&rdquo;
          </p>

          <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl">
            Under the umbrella of the IIIT Allahabad Cultural Council, these six guilds
            empower student artists, directors, choreographers, and writers to produce over 50
            performances and exhibitions annually.
          </p>
        </div>
      </section>

      {/* 2. Societies Grid Dossier Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {societies.map((society, idx) => (
            <div
              key={society.slug}
              className="group relative bg-[#F4F1EA] rounded-2xl border border-stone-300/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Hairline Header */}
              <div className="p-8 sm:p-10 pb-4 border-b border-stone-300/80 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-muted">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: society.accentColor }}
                  />
                  <span className="font-bold text-ink">
                    [{String(idx + 1).padStart(2, "0")} / 06]
                  </span>
                </div>
                <span className="font-medium text-ink">
                  {society.category}
                </span>
              </div>

              {/* Central 3D Vector Visual Showcase & Title */}
              <div className="p-8 sm:p-10 py-6 space-y-6">
                {/* 3D Visual Object Miniature */}
                <div className="w-full h-52 sm:h-64 relative flex items-center justify-center overflow-hidden pointer-events-none">
                  <div className="scale-75 sm:scale-90 transition-transform duration-500 group-hover:scale-100">
                    <Society3DVectorObject
                      society={society}
                      isActive={true}
                      progress={1}
                      isReducedMotion={true}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink group-hover:text-stone-700 transition-colors">
                    {society.name}
                  </h2>
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-faint mt-1">
                    CC // {society.slug.toUpperCase()} • EST. {society.stats?.foundedYear || 2004}
                  </p>
                </div>

                <blockquote className="font-serif italic text-base sm:text-lg text-ink/90 leading-snug pl-4 border-l-2 border-stone-400">
                  &ldquo;{society.tagline}&rdquo;
                </blockquote>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3">
                  {society.description}
                </p>

                {/* Ledger Credits Row */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-300/70 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-ink-faint uppercase block">Leadership</span>
                    <span className="font-serif text-sm font-semibold text-ink">
                      {society.leads?.[0]?.name || "Student Head"}
                    </span>
                    <span className="block text-[11px] text-ink-muted">
                      {society.leads?.[0]?.role || "Society Head"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-ink-faint uppercase block">Guild Strength</span>
                    <span className="font-serif text-sm font-semibold text-ink">
                      {society.stats?.membersCount || 40}+ Artists
                    </span>
                    <span className="block text-[11px] text-ink-muted">
                      {society.stats?.eventsPerYear || 12} Annual Shows
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-8 sm:p-10 pt-4 border-t border-stone-300/80 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
                <span className="text-ink-faint">DOSSIER FILE #{society.slug.toUpperCase()}</span>
                <Link
                  href={`/societies/${society.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-canvas hover:bg-stone-800 transition-all shadow-sm group-hover:shadow-md"
                >
                  <span>Explore Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
