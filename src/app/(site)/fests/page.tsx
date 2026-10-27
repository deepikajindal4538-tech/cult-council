import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, Award, Disc, ArrowRight, MapPin, Users } from "lucide-react";
import { initialFests } from "@/lib/seedData";

export const metadata = {
  title: "Cultural Festivals | Cultural Council IIIT Allahabad",
  description:
    "Effervescence and Rangoli — the marquee annual cultural festivals organized by the Cultural Council of IIIT Allahabad.",
};

export default function FestsPage() {
  const effervescence = initialFests.find((f) => f.name.toLowerCase().includes("effervescence")) || initialFests[0];
  const rangoli = initialFests.find((f) => f.name.toLowerCase().includes("rangoli")) || initialFests[1];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-ink selection:bg-stone-300">
      {/* 1. Header */}
      <section className="border-b border-stone-300 bg-[#F4F1EA] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint mb-4">
            <Link href="/" className="hover:text-ink transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">MARQUEE FESTIVALS</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-ink">
              The Flagship Festivals
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-ink-muted">
              Spectacles of national collegiate caliber hosted annually on the sprawling Prayagraj campus of IIIT Allahabad.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Flagship: Effervescence '26 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-ink text-canvas rounded-3xl p-8 sm:p-14 lg:p-16 border border-stone-800 shadow-xl space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
            <div className="inline-flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>NORTH INDIA&apos;S BIGGEST CULTURAL EXTRAVAGANZA</span>
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-stone-400">
              EDITION {effervescence.edition} // OCTOBER 2026
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight leading-[0.95] text-canvas">
                {effervescence.name}
              </h2>
              <p className="font-mono text-sm uppercase tracking-widest text-amber-300">
                THEME: &ldquo;{effervescence.theme.toUpperCase()}&rdquo;
              </p>
              <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                {effervescence.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-800">
                {effervescence.highlights.map((h, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-[10px] font-mono text-stone-400 uppercase block">ACT [0{i + 1}]</span>
                    <span className="font-serif text-sm font-semibold text-canvas">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-stone-900/80 p-6 rounded-2xl border border-stone-800 space-y-6">
              <div className="font-mono text-xs uppercase tracking-wider text-amber-400 border-b border-stone-800 pb-3">
                FESTIVAL LEDGER
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Footfall:</span>
                  <span className="text-canvas font-bold">15,000+ Students</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Participating Colleges:</span>
                  <span className="text-canvas font-bold">85+ Institutes</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Prize Pool:</span>
                  <span className="text-amber-400 font-bold">INR 10,00,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Main Stages:</span>
                  <span className="text-canvas">OAT &amp; Main Audi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Intra-College Festival: Rangoli */}
      {rangoli && (
        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="bg-[#F4F1EA] rounded-3xl p-8 sm:p-12 border border-stone-300 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-300 pb-4">
              <div className="inline-flex items-center gap-2 text-stone-600 font-mono text-xs uppercase tracking-widest">
                <span>INTRA-COLLEGE HERITAGE FESTIVAL</span>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                ANNUAL SPRING EDITION
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <h3 className="font-serif text-3xl sm:text-5xl font-bold text-ink">
                  {rangoli.name}
                </h3>
                <p className="font-mono text-xs uppercase tracking-widest text-amber-800">
                  THEME: &ldquo;{rangoli.theme.toUpperCase()}&rdquo;
                </p>
                <p className="text-ink-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                  {rangoli.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-300">
                  {rangoli.highlights.map((h, i) => (
                    <div key={i} className="space-y-1">
                      <span className="text-[10px] font-mono text-ink-faint uppercase block">EVENT [0{i + 1}]</span>
                      <span className="font-serif text-sm font-semibold text-ink">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#FAF8F5] p-6 rounded-2xl border border-stone-300 space-y-4 text-xs font-mono">
                <div className="font-bold uppercase tracking-wider text-ink border-b border-stone-200 pb-2">
                  Inter-Batch Championship
                </div>
                <p className="text-ink-muted text-xs leading-relaxed font-sans">
                  Batches compete across dance relays, street music, rangoli artwork, antakshari, and runway drama for the coveted Cultural Rolling Trophy.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
