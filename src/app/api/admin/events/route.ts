import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  getTimelineEvents,
  createTimelineEvent,
  updateTimelineEvent,
  deleteTimelineEvent,
  resetTimelineEvents,
  TimelineEvent,
} from "@/lib/adminData";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const events = await getTimelineEvents();
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (body.action === "reset") {
      const reset = await resetTimelineEvents();
      return NextResponse.json({ success: true, events: reset });
    }

    const {
      title,
      societySlug,
      societyName,
      category,
      type,
      date,
      weekday,
      month,
      day,
      year,
      time,
      venue,
      status,
      description,
      accentColor,
      passCode,
      gcalDate,
      highlights,
      edition,
    } = body;

    if (!title || !societySlug || !category || !date) {
      return NextResponse.json(
        { error: "Title, society, category, and date are required." },
        { status: 400 }
      );
    }

    const newEvent = await createTimelineEvent({
      title,
      societySlug: societySlug || "council",
      societyName: societyName || "Cultural Council",
      category: category || "Flagship Festival",
      type: type || "upcoming",
      date,
      weekday: weekday || "SATURDAY",
      month: month || "NOV",
      day: day || "15",
      year: year || "2026",
      time: time || "6:00 PM IST",
      venue: venue || "Main Auditorium",
      status: status || "UPCOMING",
      description: description || "Production description.",
      accentColor: accentColor || "#D97706",
      passCode: passCode || `CC-EVT-${Math.floor(1000 + Math.random() * 9000)}`,
      gcalDate: gcalDate || "20261115T123000Z/20261115T153000Z",
      highlights: Array.isArray(highlights) ? highlights : [],
      edition,
    });

    return NextResponse.json({ success: true, event: newEvent });
  } catch (err) {
    console.error("Error creating event:", err);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Event ID is required." }, { status: 400 });
    }

    const updated = await updateTimelineEvent(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, event: updated });
  } catch (err) {
    console.error("Error updating event:", err);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Event ID is required." }, { status: 400 });
  }

  const deleted = await deleteTimelineEvent(id);
  return NextResponse.json({ success: deleted });
}
