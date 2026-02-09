import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { annotations } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const updates: Record<string, unknown> = {};

  if (body["color"]) updates["color"] = body["color"];
  if (body["comment"] !== undefined) updates["comment"] = body["comment"] || null;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "nothing to update" }, { status: 400 });
  }

  const db = getDb();
  const [row] = await db.update(annotations).set(updates).where(eq(annotations.id, id)).returning();

  if (!row) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json(row);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const [row] = await db.delete(annotations).where(eq(annotations.id, id)).returning();

  if (!row) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
