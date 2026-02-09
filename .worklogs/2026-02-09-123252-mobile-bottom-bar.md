# Mobile annotations: fixed bottom bar instead of selection listeners

**Date:** 2026-02-09 12:32
**Scope:** story-reader.tsx

## Summary
Replaced mobile selectionchange/touchend listeners with a fixed bottom toolbar that's always rendered. Zero interference with native selection — the toolbar reads the selection only when the user taps a button.

## Context & Problem
Every previous approach (selectionchange, touchend, debounced timeouts) caused React state changes during selection, which triggered re-renders that disrupted the native mobile selection UI (handles, context menu). The fundamental issue: any React state change during active selection breaks mobile.

## Decisions Made

### Fixed bottom bar, no selection listeners
- **Chose:** Always-rendered toolbar at the bottom of the reader with 3 color dots + comment icon. Hidden on desktop via `@media (pointer: fine)`. On tap, reads `getSelectionOffsets()` at that moment — if there's a selection, creates annotation; if not, does nothing.
- **Why:** Zero DOM changes during selection = native selection UI stays completely intact. The toolbar doesn't need to know about selection state — it just tries to read it on demand.
- **Alternatives rejected:**
  - `selectionchange` listener — caused re-renders that killed native selection
  - `touchend` listener — same problem
  - Debounced listeners — same problem, just delayed

## Key Files
- `landing/src/components/story/story-reader.tsx` — mobile bar JSX, CSS, `onMobileColorPick`/`onMobileComment` handlers
