import Link from "next/link";
import { getAllSocieties } from "@/lib/societies";
import { initialFests, initialEvents, councilTeam } from "@/lib/seedData";
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
  ShieldCheck,
  Building2,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

export default async function HomePage() {
  const societies = await getAllSocieties();
  const nextFest = initialFests.find((f) => f.isCurrentOrNext) || initialFests[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-ink selection:bg-stone-300">
      {/* 0. Main Landing Title: Cultural Council, IIIT Allahabad */}
      <section
        id="hero-title"
        className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-300 overflow-hidden bg-[#FAF8F5]"
      >
        {/* Subtle decorative background watermark */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#1C1917 1.5px, transparent 1.5px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Top Ledger Ribbon */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-300 pb-5 font-mono text-xs uppercase tracking-widest text-ink-faint">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            <span className="font-semibold text-ink">INSTITUTE OF NATIONAL IMPORTANCE</span>
            <span>//</span>
            <span>ESTD. 1999</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>DEVGHAT, JHALWA, PRAYAGRAJ</span>
            <span>•</span>
            <span className="text-amber-800 font-bold">APEX ARTS &amp; CULTURE BODY</span>
          </div>
        </div>

        {/* Massive Center Title & Monogram */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 sm:py-20 flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4F1EA] border border-stone-300 font-mono text-xs uppercase tracking-widest text-ink shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>OFFICIAL CULTURAL PORTAL</span>
          </div>

          <div className="space-y-3">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-ink uppercase leading-[0.92]">
              CULTURAL COUNCIL
            </h1>
            <p className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-stone-700 tracking-tight">
              IIIT Allahabad
            </p>
          </div>

          <p className="max-w-2xl font-serif text-base sm:text-xl text-ink-muted leading-relaxed pt-2">
            The statutory student-faculty body governing music, choreography, theatrics, literature, fine arts, and media storytelling across the campus community.
          </p>

          {/* Six Autonomous Societies Pill Row */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs">
            {[
              { name: "AMS", category: "Photography & Film", color: "#D97706" },
              { name: "GENETICX", category: "Dance Crew", color: "#E11D48" },
              { name: "SARASVA", category: "Literature & Debate", color: "#4F46E5" },
              { name: "NIRMITI", category: "Fine Arts & Design", color: "#EA580C" },
              { name: "RANGTARANGINI", category: "Dramatics & Street Play", color: "#B91C1C" },
              { name: "VIRTUOSI", category: "Music & Live Band", color: "#0D9488" },
            ].map((soc) => (
              <span
                key={soc.name}
                className="px-3.5 py-1.5 rounded-lg bg-[#F4F1EA] border border-stone-300 text-ink-muted font-medium hover:border-ink hover:text-ink transition-all shadow-sm"
              >
                <strong style={{ color: soc.color }}>{soc.name}</strong> • {soc.category}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Scroll Prompt Bar to Enter 3D Showcase & Societies Ladder */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ink" />
            <span>SCROLL DOWN TO REVOLVE THE 3D SOCIETIES LADDER</span>
          </div>

          <a
            href="#societies-stage"
            className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-ink text-canvas hover:bg-stone-800 transition-all font-semibold shadow-soft"
          >
            <span>SCROLL TO SOCIETIES LADDER</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:translate-y-0.5 transition-transform" />
          </a>

          <div className="hidden sm:block text-[11px] text-ink-faint">
            DISC SHOWCASE // 06 SOCIETIES
          </div>
        </div>
      </section>

      {/* 1. Hero Pinned Physical 3D Crate Showcase */}
      <A24HeroPinned societies={societies} />

      {/* 2. Chapter 01: Prologue / About the Council & College */}
      <section
        id="about-section"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="border-b border-stone-300 pb-4 mb-16 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-faint">
          <span>CHAPTER 01 // PROLOGUE</span>
          <span>CAMPUS MANDATE &amp; GOVERNANCE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Bold Editorial Headline & Council Overview */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-mono text-xs uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>OFFICIAL CULTURAL COUNCIL • IIIT ALLAHABAD</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.02]">
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
                Yet alongside terminal lines and algorithms beats our cultural council—the statutory apex
                student-faculty body coordinating performing arts, dramatics, media storytelling, fine arts, and literary inquiry.
              </p>
              <p>
                Working under the office of the <strong>Dean of Student Affairs (DoSA)</strong>, the Cultural Council
                unites six autonomous student wings, manages campus cultural auditoriums (including the 1,000-seat Main Audi and 3,500-capacity Open Air Theatre),
                and hosts North India&apos;s largest collegiate cultural festival, <em>Effervescence</em>.
              </p>
            </div>

            {/* Quick Council Jump Links */}
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-canvas rounded font-mono text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors"
              >
                <span>Read Full Council Charter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/about#team"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F4F1EA] text-ink border border-stone-300 rounded font-mono text-xs uppercase tracking-widest hover:bg-stone-200 transition-colors"
              >
                <span>Council Office Bearers</span>
                <Users className="w-3.5 h-3.5" />
              </Link>
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
                <span className="font-serif text-3xl font-bold text-ink">75+</span>
              </div>

              <div className="flex items-baseline justify-between border-b border-stone-300/60 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Festival Attendance
                </span>
                <span className="font-serif text-3xl font-bold text-ink">15,000+</span>
              </div>

              <div className="flex items-baseline justify-between border-b border-stone-300/60 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Active Student Performers
                </span>
                <span className="font-serif text-3xl font-bold text-ink">320+</span>
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

        {/* 4 Pillars of Cultural Council */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-16 border-t border-stone-300">
          <div className="p-6 bg-[#FAF8F5] rounded-xl border border-stone-300 space-y-2">
            <div className="w-8 h-8 rounded bg-amber-100 text-amber-900 flex items-center justify-center font-mono text-xs font-bold">
              01
            </div>
            <h3 className="font-serif text-xl font-bold text-ink">6 Autonomous Guilds</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Specialized societies covering photography, western dance, Hindi &amp; English literature, fine arts, street theater, and rock &amp; classical music.
            </p>
          </div>

          <div className="p-6 bg-[#FAF8F5] rounded-xl border border-stone-300 space-y-2">
            <div className="w-8 h-8 rounded bg-rose-100 text-rose-900 flex items-center justify-center font-mono text-xs font-bold">
              02
            </div>
            <h3 className="font-serif text-xl font-bold text-ink">Effervescence Fest</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Organizing North India&apos;s celebrated annual cultural festival with 15,000+ footfall, multi-genre pro-nights, and nationwide college battles.
            </p>
          </div>

          <div className="p-6 bg-[#FAF8F5] rounded-xl border border-stone-300 space-y-2">
            <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-900 flex items-center justify-center font-mono text-xs font-bold">
              03
            </div>
            <h3 className="font-serif text-xl font-bold text-ink">World-Class Venues</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Administering institute cultural spaces including the 1,000-seat Main Audi, 3,500-capacity Open Air Theatre (OAT), and SAC production labs.
            </p>
          </div>

          <div className="p-6 bg-[#FAF8F5] rounded-xl border border-stone-300 space-y-2">
            <div className="w-8 h-8 rounded bg-teal-100 text-teal-900 flex items-center justify-center font-mono text-xs font-bold">
              04
            </div>
            <h3 className="font-serif text-xl font-bold text-ink">National Accolades</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Leading campus delegations with frequent podium honors at IIT Bombay Mood Indigo, IIT Kanpur Antaragni, and IIT BHU Kashiyatra.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Chapter 02: The Disciplines (Cultural Activities) */}
      <section className="bg-[#F4F1EA] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-y border-stone-300">
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
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
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

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/fests"
                className="px-6 py-3.5 bg-canvas text-ink font-mono text-xs uppercase tracking-widest font-bold hover:bg-stone-200 transition-colors rounded"
              >
                Explore Festival Dossier
              </Link>
              <Link
                href="/events"
                className="px-6 py-3.5 border border-stone-600 text-canvas font-mono text-xs uppercase tracking-widest hover:border-canvas transition-colors rounded"
              >
                View Complete Event Ledger
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Chapter 04: Upcoming Cultural Productions */}
      <section className="bg-[#F4F1EA] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-stone-300">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-ink-faint mb-2">
                CHAPTER 04 // UPCOMING CALENDAR
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ink">
                Live Campus Productions &amp; Acts
              </h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink hover:text-stone-600 font-semibold mt-4 md:mt-0"
            >
              <span>View Full Schedule &rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initialEvents.slice(0, 3).map((evt) => (
              <div
                key={evt.id}
                className="bg-[#FAF8F5] p-6 rounded-xl border border-stone-300 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold text-[10px] uppercase">
                      {evt.category}
                    </span>
                    <span className="text-ink-faint text-[10px]">{evt.status.toUpperCase()}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ink leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
                    {evt.description}
                  </p>
                  <div className="pt-2 font-mono text-xs text-stone-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-ink-muted" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-ink-muted" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200">
                  <Link
                    href={`/societies/${evt.societySlug}`}
                    className="font-mono text-xs uppercase tracking-wider text-ink font-semibold flex items-center justify-between hover:text-stone-600"
                  >
                    <span>{evt.societyName.split(" ")[0]} Wing</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Chapter 05: Visual Archives & Gallery Preview */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="border-b border-stone-300 pb-4 mb-16 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-faint">
          <span>CHAPTER 05 // VISUAL REPOSITORIES</span>
          <span>CAMPUS ARCHIVES</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink">
              Visual Artifacts &amp; Moments
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
      </section>

      {/* 7. Inductions / Join the Council Banner */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-ink text-canvas rounded-2xl p-8 sm:p-14 border border-stone-800 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-amber-300 font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>COLLEGE AUDITIONS &amp; TALENT RECRUITMENT</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Join the Cultural Council
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Are you passionate about music, acting, dance, literature, photography, or fine arts? Auditions open every semester across all 6 student societies. No prior professional experience required—just raw creative passion.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/about#join"
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-ink font-mono text-xs uppercase tracking-widest font-bold transition-all text-center rounded"
            >
              Audition Guidelines
            </Link>
            <Link
              href="/societies"
              className="px-6 py-3.5 border border-stone-500 hover:border-canvas text-canvas font-mono text-xs uppercase tracking-widest transition-all text-center rounded"
            >
              Explore 6 Wings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
