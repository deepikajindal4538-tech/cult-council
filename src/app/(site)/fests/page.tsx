import React from "react";
import Link from "next/link";
import { getAllFests, getAllSocieties } from "@/lib/societies";
import { Disc, Calendar, Users, Award, ArrowUpRight, Sparkles, MapPin } from "lucide-react";

export const metadata = {
  title: "Festivals & Pro-Nights | Cultural Council IIIT Allahabad",
  description:
    "Effervescence and Rangoli cultural fests hosted by IIIT Allahabad. Discover North India's premier annual cultural extravaganza.",
};

export default async function FestsPage() {
  const fests = await getAllFests();
  const flagshipFest = fests.find((f: any) => f.isCurrentOrNext) || fests[0];
  const otherFests = fests.filter((f: any) => f.name !== flagshipFest.name);
  const societies = await getAllSocieties();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-ink pb-32">
      {/* 1. Header */}
      <section className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-stone-300">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-faint mb-6">
          <span>FLAGSHIP CALENDAR // ANNUAL FESTS</span>
          <span>CAMPUS EXTRAVAGANZA</span>
        </div>

        <div className="max-w-4xl space-y-6">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.02]">
            Festivals & <br />
            <span className="italic font-normal text-stone-600">Pro-Night Celebrations</span>
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-ink-muted leading-relaxed pl-6 border-l-2 border-stone-400">
            &ldquo;Three days of electric unbridled energy drawing thousands of students across India to celebrate music, theatre, and the arts.&rdquo;
          </p>
        </div>
      </section>

      {/* 2. Flagship Fest Showcase: Effervescence '26 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-ink text-canvas overflow-hidden p-8 sm:p-14 lg:p-20 shadow-soft-xl border border-stone-800">
          {/* Subtle Ambient Glows */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-rose-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-8">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-300/90 border-b border-amber-300/30 pb-2">
              NORTH INDIA&apos;S PREMIER CULTURAL EXTRAVAGANZA
            </div>

            <div>
              <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-canvas leading-[0.96]">
                {flagshipFest.name} &apos;{flagshipFest.edition}
              </h2>
              <p className="font-mono text-base uppercase tracking-widest text-amber-200/80 mt-3">
                THEME // &ldquo;{flagshipFest.theme.toUpperCase()}&rdquo;
              </p>
            </div>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              {flagshipFest.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-stone-700/80 font-mono text-xs">
              <div>
                <span className="text-stone-400 block uppercase">FEST DATES</span>
                <span className="font-serif text-base font-bold text-canvas">
                  {new Date(flagshipFest.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  –{" "}
                  {new Date(flagshipFest.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div>
                <span className="text-stone-400 block uppercase">FOOTFALL</span>
                <span className="font-serif text-base font-bold text-canvas">15,000+ Attendees</span>
              </div>

              <div>
                <span className="text-stone-400 block uppercase">LOCATION</span>
                <span className="font-serif text-base font-bold text-canvas">IIIT Allahabad Campus</span>
              </div>

              <div>
                <span className="text-stone-400 block uppercase">CAMPUSES</span>
                <span className="font-serif text-base font-bold text-canvas">120+ Delegations</span>
              </div>
            </div>

            {/* Headlining Pillars */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-300/90 block">
                HEADLINING EXTRAVAGANZAS
              </span>
              <div className="flex flex-wrap gap-3">
                {flagshipFest.highlights.map((h: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full bg-canvas/10 backdrop-blur-sm border border-canvas/15 text-xs font-mono text-canvas"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <Link
                href="/events"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-canvas text-ink font-mono text-xs uppercase tracking-widest hover:bg-stone-100 transition-all shadow-soft"
              >
                <span>View Full Fest Competitions</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Intra-College Celebration: Rangoli Fest */}
      {otherFests.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-300">
          <div className="border-b border-stone-300 pb-3 font-mono text-xs uppercase tracking-widest text-ink-faint mb-10 flex items-center justify-between">
            <span>INTRA-COLLEGIATE FEST // TRADITIONAL HERITAGE</span>
            <span>CAMPUS UNITY</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {otherFests.map((fest: any) => (
              <div
                key={fest.name}
                className="bg-[#F4F1EA] p-8 sm:p-12 rounded-2xl border border-stone-300 space-y-6 shadow-soft"
              >
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-faint border-b border-stone-300/80 pb-3">
                  <span>ANNUAL HERITAGE FEST</span>
                  <span>{fest.edition}</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
                  {fest.name} &apos;{fest.edition}
                </h3>

                <blockquote className="font-serif italic text-lg text-ink-muted leading-snug pl-4 border-l-2 border-stone-400">
                  &ldquo;{fest.theme}&rdquo;
                </blockquote>

                <p className="text-sm text-ink-muted leading-relaxed">
                  {fest.description}
                </p>

                <div className="pt-4 border-t border-stone-300/80 flex flex-wrap gap-2">
                  {fest.highlights.map((h: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-stone-300 text-xs font-mono text-ink-muted"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Host Societies Roster */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-300">
        <div className="border-b border-stone-300 pb-3 font-mono text-xs uppercase tracking-widest text-ink-faint mb-8 flex items-center justify-between">
          <span>HOSTED IN COORDINATION BY</span>
          <span>ALL SIX AUTONOMOUS GUILDS</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-mono text-xs uppercase tracking-wider text-center">
          {societies.map((soc) => (
            <Link
              key={soc.slug}
              href={`/societies/${soc.slug}`}
              className="p-4 rounded-xl bg-[#F4F1EA] border border-stone-300 hover:border-ink transition-colors flex flex-col items-center justify-center gap-1 group"
            >
              <span
                className="w-2 h-2 rounded-full mb-1"
                style={{ backgroundColor: soc.accentColor }}
              />
              <span className="font-bold text-ink group-hover:text-stone-700">
                {soc.slug.toUpperCase()}
              </span>
              <span className="text-[9px] text-ink-faint truncate w-full">
                {soc.category}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
