import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { annotations } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const story = req.nextUrl.searchParams.get("story");
  const locale = req.nextUrl.searchParams.get("locale");

  if (!story || !locale) {
    return NextResponse.json({ error: "story and locale required" }, { status: 400 });
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(annotations)
    .where(and(eq(annotations.storySlug, story), eq(annotations.locale, locale)));

  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { storySlug, locale, spreadIdx, startOffset, endOffset, color, comment } = body;

  if (!storySlug || !locale || spreadIdx == null || startOffset == null || endOffset == null || !color) {
    return NextResponse.json({ error: "missing required fields" }, { status: 400 });
  }

  const db = getDb();
  const [row] = await db
    .insert(annotations)
    .values({ storySlug, locale, spreadIdx, startOffset, endOffset, color, comment: comment || null })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
