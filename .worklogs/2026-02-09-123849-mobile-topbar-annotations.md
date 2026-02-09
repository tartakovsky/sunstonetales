# Mobile annotations in top bar via DOM attribute toggle

**Date:** 2026-02-09 12:38
**Scope:** story-reader.tsx

## Summary
Moved mobile annotation buttons from fixed bottom bar (covered by native toolbar) into the top bar, replacing nav arrows when text is selected. Uses direct DOM attribute toggle + CSS to show/hide — no React state changes during selection, so native selection is fully preserved.

## Context & Problem
The fixed bottom bar was covered by the native iOS/Android selection toolbar. Any React state change during selection caused re-renders that disrupted native selection handles. Need annotation buttons that (a) don't overlap native UI and (b) don't cause re-renders during selection.

## Decisions Made

### DOM attribute toggle instead of React state
- **Chose:** `selectionchange` listener sets `data-has-selection` attribute directly on the bar DOM element via ref. CSS rules toggle `.reader-nav` / `.reader-annotate` visibility based on this attribute.
- **Why:** No React state change = no re-render = native selection stays intact. The text div with `dangerouslySetInnerHTML` is never touched during selection.

### Selection offsets in a ref
- **Chose:** `lastSelectionRef` stores current selection offsets, updated by `selectionchange` listener.
- **Why:** When the user taps an annotation button, the tap collapses the native selection before `onClick` fires. The ref preserves the offsets. Additionally, `onPointerDown` on each button snapshots the selection as a backup (fires before collapse).

### Top bar annotation buttons replace nav on mobile
- **Chose:** `.reader-annotate` div in the top bar (same grid column 3 as `.reader-nav`). CSS media query `not all and (hover: hover) and (pointer: fine)` toggles visibility based on `data-has-selection`.
- **Why:** Bottom bar was covered by native toolbar. Top bar has space and doesn't conflict.

## Key Files
- `landing/src/components/story/story-reader.tsx` — selectionchange effect, barRef, lastSelectionRef, snapshotSelection, top bar annotate buttons, CSS
