import "server-only";

export const ALLOWED_FLICKR_METHODS = [
  "flickr.photosets.getList",
  "flickr.photosets.getPhotos",
  "flickr.photos.search",
  "flickr.test.echo",
] as const;

export type AllowedFlickrMethod = (typeof ALLOWED_FLICKR_METHODS)[number];

export function isAllowedMethod(method: string): method is AllowedFlickrMethod {
  return (ALLOWED_FLICKR_METHODS as readonly string[]).includes(method);
}
