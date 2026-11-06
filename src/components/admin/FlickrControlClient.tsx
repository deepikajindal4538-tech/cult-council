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
  Sparkles,
  SlidersHorizontal,
  FolderTree,
  FolderGit2,
  ArrowRight,
  Download,
  Copy,
  Check,
  Plus,
  Trash2,
  Edit3,
  Sliders,
  Play,
  Pause,
  MapPin,
  Save,
  Globe,
  Server,
  Zap,
} from "lucide-react";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import { CarouselReservePlate } from "@/lib/flickr/carouselReserveData";
import {
  FolderRouteDirective,
  CustomHeroSlide,
  CarouselRowConfig,
  FlickrAuditEntry,
} from "@/lib/flickr/killSwitch";

// Tab Identifiers
export type AdminTab = "logs" | "reserve" | "carousel-hero" | "routing" | "settings";

interface FlickrStatusData {
  authenticated: boolean;
  killSwitch: {
    killed: boolean;
    killedAt: string | null;
    killedReason: string | null;
    killedBy: string | null;
    auditLog: FlickrAuditEntry[];
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

export default function FlickrControlClient() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>("logs");

  // Dashboard & State
  const [status, setStatus] = useState<FlickrStatusData | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // =========================================================================
  // Tab 1: Audit & IP Logs State
  // =========================================================================
  const [logs, setLogs] = useState<FlickrAuditEntry[]>([]);
  const [logStats, setLogStats] = useState<{
    totalEvents: number;
    uniqueIpsCount: number;
    uniqueIps: string[];
    failedCount: number;
    warningCount: number;
    lastEventTime: string | null;
  } | null>(null);
  const [currentClientIp, setCurrentClientIp] = useState<string>("127.0.0.1");
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [logSearchQuery, setLogSearchQuery] = useState("");
  const [logActionFilter, setLogActionFilter] = useState("ALL");
  const [logIpFilter, setLogIpFilter] = useState("ALL");
  const [copiedIp, setCopiedIp] = useState<string | null>(null);

  // =========================================================================
  // Tab 2: Reserve Photos State
  // =========================================================================
  const [reservePlates, setReservePlates] = useState<CarouselReservePlate[]>([]);
  const [reserveStats, setReserveStats] = useState<{
    total: number;
    activeCount: number;
    standbyCount: number;
    row1Count: number;
    row2Count: number;
    row3Count: number;
  } | null>(null);
  const [isLoadingReserve, setIsLoadingReserve] = useState(false);
  const [reserveRowFilter, setReserveRowFilter] = useState<string>("ALL");
  const [reserveStatusFilter, setReserveStatusFilter] = useState<string>("ALL");
  const [reserveSearchQuery, setReserveSearchQuery] = useState("");
  const [editingPlate, setEditingPlate] = useState<CarouselReservePlate | null>(null);
  const [showAddPlateModal, setShowAddPlateModal] = useState(false);
  const [newPlateForm, setNewPlateForm] = useState({
    title: "",
    event: "Campus Event '26",
    category: "Campus Celebration",
    discipline: "Acoustics & Media",
    url: "",
    reserveRow: 1 as 1 | 2 | 3,
    reserveStatus: "Active" as "Active" | "Standby",
    aspectRatio: "16:9",
  });

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState(0);

  // =========================================================================
  // Tab 3: Carousel & Hero Slider State
  // =========================================================================
  const [carouselHeroSubTab, setCarouselHeroSubTab] = useState<"carousel" | "hero">("carousel");
  const [heroSlides, setHeroSlides] = useState<CustomHeroSlide[]>([]);
  const [carouselConfig, setCarouselConfig] = useState<CarouselRowConfig>({
    row1Label: "ROW 01 // ACOUSTICS & PRO-NIGHTS",
    row1SpeedSeconds: 40,
    row2Label: "ROW 02 // KINETIC CHOREOGRAPHY & DANCE",
    row2SpeedSeconds: 48,
    row3Label: "ROW 03 // THEATRICAL GUILD & LIVE CANVASES",
    row3SpeedSeconds: 44,
    streamSource: "ams_live",
  });
  const [isLoadingCarouselHero, setIsLoadingCarouselHero] = useState(false);
  const [isSavingCarouselHero, setIsSavingCarouselHero] = useState(false);
  const [editingHeroSlide, setEditingHeroSlide] = useState<CustomHeroSlide | null>(null);

  // =========================================================================
  // Tab 4: Folder Routing Directives State
  // =========================================================================
  const [folderRoutes, setFolderRoutes] = useState<FolderRouteDirective[]>([]);
  const [availableRemoteAlbums, setAvailableRemoteAlbums] = useState<
    Array<{ id: string; title: string; photoCount: number; coverImageUrl?: string }>
  >([]);
  const [availableDestinations, setAvailableDestinations] = useState<
    Array<{ type: string; destination: string; label: string }>
  >([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(false);
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [newRouteForm, setNewRouteForm] = useState({
    albumId: "",
    albumTitle: "",
    targetType: "society" as "society" | "category" | "home_featured" | "fest_dossier",
    targetDestination: "/societies/virtuosi",
    targetLabel: "Virtuosi Music Society",
    badge: "ACOUSTIC & PRO-NIGHT",
    status: "Active" as "Active" | "Archived",
  });

  // =========================================================================
  // Tab 5: Settings & Diagnostics State
  // =========================================================================
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

  // Toast Helper
  const showToast = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIp(text);
    setTimeout(() => setCopiedIp(null), 2500);
  };

  // =========================================================================
  // Data Fetchers
  // =========================================================================
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
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoadingStatus(false);
    }
  }, []);

  const fetchLogs = useCallback(async () => {
    setIsLoadingLogs(true);
    try {
      const res = await fetch("/api/admin/flickr/audit-logs", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
        setLogStats(data.stats || null);
        if (data.currentIp) setCurrentClientIp(data.currentIp);
      }
    } catch (err) {
      console.error("Failed to load audit logs:", err);
    } finally {
      setIsLoadingLogs(false);
    }
  }, []);

  const fetchReservePhotos = useCallback(async () => {
    setIsLoadingReserve(true);
    try {
      const res = await fetch("/api/admin/flickr/reserve-photos", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setReservePlates(data.plates || []);
        setReserveStats(data.stats || null);
      }
    } catch (err) {
      console.error("Failed to load reserve photos:", err);
    } finally {
      setIsLoadingReserve(false);
    }
  }, []);

  const fetchCarouselHero = useCallback(async () => {
    setIsLoadingCarouselHero(true);
    try {
      const res = await fetch("/api/admin/flickr/carousel-hero", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.heroSlides) setHeroSlides(data.heroSlides);
        if (data.carouselConfig) setCarouselConfig(data.carouselConfig);
      }
    } catch (err) {
      console.error("Failed to load carousel/hero data:", err);
    } finally {
      setIsLoadingCarouselHero(false);
    }
  }, []);

  const fetchFolderRoutes = useCallback(async () => {
    setIsLoadingRoutes(true);
    try {
      const res = await fetch("/api/admin/flickr/folder-routes", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setFolderRoutes(data.routes || []);
        setAvailableRemoteAlbums(data.availableAlbums || []);
        setAvailableDestinations(data.availableDestinations || []);
      }
    } catch (err) {
      console.error("Failed to load folder routes:", err);
    } finally {
      setIsLoadingRoutes(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLogs();
      fetchReservePhotos();
      fetchCarouselHero();
      fetchFolderRoutes();
    }
  }, [isAuthenticated, fetchLogs, fetchReservePhotos, fetchCarouselHero, fetchFolderRoutes]);

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
        fetchLogs();
        showToast("success", "Terminal authorized. Flickr infrastructure controls active.");
      } else {
        setLoginError(data.error || "Authentication failed.");
        if (typeof data.remainingAttempts === "number") {
          setRemainingAttempts(data.remainingAttempts);
        }
      }
    } catch {
      setLoginError("Failed to communicate with authorization server.");
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
      showToast("success", "Terminal session cleared.");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Handle Kill Switch Toggle
  const handleToggleKillSwitch = async () => {
    if (!status) return;
    setIsTogglingKill(true);

    const newKilledState = !status.killSwitch.killed;
    try {
      const res = await fetch("/api/admin/flickr/kill-switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          killed: newKilledState,
          reason: killReason.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setShowKillModal(false);
        setKillReason("");
        fetchStatus();
        fetchLogs();
        showToast(
          newKilledState ? "error" : "success",
          newKilledState
            ? "EMERGENCY KILL SWITCH ENGAGED: Outbound Flickr traffic blocked."
            : "KILL SWITCH DISARMED: Normal operations restored."
        );
      } else {
        showToast("error", data.error || "Failed to toggle kill switch.");
      }
    } catch {
      showToast("error", "Network error updating kill switch.");
    } finally {
      setIsTogglingKill(false);
    }
  };

  // Handle Ephemeral Ping Test
  const handleTestPing = async () => {
    setIsPinging(true);
    setPingResult(null);

    try {
      const res = await fetch("/api/admin/flickr/test-connection", {
        method: "POST",
      });
      const data = await res.json();
      setPingResult(data);
      fetchLogs();
      if (data.success) {
        showToast("success", `Ping succeeded (${data.latencyMs}ms): ${data.message}`);
      } else {
        showToast("error", `Ping failed: ${data.message}`);
      }
    } catch {
      setPingResult({
        success: false,
        message: "Diagnostic connection request failed.",
      });
      showToast("error", "Failed to execute diagnostic ping.");
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
        fetchStatus();
        fetchLogs();
        showToast("success", "In-memory gallery LRU cache cleared.");
      } else {
        showToast("error", data.error || "Cache purge failed.");
      }
    } catch {
      showToast("error", "Network error purging cache.");
    } finally {
      setIsPurgingCache(false);
    }
  };

  // Handle Clear Logs
  const handleClearLogs = async () => {
    if (!confirm("Are you sure you want to clear all security and audit logs? This action is tracked.")) return;
    try {
      const res = await fetch("/api/admin/flickr/audit-logs", { method: "DELETE" });
      if (res.ok) {
        fetchLogs();
        showToast("success", "Audit log ledger cleared.");
      }
    } catch {
      showToast("error", "Failed to clear audit logs.");
    }
  };

  // Handle Export Logs
  const handleExportLogs = (format: "json" | "csv") => {
    if (format === "json") {
      const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `iiita-flickr-audit-logs-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
    } else {
      const headers = ["Timestamp", "Action", "Actor", "IP", "Status", "Details"];
      const rows = logs.map((l) => [
        `"${l.timestamp}"`,
        `"${l.action}"`,
        `"${l.actor}"`,
        `"${l.ip || "127.0.0.1"}"`,
        `"${l.status || "INFO"}"`,
        `"${(l.details || "").replace(/"/g, '""')}"`,
      ]);
      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `iiita-flickr-audit-logs-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
    }
    showToast("success", `Exported ${logs.length} log records as ${format.toUpperCase()}.`);
  };

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // Action filter
      if (logActionFilter !== "ALL") {
        if (logActionFilter === "LOGIN" && !log.action.includes("LOGIN")) return false;
        if (logActionFilter === "KILL_SWITCH" && !log.action.includes("KILL_SWITCH")) return false;
        if (logActionFilter === "PING" && !log.action.includes("PING")) return false;
        if (logActionFilter === "CACHE" && !log.action.includes("CACHE")) return false;
        if (logActionFilter === "CONFIG" && !log.action.includes("ROUTE") && !log.action.includes("CONFIG") && !log.action.includes("RESERVE")) return false;
      }
      // IP filter
      if (logIpFilter !== "ALL" && (log.ip || "127.0.0.1") !== logIpFilter) {
        return false;
      }
      // Search
      if (logSearchQuery.trim()) {
        const q = logSearchQuery.toLowerCase();
        const matchesAction = log.action.toLowerCase().includes(q);
        const matchesActor = log.actor.toLowerCase().includes(q);
        const matchesIp = (log.ip || "").toLowerCase().includes(q);
        const matchesDetails = (log.details || "").toLowerCase().includes(q);
        return matchesAction || matchesActor || matchesIp || matchesDetails;
      }
      return true;
    });
  }, [logs, logActionFilter, logIpFilter, logSearchQuery]);

  // Filtered Reserve Plates
  const filteredReservePlates = useMemo(() => {
    return reservePlates.filter((p) => {
      if (reserveRowFilter !== "ALL" && String(p.reserveRow) !== reserveRowFilter) {
        return false;
      }
      if (reserveStatusFilter !== "ALL" && p.reserveStatus !== reserveStatusFilter) {
        return false;
      }
      if (reserveSearchQuery.trim()) {
        const q = reserveSearchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.event.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.discipline.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [reservePlates, reserveRowFilter, reserveStatusFilter, reserveSearchQuery]);

  // Lightbox photos mapping
  const lightboxPhotos = useMemo(() => {
    return reservePlates.map((p) => ({
      id: p.id,
      title: `${p.title} (${p.event})`,
      thumbnailUrl: p.thumbnailUrl,
      displayUrl: p.url,
      fullUrl: p.url,
      width: p.width,
      height: p.height,
    }));
  }, [reservePlates]);

  // Handle Quick Reserve Status Toggle
  const handleToggleReservePlateStatus = async (plate: CarouselReservePlate) => {
    const newStatus = plate.reserveStatus === "Active" ? "Standby" : "Active";
    try {
      const res = await fetch("/api/admin/flickr/reserve-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plateId: plate.id,
          updates: { reserveStatus: newStatus },
        }),
      });
      if (res.ok) {
        fetchReservePhotos();
        fetchLogs();
        showToast("success", `Plate #${plate.reserveSlot} set to ${newStatus}.`);
      }
    } catch {
      showToast("error", "Failed to update plate status.");
    }
  };

  // Handle Quick Row Assignment
  const handleChangePlateRow = async (plate: CarouselReservePlate, newRow: 1 | 2 | 3) => {
    try {
      const res = await fetch("/api/admin/flickr/reserve-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plateId: plate.id,
          updates: { reserveRow: newRow },
        }),
      });
      if (res.ok) {
        fetchReservePhotos();
        fetchLogs();
        showToast("success", `Moved Plate #${plate.reserveSlot} to Row ${newRow}.`);
      }
    } catch {
      showToast("error", "Failed to move plate row.");
    }
  };

  // Handle Add Reserve Plate
  const handleAddReservePlate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlateForm.title.trim() || !newPlateForm.url.trim()) return;

    try {
      const res = await fetch("/api/admin/flickr/reserve-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newPlate: {
            ...newPlateForm,
            reserveSlot: reservePlates.length + 1,
          },
        }),
      });
      if (res.ok) {
        setShowAddPlateModal(false);
        setNewPlateForm({
          title: "",
          event: "Campus Event '26",
          category: "Campus Celebration",
          discipline: "Acoustics & Media",
          url: "",
          reserveRow: 1,
          reserveStatus: "Active",
          aspectRatio: "16:9",
        });
        fetchReservePhotos();
        fetchLogs();
        showToast("success", "Added new reserve photo plate.");
      }
    } catch {
      showToast("error", "Failed to add reserve photo plate.");
    }
  };

  // Handle Save Carousel & Hero Settings
  const handleSaveCarouselHero = async () => {
    setIsSavingCarouselHero(true);
    try {
      const res = await fetch("/api/admin/flickr/carousel-hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heroSlides,
          carouselConfig,
        }),
      });
      if (res.ok) {
        fetchCarouselHero();
        fetchLogs();
        showToast("success", "Carousel and Hero slider settings saved.");
      }
    } catch {
      showToast("error", "Failed to save settings.");
    } finally {
      setIsSavingCarouselHero(false);
    }
  };

  // Handle Save Folder Route
  const handleSaveFolderRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRouteForm.albumId || !newRouteForm.albumTitle || !newRouteForm.targetDestination) {
      showToast("error", "Please select an album and target destination.");
      return;
    }

    try {
      const res = await fetch("/api/admin/flickr/folder-routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ route: newRouteForm }),
      });
      if (res.ok) {
        setShowAddRouteModal(false);
        fetchFolderRoutes();
        fetchLogs();
        showToast("success", `Directed "${newRouteForm.albumTitle}" to ${newRouteForm.targetDestination}.`);
      }
    } catch {
      showToast("error", "Failed to save folder routing directive.");
    }
  };

  // Handle Delete Folder Route
  const handleDeleteFolderRoute = async (routeId: string) => {
    if (!confirm("Are you sure you want to delete this folder routing directive?")) return;
    try {
      const res = await fetch(`/api/admin/flickr/folder-routes?id=${routeId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchFolderRoutes();
        fetchLogs();
        showToast("success", "Folder route directive deleted.");
      }
    } catch {
      showToast("error", "Failed to delete folder route.");
    }
  };

  // -------------------------------------------------------------------------
  // Render Login Screen if Unauthenticated
  // -------------------------------------------------------------------------
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-ink">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-amber-700" />
          <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            INITIALIZING CONTROL TERMINAL...
          </span>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4 selection:bg-stone-300">
        <div className="w-full max-w-md bg-[#F4F1EA] border border-stone-300 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-300 bg-white/70 font-mono text-[11px] text-ink-muted">
              <Terminal className="w-3.5 h-3.5 text-amber-700" />
              <span>TERMINAL GATEWAY // AGY-V2.6</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Flickr Master Control
            </h1>
            <p className="font-serif italic text-sm text-ink-muted leading-relaxed">
              Enter the administration passkey to access IP audit logs, reserve management, carousel controls, and folder routing directives.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-ink-faint uppercase tracking-wider mb-2">
                ADMIN PASSKEY
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 pl-10 font-mono text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 transition-all"
                  autoFocus
                />
                <Key className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono flex items-center gap-2">
                <XCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{loginError}</span>
              </div>
            )}

            {remainingAttempts !== null && remainingAttempts < 5 && (
              <p className="font-mono text-[11px] text-amber-800">
                Security lockout active: {remainingAttempts} attempts remaining.
              </p>
            )}

            <button
              type="submit"
              disabled={isLoggingIn || !passkeyInput.trim()}
              className="w-full bg-ink hover:bg-stone-800 disabled:opacity-50 text-white font-mono text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AUTHORIZING...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>UNLOCK MASTER CONTROL</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-stone-300/80 text-center font-mono text-[11px] text-ink-faint">
            Strict IP brute-force protection active • Cultural Council IIITA
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Render Authenticated Multi-Tab Control Dashboard
  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-ink selection:bg-stone-300">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-xl font-mono text-xs flex items-center gap-2.5 border ${
              notification.type === "success"
                ? "bg-emerald-900 text-emerald-100 border-emerald-700"
                : "bg-rose-900 text-rose-100 border-rose-700"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            )}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner & Control Terminal Bar */}
      <header className="border-b border-stone-300 bg-[#F4F1EA] px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-ink text-white shadow-md">
              <Radio className="w-5 h-5 text-amber-500 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-ink-faint uppercase tracking-widest">
                <span>FLICKR GATEWAY // MASTER CONTROL</span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">TERMINAL AUTHORIZED</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
                Flickr Infrastructure &amp; Media Console
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {/* Live Status Pill */}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-sm ${
                status?.killSwitch.killed
                  ? "bg-rose-100 border-rose-300 text-rose-900"
                  : "bg-emerald-100 border-emerald-300 text-emerald-900"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  status?.killSwitch.killed ? "bg-rose-600 animate-ping" : "bg-emerald-600 animate-pulse"
                }`}
              />
              <span className="font-semibold">
                {status?.killSwitch.killed ? "LOCKDOWN: TRAFFIC BLOCKED" : "GATEWAY: LIVE STREAMING"}
              </span>
            </div>

            {/* Current Client IP Badge */}
            <div
              onClick={() => copyToClipboard(currentClientIp)}
              title="Click to copy IP"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-300 text-ink-muted cursor-pointer hover:border-stone-400 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <span>IP: {currentClientIp}</span>
              {copiedIp === currentClientIp ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3 text-stone-400" />
              )}
            </div>

            {/* Disconnect Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-200 hover:bg-stone-300 text-ink transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOCK</span>
            </button>
          </div>
        </div>

        {/* 5-TAB NAVIGATION BAR */}
        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-stone-300/80">
          <nav className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
            <button
              onClick={() => setActiveTab("logs")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === "logs"
                  ? "bg-ink text-white shadow-md font-bold"
                  : "bg-white/80 hover:bg-white text-ink-muted border border-stone-300"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>1. AUDIT &amp; IP LOGS</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeTab === "logs" ? "bg-white/20 text-white" : "bg-stone-200 text-stone-700"
                }`}
              >
                {logs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("reserve")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === "reserve"
                  ? "bg-ink text-white shadow-md font-bold"
                  : "bg-white/80 hover:bg-white text-ink-muted border border-stone-300"
              }`}
            >
              <Database className="w-3.5 h-3.5 text-amber-500" />
              <span>2. RESERVE PHOTOS</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeTab === "reserve" ? "bg-white/20 text-white" : "bg-stone-200 text-stone-700"
                }`}
              >
                {reservePlates.length} Plates
              </span>
            </button>

            <button
              onClick={() => setActiveTab("carousel-hero")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === "carousel-hero"
                  ? "bg-ink text-white shadow-md font-bold"
                  : "bg-white/80 hover:bg-white text-ink-muted border border-stone-300"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
              <span>3. CAROUSEL &amp; HERO</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeTab === "carousel-hero" ? "bg-white/20 text-white" : "bg-stone-200 text-stone-700"
                }`}
              >
                3 Rows • {heroSlides.length} Slides
              </span>
            </button>

            <button
              onClick={() => setActiveTab("routing")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === "routing"
                  ? "bg-ink text-white shadow-md font-bold"
                  : "bg-white/80 hover:bg-white text-ink-muted border border-stone-300"
              }`}
            >
              <FolderTree className="w-3.5 h-3.5 text-amber-500" />
              <span>4. FOLDER DIRECTORY ROUTING</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeTab === "routing" ? "bg-white/20 text-white" : "bg-stone-200 text-stone-700"
                }`}
              >
                {folderRoutes.length} Directives
              </span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === "settings"
                  ? "bg-ink text-white shadow-md font-bold"
                  : "bg-white/80 hover:bg-white text-ink-muted border border-stone-300"
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>5. GATEWAY SETTINGS</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Tab Content Canvas */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* =================================================================== */}
        {/* TAB 1: ALL LOGS WITH PROPER IP TRACKING */}
        {/* =================================================================== */}
        {activeTab === "logs" && (
          <section className="space-y-6">
            {/* IP & Audit Metrics Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#F4F1EA] p-5 rounded-2xl border border-stone-300 space-y-1">
                <span className="font-mono text-[11px] text-ink-faint uppercase tracking-wider block">
                  TOTAL AUDIT EVENTS
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-ink">{logStats?.totalEvents || logs.length}</span>
                  <span className="font-mono text-xs text-stone-500">recorded</span>
                </div>
              </div>

              <div className="bg-[#F4F1EA] p-5 rounded-2xl border border-stone-300 space-y-1">
                <span className="font-mono text-[11px] text-ink-faint uppercase tracking-wider block">
                  UNIQUE IPS TRACKED
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-emerald-800">
                    {logStats?.uniqueIpsCount || 1}
                  </span>
                  <span className="font-mono text-xs text-emerald-700">active callers</span>
                </div>
              </div>

              <div className="bg-[#F4F1EA] p-5 rounded-2xl border border-stone-300 space-y-1">
                <span className="font-mono text-[11px] text-ink-faint uppercase tracking-wider block">
                  FAILED ATTEMPTS
                </span>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`font-serif text-3xl font-bold ${
                      (logStats?.failedCount || 0) > 0 ? "text-rose-700" : "text-stone-700"
                    }`}
                  >
                    {logStats?.failedCount || 0}
                  </span>
                  <span className="font-mono text-xs text-stone-500">interceptions</span>
                </div>
              </div>

              <div className="bg-[#F4F1EA] p-5 rounded-2xl border border-stone-300 space-y-1">
                <span className="font-mono text-[11px] text-ink-faint uppercase tracking-wider block">
                  CURRENT SESSION IP
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-ink">{currentClientIp}</span>
                  <button
                    onClick={() => copyToClipboard(currentClientIp)}
                    className="p-1 hover:bg-stone-300 rounded text-stone-600"
                    title="Copy IP"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter and Control Bar */}
            <div className="bg-[#F4F1EA] p-4 rounded-2xl border border-stone-300 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={logSearchQuery}
                    onChange={(e) => setLogSearchQuery(e.target.value)}
                    placeholder="Search logs by IP, action, actor, or details..."
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2 pl-9 font-mono text-xs text-ink placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700"
                  />
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={logActionFilter}
                    onChange={(e) => setLogActionFilter(e.target.value)}
                    className="bg-white border border-stone-300 rounded-xl px-3 py-2 font-mono text-xs text-ink focus:outline-none"
                  >
                    <option value="ALL">All Actions</option>
                    <option value="LOGIN">Auth &amp; Logins</option>
                    <option value="KILL_SWITCH">Kill Switch Events</option>
                    <option value="PING">Connection Pings</option>
                    <option value="CACHE">Cache Operations</option>
                    <option value="CONFIG">Config &amp; Routes</option>
                  </select>

                  <select
                    value={logIpFilter}
                    onChange={(e) => setLogIpFilter(e.target.value)}
                    className="bg-white border border-stone-300 rounded-xl px-3 py-2 font-mono text-xs text-ink focus:outline-none"
                  >
                    <option value="ALL">All Caller IPs</option>
                    {logStats?.uniqueIps?.map((ip) => (
                      <option key={ip} value={ip}>
                        {ip}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchLogs}
                  disabled={isLoadingLogs}
                  className="px-3 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 font-mono text-xs text-ink flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLogs ? "animate-spin" : ""}`} />
                  <span>REFRESH</span>
                </button>

                <button
                  onClick={() => handleExportLogs("csv")}
                  className="px-3 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 font-mono text-xs text-ink flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>

                <button
                  onClick={() => handleExportLogs("json")}
                  className="px-3 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 font-mono text-xs text-ink flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>

                <button
                  onClick={handleClearLogs}
                  className="px-3 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 font-mono text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>PURGE</span>
                </button>
              </div>
            </div>

            {/* Audit Logs Ledger Table */}
            <div className="bg-white border border-stone-300 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-[#F4F1EA] border-b border-stone-300 text-ink-faint text-[10px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">TIMESTAMP</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4">ACTION</th>
                      <th className="py-3 px-4">CLIENT IP</th>
                      <th className="py-3 px-4">ACTOR</th>
                      <th className="py-3 px-4">AUDIT DETAILS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filteredLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-ink-muted">
                          No audit entries match the current filter or search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLogs.map((log) => {
                        const isSuccess = log.status === "SUCCESS";
                        const isFailed = log.status === "FAILED" || log.action.includes("FAILED");
                        const isWarning = log.status === "WARNING" || log.action.includes("ENGAGED");

                        return (
                          <tr key={log.id} className="hover:bg-stone-50 transition-colors">
                            <td className="py-3 px-4 text-stone-500 whitespace-nowrap">
                              {new Date(log.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              })}{" "}
                              <span className="text-[10px] text-stone-400 block">
                                {new Date(log.timestamp).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  isSuccess
                                    ? "bg-emerald-100 text-emerald-800"
                                    : isFailed
                                    ? "bg-rose-100 text-rose-800"
                                    : isWarning
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-stone-100 text-stone-700"
                                }`}
                              >
                                {isSuccess && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                                {isFailed && <XCircle className="w-3 h-3 text-rose-600" />}
                                {isWarning && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                                {!isSuccess && !isFailed && !isWarning && <Activity className="w-3 h-3 text-stone-500" />}
                                <span>{log.status || "INFO"}</span>
                              </span>
                            </td>
                            <td className="py-3 px-4 font-semibold text-ink whitespace-nowrap">
                              {log.action}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span
                                onClick={() => copyToClipboard(log.ip || "127.0.0.1")}
                                title="Click to copy IP"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-100 text-stone-700 cursor-pointer hover:bg-stone-200 transition-colors"
                              >
                                <span>{log.ip || "127.0.0.1"}</span>
                                {copiedIp === (log.ip || "127.0.0.1") ? (
                                  <Check className="w-2.5 h-2.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-2.5 h-2.5 text-stone-400" />
                                )}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-stone-600 whitespace-nowrap">
                              {log.actor}
                            </td>
                            <td className="py-3 px-4 text-stone-600 max-w-md truncate" title={log.details}>
                              {log.details || "—"}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* TAB 2: MANAGING RESERVE PHOTOS */}
        {/* =================================================================== */}
        {activeTab === "reserve" && (
          <section className="space-y-6">
            {/* Header and Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint mb-1">
                  <Database className="w-3.5 h-3.5 text-amber-700" />
                  <span>50-PLATE RESERVE &amp; OFFLINE FALLBACK ASSETS</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-ink">
                  Reserve Photos Management
                </h2>
                <p className="font-serif italic text-sm text-ink-muted">
                  Configure the 50-image performance reserve used for offline fallback and marquee revolving streams.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddPlateModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-ink text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-stone-800 transition-all shadow-md"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>ADD RESERVE PHOTO</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="bg-[#F4F1EA] p-4 rounded-2xl border border-stone-300 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 font-mono text-xs">
              <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={reserveSearchQuery}
                    onChange={(e) => setReserveSearchQuery(e.target.value)}
                    placeholder="Search reserve photos by title, event, category, or discipline..."
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2 pl-9 font-mono text-xs text-ink placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700"
                  />
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={reserveRowFilter}
                    onChange={(e) => setReserveRowFilter(e.target.value)}
                    className="bg-white border border-stone-300 rounded-xl px-3 py-2 text-ink focus:outline-none"
                  >
                    <option value="ALL">All Carousel Rows</option>
                    <option value="1">Row 1: Acoustical &amp; Pro-Night</option>
                    <option value="2">Row 2: Kinetic Choreography</option>
                    <option value="3">Row 3: Drama &amp; Live Canvases</option>
                  </select>

                  <select
                    value={reserveStatusFilter}
                    onChange={(e) => setReserveStatusFilter(e.target.value)}
                    className="bg-white border border-stone-300 rounded-xl px-3 py-2 text-ink focus:outline-none"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="Active">Active in Stream</option>
                    <option value="Standby">Standby</option>
                  </select>
                </div>
              </div>

              <div className="text-stone-500 font-mono text-xs">
                Showing {filteredReservePlates.length} of {reservePlates.length} plates
              </div>
            </div>

            {/* Visual Grid of Reserve Plates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredReservePlates.map((plate, index) => {
                const isActive = plate.reserveStatus === "Active";

                return (
                  <div
                    key={plate.id}
                    className="bg-white border border-stone-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview with Hover Overlay */}
                      <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden group">
                        <Image
                          src={plate.url}
                          alt={plate.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setLightboxPhotoIndex(index);
                              setLightboxOpen(true);
                            }}
                            className="p-2 rounded-full bg-white/80 hover:bg-white text-ink shadow transition-transform hover:scale-110"
                            title="Inspect Lightbox"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 font-mono text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur-sm">
                            SLOT {plate.reserveSlot}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded backdrop-blur-sm font-bold ${
                              plate.reserveRow === 1
                                ? "bg-amber-600/90 text-white"
                                : plate.reserveRow === 2
                                ? "bg-rose-600/90 text-white"
                                : "bg-indigo-600/90 text-white"
                            }`}
                          >
                            ROW {plate.reserveRow}
                          </span>
                        </div>

                        <div className="absolute top-2.5 right-2.5 font-mono text-[10px]">
                          <span
                            className={`px-2 py-0.5 rounded backdrop-blur-sm font-semibold ${
                              isActive
                                ? "bg-emerald-600/90 text-white"
                                : "bg-stone-600/90 text-stone-200"
                            }`}
                          >
                            {plate.reserveStatus}
                          </span>
                        </div>
                      </div>

                      {/* Content Information */}
                      <div className="p-4 space-y-2 font-mono">
                        <div className="text-[10px] text-amber-800 font-semibold truncate">
                          {plate.event} • {plate.category}
                        </div>
                        <h4 className="font-serif text-base font-semibold text-ink line-clamp-2 leading-snug">
                          {plate.title}
                        </h4>
                        <div className="text-[11px] text-stone-500 truncate">{plate.discipline}</div>
                      </div>
                    </div>

                    {/* Inline Quick Action Controls */}
                    <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between font-mono text-xs">
                      {/* Row Selector */}
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-stone-400">ROW:</span>
                        {[1, 2, 3].map((r) => (
                          <button
                            key={r}
                            onClick={() => handleChangePlateRow(plate, r as 1 | 2 | 3)}
                            className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${
                              plate.reserveRow === r
                                ? "bg-ink text-white"
                                : "bg-stone-200 hover:bg-stone-300 text-stone-700"
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>

                      {/* Status Toggle Switch */}
                      <button
                        onClick={() => handleToggleReservePlateStatus(plate)}
                        className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors ${
                          isActive
                            ? "bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
                            : "bg-stone-200 hover:bg-stone-300 text-stone-700"
                        }`}
                      >
                        {isActive ? "ACTIVE" : "STANDBY"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* TAB 3: CAROUSEL & HERO SLIDER */}
        {/* =================================================================== */}
        {activeTab === "carousel-hero" && (
          <section className="space-y-6">
            {/* Sub-tab Switcher */}
            <div className="flex items-center justify-between border-b border-stone-300 pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint mb-1">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
                  <span>SHOWCASE &amp; ANIMATION CONTROLS</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-ink">
                  Carousel &amp; Hero Showcase Manager
                </h2>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <button
                  onClick={() => setCarouselHeroSubTab("carousel")}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    carouselHeroSubTab === "carousel"
                      ? "bg-ink text-white shadow-md font-bold"
                      : "bg-[#F4F1EA] text-stone-700 hover:bg-stone-200 border border-stone-300"
                  }`}
                >
                  REVOLVING MARQUEE CAROUSEL
                </button>
                <button
                  onClick={() => setCarouselHeroSubTab("hero")}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    carouselHeroSubTab === "hero"
                      ? "bg-ink text-white shadow-md font-bold"
                      : "bg-[#F4F1EA] text-stone-700 hover:bg-stone-200 border border-stone-300"
                  }`}
                >
                  LANDING HERO SLIDER ({heroSlides.length})
                </button>
              </div>
            </div>

            {/* Sub-view: Carousel Configuration */}
            {carouselHeroSubTab === "carousel" && (
              <div className="space-y-6">
                <div className="bg-[#F4F1EA] p-6 rounded-2xl border border-stone-300 space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-300 pb-3">
                    <h3 className="font-serif text-xl font-semibold text-ink">
                      Revolving Marquee Stream Configuration
                    </h3>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-stone-500">STREAM SOURCE:</span>
                      <select
                        value={carouselConfig.streamSource}
                        onChange={(e) =>
                          setCarouselConfig({
                            ...carouselConfig,
                            streamSource: e.target.value as "ams_live" | "reserve_plates" | "hybrid",
                          })
                        }
                        className="bg-white border border-stone-300 rounded-lg px-3 py-1 font-semibold text-amber-800"
                      >
                        <option value="ams_live">Official AMS IIITA Live Albums</option>
                        <option value="reserve_plates">50-Plate Curated Reserve</option>
                        <option value="hybrid">Hybrid (Live Primary + Reserve)</option>
                      </select>
                    </div>
                  </div>

                  {/* 3 Rows Settings */}
                  <div className="space-y-4">
                    {/* Row 1 */}
                    <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-800">STREAM ROW 1 // ACOUSTICS &amp; PRO-NIGHTS</span>
                        <span className="text-stone-500">{carouselConfig.row1SpeedSeconds}s duration</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] text-stone-400 uppercase mb-1">Row Label</label>
                          <input
                            type="text"
                            value={carouselConfig.row1Label}
                            onChange={(e) =>
                              setCarouselConfig({ ...carouselConfig, row1Label: e.target.value })
                            }
                            className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-ink font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-stone-400 uppercase mb-1">
                            Marquee Speed ({carouselConfig.row1SpeedSeconds}s)
                          </label>
                          <input
                            type="range"
                            min="20"
                            max="80"
                            value={carouselConfig.row1SpeedSeconds}
                            onChange={(e) =>
                              setCarouselConfig({
                                ...carouselConfig,
                                row1SpeedSeconds: Number(e.target.value),
                              })
                            }
                            className="w-full accent-amber-700"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-800">STREAM ROW 2 // KINETIC CHOREOGRAPHY &amp; DANCE</span>
                        <span className="text-stone-500">{carouselConfig.row2SpeedSeconds}s duration</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] text-stone-400 uppercase mb-1">Row Label</label>
                          <input
                            type="text"
                            value={carouselConfig.row2Label}
                            onChange={(e) =>
                              setCarouselConfig({ ...carouselConfig, row2Label: e.target.value })
                            }
                            className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-ink font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-stone-400 uppercase mb-1">
                            Marquee Speed ({carouselConfig.row2SpeedSeconds}s)
                          </label>
                          <input
                            type="range"
                            min="20"
                            max="80"
                            value={carouselConfig.row2SpeedSeconds}
                            onChange={(e) =>
                              setCarouselConfig({
                                ...carouselConfig,
                                row2SpeedSeconds: Number(e.target.value),
                              })
                            }
                            className="w-full accent-rose-700"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-800">STREAM ROW 3 // DRAMA &amp; LIVE CANVASES</span>
                        <span className="text-stone-500">{carouselConfig.row3SpeedSeconds}s duration</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] text-stone-400 uppercase mb-1">Row Label</label>
                          <input
                            type="text"
                            value={carouselConfig.row3Label}
                            onChange={(e) =>
                              setCarouselConfig({ ...carouselConfig, row3Label: e.target.value })
                            }
                            className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-ink font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-stone-400 uppercase mb-1">
                            Marquee Speed ({carouselConfig.row3SpeedSeconds}s)
                          </label>
                          <input
                            type="range"
                            min="20"
                            max="80"
                            value={carouselConfig.row3SpeedSeconds}
                            onChange={(e) =>
                              setCarouselConfig({
                                ...carouselConfig,
                                row3SpeedSeconds: Number(e.target.value),
                              })
                            }
                            className="w-full accent-indigo-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      onClick={handleSaveCarouselHero}
                      disabled={isSavingCarouselHero}
                      className="px-5 py-2.5 rounded-xl bg-ink text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-stone-800 transition-all shadow-md"
                    >
                      <Save className="w-4 h-4 text-amber-400" />
                      <span>{isSavingCarouselHero ? "SAVING..." : "SAVE CAROUSEL CONFIGURATION"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-view: Hero Slider Configuration */}
            {carouselHeroSubTab === "hero" && (
              <div className="space-y-4">
                <div className="bg-[#F4F1EA] p-4 rounded-2xl border border-stone-300 flex items-center justify-between">
                  <span className="font-serif italic text-sm text-ink-muted">
                    Active slides appear in rotation at the top of the Home Page landing slider.
                  </span>
                  <button
                    onClick={handleSaveCarouselHero}
                    disabled={isSavingCarouselHero}
                    className="px-4 py-2 rounded-xl bg-ink text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-stone-800 transition-all shadow-md"
                  >
                    <Save className="w-3.5 h-3.5 text-amber-400" />
                    <span>SAVE HERO SLIDES</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {heroSlides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className="bg-white border border-stone-300 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-sm"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-28 h-20 bg-stone-900 rounded-xl overflow-hidden shrink-0">
                          <Image
                            src={slide.src}
                            alt={slide.title}
                            fill
                            sizes="120px"
                            className="object-cover"
                          />
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-white font-mono text-[9px]">
                            #{index + 1}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[10px] font-bold">
                              {slide.category}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold ${
                                slide.active ? "bg-emerald-100 text-emerald-800" : "bg-stone-100 text-stone-500"
                              }`}
                            >
                              {slide.active ? "ACTIVE" : "DISABLED"}
                            </span>
                          </div>
                          <h4 className="font-serif text-lg font-bold text-ink">{slide.title}</h4>
                          <p className="font-serif italic text-xs text-stone-500 max-w-lg">{slide.caption}</p>
                          <div className="font-mono text-[10px] text-stone-400 truncate max-w-md">
                            Source: {slide.src}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs">
                        {/* Toggle Active */}
                        <button
                          onClick={() => {
                            const updated = [...heroSlides];
                            updated[index] = { ...updated[index], active: !updated[index].active };
                            setHeroSlides(updated);
                          }}
                          className={`px-3 py-1.5 rounded-lg border font-semibold ${
                            slide.active
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                              : "bg-stone-100 text-stone-600 border-stone-300 hover:bg-stone-200"
                          }`}
                        >
                          {slide.active ? "ENABLED" : "DISABLED"}
                        </button>

                        {/* Move Up */}
                        <button
                          disabled={index === 0}
                          onClick={() => {
                            if (index === 0) return;
                            const updated = [...heroSlides];
                            const temp = updated[index - 1];
                            updated[index - 1] = updated[index];
                            updated[index] = temp;
                            setHeroSlides(updated);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-30 text-stone-700"
                        >
                          ↑
                        </button>

                        {/* Move Down */}
                        <button
                          disabled={index === heroSlides.length - 1}
                          onClick={() => {
                            if (index === heroSlides.length - 1) return;
                            const updated = [...heroSlides];
                            const temp = updated[index + 1];
                            updated[index + 1] = updated[index];
                            updated[index] = temp;
                            setHeroSlides(updated);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-30 text-stone-700"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* =================================================================== */}
        {/* TAB 4: MANAGE WHICH FOLDER IS DIRECTED WHERE */}
        {/* =================================================================== */}
        {activeTab === "routing" && (
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint mb-1">
                  <FolderTree className="w-3.5 h-3.5 text-amber-700" />
                  <span>FLICKR FOLDER &amp; ALBUM DIRECTORY ROUTING</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-ink">
                  Folder Directory Routing Manager
                </h2>
                <p className="font-serif italic text-sm text-ink-muted max-w-2xl">
                  Map and direct any of the 968 official Acoustics &amp; Media Society (AMS IIITA) albums to specific society wings, gallery highlights, or festival dossiers.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddRouteModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-ink text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-stone-800 transition-all shadow-md"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>ADD FOLDER ROUTING DIRECTIVE</span>
                </button>
              </div>
            </div>

            {/* Directives Catalog */}
            <div className="space-y-4">
              {folderRoutes.map((route) => (
                <div
                  key={route.id}
                  className="bg-white border border-stone-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  {/* Left: Source Album Box */}
                  <div className="flex items-center gap-4 min-w-[280px]">
                    <div className="relative w-20 h-16 bg-stone-900 rounded-xl overflow-hidden shrink-0">
                      {route.primaryPhotoUrl ? (
                        <Image
                          src={route.primaryPhotoUrl}
                          alt={route.albumTitle}
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-500 font-mono text-[10px]">
                          ALBUM
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 font-mono">
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest block">
                        SOURCE FLICKR ALBUM
                      </span>
                      <h4 className="font-serif text-lg font-bold text-ink">{route.albumTitle}</h4>
                      <div className="text-[11px] text-stone-500">
                        ID: {route.albumId} {route.photoCount ? `• ${route.photoCount} photos` : ""}
                      </div>
                    </div>
                  </div>

                  {/* Center: Directed Connector Arrow */}
                  <div className="flex flex-col items-center justify-center font-mono text-xs text-amber-700 px-4">
                    <div className="flex items-center gap-2">
                      <span className="h-[1px] w-8 bg-amber-400 hidden sm:block" />
                      <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-[10px] font-bold">
                        DIRECTED TO
                      </span>
                      <ArrowRight className="w-4 h-4 text-amber-700" />
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">
                      {route.badge}
                    </span>
                  </div>

                  {/* Right: Target Destination Box */}
                  <div className="space-y-1 font-mono min-w-[260px]">
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest block">
                      WEBSITE TARGET DESTINATION
                    </span>
                    <h5 className="font-serif text-base font-semibold text-emerald-800">
                      {route.targetLabel}
                    </h5>
                    <div className="text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded inline-block">
                      {route.targetDestination}
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        route.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      {route.status}
                    </span>

                    <button
                      onClick={() => handleDeleteFolderRoute(route.id)}
                      className="p-2 rounded-lg bg-stone-100 hover:bg-rose-100 text-stone-600 hover:text-rose-700 transition-colors"
                      title="Delete directive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* TAB 5: ALL OTHER SETTINGS (GATEWAY & SYSTEM) */}
        {/* =================================================================== */}
        {activeTab === "settings" && (
          <section className="space-y-6">
            {/* 1. Emergency Kill Switch */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                status?.killSwitch.killed
                  ? "bg-rose-50 border-rose-300 shadow-md"
                  : "bg-[#F4F1EA] border-stone-300"
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
                    {status?.killSwitch.killed ? (
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    )}
                    <span>EMERGENCY NETWORK KILL SWITCH</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-ink">
                    {status?.killSwitch.killed
                      ? "Outbound Flickr Network Calls BLOCKED"
                      : "Flickr API Traffic Gateway Active"}
                  </h3>
                  <p className="font-serif italic text-sm text-ink-muted max-w-2xl">
                    {status?.killSwitch.killed
                      ? `LOCKED by ${status?.killSwitch.killedBy} on ${new Date(
                          status?.killSwitch.killedAt || ""
                        ).toLocaleString()}. Reason: "${status?.killSwitch.killedReason}". Fallback archives are serving 100% of website media.`
                      : "The emergency kill switch immediately arrests all outbound Flickr HTTP requests from the server with 0 network leakage in case of security lockdown or credential rotation."}
                  </p>
                </div>

                <button
                  onClick={() => setShowKillModal(true)}
                  className={`px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 shadow-md active:scale-95 ${
                    status?.killSwitch.killed
                      ? "bg-emerald-700 hover:bg-emerald-800 text-white"
                      : "bg-rose-700 hover:bg-rose-800 text-white"
                  }`}
                >
                  <Power className="w-4 h-4" />
                  <span>
                    {status?.killSwitch.killed ? "DISARM KILL SWITCH" : "ENGAGE KILL SWITCH"}
                  </span>
                </button>
              </div>
            </div>

            {/* 2. Credentials & Diagnostics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ephemeral Ping Test */}
              <div className="bg-[#F4F1EA] p-6 rounded-2xl border border-stone-300 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px] text-ink-faint border-b border-stone-300 pb-2">
                    <span className="uppercase tracking-widest">LIVE FLICKR REST CONNECTIVITY</span>
                    <Activity className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-ink">
                    Diagnostic REST Test Ping
                  </h3>
                  <p className="font-serif italic text-xs text-ink-muted">
                    Run an ephemeral read-only test ping against Flickr API endpoint to verify response time and upstream authorization.
                  </p>

                  {pingResult && (
                    <div
                      className={`p-3.5 rounded-xl border text-xs font-mono space-y-1 ${
                        pingResult.success
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                          : "bg-rose-50 border-rose-300 text-rose-900"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">
                          {pingResult.success ? "STATUS: 200 OK" : "STATUS: FAILED"}
                        </span>
                        {pingResult.latencyMs && (
                          <span>Latency: {pingResult.latencyMs}ms</span>
                        )}
                      </div>
                      <p className="text-[11px] leading-relaxed">{pingResult.message}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleTestPing}
                  disabled={isPinging || status?.killSwitch.killed}
                  className="w-full bg-white hover:bg-stone-100 disabled:opacity-50 text-ink border border-stone-300 font-mono text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-stone-600 ${isPinging ? "animate-spin" : ""}`} />
                  <span>{isPinging ? "SENDING PING..." : "TEST FLICKR CONNECTION"}</span>
                </button>
              </div>

              {/* API Credentials Overview */}
              <div className="bg-[#F4F1EA] p-6 rounded-2xl border border-stone-300 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px] text-ink-faint border-b border-stone-300 pb-2">
                    <span className="uppercase tracking-widest">CREDENTIALS &amp; ALLOWLIST</span>
                    <Lock className="w-3.5 h-3.5 text-stone-600" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-ink">
                    Server-Side Credentials Protection
                  </h3>
                  <div className="space-y-2 font-mono text-[11px] text-ink-muted">
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
                      <span className="block text-[10px] text-ink-faint uppercase">User Account (NSID)</span>
                      <span className="font-bold text-ink">
                        {status?.apiConfig.maskedUserId} (ams_iiita)
                      </span>
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

            {/* 3. In-Memory Cache Control */}
            <div className="bg-[#F4F1EA] p-6 rounded-2xl border border-stone-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 font-mono text-xs">
                <div className="flex items-center gap-2 text-ink-faint uppercase tracking-wider">
                  <Database className="w-4 h-4 text-amber-700" />
                  <span>IN-MEMORY LRU CACHE ENGINE</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-ink">
                  High-Performance TTL Cache
                </h4>
                <p className="text-stone-500 font-mono text-xs">
                  Active in memory: {status?.cacheStats.size || 0} objects • Default TTL: 600s (10 min)
                </p>
              </div>

              <button
                onClick={handlePurgeCache}
                disabled={isPurgingCache}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 font-mono text-xs text-ink flex items-center gap-2 transition-all shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isPurgingCache ? "animate-spin text-amber-700" : ""}`} />
                <span>PURGE LRU CACHE</span>
              </button>
            </div>
          </section>
        )}
      </main>

      {/* =================================================================== */}
      {/* MODAL: ADD RESERVE PHOTO */}
      {/* =================================================================== */}
      {showAddPlateModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#FAF8F5] border border-stone-300 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-300 pb-3">
              <h3 className="font-serif text-xl font-bold text-ink">Add Reserve Photo Plate</h3>
              <button
                onClick={() => setShowAddPlateModal(false)}
                className="p-1 hover:bg-stone-200 rounded-lg text-stone-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReservePlate} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-stone-500 uppercase mb-1">Plate Title</label>
                <input
                  type="text"
                  required
                  value={newPlateForm.title}
                  onChange={(e) => setNewPlateForm({ ...newPlateForm, title: e.target.value })}
                  placeholder="e.g. Acoustic Night Solo Guitar"
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-ink"
                />
              </div>

              <div>
                <label className="block text-stone-500 uppercase mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={newPlateForm.url}
                  onChange={(e) => setNewPlateForm({ ...newPlateForm, url: e.target.value })}
                  placeholder="https://live.staticflickr.com/... or /images/..."
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-500 uppercase mb-1">Event</label>
                  <input
                    type="text"
                    value={newPlateForm.event}
                    onChange={(e) => setNewPlateForm({ ...newPlateForm, event: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-ink"
                  />
                </div>
                <div>
                  <label className="block text-stone-500 uppercase mb-1">Category</label>
                  <input
                    type="text"
                    value={newPlateForm.category}
                    onChange={(e) => setNewPlateForm({ ...newPlateForm, category: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-ink"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-500 uppercase mb-1">Carousel Row</label>
                  <select
                    value={newPlateForm.reserveRow}
                    onChange={(e) =>
                      setNewPlateForm({ ...newPlateForm, reserveRow: Number(e.target.value) as 1 | 2 | 3 })
                    }
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-ink"
                  >
                    <option value={1}>Row 1: Acoustics &amp; Pro-Night</option>
                    <option value={2}>Row 2: Kinetic Choreography</option>
                    <option value={3}>Row 3: Drama &amp; Canvases</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-500 uppercase mb-1">Status</label>
                  <select
                    value={newPlateForm.reserveStatus}
                    onChange={(e) =>
                      setNewPlateForm({
                        ...newPlateForm,
                        reserveStatus: e.target.value as "Active" | "Standby",
                      })
                    }
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-ink"
                  >
                    <option value="Active">Active in Stream</option>
                    <option value="Standby">Standby</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-300">
                <button
                  type="button"
                  onClick={() => setShowAddPlateModal(false)}
                  className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-ink hover:bg-stone-800 text-white font-bold"
                >
                  Add Plate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: ADD FOLDER ROUTING DIRECTIVE */}
      {/* =================================================================== */}
      {showAddRouteModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#FAF8F5] border border-stone-300 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-300 pb-3">
              <h3 className="font-serif text-xl font-bold text-ink">Add Folder Routing Directive</h3>
              <button
                onClick={() => setShowAddRouteModal(false)}
                className="p-1 hover:bg-stone-200 rounded-lg text-stone-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveFolderRoute} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-stone-500 uppercase mb-1">Select Source Flickr Album</label>
                <select
                  value={newRouteForm.albumId}
                  onChange={(e) => {
                    const selected = availableRemoteAlbums.find((a) => a.id === e.target.value);
                    setNewRouteForm({
                      ...newRouteForm,
                      albumId: e.target.value,
                      albumTitle: selected?.title || e.target.value,
                    });
                  }}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-ink"
                >
                  <option value="">-- Choose from AMS IIITA remote albums --</option>
                  {availableRemoteAlbums.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.title} ({a.photoCount} photos) [ID: {a.id}]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-500 uppercase mb-1">Target Website Destination</label>
                <select
                  value={newRouteForm.targetDestination}
                  onChange={(e) => {
                    const dest = availableDestinations.find((d) => d.destination === e.target.value);
                    setNewRouteForm({
                      ...newRouteForm,
                      targetDestination: e.target.value,
                      targetLabel: dest?.label || e.target.value,
                    });
                  }}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-ink"
                >
                  {availableDestinations.map((d) => (
                    <option key={d.destination} value={d.destination}>
                      {d.label} ({d.destination})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-500 uppercase mb-1">Custom Section Badge Text</label>
                <input
                  type="text"
                  value={newRouteForm.badge}
                  onChange={(e) => setNewRouteForm({ ...newRouteForm, badge: e.target.value })}
                  placeholder="e.g. MUSIC SHOWCASE &amp; PRO-NIGHT"
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-ink"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-300">
                <button
                  type="button"
                  onClick={() => setShowAddRouteModal(false)}
                  className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-ink hover:bg-stone-800 text-white font-bold"
                >
                  Direct Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: EMERGENCY KILL SWITCH OVERRIDE */}
      {/* =================================================================== */}
      {showKillModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#FAF8F5] border border-stone-300 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-mono text-xs uppercase tracking-wider font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>KILL SWITCH OVERRIDE CONFIRMATION</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-ink">
              {status?.killSwitch.killed
                ? "Disarm Emergency Kill Switch?"
                : "Engage Emergency Lockdown?"}
            </h3>

            <p className="font-serif italic text-xs text-stone-600 leading-relaxed">
              {status?.killSwitch.killed
                ? "Disarming will immediately restore live outbound API traffic to Flickr REST endpoints and honor cached TTL policies."
                : "Engaging the kill switch instantly blocks 100% of outbound network traffic toward Flickr. All gallery catalogs and carousels will immediately and seamlessly serve the curated offline local fallback datasets."}
            </p>

            <div>
              <label className="block font-mono text-[10px] text-stone-500 uppercase mb-1">
                OVERRIDE REASON (FOR AUDIT LOG)
              </label>
              <input
                type="text"
                value={killReason}
                onChange={(e) => setKillReason(e.target.value)}
                placeholder="e.g. Scheduled maintenance, credential change, security audit"
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 font-mono text-xs text-ink"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-300 font-mono text-xs">
              <button
                type="button"
                onClick={() => setShowKillModal(false)}
                className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleToggleKillSwitch}
                disabled={isTogglingKill}
                className={`px-4 py-2 rounded-lg text-white font-bold ${
                  status?.killSwitch.killed
                    ? "bg-emerald-700 hover:bg-emerald-800"
                    : "bg-rose-700 hover:bg-rose-800"
                }`}
              >
                {isTogglingKill ? "Processing..." : "Confirm Action"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for Zoom / Inspect */}
      {lightboxOpen && (
        <GalleryLightbox
          isOpen={lightboxOpen}
          photos={lightboxPhotos}
          currentIndex={lightboxPhotoIndex}
          onIndexChange={setLightboxPhotoIndex}
          onClose={() => setLightboxOpen(false)}
          albumTitle="Reserve Archive Plates"
        />
      )}
    </div>
  );
}
