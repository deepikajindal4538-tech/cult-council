"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Users,
  ShieldAlert,
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  LogOut,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  Radio,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  Camera,
  Layers,
  Music,
  Theater,
  Flame,
  Feather,
  Palette,
  Timer,
  Lock,
  KeyRound,
  ArrowUpRight,
  X,
  Save,
} from "lucide-react";
import type { TimelineEvent, CountdownConfig } from "@/lib/adminData";
import type { CouncilPerson } from "@/lib/councilData";

export default function AdminPortalClient() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active section tab: 'overview' | 'events' | 'countdown' | 'council'
  const [activeTab, setActiveTab] = useState<"overview" | "events" | "countdown" | "council">("overview");

  // Data states
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [countdown, setCountdown] = useState<CountdownConfig | null>(null);
  const [council, setCouncil] = useState<CouncilPerson[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Search & Filters
  const [eventSearch, setEventSearch] = useState("");
  const [eventCategoryFilter, setEventCategoryFilter] = useState("ALL");
  const [councilSearch, setCouncilSearch] = useState("");
  const [councilTierFilter, setCouncilTierFilter] = useState("ALL");

  // Modals / Forms
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CouncilPerson | null>(null);
  const [isCouncilModalOpen, setIsCouncilModalOpen] = useState(false);

  // Notification Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  }, []);

  // Check auth on mount
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/auth/status");
      const data = await res.json();
      setIsAuthenticated(Boolean(data.authenticated));
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Fetch all administrative data once authenticated
  const fetchAllData = useCallback(async () => {
    setDataLoading(true);
    try {
      const [eventsRes, countdownRes, councilRes] = await Promise.all([
        fetch("/api/admin/events"),
        fetch("/api/admin/countdown"),
        fetch("/api/admin/council"),
      ]);

      if (eventsRes.ok) {
        const d = await eventsRes.json();
        setEvents(d.events || []);
      }
      if (countdownRes.ok) {
        const d = await countdownRes.json();
        setCountdown(d.config || null);
      }
      if (councilRes.ok) {
        const d = await councilRes.json();
        setCouncil(d.members || []);
      }
    } catch (err) {
      console.error("Failed fetching admin data:", err);
      showToast("Error synchronizing admin data", "error");
    } finally {
      setDataLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated, fetchAllData]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkeyInput.trim()) return;

    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey: passkeyInput.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || "Authentication failed. Access denied.");
        return;
      }

      setIsAuthenticated(true);
      setPasskeyInput("");
      showToast("Administrative terminal cleared and unlocked!");
    } catch {
      setLoginError("Network connection error connecting to admin gateway.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      showToast("Terminal session closed successfully.");
    } catch {
      setIsAuthenticated(false);
    }
  };

  // =========================================================
  // EVENT TIMELINE HANDLERS
  // =========================================================
  const handleSaveEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const eventPayload: Partial<TimelineEvent> = {
      title: formData.get("title") as string,
      societySlug: formData.get("societySlug") as string,
      societyName: formData.get("societyName") as string,
      category: formData.get("category") as TimelineEvent["category"],
      type: formData.get("type") as TimelineEvent["type"],
      date: formData.get("date") as string,
      weekday: formData.get("weekday") as string,
      month: formData.get("month") as string,
      day: formData.get("day") as string,
      year: formData.get("year") as string,
      time: formData.get("time") as string,
      venue: formData.get("venue") as string,
      status: formData.get("status") as TimelineEvent["status"],
      description: formData.get("description") as string,
      accentColor: formData.get("accentColor") as string,
      passCode: formData.get("passCode") as string,
      gcalDate: formData.get("gcalDate") as string,
      highlights: ((formData.get("highlights") as string) || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (editingEvent?.id) {
        // Update
        const res = await fetch("/api/admin/events", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingEvent.id, ...eventPayload }),
        });
        if (!res.ok) throw new Error("Failed to update event");
        showToast(`Event "${eventPayload.title}" updated successfully!`);
      } else {
        // Create
        const res = await fetch("/api/admin/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventPayload),
        });
        if (!res.ok) throw new Error("Failed to create event");
        showToast(`Event "${eventPayload.title}" created successfully!`);
      }
      setIsEventModalOpen(false);
      setEditingEvent(null);
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || "Failed to save event", "error");
    }
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/events?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete event");
      showToast(`Event "${title}" deleted.`);
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || "Failed to delete event", "error");
    }
  };

  const handleResetEvents = async () => {
    if (!confirm("Reset all timeline events back to factory seed schedule?")) return;
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      if (!res.ok) throw new Error("Failed to reset events");
      showToast("Timeline events restored to seed defaults.");
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || "Failed to reset events", "error");
    }
  };

  // =========================================================
  // COUNTDOWN & EFFERVESCENCE HANDLERS
  // =========================================================
  const handleSaveCountdown = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload: Partial<CountdownConfig> = {
      festivalName: formData.get("festivalName") as string,
      edition: formData.get("edition") as string,
      theme: formData.get("theme") as string,
      targetDate: new Date(formData.get("targetDate") as string).toISOString(),
      headerTag: formData.get("headerTag") as string,
      subtitleTag: formData.get("subtitleTag") as string,
      announcementText: formData.get("announcementText") as string,
      enabled: formData.get("enabled") === "on",
    };

    try {
      const res = await fetch("/api/admin/countdown", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update countdown");
      showToast("Festival countdown & arena settings saved!");
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || "Failed to update countdown", "error");
    }
  };

  // =========================================================
  // COUNCIL MEMBERS HANDLERS
  // =========================================================
  const handleSaveMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const memberPayload: Partial<CouncilPerson> = {
      name: formData.get("name") as string,
      designation: formData.get("designation") as string,
      shortRole: formData.get("shortRole") as string,
      badgeLabel: formData.get("badgeLabel") as string,
      rollNumber: formData.get("rollNumber") as string,
      category: formData.get("category") as CouncilPerson["category"],
      tier: formData.get("tier") as CouncilPerson["tier"],
      department: formData.get("department") as string,
      photoUrl: formData.get("photoUrl") as string,
      email: formData.get("email") as string,
      avatarFallback: formData.get("avatarFallback") as string,
      bio: formData.get("bio") as string,
      order: parseInt(formData.get("order") as string, 10) || 99,
    };

    try {
      if (editingMember?.id) {
        // Update
        const res = await fetch("/api/admin/council", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingMember.id, ...memberPayload }),
        });
        if (!res.ok) throw new Error("Failed to update member");
        showToast(`Member "${memberPayload.name}" updated successfully!`);
      } else {
        // Create
        const res = await fetch("/api/admin/council", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(memberPayload),
        });
        if (!res.ok) throw new Error("Failed to add council member");
        showToast(`Council member "${memberPayload.name}" added successfully!`);
      }
      setIsCouncilModalOpen(false);
      setEditingMember(null);
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || "Failed to save council member", "error");
    }
  };

  const handleDeleteMember = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the council roster?`)) return;

    try {
      const res = await fetch(`/api/admin/council?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete member");
      showToast(`Member "${name}" removed from roster.`);
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || "Failed to delete member", "error");
    }
  };

  const handleResetCouncil = async () => {
    if (!confirm("Reset council leadership roster back to initial seeds?")) return;
    try {
      const res = await fetch("/api/admin/council", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      if (!res.ok) throw new Error("Failed to reset council");
      showToast("Council roster restored to seed defaults.");
      fetchAllData();
    } catch (err: any) {
      showToast(err.message || "Failed to reset council", "error");
    }
  };

  // Filtered views
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesCat = eventCategoryFilter === "ALL" || e.category === eventCategoryFilter;
      const q = eventSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.societyName.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [events, eventCategoryFilter, eventSearch]);

  const filteredCouncil = useMemo(() => {
    return council.filter((m) => {
      const matchesTier = councilTierFilter === "ALL" || m.tier === councilTierFilter;
      const q = councilSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.designation.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q);
      return matchesTier && matchesSearch;
    });
  }, [council, councilTierFilter, councilSearch]);

  // Live countdown calculation for dashboard preview
  const countdownPreview = useMemo(() => {
    if (!countdown?.targetDate) return { days: 0, hours: 0, mins: 0, secs: 0 };
    const now = Date.now();
    const target = new Date(countdown.targetDate).getTime();
    const diff = Math.max(0, target - now);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    };
  }, [countdown]);

  // ---------------------------------------------------------
  // 1. LOGIN SCREEN (IF NOT AUTHENTICATED)
  // ---------------------------------------------------------
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0C0A09] flex items-center justify-center p-4">
        <div className="flex items-center gap-3 font-mono text-xs text-amber-500">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>INITIALIZING ADMINISTRATIVE SECURITY HANDSHAKE...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C0A09] flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden select-none">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <header className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/images/council-logo.png"
                alt="Cultural Council Logo"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="font-serif font-bold text-white text-base tracking-tight block">
                Cultural Council IIIT Allahabad
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-stone-400">
                Cultural Council • Administrative Terminal
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-400 hover:text-white transition-colors"
          >
            <span>Public Site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </header>

        {/* Center Login Box */}
        <div className="max-w-md w-full mx-auto my-auto z-10">
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Lock className="w-5 h-5" />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Council Command Center
              </h1>
              <p className="font-mono text-xs text-stone-400 leading-relaxed">
                Enter your administrative clearance passkey to manage timeline events, arena countdowns, and leadership rosters.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-1.5 font-semibold">
                  Administrative Passkey
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="password"
                    value={passkeyInput}
                    onChange={(e) => setPasskeyInput(e.target.value)}
                    placeholder="••••••••••••••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-800 rounded-xl font-mono text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
                  />
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loginLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Clearance...</span>
                  </>
                ) : (
                  <span>Unlock Admin Portal</span>
                )}
              </button>
            </form>
          </div>
        </div>

        <footer className="text-center font-mono text-[10px] text-stone-500 uppercase tracking-widest z-10">
          Student Cultural Council • Indian Institute of Information Technology Allahabad
        </footer>
      </div>
    );
  }

  // ---------------------------------------------------------
  // 2. AUTHENTICATED COMMAND CENTER PORTAL
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0C0A09] text-stone-100 flex flex-col select-none">
      {/* TOP COMMAND HEADER */}
      <header className="sticky top-0 z-40 bg-stone-950/95 border-b border-stone-800/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative w-8 h-8 shrink-0">
            <Image
              src="/images/council-logo.png"
              alt="Cultural Council Logo"
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-white text-base tracking-tight">
                Council Command Center
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-bold">
                ROOT ACTIVE
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 block sm:inline">
              IIIT Allahabad Administration
            </span>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-800 hover:border-stone-700 font-mono text-xs text-stone-300 hover:text-white transition-colors"
          >
            <span>Live Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 font-mono text-xs text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lock Terminal</span>
          </button>
        </div>
      </header>

      {/* NAVIGATION TABS BAR */}
      <nav className="bg-stone-900/60 border-b border-stone-800 px-4 sm:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`py-3 px-3 sm:px-4 font-mono text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === "overview"
              ? "border-amber-500 text-amber-400 bg-amber-500/5"
              : "border-transparent text-stone-400 hover:text-stone-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Executive Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("events")}
          className={`py-3 px-3 sm:px-4 font-mono text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === "events"
              ? "border-amber-500 text-amber-400 bg-amber-500/5"
              : "border-transparent text-stone-400 hover:text-stone-200"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Timeline Events ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("countdown")}
          className={`py-3 px-3 sm:px-4 font-mono text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === "countdown"
              ? "border-amber-500 text-amber-400 bg-amber-500/5"
              : "border-transparent text-stone-400 hover:text-stone-200"
          }`}
        >
          <Timer className="w-3.5 h-3.5" />
          <span>Countdown &amp; Effervescence</span>
        </button>

        <button
          onClick={() => setActiveTab("council")}
          className={`py-3 px-3 sm:px-4 font-mono text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === "council"
              ? "border-amber-500 text-amber-400 bg-amber-500/5"
              : "border-transparent text-stone-400 hover:text-stone-200"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Council Leadership ({council.length})</span>
        </button>

        <Link
          href="/admin/flickr-control"
          className="py-3 px-3 sm:px-4 font-mono text-xs uppercase tracking-wider text-stone-400 hover:text-stone-200 border-b-2 border-transparent transition-all flex items-center gap-1.5 whitespace-nowrap ml-auto"
        >
          <Camera className="w-3.5 h-3.5 text-sky-400" />
          <span>Flickr Terminal</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </nav>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        {dataLoading && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Synchronizing live data...</span>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {/* ==================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Stat Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Card 1: Timeline Events */}
              <div
                onClick={() => setActiveTab("events")}
                className="bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-6 space-y-3 cursor-pointer transition-all shadow-md group"
              >
                <div className="flex items-center justify-between text-stone-400">
                  <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">STAGE PRODUCTIONS</span>
                  <Calendar className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="font-serif text-4xl font-extrabold text-white">
                  {events.length}
                </div>
                <div className="font-mono text-[11px] text-stone-400 flex items-center justify-between">
                  <span>Scheduled across season</span>
                  <span className="text-amber-400">Manage →</span>
                </div>
              </div>

              {/* Card 2: Effervescence Countdown */}
              <div
                onClick={() => setActiveTab("countdown")}
                className="bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-6 space-y-3 cursor-pointer transition-all shadow-md group"
              >
                <div className="flex items-center justify-between text-stone-400">
                  <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">EFFERVESCENCE CLOCK</span>
                  <Timer className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="font-serif text-4xl font-extrabold text-white">
                  {countdownPreview.days}d {countdownPreview.hours}h
                </div>
                <div className="font-mono text-[11px] text-stone-400 flex items-center justify-between">
                  <span>{countdown?.festivalName || "Effervescence"}</span>
                  <span className="text-amber-400">Configure →</span>
                </div>
              </div>

              {/* Card 3: Council Leadership */}
              <div
                onClick={() => setActiveTab("council")}
                className="bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-6 space-y-3 cursor-pointer transition-all shadow-md group"
              >
                <div className="flex items-center justify-between text-stone-400">
                  <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">COUNCIL ROSTER</span>
                  <Users className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="font-serif text-4xl font-extrabold text-white">
                  {council.length}
                </div>
                <div className="font-mono text-[11px] text-stone-400 flex items-center justify-between">
                  <span>Patrons, Execs &amp; Heads</span>
                  <span className="text-amber-400">Roster →</span>
                </div>
              </div>

              {/* Card 4: Flickr Media Terminal */}
              <Link
                href="/admin/flickr-control"
                className="bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-6 space-y-3 transition-all shadow-md group block"
              >
                <div className="flex items-center justify-between text-stone-400">
                  <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">MEDIA GATEWAY</span>
                  <Camera className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="font-serif text-4xl font-extrabold text-emerald-400">
                  ONLINE
                </div>
                <div className="font-mono text-[11px] text-stone-400 flex items-center justify-between">
                  <span>Photostream &amp; Kill Switch</span>
                  <span className="text-sky-400">Open Terminal →</span>
                </div>
              </Link>
            </div>

            {/* Quick Actions & Live Countdown Banner */}
            <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900/90 to-stone-950 border border-stone-800 p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-400 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ACTIVE FESTIVAL IGNITION</span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-white">
                  {countdown?.festivalName || "Effervescence '27"} // {countdown?.edition || "Edition 22"}
                </h3>
                <p className="font-sans text-sm text-stone-300 leading-relaxed">
                  {countdown?.announcementText || "All cultural societies and contingents prepare for North India's premier cultural spectacle."}
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setEditingEvent(null);
                      setIsEventModalOpen(true);
                      setActiveTab("events");
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Schedule New Act</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditingMember(null);
                      setIsCouncilModalOpen(true);
                      setActiveTab("council");
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-mono text-xs uppercase tracking-wider font-semibold border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Council Member</span>
                  </button>
                </div>
              </div>

              {/* Real-time Ticker Box */}
              <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 flex items-center gap-4 text-center font-mono shrink-0 shadow-inner">
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-400 block">
                    {String(countdownPreview.days).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-stone-400">DAYS</span>
                </div>
                <span className="text-stone-600 font-bold">:</span>
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-400 block">
                    {String(countdownPreview.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-stone-400">HOURS</span>
                </div>
                <span className="text-stone-600 font-bold">:</span>
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-400 block">
                    {String(countdownPreview.mins).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-stone-400">MINS</span>
                </div>
                <span className="text-stone-600 font-bold">:</span>
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-400 block">
                    {String(countdownPreview.secs).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-stone-400">SECS</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: TIMELINE EVENTS MANAGEMENT */}
        {/* ==================================================== */}
        {activeTab === "events" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-900 border border-stone-800 rounded-2xl p-4">
              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="text"
                    value={eventSearch}
                    onChange={(e) => setEventSearch(e.target.value)}
                    placeholder="Search acts, societies, venues..."
                    className="w-full pl-9 pr-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl font-mono text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Category Dropdown */}
                <select
                  value={eventCategoryFilter}
                  onChange={(e) => setEventCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl font-mono text-xs text-stone-300 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="ALL">All Categories</option>
                  <option value="Music">Music</option>
                  <option value="Dramatics">Dramatics</option>
                  <option value="Dance">Dance</option>
                  <option value="Literature">Literature</option>
                  <option value="Fine Arts">Fine Arts</option>
                  <option value="Media">Media</option>
                  <option value="Flagship Festival">Flagship Festival</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleResetEvents}
                  className="px-3 py-1.5 rounded-xl border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-white font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Reset to factory events"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>

                <button
                  onClick={() => {
                    setEditingEvent(null);
                    setIsEventModalOpen(true);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Act</span>
                </button>
              </div>
            </div>

            {/* Events Schedule Table */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-stone-950 border-b border-stone-800 text-[10px] uppercase tracking-widest text-stone-400">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Pass Code</th>
                      <th className="py-3.5 px-4 font-semibold">Event Title &amp; Society</th>
                      <th className="py-3.5 px-4 font-semibold">Category</th>
                      <th className="py-3.5 px-4 font-semibold">Date &amp; Time</th>
                      <th className="py-3.5 px-4 font-semibold">Venue</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/80">
                    {filteredEvents.map((evt) => (
                      <tr key={evt.id} className="hover:bg-stone-800/40 transition-colors">
                        <td className="py-3.5 px-4 text-amber-400 font-bold whitespace-nowrap">
                          #{evt.passCode}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-serif text-sm font-bold text-white block">
                            {evt.title}
                          </span>
                          <span className="text-[11px] text-stone-400">
                            {evt.societyName}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{ backgroundColor: `${evt.accentColor}20`, color: evt.accentColor }}
                          >
                            {evt.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-white block">{evt.date}</span>
                          <span className="text-[10px] text-stone-400">{evt.time}</span>
                        </td>
                        <td className="py-3.5 px-4 text-stone-300 max-w-[180px] truncate">
                          {evt.venue}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full bg-stone-800 border border-stone-700 text-[9px] font-bold text-stone-300 uppercase">
                            {evt.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingEvent(evt);
                                setIsEventModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                              title="Edit Act"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(evt.id, evt.title)}
                              className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/40 text-stone-400 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Delete Act"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: COUNTDOWN & EFFERVESCENCE MANAGEMENT */}
        {/* ==================================================== */}
        {activeTab === "countdown" && countdown && (
          <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
              <div className="border-b border-stone-800 pb-4">
                <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-400 font-bold mb-1">
                  <Timer className="w-3.5 h-3.5" />
                  <span>COUNTDOWN ENGINE &amp; ARENA SETTINGS</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Configure Festival Ignition Clock
                </h3>
                <p className="font-mono text-xs text-stone-400">
                  Controls the live countdown timer displayed across the homepage and festival portal.
                </p>
              </div>

              {/* Live Preview Box */}
              <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 text-center space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                  LIVE FRONTEND PREVIEW // {countdown.headerTag}
                </span>
                <div className="flex items-center justify-center gap-4 font-mono">
                  <div>
                    <span className="font-serif text-4xl sm:text-5xl font-black text-amber-400 block">
                      {String(countdownPreview.days).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400">DAYS</span>
                  </div>
                  <span className="text-stone-700 font-bold text-2xl">:</span>
                  <div>
                    <span className="font-serif text-4xl sm:text-5xl font-black text-amber-400 block">
                      {String(countdownPreview.hours).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400">HOURS</span>
                  </div>
                  <span className="text-stone-700 font-bold text-2xl">:</span>
                  <div>
                    <span className="font-serif text-4xl sm:text-5xl font-black text-amber-400 block">
                      {String(countdownPreview.mins).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400">MINUTES</span>
                  </div>
                  <span className="text-stone-700 font-bold text-2xl">:</span>
                  <div>
                    <span className="font-serif text-4xl sm:text-5xl font-black text-amber-400 block">
                      {String(countdownPreview.secs).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400">SECONDS</span>
                  </div>
                </div>
                <div className="font-mono text-xs text-amber-300 font-semibold pt-1">
                  &ldquo;{countdown.theme}&rdquo; • {countdown.edition}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveCountdown} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px] tracking-wider">
                      Festival Headline
                    </label>
                    <input
                      name="festivalName"
                      defaultValue={countdown.festivalName}
                      required
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px] tracking-wider">
                      Target Ignition Date &amp; Time
                    </label>
                    <input
                      name="targetDate"
                      type="datetime-local"
                      defaultValue={countdown.targetDate ? new Date(countdown.targetDate).toISOString().slice(0, 16) : ""}
                      required
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px] tracking-wider">
                      Edition Tag
                    </label>
                    <input
                      name="edition"
                      defaultValue={countdown.edition}
                      required
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px] tracking-wider">
                      Theme Slogan
                    </label>
                    <input
                      name="theme"
                      defaultValue={countdown.theme}
                      required
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px] tracking-wider">
                      Arena Eyebrow Tag
                    </label>
                    <input
                      name="headerTag"
                      defaultValue={countdown.headerTag}
                      required
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px] tracking-wider">
                      Stage Subtitle Tag
                    </label>
                    <input
                      name="subtitleTag"
                      defaultValue={countdown.subtitleTag}
                      required
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px] tracking-wider">
                    Announcement Banner Text
                  </label>
                  <textarea
                    name="announcementText"
                    defaultValue={countdown.announcementText}
                    rows={2}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    id="enabled"
                    name="enabled"
                    defaultChecked={countdown.enabled}
                    className="w-4 h-4 rounded text-amber-500 bg-stone-950 border-stone-800 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="enabled" className="text-stone-300 font-semibold text-xs cursor-pointer">
                    Enable and display live countdown ticker on homepage &amp; festival pages
                  </label>
                </div>

                <div className="pt-4 border-t border-stone-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Countdown Configuration</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: COUNCIL MEMBERS MANAGEMENT */}
        {/* ==================================================== */}
        {activeTab === "council" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-900 border border-stone-800 rounded-2xl p-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="text"
                    value={councilSearch}
                    onChange={(e) => setCouncilSearch(e.target.value)}
                    placeholder="Search by name, role, dept..."
                    className="w-full pl-9 pr-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl font-mono text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <select
                  value={councilTierFilter}
                  onChange={(e) => setCouncilTierFilter(e.target.value)}
                  className="px-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl font-mono text-xs text-stone-300 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="ALL">All Tiers ({council.length})</option>
                  <option value="patron">Patrons</option>
                  <option value="executive">Executive Office</option>
                  <option value="council">Council Members / Heads</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleResetCouncil}
                  className="px-3 py-1.5 rounded-xl border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-white font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Reset to factory roster"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>

                <button
                  onClick={() => {
                    setEditingMember(null);
                    setIsCouncilModalOpen(true);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Member</span>
                </button>
              </div>
            </div>

            {/* Council Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCouncil.map((m) => (
                <div
                  key={m.id}
                  className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-stone-700 transition-all shadow-md group"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar / Photo */}
                    <div className="w-14 h-14 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0 overflow-hidden relative">
                      {m.photoUrl ? (
                        <Image
                          src={m.photoUrl}
                          alt={m.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="font-serif font-bold text-amber-400 text-lg">
                          {m.avatarFallback || m.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Member Info */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-stone-800 text-[9px] font-mono font-bold uppercase tracking-wider text-amber-400">
                          {m.badgeLabel || m.tier}
                        </span>
                        <span className="text-[10px] font-mono text-stone-500">
                          #{m.order}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-white text-base truncate">
                        {m.name}
                      </h4>
                      <p className="font-mono text-[11px] text-stone-400 truncate">
                        {m.designation}
                      </p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="font-mono text-[11px] text-stone-400 space-y-1 pt-2 border-t border-stone-800/80">
                    <div className="truncate">
                      <span className="text-stone-500">Dept:</span> {m.department}
                    </div>
                    <div className="truncate text-stone-300">
                      <span className="text-stone-500">Email:</span> {m.email}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500">
                      {m.tier}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingMember(m);
                          setIsCouncilModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Member"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteMember(m.id, m.name)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/40 text-stone-400 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Delete Member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT TIMELINE EVENT */}
      {/* ==================================================== */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" />
                <h3 className="font-serif text-xl font-bold text-white">
                  {editingEvent ? "Edit Production Act" : "Schedule New Production Act"}
                </h3>
              </div>
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Event Title</label>
                  <input
                    name="title"
                    defaultValue={editingEvent?.title || ""}
                    placeholder="e.g. Acoustic Sunset: Unplugged Vol. IV"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Society Slug</label>
                  <select
                    name="societySlug"
                    defaultValue={editingEvent?.societySlug || "virtuosi"}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="virtuosi">virtuosi (Music)</option>
                    <option value="rangtarangini">rangtarangini (Dramatics)</option>
                    <option value="ams">ams (Media &amp; Acoustics)</option>
                    <option value="geneticx">geneticx (Dance)</option>
                    <option value="sarasva">sarasva (Literature)</option>
                    <option value="nirmiti">nirmiti (Fine Arts)</option>
                    <option value="council">council (Flagship / Council)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Society Full Name</label>
                  <input
                    name="societyName"
                    defaultValue={editingEvent?.societyName || "Virtuosi Collective"}
                    placeholder="e.g. Virtuosi Music Collective"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Category</label>
                  <select
                    name="category"
                    defaultValue={editingEvent?.category || "Music"}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Music">Music</option>
                    <option value="Dramatics">Dramatics</option>
                    <option value="Dance">Dance</option>
                    <option value="Literature">Literature</option>
                    <option value="Fine Arts">Fine Arts</option>
                    <option value="Media">Media</option>
                    <option value="Flagship Festival">Flagship Festival</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Event Type</label>
                  <select
                    name="type"
                    defaultValue={editingEvent?.type || "upcoming"}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="upcoming">upcoming</option>
                    <option value="flagship">flagship</option>
                    <option value="workshop">workshop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Display Date</label>
                  <input
                    name="date"
                    defaultValue={editingEvent?.date || "Nov 14, 2026"}
                    placeholder="e.g. Nov 14, 2026"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Weekday Tag</label>
                  <input
                    name="weekday"
                    defaultValue={editingEvent?.weekday || "SATURDAY"}
                    placeholder="e.g. SATURDAY"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Day Number</label>
                  <input
                    name="day"
                    defaultValue={editingEvent?.day || "14"}
                    placeholder="e.g. 14"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Month Code</label>
                  <input
                    name="month"
                    defaultValue={editingEvent?.month || "NOV"}
                    placeholder="e.g. NOV"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Year</label>
                  <input
                    name="year"
                    defaultValue={editingEvent?.year || "2026"}
                    placeholder="e.g. 2026"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Time Range</label>
                  <input
                    name="time"
                    defaultValue={editingEvent?.time || "6:00 PM – 9:30 PM IST"}
                    placeholder="e.g. 6:00 PM – 9:30 PM IST"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Stage Venue</label>
                  <input
                    name="venue"
                    defaultValue={editingEvent?.venue || "Main Auditorium Lawns"}
                    placeholder="e.g. Main Auditorium Lawns"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Status Pill</label>
                  <select
                    name="status"
                    defaultValue={editingEvent?.status || "REGISTRATIONS OPEN"}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="REGISTRATIONS OPEN">REGISTRATIONS OPEN</option>
                    <option value="CONFIRMED STAGE">CONFIRMED STAGE</option>
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="HEADLINE FESTIVAL">HEADLINE FESTIVAL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Pass Code</label>
                  <input
                    name="passCode"
                    defaultValue={editingEvent?.passCode || "CC-VRT-2601"}
                    placeholder="e.g. CC-VRT-2601"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Accent Color (HEX)</label>
                  <input
                    name="accentColor"
                    defaultValue={editingEvent?.accentColor || "#0D9488"}
                    placeholder="#0D9488"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Google Calendar Date Range</label>
                  <input
                    name="gcalDate"
                    defaultValue={editingEvent?.gcalDate || "20261114T123000Z/20261114T160000Z"}
                    placeholder="20261114T123000Z/20261114T160000Z"
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Highlights / Tags (comma separated)</label>
                  <input
                    name="highlights"
                    defaultValue={editingEvent?.highlights?.join(", ") || "Open Jam Session, Unplugged Indie Sets"}
                    placeholder="Open Jam Session, Unplugged Indie Sets"
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingEvent?.description || ""}
                    rows={3}
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-all shadow-md cursor-pointer"
                >
                  {editingEvent ? "Save Changes" : "Create Act"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT COUNCIL MEMBER */}
      {/* ==================================================== */}
      {isCouncilModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-500" />
                <h3 className="font-serif text-xl font-bold text-white">
                  {editingMember ? "Edit Council Member" : "Add Council Member"}
                </h3>
              </div>
              <button
                onClick={() => setIsCouncilModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Full Name</label>
                  <input
                    name="name"
                    defaultValue={editingMember?.name || ""}
                    placeholder="e.g. Dr. KP Singh"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Official Designation</label>
                  <input
                    name="designation"
                    defaultValue={editingMember?.designation || ""}
                    placeholder="e.g. DEAN (STUDENT AFFAIRS) / DEAN SA"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Tier</label>
                  <select
                    name="tier"
                    defaultValue={editingMember?.tier || "council"}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="patron">Patron (Dean / Faculty)</option>
                    <option value="executive">Executive (President / GenSec / Treasurer)</option>
                    <option value="council">Council Member / Society Head</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Badge Label</label>
                  <input
                    name="badgeLabel"
                    defaultValue={editingMember?.badgeLabel || "COUNCIL"}
                    placeholder="e.g. DEAN SA, PRESIDENT, HEAD"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Roll No / Office Tag</label>
                  <input
                    name="rollNumber"
                    defaultValue={editingMember?.rollNumber || "Office of DoSA"}
                    placeholder="e.g. Office of DoSA or IIT2023045"
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Display Order (Index)</label>
                  <input
                    name="order"
                    type="number"
                    defaultValue={editingMember?.order || 10}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Department</label>
                  <input
                    name="department"
                    defaultValue={editingMember?.department || "Department of Information Technology"}
                    placeholder="e.g. Department of Information Technology"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Official Email</label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={editingMember?.email || ""}
                    placeholder="e.g. dean.sa@iiita.ac.in"
                    required
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Photo URL (Leave empty for Initials Fallback)</label>
                  <input
                    name="photoUrl"
                    defaultValue={editingMember?.photoUrl || ""}
                    placeholder="https://... or /images/..."
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Avatar Fallback Initials</label>
                  <input
                    name="avatarFallback"
                    defaultValue={editingMember?.avatarFallback || "CC"}
                    placeholder="e.g. KP"
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Short Role</label>
                  <input
                    name="shortRole"
                    defaultValue={editingMember?.shortRole || ""}
                    placeholder="e.g. President"
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-400 mb-1 font-semibold uppercase text-[10px]">Bio / Responsibilities</label>
                  <textarea
                    name="bio"
                    defaultValue={editingMember?.bio || ""}
                    rows={3}
                    placeholder="Brief description of responsibilities..."
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCouncilModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-all shadow-md cursor-pointer"
                >
                  {editingMember ? "Save Changes" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING TOAST NOTIFICATION */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-full font-mono text-xs shadow-2xl flex items-center gap-2 border animate-in fade-in slide-in-from-bottom-2 duration-200 ${
            toast.type === "success"
              ? "bg-emerald-950 border-emerald-700 text-emerald-200"
              : "bg-rose-950 border-rose-700 text-rose-200"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
