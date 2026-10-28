import React from "react";
import Link from "next/link";
import {
  Users,
  Award,
  Sparkles,
  Calendar,
  Building2,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Music,
  Camera,
  Feather,
  Palette,
  Theater,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { councilDetails, councilTeam, initialSocieties } from "@/lib/seedData";

export const metadata = {
  title: "About Cultural Council | IIIT Allahabad",
  description:
    "Learn about the Cultural Council of IIIT Allahabad — our history, governance, 6 autonomous societies, executive leadership team, and cultural mandate.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-ink selection:bg-stone-300">
      {/* 1. Header Hero Banner */}
      <section className="border-b border-stone-300 bg-[#F4F1EA] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint mb-4">
            <Link href="/" className="hover:text-ink transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">ABOUT CULTURAL COUNCIL</span>
          </div>

          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-mono text-xs uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>APEX STATUTORY STUDENT BODY • ESTABLISHED 1999</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/80 border border-stone-300 font-mono text-xs uppercase tracking-wider text-ink font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>MANY FORMS. ONE SPIRIT.</span>
              </div>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.02]">
              Where Culture{" "}
              <span className="italic font-normal text-stone-700">Finds Its Voice</span>.
            </h1>

            <p className="font-serif italic text-xl sm:text-2xl text-ink-muted leading-relaxed">
              &ldquo;In an institute renowned for algorithmic precision, the Cultural Council breathes life into midnight strings, spontaneous cyphers, thespian confrontations, and visual truth. Many Forms. One Spirit.&rdquo;
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-stone-300">
            <div>
              <span className="font-serif text-4xl sm:text-5xl font-bold text-ink block">06</span>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">Autonomous Societies</span>
            </div>
            <div>
              <span className="font-serif text-4xl sm:text-5xl font-bold text-ink block">75+</span>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">Annual Events &amp; Acts</span>
            </div>
            <div>
              <span className="font-serif text-4xl sm:text-5xl font-bold text-ink block">15K+</span>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">Annual Fest Footfall</span>
            </div>
            <div>
              <span className="font-serif text-4xl sm:text-5xl font-bold text-ink block">320+</span>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">Active Student Artists</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Council Mandate & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="font-mono text-xs uppercase tracking-widest text-ink-faint">
              01 // THE MANDATE
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink leading-tight">
              A Constitutional Union of Creative Independence
            </h2>
            <div className="space-y-4 text-ink-muted text-base sm:text-lg leading-relaxed">
              <p>
                Operating under the office of the <strong>Dean of Student Affairs (DoSA)</strong>, the Cultural Council serves as the supreme planning, coordination, and resource-allocation council for all cultural and artistic dimensions of campus life at IIIT Allahabad.
              </p>
              <p>
                From dramatic street theater addressing pressing socio-cultural realities to acoustic rock concerts under open night skies, the Council ensures that every student with a creative spark finds mentorship, professional equipment, and a grand stage.
              </p>
              <p>
                Beyond internal activities, the Council coordinates delegations to national cultural festivals across India (including IIT Bombay Mood Indigo, IIT Kanpur Antaragni, and IIT BHU Kashiyatra), regularly bringing home premier trophies and national recognition.
              </p>
            </div>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#F4F1EA] rounded-lg border border-stone-300 space-y-1">
                <CheckCircle2 className="w-5 h-5 text-amber-700" />
                <h4 className="font-serif font-bold text-ink text-base">Autonomy &amp; Inclusivity</h4>
                <p className="text-xs text-ink-muted">Each society operates independently under student leadership with faculty guidance.</p>
              </div>
              <div className="p-4 bg-[#F4F1EA] rounded-lg border border-stone-300 space-y-1">
                <CheckCircle2 className="w-5 h-5 text-amber-700" />
                <h4 className="font-serif font-bold text-ink text-base">Open Auditions &amp; Training</h4>
                <p className="text-xs text-ink-muted">Every semester, beginners to advanced performers receive masterclasses and mentorship.</p>
              </div>
            </div>
          </div>

          {/* Right: Council Factsheet */}
          <div className="lg:col-span-5 bg-[#F4F1EA] p-8 sm:p-10 rounded-2xl border border-stone-300 space-y-6 shadow-sm">
            <div className="border-b border-stone-300 pb-3 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-ink-faint">
              <span>COUNCIL CHARTER</span>
              <span>IIIT ALLAHABAD</span>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between border-b border-stone-200 pb-2.5">
                <span className="text-ink-muted uppercase">Statutory Framework</span>
                <span className="font-serif font-semibold text-ink text-sm">Student Gymkhana</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2.5">
                <span className="text-ink-muted uppercase">Faculty In-Charge</span>
                <span className="font-serif font-semibold text-ink text-sm">Dr. Pragya Singh</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2.5">
                <span className="text-ink-muted uppercase">Student Secretary</span>
                <span className="font-serif font-semibold text-ink text-sm">Aryan Deshmukh</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2.5">
                <span className="text-ink-muted uppercase">Council Headquarters</span>
                <span className="text-ink font-semibold text-right">SAC, Ground Floor</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2.5">
                <span className="text-ink-muted uppercase">Flagship Festival</span>
                <span className="text-amber-700 font-bold">Effervescence</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted uppercase">Official Contact</span>
                <a href="mailto:culturalcouncil@iiita.ac.in" className="text-ink underline hover:text-stone-600">
                  culturalcouncil@iiita.ac.in
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/fests"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-ink text-canvas font-mono text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors rounded"
              >
                <span>Explore Effervescence &apos;26</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 6 Autonomous Wings */}
      <section className="bg-[#F4F1EA] py-20 px-4 sm:px-6 lg:px-8 border-y border-stone-300">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-ink-faint mb-2">
                02 // CONSTITUENT GUILDS
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ink">
                The Six Creative Wings
              </h2>
            </div>
            <p className="text-ink-muted text-sm sm:text-base max-w-md mt-3 md:mt-0">
              Each society specializes in a distinct artistic craft, driven by passionate student coordinators and year-round productions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialSocieties.map((soc) => (
              <div
                key={soc.slug}
                className="bg-[#FAF8F5] p-6 rounded-xl border border-stone-300 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
                    <span className="font-mono text-xs font-semibold" style={{ color: soc.accentColor }}>
                      {soc.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-ink-faint">
                      ESTD. {soc.stats.foundedYear}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-ink mb-2">
                    {soc.category}
                  </h3>
                  <p className="font-serif italic text-xs text-stone-600 mb-3">
                    &ldquo;{soc.tagline}&rdquo;
                  </p>
                  <p className="text-xs text-ink-muted leading-relaxed line-clamp-3">
                    {soc.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-xs font-mono text-ink-faint">
                    Lead: {soc.leads[0]?.name}
                  </span>
                  <Link
                    href={`/societies/${soc.slug}`}
                    className="font-mono text-xs uppercase tracking-wider text-ink font-semibold hover:text-stone-600 flex items-center gap-1"
                  >
                    <span>View Wing</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Council Leadership & Executive Team */}
      <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            03 // GOVERNANCE &amp; HIERARCHY
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ink">
            Council Leadership Team (2025–2026)
          </h2>
          <p className="text-ink-muted text-sm sm:text-base">
            Meet the faculty advisors and student representatives entrusted with directing the institute&apos;s cultural affairs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {councilTeam.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#F4F1EA] p-6 rounded-xl border border-stone-300 text-center space-y-4 shadow-sm"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-ink text-canvas font-mono font-bold text-lg flex items-center justify-center shadow-inner">
                {member.avatar}
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full inline-block mb-1">
                  {member.type}
                </span>
                <h3 className="font-serif text-lg font-bold text-ink leading-snug">
                  {member.name}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-muted mt-1">
                  {member.role}
                </p>
                {member.department && (
                  <p className="text-xs text-ink-faint mt-0.5">{member.department}</p>
                )}
              </div>

              <div className="pt-2 border-t border-stone-300 text-xs font-mono">
                <a
                  href={`mailto:${member.email}`}
                  className="text-stone-600 hover:text-ink underline inline-flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  <span>{member.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Campus Performance Venues & Infrastructure */}
      <section className="bg-[#F4F1EA] py-20 px-4 sm:px-6 lg:px-8 border-y border-stone-300">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-ink-faint">
              04 // INFRASTRUCTURE
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ink">
              World-Class Venues &amp; Studios
            </h2>
            <p className="text-ink-muted text-sm sm:text-base">
              The cultural grounds and auditoriums managed and utilized by our societies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {councilDetails.venues.map((venue, i) => (
              <div
                key={i}
                className="bg-[#FAF8F5] p-8 rounded-2xl border border-stone-300 shadow-sm space-y-4"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-200 flex items-center justify-center text-ink">
                  <Building2 className="w-5 h-5 text-stone-700" />
                </div>
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-ink-faint mb-1">
                    <span>VENUE [0{i + 1}]</span>
                    <span className="font-semibold text-amber-800">{venue.capacity}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-ink">
                    {venue.name}
                  </h3>
                  <p className="font-mono text-xs text-stone-500 mt-1 uppercase tracking-wider">
                    {venue.type}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {venue.usage}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Inductions / How to Join Callout */}
      <section id="join" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-ink text-canvas rounded-2xl p-8 sm:p-14 border border-stone-800 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-amber-300 font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>ANNUAL INDUCTIONS &amp; AUDITIONS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to create something unforgettable?
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Whether you are an aspiring guitarist, actor, dancer, photographer, writer, or artist, the Cultural Council conducts auditions every autumn and spring semester for freshers and senior students alike.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/societies"
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-ink font-mono text-xs uppercase tracking-widest font-bold transition-all text-center rounded"
            >
              Explore Society Auditions
            </Link>
            <Link
              href="/events"
              className="px-6 py-3.5 border border-stone-500 hover:border-canvas text-canvas font-mono text-xs uppercase tracking-widest transition-all text-center rounded"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
