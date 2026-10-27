import Link from "next/link";
import { getAllSocieties } from "@/lib/societies";
import { initialFests } from "@/lib/seedData";
import { A24HeroPinned } from "@/components/hero/A24HeroPinned";
import {
  ArrowUpRight,
  Disc,
  Calendar,
  Camera,
  Music,
  Flame,
  Palette,
  Mic,
  Award,
  Users,
} from "lucide-react";

export default async function HomePage() {
  const societies = await getAllSocieties();
  const nextFest = initialFests.find((f) => f.isCurrentOrNext) || initialFests[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-ink selection:bg-stone-300">
      {/* 1. Hero Pinned Physical 3D Crate Showcase */}
      <A24HeroPinned societies={societies} />

      {/* 2. Chapter 01: Prologue / About the Council & College */}
      <section
        id="about-section"
        className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="border-b border-stone-300 pb-4 mb-16 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-faint">
          <span>CHAPTER 01 // PROLOGUE</span>
          <span>CAMPUS MANDATE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Bold Editorial Headline */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.02]">
              Where technical precision yields to{" "}
              <span className="italic font-normal text-stone-600">unfiltered artistic fervor</span>.
            </h2>

            <p className="font-serif italic text-xl sm:text-2xl text-ink/80 leading-relaxed pl-6 border-l-2 border-stone-400">
              &ldquo;An institute of national eminence is shaped not only by its computing
              architectures, but by the dramas staged in the dust, the midnight guitars, and the
              words written under campus streetlamps.&rdquo;
            </p>

            <div className="space-y-5 text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl">
              <p>
                Founded in 1999 as an Institute of National Importance by the Government of India,
                IIIT Allahabad has cultivated global leaders in science and computational research.
                Yet alongside terminal lines and algorithms beats our cultural council—a union of
                six autonomous artistic wings.
              </p>
              <p>
                Every script is written by students; every film is graded in campus labs; every
                stage set is hammered into existence by young creators. We exist to ensure that
                no voice remains silent and no creative spark goes unignited.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Ledger Box */}
          <div className="lg:col-span-5 bg-[#F4F1EA] p-8 sm:p-12 rounded-2xl border border-stone-300 space-y-8 shadow-soft">
            <div className="flex items-center justify-between border-b border-stone-300/80 pb-3 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
              <span>COUNCIL LEDGER</span>
              <span>1999 — 2026</span>
            </div>

            <div className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-stone-300/60 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Guilds Unified
                </span>
                <span className="font-serif text-3xl font-bold text-ink">06</span>
              </div>

              <div className="flex items-baseline justify-between border-b border-stone-300/60 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Annual Productions
                </span>
                <span className="font-serif text-3xl font-bold text-ink">50+</span>
              </div>

              <div className="flex items-baseline justify-between border-b border-stone-300/60 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Festival Attendance
                </span>
                <span className="font-serif text-3xl font-bold text-ink">10,000+</span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Affiliation
                </span>
                <span className="font-mono text-xs uppercase text-ink font-semibold">
                  IIIT Allahabad
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-300/80">
              <Link
                href="/societies"
                className="group flex items-center justify-between text-xs font-mono uppercase tracking-widest text-ink hover:text-stone-600 transition-colors"
              >
                <span>Read the Complete Guild Register</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Chapter 02: The Disciplines (Cultural Activities) */}
      <section className="bg-[#F4F1EA] py-24 sm:py-36 px-4 sm:px-6 lg:px-8 border-y border-stone-300">
        <div className="max-w-7xl mx-auto w-full">
          <div className="border-b border-stone-300 pb-4 mb-16 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-faint">
            <span>CHAPTER 02 // THE DISCIPLINES</span>
            <span>SIX CREATIVE WINGS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                slug: "ams",
                discipline: "Photography & Cinematography",
                description:
                  "From 35mm analogue nostalgia to 4K cinematic festival docuseries. AMS preserves campus memory through masterclass optics.",
                society: "AMS Guild",
                color: "#D97706",
              },
              {
                num: "02",
                slug: "geneticx",
                discipline: "Contemporary & Street Choreography",
                description:
                  "Kinetic electricity, popping, break battles, and lyrical fusion on national stages across northern India.",
                society: "Geneticx Crew",
                color: "#E11D48",
              },
              {
                num: "03",
                slug: "sarasva",
                discipline: "Literature, Parliamentary Debate & Verse",
                description:
                  "Publishing campus anthologies, philosophical salon debates, bilingual open-mics, and timeless poetry.",
                society: "Sarasva Society",
                color: "#4F46E5",
              },
              {
                num: "04",
                slug: "nirmiti",
                discipline: "Visual Arts, Murals & Scenography",
                description:
                  "Gigantic acrylic wall installations, fest stagecraft decor, charcoal portraiture, and vector design archives.",
                society: "Nirmiti Arts",
                color: "#EA580C",
              },
              {
                num: "05",
                slug: "rangtarangini",
                discipline: "Street Theatre & Proscenium Drama",
                description:
                  "Voice, grit, and hard-hitting Nukkad Nataks staging social truth before audiences of thousands.",
                society: "Rangtarangini Troupe",
                color: "#B91C1C",
              },
              {
                num: "06",
                slug: "virtuosi",
                discipline: "Live Band & Acoustic Performance",
                description:
                  "Electric rock anthems, Indian classical jugalbandis, starlit unplugged circles, and audio production.",
                society: "Virtuosi Collective",
                color: "#0D9488",
              },
            ].map((item) => (
              <Link
                key={item.num}
                href={`/societies/${item.slug}`}
                className="group relative bg-[#FAF8F5] p-8 rounded-xl border border-stone-300 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between h-80"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-ink-faint border-b border-stone-200 pb-3 mb-5">
                    <span>SECTOR [{item.num}]</span>
                    <span style={{ color: item.color }} className="font-semibold uppercase">
                      {item.society}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-stone-700 transition-colors leading-snug mb-3">
                    {item.discipline}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-ink pt-4 border-t border-stone-200">
                  <span>Open Dossier</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Chapter 03: Flagship Exhibition (Effervescence '26) */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="border-b border-stone-300 pb-4 mb-16 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-faint">
          <span>CHAPTER 03 // THE FESTIVALS</span>
          <span>FLAGSHIP CALENDAR</span>
        </div>

        {/* Cinematic Film-Poster Style Fest Banner */}
        <div className="relative rounded-2xl bg-ink text-canvas overflow-hidden p-8 sm:p-16 lg:p-20 shadow-soft-xl border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-amber-300 border-b border-amber-300/40 pb-2">
              <Disc className="w-4 h-4 animate-spin text-amber-300" style={{ animationDuration: "10s" }} />
              <span>NORTH INDIA&apos;S PREMIER CULTURAL EXTRAVAGANZA</span>
            </div>

            <div>
              <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-canvas leading-[0.95]">
                {nextFest.name}
              </h2>
              <p className="font-mono text-sm uppercase tracking-widest text-stone-400 mt-3">
                EDITION {nextFest.edition} // &ldquo;{nextFest.theme.toUpperCase()}&rdquo;
              </p>
            </div>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
              {nextFest.description}
            </p>

            {/* Bill / Schedule Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-stone-700/80 text-xs font-mono">
              {nextFest.highlights.map((h, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-stone-400 block">ACT [0{i + 1}]</span>
                  <span className="font-serif text-sm font-semibold text-canvas">{h}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Link
                href="/fests"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-canvas text-ink font-mono text-xs uppercase tracking-widest hover:bg-stone-100 transition-all shadow-soft"
              >
                <span>View Full Festival Program</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="/events"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-300 hover:text-canvas transition-colors"
              >
                <span>Browse Competitions →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Chapter 04: The Photographic Record (Flickr Gallery Archive) */}
      <section className="bg-[#F4F1EA] py-24 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-stone-300">
        <div className="max-w-7xl mx-auto w-full">
          <div className="border-b border-stone-300 pb-4 mb-16 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-faint">
            <span>CHAPTER 04 // THE PHOTOGRAPHIC RECORD</span>
            <span>FLICKR ARCHIVE</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink">
                Visual Artifacts & Moments
              </h2>
              <p className="text-ink-muted text-sm sm:text-base mt-2">
                Curated high-definition records captured by student photojournalists.
              </p>
            </div>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink hover:text-stone-600 transition-colors mt-4 md:mt-0"
            >
              <span>Explore All Albums</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Exhibition Photo Mount Style Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Effervescence Pro-Nights",
                sub: "Live Concert Record",
                count: "120 PLATES",
                year: "2025",
              },
              {
                title: "Footloose Dance Arena",
                sub: "Choreography Finals",
                count: "84 PLATES",
                year: "2025",
              },
              {
                title: "Nukkad Natak Street Drama",
                sub: "Amphitheatre Sessions",
                count: "96 PLATES",
                year: "2024",
              },
              {
                title: "Incandescence Band Clash",
                sub: "Rock Ensemble",
                count: "112 PLATES",
                year: "2024",
              },
            ].map((album, idx) => (
              <Link
                key={idx}
                href="/gallery"
                className="group bg-[#FAF8F5] p-5 rounded-lg border border-stone-300 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between h-72"
              >
                <div className="w-full h-32 bg-stone-200/60 rounded border border-stone-300/80 flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-stone-500 group-hover:bg-stone-300/50 transition-colors">
                  <span>PHOTO ARCHIVE [{album.year}]</span>
                </div>

                <div className="pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint block">
                    {album.count} • {album.sub}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-ink group-hover:text-stone-700 transition-colors mt-1">
                    {album.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-ink pt-2 border-t border-stone-200">
                  <span>Inspect</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
