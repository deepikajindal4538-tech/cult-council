import "server-only";
import { isAllowedMethod, AllowedFlickrMethod } from "./allowlist";
import {
  albumIdSchema,
  paginationQuerySchema,
  TrimmedAlbumsResponse,
  TrimmedAlbumPhotosResponse,
} from "./schemas";
import { transformAlbumsList, transformAlbumPhotos } from "./transform";
import { cache } from "../cache";
import {
  getFallbackAlbumsResponse,
  getFallbackAlbumPhotosResponse,
  FALLBACK_ALBUMS,
} from "./fallbackData";
import { isFlickrKilled } from "./killSwitch";

const FLICKR_REST_ENDPOINT = "https://www.flickr.com/services/rest/";

export class FlickrClientError extends Error {
  constructor(message = "Gallery service is temporarily unavailable.", public statusCode = 502) {
    super(message);
    this.name = "FlickrClientError";
  }
}

interface FlickrFetchOptions {
  method: AllowedFlickrMethod;
  params?: Record<string, string | number>;
  customFetcher?: typeof fetch;
}

/**
 * Executes a secure, server-only call to Flickr API
 */
async function callFlickrApi<T>(
  options: FlickrFetchOptions,
  cacheKey: string,
  transform: (json: any) => T
): Promise<T> {
  const { method, params = {}, customFetcher = fetch } = options;

  // 0. Emergency Kill Switch Verification
  if (isFlickrKilled()) {
    console.warn("[FlickrClient] Blocked request: Emergency Flickr kill switch is ENGAGED.");
    throw new FlickrClientError("Flickr API access is disabled by emergency kill switch.", 503);
  }

  // 1. Enforce strict allowlist
  if (!isAllowedMethod(method)) {
    throw new FlickrClientError("Unauthorized Flickr method requested.", 403);
  }

  // 2. Check cache first
  const cachedData = cache.get<T>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // 3. Resolve server credentials
  const apiKey = process.env.FLICKR_API_KEY;
  const userId = process.env.FLICKR_USER_ID;

  if (!apiKey || !userId) {
    throw new FlickrClientError("Gallery configuration is incomplete.", 503);
  }

  // 4. Construct URL with parameters
  const url = new URL(FLICKR_REST_ENDPOINT);
  url.searchParams.set("method", method);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("user_id", userId);
  url.searchParams.set("format", "json");
  url.searchParams.set("nojsoncallback", "1");

  for (const [key, val] of Object.entries(params)) {
    url.searchParams.set(key, String(val));
  }

  // 5. Fetch with timeout and error shielding
  let response: Response;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    response = await customFetcher(url.toString(), {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "IIITA-Cultural-Council-Web/1.0",
      },
      next: { revalidate: 600 },
    });
    clearTimeout(timeout);
  } catch (error) {
    console.error("[FlickrClient] Network/timeout error:", error instanceof Error ? error.message : "Unknown");
    throw new FlickrClientError("Failed to communicate with photo service.");
  }

  if (!response.ok) {
    console.error(`[FlickrClient] HTTP error status: ${response.status}`);
    throw new FlickrClientError("Upstream photo service returned an error.");
  }

  let json: any;
  try {
    json = await response.json();
  } catch (parseError) {
    console.error("[FlickrClient] Failed to parse upstream JSON response:", parseError);
    throw new FlickrClientError("Invalid response from photo service.");
  }

  // 6. Check Flickr internal status (stat: 'ok' vs 'fail')
  if (json.stat !== "ok") {
    console.error(`[FlickrClient] Upstream API reported error code: ${json.code}`);
    throw new FlickrClientError("Requested album or photo collection could not be retrieved.", 404);
  }

  // 7. Sanitize and transform to trimmed output
  try {
    const transformed = transform(json);
    // Cache for 10 minutes (600s)
    cache.set(cacheKey, transformed, 600);
    return transformed;
  } catch (transformErr) {
    console.error("[FlickrClient] Data transformation error:", transformErr);
    throw new FlickrClientError("Failed to process gallery data.");
  }
}

/**
 * Public Server-Only Flickr API Methods
 */
export async function getAlbums(
  query: { page?: number; per_page?: number } = {},
  customFetcher?: typeof fetch
): Promise<TrimmedAlbumsResponse> {
  const validatedQuery = paginationQuerySchema.parse(query);
  const cacheKey = `flickr:albums:page=${validatedQuery.page}:per=${validatedQuery.per_page}`;

  return callFlickrApi(
    {
      method: "flickr.photosets.getList",
      params: {
        page: validatedQuery.page,
        per_page: validatedQuery.per_page,
        primary_photo_extras: "url_m,url_z,url_b",
      },
      customFetcher,
    },
    cacheKey,
    transformAlbumsList
  );
}

export async function getAlbumPhotos(
  albumId: string,
  query: { page?: number; per_page?: number } = {},
  customFetcher?: typeof fetch
): Promise<TrimmedAlbumPhotosResponse> {
  const validatedId = albumIdSchema.parse(albumId);
  const validatedQuery = paginationQuerySchema.parse(query);
  const cacheKey = `flickr:photos:${validatedId}:page=${validatedQuery.page}:per=${validatedQuery.per_page}`;

  return callFlickrApi(
    {
      method: "flickr.photosets.getPhotos",
      params: {
        photoset_id: validatedId,
        page: validatedQuery.page,
        per_page: validatedQuery.per_page,
        extras: "url_q,url_z,url_b,width_z,height_z,width_b,height_b",
      },
      customFetcher,
    },
    cacheKey,
    (json) => transformAlbumPhotos(validatedId, json)
  );
}

export interface GalleryAlbumsResult extends TrimmedAlbumsResponse {
  isLiveFlickr: boolean;
  isKilled?: boolean;
}

export interface GalleryAlbumPhotosResult extends TrimmedAlbumPhotosResponse {
  isLiveFlickr: boolean;
  isKilled?: boolean;
  curator?: string;
  category?: string;
  description?: string;
}

/**
 * Resilient gallery fetchers that seamlessly switch between live Flickr and curated fallbacks
 */
export async function getAlbumsWithFallback(
  query: { page?: number; per_page?: number } = {}
): Promise<GalleryAlbumsResult> {
  // If emergency kill switch is active, immediately serve fallback without contacting Flickr
  if (isFlickrKilled()) {
    const fallback = getFallbackAlbumsResponse(query.page || 1, query.per_page || 20);
    return { ...fallback, isLiveFlickr: false, isKilled: true };
  }

  const apiKey = process.env.FLICKR_API_KEY;
  const userId = process.env.FLICKR_USER_ID;

  if (!apiKey || !userId || apiKey.includes("mock") || userId.includes("mock")) {
    const fallback = getFallbackAlbumsResponse(query.page || 1, query.per_page || 20);
    return { ...fallback, isLiveFlickr: false };
  }

  try {
    const live = await getAlbums(query);
    return { ...live, isLiveFlickr: true };
  } catch (err) {
    console.warn(
      "[FlickrClient] Upstream fetch failed, serving curated fallback albums:",
      err instanceof Error ? err.message : err
    );
    const fallback = getFallbackAlbumsResponse(query.page || 1, query.per_page || 20);
    return { ...fallback, isLiveFlickr: false };
  }
}

export async function getAlbumPhotosWithFallback(
  albumId: string,
  query: { page?: number; per_page?: number } = {}
): Promise<GalleryAlbumPhotosResult | null> {
  const enriched = FALLBACK_ALBUMS.find((a) => a.id === albumId);

  // If emergency kill switch is active, immediately serve fallback without contacting Flickr
  if (isFlickrKilled()) {
    const fallback = getFallbackAlbumPhotosResponse(albumId, query.page || 1, query.per_page || 20);
    if (!fallback) return null;
    return {
      ...fallback,
      isLiveFlickr: false,
      isKilled: true,
      curator: enriched?.curator,
      category: enriched?.category,
      description: enriched?.description,
    };
  }

  const apiKey = process.env.FLICKR_API_KEY;
  const userId = process.env.FLICKR_USER_ID;

  if (!apiKey || !userId || apiKey.includes("mock") || userId.includes("mock")) {
    const fallback = getFallbackAlbumPhotosResponse(albumId, query.page || 1, query.per_page || 20);
    if (!fallback) return null;
    return {
      ...fallback,
      isLiveFlickr: false,
      curator: enriched?.curator,
      category: enriched?.category,
      description: enriched?.description,
    };
  }

  try {
    const live = await getAlbumPhotos(albumId, query);
    return {
      ...live,
      isLiveFlickr: true,
      curator: enriched?.curator || "Acoustics & Media Society (AMS)",
      category: enriched?.category || "Cultural Archive",
      description: enriched?.description || "",
    };
  } catch (err) {
    console.warn(
      `[FlickrClient] Upstream fetch for album ${albumId} failed, serving curated fallback:`,
      err instanceof Error ? err.message : err
    );
    const fallback = getFallbackAlbumPhotosResponse(albumId, query.page || 1, query.per_page || 20);
    if (!fallback) return null;
    return {
      ...fallback,
      isLiveFlickr: false,
      curator: enriched?.curator,
      category: enriched?.category,
      description: enriched?.description,
    };
  }
}

/**
 * Diagnostic & Admin Tools
 */
export async function testFlickrConnection(): Promise<{
  success: boolean;
  message: string;
  latencyMs?: number;
  statusCode?: number;
  isKilled: boolean;
}> {
  if (isFlickrKilled()) {
    return {
      success: false,
      message: "Test blocked: Emergency Kill Switch is currently ENGAGED.",
      isKilled: true,
    };
  }

  const apiKey = process.env.FLICKR_API_KEY;
  const userId = process.env.FLICKR_USER_ID;

  if (!apiKey || !userId) {
    return {
      success: false,
      message: "Credentials missing in environment variables (FLICKR_API_KEY or FLICKR_USER_ID).",
      isKilled: false,
    };
  }

  if (apiKey.includes("mock") || userId.includes("mock")) {
    return {
      success: true,
      message: "Simulated ping successful. Running in local mock mode with verified offline fallback dataset.",
      latencyMs: 1,
      statusCode: 200,
      isKilled: false,
    };
  }

  const start = Date.now();
  try {
    const url = new URL(FLICKR_REST_ENDPOINT);
    url.searchParams.set("method", "flickr.photosets.getList");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("user_id", userId);
    url.searchParams.set("format", "json");
    url.searchParams.set("nojsoncallback", "1");
    url.searchParams.set("per_page", "1");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "IIITA-Cultural-Council-Admin-Test/1.0",
      },
      cache: "no-store",
    });
    clearTimeout(timeout);
    const latencyMs = Date.now() - start;

    if (!res.ok) {
      return {
        success: false,
        message: `Upstream HTTP ${res.status}: ${res.statusText}`,
        latencyMs,
        statusCode: res.status,
        isKilled: false,
      };
    }

    const json = await res.json();
    if (json.stat !== "ok") {
      return {
        success: false,
        message: `Flickr API returned stat='fail': Code ${json.code} - ${json.message}`,
        latencyMs,
        isKilled: false,
      };
    }

    return {
      success: true,
      message: `Upstream connection verified. Latency: ${latencyMs}ms. Found ${json.photosets?.total || 0} remote albums.`,
      latencyMs,
      statusCode: 200,
      isKilled: false,
    };
  } catch (err) {
    const latencyMs = Date.now() - start;
    return {
      success: false,
      message: `Connection error: ${err instanceof Error ? err.message : "Network error"}`,
      latencyMs,
      isKilled: false,
    };
  }
}

export function purgeGalleryCache(): { cleared: boolean; timestamp: string } {
  cache.clear();
  return { cleared: true, timestamp: new Date().toISOString() };
}

export function getGalleryCacheStats(): { size: number; defaultTTLSeconds: number } {
  return {
    size: cache.size(),
    defaultTTLSeconds: 600,
  };
}
