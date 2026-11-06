import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/flickr/adminAuth";
import { setFlickrKillSwitch } from "@/lib/flickr/killSwitch";

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { killed, reason } = body;

    if (typeof killed !== "boolean") {
      return NextResponse.json({ error: "Missing or invalid 'killed' boolean flag." }, { status: 400 });
    }

    const state = setFlickrKillSwitch(
      killed,
      typeof reason === "string" && reason.trim() ? reason.trim() : "Admin manual control action",
      "ADMIN_USER"
    );

    return NextResponse.json(
      {
        success: true,
        message: killed
          ? "EMERGENCY KILL SWITCH ENGAGED: All outbound Flickr network calls are now completely BLOCKED. All gallery views immediately failover to safe curated local archives."
          : "KILL SWITCH DISARMED: Normal Flickr operations restored.",
        state,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
