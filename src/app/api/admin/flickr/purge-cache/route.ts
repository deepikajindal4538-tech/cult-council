import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/flickr/adminAuth";
import { purgeGalleryCache } from "@/lib/flickr/client";
import { recordAuditAction } from "@/lib/flickr/killSwitch";

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const result = purgeGalleryCache();
  recordAuditAction("CACHE_PURGED", "ADMIN_USER", "In-memory gallery LRU cache cleared.");

  return NextResponse.json(
    {
      success: true,
      message: "Gallery in-memory cache has been purged successfully.",
      timestamp: result.timestamp,
    },
    { status: 200 }
  );
}
