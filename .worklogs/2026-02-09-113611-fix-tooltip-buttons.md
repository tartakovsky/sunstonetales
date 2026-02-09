# Fix annotation tooltip buttons not working

**Date:** 2026-02-09 11:36
**Scope:** story-reader.tsx, use-text-selection.ts

## Summary
Annotation tooltip appeared (callback ref fix worked) but clicking color/comment buttons did nothing. Fixed by snapshotting selection offsets into tooltip state and removing aggressive selection clearing.

## Context & Problem
When user selects text → tooltip appears → user clicks a color button:
1. Browser collapses native selection on mousedown (normal behavior)
2. The `onMouseUp` handler in useTextSelection saw `isCollapsed` and called `setSelection(null)`
3. By the time `handleColorPick` ran, `selection` was null → no offsets → nothing created

## Decisions Made

### Snapshot offsets into tooltip/popover state
- **Chose:** Store `startOffset` and `endOffset` in the tooltip and commentPopover state objects when they're created from a selection
- **Why:** The browser WILL collapse the native selection when the user interacts with any UI element. We can't prevent that. So we capture the offsets at tooltip-creation time and use those in all handlers.

### Stop aggressively clearing selection on collapsed mouseup
- **Chose:** Remove `setSelection(null)` from the mouseup handler — only set selection when there's an actual non-collapsed selection. Parent calls `clearSelection()` explicitly when done.
- **Why:** The collapsed-mouseup clear was racing with tooltip button clicks. The parent component already handles clearing via `clearSelection()` in all action handlers and `go()`.

## Key Files
- `landing/src/components/story/story-reader.tsx` — tooltip state now includes offsets, handlers read from tooltip/popover state
- `landing/src/components/story/annotations/use-text-selection.ts` — mouseup no longer clears on collapsed
