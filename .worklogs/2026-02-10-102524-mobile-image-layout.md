# Fix mobile single-column image layout in story reader

**Date:** 2026-02-10 10:25
**Scope:** story-reader.tsx (portrait CSS)

## Summary
On mobile single-column: image now uses 4:5 vertical aspect ratio (max 45vh), left/right padding matches text alignment, image sits flush against the nav bar.

## Changes
- `grid-template-rows: 40% 1fr` → `auto 1fr` (image sizes itself via aspect-ratio)
- `padding: 0.5rem` → `0 1.25rem` (horizontal padding matches text, no top padding so image is flush with nav bar)
- Image: `aspect-ratio: 4/5`, `max-height: 45vh`, `object-fit: cover`, flat top corners
- Text padding: `0.25rem 0` (horizontal padding comes from spread container now)
