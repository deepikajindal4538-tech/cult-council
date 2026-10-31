"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Copy,
  Check,
  Search,
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

  const patrons = councilRoster.filter((p) => p.tier === "patron");
  const executives = councilRoster.filter((p) => p.tier === "executive");
  const councilMembers = councilRoster.filter((p) => p.tier === "council");

  // Renders card matching the exact user-uploaded reference design
  const renderCard = (person: CouncilPerson) => {
    const isFailed = failedImages[person.id];

    return (
      <div
        key={person.id}
        className="bg-[#F4F1EA] rounded-3xl border border-stone-300 p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300"
      >
        <div>
          {/* Rounded Rectangular Photo Frame */}
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-stone-200 mb-5 shadow-inner">
            {!isFailed ? (
              <Image
                src={person.photoUrl}
                alt={`${person.name} - ${person.designation}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top hover:scale-105 transition-transform duration-500 ease-out"
                onError={() => handleImageError(person.id)}
                priority={person.order <= 5}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-stone-300 text-stone-700 font-mono font-bold text-2xl">
                <span>{person.avatarFallback}</span>
              </div>
            )}
          </div>

          {/* Name & Typography */}
          <div className="space-y-1 text-left">
            <h3 className="font-serif text-2xl font-bold text-ink leading-snug">
              {person.name}
            </h3>
            <p className="font-mono text-xs uppercase font-bold tracking-wider text-amber-900 mt-1">
              {person.designation}
            </p>
            <p className="font-sans text-xs text-stone-500 mt-0.5">
              {person.department}
            </p>
          </div>
        </div>

        {/* Bottom Bar: Mail Link on left, Square Copy Button on right */}
        <div className="pt-4 mt-5 border-t border-stone-200/90 flex items-center justify-between text-xs font-mono">
          <a
            href={`mailto:${person.email}`}
            className="inline-flex items-center gap-1.5 text-stone-800 hover:text-stone-600 underline underline-offset-2 truncate max-w-[210px]"
            title={`Email: ${person.email}`}
          >
            <Mail className="w-3.5 h-3.5 shrink-0 text-stone-700" />
            <span className="truncate">{person.email}</span>
          </a>
          <button
            onClick={() => handleCopyEmail(person.email)}
            className="p-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-600 hover:text-ink transition-colors shadow-2xs cursor-pointer shrink-0 ml-2"
            title="Copy email address"
            aria-label="Copy email address"
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
  };

  const matchesSearch = (person: CouncilPerson) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      person.name.toLowerCase().includes(q) ||
      person.rollNumber.toLowerCase().includes(q) ||
      person.designation.toLowerCase().includes(q) ||
      person.portfolio.toLowerCase().includes(q) ||
      person.department.toLowerCase().includes(q)
    );
  };

  return (
    <section
      id="leadership-team"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-ink border-y border-stone-300 selection:bg-amber-100 selection:text-amber-900"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Header Tag: — COUNCIL OFFICE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-300">
          <div>
            <div className="flex items-center gap-2 text-amber-800 font-mono text-xs uppercase tracking-widest mb-2 font-bold">
              <span className="w-6 h-0.5 bg-amber-700 inline-block" />
              <span>COUNCIL OFFICE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ink">
              Executive Body &amp; Council Members
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              The apex cultural governing office of IIIT Allahabad — comprising the Dean SA, Faculty Coordinator, Executive Directors, and the 9 autonomous wing heads.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, roll no, role..."
              className="w-full pl-9 pr-3.5 py-2 bg-white text-ink font-mono text-xs rounded-full border border-stone-300 focus:outline-none focus:border-amber-700 transition-colors placeholder:text-stone-400 shadow-2xs"
            />
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-6 mb-12">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-ink text-canvas font-bold shadow-xs"
                : "bg-white text-stone-600 hover:text-ink border border-stone-300"
            }`}
          >
            All Members ({councilRoster.length})
          </button>
          <button
            onClick={() => setActiveTab("executives")}
            className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "executives"
                ? "bg-ink text-canvas font-bold shadow-xs"
                : "bg-white text-stone-600 hover:text-ink border border-stone-300"
            }`}
          >
            Executive Office (3)
          </button>
          <button
            onClick={() => setActiveTab("council_members")}
            className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "council_members"
                ? "bg-ink text-canvas font-bold shadow-xs"
                : "bg-white text-stone-600 hover:text-ink border border-stone-300"
            }`}
          >
            9 Council Members ({councilMembers.length})
          </button>
          <button
            onClick={() => setActiveTab("patrons")}
            className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "patrons"
                ? "bg-ink text-canvas font-bold shadow-xs"
                : "bg-white text-stone-600 hover:text-ink border border-stone-300"
            }`}
          >
            Dean SA &amp; Faculty Coord (2)
          </button>
        </div>

        {/* 1. TIER 1: PATRON & FACULTY ADVISORY (Dean SA & Faculty Coordinator) */}
        {(activeTab === "all" || activeTab === "patrons") && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-800 font-semibold">
                PATRON &amp; FACULTY COORDINATOR
              </span>
              <div className="h-px bg-stone-300 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {patrons.filter(matchesSearch).map(renderCard)}
            </div>
          </div>
        )}

        {/* 2. TIER 2: EXECUTIVE DIRECTORS (President, Secretary, Treasurer) — 3-card arrangement */}
        {(activeTab === "all" || activeTab === "executives") && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-800 font-semibold">
                EXECUTIVE DIRECTORS (PRESIDENT • SECRETARY • TREASURER)
              </span>
              <div className="h-px bg-stone-300 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {executives.filter(matchesSearch).map(renderCard)}
            </div>
          </div>
        )}

        {/* 3. TIER 3: THE 9 COUNCIL MEMBERS — 3x3 grid */}
        {(activeTab === "all" || activeTab === "council_members") && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-800 font-semibold">
                THE 9 COUNCIL MEMBERS (AUTONOMOUS WINGS)
              </span>
              <div className="h-px bg-stone-300 flex-1" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {councilMembers.filter(matchesSearch).map(renderCard)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
