import React from "react";
import Link from "next/link";
import { getAllEvents, getAllSocieties } from "@/lib/societies";
import { Calendar, MapPin, Clock, ArrowUpRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Events & Production Ledger | Cultural Council IIIT Allahabad",
  description:
    "Explore upcoming collegiate cultural competitions, street plays, acoustic jam nights, dance battles, and art exhibitions at IIIT Allahabad.",
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams?: { society?: string };
}) {
  const allEvents = await getAllEvents();
  const societies = await getAllSocieties();

  const selectedSociety = searchParams?.society;
  const filteredEvents = selectedSociety
    ? allEvents.filter((e: any) => (e.societySlug || e.society?.slug) === selectedSociety)
    : allEvents;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-ink pb-32">
      {/* 1. Page Header */}
      <section className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-stone-300">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-faint mb-6">
          <span>COUNCIL CALENDAR // LEDGER</span>
          <span>{allEvents.length} RECORDED PRODUCTIONS</span>
        </div>

        <div className="max-w-4xl space-y-6">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.02]">
            Annual Production <br />
            <span className="italic font-normal text-stone-600">Ledger & Calendar</span>
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-ink-muted leading-relaxed pl-6 border-l-2 border-stone-400">
            &ldquo;From twilight open-mics and acoustic lawns to amphitheatre street clashes and live graffiti marathons.&rdquo;
          </p>

          <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl">
            Every semester features a continuous series of open-entry student competitions,
            workshops, and festival showcases organized by the six societies.
          </p>
        </div>

        {/* 2. Society Filter Ticker */}
        <div className="flex flex-wrap items-center gap-2 pt-10 font-mono text-xs uppercase tracking-wider">
          <Link
            href="/events"
            className={`px-4 py-2 rounded-full border transition-all ${
              !selectedSociety
                ? "bg-ink text-canvas border-ink font-semibold shadow-sm"
                : "bg-[#F4F1EA] text-ink border-stone-300 hover:border-ink"
            }`}
          >
            All Guilds ({allEvents.length})
          </Link>

          {societies.map((soc) => {
            const count = allEvents.filter(
              (e: any) => (e.societySlug || e.society?.slug) === soc.slug
            ).length;
            const isSelected = selectedSociety === soc.slug;

            return (
              <Link
                key={soc.slug}
                href={`/events?society=${soc.slug}`}
                className={`px-4 py-2 rounded-full border transition-all ${
                  isSelected
                    ? "bg-ink text-canvas border-ink font-semibold shadow-sm"
                    : "bg-[#F4F1EA] text-ink border-stone-300 hover:border-ink"
                }`}
              >
                <span>{soc.slug.toUpperCase()}</span>
                <span className="ml-1.5 opacity-60">({count})</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Events Timeline Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt: any, i: number) => {
            const socSlug = evt.societySlug || evt.society?.slug;
            const matchingSociety = societies.find((s) => s.slug === socSlug);

            return (
              <div
                key={evt.id || evt._id || i}
                className="group relative bg-[#F4F1EA] rounded-2xl border border-stone-300 p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-ink-faint pb-3 border-b border-stone-300/80 mb-4">
                    <span className="font-bold text-ink">
                      ACT [{String(i + 1).padStart(2, "0")}]
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-full font-semibold"
                      style={{
                        backgroundColor: matchingSociety?.accentColor
                          ? `${matchingSociety.accentColor}18`
                          : "#1C191715",
                        color: matchingSociety?.accentColor || "#1C1917",
                      }}
                    >
                      {evt.societyName || socSlug?.toUpperCase() || "COUNCIL"}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-stone-700 transition-colors leading-tight mb-3">
                    {evt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3 mb-6">
                    {evt.description}
                  </p>
                </div>

                {/* Event Schedule Footer */}
                <div className="pt-4 border-t border-stone-300/80 space-y-2 font-mono text-xs text-ink-muted">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-ink-faint shrink-0" />
                    <span className="text-ink font-medium">{evt.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-ink-faint shrink-0" />
                    <span>{evt.time || "6:00 PM IST"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-ink-faint shrink-0" />
                    <span className="text-[11px] text-ink-muted truncate">
                      {evt.venue || "Main Auditorium"}
                    </span>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      OPEN ENTRY
                    </span>

                    {socSlug && (
                      <Link
                        href={`/societies/${socSlug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink hover:text-stone-600 transition-colors"
                      >
                        <span>Host Guild</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
