import "server-only";
import { FALLBACK_ALBUMS } from "./fallbackData";

export interface WebsitePhotoItem {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  pageLocation: "Hero Slider" | "Revolving Carousel" | "Gallery Albums" | "Council Leadership";
  section: string;
  discipline: string;
  aspectRatio: string;
  sourceType: "Flickr Live" | "Genuine Campus Photography" | "Council Leadership Archive";
  albumId?: string;
  albumTitle?: string;
  width?: number;
  height?: number;
}

// 1. Hero Slider Genuine Photos
const HERO_SLIDES: WebsitePhotoItem[] = [
  {
    id: "hero-1",
    title: "Virtuosi Stage & Live Concert",
    url: "/images/gallery/band-night.jpg",
    thumbnailUrl: "/images/gallery/band-night.jpg",
    pageLocation: "Hero Slider",
    section: "Homepage Top Hero",
    discipline: "Virtuosi // Acoustics & Pro-Night",
    aspectRatio: "16:9",
    sourceType: "Genuine Campus Photography",
    width: 2400,
    height: 1600,
  },
  {
    id: "hero-2",
    title: "Geneticx Dance Crew Stage Production",
    url: "/images/gallery/geneticx-dance.jpg",
    thumbnailUrl: "/images/gallery/geneticx-dance.jpg",
    pageLocation: "Hero Slider",
    section: "Homepage Top Hero",
    discipline: "Geneticx // Kinetic Choreography",
    aspectRatio: "16:9",
    sourceType: "Genuine Campus Photography",
    width: 2400,
    height: 1600,
  },
  {
    id: "hero-3",
    title: "Rangtarangini Thespians Mask & Face Art",
    url: "/images/gallery/theatre-prep.jpg",
    thumbnailUrl: "/images/gallery/theatre-prep.jpg",
    pageLocation: "Hero Slider",
    section: "Homepage Top Hero",
    discipline: "Rangtarangini // Theatrics & Persona",
    aspectRatio: "16:9",
    sourceType: "Genuine Campus Photography",
    width: 2400,
    height: 1600,
  },
  {
    id: "hero-4",
    title: "Effervescence Main Arena Crowd & Arena Glow",
    url: "/images/gallery/pronite-crowd.jpg",
    thumbnailUrl: "/images/gallery/pronite-crowd.jpg",
    pageLocation: "Hero Slider",
    section: "Homepage Top Hero",
    discipline: "AMS // Festival Celebration",
    aspectRatio: "16:9",
    sourceType: "Genuine Campus Photography",
    width: 2400,
    height: 1600,
  },
  {
    id: "hero-5",
    title: "Cultural Runway & Campus Couture",
    url: "/images/gallery/ramp-walk.jpg",
    thumbnailUrl: "/images/gallery/ramp-walk.jpg",
    pageLocation: "Hero Slider",
    section: "Homepage Top Hero",
    discipline: "Nirmiti // Fashion & Avant-Garde",
    aspectRatio: "16:9",
    sourceType: "Genuine Campus Photography",
    width: 2400,
    height: 1600,
  },
];

// 2. Revolving Carousel Genuine Plates
const CAROUSEL_PLATES: WebsitePhotoItem[] = [
  {
    id: "car-1",
    title: "Effervescence Main Stage Arena Crowd",
    url: "/images/gallery/pronite-crowd.jpg",
    thumbnailUrl: "/images/gallery/pronite-crowd.jpg",
    pageLocation: "Revolving Carousel",
    section: "Chapter 04 Carousel (Row 1)",
    discipline: "AMS // Festival Arena",
    aspectRatio: "16:10",
    sourceType: "Genuine Campus Photography",
    width: 2400,
    height: 1600,
  },
  {
    id: "car-2",
    title: "Virtuosi Stage & Live Concert",
    url: "/images/gallery/band-night.jpg",
    thumbnailUrl: "/images/gallery/band-night.jpg",
    pageLocation: "Revolving Carousel",
    section: "Chapter 04 Carousel (Row 1)",
    discipline: "Virtuosi // Music & Band",
    aspectRatio: "16:10",
    sourceType: "Genuine Campus Photography",
    width: 2400,
    height: 1600,
  },
  {
    id: "car-3",
    title: "Geneticx Dance Crew Stage Production",
    url: "/images/gallery/geneticx-dance.jpg",
    thumbnailUrl: "/images/gallery/geneticx-dance.jpg",
    pageLocation: "Revolving Carousel",
    section: "Chapter 04 Carousel (Row 2)",
    discipline: "Geneticx // Kinetic Choreography",
    aspectRatio: "16:10",
    sourceType: "Genuine Campus Photography",
    width: 2400,
    height: 1600,
  },
  {
    id: "car-4",
    title: "Rangtarangini Thespians Backstage Face Art",
    url: "/images/gallery/theatre-prep.jpg",
    thumbnailUrl: "/images/gallery/theatre-prep.jpg",
    pageLocation: "Revolving Carousel",
    section: "Chapter 04 Carousel (Row 2)",
    discipline: "Rangtarangini // Theatrics & Drama",
    aspectRatio: "16:10",
    sourceType: "Genuine Campus Photography",
    width: 2400,
    height: 1600,
  },
  {
    id: "car-5",
    title: "Campus Couture Cultural Runway",
    url: "/images/gallery/ramp-walk.jpg",
    thumbnailUrl: "/images/gallery/ramp-walk.jpg",
    pageLocation: "Revolving Carousel",
    section: "Chapter 04 Carousel (Row 3)",
    discipline: "Nirmiti // Fashion & Scenography",
    aspectRatio: "16:10",
    sourceType: "Genuine Campus Photography",
    width: 2400,
    height: 1600,
  },
];

// 3. Genuine Student Council Leadership Portraits
const LEADERSHIP_PORTRAITS: WebsitePhotoItem[] = [
  {
    id: "lead-1",
    title: "President Portrait - Student Body President",
    url: "/images/team/president.jpg",
    thumbnailUrl: "/images/team/president.jpg",
    pageLocation: "Council Leadership",
    section: "About Page / Council Roster",
    discipline: "Executive // President",
    aspectRatio: "4:5",
    sourceType: "Council Leadership Archive",
  },
  {
    id: "lead-2",
    title: "Devansh Portrait - General Secretary",
    url: "/images/team/devansh.jpg",
    thumbnailUrl: "/images/team/devansh.jpg",
    pageLocation: "Council Leadership",
    section: "About Page / Council Roster",
    discipline: "Executive // General Secretary",
    aspectRatio: "4:5",
    sourceType: "Council Leadership Archive",
  },
  {
    id: "lead-3",
    title: "Chinmay Portrait - Joint Secretary",
    url: "/images/team/chinmay.jpg",
    thumbnailUrl: "/images/team/chinmay.jpg",
    pageLocation: "Council Leadership",
    section: "About Page / Council Roster",
    discipline: "Executive // Joint Secretary",
    aspectRatio: "4:5",
    sourceType: "Council Leadership Archive",
  },
  {
    id: "lead-4",
    title: "Deepika Portrait - Cultural Secretary",
    url: "/images/team/deepika.jpg",
    thumbnailUrl: "/images/team/deepika.jpg",
    pageLocation: "Council Leadership",
    section: "About Page / Council Roster",
    discipline: "Executive // Cultural Secretary",
    aspectRatio: "4:5",
    sourceType: "Council Leadership Archive",
  },
  {
    id: "lead-5",
    title: "Niharika Portrait - Finance Secretary",
    url: "/images/team/niharika.jpg",
    thumbnailUrl: "/images/team/niharika.jpg",
    pageLocation: "Council Leadership",
    section: "About Page / Council Roster",
    discipline: "Executive // Finance Secretary",
    aspectRatio: "4:5",
    sourceType: "Council Leadership Archive",
  },
  {
    id: "lead-6",
    title: "Aritra Portrait - Technical Head",
    url: "/images/team/aritra.jpg",
    thumbnailUrl: "/images/team/aritra.jpg",
    pageLocation: "Council Leadership",
    section: "About Page / Council Roster",
    discipline: "Executive // Technical Head",
    aspectRatio: "4:5",
    sourceType: "Council Leadership Archive",
  },
  {
    id: "lead-7",
    title: "Aviral Portrait - Logistics Coordinator",
    url: "/images/team/aviral.jpg",
    thumbnailUrl: "/images/team/aviral.jpg",
    pageLocation: "Council Leadership",
    section: "About Page / Council Roster",
    discipline: "Executive // Logistics Coordinator",
    aspectRatio: "4:5",
    sourceType: "Council Leadership Archive",
  },
  {
    id: "lead-8",
    title: "Rajiv Portrait - Media Relations",
    url: "/images/team/rajiv.jpg",
    thumbnailUrl: "/images/team/rajiv.jpg",
    pageLocation: "Council Leadership",
    section: "About Page / Council Roster",
    discipline: "Executive // Media Relations",
    aspectRatio: "4:5",
    sourceType: "Council Leadership Archive",
  },
  {
    id: "lead-9",
    title: "Ronak Portrait - Events Head",
    url: "/images/team/ronak.jpg",
    thumbnailUrl: "/images/team/ronak.jpg",
    pageLocation: "Council Leadership",
    section: "About Page / Council Roster",
    discipline: "Executive // Events Head",
    aspectRatio: "4:5",
    sourceType: "Council Leadership Archive",
  },
  {
    id: "lead-10",
    title: "Shiwangi Portrait - Creatives Head",
    url: "/images/team/shiwangi.jpg",
    thumbnailUrl: "/images/team/shiwangi.jpg",
    pageLocation: "Council Leadership",
    section: "About Page / Council Roster",
    discipline: "Executive // Creatives Head",
    aspectRatio: "4:5",
    sourceType: "Council Leadership Archive",
  },
  {
    id: "lead-11",
    title: "Council Collective Assembly",
    url: "/images/team/mem.jpg",
    thumbnailUrl: "/images/team/mem.jpg",
    pageLocation: "Council Leadership",
    section: "About Page / Council Assembly",
    discipline: "Council // General Body",
    aspectRatio: "4:5",
    sourceType: "Council Leadership Archive",
  },
];

/**
 * Consolidates all genuine photos provided for the website.
 * Zero AI raster objects, zero external stock images.
 */
export function getAllWebsitePhotos(): WebsitePhotoItem[] {
  // Extract all photos from fallback / live gallery albums
  const albumPhotos: WebsitePhotoItem[] = [];

  for (const album of FALLBACK_ALBUMS) {
    for (const p of album.photos) {
      albumPhotos.push({
        id: `album-${album.id}-${p.id}`,
        title: p.title,
        url: p.fullUrl || p.displayUrl,
        thumbnailUrl: p.thumbnailUrl || p.displayUrl,
        pageLocation: "Gallery Albums",
        section: `Album: ${album.title}`,
        discipline: `${album.category} // ${album.curator}`,
        aspectRatio: p.width && p.height ? `${p.width}:${p.height}` : "16:10",
        sourceType: "Genuine Campus Photography",
        albumId: album.id,
        albumTitle: album.title,
        width: p.width,
        height: p.height,
      });
    }
  }

  return [...HERO_SLIDES, ...CAROUSEL_PLATES, ...albumPhotos, ...LEADERSHIP_PORTRAITS];
}
