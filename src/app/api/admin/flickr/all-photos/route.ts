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
    carouselReserveCount: photos.filter((p) => p.pageLocation === "Revolving Carousel").length,
    majorEventsCount: 8,
    byLocation: {
      heroSlider: photos.filter((p) => p.pageLocation === "Hero Slider").length,
      revolvingCarousel: photos.filter((p) => p.pageLocation === "Revolving Carousel").length,
      galleryAlbums: photos.filter((p) => p.pageLocation === "Gallery Albums").length,
      councilLeadership: photos.filter((p) => p.pageLocation === "Council Leadership").length,
    },
    bySourceType: {
      genuineCampus: photos.filter((p) => p.sourceType === "Genuine Campus Photography").length,
      leadership: photos.filter((p) => p.sourceType === "Council Leadership Archive").length,
      flickr: photos.filter((p) => p.sourceType === "Flickr Live").length,
    },
  };

  return NextResponse.json({ photos, stats }, { status: 200 });
}
