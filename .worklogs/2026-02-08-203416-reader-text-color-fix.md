# Fix reader text color: MDX paragraphs using muted-foreground

**Date:** 2026-02-08 20:34
**Scope:** landing/src/components/story/story-reader.tsx

## Summary
Reader text was rendering at #a7a49f (medium gray) instead of the theme foreground color. The root cause was that MDX-rendered `<p>` tags carried `class="text-muted-foreground"` from the page layout, which overrode the reader's `color: var(--foreground)` with `var(--muted-foreground)`.

## Context & Problem
User measured on-screen text color at #A6A39F with a color meter — far dimmer than the expected oklch(0.98 0.015 78) ≈ #fef7ee. Previous commits bumping the --foreground variable from 0.92 to 0.98 had no visible effect because the actual text was styled by a Tailwind utility class on the `<p>` elements, not the CSS variable.

## Decisions Made

### Override inherited Tailwind classes inside reader
- **Chose:** `color: inherit` on `.reader-text p` in styled-jsx
- **Why:** The MDX content generates `<p class="text-muted-foreground text-lg/8">` — the Tailwind class has higher specificity than the parent's `color: var(--foreground)`. Adding `color: inherit` on the `p` rule in styled-jsx overrides the Tailwind class within the reader context only.

## Key Files
- `landing/src/components/story/story-reader.tsx` — the reader component with styled-jsx
