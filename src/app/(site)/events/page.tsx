import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, Sparkles, ArrowRight, Filter } from "lucide-react";
import { initialEvents, initialSocieties } from "@/lib/seedData";

export const metadata = {
  title: "Events & Production Ledger | Cultural Council IIIT Allahabad",
  description:
    "Official schedule and calendar of cultural productions, auditions, concerts, open-mics, and theatrical plays at IIIT Allahabad.",
};

export default function EventsPage() {
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
            <span className="text-ink font-semibold">EVENTS &amp; PRODUCTIONS</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-ink">
              Cultural Council Production Ledger
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-ink-muted">
              Live acoustic evenings, high-octane street battles, proscenium theatre, poetry salons, and photography masterclasses across the campus calendar.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-300 pb-4 font-mono text-xs uppercase tracking-widest text-ink-faint">
            <span>UPCOMING CALENDAR 2026</span>
            <span>CAMPUS VENUES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-stone-300 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3 font-mono text-xs">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold text-[10px] uppercase">
                      {evt.category}
                    </span>
                    <span className="text-ink-faint text-[11px]">
                      {evt.status.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-ink leading-snug">
                      {evt.title}
                    </h3>
                    <Link
                      href={`/societies/${evt.societySlug}`}
                      className="font-mono text-xs text-amber-800 hover:underline block mt-1 uppercase tracking-wider"
                    >
                      {evt.societyName}
                    </Link>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="pt-2 space-y-1.5 font-mono text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-ink-muted" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-ink-muted" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-ink-muted" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-ink-faint">Open to all students</span>
                  <Link
                    href={`/societies/${evt.societySlug}`}
                    className="font-mono text-xs uppercase tracking-wider text-ink font-semibold flex items-center gap-1 hover:text-stone-600"
                  >
                    <span>Society Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
