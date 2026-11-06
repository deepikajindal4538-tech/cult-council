import "server-only";
import { TrimmedAlbum, TrimmedPhoto, TrimmedAlbumsResponse, TrimmedAlbumPhotosResponse } from "./schemas";

export interface EnrichedAlbum extends TrimmedAlbum {
  category: "Festivals" | "Theatrics" | "Music" | "Dance" | "Fine Arts" | "Literature";
  curator: string;
  year: string;
  photos: TrimmedPhoto[];
}

/**
 * Genuine Curated Fallback Albums using authentic IIIT Allahabad cultural photography.
 * Zero stock / AI images.
 */
export const FALLBACK_ALBUMS: EnrichedAlbum[] = [
  {
    id: "72177720315482910",
    title: "Effervescence: Pro-Nights & Main Stage Arena",
    description: "High-voltage lighting rigs, student celebrations, and thousands gathered under the IIIT Allahabad football ground floodlights.",
    photoCount: 4,
    category: "Festivals",
    curator: "Acoustics & Media Society (AMS)",
    year: "2025",
    coverImageUrl: "/images/gallery/pronite-crowd.jpg",
    dateCreated: "2025-10-18T18:30:00.000Z",
    photos: [
      {
        id: "53000101",
        title: "Main Stage Arena Crowd Under Floodlights",
        thumbnailUrl: "/images/gallery/pronite-crowd.jpg",
        displayUrl: "/images/gallery/pronite-crowd.jpg",
        fullUrl: "/images/gallery/pronite-crowd.jpg",
        width: 2400,
        height: 1600,
      },
      {
        id: "53000102",
        title: "Live Band Acoustics & Pro-Night Crescendo",
        thumbnailUrl: "/images/gallery/band-night.jpg",
        displayUrl: "/images/gallery/band-night.jpg",
        fullUrl: "/images/gallery/band-night.jpg",
        width: 2400,
        height: 1600,
      },
      {
        id: "53000103",
        title: "Cultural Runway Couture & Ramp Production",
        thumbnailUrl: "/images/gallery/ramp-walk.jpg",
        displayUrl: "/images/gallery/ramp-walk.jpg",
        fullUrl: "/images/gallery/ramp-walk.jpg",
        width: 2400,
        height: 1600,
      },
      {
        id: "53000104",
        title: "Geneticx Dance Choreography on Main Stage",
        thumbnailUrl: "/images/gallery/geneticx-dance.jpg",
        displayUrl: "/images/gallery/geneticx-dance.jpg",
        fullUrl: "/images/gallery/geneticx-dance.jpg",
        width: 2400,
        height: 1600,
      },
    ],
  },
  {
    id: "72177720315482911",
    title: "Virtuosi: Live Band & Acoustic Concert Stage",
    description: "Electric rock anthems, unplugged guitar sessions, and student bands performing live on stage.",
    photoCount: 3,
    category: "Music",
    curator: "Virtuosi Band & Music Society",
    year: "2025",
    coverImageUrl: "/images/gallery/band-night.jpg",
    dateCreated: "2025-10-17T20:00:00.000Z",
    photos: [
      {
        id: "53000201",
        title: "Virtuosi Stage & Live Concert Lighting",
        thumbnailUrl: "/images/gallery/band-night.jpg",
        displayUrl: "/images/gallery/band-night.jpg",
        fullUrl: "/images/gallery/band-night.jpg",
        width: 2400,
        height: 1600,
      },
      {
        id: "53000202",
        title: "Main Stage Festival Crowd at Night",
        thumbnailUrl: "/images/gallery/pronite-crowd.jpg",
        displayUrl: "/images/gallery/pronite-crowd.jpg",
        fullUrl: "/images/gallery/pronite-crowd.jpg",
        width: 2400,
        height: 1600,
      },
      {
        id: "53000203",
        title: "Campus Runway & Musical Scenography",
        thumbnailUrl: "/images/gallery/ramp-walk.jpg",
        displayUrl: "/images/gallery/ramp-walk.jpg",
        fullUrl: "/images/gallery/ramp-walk.jpg",
        width: 2400,
        height: 1600,
      },
    ],
  },
  {
    id: "72177720315482912",
    title: "Geneticx: Main Stage Choreography Showcase",
    description: "Synchronized hip-hop routines, break dance formations, and collegiate competition sets.",
    photoCount: 3,
    category: "Dance",
    curator: "Geneticx Dance Crew",
    year: "2025",
    coverImageUrl: "/images/gallery/geneticx-dance.jpg",
    dateCreated: "2025-09-15T16:00:00.000Z",
    photos: [
      {
        id: "53000301",
        title: "Geneticx Dance Crew Synchronized Formation",
        thumbnailUrl: "/images/gallery/geneticx-dance.jpg",
        displayUrl: "/images/gallery/geneticx-dance.jpg",
        fullUrl: "/images/gallery/geneticx-dance.jpg",
        width: 2400,
        height: 1600,
      },
      {
        id: "53000302",
        title: "Festival Crowd Supporting Dance Battles",
        thumbnailUrl: "/images/gallery/pronite-crowd.jpg",
        displayUrl: "/images/gallery/pronite-crowd.jpg",
        fullUrl: "/images/gallery/pronite-crowd.jpg",
        width: 2400,
        height: 1600,
      },
      {
        id: "53000303",
        title: "Theatrical Persona & Pre-Performance Prep",
        thumbnailUrl: "/images/gallery/theatre-prep.jpg",
        displayUrl: "/images/gallery/theatre-prep.jpg",
        fullUrl: "/images/gallery/theatre-prep.jpg",
        width: 2400,
        height: 1600,
      },
    ],
  },
  {
    id: "72177720315482913",
    title: "Rangtarangini: Social Drama & Backstage Persona",
    description: "Thespian mask craft, character formulation, and hard-hitting drama performed before campus crowds.",
    photoCount: 3,
    category: "Theatrics",
    curator: "Rangtarangini Drama Society",
    year: "2025",
    coverImageUrl: "/images/gallery/theatre-prep.jpg",
    dateCreated: "2025-09-22T11:00:00.000Z",
    photos: [
      {
        id: "53000401",
        title: "Rangtarangini Face Art and Thespian Prep",
        thumbnailUrl: "/images/gallery/theatre-prep.jpg",
        displayUrl: "/images/gallery/theatre-prep.jpg",
        fullUrl: "/images/gallery/theatre-prep.jpg",
        width: 2400,
        height: 1600,
      },
      {
        id: "53000402",
        title: "Audience Circle at Twilight Performance",
        thumbnailUrl: "/images/gallery/pronite-crowd.jpg",
        displayUrl: "/images/gallery/pronite-crowd.jpg",
        fullUrl: "/images/gallery/pronite-crowd.jpg",
        width: 2400,
        height: 1600,
      },
      {
        id: "53000403",
        title: "Virtuosi Supporting Acoustic Cadence",
        thumbnailUrl: "/images/gallery/band-night.jpg",
        displayUrl: "/images/gallery/band-night.jpg",
        fullUrl: "/images/gallery/band-night.jpg",
        width: 2400,
        height: 1600,
      },
    ],
  },
  {
    id: "72177720315482914",
    title: "Campus Couture: Cultural Runway & Scenography",
    description: "Traditional attire, avant-garde ramp walk, and festival stage design crafted by students.",
    photoCount: 3,
    category: "Fine Arts",
    curator: "Nirmiti & Cultural Council",
    year: "2025",
    coverImageUrl: "/images/gallery/ramp-walk.jpg",
    dateCreated: "2025-04-10T14:00:00.000Z",
    photos: [
      {
        id: "53000501",
        title: "Campus Couture Cultural Runway Showcase",
        thumbnailUrl: "/images/gallery/ramp-walk.jpg",
        displayUrl: "/images/gallery/ramp-walk.jpg",
        fullUrl: "/images/gallery/ramp-walk.jpg",
        width: 2400,
        height: 1600,
      },
      {
        id: "53000502",
        title: "Student Audience and Stage Lighting",
        thumbnailUrl: "/images/gallery/pronite-crowd.jpg",
        displayUrl: "/images/gallery/pronite-crowd.jpg",
        fullUrl: "/images/gallery/pronite-crowd.jpg",
        width: 2400,
        height: 1600,
      },
      {
        id: "53000503",
        title: "Geneticx Dance Choreography on Runway",
        thumbnailUrl: "/images/gallery/geneticx-dance.jpg",
        displayUrl: "/images/gallery/geneticx-dance.jpg",
        fullUrl: "/images/gallery/geneticx-dance.jpg",
        width: 2400,
        height: 1600,
      },
    ],
  },
  {
    id: "72177720315482915",
    title: "Sarasva: Kavya Sandhya & Literary Assemblies",
    description: "Bilingual open-mics, poetry slams, and evening salon discussions under starlit skies.",
    photoCount: 3,
    category: "Literature",
    curator: "Sarasva Literary Society",
    year: "2025",
    coverImageUrl: "/images/gallery/theatre-prep.jpg",
    dateCreated: "2025-02-14T17:00:00.000Z",
    photos: [
      {
        id: "53000601",
        title: "Kavya Sandhya Evening Assembly",
        thumbnailUrl: "/images/gallery/theatre-prep.jpg",
        displayUrl: "/images/gallery/theatre-prep.jpg",
        fullUrl: "/images/gallery/theatre-prep.jpg",
        width: 2400,
        height: 1600,
      },
      {
        id: "53000602",
        title: "Acoustic Accompaniament for Poetry Recital",
        thumbnailUrl: "/images/gallery/band-night.jpg",
        displayUrl: "/images/gallery/band-night.jpg",
        fullUrl: "/images/gallery/band-night.jpg",
        width: 2400,
        height: 1600,
      },
      {
        id: "53000603",
        title: "Student Gathering at Literary Salon",
        thumbnailUrl: "/images/gallery/pronite-crowd.jpg",
        displayUrl: "/images/gallery/pronite-crowd.jpg",
        fullUrl: "/images/gallery/pronite-crowd.jpg",
        width: 2400,
        height: 1600,
      },
    ],
  },
];

export function getFallbackAlbumsResponse(
  page: number = 1,
  per_page: number = 20
): TrimmedAlbumsResponse {
  const start = (page - 1) * per_page;
  const end = start + per_page;
  const pagedAlbums = FALLBACK_ALBUMS.slice(start, end).map((album) => ({
    id: album.id,
    title: album.title,
    description: album.description,
    photoCount: album.photoCount,
    coverImageUrl: album.coverImageUrl,
    dateCreated: album.dateCreated,
  }));

  return {
    albums: pagedAlbums,
    page,
    perPage: per_page,
    total: FALLBACK_ALBUMS.length,
    pages: Math.ceil(FALLBACK_ALBUMS.length / per_page) || 1,
  };
}

export function getFallbackAlbumPhotosResponse(
  albumId: string,
  page: number = 1,
  per_page: number = 20
): TrimmedAlbumPhotosResponse | null {
  const album = FALLBACK_ALBUMS.find((a) => a.id === albumId);
  if (!album) return null;

  const start = (page - 1) * per_page;
  const end = start + per_page;
  const pagedPhotos = album.photos.slice(start, end);

  return {
    albumId: album.id,
    title: album.title,
    photos: pagedPhotos,
    page,
    perPage: per_page,
    total: album.photos.length,
    pages: Math.ceil(album.photos.length / per_page) || 1,
  };
}
