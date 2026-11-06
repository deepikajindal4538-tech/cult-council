import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated, getAdminPasskey } from "@/lib/flickr/adminAuth";
import { getFlickrControlState } from "@/lib/flickr/killSwitch";
import { getGalleryCacheStats } from "@/lib/flickr/client";

function maskString(str?: string): string {
  if (!str) return "NOT CONFIGURED";
  if (str.length <= 6) return "******";
  return `${str.slice(0, 3)}****${str.slice(-3)}`;
}

export async function GET(req: NextRequest) {
  const isAuth = isAdminAuthenticated(req);
  if (!isAuth) {
    return NextResponse.json(
      { error: "Unauthorized. Terminal passkey required.", authenticated: false },
      { status: 401 }
    );
  }

  const apiKey = process.env.FLICKR_API_KEY;
  const userId = process.env.FLICKR_USER_ID;
  const isMock = !apiKey || !userId || apiKey.includes("mock") || userId.includes("mock");
  const controlState = getFlickrControlState();
  const cacheStats = getGalleryCacheStats();

  return NextResponse.json(
    {
      authenticated: true,
      killSwitch: controlState,
      apiConfig: {
        configured: Boolean(apiKey && userId),
        isMock,
        mode: isMock ? "Simulated Mock & Verified Fallbacks" : "Live Flickr REST Upstream",
        maskedApiKey: maskString(apiKey),
        maskedUserId: maskString(userId),
      },
      cacheStats,
      environment: process.env.NODE_ENV || "development",
      usingDefaultPasskey: getAdminPasskey() === "iiita-cultural-council-2026",
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
