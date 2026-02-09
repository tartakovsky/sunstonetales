# Implement Kindle-style annotation system

**Date:** 2026-02-09 09:43
**Scope:** landing/src/lib/, landing/src/app/api/annotations/, landing/src/components/story/annotations/, landing/src/components/story/story-reader.tsx, landing/src/app/[locale]/stories/[category]/[slug]/page.tsx, landing/next.config.ts, landing/drizzle.config.ts

## Summary
Built full annotation/highlighting system for the story reader. Users can select text, pick a highlight color (yellow/red/green), add comments, edit, and delete annotations. Backed by Railway PostgreSQL with Drizzle ORM. All CRUD operations verified working.

## Context & Problem
Need Kindle-like text annotation for stories — the user wants to mark up stories with highlights and comments during the editing/review process. No authentication required, anyone can annotate. Data persists across devices via Railway PostgreSQL.

## Decisions Made

### Text anchoring: string-offset approach
- **Chose:** Character offsets in plain text (tags stripped) of each spread's textHtml
- **Why:** MDX output is deterministic, offsets stay valid as long as story text doesn't change. Simple and reliable.
- **Alternatives considered:**
  - DOM Range serialization (XPath-based) — fragile across re-renders
  - Content-hash anchoring — overkill for static content

### Highlight injection: HTML string manipulation
- **Chose:** Walk the HTML string mapping plain-text indices to HTML positions, insert `<mark>` tags at computed positions
- **Why:** Handles cross-tag annotations naturally (e.g. text spanning `<em>` tags). No DOM dependency, works as a pure string function.
- **Alternatives considered:**
  - DOMParser + TreeWalker approach — can't easily wrap ranges that cross element boundaries
  - CSS ::selection / Highlight API — no persistence, limited browser support

### Database: single annotations table
- **Chose:** One table with (story_slug, locale, spread_idx, start_offset, end_offset, color, comment)
- **Why:** Simple, flat, covers all use cases. Index on (story_slug, locale) for efficient queries.

### Lazy DB connection
- **Chose:** `getDb()` function instead of top-level `db` export
- **Why:** Top-level throw on missing DATABASE_URL crashes the Next.js static build (generateStaticParams imports the module graph). Lazy initialization defers the connection to runtime API calls only.

## Architectural Notes
- API routes are dynamic (`ƒ`) — Next.js handles them at runtime, not during static generation
- `postgres` package added to `serverExternalPackages` in next.config.ts for standalone output compatibility
- Railway DATABASE_URL set as a reference variable (`${{Postgres.DATABASE_URL}}`) on the web service so it resolves to the internal URL at runtime
- `.env.local` has the public proxy URL for local development

## New Files
- `landing/src/lib/schema.ts` — Drizzle schema (annotations table)
- `landing/src/lib/db.ts` — Lazy DB connection
- `landing/drizzle.config.ts` — Drizzle Kit config
- `landing/src/app/api/annotations/route.ts` — GET + POST
- `landing/src/app/api/annotations/[id]/route.ts` — PATCH + DELETE
- `landing/src/components/story/annotations/types.ts` — Annotation type
- `landing/src/components/story/annotations/apply-highlights.ts` — HTML string highlight injection
- `landing/src/components/story/annotations/use-text-selection.ts` — Selection → offset hook
- `landing/src/components/story/annotations/use-annotations.ts` — CRUD hook + highlight application
- `landing/src/components/story/annotations/annotation-tooltip.tsx` — Color picker tooltip (portal)
- `landing/src/components/story/annotations/comment-popover.tsx` — Comment textarea popover (portal)

## Modified Files
- `landing/src/components/story/story-reader.tsx` — Added annotation hooks, tooltip/popover rendering, highlight CSS, mark click handlers
- `landing/src/app/[locale]/stories/[category]/[slug]/page.tsx` — Pass storySlug + locale props to StoryReader
- `landing/next.config.ts` — Added serverExternalPackages for postgres
- `landing/package.json` — Added drizzle-orm, postgres, drizzle-kit deps

## Key Files for Context
- `PLAN_COMMENT_SUPPORT.md` — Original architecture plan
- `landing/src/components/story/story-reader.tsx` — Main reader with annotation integration
- `landing/src/components/story/annotations/` — All annotation components and hooks
- `landing/src/lib/schema.ts` — Database schema
- `landing/src/app/api/annotations/route.ts` — API endpoints
- `.worklogs/2026-02-09-094359-annotation-system.md` — This worklog

## Next Steps
1. Deploy and test on production (push to trigger Railway deploy)
2. Test desktop selection + highlight workflow in browser
3. Test mobile long-press selection
4. Test comment creation and viewing
5. Consider rate limiting or spam protection if needed later
