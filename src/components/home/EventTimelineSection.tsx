"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Share2,
  Check,
  X,
  ExternalLink,
  Ticket,
  Music,
  Theater,
  Camera,
  Flame,
  Feather,
  Palette,
  Eye,
  Bell,
  Volume2,
} from "lucide-react";

export interface TimelineEvent {
  id: string;
  title: string;
  societySlug: string;
  societyName: string;
  category: "Music" | "Dramatics" | "Dance" | "Literature" | "Fine Arts" | "Media" | "Flagship Festival";
  type: "upcoming" | "flagship" | "workshop";
  date: string;
  weekday: string;
  month: string;
  day: string;
  year: string;
  time: string;
  venue: string;
  status: "UPCOMING" | "REGISTRATIONS OPEN" | "HEADLINE FESTIVAL" | "CONFIRMED STAGE";
  description: string;
  accentColor: string;
  passCode: string;
  gcalDate: string;
  highlights: string[];
  edition?: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "evt-1",
    title: "Acoustic Sunset: Unplugged Vol. IV",
    societySlug: "virtuosi",
    societyName: "Virtuosi Collective",
    category: "Music",
    type: "upcoming",
    date: "Nov 14, 2026",
    weekday: "SATURDAY",
    month: "NOV",
    day: "14",
    year: "2026",
    time: "6:00 PM – 9:30 PM IST",
    venue: "Main Auditorium Lawns",
    status: "REGISTRATIONS OPEN",
    description: "An intimate twilight gathering of stripped-down acoustic sets, indie originals, percussion circles, and soulful melodies under campus lantern light.",
    accentColor: "#0D9488",
    passCode: "CC-VRT-2601",
    gcalDate: "20261114T123000Z/20261114T160000Z",
    highlights: ["Open Jam Session", "Unplugged Indie Duos", "Acoustic Stage Setups"],
  },
  {
    id: "evt-2",
    title: "Aakrosh: Annual Street Play Battle",
    societySlug: "rangtarangini",
    societyName: "Rangtarangini Dramatics",
    category: "Dramatics",
    type: "upcoming",
    date: "Nov 21, 2026",
    weekday: "SATURDAY",
    month: "NOV",
    day: "21",
    year: "2026",
    time: "4:30 PM – 8:00 PM IST",
    venue: "Main Gate Circle / OAT",
    status: "CONFIRMED STAGE",
    description: "Hard-hitting social drama, synchronized drum chants, and incisive political satire as hostel troupes clash in the Nukkad Natak circle.",
    accentColor: "#B91C1C",
    passCode: "CC-RNG-2602",
    gcalDate: "20261121T110000Z/20261121T143000Z",
    highlights: ["Nukkad Natak Clash", "Live Dhol Cadence", "Inter-Hostel Trophy"],
  },
  {
    id: "evt-3",
    title: "Monochrome & Shadows: Masterclass",
    societySlug: "ams",
    societyName: "Acoustics & Media Society",
    category: "Media",
    type: "workshop",
    date: "Nov 28, 2026",
    weekday: "SATURDAY",
    month: "NOV",
    day: "28",
    year: "2026",
    time: "3:00 PM – 6:00 PM IST",
    venue: "SAC Audio-Visual Lab",
    status: "REGISTRATIONS OPEN",
    description: "Hands-on cinematography masterclass covering dynamic histogram control, festival low-light capture, and documentary street framing.",
    accentColor: "#D97706",
    passCode: "CC-AMS-2603",
    gcalDate: "20261128T093000Z/20261128T123000Z",
    highlights: ["35mm Framing Rules", "Festival Lighting Rigs", "Raw Color Grading"],
  },
  {
    id: "evt-4",
    title: "Street Cypher: 1v1 All-Styles Battle",
    societySlug: "geneticx",
    societyName: "Geneticx Dance Crew",
    category: "Dance",
    type: "upcoming",
    date: "Dec 05, 2026",
    weekday: "SATURDAY",
    month: "DEC",
    day: "05",
    year: "2026",
    time: "7:00 PM – 10:30 PM IST",
    venue: "Open Air Theatre (OAT)",
    status: "REGISTRATIONS OPEN",
    description: "Dancers go head-to-head in popping, breaking, and contemporary hip-hop to live vinyl DJ beats with audience decibel meters deciding the victors.",
    accentColor: "#E11D48",
    passCode: "CC-GNX-2604",
    gcalDate: "20261205T133000Z/20261205T170000Z",
    highlights: ["1v1 Freestyle Bracket", "Live Vinyl Turntables", "Decibel Judging"],
  },
  {
    id: "evt-5",
    title: "Kavya Sandhya: Bilingual Mushaira",
    societySlug: "sarasva",
    societyName: "Sarasva Literary Society",
    category: "Literature",
    type: "upcoming",
    date: "Dec 12, 2026",
    weekday: "SATURDAY",
    month: "DEC",
    day: "12",
    year: "2026",
    time: "6:30 PM – 9:30 PM IST",
    venue: "Library Verandah",
    status: "UPCOMING",
    description: "Urdu ghazals, Hindi nazms, and English spoken word delivered under ambient courtyard lanterns over warm cardamom tea.",
    accentColor: "#4F46E5",
    passCode: "CC-SRS-2605",
    gcalDate: "20261212T130000Z/20261212T160000Z",
    highlights: ["Classical Urdu Ghazals", "Collegiate Slam Round", "Candlelit Recitals"],
  },
  {
    id: "evt-6",
    title: "Campus Canvas: 48-Hour Mural Marathon",
    societySlug: "nirmiti",
    societyName: "Nirmiti Fine Arts",
    category: "Fine Arts",
    type: "workshop",
    date: "Dec 19, 2026",
    weekday: "SATURDAY",
    month: "DEC",
    day: "19",
    year: "2026",
    time: "10:00 AM – Next Day 10:00 AM",
    venue: "SAC Exterior Brick Facade",
    status: "CONFIRMED STAGE",
    description: "Transforming institute brick walls into monumental multi-panel canvas installations commemorating 27 years of student artistic heritage.",
    accentColor: "#EA580C",
    passCode: "CC-NRM-2606",
    gcalDate: "20261219T043000Z/20261220T043000Z",
    highlights: ["Live Graffiti Murals", "Open Student Canvas", "Institute Archive Theme"],
  },
  {
    id: "evt-7",
    title: "Effervescence '27: Annual Cultural Festival",
    societySlug: "council",
    societyName: "Cultural Council & All 6 Societies",
    category: "Flagship Festival",
    type: "flagship",
    date: "Feb 18–21, 2027",
    weekday: "THU–SUN",
    month: "FEB",
    day: "18",
    year: "2027",
    time: "4-Day Monumental Spectacle",
    venue: "Main Football Grounds & Campus Amphitheatres",
    status: "HEADLINE FESTIVAL",
    description: "North India's premier collegiate cultural extravaganza. 4 days of celebrity pro-nights, 75+ intercollegiate battles, and 15,000+ festival footfall.",
    accentColor: "#D97706",
    edition: "Edition 22",
    passCode: "CC-EFF-2701",
    gcalDate: "20270218T033000Z/20270221T183000Z",
    highlights: ["Celebrity Pro-Night", "Battle of the Bands", "A'La Mode Fashion Night", "Footloose Dance Solo"],
  },
  {
    id: "evt-8",
    title: "Goonj '27: Annual Theatre Festival",
    societySlug: "rangtarangini",
    societyName: "Rangtarangini Dramatics",
    category: "Dramatics",
    type: "flagship",
    date: "Mar 14–16, 2027",
    weekday: "SUN–TUE",
    month: "MAR",
    day: "14",
    year: "2027",
    time: "5:00 PM – 10:00 PM IST",
    venue: "Main Institute Auditorium",
    status: "CONFIRMED STAGE",
    description: "A 3-day proscenium theatre festival showcasing full-length stage productions, mono-acts, and original scripts from colleges nationwide.",
    accentColor: "#B91C1C",
    edition: "Annual Gala",
    passCode: "CC-GNJ-2702",
    gcalDate: "20270314T113000Z/20270316T163000Z",
    highlights: ["Full-Length Stage Drama", "Mono-Act Monologues", "Original Scriptwriting"],
  },
];

const CATEGORY_FILTERS = [
  { label: "All Events", value: "ALL", icon: Sparkles },
  { label: "Music", value: "Music", icon: Music },
  { label: "Dramatics", value: "Dramatics", icon: Theater },
  { label: "Dance", value: "Dance", icon: Flame },
  { label: "Literature", value: "Literature", icon: Feather },
  { label: "Fine Arts", value: "Fine Arts", icon: Palette },
  { label: "Media", value: "Media", icon: Camera },
  { label: "Flagship", value: "Flagship Festival", icon: Radio },
];

function getCategoryIcon(cat: TimelineEvent["category"]) {
  switch (cat) {
    case "Music":
      return Music;
    case "Dramatics":
      return Theater;
    case "Dance":
      return Flame;
    case "Literature":
      return Feather;
    case "Fine Arts":
      return Palette;
    case "Media":
      return Camera;
    case "Flagship Festival":
      return Radio;
    default:
      return Sparkles;
  }
}

function getGoogleCalendarUrl(evt: TimelineEvent) {
  const text = encodeURIComponent(evt.title);
  const details = encodeURIComponent(
    `${evt.description}\n\n🎭 Category: ${evt.category}\n🏛 Society: ${evt.societyName}\n🎟 Pass Code: ${evt.passCode}\n📍 Venue: ${evt.venue}\n\nCultural Council • IIIT Allahabad`
  );
  const location = encodeURIComponent(`${evt.venue}, IIIT Allahabad, Prayagraj, UP, India`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${evt.gcalDate}&details=${details}&location=${location}`;
}

export default function EventTimelineSection() {
  const [events, setEvents] = useState<TimelineEvent[]>(TIMELINE_EVENTS);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/public/events")
      .then((res) => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.events;
        if (isMounted && Array.isArray(list) && list.length > 0) {
          setEvents(list);
        }
      })
      .catch((err) => {
        // Fallback to static TIMELINE_EVENTS silently
        console.debug("Timeline events dynamic sync:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleSave = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedEventIds((prev) => {
      const isSaved = prev.includes(id);
      const next = isSaved ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(isSaved ? `Removed "${title}" from your passes` : `Pass for "${title}" saved to your itinerary!`);
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleShare = (evt: TimelineEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/events#${evt.id}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedId(evt.id);
        showToast(`Event link copied to clipboard!`);
        setTimeout(() => setCopiedId(null), 2000);
      });
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      return activeCategory === "ALL" || evt.category === activeCategory;
    });
  }, [events, activeCategory]);

  return (
    <section id="timeline" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-t border-stone-300/80 overflow-hidden select-none">
      {/* Background Decorative Ambient Radial Gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* 1. SECTION HEADER */}
        <div className="border-b border-stone-300/80 pb-6 mb-10 sm:mb-14">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.02]">
            Upcoming Events &amp; Performances
          </h2>

          {/* 2. CATEGORY FILTER PILLS */}
          <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-stone-200/80 font-mono text-xs">
            {CATEGORY_FILTERS.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                    isActive
                      ? "bg-stone-900 text-white border-stone-900 font-semibold shadow-xs scale-105"
                      : "bg-[#F4F1EA] text-stone-700 border-stone-300/90 hover:border-stone-500 hover:text-ink"
                  }`}
                >
                  <Icon className={`w-3 h-3 ${isActive ? "text-amber-400" : "text-stone-500"}`} />
                  <span className="text-[11px] uppercase tracking-wider">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. TIMELINE BODY */}
        {filteredEvents.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#F4F1EA] border border-stone-300/80 p-8 space-y-4">
            <Ticket className="w-10 h-10 mx-auto text-stone-400 stroke-1" />
            <h3 className="font-serif text-2xl font-bold text-ink">No scheduled events in this category</h3>
            <p className="font-mono text-xs text-ink-muted">Select &ldquo;All Events&rdquo; to view the complete calendar.</p>
            <button
              onClick={() => setActiveCategory("ALL")}
              className="px-5 py-2 rounded-full bg-stone-900 text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              View All Events
            </button>
          </div>
        ) : (
          /* CINEMATIC TIMELINE WITH GLOWING SPINE & PASS STUBS */
          <div className="relative">
            {/* Ambient Vertical Glowing Laser Spine */}
            <div className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-[2px]">
              <div className="w-full h-full bg-gradient-to-b from-stone-400 via-amber-600/50 to-stone-400" />
              <div className="absolute top-0 bottom-0 -left-1 -right-1 bg-amber-500/10 blur-sm pointer-events-none" />
            </div>

            <div className="space-y-12 sm:space-y-16">
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((evt, index) => {
                  const isEven = index % 2 === 0;
                  const Icon = getCategoryIcon(evt.category);
                  const isSaved = savedEventIds.includes(evt.id);
                  const isFlagship = evt.type === "flagship";

                  return (
                    <motion.div
                      key={evt.id}
                      layout
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.45, delay: index * 0.04 }}
                      className={`relative flex flex-col md:flex-row items-start md:items-center ${
                        isEven ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Spine Node: Glowing Round Jewel with Category Icon */}
                      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                        <div
                          className="w-12 h-12 rounded-full bg-white border-2 shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-125 cursor-pointer group"
                          style={{ borderColor: evt.accentColor }}
                          onClick={() => setSelectedEvent(evt)}
                          title={`Inspect ${evt.title}`}
                        >
                          <span
                            className="absolute inset-0 rounded-full opacity-20 animate-ping group-hover:opacity-40"
                            style={{ backgroundColor: evt.accentColor }}
                          />
                          <Icon className="w-5 h-5 transition-transform group-hover:rotate-12" style={{ color: evt.accentColor }} />
                        </div>
                      </div>

                      {/* Timeline Pass Card Container */}
                      <div className="w-full pl-16 md:pl-0 md:w-1/2 md:px-8 lg:px-12">
                        <div
                          onClick={() => setSelectedEvent(evt)}
                          className={`group relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-1.5 flex flex-col sm:flex-row bg-[#FAF8F5] ${
                            isFlagship
                              ? "border-amber-400/90 ring-1 ring-amber-300/40 bg-gradient-to-br from-[#FAF8F5] via-amber-50/50 to-[#FAF8F5]"
                              : "border-stone-300/90 hover:border-stone-400"
                          }`}
                        >
                          {/* Ambient Card Corner Glow */}
                          <div
                            className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity"
                            style={{ backgroundColor: evt.accentColor }}
                          />

                          {/* LEFT COLUMN: EVENT PASS STUB */}
                          <div className="relative shrink-0 w-full sm:w-28 bg-[#F4F1EA] p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-dashed border-stone-300/90 flex flex-row sm:flex-col items-center justify-between sm:justify-center text-center">
                            {/* Physical Circular Ticket Punch Cutouts */}
                            <div className="hidden sm:block absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-[#FAF8F5] border border-stone-300/80 z-10" />
                            <div className="hidden sm:block absolute -bottom-2.5 -right-2.5 w-5 h-5 rounded-full bg-[#FAF8F5] border border-stone-300/80 z-10" />

                            <div className="space-y-0.5">
                              <span className="font-mono text-[9px] uppercase tracking-widest text-amber-800 font-bold block">
                                {evt.weekday}
                              </span>
                              <span className="font-serif text-3xl sm:text-4xl font-black text-ink leading-none tracking-tight block">
                                {evt.day}
                              </span>
                              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600 block">
                                {evt.month} &apos;{evt.year.slice(2)}
                              </span>
                            </div>

                            {/* Ticket Barcode Motif */}
                            <div className="pt-2 sm:pt-4 flex flex-col items-center space-y-1">
                              <div className="flex items-center gap-[1.5px] opacity-40 group-hover:opacity-80 transition-opacity">
                                {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3].map((w, i) => (
                                  <div key={i} className="h-3.5 bg-ink" style={{ width: `${w}px` }} />
                                ))}
                              </div>
                              <span className="font-mono text-[8px] text-ink-faint tracking-wider block">
                                #{evt.passCode}
                              </span>
                            </div>
                          </div>

                          {/* RIGHT COLUMN: EVENT DETAILS */}
                          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                            {/* Top Category, Society, & Status Bar */}
                            <div className="space-y-2.5">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: evt.accentColor }} />
                                  <span className="font-semibold text-ink">{evt.societyName}</span>
                                  <span>•</span>
                                  <span className="font-medium text-amber-800">{evt.category}</span>
                                </div>

                                {/* Status Pill Badge */}
                                <span
                                  className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider ${
                                    evt.status === "HEADLINE FESTIVAL"
                                      ? "bg-amber-600 text-white shadow-2xs"
                                      : evt.status === "REGISTRATIONS OPEN"
                                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300/80"
                                      : "bg-stone-200/80 text-stone-700"
                                  }`}
                                >
                                  {evt.status}
                                </span>
                              </div>

                              {/* Event Headline */}
                              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink leading-snug group-hover:text-amber-950 transition-colors">
                                {evt.title}
                              </h3>

                              {/* Curated Description */}
                              <p className="font-sans text-xs sm:text-[13px] text-stone-700 leading-relaxed line-clamp-2">
                                {evt.description}
                              </p>

                              {/* Highlight Pills */}
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {evt.highlights.map((h, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 rounded-md bg-stone-100/90 border border-stone-200 text-[10px] font-mono text-stone-600"
                                  >
                                    {h}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Card Footer: Metadata and Interactive Quick-Actions */}
                            <div className="pt-3 border-t border-stone-200/90 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                              <div className="flex flex-wrap items-center gap-3 text-ink-muted text-[11px]">
                                <span className="inline-flex items-center gap-1 text-stone-700">
                                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                                  <span>{evt.time}</span>
                                </span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1 text-stone-700">
                                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                                  <span className="truncate max-w-[160px]">{evt.venue}</span>
                                </span>
                              </div>

                              {/* Quick Actions: GCal Sync & Remind Bookmark */}
                              <div className="flex items-center gap-2">
                                <a
                                  href={getGoogleCalendarUrl(evt)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-stone-100 border border-stone-300 text-[10px] text-ink font-semibold transition-colors shadow-2xs"
                                  title="Add to Google Calendar"
                                >
                                  <Calendar className="w-3 h-3 text-amber-700" />
                                  <span>Add GCal</span>
                                </a>

                                <button
                                  type="button"
                                  onClick={(e) => toggleSave(evt.id, evt.title, e)}
                                  className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                                    isSaved
                                      ? "bg-amber-600 border-amber-600 text-white"
                                      : "bg-white border-stone-300 text-stone-500 hover:text-ink hover:border-stone-400"
                                  }`}
                                  aria-label="Save pass"
                                  title={isSaved ? "Saved to Passes" : "Save Pass"}
                                >
                                  <Bookmark className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* 4. BOTTOM PRODUCTION CALLOUT BANNER */}
        <div className="mt-16 sm:mt-20 rounded-3xl bg-gradient-to-br from-white via-amber-50/30 to-[#F4F1EA] border border-stone-300/90 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-amber-800 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>CAMPUS CULTURAL CALENDAR • ALL SOCIETIES WELCOME</span>
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-ink leading-tight">
              Propose a Performance, Workshop, or Jam Session?
            </h4>
            <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
              Interested in organizing an event or performing? Reach out to the respective society coordinators or connect with the Cultural Council team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/events"
              className="px-6 py-3 rounded-full bg-ink text-[#FAF8F5] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors shadow-xs flex items-center gap-2"
            >
              <span>View Full Calendar</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 5. INTERACTIVE EVENT INSPECTION MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-md animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-xl bg-[#FAF8F5] border border-stone-300 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6"
            >
              {/* Modal Top Header with Barcode & Close Button */}
              <div className="flex items-center justify-between border-b border-stone-200/90 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedEvent.accentColor }} />
                  <span className="font-mono text-xs uppercase tracking-widest text-ink font-bold">
                    EVENT PASS #{selectedEvent.passCode}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1.5 rounded-full hover:bg-stone-200/60 text-stone-500 hover:text-ink transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Event Title & Category */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-amber-800 font-semibold">
                  <span>{selectedEvent.societyName}</span>
                  <span>//</span>
                  <span>{selectedEvent.category}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-ink leading-tight">
                  {selectedEvent.title}
                </h3>
              </div>

              {/* Itinerary Schedule Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white border border-stone-200 font-mono text-xs">
                <div>
                  <span className="text-[10px] uppercase text-ink-faint block">CALENDAR DATE</span>
                  <span className="font-bold text-ink">{selectedEvent.date}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-ink-faint block">SCHEDULED TIME</span>
                  <span className="font-bold text-ink">{selectedEvent.time}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-stone-100">
                  <span className="text-[10px] uppercase text-ink-faint block">STAGE VENUE</span>
                  <span className="font-bold text-ink">{selectedEvent.venue}</span>
                </div>
              </div>

              {/* Curated Narrative */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint font-semibold block">
                  ABOUT THIS EVENT
                </span>
                <p className="font-sans text-sm text-stone-700 leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Highlights List */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint font-semibold block">
                  KEY HIGHLIGHTS
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.highlights.map((h, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-stone-200/80 font-mono text-xs text-stone-800 font-medium">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-stone-200/90 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={getGoogleCalendarUrl(selectedEvent)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 transition-colors shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Sync with GCal</span>
                  </a>

                  <button
                    onClick={(e) => handleShare(selectedEvent, e)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-stone-300 bg-white hover:bg-stone-100 font-mono text-xs text-ink transition-colors cursor-pointer"
                  >
                    {copiedId === selectedEvent.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedId === selectedEvent.id ? "Copied" : "Share"}</span>
                  </button>
                </div>

                {selectedEvent.societySlug !== "council" && (
                  <Link
                    href={`/societies/${selectedEvent.societySlug}`}
                    className="font-mono text-xs uppercase tracking-wider text-amber-800 hover:text-ink font-semibold inline-flex items-center gap-1"
                  >
                    <span>View Society</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 font-mono text-xs border border-stone-700"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
