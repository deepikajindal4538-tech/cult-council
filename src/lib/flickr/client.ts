import "server-only";
import { isAllowedMethod, AllowedFlickrMethod } from "./allowlist";
import {
  albumIdSchema,
  paginationQuerySchema,
  TrimmedAlbumsResponse,
  TrimmedAlbumPhotosResponse,
  TrimmedPhoto,
} from "./schemas";
import { transformAlbumsList, transformAlbumPhotos } from "./transform";
import { cache } from "../cache";
import {
  getFallbackAlbumsResponse,
  getFallbackAlbumPhotosResponse,
  FALLBACK_ALBUMS,
} from "./fallbackData";
import { isFlickrKilled, getReserveOverrides, getCarouselConfig } from "./killSwitch";
import { CAROUSEL_RESERVE_50 } from "./carouselReserveData";

function getMergedReservePlates() {
  const overrides = getReserveOverrides();
  return CAROUSEL_RESERVE_50.map((plate) => {
    const override = overrides[plate.id] || {};
    return { ...plate, ...override };
  });
}

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

  if (!apiKey) {
    throw new FlickrClientError("Gallery configuration is incomplete: Missing API Key.", 503);
  }

  // 4. Construct URL with parameters
  const url = new URL(FLICKR_REST_ENDPOINT);
  url.searchParams.set("method", method);
  url.searchParams.set("api_key", apiKey);
  if (userId && !userId.includes("mock") && method !== "flickr.photos.search") {
    url.searchParams.set("user_id", userId);
  }
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
        extras: "url_q,url_m,url_z,url_c,url_l,url_b,url_o,width_q,width_m,width_z,width_c,width_l,width_b,width_o,height_q,height_m,height_z,height_c,height_l,height_b,height_o",
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

export const ALBUM_SEARCH_TOPICS: Record<
  string,
  { query: string; defaultTitle: string; curator: string; category: string; description: string }
> = {
  "72177720315482910": {
    query: "cultural festival concert stage performance crowd arena",
    defaultTitle: "Effervescence '25: Pro-Night Symphonies & Headline Arena",
    curator: "AMS Archives • Effervescence Core",
    category: "Effervescence Fest",
    description: "Multi-genre concerts, headline rock nights, DJ arena euphorias, and electric audience energies captured live under the arena floodlights.",
  },
  "72177720315482911": {
    query: "theatre stage play drama actors proscenium",
    defaultTitle: "Goonj Annual Theatre Guild: Street Plays & Proscenium Stage",
    curator: "AMS Archives • Goonj Guild",
    category: "Goonj Theatrics",
    description: "Raw emotions, thunderous dholak street plays at the main plaza, and nuanced proscenium productions exploring historical and socio-political themes.",
  },
  "72177720315482912": {
    query: "acoustic guitar live music concert violinist classical piano",
    defaultTitle: "Virtuosi Acoustic Sessions: Unplugged & Classical Night",
    curator: "AMS Archives • Virtuosi Music Society",
    category: "Virtuosi Music",
    description: "Unplugged acoustic jam circles, classical violin solos, electric guitar face-offs, and late-night choir recitals at the open-air theatre.",
  },
  "72177720315482913": {
    query: "stage dance choreography dancers performance hiphop",
    defaultTitle: "Geneticx Dance Battles: Choreonite & Western Duos",
    curator: "AMS Archives • Geneticx Society",
    category: "Geneticx Dance",
    description: "High-voltage choreography, synchronized formations, freestyle street battles, and classical-contemporary fusion showdowns.",
  },
  "72177720315482914": {
    query: "art exhibition canvas painting artwork installations",
    defaultTitle: "Nirmiti Fine Arts Showcase: Live Canvas & Installations",
    curator: "AMS Archives • Nirmiti Fine Arts",
    category: "Couture & Fine Arts",
    description: "Live speed-painting, midnight mural marathons, charcoal portraits, and sculptural installations transforming campus corridors.",
  },
  "72177720315482915": {
    query: "poetry slam recitation debate literature spoken word stage",
    defaultTitle: "Sarasva Poetry Slam & National Parliamentary Debate",
    curator: "AMS Archives • Sarasva Literary",
    category: "Sarasva Literary",
    description: "Passionate orations, fierce parliamentary cross-examinations, bilingual poetry recitations, and literary salon discourses.",
  },
};

export async function searchLiveFlickrPhotos(
  searchQuery: { text?: string; tags?: string; per_page?: number; page?: number },
  customFetcher?: typeof fetch
): Promise<TrimmedPhoto[]> {
  const per_page = Math.min(Math.max(searchQuery.per_page || 12, 1), 50);
  const page = Math.max(searchQuery.page || 1, 1);
  const cacheKey = `flickr:search:text=${searchQuery.text || ""}:tags=${searchQuery.tags || ""}:page=${page}:per=${per_page}`;

  const cached = cache.get<TrimmedPhoto[]>(cacheKey);
  if (cached) return cached;

  const apiKey = process.env.FLICKR_API_KEY;
  if (!apiKey || apiKey.includes("mock")) {
    return [];
  }

  const userId = process.env.FLICKR_USER_ID || "129074767@N06";

  const params: Record<string, string | number> = {
    user_id: userId,
    page,
    per_page,
    extras: "url_q,url_m,url_z,url_c,url_l,url_b,url_o,width_q,width_m,width_z,width_c,width_l,width_b,width_o,height_q,height_m,height_z,height_c,height_l,height_b,height_o",
    format: "json",
    nojsoncallback: "1",
    sort: "date-posted-desc",
  };
  if (searchQuery.text) params.text = searchQuery.text;
  if (searchQuery.tags) {
    params.tags = searchQuery.tags;
    params.tag_mode = "any";
  }

  try {
    const raw = await callFlickrApi<{ photos?: { photo: any[] } }>(
      {
        method: "flickr.photos.search",
        params,
        customFetcher,
      },
      cacheKey,
      (json) => json
    );

    const photosList = raw?.photos?.photo || [];
    const transformed: TrimmedPhoto[] = photosList.map((p) => {
      const server = p.server;
      const id = p.id;
      const secret = p.secret;

      const baseStatic = `https://live.staticflickr.com/${server}/${id}_${secret}`;
      const thumbnailUrl = p.url_q || `${baseStatic}_q.jpg`;
      const displayUrl = p.url_l || p.url_c || p.url_z || p.url_b || `${baseStatic}_z.jpg`;
      const fullUrl = p.url_o || p.url_l || p.url_b || p.url_c || displayUrl;

      const width =
        (p.width_l && parseInt(String(p.width_l), 10)) ||
        (p.width_b && parseInt(String(p.width_b), 10)) ||
        (p.width_c && parseInt(String(p.width_c), 10)) ||
        (p.width_z && parseInt(String(p.width_z), 10)) ||
        (p.width_m && parseInt(String(p.width_m), 10)) ||
        (p.width_o && parseInt(String(p.width_o), 10)) ||
        640;

      const height =
        (p.height_l && parseInt(String(p.height_l), 10)) ||
        (p.height_b && parseInt(String(p.height_b), 10)) ||
        (p.height_c && parseInt(String(p.height_c), 10)) ||
        (p.height_z && parseInt(String(p.height_z), 10)) ||
        (p.height_m && parseInt(String(p.height_m), 10)) ||
        (p.height_o && parseInt(String(p.height_o), 10)) ||
        427;

      return {
        id: String(p.id),
        title: p.title || "Cultural Archive Plate",
        thumbnailUrl,
        displayUrl,
        fullUrl,
        width,
        height,
      };
    });

    cache.set(cacheKey, transformed, 600);
    return transformed;
  } catch (err) {
    console.warn("[FlickrClient] searchLiveFlickrPhotos failed:", err instanceof Error ? err.message : err);
    return [];
  }
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

export async function getLiveCarouselRows(): Promise<{
  row1?: CarouselPlate[];
  row2?: CarouselPlate[];
  row3?: CarouselPlate[];
  isLive: boolean;
}> {
  const config = getCarouselConfig();

  // If administrator chose custom selection or reserve plates, serve those directly
  if (config.streamSource === "custom_selection" || config.streamSource === "reserve_plates") {
    return {
      row1: config.row1Photos,
      row2: config.row2Photos,
      row3: config.row3Photos,
      isLive: false,
    };
  }

  const apiKey = process.env.FLICKR_API_KEY;
  const userId = process.env.FLICKR_USER_ID;

  // Only query live Flickr stream if an explicit, non-mock college Flickr account is configured
  if (!apiKey || apiKey.includes("mock") || !userId || userId.includes("mock") || isFlickrKilled()) {
    return {
      row1: config.row1Photos,
      row2: config.row2Photos,
      row3: config.row3Photos,
      isLive: false,
    };
  }

  try {
    const albumsRes = await getAlbums({ page: 1, per_page: 8 });
    const albums = albumsRes.albums || [];
    if (albums.length === 0) {
      return {
        row1: config.row1Photos,
        row2: config.row2Photos,
        row3: config.row3Photos,
        isLive: false,
      };
    }

    const a1 = albums[0]?.id;
    const a2 = albums[1]?.id;
    const a3 = albums[2]?.id;

    const [p1, p2, p3] = await Promise.all([
      a1 ? getAlbumPhotos(a1, { per_page: 14 }) : Promise.resolve({ photos: [] }),
      a2 ? getAlbumPhotos(a2, { per_page: 14 }) : Promise.resolve({ photos: [] }),
      a3 ? getAlbumPhotos(a3, { per_page: 14 }) : Promise.resolve({ photos: [] }),
    ]);

    const liveRow1: CarouselPlate[] = (p1.photos || []).map((p) => ({
      id: p.id,
      title: p.title || "AMS Performance Archive",
      discipline: albums[0]?.title || "Acoustics & Media Society",
      category: "AMS IIITA ARCHIVE",
      url: p.displayUrl,
      width: p.width,
      height: p.height,
    }));

    const liveRow2: CarouselPlate[] = (p2.photos || []).map((p) => ({
      id: p.id,
      title: p.title || "AMS Performance Archive",
      discipline: albums[1]?.title || "Acoustics & Media Society",
      category: "AMS IIITA ARCHIVE",
      url: p.displayUrl,
      width: p.width,
      height: p.height,
    }));

    const liveRow3: CarouselPlate[] = (p3.photos || []).map((p) => ({
      id: p.id,
      title: p.title || "AMS Performance Archive",
      discipline: albums[2]?.title || "Acoustics & Media Society",
      category: "AMS IIITA ARCHIVE",
      url: p.displayUrl,
      width: p.width,
      height: p.height,
    }));

    return {
      row1: liveRow1.length > 0 ? liveRow1 : config.row1Photos,
      row2: liveRow2.length > 0 ? liveRow2 : config.row2Photos,
      row3: liveRow3.length > 0 ? liveRow3 : config.row3Photos,
      isLive: true,
    };
  } catch (err) {
    console.warn("[FlickrClient] Failed to build live AMS carousel rows:", err);
    return {
      row1: config.row1Photos,
      row2: config.row2Photos,
      row3: config.row3Photos,
      isLive: false,
    };
  }
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

  // If user ID is mock or not yet set, serve verified IIITA campus datasets exclusively
  if (!apiKey || apiKey.includes("mock") || !userId || userId.includes("mock")) {
    const fallback = getFallbackAlbumsResponse(query.page || 1, query.per_page || 20);
    return { ...fallback, isLiveFlickr: false };
  }

  // 1. Fetch user's college-specific photosets from Flickr
  try {
    const live = await getAlbums(query);
    if (live.albums && live.albums.length > 0) {
      return { ...live, isLiveFlickr: true };
    }
  } catch (err) {
    console.warn("[FlickrClient] Upstream user photosets fetch failed, falling back to curated IIITA dataset:", err);
  }

  const fallback = getFallbackAlbumsResponse(query.page || 1, query.per_page || 20);
  return { ...fallback, isLiveFlickr: false };
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

  // If user ID is mock or not yet set, serve verified IIITA campus datasets exclusively
  if (!apiKey || apiKey.includes("mock") || !userId || userId.includes("mock")) {
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

  // 1. Fetch user's college-specific album photos from Flickr
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
    console.warn(`[FlickrClient] Remote album fetch for ${albumId} failed, serving curated fallback:`, err);
  }

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

export interface PhotostreamResult {
  photos: TrimmedPhoto[];
  total: number;
  page: number;
  isLiveFlickr: boolean;
}

export async function getPhotostreamWithFallback(
  query: { page?: number; per_page?: number; text?: string } = {}
): Promise<PhotostreamResult> {
  const page = Math.max(query.page || 1, 1);
  const per_page = Math.min(Math.max(query.per_page || 36, 1), 60);

  // If kill switch is active or mock, serve reserve plates
  if (isFlickrKilled() || !process.env.FLICKR_API_KEY || process.env.FLICKR_API_KEY.includes("mock")) {
    const reservePlates = getMergedReservePlates();
    const activePlates = reservePlates.filter((p) => p.reserveStatus === "Active");
    const startIndex = (page - 1) * per_page;
    const paged = activePlates.slice(startIndex, startIndex + per_page);

    const photos: TrimmedPhoto[] = paged.map((p) => ({
      id: p.id,
      title: `${p.title} (${p.event})`,
      thumbnailUrl: p.thumbnailUrl,
      displayUrl: p.url,
      fullUrl: p.url,
      width: p.width,
      height: p.height,
    }));

    return {
      photos,
      total: activePlates.length,
      page,
      isLiveFlickr: false,
    };
  }

  // Live Flickr photostream via search
  try {
    const livePhotos = await searchLiveFlickrPhotos({
      page,
      per_page,
      text: query.text,
    });

    if (livePhotos && livePhotos.length > 0) {
      return {
        photos: livePhotos,
        total: 217624,
        page,
        isLiveFlickr: true,
      };
    }
  } catch (err) {
    console.warn("[FlickrClient] Photostream search failed, serving reserve plates:", err);
  }

  // Fallback to reserve plates
  const reservePlates = getMergedReservePlates();
  const activePlates = reservePlates.filter((p) => p.reserveStatus === "Active");
  const startIndex = (page - 1) * per_page;
  const paged = activePlates.slice(startIndex, startIndex + per_page);

  const photos: TrimmedPhoto[] = paged.map((p) => ({
    id: p.id,
    title: `${p.title} (${p.event})`,
    thumbnailUrl: p.thumbnailUrl,
    displayUrl: p.url,
    fullUrl: p.url,
    width: p.width,
    height: p.height,
  }));

  return {
    photos,
    total: activePlates.length,
    page,
    isLiveFlickr: false,
  };
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

  if (!apiKey) {
    return {
      success: false,
      message: "Credentials missing in environment variables (FLICKR_API_KEY).",
      isKilled: false,
    };
  }

  if (apiKey.includes("mock")) {
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
    const hasLiveUserId = Boolean(userId && !userId.includes("mock"));
    const testMethod = hasLiveUserId ? "flickr.photosets.getList" : "flickr.test.echo";

    const url = new URL(FLICKR_REST_ENDPOINT);
    url.searchParams.set("method", testMethod);
    url.searchParams.set("api_key", apiKey);
    if (hasLiveUserId) {
      url.searchParams.set("user_id", userId!);
      url.searchParams.set("per_page", "1");
    }
    url.searchParams.set("format", "json");
    url.searchParams.set("nojsoncallback", "1");

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

    const message = hasLiveUserId
      ? `Upstream connection verified. Latency: ${latencyMs}ms. Found ${json.photosets?.total || 0} remote albums.`
      : `Live Flickr API verified active & authenticated via Echo endpoint. Latency: ${latencyMs}ms. (API Key authentic. Note: Set FLICKR_USER_ID when albums are ready; site is serving curated fallbacks).`;

    return {
      success: true,
      message,
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
