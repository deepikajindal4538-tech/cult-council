import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSocieties, getSocietyBySlug, getEventsBySocietySlug } from "@/lib/societies";
import { ArrowLeft, ArrowUpRight, Calendar, Users, Award, Mail, Instagram, Youtube } from "lucide-react";
import { Society3DVectorObject } from "@/components/hero/Society3DVectorObject";

export async function generateStaticParams() {
  const societies = await getAllSocieties();
  return societies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const society = await getSocietyBySlug(params.slug);
  if (!society) return { title: "Society Not Found | Cultural Council" };

  return {
    title: `${society.name} (${society.slug.toUpperCase()}) | Cultural Council IIIT Allahabad`,
    description: society.description,
  };
}

export default async function SocietyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const society = await getSocietyBySlug(params.slug);
  if (!society) {
    notFound();
  }

  const allSocieties = await getAllSocieties();
  const currentIndex = allSocieties.findIndex((s) => s.slug === society.slug);
  const nextSociety = allSocieties[(currentIndex + 1) % allSocieties.length];
  const prevSociety = allSocieties[(currentIndex - 1 + allSocieties.length) % allSocieties.length];

  const societyEvents = await getEventsBySocietySlug(society.slug);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-ink pb-32">
      {/* 1. Dossier Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between border-b border-stone-300 pb-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
          <Link
            href="/societies"
            className="inline-flex items-center gap-2 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO GUILD REGISTER</span>
          </Link>
          <span>DOSSIER // {society.slug.toUpperCase()}</span>
        </div>
      </div>

      {/* 2. Full Stage Society Exhibition Hero */}
      <section
        className="mt-6 border-y border-stone-300 transition-colors duration-500 py-16 sm:py-24"
        style={{
          backgroundColor: society.washColor ? society.washColor : "#F4F1EA",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Metadata Ledger & Headline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-ink-muted border-b border-stone-300 pb-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: society.accentColor }}
                />
                <span>DISCIPLINE // {society.category}</span>
                <span>•</span>
                <span>EST. {society.stats?.foundedYear || 2004}</span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[0.98]">
                {society.name}
              </h1>

              <blockquote className="font-serif italic text-2xl sm:text-3xl text-ink/90 leading-snug pl-6 border-l-2 border-stone-400">
                &ldquo;{society.tagline}&rdquo;
              </blockquote>

              <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl">
                {society.description}
              </p>

              {/* Roster & Stats Snapshot */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-300/80 font-mono text-xs">
                <div>
                  <span className="text-[10px] uppercase text-ink-faint block">
                    Guild Head
                  </span>
                  <span className="font-serif text-base font-bold text-ink">
                    {society.leads?.[0]?.name || "Student Head"}
                  </span>
                  <span className="text-[11px] text-ink-muted block">
                    {society.leads?.[0]?.role || "Head of Guild"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase text-ink-faint block">
                    Active Artists
                  </span>
                  <span className="font-serif text-base font-bold text-ink">
                    {society.stats?.membersCount || 40}+
                  </span>
                  <span className="text-[11px] text-ink-muted block">Enrolled Troupe</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase text-ink-faint block">
                    Annual Slate
                  </span>
                  <span className="font-serif text-base font-bold text-ink">
                    {society.stats?.eventsPerYear || 12}
                  </span>
                  <span className="text-[11px] text-ink-muted block">Productions / yr</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Vector Physical Artifact Showcase */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-[340px] sm:w-[440px] md:w-[480px] h-[340px] sm:h-[440px] md:h-[480px] relative flex items-center justify-center">
                <Society3DVectorObject
                  society={society}
                  isActive={true}
                  progress={1}
                  isReducedMotion={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed Dossier Breakdown & Leadership Roster */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Artistic Manifesto & Mandate */}
          <div className="lg:col-span-7 space-y-8">
            <div className="border-b border-stone-300 pb-3 font-mono text-xs uppercase tracking-widest text-ink-faint">
              <span>SECTION 01 // ARTISTIC MANIFESTO</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
              Crafting Excellence in {society.category}
            </h2>

            <div className="space-y-5 text-sm sm:text-base text-ink-muted leading-relaxed">
              <p>
                At IIIT Allahabad, {society.name} serves as a catalyst for creative autonomy.
                Operating out of the Student Activity Center, the guild provides student creators
                with specialized production bays, audio acoustics, rehearsal floors, and institutional
                travel grants to compete on national collegiate stages.
              </p>
              <p>
                Whether organizing hands-on freshman bootcamps, midnight jam sessions, or flagship
                national tournaments during Effervescence, {society.name} maintains an unyielding
                commitment to artistic integrity and student-led stewardship.
              </p>
            </div>

            {/* Leadership & Technical Crew Table */}
            <div className="pt-6">
              <div className="border-b border-stone-300 pb-3 font-mono text-xs uppercase tracking-widest text-ink-faint mb-4">
                <span>COUNCIL ROSTER // CURRENT TENURE</span>
              </div>

              <div className="divide-y divide-stone-200 border-y border-stone-300 font-mono text-xs">
                {society.leads?.map((lead, i) => (
                  <div key={i} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-serif text-sm font-semibold text-ink block">
                        {lead.name}
                      </span>
                      <span className="text-[11px] text-ink-muted">{lead.role}</span>
                    </div>
                    <span className="text-[10px] uppercase text-ink-faint">EXECUTIVE APPOINTMENT</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Connect, Dispatch & Social Box */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border-b border-stone-300 pb-3 font-mono text-xs uppercase tracking-widest text-ink-faint">
              <span>SECTION 02 // DISPATCH & ARCHIVES</span>
            </div>

            <div className="bg-[#F4F1EA] p-8 rounded-2xl border border-stone-300 space-y-6 shadow-soft">
              <h3 className="font-serif text-2xl font-bold text-ink">
                Connect with {society.name}
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Auditions, recruitments, and collaborative production inquiries are administered directly through guild coordinates.
              </p>

              <div className="space-y-3 pt-2 font-mono text-xs">
                {society.socialLinks?.instagram && (
                  <a
                    href={society.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-stone-300 hover:border-ink transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Instagram className="w-4 h-4 text-ink-muted" />
                      <span>Instagram Dispatches</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}

                {society.socialLinks?.youtube && (
                  <a
                    href={society.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-stone-300 hover:border-ink transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Youtube className="w-4 h-4 text-ink-muted" />
                      <span>YouTube Broadcasts</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}

                <a
                  href={`mailto:culturalcouncil@iiita.ac.in?subject=${encodeURIComponent(
                    `Inquiry for ${society.name}`
                  )}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-stone-300 hover:border-ink transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-ink-muted" />
                    <span>Official Correspondence</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Society Productions & Events Ledger */}
      {societyEvents.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-300">
          <div className="border-b border-stone-300 pb-3 font-mono text-xs uppercase tracking-widest text-ink-faint mb-8 flex items-center justify-between">
            <span>SECTION 03 // GUILD PRODUCTION LEDGER</span>
            <span>{societyEvents.length} RECORDED PRODUCTIONS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {societyEvents.map((evt: any) => (
              <div
                key={evt.id || evt._id}
                className="bg-[#F4F1EA] p-6 rounded-xl border border-stone-300 space-y-4 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-ink-faint uppercase pb-2 border-b border-stone-200">
                    <span>{evt.category || "CULTURAL"}</span>
                    <span className="text-emerald-700 font-semibold uppercase">{evt.status || "UPCOMING"}</span>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-ink mt-3">
                    {evt.title}
                  </h4>

                  <p className="text-xs text-ink-muted leading-relaxed mt-2 line-clamp-3">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 text-xs font-mono text-ink-muted space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-ink-faint" />
                    <span>{evt.date} • {evt.time || "6:00 PM"}</span>
                  </div>
                  <div className="text-[11px] text-ink-faint">
                    Venue: {evt.venue || "Campus Auditorium"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Next & Previous Society Navigation Footer */}
      <section className="pt-16 border-t border-stone-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href={`/societies/${prevSociety.slug}`}
            className="group p-6 rounded-xl border border-stone-300 hover:border-ink transition-colors flex items-center justify-between bg-[#F4F1EA]"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint block">
                ← PREVIOUS GUILD
              </span>
              <span className="font-serif text-xl font-bold text-ink group-hover:text-stone-700">
                {prevSociety.name}
              </span>
            </div>
            <span className="font-mono text-xs uppercase text-ink-faint group-hover:text-ink">
              [{prevSociety.slug.toUpperCase()}]
            </span>
          </Link>

          <Link
            href={`/societies/${nextSociety.slug}`}
            className="group p-6 rounded-xl border border-stone-300 hover:border-ink transition-colors flex items-center justify-between bg-[#F4F1EA]"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint block">
                NEXT GUILD →
              </span>
              <span className="font-serif text-xl font-bold text-ink group-hover:text-stone-700">
                {nextSociety.name}
              </span>
            </div>
            <span className="font-mono text-xs uppercase text-ink-faint group-hover:text-ink">
              [{nextSociety.slug.toUpperCase()}]
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
