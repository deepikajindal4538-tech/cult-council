import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/flickr/adminAuth";
import {
  getFolderRoutes,
  saveFolderRoute,
  deleteFolderRoute,
  FolderRouteDirective,
} from "@/lib/flickr/killSwitch";
import { getAlbums } from "@/lib/flickr/client";

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

  const routes = getFolderRoutes();

  // Also fetch top available Flickr albums for the selector
  let availableAlbums: Array<{ id: string; title: string; photoCount: number; coverImageUrl?: string }> = [];
  try {
    const remote = await getAlbums({ page: 1, per_page: 30 });
    availableAlbums = (remote.albums || []).map((a) => ({
      id: a.id,
      title: a.title,
      photoCount: a.photoCount,
      coverImageUrl: a.coverImageUrl,
    }));
  } catch (err) {
    console.warn("[FolderRoutes API] Could not fetch remote albums:", err);
  }

  return NextResponse.json(
    {
      routes,
      availableAlbums,
      availableDestinations: [
        { type: "society", destination: "/societies/ams", label: "Acoustics & Media Society (AMS)" },
        { type: "society", destination: "/societies/geneticx", label: "Geneticx Dance Guild" },
        { type: "society", destination: "/societies/sarasva", label: "Sarasva Literary Society" },
        { type: "society", destination: "/societies/nirmiti", label: "Nirmiti Fine Arts Society" },
        { type: "society", destination: "/societies/rangtarangini", label: "Rangtarangini Drama Guild" },
        { type: "society", destination: "/societies/virtuosi", label: "Virtuosi Music Society" },
        { type: "home_featured", destination: "/gallery", label: "Home Page Spotlight / Featured" },
        { type: "fest_dossier", destination: "/fests", label: "Flagship Festivals (Effervescence / Asmita)" },
        { type: "category", destination: "/gallery?category=virtuosi", label: "Gallery: Virtuosi Music" },
        { type: "category", destination: "/gallery?category=geneticx", label: "Gallery: Geneticx Dance" },
        { type: "category", destination: "/gallery?category=goonj", label: "Gallery: Goonj Theatrics" },
        { type: "category", destination: "/gallery?category=effervescence", label: "Gallery: Effervescence Fest" },
      ],
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
    const { route } = body;

    if (!route || !route.albumId || !route.albumTitle || !route.targetDestination) {
      return NextResponse.json(
        { error: "albumId, albumTitle, and targetDestination are required." },
        { status: 400 }
      );
    }

    const updatedRoutes = saveFolderRoute(route, "ADMIN_USER", ip);
    return NextResponse.json(
      {
        success: true,
        message: `Folder "${route.albumTitle}" successfully directed to ${route.targetDestination}.`,
        routes: updatedRoutes,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const ip = getClientIp(req);
  const { searchParams } = new URL(req.url);
  const routeId = searchParams.get("id");

  if (!routeId) {
    return NextResponse.json({ error: "Route ID parameter 'id' is required." }, { status: 400 });
  }

  const updatedRoutes = deleteFolderRoute(routeId, "ADMIN_USER", ip);
  return NextResponse.json(
    {
      success: true,
      message: "Folder route deleted successfully.",
      routes: updatedRoutes,
    },
    { status: 200 }
  );
}
