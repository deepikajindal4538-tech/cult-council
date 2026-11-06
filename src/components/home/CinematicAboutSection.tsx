import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Camera,
  Music,
  Palette,
  Theater,
  Feather,
  Flame,
  Users,
} from "lucide-react";

export function CinematicAboutSection() {
  const sixForms = [
    {
      num: "01",
      name: "Virtuosi",
      discipline: "Sound & Acoustics",
      tagline: "Strings, synths, and midnight electric sets.",
      accent: "#0D9488",
      icon: Music,
      slug: "virtuosi",
    },
    {
      num: "02",
      name: "Geneticx",
      discipline: "Kinetic Motion",
      tagline: "Precision street battles and synchronized crew choreography.",
      accent: "#E11D48",
      icon: Flame,
      slug: "geneticx",
    },
    {
      num: "03",
      name: "Sarasva",
      discipline: "The Written Word",
      tagline: "Spoken ghazals, philosophical discourse, and literary salons.",
      accent: "#4F46E5",
      icon: Feather,
      slug: "sarasva",
    },
    {
      num: "04",
      name: "Rangtarangini",
      discipline: "Theatrical Stage",
      tagline: "Proscenium drama, character craft, and socio-political street plays.",
      accent: "#B91C1C",
      icon: Theater,
      slug: "rangtarangini",
    },
    {
      num: "05",
      name: "Nirmiti",
      discipline: "Visual Canvas",
      tagline: "Charcoal murals, clay sculpture, and avant-garde runway couture.",
      accent: "#EA580C",
      icon: Palette,
      slug: "nirmiti",
    },
    {
      num: "06",
      name: "AMS",
      discipline: "The Cinematic Lens",
      tagline: "Acoustic engineering, darkroom archives, and documentary films.",
      accent: "#D97706",
      icon: Camera,
      slug: "ams",
    },
  ];

  return (
    <section
      id="about-section"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none overflow-hidden"
      aria-label="About the Cultural Council"
    >
      {/* 2. CINEMATIC HEADLINE SPREAD & MINIMAL STORYTELLING */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pb-14 border-b border-stone-300/80">
        {/* Left Column: Monumental Headline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>ESTD. 1999 • INSTITUTE OF NATIONAL IMPORTANCE</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[-0.035em] text-ink leading-[0.93]">
            Where Culture <br />
            <span className="italic font-light text-stone-600">
              Finds Its Voice
            </span>
            .
          </h2>

          <p className="font-serif italic text-lg sm:text-2xl text-stone-700 leading-relaxed border-l-2 border-stone-400 pl-5 pt-1">
            &ldquo;In an institute renowned for algorithmic rigor, we are the
            counter-rhythm—the midnight amplifier, the dust stirred by dancers&apos;
            feet, the street play that silences a crowd.&rdquo;
          </p>

          <div className="space-y-3.5 text-sm sm:text-base text-ink-muted leading-relaxed font-sans max-w-2xl pt-2">
            <p>
              The <strong>Cultural Council of IIIT Allahabad</strong> serves as the
              statutory apex body governing campus artistic life under the Office of
              the Dean of Student Affairs (DoSA). We do not merely schedule events; we
              steward six autonomous guilds, foster independent creative thought, and
              unite hundreds of musicians, thespians, poets, painters, and cinematographers
              into a singular institutional voice.
            </p>
            <p className="font-mono text-xs text-stone-500 uppercase tracking-widest pt-1">
              MANY FORMS. ONE SPIRIT. // MUSIC • DANCE • THEATRE • LITERATURE • ART • CINEMA
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-canvas rounded-xl font-mono text-xs uppercase tracking-widest hover:bg-stone-800 transition-all shadow-sm hover:shadow"
            >
              <span>Explore Council Charter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/about#team"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-ink border border-stone-300 rounded-xl font-mono text-xs uppercase tracking-widest hover:bg-stone-100 transition-colors"
            >
              <span>Office Bearers</span>
              <Users className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Institutional Archival Ledger */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-9 rounded-3xl border border-stone-300/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 shrink-0">
                <Image
                  src="/images/council-logo.png"
                  alt="Cultural Council Official Crest"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base text-ink leading-tight">
                  Cultural Council
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint">
                  SHDC • IIIT ALLAHABAD
                </span>
              </div>
            </div>
            <span className="font-mono text-[10px] text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
              ESTD. 1999
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline justify-between border-b border-stone-100 pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-500">
                Autonomous Guilds
              </span>
              <div className="text-right">
                <span className="font-serif text-3xl font-bold text-ink">06</span>
                <span className="block font-mono text-[9px] text-stone-400">
                  WINGS UNIFIED
                </span>
              </div>
            </div>

            <div className="flex items-baseline justify-between border-b border-stone-100 pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-500">
                Annual Stage Acts
              </span>
              <div className="text-right">
                <span className="font-serif text-3xl font-bold text-ink">75+</span>
                <span className="block font-mono text-[9px] text-stone-400">
                  PRODUCTIONS / YEAR
                </span>
              </div>
            </div>

            <div className="flex items-baseline justify-between border-b border-stone-100 pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-500">
                Festival Footfall
              </span>
              <div className="text-right">
                <span className="font-serif text-3xl font-bold text-ink">15,000+</span>
                <span className="block font-mono text-[9px] text-amber-700">
                  EFFERVESCENCE ARENA
                </span>
              </div>
            </div>

            <div className="flex items-baseline justify-between border-b border-stone-100 pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-500">
                Active Performers
              </span>
              <div className="text-right">
                <span className="font-serif text-3xl font-bold text-ink">320+</span>
                <span className="block font-mono text-[9px] text-stone-400">
                  STUDENT ARTISTS
                </span>
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-500">
                Auditorium Capacity
              </span>
              <div className="text-right">
                <span className="font-serif text-lg font-bold text-ink">
                  1,000 Audi + 3,500 OAT
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-200">
            <Link
              href="/societies"
              className="group flex items-center justify-between text-xs font-mono uppercase tracking-widest text-ink hover:text-stone-600 transition-colors"
            >
              <span>Explore All 6 Autonomous Guilds</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-amber-700" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. "MANY FORMS. ONE SPIRIT." — THE SIX GUILDS MATRIX */}
      <div className="pt-12 sm:pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-700 font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MANY FORMS. ONE SPIRIT.</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-ink">
              Six Autonomous Disciplines, Unified in Purpose
            </h3>
          </div>
          <p className="max-w-md font-sans text-xs text-ink-muted leading-relaxed">
            Every society operates autonomously with elected student directors,
            yet convenes under the Cultural Council to deliver a cohesive campus
            arts season.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {sixForms.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.num}
                href={`/societies/${item.slug}`}
                className="group relative p-6 bg-white rounded-2xl border border-stone-300/90 shadow-2xs hover:shadow-lg hover:border-ink hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.accent }}
                      />
                      <span className="font-mono text-xs font-bold text-ink">
                        {item.num} // {item.name}
                      </span>
                    </div>
                    <Icon
                      className="w-4 h-4 transition-transform group-hover:scale-110"
                      style={{ color: item.accent }}
                    />
                  </div>

                  <div>
                    <h4 className="font-serif text-xl font-bold text-ink group-hover:text-stone-700 transition-colors">
                      {item.discipline}
                    </h4>
                    <p className="text-xs text-ink-muted leading-relaxed pt-1 font-sans">
                      {item.tagline}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink font-semibold">
                  <span>Explore Wing</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-amber-700" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
