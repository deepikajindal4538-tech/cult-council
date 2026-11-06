import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
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
          <div className="font-mono text-xs uppercase tracking-widest text-amber-800 font-semibold">
            IIIT ALLAHABAD • CULTURAL COUNCIL
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[-0.035em] text-ink leading-[0.93]">
            Where Culture <br />
            <span className="italic font-light text-stone-600">
              Finds Its Voice
            </span>
            .
          </h2>

          <p className="font-serif italic text-lg sm:text-2xl text-stone-700 leading-relaxed border-l-2 border-stone-400 pl-5 pt-1">
            &ldquo;Beyond the classrooms and code, we bring creative energy to
            campus—late-night jam sessions, the rhythm of dance, street plays
            that move a crowd, and stories told through art.&rdquo;
          </p>

          <div className="space-y-3.5 text-sm sm:text-base text-ink-muted leading-relaxed font-sans max-w-2xl pt-2">
            <p>
              The <strong>Cultural Council of IIIT Allahabad</strong> coordinates student
              cultural life, flagship festivals, and creative events under the Office of the
              Dean of Student Affairs (DoSA). We bring together six student-led societies
              across music, dance, dramatics, literature, fine arts, and media to build a
              vibrant and welcoming campus community.
            </p>
            <p className="font-mono text-xs text-stone-500 uppercase tracking-widest pt-1">
              MUSIC • DANCE • THEATRE • LITERATURE • FINE ARTS • MEDIA
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-canvas rounded-xl font-mono text-xs uppercase tracking-widest hover:bg-stone-800 transition-all shadow-sm hover:shadow"
            >
              <span>About the Council</span>
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

        {/* Right Column: Genuine Campus Community Feature */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-7 rounded-3xl border border-stone-300/90 shadow-sm space-y-5">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
            <Image
              src="/images/gallery/pronite-crowd.jpg"
              alt="Students gathered at campus cultural fest"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 shrink-0">
                  <Image
                    src="/images/council-logo.png"
                    alt="Cultural Council Crest"
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-ink leading-none">
                    Cultural Council
                  </h4>
                  <span className="font-mono text-[10px] text-stone-500 uppercase tracking-wider">
                    Student Activity Center • IIIT Allahabad
                  </span>
                </div>
              </div>
              <span className="font-mono text-[11px] text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                ESTD. 1999
              </span>
            </div>

            <p className="font-sans text-xs text-ink-muted leading-relaxed">
              From open acoustic jam sessions on the library lawns to street plays, dance cyphers, and annual pro-nights, the Cultural Council provides the stage, rehearsal spaces, and community for student artists across campus.
            </p>

            <div className="pt-2 flex items-center justify-between font-mono text-xs text-ink">
              <Link
                href="/societies"
                className="group inline-flex items-center gap-1.5 uppercase tracking-wider font-semibold hover:text-amber-800 transition-colors"
              >
                <span>Explore the 6 Societies</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-amber-700" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. THE SIX SOCIETIES MATRIX */}
      <div className="pt-12 sm:pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
              CAMPUS CULTURAL SOCIETIES
            </div>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-ink">
              Six Societies, One Creative Community
            </h3>
          </div>
          <p className="max-w-md font-sans text-xs text-ink-muted leading-relaxed">
            Each society is led by student coordinators who organize regular
            sessions, workshops, competitions, and festival events throughout the year.
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
                      <span className="font-serif font-bold text-base text-ink">
                        {item.name}
                      </span>
                    </div>
                    <Icon
                      className="w-4 h-4 transition-transform group-hover:scale-110"
                      style={{ color: item.accent }}
                    />
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-stone-500 font-semibold">
                      {item.discipline}
                    </h4>
                    <p className="text-xs text-ink-muted leading-relaxed pt-1.5 font-sans">
                      {item.tagline}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink font-semibold">
                  <span>View Society</span>
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
