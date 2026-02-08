# i18n routing, content restructure, two-pane layout, language toggle

**Date:** 2026-02-08 15:12
**Scope:** src/lib/i18n.ts, src/proxy.ts, src/app/[locale]/, src/content/stories/, src/components/story/language-toggle.tsx, src/components/landing/navbar.tsx, src/components/landing/story-grid.tsx, src/app/globals.css

## Summary
Implemented full i18n routing (English default, Russian at /ru), restructured content from flat blog to per-story folders with per-locale subfolders, added two-pane CSS layout for story pages, and created a language toggle component.

## Context & Problem
The landing site had a flat blog structure (content/blog/posts/) with English-only routing and plain article-style story rendering. Needed per-story folders with per-language subfolders, i18n path-based routing, two-pane picture-book layout, and locale-aware components.

## Decisions Made

### Next.js 16 proxy instead of middleware
- **Chose:** `src/proxy.ts` with exported `proxy()` function
- **Why:** Next.js 16 renamed middleware.ts → proxy.ts and requires the export to be named `proxy` (not `middleware`)
- **Alternatives considered:**
  - `middleware.ts` with `middleware()` export — no longer works in Next.js 16
  - next-intl library — too heavy for a two-language site with simple path routing

### CSS float for two-pane layout
- **Chose:** `.story-content img { float: left; width: 45%; }` with `hr { clear: both; }`
- **Why:** Zero JavaScript, works with plain MDX (no custom components in story files), responsive by nature (float ignored on narrow screens)
- **Alternatives considered:**
  - React component that walks MDX children and groups into spreads — more complex, requires parsing MDX output
  - CSS Grid/Flexbox with custom wrapper — would need custom MDX components in story files

### Per-locale folders with independent meta.ts
- **Chose:** `content/stories/{slug}/en/story.mdx + meta.ts` and `content/stories/{slug}/ru/story.mdx + meta.ts`
- **Why:** Almost everything differs between languages (title, description, date, cover, authors, JSON-LD). Separate files avoid merge/inheritance complexity.

### Proxy-based rewrite for default locale
- **Chose:** No-prefix URLs rewrite to `/en/...` internally via proxy
- **Why:** Clean English URLs (no /en prefix), Russian gets /ru prefix. All pages live under `[locale]/` dynamic segment.

## Architectural Notes
- Root layout (`src/app/layout.tsx`) stripped to CSS-only import — no `<html>` or `<body>` tags
- `[locale]/layout.tsx` wraps `<html lang={locale}>`, renders Navbar + Footer
- Navbar accepts `locale` prop, renders localized labels and prefixed links
- Language toggle reads `usePathname()` and toggles /ru prefix
- Story registry (`content/stories/index.ts`) is thin — imports story entries, exports list + category labels
- Story page wraps MDX in `<div className="story-content">` for CSS two-pane

## Key Files for Context
- `PRODUCTION_PROCESS.md` — complete pipeline architecture doc
- `src/lib/i18n.ts` — locale constants (en, ru)
- `src/proxy.ts` — i18n rewrite proxy
- `src/app/[locale]/layout.tsx` — locale layout with html lang
- `src/content/stories/types.ts` — StoryEntry, StoryLocaleMeta types
- `src/content/stories/index.ts` — story registry
- `src/content/stories/liska-and-her-name/` — first story, both locales
- `src/app/[locale]/stories/[category]/[slug]/page.tsx` — story detail page
- `.worklogs/2026-02-08-130712-hostname-fix.md` — prior Railway fix

## Next Steps / Continuation Plan
1. Upload story images to R2 bucket (`wrangler r2 object put sunstonetales-media/liska-and-her-name/...`)
2. Add images to English story MDX (currently text-only)
3. Build `tools/publish_story.py` for automating the publish pipeline
4. Set cover images in meta.ts once uploaded to R2
5. Commit + push to deploy to Railway
