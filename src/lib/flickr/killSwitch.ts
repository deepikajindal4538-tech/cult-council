import "server-only";
import fs from "fs";
import path from "path";

export interface FlickrAuditEntry {
  id: string;
  timestamp: string;
  action: "KILL_SWITCH_ENGAGED" | "KILL_SWITCH_DISARMED" | "CACHE_PURGED" | "ADMIN_LOGIN" | "TEST_PING";
  actor: string;
  details?: string;
}

export interface FlickrControlState {
  killed: boolean;
  killedAt: string | null;
  killedReason: string | null;
  killedBy: string | null;
  auditLog: FlickrAuditEntry[];
  lastModified: string;
}

const STATE_FILE_PATH = path.join(process.cwd(), ".flickr-control-state.json");

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
      details: "Initial Flickr wrapper security monitor initialized.",
    },
  ],
  lastModified: new Date().toISOString(),
};

// In-memory fallback in case filesystem is restricted
let inMemoryState: FlickrControlState = { ...DEFAULT_STATE };

function loadState(): FlickrControlState {
  try {
    if (fs.existsSync(STATE_FILE_PATH)) {
      const data = fs.readFileSync(STATE_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data) as FlickrControlState;
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
  actor: string = "ADMIN"
): FlickrControlState {
  const current = loadState();
  const now = new Date().toISOString();

  const auditEntry: FlickrAuditEntry = {
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: now,
    action: killed ? "KILL_SWITCH_ENGAGED" : "KILL_SWITCH_DISARMED",
    actor,
    details: reason,
  };

  const updated: FlickrControlState = {
    ...current,
    killed,
    killedAt: killed ? now : null,
    killedReason: killed ? reason : null,
    killedBy: killed ? actor : null,
    auditLog: [auditEntry, ...(current.auditLog || [])].slice(0, 50), // keep latest 50 entries
    lastModified: now,
  };

  saveState(updated);
  console.warn(
    `[FlickrKillSwitch] Kill switch status changed to: ${killed ? "ENGAGED (LOCKED)" : "DISARMED (NORMAL)"} by ${actor}. Reason: ${reason}`
  );
  return updated;
}

/**
 * Appends an audit entry for security logs.
 */
export function recordAuditAction(
  action: FlickrAuditEntry["action"],
  actor: string,
  details?: string
): void {
  const current = loadState();
  const now = new Date().toISOString();

  const auditEntry: FlickrAuditEntry = {
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: now,
    action,
    actor,
    details,
  };

  const updated: FlickrControlState = {
    ...current,
    auditLog: [auditEntry, ...(current.auditLog || [])].slice(0, 50),
    lastModified: now,
  };

  saveState(updated);
}
