"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Power,
  RefreshCw,
  Lock,
  Unlock,
  Search,
  Maximize2,
  ExternalLink,
  Layers,
  Activity,
  CheckCircle2,
  XCircle,
  Database,
  Key,
  Terminal,
  Clock,
  ArrowUpRight,
  Filter,
  Eye,
  LogOut,
  Radio,
  FileText,
} from "lucide-react";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import { TrimmedPhoto } from "@/lib/flickr/schemas";

interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  details?: string;
}

interface FlickrStatusData {
  authenticated: boolean;
  killSwitch: {
    killed: boolean;
    killedAt: string | null;
    killedReason: string | null;
    killedBy: string | null;
    auditLog: AuditEntry[];
    lastModified: string;
  };
  apiConfig: {
    configured: boolean;
    secretConfigured?: boolean;
    isMock: boolean;
    mode: string;
    maskedApiKey: string;
    maskedUserId: string;
    maskedApiSecret?: string;
  };
  cacheStats: {
    size: number;
    defaultTTLSeconds: number;
  };
  environment: string;
  usingDefaultPasskey: boolean;
}

interface WebsitePhoto {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  pageLocation: string;
  section: string;
  discipline: string;
  aspectRatio: string;
  sourceType: string;
  albumId?: string;
  albumTitle?: string;
  width?: number;
  height?: number;
}

export default function FlickrControlClient() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);

  // Dashboard Data
  const [status, setStatus] = useState<FlickrStatusData | null>(null);
  const [photos, setPhotos] = useState<WebsitePhoto[]>([]);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);

  // Actions state
  const [isTogglingKill, setIsTogglingKill] = useState(false);
  const [killReason, setKillReason] = useState("");
  const [showKillModal, setShowKillModal] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<{
    success: boolean;
    message: string;
    latencyMs?: number;
    statusCode?: number;
    isKilled?: boolean;
  } | null>(null);
  const [isPurgingCache, setIsPurgingCache] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Photo Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("ALL");
  const [selectedSource, setSelectedSource] = useState<string>("ALL");

  // Lightbox Inspection
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const showToast = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // 1. Initial Authentication & Status Check
  const fetchStatus = useCallback(async () => {
    setIsLoadingStatus(true);
    try {
      const res = await fetch("/api/admin/flickr/status", { cache: "no-store" });
      if (res.status === 401) {
        setIsAuthenticated(false);
        setStatus(null);
      } else if (res.ok) {
        const data = await res.json();
        setStatus(data);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setIsLoadingStatus(false);
    }
  }, []);

  // 2. Fetch all website photos
  const fetchAllPhotos = useCallback(async () => {
    setIsLoadingPhotos(true);
    try {
      const res = await fetch("/api/admin/flickr/all-photos", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setPhotos(data.photos || []);
      }
    } catch (err) {
      console.error("Failed to load website photos inventory:", err);
    } finally {
      setIsLoadingPhotos(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllPhotos();
    }
  }, [isAuthenticated, fetchAllPhotos]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkeyInput.trim()) return;

    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/admin/flickr/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey: passkeyInput }),
      });

      const data = await res.json();

      if (res.ok) {
        setPasskeyInput("");
        setIsAuthenticated(true);
        fetchStatus();
        fetchAllPhotos();
        showToast("success", "Terminal authorized. Flickr infrastructure controls active.");
      } else {
        setLoginError(data.error || "Authentication failed.");
        if (data.remainingAttempts !== undefined) {
          setRemainingAttempts(data.remainingAttempts);
        }
      }
    } catch (err) {
      setLoginError("Network error while validating passkey.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/flickr/logout", { method: "POST" });
      setIsAuthenticated(false);
      setStatus(null);
      setPhotos([]);
      showToast("success", "Admin session severed.");
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  // Handle Kill Switch Toggle
  const handleToggleKillSwitch = async (targetKilled: boolean) => {
    setIsTogglingKill(true);
    try {
      const res = await fetch("/api/admin/flickr/kill-switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          killed: targetKilled,
          reason: killReason.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setShowKillModal(false);
        setKillReason("");
        await fetchStatus();
        showToast(
          targetKilled ? "error" : "success",
          targetKilled
            ? "EMERGENCY KILL SWITCH ENGAGED: All outbound Flickr network requests blocked."
            : "KILL SWITCH DISARMED: Normal Flickr operations restored."
        );
      } else {
        showToast("error", data.error || "Failed to update kill switch state.");
      }
    } catch (err) {
      showToast("error", "Network error updating kill switch.");
    } finally {
      setIsTogglingKill(false);
    }
  };

  // Handle Ping Diagnostic
  const handleTestPing = async () => {
    setIsPinging(true);
    setPingResult(null);
    try {
      const res = await fetch("/api/admin/flickr/test-connection", {
        method: "POST",
      });
      const data = await res.json();
      setPingResult(data);
      if (data.success) {
        showToast("success", `Ping succeeded (${data.latencyMs}ms)`);
      } else {
        showToast("error", data.message || "Ping diagnostic failed.");
      }
    } catch (err) {
      setPingResult({
        success: false,
        message: "Failed to communicate with test route.",
      });
    } finally {
      setIsPinging(false);
    }
  };

  // Handle Cache Purge
  const handlePurgeCache = async () => {
    setIsPurgingCache(true);
    try {
      const res = await fetch("/api/admin/flickr/purge-cache", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        await fetchStatus();
        showToast("success", "Gallery memory cache purged successfully.");
      } else {
        showToast("error", data.error || "Failed to purge cache.");
      }
    } catch (err) {
      showToast("error", "Network error purging cache.");
    } finally {
      setIsPurgingCache(false);
    }
  };

  // Filtered Photos List
  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.discipline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.section.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation =
        selectedLocation === "ALL" || p.pageLocation === selectedLocation;

      const matchesSource =
        selectedSource === "ALL" || p.sourceType === selectedSource;

      return matchesSearch && matchesLocation && matchesSource;
    });
  }, [photos, searchQuery, selectedLocation, selectedSource]);

  // Convert for Lightbox inspection
  const lightboxPhotos: TrimmedPhoto[] = useMemo(() => {
    return filteredPhotos.map((p) => ({
      id: p.id,
      title: `${p.title} (${p.discipline}) — [${p.pageLocation}]`,
      thumbnailUrl: p.thumbnailUrl || p.url,
      displayUrl: p.url,
      fullUrl: p.url,
      width: p.width || 2400,
      height: p.height || 1600,
    }));
  }, [filteredPhotos]);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  // --------------------------------------------------------------------------
  // Loading Terminal Initializer
  // --------------------------------------------------------------------------
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#111010] text-stone-200 flex flex-col items-center justify-center p-6 font-mono">
        <div className="flex items-center gap-3 text-amber-400">
          <Terminal className="w-5 h-5 animate-pulse" />
          <span className="text-sm uppercase tracking-widest">
            INITIALIZING GATEWAY CONTROLLER...
          </span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 1. UNAUTHENTICATED TERMINAL LOGIN SCREEN
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C0A09] text-stone-100 flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden select-none">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#FAF8F5 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top Header */}
        <header className="relative z-10 flex items-center justify-between border-b border-stone-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
              CC
            </div>
            <div>
              <h1 className="font-mono text-xs uppercase tracking-[0.25em] text-stone-300">
                IIIT ALLAHABAD // CULTURAL COUNCIL
              </h1>
              <p className="font-mono text-[10px] text-stone-500 uppercase">
                AMS Curatorial Media Infrastructure
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-stone-500 border border-stone-800 px-3 py-1 rounded-full">
            <Lock className="w-3 h-3 text-amber-500" />
            <span>PROTECTED GATEWAY</span>
          </div>
        </header>

        {/* Centered Login Card */}
        <main className="relative z-10 max-w-md w-full mx-auto my-auto py-12">
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl font-normal text-white">
                Flickr Control Terminal
              </h2>
              <p className="font-sans text-xs text-stone-400 leading-relaxed">
                Enter master administrative passkey to access upstream API controls, media assets, and emergency kill switches.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="passkey"
                  className="block font-mono text-[10px] uppercase tracking-wider text-stone-400"
                >
                  Administrative Passkey
                </label>
                <div className="relative">
                  <input
                    id="passkey"
                    type="password"
                    value={passkeyInput}
                    onChange={(e) => setPasskeyInput(e.target.value)}
                    placeholder="Enter passkey..."
                    autoFocus
                    required
                    className="w-full bg-stone-950 border border-stone-700 focus:border-amber-400 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder-stone-600 focus:outline-none transition-colors"
                  />
                  <Key className="w-4 h-4 text-stone-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-red-300 font-mono text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span>{loginError}</span>
                    {remainingAttempts !== null && remainingAttempts > 0 && (
                      <span className="block text-[10px] text-red-400/80 mt-0.5">
                        {remainingAttempts} attempt{remainingAttempts > 1 ? "s" : ""} remaining before IP lockout.
                      </span>
                    )}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-semibold uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>AUTHORIZE TERMINAL</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-stone-800 text-center font-mono text-[10px] text-stone-500">
              <span>Security Rate Limiting: 5 attempts / 15m</span>
              <span className="mx-2">•</span>
              <span>HMAC-Signed HttpOnly Session</span>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 text-center font-mono text-[10px] uppercase tracking-wider text-stone-600">
          <span>IIIT ALLAHABAD APEX CULTURAL REPOSITORY SYSTEM // STRICT RESTRICTED ACCESS</span>
        </footer>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 2. AUTHENTICATED MASTER CONTROL DASHBOARD
  // --------------------------------------------------------------------------
  const isKilled = status?.killSwitch.killed || false;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-ink selection:bg-stone-300">
      {/* Lightbox for inspecting any photo */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        photos={lightboxPhotos}
        currentIndex={activePhotoIndex}
        onIndexChange={setActivePhotoIndex}
        albumTitle="All Website Photos Curatorial Inspector"
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 p-4 rounded-2xl shadow-2xl border font-mono text-xs flex items-center gap-3 backdrop-blur-xl ${
              notification.type === "success"
                ? "bg-stone-900 text-emerald-400 border-emerald-500/40"
                : "bg-red-950 text-red-200 border-red-700"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kill Switch Confirmation Modal */}
      <AnimatePresence>
        {showKillModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-stone-300 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5"
            >
              <div className="flex items-center gap-3 text-red-600">
                <ShieldAlert className="w-6 h-6" />
                <h3 className="font-serif text-2xl font-normal text-ink">
                  {isKilled ? "Disarm Emergency Kill Switch?" : "Engage Emergency Kill Switch?"}
                </h3>
              </div>

              <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed">
                {isKilled
                  ? "Disarming the kill switch will restore regular outbound API requests to Flickr's REST endpoint and honor configured cache lifetimes."
                  : "Engaging the kill switch will instantly block 100% of outbound network traffic toward Flickr. All gallery catalogs and carousels will immediately and seamlessly serve the curated offline local fallback datasets."}
              </p>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] uppercase text-ink-faint">
                  Action Note / Reason (Logged in Audit Log)
                </label>
                <input
                  type="text"
                  value={killReason}
                  onChange={(e) => setKillReason(e.target.value)}
                  placeholder="e.g., Upstream API rate limit reached / Security drill"
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 font-mono text-xs focus:outline-none focus:border-stone-600 text-ink"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  onClick={() => setShowKillModal(false)}
                  className="px-4 py-2 font-mono text-xs text-ink-muted hover:text-ink cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleToggleKillSwitch(!isKilled)}
                  disabled={isTogglingKill}
                  className={`px-5 py-2.5 rounded-full font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-md cursor-pointer transition-all ${
                    isKilled
                      ? "bg-emerald-600 hover:bg-emerald-500"
                      : "bg-red-600 hover:bg-red-500"
                  }`}
                >
                  {isTogglingKill ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      UPDATING...
                    </span>
                  ) : isKilled ? (
                    "Confirm Disarm Switch"
                  ) : (
                    "Confirm Engage Kill Switch"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOP NAVIGATION & TERMINAL HEADER */}
      <header className="border-b border-stone-300 bg-[#FAF8F5] px-6 py-5 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-ink text-white flex items-center justify-center font-mono font-bold text-xs">
              CC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-ink font-semibold">
                  FLICKR GATEWAY MASTER CONTROL
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  ADMIN TERMINAL
                </span>
              </div>
              <p className="font-mono text-[10px] text-ink-faint uppercase">
                Acoustics &amp; Media Society // Media Security Center
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            {/* Kill Switch Live Indicator */}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold ${
                isKilled
                  ? "bg-red-100 text-red-800 border-red-300"
                  : "bg-emerald-100 text-emerald-800 border-emerald-300"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isKilled ? "bg-red-600 animate-ping" : "bg-emerald-500"
                }`}
              />
              <span>KILL SWITCH: {isKilled ? "ENGAGED (LOCKED)" : "DISARMED (NORMAL)"}</span>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 bg-white hover:bg-stone-100 text-ink transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sever Session</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* ================================================================== */}
        {/* 1. EMERGENCY KILL SWITCH HERO BANNER */}
        {/* ================================================================== */}
        <div
          className={`rounded-3xl p-6 sm:p-10 border transition-all ${
            isKilled
              ? "bg-gradient-to-br from-red-950 via-stone-900 to-black text-white border-red-600 shadow-2xl shadow-red-950/40"
              : "bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 text-white border-stone-800 shadow-xl"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                {isKilled ? (
                  <span className="inline-flex items-center gap-1.5 text-red-400 font-bold">
                    <ShieldAlert className="w-4 h-4 animate-bounce" />
                    EMERGENCY OVERRIDE ENGAGED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    SYSTEM ARMED &amp; SECURE
                  </span>
                )}
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
                {isKilled
                  ? "Outbound Flickr Network Calls BLOCKED"
                  : "Flickr API Traffic Gateway Active"}
              </h2>

              <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
                {isKilled
                  ? `Engaged by ${status?.killSwitch.killedBy || "ADMIN"} on ${new Date(
                      status?.killSwitch.killedAt || ""
                    ).toLocaleString()}. Reason: "${status?.killSwitch.killedReason || "Manual override"}". Zero outbound packets leave the server. All website galleries are safely operating via curated offline fallback archives.`
                  : "The emergency kill switch immediately arrests all outbound Flickr HTTP requests from the server with 0 network leakage. Use this if Flickr is degraded, credentials expire, or in case of security lockdown."}
              </p>
            </div>

            <div className="shrink-0 flex flex-col gap-2">
              <button
                onClick={() => setShowKillModal(true)}
                className={`px-8 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all duration-300 ${
                  isKilled
                    ? "bg-emerald-500 hover:bg-emerald-400 text-stone-950 hover:scale-105"
                    : "bg-red-600 hover:bg-red-500 text-white hover:scale-105 shadow-red-600/30"
                }`}
              >
                <Power className="w-4 h-4" />
                <span>{isKilled ? "DISARM KILL SWITCH" : "ENGAGE EMERGENCY KILL SWITCH"}</span>
              </button>
              <span className="font-mono text-[10px] text-stone-400 text-center">
                Action is cryptographically logged to audit ledger
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. INFRASTRUCTURE & SECURITY METRICS GRID */}
        {/* ================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Upstream Ping Diagnostics */}
          <div className="bg-[#F4F1EA] p-6 rounded-2xl border border-stone-300 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-faint border-b border-stone-300 pb-2">
                <span className="uppercase tracking-widest">UPSTREAM STATUS</span>
                <Activity className="w-3.5 h-3.5 text-stone-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-ink">
                Flickr REST Connectivity
              </h3>
              <p className="font-sans text-xs text-ink-muted">
                Run an ephemeral read-only test ping against Flickr API endpoint to verify response time and upstream authorization.
              </p>
            </div>

            {pingResult && (
              <div
                className={`p-3 rounded-xl border font-mono text-xs ${
                  pingResult.success
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                    : "bg-red-50 border-red-300 text-red-900"
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>{pingResult.success ? "PING OK" : "PING FAILED"}</span>
                  {pingResult.latencyMs !== undefined && <span>{pingResult.latencyMs}ms</span>}
                </div>
                <p className="text-[11px] mt-1 leading-snug">{pingResult.message}</p>
              </div>
            )}

            <button
              onClick={handleTestPing}
              disabled={isPinging}
              className="w-full py-2.5 px-4 rounded-xl bg-white border border-stone-300 hover:border-stone-500 font-mono text-xs font-semibold text-ink flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? "animate-spin" : ""}`} />
              <span>{isPinging ? "TESTING CONNECTION..." : "RUN CONNECTION PING"}</span>
            </button>
          </div>

          {/* Card 2: Cache Management */}
          <div className="bg-[#F4F1EA] p-6 rounded-2xl border border-stone-300 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-faint border-b border-stone-300 pb-2">
                <span className="uppercase tracking-widest">IN-MEMORY CACHE</span>
                <Database className="w-3.5 h-3.5 text-stone-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-ink">
                Gallery LRU Memory Buffer
              </h3>
              <div className="space-y-1 font-mono text-xs">
                <div className="flex justify-between text-ink">
                  <span className="text-ink-muted">Cached Entries:</span>
                  <span className="font-bold">{status?.cacheStats.size || 0} collections</span>
                </div>
                <div className="flex justify-between text-ink">
                  <span className="text-ink-muted">Default TTL:</span>
                  <span className="font-bold">600 seconds (10m)</span>
                </div>
              </div>
              <p className="font-sans text-xs text-ink-muted">
                Caches trimmed album and photoset responses to minimize API calls and enforce strict rate limits.
              </p>
            </div>

            <button
              onClick={handlePurgeCache}
              disabled={isPurgingCache}
              className="w-full py-2.5 px-4 rounded-xl bg-white border border-stone-300 hover:border-stone-500 font-mono text-xs font-semibold text-ink flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPurgingCache ? "animate-spin" : ""}`} />
              <span>{isPurgingCache ? "PURGING..." : "FLUSH GALLERY CACHE"}</span>
            </button>
          </div>

          {/* Card 3: Gateway Credentials & Allowlist */}
          <div className="bg-[#F4F1EA] p-6 rounded-2xl border border-stone-300 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-faint border-b border-stone-300 pb-2">
                <span className="uppercase tracking-widest">CREDENTIALS &amp; ALLOWLIST</span>
                <Lock className="w-3.5 h-3.5 text-stone-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-ink">
                API Key Protection
              </h3>
              <div className="space-y-1.5 font-mono text-[11px] text-ink-muted">
                <div>
                  <span className="block text-[10px] text-ink-faint uppercase">API Key</span>
                  <span className="font-bold text-ink">{status?.apiConfig.maskedApiKey}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-ink-faint uppercase">API Secret</span>
                  <span className="font-bold text-emerald-700">
                    {status?.apiConfig.maskedApiSecret || "NOT CONFIGURED"}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-ink-faint uppercase">User ID</span>
                  <span className="font-bold text-ink">{status?.apiConfig.maskedUserId}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-ink-faint uppercase">Operating Mode</span>
                  <span className="font-bold text-amber-800">{status?.apiConfig.mode}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-300 font-mono text-[10px] text-ink-faint flex items-center justify-between">
              <span>Read-Only Allowlist:</span>
              <span className="text-emerald-700 font-bold">STRICTLY ENFORCED</span>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 3. ALL WEBSITE PHOTOS & MEDIA REPOSITORY (CORE USER REQUIREMENT) */}
        {/* ================================================================== */}
        <section className="space-y-6 pt-6 border-t border-stone-300">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint mb-1">
                <Layers className="w-4 h-4 text-amber-700" />
                <span>MASTER MEDIA AUDIT // ALL PAGES INVENTORY</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ink">
                Curatorial Photos Repository
              </h2>
              <p className="font-sans text-xs sm:text-sm text-ink-muted mt-1">
                Comprehensive directory of every plate, exhibition slide, 3D vector object, and album across all pages of the IIIT Allahabad Cultural Council website ({photos.length} total indexed items).
              </p>
            </div>

            <div className="font-mono text-xs text-ink-muted flex items-center gap-4">
              <span>
                Displaying <strong className="text-ink">{filteredPhotos.length}</strong> of{" "}
                <strong className="text-ink">{photos.length}</strong> items
              </span>
            </div>
          </div>

          {/* Search & Location Filter Controls */}
          <div className="bg-white p-4 rounded-2xl border border-stone-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search photos by title, society, or section..."
                className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl pl-10 pr-4 py-2 font-mono text-xs text-ink placeholder-stone-400 focus:outline-none focus:border-stone-600"
              />
            </div>

            {/* Filter Tabs by Page Location */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] w-full md:w-auto">
              {[
                { label: "All Pages", value: "ALL" },
                { label: "Hero Slider", value: "Hero Slider" },
                { label: "Revolving Carousel", value: "Revolving Carousel" },
                { label: "Gallery Albums", value: "Gallery Albums" },
                { label: "3D Objects", value: "3D Exhibition Objects" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedLocation(tab.value)}
                  className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                    selectedLocation === tab.value
                      ? "bg-ink text-white font-semibold shadow-xs"
                      : "bg-[#F4F1EA] text-ink-muted hover:text-ink hover:bg-stone-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photos Cards Grid */}
          {isLoadingPhotos ? (
            <div className="py-20 flex flex-col items-center justify-center font-mono text-xs text-ink-muted gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-amber-700" />
              <span>COLLECTING MEDIA PLATES FROM ALL SITE MODULES...</span>
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-stone-300 p-8 space-y-2">
              <Eye className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="font-serif text-lg text-ink">No photos match your filter</p>
              <p className="font-mono text-xs text-ink-muted">
                Try clearing your search query or selecting &quot;All Pages&quot;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPhotos.map((photo, index) => (
                <article
                  key={photo.id}
                  className="group bg-white rounded-2xl border border-stone-300 overflow-hidden shadow-xs hover:shadow-lg hover:border-stone-400 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Photo Display with Click to Lightbox */}
                  <div
                    onClick={() => openLightbox(index)}
                    className="relative aspect-[16/10] w-full bg-stone-200 cursor-pointer overflow-hidden"
                  >
                    <Image
                      src={photo.thumbnailUrl || photo.url}
                      alt={photo.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Location Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-stone-900/85 backdrop-blur-sm text-stone-200 font-mono text-[9px] uppercase tracking-wider font-semibold border border-white/10">
                        {photo.pageLocation}
                      </span>
                    </div>

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white text-stone-950 font-mono text-[10px] uppercase tracking-wider font-bold shadow-lg flex items-center gap-1.5">
                        <Maximize2 className="w-3 h-3" />
                        <span>Inspect Plate</span>
                      </span>
                    </div>
                  </div>

                  {/* Photo Metadata Card */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between font-mono text-[10px] text-ink-faint border-b border-stone-200 pb-1.5">
                        <span className="truncate max-w-[140px] uppercase">{photo.section}</span>
                        <span className="uppercase text-amber-800 font-semibold">{photo.sourceType}</span>
                      </div>

                      <h4 className="font-serif text-base font-medium text-ink mt-2 leading-snug line-clamp-2">
                        {photo.title}
                      </h4>

                      <p className="font-mono text-[10px] text-ink-muted mt-1 uppercase tracking-wider">
                        {photo.discipline}
                      </p>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-stone-200 flex items-center justify-between font-mono text-[10px]">
                      <span className="text-ink-faint uppercase">
                        {photo.aspectRatio} • {photo.width && photo.height ? `${photo.width}x${photo.height}` : "HD"}
                      </span>

                      <a
                        href={photo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-ink hover:text-stone-600 transition-colors"
                        title="Open image in new tab"
                      >
                        <span>Direct URL</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ================================================================== */}
        {/* 4. SECURITY AUDIT LEDGER */}
        {/* ================================================================== */}
        <section className="space-y-4 pt-6 border-t border-stone-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
              <Clock className="w-4 h-4 text-stone-500" />
              <span>CRYPTOGRAPHIC SECURITY AUDIT LOG</span>
            </div>
            <span className="font-mono text-[11px] text-ink-faint">
              Latest 50 events persisted
            </span>
          </div>

          <div className="bg-stone-900 text-stone-200 rounded-2xl p-6 font-mono text-xs border border-stone-800 overflow-x-auto">
            <div className="space-y-2">
              {status?.killSwitch.auditLog && status.killSwitch.auditLog.length > 0 ? (
                status.killSwitch.auditLog.map((log) => (
                  <div
                    key={log.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-stone-800/80 gap-2 text-[11px]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-stone-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                      <span
                        className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                          log.action.includes("ENGAGED")
                            ? "bg-red-950 text-red-400 border border-red-800"
                            : log.action.includes("DISARMED")
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-stone-800 text-amber-300"
                        }`}
                      >
                        {log.action}
                      </span>
                      <span className="text-stone-300">{log.details}</span>
                    </div>
                    <span className="text-stone-500 text-[10px] uppercase">
                      BY: {log.actor}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-stone-500">No audit events recorded yet.</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
