# Mobile annotations via selectionchange

**Date:** 2026-02-09 12:08
**Scope:** story-reader.tsx

## Summary
Added selectionchange listener for touch devices so annotation toolbar appears after text selection settles, without interfering with native selection behavior.

## Context & Problem
Previous commit disabled annotations on mobile entirely. The actual need: annotations should work on mobile too, just without hijacking native long-press/selection/context-menu behavior.

## Decisions Made

### Two mechanisms based on pointer type
- **Desktop (pointer: fine):** Right-click contextmenu handler with preventDefault — user consciously triggers it
- **Mobile (pointer: coarse):** `selectionchange` listener on document, debounced 300ms — toolbar appears automatically after selection settles, no preventDefault anywhere, native Copy/Paste and selection handles remain fully functional

### Debounce selectionchange
- **Why 300ms:** Selection adjustments (dragging handles) fire rapid selectionchange events. 300ms lets the selection settle before showing the toolbar, avoiding flicker during handle drag.

### Don't dismiss on collapsed selection
- The selectionchange handler only acts when there IS a valid selection (getSelectionOffsets returns non-null). When selection collapses (e.g., user taps a color button), the handler does nothing — tooltip stays with snapshotted offsets until the action completes.
