# Switch annotation trigger to right-click context menu

**Date:** 2026-02-09 11:51
**Scope:** story-reader.tsx, use-text-selection.ts, apply-highlights.ts

## Summary
Replaced mouseup-based annotation trigger with right-click context menu. Rewrote `use-text-selection.ts` as a pure function, rewrote `apply-highlights.ts` with DOMParser to fix broken highlight rendering, and wired `onContextMenu` into story-reader.

## Context & Problem
The previous implementation used mouseup/selectionchange listeners to detect text selection and show the annotation tooltip. This completely broke normal browser text selection behavior — selecting text was hijacked, and color/comment buttons didn't work because the browser collapsed the native selection on click.

Additionally, `apply-highlights.ts` used naive string-index manipulation that didn't account for HTML entities (`&mdash;` = 7 chars in HTML, 1 in rendered text). This caused `<mark>` tags to land inside other HTML tags, leaking raw attributes as visible text.

## Decisions Made

### Right-click context menu instead of selection hijacking
- **Chose:** `onContextMenu` handler on `.reader-text` that calls `getSelectionOffsets()` and shows tooltip only when there's an active selection
- **Why:** User explicitly requested "can we add that like note item to context menu instead? On the right click instead of hijacking it?" — normal selection must work untouched
- **Behavior:** Select text normally → right-click → annotation tooltip appears. If no selection, browser's default context menu shows.

### Pure function instead of hook for text selection
- **Chose:** Replaced `useTextSelection` hook with `getSelectionOffsets()` pure function
- **Why:** No event listeners needed anymore — we just check selection state on demand in the contextmenu handler. Eliminates all the timing/race condition bugs from the hook approach.

### DOMParser for highlight injection
- **Chose:** Replaced string-index HTML manipulation with DOMParser + TreeWalker
- **Why:** String indices in HTML don't match plain-text character offsets when entities exist. DOMParser gives us proper text nodes with correct lengths, so `<mark>` tags always wrap the right text.

### Don't clear selection on tooltip dismiss
- **Chose:** Tooltip's `onClose` only nulls tooltip state, doesn't call `removeAllRanges()`
- **Why:** User may want to re-right-click on the same selection. Selection only clears after an action (color pick, save comment) is completed.

## Key Files
- `landing/src/components/story/story-reader.tsx` — onContextMenu handler, snapshotted offsets in tooltip state
- `landing/src/components/story/annotations/use-text-selection.ts` — pure `getSelectionOffsets()` function
- `landing/src/components/story/annotations/apply-highlights.ts` — DOMParser-based highlight injection
- `.worklogs/2026-02-09-113611-fix-tooltip-buttons.md` — previous fix for offset snapshotting
