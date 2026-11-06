import Link from "next/link";
import Image from "next/image";
import { getAllSocieties } from "@/lib/societies";
import { initialFests, initialEvents, councilTeam } from "@/lib/seedData";
import { A24HeroPinned } from "@/components/hero/A24HeroPinned";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { CinematicAboutSection } from "@/components/home/CinematicAboutSection";
import EventTimelineSection from "@/components/home/EventTimelineSection";
import { FestivalCountdown } from "@/components/home/FestivalCountdown";
import RevolvingGalleryCarousel from "@/components/gallery/RevolvingGalleryCarousel";
import { getLiveCarouselRows } from "@/lib/flickr/client";
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
  const liveCarousel = await getLiveCarouselRows();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-ink selection:bg-stone-300">
      {/* 0. Sliding Hero Showcase with Cultural Council Title written on it */}
      <HeroSlider societies={societies} />

      {/* 1. Hero Pinned Physical 3D Crate Showcase with Societies Ladder */}
      <A24HeroPinned societies={societies} />

      {/* 2. Cinematic About Section: "Where Culture Finds Its Voice" // "Many Forms. One Spirit." */}
      <CinematicAboutSection />

      {/* 2.5 Event Timeline Section */}
      <EventTimelineSection />

      {/* 3. Chapter 02: Flagship Exhibition (Effervescence & Rangoli) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Editorial Chapter Header */}
        <div className="border-b border-stone-300/80 pb-3 mb-10 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-faint">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            <span>CHAPTER 03 // THE FESTIVALS</span>
          </div>
          <span>FLAGSHIP CALENDAR</span>
        </div>

        {/* High-End Editorial Exhibition Card (Light Theme Harmony) */}
        <div className="relative rounded-3xl bg-[#F4F1EA] border border-stone-300/90 p-7 sm:p-10 lg:p-12 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          {/* Subtle Ambient Warm Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Festival Dossier & Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 font-mono text-[11px] uppercase tracking-widest font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span>NORTH INDIA&apos;S PREMIER CULTURAL EXTRAVAGANZA</span>
              </div>

              {/* Title & Theme */}
              <div className="space-y-1.5">
                <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[0.95]">
                  {nextFest.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-stone-600 pt-1">
                  <span className="font-bold text-amber-800">EDITION {nextFest.edition}</span>
                  <span className="text-stone-300">•</span>
                  <span className="italic font-serif text-sm normal-case text-stone-700">
                    &ldquo;{nextFest.theme}&rdquo;
                  </span>
                </div>
              </div>

              {/* Curated Excerpt */}
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-2xl">
                {nextFest.description}
              </p>

              {/* Live Dynamic Countdown to February */}
              <FestivalCountdown />

              {/* 4 Headlining Acts Grid */}
              <div className="space-y-2.5 pt-1">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-faint font-semibold">
                  HEADLINING PILLARS &amp; ACTS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {nextFest.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="group flex items-center justify-between p-3 rounded-xl bg-white/80 hover:bg-white border border-stone-200/90 hover:border-amber-400/60 shadow-2xs hover:shadow-xs transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="font-mono text-[10px] text-amber-800 font-bold px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200/60 shrink-0">
                          0{i + 1}
                        </span>
                        <span className="font-serif text-sm font-semibold text-ink group-hover:text-amber-950 transition-colors truncate">
                          {h}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-stone-300/80 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-ink-faint block uppercase tracking-wider">ANNUAL DATES</span>
                  <span className="font-serif text-sm sm:text-base font-bold text-ink">
                    February 2027
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-faint block uppercase tracking-wider">FOOTFALL</span>
                  <span className="font-serif text-sm sm:text-base font-bold text-ink">
                    15,000+ Guests
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-faint block uppercase tracking-wider">CAMPUSES</span>
                  <span className="font-serif text-sm sm:text-base font-bold text-ink">
                    120+ Delegations
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-faint block uppercase tracking-wider">PRIMARY STAGE</span>
                  <span className="font-serif text-sm sm:text-base font-bold text-ink truncate block">
                    Arena &amp; OAT
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/fests"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-ink hover:bg-stone-800 text-canvas font-mono text-xs uppercase tracking-widest font-bold transition-all rounded-full shadow-xs hover:shadow cursor-pointer"
                >
                  <span>Explore Festival Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 hover:border-stone-400 bg-white/70 hover:bg-white text-ink font-mono text-xs uppercase tracking-widest font-medium transition-all rounded-full cursor-pointer"
                >
                  <span>View Complete Event Ledger</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Photographic Showcase & Stage Archive (5 cols) */}
            <div className="lg:col-span-5 relative space-y-3.5">
              {/* Primary Photo Frame: Concert Arena Crowd */}
              <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-300/90 shadow-md group">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/gallery/pronite-crowd.jpg"
                    alt="Effervescence Arena Crowd under floodlights"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle top & bottom vignette overlays */}
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between text-white font-mono text-[10px] uppercase tracking-wider">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                      FEBRUARY 2027
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-400 text-ink font-bold shadow-xs">
                      FLAGSHIP ARENA
                    </span>
                  </div>

                  {/* Bottom Caption & Live Tag */}
                  <div className="absolute bottom-3 inset-x-3 text-white">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-300 mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      <span>THE ARENA GROUND // 15,000+ CAPACITY</span>
                    </div>
                    <p className="font-serif text-xs sm:text-sm text-stone-200 line-clamp-1">
                      Thousands gathered under the main stage floodlights.
                    </p>
                  </div>
                </div>
              </div>

              {/* Secondary Inset Card: Spring Preview of Rangoli */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-300/80 shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                    <Sparkles className="w-5 h-5 text-amber-700" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint truncate">
                      SPRING FESTIVAL // MARCH 2026
                    </div>
                    <div className="font-serif text-sm font-bold text-ink truncate">
                      Rangoli Cultural Festival &apos;26
                    </div>
                  </div>
                </div>
                <Link
                  href="/fests"
                  className="font-mono text-[10px] uppercase tracking-wider text-amber-800 hover:text-amber-950 font-bold shrink-0 flex items-center gap-1 hover:underline"
                >
                  <span>Dossier</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RevolvingGalleryCarousel
        chapterLabel={
          liveCarousel.isLive
            ? "CHAPTER 04 // LIVE FLICKR ARCHIVAL REPOSITORY"
            : "CHAPTER 04 // VISUAL REPOSITORIES"
        }
        curatorLabel={
          liveCarousel.isLive
            ? "CAMPUS ARCHIVES • LIVE FLICKR STREAM"
            : "CAMPUS ARCHIVES"
        }
        title="Visual Artifacts & Moments"
        subtitle={
          liveCarousel.isLive
            ? "High-definition records of live concerts, stage productions, and dance choreography streamed from Flickr."
            : "Curated high-definition records captured by student photojournalists."
        }
        row1={liveCarousel.row1}
        row2={liveCarousel.row2}
        row3={liveCarousel.row3}
      />
    </div>
  );
}
