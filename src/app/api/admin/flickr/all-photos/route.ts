import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/flickr/adminAuth";
import { getAllWebsitePhotos } from "@/lib/flickr/allWebsitePhotos";

export async function GET(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const photos = getAllWebsitePhotos();

  // Summary statistics
  const stats = {
    totalPhotos: photos.length,
    byLocation: {
      heroSlider: photos.filter((p) => p.pageLocation === "Hero Slider").length,
      revolvingCarousel: photos.filter((p) => p.pageLocation === "Revolving Carousel").length,
      galleryAlbums: photos.filter((p) => p.pageLocation === "Gallery Albums").length,
      exhibitionObjects: photos.filter((p) => p.pageLocation === "3D Exhibition Objects").length,
    },
    bySourceType: {
      local: photos.filter((p) => p.sourceType === "Local Static Asset").length,
      unsplash: photos.filter((p) => p.sourceType === "Unsplash Curated CDN").length,
      flickr: photos.filter((p) => p.sourceType === "Flickr Live").length,
    },
  };

  return NextResponse.json({ photos, stats }, { status: 200 });
}
