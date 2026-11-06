"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  ChevronRight,
  Bookmark,
  Radio,
} from "lucide-react";

export interface TimelineEvent {
  id: string;
  title: string;
  societySlug: string;
  societyName: string;
  category: "Music" | "Dramatics" | "Dance" | "Literature" | "Fine Arts" | "Media" | "Flagship Festival";
  type: "upcoming" | "flagship" | "workshop";
  date: string;
  month: string;
  day: string;
  year: string;
  time: string;
  venue: string;
  status: "UPCOMING" | "REGISTRATIONS OPEN" | "HEADLINE FESTIVAL" | "CONFIRMED STAGE";
  description: string;
  accentColor: string;
  edition?: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "evt-1",
    title: "Acoustic Sunset: Unplugged Vol. IV",
    societySlug: "virtuosi",
    societyName: "Virtuosi Music Collective",
    category: "Music",
    type: "upcoming",
    date: "November 14, 2026",
    month: "NOV",
    day: "14",
    year: "2026",
    time: "6:00 PM IST",
    venue: "Main Auditorium Lawns",
    status: "REGISTRATIONS OPEN",
    description: "An intimate evening of indie melodies, stripped-down acoustic sets, and open jam circles under the twilight campus sky.",
    accentColor: "#D97706",
  },
  {
    id: "evt-2",
    title: "Aakrosh: Annual Inter-Hostel Street Play Battle",
    societySlug: "rangtarangini",
    societyName: "Rangtarangini Theatre",
    category: "Dramatics",
    type: "upcoming",
    date: "November 21, 2026",
    month: "NOV",
    day: "21",
    year: "2026",
    time: "4:30 PM IST",
    venue: "Main Gate Circle / OAT",
    status: "CONFIRMED STAGE",
    description: "Vibrant drums, chorus chanting, and incisive social narratives as hostel troupes clash in the hard-hitting Nukkad Natak arena.",
    accentColor: "#DC2626",
  },
  {
    id: "evt-3",
    title: "Monochrome & Shadows: Photography Masterclass",
    societySlug: "ams",
    societyName: "Acoustics & Media Society",
    category: "Media",
    type: "workshop",
    date: "November 28, 2026",
    month: "NOV",
    day: "28",
    year: "2026",
    time: "3:00 PM IST",
    venue: "SAC Audio-Visual Lab",
    status: "UPCOMING",
    description: "Hands-on studio masterclass on raw histogram control, shadow dynamics, and street documentary framing for festival photographers.",
    accentColor: "#0284C7",
  },
  {
    id: "evt-4",
    title: "Street Cypher: 1v1 All-Styles Dance Battle",
    societySlug: "geneticx",
    societyName: "Geneticx Dance Crew",
    category: "Dance",
    type: "upcoming",
    date: "December 05, 2026",
    month: "DEC",
    day: "05",
    year: "2026",
    time: "7:00 PM IST",
    venue: "Open Air Theatre (OAT)",
    status: "REGISTRATIONS OPEN",
    description: "Dancers go head-to-head in popping, breaking, and hip-hop to live DJ beats with audience decibel meters deciding the champions.",
    accentColor: "#E11D48",
  },
  {
    id: "evt-5",
    title: "Kavya Sandhya: Bilingual Mushaira & Poetry Slam",
    societySlug: "sarasva",
    societyName: "Sarasva Literary Society",
    category: "Literature",
    type: "upcoming",
    date: "December 12, 2026",
    month: "DEC",
    day: "12",
    year: "2026",
    time: "6:30 PM IST",
    venue: "Library Verandah",
    status: "UPCOMING",
    description: "Spoken word, Urdu ghazals, English free-verse, and collegiate reflections recited over warm tea and ambient courtyard lanterns.",
    accentColor: "#4F46E5",
  },
  {
    id: "evt-6",
    title: "Campus Canvas: Live 48-Hour Mural Marathon",
    societySlug: "nirmiti",
    societyName: "Nirmiti Fine Arts",
    category: "Fine Arts",
    type: "upcoming",
    date: "December 19, 2026",
    month: "DEC",
    day: "19",
    year: "2026",
    time: "10:00 AM IST",
    venue: "SAC Exterior Brick Facade",
    status: "CONFIRMED STAGE",
    description: "Transforming institute brick walls into a collaborative visual canvas commemorating 27 years of student creative expression.",
    accentColor: "#EA580C",
  },
  {
    id: "evt-7",
    title: "Effervescence '27: Annual Cultural Festival",
    societySlug: "council",
    societyName: "Cultural Council & All 6 Guilds",
    category: "Flagship Festival",
    type: "flagship",
    date: "February 18–21, 2027",
    month: "FEB",
    day: "18",
    year: "2027",
    time: "All-Day Spectacle",
    venue: "Main Football Grounds & Campus Amphitheatres",
    status: "HEADLINE FESTIVAL",
    description: "North India's premier collegiate cultural extravaganza. 4 days of celebrity pro-nights, 75+ collegiate competitions, and 15,000+ festival footfall.",
    accentColor: "#B45309",
    edition: "Edition 22",
  },
  {
    id: "evt-8",
    title: "Goonj '27: Inter-Collegiate Proscenium Drama Gala",
    societySlug: "rangtarangini",
    societyName: "Rangtarangini Theatre",
    category: "Dramatics",
    type: "flagship",
    date: "March 14–16, 2027",
    month: "MAR",
    day: "14",
    year: "2027",
    time: "5:00 PM IST",
    venue: "Main Institute Auditorium",
    status: "CONFIRMED STAGE",
    description: "A 3-day theatrical conclave featuring full-length proscenium plays, mono-act monologues, mime, and original student playwriting.",
    accentColor: "#DC2626",
    edition: "Annual Gala",
  },
];

const FILTER_OPTIONS = [
  { label: "All Productions", value: "ALL" },
  { label: "Upcoming Acts", value: "upcoming" },
  { label: "Flagship Festivals", value: "flagship" },
  { label: "Workshops & Labs", value: "workshop" },
];

export default function EventTimelineSection() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredEvents = useMemo(() => {
    if (activeFilter === "ALL") return TIMELINE_EVENTS;
    return TIMELINE_EVENTS.filter((e) => e.type === activeFilter);
  }, [activeFilter]);

  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-t border-stone-300/80">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="border-b border-stone-300/80 pb-6 mb-12 sm:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-800">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                <span>CHAPTER 02 // EVENT TIMELINE</span>
                <span>•</span>
                <span>SEMESTER PRODUCTION CHRONICLE</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.05]">
                The Cultural Chronicle &amp; Stage Ledger
              </h2>
              <p className="font-serif italic text-lg sm:text-xl text-ink-muted">
                &ldquo;A chronological passage through collegiate battles, open-mics, pro-night spectacles, and midnight canvases across the academic season.&rdquo;
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider">
              {FILTER_OPTIONS.map((f) => {
                const isActive = activeFilter === f.value;
                return (
                  <button
                    key={f.value}
                    onClick={() => setActiveFilter(f.value)}
                    className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                      isActive
                        ? "bg-ink text-white border-ink font-semibold shadow-xs"
                        : "bg-[#F4F1EA] text-ink-muted border-stone-300 hover:border-stone-500 hover:text-ink"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Central Vertical Timeline */}
        <div className="relative">
          {/* Central Vertical Spine Line (Desktop: centered; Mobile: left aligned) */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-stone-400 via-stone-300 to-stone-400" />

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((evt, index) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={evt.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* 1. Spine Node Pin */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-stone-400 shadow-md flex items-center justify-center font-mono text-[11px] font-bold text-ink group-hover:border-amber-600 transition-colors">
                        <span className="text-[10px] text-amber-800">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* 2. Timeline Card Container */}
                    <div className="w-full pl-14 md:pl-0 md:w-1/2 md:px-8 lg:px-12">
                      <div
                        className={`group bg-[#F4F1EA] rounded-2xl border border-stone-300/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-stone-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                          evt.type === "flagship"
                            ? "border-amber-400/80 bg-gradient-to-br from-[#F4F1EA] via-amber-50/40 to-[#F4F1EA]"
                            : ""
                        }`}
                      >
                        {/* Card Top Metadata */}
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
                            {/* Date Badge */}
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-300/80 font-mono text-xs font-semibold text-ink shadow-2xs">
                              <Calendar className="w-3.5 h-3.5 text-amber-700" />
                              <span>{evt.date}</span>
                            </div>

                            {/* Status Pill */}
                            <span
                              className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${
                                evt.status === "HEADLINE FESTIVAL"
                                  ? "bg-amber-600 text-white"
                                  : evt.status === "REGISTRATIONS OPEN"
                                  ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                  : "bg-stone-200 text-stone-700"
                              }`}
                            >
                              {evt.status}
                            </span>
                          </div>

                          {/* Society Guild Pill */}
                          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: evt.accentColor }}
                            />
                            <span className="font-semibold text-ink-muted">
                              {evt.societyName}
                            </span>
                            <span>•</span>
                            <span className="text-amber-800 font-medium">
                              {evt.category}
                            </span>
                          </div>

                          {/* Event Title */}
                          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink leading-tight group-hover:text-amber-950 transition-colors">
                            {evt.title}
                          </h3>

                          {/* Description */}
                          <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
                            {evt.description}
                          </p>
                        </div>

                        {/* Card Footer: Venue & Time */}
                        <div className="mt-6 pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-ink-muted">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-1 text-stone-600">
                              <Clock className="w-3.5 h-3.5 text-stone-400" />
                              <span>{evt.time}</span>
                            </span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1 text-stone-600">
                              <MapPin className="w-3.5 h-3.5 text-stone-400" />
                              <span className="truncate max-w-[180px] sm:max-w-none">
                                {evt.venue}
                              </span>
                            </span>
                          </div>

                          {/* Society Link */}
                          {evt.societySlug !== "council" && (
                            <Link
                              href={`/societies/${evt.societySlug}`}
                              className="inline-flex items-center gap-1 text-amber-800 hover:text-ink font-semibold shrink-0 group-hover:translate-x-0.5 transition-transform"
                            >
                              <span>Guild Dossier</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Timeline Summary Banner */}
        <div className="mt-16 sm:mt-20 rounded-2xl bg-white border border-stone-300 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-800 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>OFFICIAL PRODUCTION SCHEDULE</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              Want to register or propose a stage production?
            </h4>
            <p className="font-sans text-xs text-ink-muted max-w-xl">
              All events are governed under the Cultural Council charter. Students from all departments and years are encouraged to join the guild rosters.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/events"
              className="px-5 py-2.5 rounded-xl bg-ink text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>Explore All Events</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
