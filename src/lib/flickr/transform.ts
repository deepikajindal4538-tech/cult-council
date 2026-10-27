import "server-only";
import {
  TrimmedAlbum,
  TrimmedPhoto,
  TrimmedAlbumsResponse,
  TrimmedAlbumPhotosResponse,
} from "./schemas";

interface RawFlickrPhotosetItem {
  id: string;
  primary?: string;
  secret?: string;
  server?: string;
  photos?: number | string;
  count_photos?: number | string;
  title?: { _content?: string } | string;
  description?: { _content?: string } | string;
  date_create?: string;
}

interface RawFlickrPhotoItem {
  id: string;
  secret?: string;
  server?: string;
  title?: { _content?: string } | string;
  width_z?: number | string;
  height_z?: number | string;
  width_b?: number | string;
  height_b?: number | string;
  url_z?: string;
  url_b?: string;
  url_m?: string;
  url_q?: string;
}

function extractText(field: { _content?: string } | string | undefined): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field._content || "";
}

function buildFlickrPhotoUrl(server: string, id: string, secret: string, size: "q" | "w" | "z" | "b" = "b"): string {
  return `https://live.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;
}

export function transformAlbumsList(raw: any): TrimmedAlbumsResponse {
  const photosetsData = raw?.photosets;
  if (!photosetsData) {
    throw new Error("Invalid photosets structure received");
  }

  const rawList: RawFlickrPhotosetItem[] = Array.isArray(photosetsData.photoset)
    ? photosetsData.photoset
    : [];

  const albums: TrimmedAlbum[] = rawList.map((item) => {
    const server = item.server || "65535";
    const primary = item.primary || item.id;
    const secret = item.secret || "";
    const coverImageUrl = secret
      ? buildFlickrPhotoUrl(server, primary, secret, "b")
      : `https://live.staticflickr.com/${server}/${primary}_default_b.jpg`;

    const count = typeof item.photos === "number"
      ? item.photos
      : parseInt(String(item.count_photos || item.photos || "0"), 10);

    return {
      id: String(item.id),
      title: extractText(item.title) || "Untitled Album",
      description: extractText(item.description),
      photoCount: isNaN(count) ? 0 : count,
      coverImageUrl,
      dateCreated: item.date_create ? new Date(parseInt(item.date_create, 10) * 1000).toISOString() : undefined,
    };
  });

  return {
    total: parseInt(String(photosetsData.total || albums.length), 10) || albums.length,
    page: parseInt(String(photosetsData.page || "1"), 10) || 1,
    perPage: parseInt(String(photosetsData.perpage || albums.length), 10) || albums.length,
    pages: parseInt(String(photosetsData.pages || "1"), 10) || 1,
    albums,
  };
}

export function transformAlbumPhotos(albumId: string, raw: any): TrimmedAlbumPhotosResponse {
  const photoset = raw?.photoset;
  if (!photoset) {
    throw new Error("Invalid photoset photos structure received");
  }

  const rawPhotos: RawFlickrPhotoItem[] = Array.isArray(photoset.photo)
    ? photoset.photo
    : [];

  const photos: TrimmedPhoto[] = rawPhotos.map((photo) => {
    const server = photo.server || "65535";
    const secret = photo.secret || "";
    const id = String(photo.id);

    const thumbnailUrl = photo.url_q || buildFlickrPhotoUrl(server, id, secret, "q");
    const displayUrl = photo.url_z || buildFlickrPhotoUrl(server, id, secret, "z");
    const fullUrl = photo.url_b || buildFlickrPhotoUrl(server, id, secret, "b");

    const width = photo.width_b
      ? parseInt(String(photo.width_b), 10)
      : photo.width_z
      ? parseInt(String(photo.width_z), 10)
      : undefined;

    const height = photo.height_b
      ? parseInt(String(photo.height_b), 10)
      : photo.height_z
      ? parseInt(String(photo.height_z), 10)
      : undefined;

    return {
      id,
      title: extractText(photo.title) || "Untitled Photograph",
      thumbnailUrl,
      displayUrl,
      fullUrl,
      width: width && !isNaN(width) ? width : undefined,
      height: height && !isNaN(height) ? height : undefined,
    };
  });

  return {
    albumId,
    title: extractText(photoset.title) || "Album",
    total: parseInt(String(photoset.total || photos.length), 10) || photos.length,
    page: parseInt(String(photoset.page || "1"), 10) || 1,
    perPage: parseInt(String(photoset.perpage || photos.length), 10) || photos.length,
    pages: parseInt(String(photoset.pages || "1"), 10) || 1,
    photos,
  };
}
