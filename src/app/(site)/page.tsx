import Link from "next/link";
import { getAllSocieties } from "@/lib/societies";
import { initialFests } from "@/lib/seedData";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { A24HeroPinned } from "@/components/hero/A24HeroPinned";
import RevolvingGalleryCarousel from "@/components/gallery/RevolvingGalleryCarousel";
import {
  ArrowUpRight,
  ArrowRight,
  Camera,
} from "lucide-react";

export const metadata = {
  title: "Cultural Council | IIIT Allahabad",
  description:
    "Official website of the Cultural Council, Indian Institute of Information Technology Allahabad. Governing AMS, Geneticx, Sarasva, Nirmiti, Rangtarangini, and Virtuosi.",
};

export default async function HomePage() {
  const societies = await getAllSocieties();
  const nextFest = initialFests.find((f) => f.isCurrentOrNext) || initialFests[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-ink selection:bg-stone-300">
      {/* 0. Hero Image Showcase Section with Cultural Council Title */}
      <HeroSlider societies={societies} />

      {/* 1. Full-Window A24 Editorial 3D Hero Stage */}
      <A24HeroPinned societies={societies} />

      {/* 2. Chapter 01: The Cultural Charter & Governance */}
      <section
        id="about-section"
        className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full"
      >
        <div className="border-b border-stone-300/70 pb-3 mb-16 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
          <span>CHAPTER 01 // THE CHARTER</span>
          <span>ESTD. 1999 // PRAYAGRAJ</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Authentic Institute Mission */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink leading-[1.05]">
              Where technical eminence meets{" "}
              <span className="italic font-normal text-stone-600">unfiltered creative expression</span>.
            </h2>

            <p className="font-serif italic text-xl sm:text-2xl text-ink/80 leading-relaxed pl-6 border-l border-stone-400">
              &ldquo;An institute of national standing is defined not merely by its computing
              architectures, but by the dramas staged in twilight, the midnight strings, and the
              words written under campus streetlamps.&rdquo;
            </p>

            <div className="space-y-5 text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl font-sans">
              <p>
                Established in 1999 as an Institute of National Importance by the Ministry of Education,
                IIIT Allahabad has long cultivated international leaders in computational science.
                Alongside terminal windows and laboratory research thrives our Cultural Council—the statutory
                apex student-faculty body coordinating performing arts, dramatics, cinema, literature, and fine arts.
              </p>
              <p>
                Operating under the office of the Dean of Student Affairs (DoSA), the Council administers
                six autonomous creative wings, manages campus heritage spaces—including the 1,000-seat Main Auditorium
                and 3,500-capacity Open Air Theatre—and produces North India&apos;s celebrated cultural festival, <em>Effervescence</em>.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[0.2em]">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-[#FAF8F5] rounded-full hover:bg-stone-800 transition-colors shadow-sm"
              >
                <span>Read Council Charter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/societies"
                className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 text-ink rounded-full hover:border-ink transition-colors"
              >
                <span>Guild Register</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Archival Ledger */}
          <div className="lg:col-span-5 bg-[#F4F1EA] p-8 sm:p-10 rounded-2xl border border-stone-300/70 space-y-8">
            <div className="flex items-center justify-between border-b border-stone-300/70 pb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
              <span>COUNCIL LEDGER</span>
              <span>DEVGHAT JHALWA</span>
            </div>

            <div className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-stone-200 pb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Autonomous Guilds
                </span>
                <span className="font-serif text-3xl font-normal text-ink">06</span>
              </div>

              <div className="flex items-baseline justify-between border-b border-stone-200 pb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Annual Productions
                </span>
                <span className="font-serif text-3xl font-normal text-ink">75+</span>
              </div>

              <div className="flex items-baseline justify-between border-b border-stone-200 pb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Festival Footfall
                </span>
                <span className="font-serif text-3xl font-normal text-ink">15,000+</span>
              </div>

              <div className="flex items-baseline justify-between border-b border-stone-200 pb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Performing Artists
                </span>
                <span className="font-serif text-3xl font-normal text-ink">320+</span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Governance
                </span>
                <span className="font-mono text-xs uppercase text-ink font-semibold">
                  DoSA Office, IIITA
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-300/60">
              <Link
                href="/about#team"
                className="group flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-ink hover:text-stone-600 transition-colors"
              >
                <span>Council Executive Roster</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Chapter 02: The Six Autonomous Guilds */}
      <section className="bg-[#F4F1EA] py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-y border-stone-300/70">
        <div className="max-w-7xl mx-auto w-full">
          <div className="border-b border-stone-300/70 pb-3 mb-16 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
            <span>CHAPTER 02 // THE DISCIPLINES</span>
            <span>06 AUTONOMOUS WINGS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                slug: "ams",
                discipline: "Photography & Cinematography",
                tagline: "Freezing fleeting moments into timeless frames.",
                description:
                  "From 35mm analogue nostalgia to 4K cinematic festival docuseries. AMS preserves campus memory through masterclass optics.",
                society: "AMS",
                founded: 2005,
              },
              {
                num: "02",
                slug: "geneticx",
                discipline: "Contemporary & Street Dance",
                tagline: "Syncing heartbeats to electrifying rhythm.",
                description:
                  "Kinetic choreography, b-boy cyphers, popping, and lyrical contemporary battles on collegiate stages nationwide.",
                society: "Geneticx",
                founded: 2004,
              },
              {
                num: "03",
                slug: "sarasva",
                discipline: "Literature, Debate & Verse",
                tagline: "Where ink meets thought and words ignite revolutions.",
                description:
                  "Publishing campus literary anthologies, philosophical salon debates, bilingual open-mics, and timeless poetry.",
                society: "Sarasva",
                founded: 2003,
              },
              {
                num: "04",
                slug: "nirmiti",
                discipline: "Fine Arts, Murals & Scenography",
                tagline: "Transforming empty canvases into vibrant realities.",
                description:
                  "Gigantic acrylic wall installations, fest stagecraft decor, charcoal portraiture, and vector design archives.",
                society: "Nirmiti",
                founded: 2004,
              },
              {
                num: "05",
                slug: "rangtarangini",
                discipline: "Street Theatre & Proscenium Drama",
                tagline: "Living a thousand lives under the stage spotlight.",
                description:
                  "Voice, grit, and hard-hitting Nukkad Nataks staging social truths before amphitheatre audiences of thousands.",
                society: "Rangtarangini",
                founded: 2003,
              },
              {
                num: "06",
                slug: "virtuosi",
                discipline: "Live Band & Acoustic Performance",
                tagline: "Harmonies that resonate long after the chords fade.",
                description:
                  "Electric rock anthems, Indian classical jugalbandis, starlit unplugged circles, and multi-track audio engineering.",
                society: "Virtuosi",
                founded: 2002,
              },
            ].map((item) => (
              <Link
                key={item.num}
                href={`/societies/${item.slug}`}
                className="group bg-[#FAF8F5] p-8 rounded-2xl border border-stone-300/70 hover:border-stone-400 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-[10px] text-ink-faint border-b border-stone-200 pb-3">
                    <span className="uppercase tracking-[0.25em]">WING {item.num}</span>
                    <span className="uppercase tracking-widest text-ink font-semibold">
                      EST. {item.founded}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink group-hover:text-stone-700 transition-colors leading-tight">
                      {item.discipline}
                    </h3>
                    <p className="font-serif italic text-xs text-stone-600 mt-1.5">
                      &ldquo;{item.tagline}&rdquo;
                    </p>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-200 flex items-center justify-between font-mono text-xs">
                  <span className="text-[11px] font-semibold text-ink uppercase tracking-wider">
                    {item.society}
                  </span>
                  <span className="inline-flex items-center gap-1 text-ink group-hover:translate-x-1 transition-transform">
                    <span className="text-[10px] uppercase tracking-widest">Examine</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Chapter 03: Flagship Exhibition (Effervescence '26) */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="border-b border-stone-300/70 pb-3 mb-16 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
          <span>CHAPTER 03 // THE FESTIVALS</span>
          <span>ANNUAL FLAGSHIP MONOGRAPH</span>
        </div>

        {/* Cinematic Archival Fest Monograph */}
        <div className="relative rounded-3xl bg-stone-900 text-stone-100 overflow-hidden p-8 sm:p-14 lg:p-16 border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-8">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-300/90 border-b border-white/10 pb-3">
              NORTH INDIA&apos;S PREMIER CULTURAL EXTRAVAGANZA
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[0.96]">
                {nextFest.name}
              </h2>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-400 pt-1">
                EDITION {nextFest.edition} // &ldquo;{nextFest.theme.toUpperCase()}&rdquo;
              </p>
            </div>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans">
              {nextFest.description}
            </p>

            {/* Schedule Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-white/10 text-xs font-mono">
              {nextFest.highlights.map((h, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-stone-500 block text-[10px] tracking-widest">ACT 0{i + 1}</span>
                  <span className="font-serif text-sm font-medium text-white">{h}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[0.2em]">
              <Link
                href="/fests"
                className="px-6 py-3 bg-white text-stone-950 font-semibold hover:bg-stone-200 transition-colors rounded-full"
              >
                Festival Dossier
              </Link>
              <Link
                href="/events"
                className="px-6 py-3 border border-white/20 text-white hover:border-white transition-colors rounded-full"
              >
                Production Ledger
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Chapter 04: Visual Record & Photographic Gallery Preview */}
      <RevolvingGalleryCarousel />

      {/* 6. Chapter 05: Council Membership & Inquiries */}
      <section className="py-24 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="bg-stone-900 text-stone-100 rounded-3xl p-8 sm:p-14 border border-stone-800 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-300/90">
              CAMPUS AUDITIONS &amp; TALENT RECRUITMENT
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white">
              Participate in the Cultural Council
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans">
              Auditions and workshop enrollments open at the beginning of each academic semester across all six societies. Open to all registered students of IIIT Allahabad.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs uppercase tracking-[0.2em]">
            <Link
              href="/about"
              className="px-6 py-3 bg-white text-stone-950 font-semibold rounded-full hover:bg-stone-200 transition-colors text-center"
            >
              Council Details
            </Link>
            <Link
              href="/societies"
              className="px-6 py-3 border border-white/20 text-white rounded-full hover:border-white transition-colors text-center"
            >
              The 6 Guilds
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
