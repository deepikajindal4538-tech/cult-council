import Link from "next/link";
import { getAllSocieties } from "@/lib/societies";
import { initialFests, initialEvents, councilTeam } from "@/lib/seedData";
import { A24HeroPinned } from "@/components/hero/A24HeroPinned";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { CinematicAboutSection } from "@/components/home/CinematicAboutSection";
import RevolvingGalleryCarousel from "@/components/gallery/RevolvingGalleryCarousel";
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
      {/* 0. Sliding Hero Showcase with Cultural Council Title written on it */}
      <HeroSlider societies={societies} />

      {/* 1. Hero Pinned Physical 3D Crate Showcase with Societies Ladder */}
      <A24HeroPinned societies={societies} />

      {/* 2. Cinematic About Section: "Where Culture Finds Its Voice" // "Many Forms. One Spirit." */}
      <CinematicAboutSection />

      {/* 3. Chapter 02: Society Cards (The Disciplines - Editorial Cards with Hover Micro-Interactions) */}
      <section className="bg-[#F4F1EA] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-stone-300/80">
        <div className="max-w-7xl mx-auto w-full">
          <div className="border-b border-stone-300/80 pb-3 mb-12 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-faint">
            <span>CHAPTER 02 // THE DISCIPLINES</span>
            <span>SIX CREATIVE WINGS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                num: "01",
                slug: "ams",
                discipline: "Photography & Cinematography",
                tagline: "Freezing fleeting moments into timeless frames.",
                description:
                  "From 35mm analogue nostalgia to 4K cinematic festival docuseries. AMS preserves campus memory through masterclass optics.",
                society: "AMS Guild",
                color: "#D97706",
                members: "45+",
                founded: 2005,
              },
              {
                num: "02",
                slug: "geneticx",
                discipline: "Contemporary & Street Dance",
                tagline: "Syncing heartbeats to electrifying rhythm.",
                description:
                  "Kinetic electricity, popping, break battles, and lyrical fusion on national stages across northern India.",
                society: "Geneticx Crew",
                color: "#E11D48",
                members: "60+",
                founded: 2004,
              },
              {
                num: "03",
                slug: "sarasva",
                discipline: "Literature, Debate & Verse",
                tagline: "Where ink meets thought and words ignite revolutions.",
                description:
                  "Publishing campus anthologies, philosophical salon debates, bilingual open-mics, and timeless poetry.",
                society: "Sarasva Society",
                color: "#4F46E5",
                members: "40+",
                founded: 2003,
              },
              {
                num: "04",
                slug: "nirmiti",
                discipline: "Fine Arts, Murals & Scenography",
                tagline: "Transforming empty canvases into vibrant realities.",
                description:
                  "Gigantic acrylic wall installations, fest stagecraft decor, charcoal portraiture, and vector design archives.",
                society: "Nirmiti Arts",
                color: "#EA580C",
                members: "38+",
                founded: 2004,
              },
              {
                num: "05",
                slug: "rangtarangini",
                discipline: "Street Theatre & Proscenium Drama",
                tagline: "Living a thousand lives under the stage spotlight.",
                description:
                  "Voice, grit, and hard-hitting Nukkad Nataks staging social truth before audiences of thousands.",
                society: "Rangtarangini Troupe",
                color: "#B91C1C",
                members: "52+",
                founded: 2003,
              },
              {
                num: "06",
                slug: "virtuosi",
                discipline: "Live Band & Acoustic Performance",
                tagline: "Harmonies that resonate long after the chords fade.",
                description:
                  "Electric rock anthems, Indian classical jugalbandis, starlit unplugged circles, and audio production.",
                society: "Virtuosi Collective",
                color: "#0D9488",
                members: "48+",
                founded: 2002,
              },
            ].map((item) => (
              <Link
                key={item.num}
                href={`/societies/${item.slug}`}
                className="group relative bg-[#FAF8F5] p-7 rounded-2xl border border-stone-300/80 shadow-soft hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Colored Accent Stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
                  style={{ backgroundColor: item.color }}
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[11px] text-ink-faint border-b border-stone-200/80 pb-2.5">
                    <span>SECTOR [{item.num}]</span>
                    <span
                      className="px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider text-[10px]"
                      style={{ color: item.color, backgroundColor: `${item.color}15` }}
                    >
                      {item.society}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink group-hover:text-stone-700 transition-colors leading-tight">
                      {item.discipline}
                    </h3>
                    <p className="font-serif italic text-xs text-stone-600 mt-1">
                      &ldquo;{item.tagline}&rdquo;
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-stone-200/80 flex items-center justify-between font-mono text-xs">
                  <span className="text-[10px] text-ink-faint uppercase tracking-wider">
                    {item.members} Artists • Estd. {item.founded}
                  </span>

                  <span className="inline-flex items-center gap-1 text-ink group-hover:text-stone-700 font-semibold uppercase tracking-wider text-[11px]">
                    <span>Open Dossier</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Chapter 03: Flagship Exhibition (Effervescence '26) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="border-b border-stone-300/80 pb-3 mb-12 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-faint">
          <span>CHAPTER 03 // THE FESTIVALS</span>
          <span>FLAGSHIP CALENDAR</span>
        </div>

        {/* Cinematic Film-Poster Style Fest Banner */}
        <div className="relative rounded-3xl bg-ink text-canvas overflow-hidden p-8 sm:p-14 lg:p-16 shadow-soft-xl border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-7">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-amber-300 border-b border-amber-300/30 pb-2">
              <Disc className="w-4 h-4 animate-spin text-amber-300" style={{ animationDuration: "10s" }} />
              <span>NORTH INDIA&apos;S PREMIER CULTURAL EXTRAVAGANZA</span>
            </div>

            <div className="space-y-1">
              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-canvas leading-[0.95]">
                {nextFest.name}
              </h2>
              <p className="font-mono text-xs uppercase tracking-widest text-amber-300 pt-1">
                EDITION {nextFest.edition} // &ldquo;{nextFest.theme.toUpperCase()}&rdquo;
              </p>
            </div>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {nextFest.description}
            </p>

            {/* Bill / Schedule Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-stone-800 text-xs font-mono">
              {nextFest.highlights.map((h, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-stone-400 block text-[10px]">ACT [0{i + 1}]</span>
                  <span className="font-serif text-sm font-semibold text-canvas">{h}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/fests"
                className="px-6 py-3 bg-canvas text-ink font-mono text-xs uppercase tracking-widest font-bold hover:bg-stone-200 transition-colors rounded-lg shadow-sm"
              >
                Explore Festival Dossier
              </Link>
              <Link
                href="/events"
                className="px-6 py-3 border border-stone-600 text-canvas font-mono text-xs uppercase tracking-widest hover:border-canvas transition-colors rounded-lg"
              >
                View Complete Event Ledger
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Chapter 04: Upcoming Cultural Productions */}
      <section className="bg-[#F4F1EA] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-stone-300/80">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-ink-faint mb-1.5">
                CHAPTER 04 // UPCOMING CALENDAR
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
                Live Campus Productions &amp; Acts
              </h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink hover:text-stone-600 font-semibold mt-3 md:mt-0"
            >
              <span>View Full Schedule &rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initialEvents.slice(0, 3).map((evt) => (
              <div
                key={evt.id}
                className="bg-[#FAF8F5] p-6 sm:p-7 rounded-2xl border border-stone-300/80 shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold text-[10px] uppercase">
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
                      <Calendar className="w-3.5 h-3.5 text-ink-muted" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-ink-muted" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200/80">
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

      <RevolvingGalleryCarousel
        chapterLabel="CHAPTER 05 // VISUAL REPOSITORIES"
        curatorLabel="CAMPUS ARCHIVES"
        title="Visual Artifacts & Moments"
        subtitle="Curated high-definition records captured by student photojournalists."
      />

      {/* 7. Inductions / Join the Council Banner */}
      <section className="pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-ink text-canvas rounded-3xl p-8 sm:p-12 lg:p-14 border border-stone-800 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-amber-300 font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>COLLEGE AUDITIONS &amp; TALENT RECRUITMENT</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Join the Cultural Council
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Are you passionate about music, acting, dance, literature, photography, or fine arts? Auditions open every semester across all 6 student societies. No prior professional experience required—just raw creative passion.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/about#join"
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-ink font-mono text-xs uppercase tracking-widest font-bold transition-all text-center rounded-lg shadow-sm"
            >
              Audition Guidelines
            </Link>
            <Link
              href="/societies"
              className="px-6 py-3 border border-stone-600 hover:border-canvas text-canvas font-mono text-xs uppercase tracking-widest transition-all text-center rounded-lg"
            >
              Explore 6 Wings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
