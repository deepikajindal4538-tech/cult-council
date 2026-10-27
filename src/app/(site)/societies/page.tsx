import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Users, Calendar, Award } from "lucide-react";
import { getAllSocieties } from "@/lib/societies";

export const metadata = {
  title: "Societies & Guilds | Cultural Council IIIT Allahabad",
  description:
    "Explore the six autonomous student societies of IIIT Allahabad: AMS, Geneticx, Sarasva, Nirmiti, Rangtarangini, and Virtuosi.",
};

export default async function SocietiesPage() {
  const societies = await getAllSocieties();

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
            <span className="text-ink font-semibold">AUTONOMOUS GUILDS</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-ink">
              The Six Societies of Cultural Council
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-ink-muted">
              Six autonomous creative wings powering music, dramatics, choreography, visual fine arts, media storytelling, and literary arts at IIIT Allahabad.
            </p>
          </div>
        </div>
      </section>

      {/* Societies Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {societies.map((soc) => (
            <div
              key={soc.slug}
              className="group bg-[#FAF8F5] p-8 sm:p-10 rounded-2xl border border-stone-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              style={{
                borderTopColor: soc.accentColor,
                borderTopWidth: "4px",
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3 font-mono text-xs">
                  <span className="font-bold uppercase tracking-wider" style={{ color: soc.accentColor }}>
                    {soc.category}
                  </span>
                  <span className="text-ink-faint uppercase">
                    ESTD. {soc.stats?.foundedYear || 2004}
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink group-hover:text-stone-700 transition-colors">
                    {soc.name}
                  </h2>
                  <p className="font-serif italic text-base text-stone-600 mt-1">
                    &ldquo;{soc.tagline}&rdquo;
                  </p>
                </div>

                <p className="text-sm text-ink-muted leading-relaxed">
                  {soc.description}
                </p>

                {/* Key Stats Bar */}
                <div className="grid grid-cols-3 gap-2 py-3 bg-[#F4F1EA] rounded-lg border border-stone-200/80 px-4 text-center font-mono">
                  <div>
                    <span className="block text-base font-serif font-bold text-ink">
                      {soc.stats?.membersCount || 40}+
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-ink-faint">Members</span>
                  </div>
                  <div>
                    <span className="block text-base font-serif font-bold text-ink">
                      {soc.stats?.eventsPerYear || 12}+
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-ink-faint">Annual Acts</span>
                  </div>
                  <div>
                    <span className="block text-base font-serif font-bold text-ink">
                      {soc.leads?.[0]?.name?.split(" ")[0] || "Head"}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-ink-faint">Lead</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-200 flex items-center justify-between">
                <div className="text-xs font-mono text-ink-muted">
                  Directed by: <span className="font-medium text-ink">{soc.leads?.[0]?.name}</span>
                </div>

                <Link
                  href={`/societies/${soc.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink hover:text-stone-600 font-bold group-hover:translate-x-1 transition-transform"
                >
                  <span>Enter Wing Dossier</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
