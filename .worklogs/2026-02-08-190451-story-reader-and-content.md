# Add StoryReader component and 6 new story MDX pages

**Date:** 2026-02-08 19:04
**Scope:** landing/src/components/story/story-reader.tsx, landing/src/app/[locale]/stories/[category]/[slug]/page.tsx, landing/src/app/globals.css, landing/src/content/stories/

## Summary
Built a full-viewport picture book reader component (StoryReader) and added 6 new story MDX pages with images hosted on Cloudflare R2. Replaced the old float-based two-pane CSS layout with a proper spread-based reader.

## Context & Problem
Stories were rendering as plain articles with CSS float-based image placement. Needed a proper picture book experience: one image + its text per "spread", navigable via swipe/keyboard/buttons, with a top bar for navigation.

## Decisions Made

### StoryReader as client component with DOM parsing
- **Chose:** Parse rendered MDX DOM at mount time to extract spreads
- **Why:** Avoids MDX plugin complexity; works with existing markdown image syntax
- **Alternatives considered:**
  - MDX plugin to inject spread markers — rejected, too complex for the benefit
  - Separate JSON manifest per story — rejected, duplicates content structure

### 3-column grid top bar
- **Chose:** `grid-template-columns: 1fr auto 1fr` with back link / title / nav
- **Why:** Clean centering of title regardless of left/right content width
- **Alternatives considered:**
  - Flexbox with spacer — harder to perfectly center title
  - Bottom bar — conflicts with mobile gesture zones

### Desktop hover zones for navigation
- **Chose:** Left/right 25% invisible zones with round buttons that appear on hover
- **Why:** Clean reading experience, buttons only appear when needed
- **Alternatives considered:**
  - Always-visible side buttons — clutters the reading view

### Images on Cloudflare R2
- **Chose:** Public R2 bucket URLs in MDX
- **Why:** Fast CDN delivery, no need to bundle images in Next.js build

## Key Files for Context
- `landing/src/components/story/story-reader.tsx` — the reader component
- `landing/src/app/[locale]/stories/[category]/[slug]/page.tsx` — story page using StoryReader
- `landing/src/content/stories/index.ts` — story registry
- `landing/src/content/stories/liska-and-the-game-of-shadows/` — example story with MDX + metadata

## Next Steps
- Deploy to Railway
- Test on mobile (Pixel Fold)
- Potentially add language toggle inside reader top bar
