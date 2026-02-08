# Kindle-style Annotation System for Story Reader

## Context
The story reader needs highlighting and commenting — select text, pick a color (red/yellow/green), optionally write a comment. Anyone can annotate, no auth. Stored in Railway PostgreSQL so it syncs across devices.

## Architecture

```
Select text → Tooltip (3 colors + comment) → POST /api/annotations → PostgreSQL
Page load → GET /api/annotations → inject <mark> tags into spread textHtml → render
```

## 1. Railway PostgreSQL Setup

- Add PostgreSQL service in Railway dashboard (same project as landing site)
- Reference `DATABASE_URL` from the web service's variables
- `railway run npx drizzle-kit push` to create the table
- Local dev: `railway link` + copy public DB URL to `.env.local`

## 2. Database — Single Table

```sql
annotations (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_slug   TEXT NOT NULL,
  locale       TEXT NOT NULL,
  spread_idx   INTEGER NOT NULL,
  start_offset INTEGER NOT NULL,
  end_offset   INTEGER NOT NULL,
  color        TEXT NOT NULL,        -- "red" | "yellow" | "green"
  comment      TEXT,
  created_at   TIMESTAMPTZ DEFAULT now()
)
INDEX on (story_slug, locale)
```

**Deps:** `drizzle-orm` + `postgres` (pure JS, standalone-safe). `drizzle-kit` as devDep.

## 3. API Routes

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/annotations?story=X&locale=Y` | All annotations for a story |
| POST | `/api/annotations` | Create |
| PATCH | `/api/annotations/[id]` | Update color/comment |
| DELETE | `/api/annotations/[id]` | Delete |

No auth. Open endpoints.

## 4. Text Anchoring

Offsets = character positions in the **plain text** (tags stripped) of a spread's `textHtml`.

**Selection → offsets:** TreeWalker over `.reader-text` text nodes, accumulate char count, match against `window.getSelection()` anchor/focus to get global start/end.

**Offsets → highlights:** DOMParser on `textHtml`, walk text nodes, split + wrap matching ranges with `<mark data-annotation-id data-color>`. Return modified HTML.

Works because MDX output is deterministic. Offsets stay valid as long as story text doesn't change.

## 5. UI

### AnnotationTooltip
- **New selection:** right-click (desktop) / after selection (mobile) → 3 colored circles + comment icon
- **Existing highlight:** long-press/right-click → same + X delete button
- Positioned via `getBoundingClientRect()` of selection range
- Portal to `document.body`

### CommentPopover
- `<textarea>` + OK button
- Opens from tooltip's comment icon, or on click of highlighted text with comment
- Same portal approach

### Highlight CSS (in reader styled-jsx)
```css
.reader-text mark[data-color="red"]    { background: rgba(239, 68, 68, 0.3); }
.reader-text mark[data-color="yellow"] { background: rgba(234, 179, 8, 0.3); }
.reader-text mark[data-color="green"]  { background: rgba(34, 197, 94, 0.3); }
```

## 6. Hooks

**`useAnnotations(storySlug, locale)`** — fetch on mount, CRUD methods, `applyHighlights(textHtml, spreadIdx)` returns HTML with marks injected.

**`useTextSelection(containerRef)`** — listens for contextmenu/selectionchange, computes text-content offsets, returns selection state + tooltip position.

## 7. Integration into story-reader.tsx

- Add `storySlug` and `locale` props
- Wire both hooks
- `dangerouslySetInnerHTML={{ __html: applyHighlights(spread.textHtml, current) }}`
- Click/contextmenu handlers on `.reader-text`
- Render tooltip + comment portals

## 8. New Files

```
landing/src/lib/
  db.ts                                -- postgres + drizzle instance
  schema.ts                            -- annotations table
landing/src/app/api/annotations/
  route.ts                             -- GET + POST
  [id]/route.ts                        -- PATCH + DELETE
landing/src/components/story/annotations/
  types.ts                             -- Annotation type
  use-annotations.ts                   -- fetch/CRUD hook
  use-text-selection.ts                -- selection + offset hook
  apply-highlights.ts                  -- inject <mark> into textHtml
  annotation-tooltip.tsx               -- color picker tooltip
  comment-popover.tsx                  -- comment text field
landing/drizzle.config.ts             -- drizzle-kit config
```

**Modified:** `story-reader.tsx`, `[slug]/page.tsx`, `package.json`, possibly `next.config.ts`

## 9. Implementation Order

1. Railway PostgreSQL + Drizzle setup (db.ts, schema.ts, push schema)
2. API routes (test with curl)
3. `apply-highlights.ts` (pure function)
4. `use-text-selection.ts` (offset computation)
5. `use-annotations.ts` (wire API + highlights)
6. `annotation-tooltip.tsx` + `comment-popover.tsx`
7. Wire into story-reader.tsx + page.tsx
8. Test desktop + mobile

## Verification
1. `npm run build` — clean
2. Select text → right-click → tooltip with 3 colors + comment icon
3. Click yellow → highlighted, persists after reload
4. Click comment → write text → OK → saved
5. Click highlight with comment → comment shows
6. Long-press highlight → colors + X → change color or delete
7. Mobile: long-tap selection works
8. Annotations visible across devices
