# Add warm dark theme, image preloading, rename category slug

**Date:** 2026-02-08 19:51
**Scope:** landing/src/app/globals.css, landing/src/components/story/story-reader.tsx, landing/src/content/stories/

## Summary
Three changes: (1) Warm dark theme that auto-switches based on system `prefers-color-scheme`, (2) image preloading in StoryReader to eliminate white flash on page turn, (3) renamed category slug from `liska_struggles` to `liska-big-emotions`.

## Decisions Made

### Warm dark theme instead of pure black
- **Chose:** oklch(0.16 0.012 78) background — very dark warm brown, same hue family (78°) as light theme
- **Why:** Pure black is harsh for bedtime reading. Warm dark brown matches the overall warm amber/cream aesthetic.

### System auto-detection via prefers-color-scheme
- **Chose:** CSS `@media (prefers-color-scheme: dark)` on `:root:not([data-theme="light"])` plus `.dark` class support
- **Why:** Follows shadcn pattern. Auto-switches without JS. The `:not([data-theme="light"])` escape hatch allows manual override later if needed.
- **Alternatives:** next-themes package — rejected as overkill for system-only detection

### Image preloading strategy
- **Chose:** `new Image()` preload for current-1, current+1, current+2 spreads
- **Why:** Browser caches the images. When user swipes, the next image is already in cache — no white flash.
- **Alternatives:** `<link rel="preload">` — harder to manage dynamically in a client component

### Category slug rename
- **Chose:** `liska-big-emotions` (was `liska_struggles`)
- **Why:** Matches the actual series name "Liska's Big Feelings" / "Большие чувства Лиски"

## Key Files
- `landing/src/app/globals.css` — theme variables (light + warm dark)
- `landing/src/components/story/story-reader.tsx` — reader with preloading
- `landing/src/content/stories/*/index.ts` — all 6 stories updated with new categorySlug
