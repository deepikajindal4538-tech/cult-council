"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  Users,
  Search,
  Award,
  Crown,
  GraduationCap,
  Briefcase,
  Layers,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { councilRoster, CouncilPerson } from "@/lib/councilData";

type FilterTab = "all" | "patrons" | "executives" | "council_members";

export function CouncilLeadershipSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  // Filter members based on selected tab and search
  const filteredMembers = councilRoster.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.portfolio.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === "all") return true;
    if (activeTab === "patrons") {
      return person.category === "dean_sa" || person.category === "faculty_coordinator";
    }
    if (activeTab === "executives") {
      return (
        person.category === "president" ||
        person.category === "general_secretary" ||
        person.category === "treasurer"
      );
    }
    if (activeTab === "council_members") {
      return person.category === "council_member";
    }
    return true;
  });

  // Highlighted 5 core officials
  const coreLeadership = councilRoster.filter((p) => p.tier !== "council");
  // 12 Council members
  const councilMembers = councilRoster.filter((p) => p.tier === "council");

  const getBadgeColor = (category: CouncilPerson["category"]) => {
    switch (category) {
      case "dean_sa":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "faculty_coordinator":
        return "bg-stone-200 text-stone-900 border-stone-400";
      case "president":
        return "bg-rose-100 text-rose-900 border-rose-300";
      case "general_secretary":
        return "bg-indigo-100 text-indigo-900 border-indigo-300";
      case "treasurer":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      case "council_member":
      default:
        return "bg-[#FAF8F5] text-stone-700 border-stone-300";
    }
  };

  const getRoleIcon = (category: CouncilPerson["category"]) => {
    switch (category) {
      case "dean_sa":
        return <Crown className="w-3.5 h-3.5 text-amber-700" />;
      case "faculty_coordinator":
        return <GraduationCap className="w-3.5 h-3.5 text-stone-700" />;
      case "president":
        return <Award className="w-3.5 h-3.5 text-rose-700" />;
      case "general_secretary":
        return <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />;
      case "treasurer":
        return <Briefcase className="w-3.5 h-3.5 text-emerald-700" />;
      default:
        return <Users className="w-3.5 h-3.5 text-stone-600" />;
    }
  };

  return (
    <section id="leadership-team" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* 1. Header & Roster Ledger */}
      <div className="border-b border-stone-300 pb-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>STATUTORY BODY • COUNCIL ROSTER (2025–2026)</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ink leading-tight">
              Council Leadership &amp; Members
            </h2>
            <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
              Entrusted with institutional governance, creative direction, and festival management. Comprising the <strong>Dean SA</strong>, <strong>Faculty Coordinator</strong>, <strong>President</strong>, <strong>General Secretary</strong>, <strong>Treasurer</strong>, and <strong>12 Council Members</strong> across autonomous society wings.
            </p>
          </div>

          {/* Quick Roster Metrics Counter */}
          <div className="flex flex-wrap items-center gap-2 bg-[#F4F1EA] p-3 rounded-xl border border-stone-300 text-xs font-mono">
            <div className="px-3 py-1.5 bg-white rounded-lg border border-stone-200 shadow-2xs">
              <span className="text-amber-800 font-bold">01</span> Dean SA
            </div>
            <div className="px-3 py-1.5 bg-white rounded-lg border border-stone-200 shadow-2xs">
              <span className="text-stone-800 font-bold">01</span> Faculty Coord.
            </div>
            <div className="px-3 py-1.5 bg-white rounded-lg border border-stone-200 shadow-2xs">
              <span className="text-rose-800 font-bold">01</span> President
            </div>
            <div className="px-3 py-1.5 bg-white rounded-lg border border-stone-200 shadow-2xs">
              <span className="text-indigo-800 font-bold">01</span> Gen Sec
            </div>
            <div className="px-3 py-1.5 bg-white rounded-lg border border-stone-200 shadow-2xs">
              <span className="text-emerald-800 font-bold">01</span> Treasurer
            </div>
            <div className="px-3 py-1.5 bg-amber-500 text-ink font-bold rounded-lg border border-amber-600 shadow-2xs">
              12 Council Members
            </div>
          </div>
        </div>

        {/* 2. Interactive Navigation Filters & Search Bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-stone-200">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-ink text-canvas font-bold shadow-xs"
                  : "bg-white text-stone-600 hover:text-ink border border-stone-300"
              }`}
            >
              All Officials ({councilRoster.length})
            </button>
            <button
              onClick={() => setActiveTab("patrons")}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "patrons"
                  ? "bg-ink text-canvas font-bold shadow-xs"
                  : "bg-white text-stone-600 hover:text-ink border border-stone-300"
              }`}
            >
              Dean SA &amp; Faculty Coord (2)
            </button>
            <button
              onClick={() => setActiveTab("executives")}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "executives"
                  ? "bg-ink text-canvas font-bold shadow-xs"
                  : "bg-white text-stone-600 hover:text-ink border border-stone-300"
              }`}
            >
              Executive Trio (3)
            </button>
            <button
              onClick={() => setActiveTab("council_members")}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "council_members"
                  ? "bg-ink text-canvas font-bold shadow-xs"
                  : "bg-white text-stone-600 hover:text-ink border border-stone-300"
              }`}
            >
              12 Council Members ({councilMembers.length})
            </button>
          </div>

          <div className="relative min-w-[240px] max-w-xs">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role, wing..."
              className="w-full pl-9 pr-3 py-1.5 bg-white text-ink font-mono text-xs rounded-full border border-stone-300 focus:outline-none focus:border-ink transition-colors placeholder:text-stone-400"
            />
          </div>
        </div>
      </div>

      {/* 3. SECTION A: APEX & EXECUTIVE LEADERSHIP (The 5 Key Positions) */}
      {(activeTab === "all" || activeTab === "patrons" || activeTab === "executives") && (
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-faint font-semibold">
              PART I // APEX &amp; EXECUTIVE DIRECTORS (5 POSITIONS)
            </span>
            <div className="h-px bg-stone-300 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {coreLeadership
              .filter((person) => {
                const matchesSearch =
                  person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  person.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  person.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  person.portfolio.toLowerCase().includes(searchQuery.toLowerCase());

                if (!matchesSearch) return false;
                if (activeTab === "patrons") {
                  return person.category === "dean_sa" || person.category === "faculty_coordinator";
                }
                if (activeTab === "executives") {
                  return (
                    person.category === "president" ||
                    person.category === "general_secretary" ||
                    person.category === "treasurer"
                  );
                }
                return true;
              })
              .map((person) => {
                const isFailed = failedImages[person.id];
                return (
                  <div
                    key={person.id}
                    className="group bg-[#F4F1EA] rounded-2xl border border-stone-300 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-ink/60 transition-all duration-300"
                  >
                    <div>
                      {/* Top Header Badge */}
                      <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-5">
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-mono uppercase font-bold tracking-wider ${getBadgeColor(
                            person.category
                          )}`}
                        >
                          {getRoleIcon(person.category)}
                          <span>{person.shortRole}</span>
                        </div>
                        <span className="font-mono text-[10px] text-ink-faint uppercase tracking-widest">
                          POSITION #{person.order}
                        </span>
                      </div>

                      {/* Photo Portrait Frame */}
                      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-200 border border-stone-300 mb-5 shadow-inner">
                        {!isFailed ? (
                          <Image
                            src={person.photoUrl}
                            alt={`${person.name} - ${person.designation}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                            onError={() => handleImageError(person.id)}
                            priority={person.order <= 3}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-800 text-canvas font-mono">
                            <span className="text-3xl font-serif font-bold tracking-wider">
                              {person.avatarFallback}
                            </span>
                            <span className="text-[10px] tracking-widest uppercase text-stone-400 mt-1">
                              {person.shortRole}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                      </div>

                      {/* Info & Designation */}
                      <div className="space-y-2">
                        <h3 className="font-serif text-2xl font-bold text-ink leading-snug group-hover:text-amber-900 transition-colors">
                          {person.name}
                        </h3>
                        <p className="font-mono text-xs uppercase tracking-wide text-amber-800 font-semibold">
                          {person.designation}
                        </p>
                        <p className="font-sans text-xs text-ink-muted">
                          {person.department}
                        </p>
                        <div className="pt-2">
                          <p className="font-serif italic text-xs text-stone-600 line-clamp-2">
                            &ldquo;{person.bio}&rdquo;
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions Bar */}
                    <div className="pt-5 mt-5 border-t border-stone-200/90 flex items-center justify-between text-xs font-mono">
                      <a
                        href={`mailto:${person.email}`}
                        className="text-ink hover:text-amber-800 underline flex items-center gap-1.5 transition-colors"
                        title={`Send email to ${person.email}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[160px] sm:max-w-[200px]">
                          {person.email}
                        </span>
                      </a>
                      <button
                        onClick={() => handleCopyEmail(person.email)}
                        className="p-1.5 rounded bg-white hover:bg-stone-200 border border-stone-300 text-stone-700 transition-colors cursor-pointer"
                        title="Copy email"
                        aria-label="Copy email"
                      >
                        {copiedEmail === person.email ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* 4. SECTION B: THE 12 COUNCIL MEMBERS */}
      {(activeTab === "all" || activeTab === "council_members") && (
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-faint font-semibold">
              PART II // THE 12 COUNCIL MEMBERS (AUTONOMOUS WINGS &amp; OPERATIONS)
            </span>
            <div className="h-px bg-stone-300 flex-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {councilMembers
              .filter((person) => {
                return (
                  person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  person.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  person.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  person.portfolio.toLowerCase().includes(searchQuery.toLowerCase())
                );
              })
              .map((person, index) => {
                const isFailed = failedImages[person.id];
                const memberNum = String(index + 1).padStart(2, "0");

                return (
                  <div
                    key={person.id}
                    className="group bg-[#FAF8F5] rounded-xl border border-stone-300 p-5 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-ink/50 transition-all duration-300"
                  >
                    <div>
                      {/* Photo Portrait Frame */}
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-stone-200 border border-stone-300 mb-4 shadow-inner">
                        {!isFailed ? (
                          <Image
                            src={person.photoUrl}
                            alt={`${person.name} - ${person.designation}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            onError={() => handleImageError(person.id)}
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-800 text-canvas font-mono">
                            <span className="text-2xl font-serif font-bold">
                              {person.avatarFallback}
                            </span>
                            <span className="text-[9px] tracking-widest uppercase text-stone-400 mt-1">
                              MEMBER {memberNum}
                            </span>
                          </div>
                        )}
                        <div className="absolute top-2 left-2 bg-black/75 text-canvas text-[9px] font-mono uppercase px-2 py-0.5 rounded tracking-widest backdrop-blur-xs">
                          MEMBER [{memberNum}]
                        </div>
                      </div>

                      {/* Designation & Details */}
                      <div className="space-y-1.5">
                        <div className="inline-block px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-900 font-mono text-[10px] uppercase font-bold tracking-wider">
                          COUNCIL MEMBER
                        </div>
                        <h4 className="font-serif text-lg font-bold text-ink leading-tight group-hover:text-amber-900 transition-colors">
                          {person.name}
                        </h4>
                        <p className="font-mono text-[11px] text-stone-700 font-medium leading-snug">
                          {person.designation}
                        </p>
                        <p className="font-sans text-[11px] text-ink-muted">
                          {person.department}
                        </p>
                        <p className="font-mono text-[10px] text-amber-800/80 pt-1">
                          {person.portfolio}
                        </p>
                      </div>
                    </div>

                    {/* Contact Link */}
                    <div className="pt-4 mt-4 border-t border-stone-200 flex items-center justify-between text-xs font-mono">
                      <a
                        href={`mailto:${person.email}`}
                        className="text-ink hover:text-amber-800 underline truncate max-w-[170px] flex items-center gap-1"
                        title={person.email}
                      >
                        <Mail className="w-3 h-3 text-stone-500 shrink-0" />
                        <span className="truncate">{person.email}</span>
                      </a>
                      <button
                        onClick={() => handleCopyEmail(person.email)}
                        className="p-1 rounded bg-white hover:bg-stone-200 border border-stone-300 text-stone-600 transition-colors cursor-pointer shrink-0"
                        title="Copy email"
                        aria-label="Copy email"
                      >
                        {copiedEmail === person.email ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* 5. Council Governance Code Note */}
      <div className="mt-16 p-6 rounded-2xl bg-[#F4F1EA] border border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-muted">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
          <span>
            <strong>Official Electoral Mandate:</strong> The Cultural Council conducts statutory annual selections and student elections overseen by the Gymkhana &amp; Dean of Student Affairs (DoSA).
          </span>
        </div>
        <a
          href="mailto:culturalcouncil@iiita.ac.in"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-canvas rounded hover:bg-stone-800 transition-colors whitespace-nowrap text-[11px] uppercase tracking-wider"
        >
          <span>Contact Council Secretariat</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
