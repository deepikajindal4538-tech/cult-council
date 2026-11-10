import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  getCouncilMembers,
  createCouncilMember,
  updateCouncilMember,
  deleteCouncilMember,
  resetCouncilMembers,
} from "@/lib/adminData";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const members = await getCouncilMembers();
  return NextResponse.json({ members });
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (body.action === "reset") {
      const reset = await resetCouncilMembers();
      return NextResponse.json({ success: true, members: reset });
    }

    const {
      name,
      designation,
      shortRole,
      badgeLabel,
      rollNumber,
      category,
      tier,
      department,
      photoUrl,
      email,
      avatarFallback,
      bio,
      order,
    } = body;

    if (!name || !designation || !email) {
      return NextResponse.json(
        { error: "Name, designation, and email are required." },
        { status: 400 }
      );
    }

    const newMember = await createCouncilMember({
      name,
      designation,
      shortRole: shortRole || designation,
      badgeLabel: badgeLabel || "LEADER",
      rollNumber: rollNumber || "IIITA",
      category: category || "council_member",
      tier: tier || "council",
      department: department || "Cultural Council",
      photoUrl: photoUrl || "",
      email,
      avatarFallback:
        avatarFallback ||
        name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      bio: bio || "",
      order: typeof order === "number" ? order : 99,
    });

    return NextResponse.json({ success: true, member: newMember });
  } catch (err) {
    console.error("Error creating council member:", err);
    return NextResponse.json({ error: "Failed to create council member" }, { status: 500 });
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
      return NextResponse.json({ error: "Member ID is required." }, { status: 400 });
    }

    const updated = await updateCouncilMember(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Member not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, member: updated });
  } catch (err) {
    console.error("Error updating council member:", err);
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Member ID is required." }, { status: 400 });
  }

  const deleted = await deleteCouncilMember(id);
  return NextResponse.json({ success: deleted });
}
