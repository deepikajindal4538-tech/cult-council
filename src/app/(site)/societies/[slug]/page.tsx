import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSocietyBySlug, getAllSocieties } from "@/lib/societies";
import {
  ArrowLeft,
  Users,
  Calendar,
  Sparkles,
  Instagram,
  Youtube,
  Award,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

interface SocietyPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const societies = await getAllSocieties();
  return societies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: SocietyPageProps) {
  const society = await getSocietyBySlug(params.slug);
  if (!society) return { title: "Society Not Found | Cultural Council" };

  return {
    title: `${society.name} | Cultural Council IIIT Allahabad`,
    description: society.description,
  };
}

export default async function IndividualSocietyPage({ params }: SocietyPageProps) {
  const society = await getSocietyBySlug(params.slug);

  if (!society) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-ink selection:bg-stone-300">
      {/* 1. Header Banner */}
      <section
        className="border-b border-stone-300 pt-20 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500"
        style={{ backgroundColor: society.washColor || "#F4F1EA" }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint mb-6">
            <Link href="/" className="hover:text-ink transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/societies" className="hover:text-ink transition-colors">
              SOCIETIES
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">{society.slug.toUpperCase()}</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold"
              style={{
                backgroundColor: `${society.accentColor}20`,
                color: society.accentColor,
              }}
            >
              <span>{society.category}</span>
              <span>•</span>
              <span>ESTD. {society.stats?.foundedYear || 2004}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink">
              {society.name}
            </h1>

            <p className="font-serif italic text-2xl sm:text-3xl text-ink-muted">
              &ldquo;{society.tagline}&rdquo;
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 mt-10 border-t border-stone-300/80">
            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-ink block">
                {society.stats?.membersCount || 45}+
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                Active Artists
              </span>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-ink block">
                {society.stats?.eventsPerYear || 14}+
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                Yearly Productions
              </span>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-ink block">
                {society.stats?.foundedYear || 2004}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                Founding Year
              </span>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-ink block">
                National
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                Competition Circuit
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dossier Body */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Description & Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-ink-faint mb-2">
                CREATIVE DISPATCH
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink mb-6">
                Artistic Craft &amp; Campus Legacy
              </h2>
              <div className="space-y-4 text-ink-muted text-base sm:text-lg leading-relaxed">
                <p>{society.description}</p>
                <p>
                  As an officially chartered society of the IIIT Allahabad Cultural Council, {society.name} maintains year-round workshops, regular performance sets, open auditions for freshmen, and heads the respective competitive tracks at <em>Effervescence</em>.
                </p>
                <p>
                  Members of the wing train rigorously in institute facilities, collaborate across disciplines, and represent IIITA at collegiate cultural festivals nationwide.
                </p>
              </div>
            </div>

            {/* Quote or Society Letter */}
            {society.objectConfig?.letterContent && (
              <div className="p-8 rounded-2xl bg-[#F4F1EA] border border-stone-300 font-serif italic text-lg text-ink-muted border-l-4" style={{ borderLeftColor: society.accentColor }}>
                &ldquo;{society.objectConfig.letterContent}&rdquo;
                <div className="font-mono text-xs uppercase tracking-wider text-ink-faint not-italic mt-3">
                  — Sarasva Literary Epilogue
                </div>
              </div>
            )}

            {/* Social & Contact */}
            <div className="pt-6 border-t border-stone-300 flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                Official Channels:
              </span>
              {society.socialLinks?.instagram && (
                <a
                  href={society.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F1EA] hover:bg-stone-200 border border-stone-300 rounded font-mono text-xs text-ink transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              )}
              {society.socialLinks?.youtube && (
                <a
                  href={society.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F1EA] hover:bg-stone-200 border border-stone-300 rounded font-mono text-xs text-ink transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>YouTube</span>
                </a>
              )}
            </div>
          </div>

          {/* Sidebar: Leadership & Info Card */}
          <div className="lg:col-span-5 bg-[#F4F1EA] p-8 sm:p-10 rounded-2xl border border-stone-300 space-y-6 shadow-sm">
            <div className="border-b border-stone-300 pb-3 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-ink-faint">
              <span>WING DIRECTORS</span>
              <span>2025–2026</span>
            </div>

            <div className="space-y-4">
              {society.leads?.map((lead: any, i: number) => (
                <div key={i} className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div>
                    <h4 className="font-serif font-bold text-lg text-ink">{lead.name}</h4>
                    <p className="font-mono text-xs text-ink-muted uppercase">{lead.role}</p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-stone-300 flex items-center justify-center font-mono text-xs font-bold text-ink">
                    {lead.name.charAt(0)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-ink-muted uppercase">Council Affiliation</span>
                <span className="text-ink font-semibold">IIIT Allahabad</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-ink-muted uppercase">Audition Window</span>
                <span className="text-amber-700 font-semibold">Autumn Semester (Annual)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted uppercase">HQ Venue</span>
                <span className="text-ink font-semibold">Student Activity Center</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about#join"
                className="w-full flex items-center justify-center gap-2 py-3 bg-ink text-canvas font-mono text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors rounded"
              >
                <span>Audition For This Wing</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
