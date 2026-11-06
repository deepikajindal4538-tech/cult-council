import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/flickr/adminAuth";
import {
  getHeroSlides,
  saveHeroSlides,
  getCarouselConfig,
  saveCarouselConfig,
} from "@/lib/flickr/killSwitch";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export async function GET(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const heroSlides = getHeroSlides();
  const carouselConfig = getCarouselConfig();

  return NextResponse.json(
    {
      heroSlides,
      carouselConfig,
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store, max-age=0" },
    }
  );
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const ip = getClientIp(req);

  try {
    const body = await req.json();
    const { heroSlides, carouselConfig } = body;

    let updatedSlides = null;
    let updatedCarousel = null;

    if (heroSlides && Array.isArray(heroSlides)) {
      updatedSlides = saveHeroSlides(heroSlides, "ADMIN_USER", ip);
    }

    if (carouselConfig && typeof carouselConfig === "object") {
      updatedCarousel = saveCarouselConfig(carouselConfig, "ADMIN_USER", ip);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Carousel and Hero slider settings updated successfully.",
        heroSlides: updatedSlides,
        carouselConfig: updatedCarousel,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
