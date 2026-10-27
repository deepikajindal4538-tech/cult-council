import "server-only";
import { z } from "zod";

// Input validation schemas
export const albumIdSchema = z
  .string()
  .trim()
  .min(1, "Album ID is required")
  .max(30, "Album ID is too long")
  .regex(/^[0-9]+$/, "Album ID must be a numeric string");

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  per_page: z.coerce.number().int().min(1).max(50).default(20),
});

// Output trimmed schemas (strictly no raw Flickr fields or secrets exposed)
export const trimmedAlbumSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  photoCount: z.number(),
  coverImageUrl: z.string().url(),
  dateCreated: z.string().optional(),
});

export const trimmedPhotoSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnailUrl: z.string().url(),
  displayUrl: z.string().url(),
  fullUrl: z.string().url(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const trimmedAlbumsResponseSchema = z.object({
  total: z.number(),
  page: z.number(),
  perPage: z.number(),
  pages: z.number(),
  albums: z.array(trimmedAlbumSchema),
});

export const trimmedAlbumPhotosResponseSchema = z.object({
  albumId: z.string(),
  title: z.string(),
  total: z.number(),
  page: z.number(),
  perPage: z.number(),
  pages: z.number(),
  photos: z.array(trimmedPhotoSchema),
});

export type TrimmedAlbum = z.infer<typeof trimmedAlbumSchema>;
export type TrimmedPhoto = z.infer<typeof trimmedPhotoSchema>;
export type TrimmedAlbumsResponse = z.infer<typeof trimmedAlbumsResponseSchema>;
export type TrimmedAlbumPhotosResponse = z.infer<typeof trimmedAlbumPhotosResponseSchema>;
