import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/flickr/adminAuth";
import {
  CAROUSEL_RESERVE_50,
  CarouselReservePlate,
} from "@/lib/flickr/carouselReserveData";
import {
  getReserveOverrides,
  saveReserveOverride,
  recordAuditAction,
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

  const overrides = getReserveOverrides();

  // Merge base 50 plates with overrides
  const plates: CarouselReservePlate[] = CAROUSEL_RESERVE_50.map((plate) => {
    const override = overrides[plate.id];
    if (!override) return plate;
    return { ...plate, ...override };
  });

  // Also include any newly added custom plates
  for (const [key, val] of Object.entries(overrides)) {
    if (val?.isCustom && !plates.some((p) => p.id === key)) {
      plates.push(val as CarouselReservePlate);
    }
  }

  const activeCount = plates.filter((p) => p.reserveStatus === "Active").length;
  const standbyCount = plates.filter((p) => p.reserveStatus === "Standby").length;

  return NextResponse.json(
    {
      plates,
      stats: {
        total: plates.length,
        activeCount,
        standbyCount,
        row1Count: plates.filter((p) => p.reserveRow === 1).length,
        row2Count: plates.filter((p) => p.reserveRow === 2).length,
        row3Count: plates.filter((p) => p.reserveRow === 3).length,
      },
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
    const { plateId, updates, newPlate } = body;

    if (newPlate) {
      const id = newPlate.id || `custom-reserve-${Date.now()}`;
      const plate: CarouselReservePlate & { isCustom?: boolean } = {
        id,
        reserveSlot: newPlate.reserveSlot || 99,
        reserveRow: newPlate.reserveRow || 1,
        reserveStatus: newPlate.reserveStatus || "Active",
        event: newPlate.event || "Campus Archive",
        title: newPlate.title || "Custom Archival Plate",
        discipline: newPlate.discipline || "Acoustics & Media",
        category: newPlate.category || "Campus Life",
        url: newPlate.url,
        thumbnailUrl: newPlate.thumbnailUrl || newPlate.url,
        aspectRatio: newPlate.aspectRatio || "16:9",
        width: newPlate.width || 1920,
        height: newPlate.height || 1080,
        isCustom: true,
      };

      saveReserveOverride(id, plate, "ADMIN_USER", ip);
      return NextResponse.json({ success: true, plate, message: "New reserve photo added successfully." }, { status: 200 });
    }

    if (!plateId || !updates) {
      return NextResponse.json({ error: "plateId and updates are required." }, { status: 400 });
    }

    const updatedOverrides = saveReserveOverride(plateId, updates, "ADMIN_USER", ip);
    return NextResponse.json({ success: true, overrides: updatedOverrides, message: "Plate updated successfully." }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
