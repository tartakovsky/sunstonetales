# Enable swipe navigation on text area + restore mobile rounded corners

**Date:** 2026-02-10 10:38
**Scope:** story-reader.tsx

## Summary
Extracted swipe handlers into shared callbacks and attached them to both image and text divs, so swiping left/right on the text area also navigates spreads. Restored rounded corners on mobile image container.

## Changes
- Extracted `onSwipeStart` / `onSwipeEnd` callbacks (were inline on image div)
- Added `onTouchStart={onSwipeStart}` and `onTouchEnd={onSwipeEnd}` to the `.reader-text` div
- Restored `border-radius: 0.75rem` on mobile `.reader-image` (was set to `0` in previous commit)
