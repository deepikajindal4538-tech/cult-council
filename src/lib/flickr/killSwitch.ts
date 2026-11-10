import "server-only";
import fs from "fs";
import path from "path";
import {
  ROW_1_RESERVE,
  ROW_2_RESERVE,
  ROW_3_RESERVE,
  CarouselReservePlate,
} from "./carouselReserveData";

export interface FlickrAuditEntry {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  ip?: string;
  userAgent?: string;
  status?: "SUCCESS" | "FAILED" | "WARNING" | "INFO";
  details?: string;
}

export interface FolderRouteDirective {
  id: string;
  albumId: string;
  albumTitle: string;
  targetType: "society" | "category" | "home_featured" | "fest_dossier";
  targetDestination: string; // e.g. "/societies/virtuosi" or "Virtuosi Music"
  targetLabel: string;
  badge: string;
  photoCount?: number;
  primaryPhotoUrl?: string;
  status: "Active" | "Archived";
  lastUpdated: string;
}

export interface CustomHeroSlide {
  id: string;
  src: string;
  title: string;
  category: string;
  caption: string;
  societySlug?: string;
  active: boolean;
  order: number;
}

export interface CarouselPlate {
  id: string;
  title: string;
  discipline: string;
  category: string;
  url: string;
  width?: number;
  height?: number;
}

export interface CarouselRowConfig {
  row1Label: string;
  row1SpeedSeconds: number;
  row2Label: string;
  row2SpeedSeconds: number;
  row3Label: string;
  row3SpeedSeconds: number;
  streamSource: "ams_live" | "reserve_plates" | "hybrid" | "custom_selection";
  row1Photos?: CarouselPlate[];
  row2Photos?: CarouselPlate[];
  row3Photos?: CarouselPlate[];
}

export interface FlickrControlState {
  killed: boolean;
  killedAt: string | null;
  killedReason: string | null;
  killedBy: string | null;
  auditLog: FlickrAuditEntry[];
  reserveOverrides?: Record<string, any>;
  heroSliderSlides?: CustomHeroSlide[];
  carouselConfig?: CarouselRowConfig;
  folderRouting?: FolderRouteDirective[];
  lastModified: string;
}

const STATE_FILE_PATH = path.join(process.cwd(), ".flickr-control-state.json");

export const DEFAULT_FOLDER_ROUTES: FolderRouteDirective[] = [
  {
    id: "route-chords-26",
    albumId: "72177720336653475",
    albumTitle: "CHORDS'26",
    targetType: "society",
    targetDestination: "/societies/virtuosi",
    targetLabel: "Virtuosi Music Society",
    badge: "ACOUSTIC & PRO-NIGHT",
    photoCount: 905,
    primaryPhotoUrl: "https://live.staticflickr.com/65535/55630625413_381fcbdab4_z.jpg",
    status: "Active",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "route-freshers-26",
    albumId: "72177720336328066",
    albumTitle: "Freshers'26",
    targetType: "home_featured",
    targetDestination: "/gallery",
    targetLabel: "Home Spotlight & Induction",
    badge: "FLAGSHIP CAMPUS EVENT",
    photoCount: 1745,
    primaryPhotoUrl: "https://live.staticflickr.com/65535/55612140859_43b3ea5c82_z.jpg",
    status: "Active",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "route-garba-26",
    albumId: "72177720336306564",
    albumTitle: "Garba Night '26",
    targetType: "society",
    targetDestination: "/societies/geneticx",
    targetLabel: "Geneticx Dance Society",
    badge: "TRADITIONAL & CHOREOGRAPHY",
    photoCount: 663,
    primaryPhotoUrl: "https://live.staticflickr.com/65535/55611655088_b3ce00b977_z.jpg",
    status: "Active",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "route-asmita-26",
    albumId: "72177720336317860",
    albumTitle: "Tug of war -ASMITA'26",
    targetType: "fest_dossier",
    targetDestination: "/fests",
    targetLabel: "Asmita Annual Sports Fest",
    badge: "CHAMPIONSHIP ARENA",
    photoCount: 191,
    primaryPhotoUrl: "https://live.staticflickr.com/65535/55611655088_b3ce00b977_z.jpg",
    status: "Active",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "route-mun-26",
    albumId: "72177720336275432",
    albumTitle: "MUN'26",
    targetType: "society",
    targetDestination: "/societies/sarasva",
    targetLabel: "Sarasva Literary Society",
    badge: "DIPLOMACY & ORATORY",
    photoCount: 1339,
    primaryPhotoUrl: "https://live.staticflickr.com/65535/55606477985_2158cc821b_z.jpg",
    status: "Active",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "route-prayaas-26",
    albumId: "72177720336275717",
    albumTitle: "Prayaas Poster Making'26",
    targetType: "society",
    targetDestination: "/societies/nirmiti",
    targetLabel: "Nirmiti Fine Arts Society",
    badge: "LIVE CANVAS & DESIGN",
    photoCount: 66,
    primaryPhotoUrl: "https://live.staticflickr.com/65535/55605970746_3146a6776d_z.jpg",
    status: "Active",
    lastUpdated: new Date().toISOString(),
  },
];

export const DEFAULT_HERO_SLIDES: CustomHeroSlide[] = [
  {
    id: "band-night",
    src: "/images/gallery/band-night.jpg",
    title: "Virtuosi Stage & Live Concert",
    category: "Acoustics & Pro-Night",
    caption: "Live band acoustics under the festival stage floodlights",
    societySlug: "virtuosi",
    active: true,
    order: 1,
  },
  {
    id: "geneticx-dance",
    src: "/images/gallery/geneticx-dance.jpg",
    title: "Geneticx Dance Crew",
    category: "Kinetic Choreography",
    caption: "Synchronized hip-hop and western dance stage production",
    societySlug: "geneticx",
    active: true,
    order: 2,
  },
  {
    id: "theatre-prep",
    src: "/images/gallery/theatre-prep.jpg",
    title: "Rangtarangini Dramatics",
    category: "Theatrics & Face Art",
    caption: "Backstage makeup and stage prep before the annual play",
    societySlug: "rangtarangini",
    active: true,
    order: 3,
  },
  {
    id: "pronite-crowd",
    src: "/images/gallery/pronite-crowd.jpg",
    title: "Effervescence Arena",
    category: "Campus Celebration",
    caption: "Thousands of students gathered under the arena floodlights",
    societySlug: "ams",
    active: true,
    order: 4,
  },
  {
    id: "ramp-walk",
    src: "/images/gallery/ramp-walk.jpg",
    title: "Cultural Runway & Couture",
    category: "Fashion & Avant-Garde",
    caption: "Mythological motifs and high-fashion runway showcase",
    societySlug: "nirmiti",
    active: true,
    order: 5,
  },
];

function mapReserveToPlate(p: CarouselReservePlate): CarouselPlate {
  return {
    id: p.id,
    title: p.title,
    discipline: p.discipline,
    category: p.category,
    url: p.url,
    width: p.width,
    height: p.height,
  };
}

export const DEFAULT_CAROUSEL_CONFIG: CarouselRowConfig = {
  row1Label: "ROW 01 // ACOUSTICS & PRO-NIGHTS",
  row1SpeedSeconds: 40,
  row2Label: "ROW 02 // KINETIC CHOREOGRAPHY & DANCE",
  row2SpeedSeconds: 48,
  row3Label: "ROW 03 // DRAMA & FINE ARTS",
  row3SpeedSeconds: 44,
  streamSource: "ams_live",
  row1Photos: ROW_1_RESERVE.map(mapReserveToPlate),
  row2Photos: ROW_2_RESERVE.map(mapReserveToPlate),
  row3Photos: ROW_3_RESERVE.map(mapReserveToPlate),
};

const DEFAULT_STATE: FlickrControlState = {
  killed: false,
  killedAt: null,
  killedReason: null,
  killedBy: null,
  auditLog: [
    {
      id: "init-1",
      timestamp: new Date().toISOString(),
      action: "KILL_SWITCH_DISARMED",
      actor: "SYSTEM",
      ip: "127.0.0.1",
      status: "SUCCESS",
      details: "Initial Flickr wrapper security monitor initialized.",
    },
  ],
  folderRouting: DEFAULT_FOLDER_ROUTES,
  heroSliderSlides: DEFAULT_HERO_SLIDES,
  carouselConfig: DEFAULT_CAROUSEL_CONFIG,
  reserveOverrides: {},
  lastModified: new Date().toISOString(),
};

// In-memory fallback in case filesystem is restricted
let inMemoryState: FlickrControlState = { ...DEFAULT_STATE };

function loadState(): FlickrControlState {
  try {
    if (fs.existsSync(STATE_FILE_PATH)) {
      const data = fs.readFileSync(STATE_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data) as FlickrControlState;
      if (!parsed.folderRouting) parsed.folderRouting = DEFAULT_FOLDER_ROUTES;
      if (!parsed.heroSliderSlides) parsed.heroSliderSlides = DEFAULT_HERO_SLIDES;
      if (!parsed.carouselConfig) parsed.carouselConfig = DEFAULT_CAROUSEL_CONFIG;
      if (!parsed.reserveOverrides) parsed.reserveOverrides = {};
      inMemoryState = parsed;
      return parsed;
    }
  } catch (err) {
    console.warn("[FlickrKillSwitch] Failed to read state from disk, using memory cache:", err);
  }
  return inMemoryState;
}

function saveState(state: FlickrControlState): void {
  inMemoryState = state;
  try {
    fs.writeFileSync(STATE_FILE_PATH, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.warn("[FlickrKillSwitch] Failed to write state to disk, persisting in memory:", err);
  }
}

/**
 * Checks if the Flickr API kill switch is currently active.
 * When true, ZERO network requests should be made to Flickr's endpoints.
 */
export function isFlickrKilled(): boolean {
  const state = loadState();
  return Boolean(state.killed);
}

/**
 * Returns the full control state including kill status and audit history.
 */
export function getFlickrControlState(): FlickrControlState {
  return loadState();
}

/**
 * Activates or deactivates the emergency kill switch.
 */
export function setFlickrKillSwitch(
  killed: boolean,
  reason: string = "Admin manual override",
  actor: string = "ADMIN",
  ip: string = "127.0.0.1",
  userAgent: string = "Terminal UI"
): FlickrControlState {
  const current = loadState();
  const now = new Date().toISOString();

  const auditEntry: FlickrAuditEntry = {
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: now,
    action: killed ? "KILL_SWITCH_ENGAGED" : "KILL_SWITCH_DISARMED",
    actor,
    ip,
    userAgent,
    status: killed ? "WARNING" : "SUCCESS",
    details: reason,
  };

  const updated: FlickrControlState = {
    ...current,
    killed,
    killedAt: killed ? now : null,
    killedReason: killed ? reason : null,
    killedBy: killed ? actor : null,
    auditLog: [auditEntry, ...(current.auditLog || [])].slice(0, 100),
    lastModified: now,
  };

  saveState(updated);
  console.warn(
    `[FlickrKillSwitch] Kill switch status changed to: ${killed ? "ENGAGED (LOCKED)" : "DISARMED (NORMAL)"} by ${actor} (IP: ${ip}). Reason: ${reason}`
  );
  return updated;
}

/**
 * Appends an audit entry for security logs with IP tracking.
 */
export function recordAuditAction(
  action: string,
  actor: string,
  details?: string,
  ip: string = "127.0.0.1",
  userAgent: string = "Server Internal",
  status: "SUCCESS" | "FAILED" | "WARNING" | "INFO" = "INFO"
): void {
  const current = loadState();
  const now = new Date().toISOString();

  const auditEntry: FlickrAuditEntry = {
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: now,
    action,
    actor,
    ip,
    userAgent,
    status,
    details,
  };

  const updated: FlickrControlState = {
    ...current,
    auditLog: [auditEntry, ...(current.auditLog || [])].slice(0, 100),
    lastModified: now,
  };

  saveState(updated);
}

export function clearAuditLog(actor: string = "ADMIN", ip: string = "127.0.0.1"): FlickrControlState {
  const current = loadState();
  const now = new Date().toISOString();

  const initEntry: FlickrAuditEntry = {
    id: `audit-${Date.now()}`,
    timestamp: now,
    action: "LOGS_CLEARED",
    actor,
    ip,
    status: "INFO",
    details: `Audit log cleared by ${actor}`,
  };

  const updated: FlickrControlState = {
    ...current,
    auditLog: [initEntry],
    lastModified: now,
  };

  saveState(updated);
  return updated;
}

// ==========================================
// Folder Directory Routing Methods
// ==========================================
export function getFolderRoutes(): FolderRouteDirective[] {
  const state = loadState();
  return state.folderRouting || DEFAULT_FOLDER_ROUTES;
}

export function saveFolderRoute(
  route: Partial<FolderRouteDirective> & { albumId: string; albumTitle: string; targetDestination: string },
  actor: string = "ADMIN",
  ip: string = "127.0.0.1"
): FolderRouteDirective[] {
  const state = loadState();
  const routes = state.folderRouting || DEFAULT_FOLDER_ROUTES;
  const now = new Date().toISOString();

  const existingIndex = routes.findIndex((r) => r.id === route.id || r.albumId === route.albumId);
  let updatedRoutes: FolderRouteDirective[];

  if (existingIndex >= 0) {
    const existing = routes[existingIndex];
    const merged: FolderRouteDirective = {
      ...existing,
      ...route,
      lastUpdated: now,
    };
    updatedRoutes = [...routes];
    updatedRoutes[existingIndex] = merged;
  } else {
    const newDirective: FolderRouteDirective = {
      id: route.id || `route-${Date.now()}`,
      albumId: route.albumId,
      albumTitle: route.albumTitle,
      targetType: route.targetType || "society",
      targetDestination: route.targetDestination,
      targetLabel: route.targetLabel || route.targetDestination,
      badge: route.badge || "CAMPUS EVENT",
      photoCount: route.photoCount || 0,
      primaryPhotoUrl: route.primaryPhotoUrl || "",
      status: route.status || "Active",
      lastUpdated: now,
    };
    updatedRoutes = [newDirective, ...routes];
  }

  const updatedState: FlickrControlState = {
    ...state,
    folderRouting: updatedRoutes,
    lastModified: now,
  };

  saveState(updatedState);
  recordAuditAction(
    "FOLDER_ROUTE_SAVED",
    actor,
    `Mapped folder "${route.albumTitle}" (${route.albumId}) -> ${route.targetDestination}`,
    ip,
    undefined,
    "SUCCESS"
  );
  return updatedRoutes;
}

export function deleteFolderRoute(routeId: string, actor: string = "ADMIN", ip: string = "127.0.0.1"): FolderRouteDirective[] {
  const state = loadState();
  const routes = state.folderRouting || DEFAULT_FOLDER_ROUTES;
  const target = routes.find((r) => r.id === routeId);

  const updatedRoutes = routes.filter((r) => r.id !== routeId);
  const updatedState: FlickrControlState = {
    ...state,
    folderRouting: updatedRoutes,
    lastModified: new Date().toISOString(),
  };

  saveState(updatedState);
  recordAuditAction(
    "FOLDER_ROUTE_DELETED",
    actor,
    `Removed folder directive "${target?.albumTitle || routeId}"`,
    ip,
    undefined,
    "INFO"
  );
  return updatedRoutes;
}

// ==========================================
// Hero Slider & Carousel Configuration Methods
// ==========================================
export function getHeroSlides(): CustomHeroSlide[] {
  const state = loadState();
  return state.heroSliderSlides || DEFAULT_HERO_SLIDES;
}

export function saveHeroSlides(slides: CustomHeroSlide[], actor: string = "ADMIN", ip: string = "127.0.0.1"): CustomHeroSlide[] {
  const state = loadState();
  const updatedState: FlickrControlState = {
    ...state,
    heroSliderSlides: slides,
    lastModified: new Date().toISOString(),
  };
  saveState(updatedState);
  recordAuditAction("HERO_SLIDES_UPDATED", actor, `Updated ${slides.length} hero showcase slides`, ip, undefined, "SUCCESS");
  return slides;
}

export function getCarouselConfig(): CarouselRowConfig {
  const state = loadState();
  const config = state.carouselConfig || DEFAULT_CAROUSEL_CONFIG;
  return {
    ...DEFAULT_CAROUSEL_CONFIG,
    ...config,
    row1Photos:
      config.row1Photos && config.row1Photos.length > 0
        ? config.row1Photos
        : DEFAULT_CAROUSEL_CONFIG.row1Photos,
    row2Photos:
      config.row2Photos && config.row2Photos.length > 0
        ? config.row2Photos
        : DEFAULT_CAROUSEL_CONFIG.row2Photos,
    row3Photos:
      config.row3Photos && config.row3Photos.length > 0
        ? config.row3Photos
        : DEFAULT_CAROUSEL_CONFIG.row3Photos,
  };
}

export function saveCarouselConfig(config: CarouselRowConfig, actor: string = "ADMIN", ip: string = "127.0.0.1"): CarouselRowConfig {
  const state = loadState();
  const updatedState: FlickrControlState = {
    ...state,
    carouselConfig: config,
    lastModified: new Date().toISOString(),
  };
  saveState(updatedState);
  recordAuditAction(
    "CAROUSEL_CONFIG_SAVED",
    actor,
    `Updated carousel animation speeds (${config.row1SpeedSeconds}s, ${config.row2SpeedSeconds}s, ${config.row3SpeedSeconds}s) and source: ${config.streamSource}`,
    ip,
    undefined,
    "SUCCESS"
  );
  return config;
}

// ==========================================
// Reserve Photos Overrides Methods
// ==========================================
export function getReserveOverrides(): Record<string, any> {
  const state = loadState();
  return state.reserveOverrides || {};
}

export function saveReserveOverride(plateId: string, override: any, actor: string = "ADMIN", ip: string = "127.0.0.1"): Record<string, any> {
  const state = loadState();
  const current = state.reserveOverrides || {};
  const updated = {
    ...current,
    [plateId]: {
      ...(current[plateId] || {}),
      ...override,
      lastModified: new Date().toISOString(),
    },
  };
  const updatedState: FlickrControlState = {
    ...state,
    reserveOverrides: updated,
    lastModified: new Date().toISOString(),
  };
  saveState(updatedState);
  recordAuditAction("RESERVE_PLATE_SAVED", actor, `Updated reserve plate "${plateId}" (${override.title || override.reserveStatus || "edited"})`, ip, undefined, "SUCCESS");
  return updated;
}
