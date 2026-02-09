# Fix text selection offset computation for annotations

**Date:** 2026-02-09 10:56
**Scope:** landing/src/components/story/annotations/use-text-selection.ts

## Summary
Fixed two bugs preventing the annotation tooltip from ever appearing when text is selected.

## Context & Problem
Selecting text in the story reader showed no annotation tooltip — only the OS context menu. Debugging revealed two bugs in `computeOffsets`:

1. **`commonAncestorContainer` check too strict**: Used `container.contains(range.commonAncestorContainer)` which returns false when the selection extends even slightly beyond `.reader-text` (e.g. drag ending in a hover zone). This silently returned null.

2. **Element-level range boundaries not handled**: The TreeWalker matched `range.endContainer === textNode`, but browsers sometimes report range endpoints as element nodes (e.g. `<P>` with child offset 0), not text nodes. The TreeWalker only walks text nodes, so `endOffset` stayed -1 and the function returned null.

## Decisions Made

### Use Range.toString().length for offset computation
- **Chose:** Create a Range from container start to each boundary, use `.toString().length` to get plain-text offset
- **Why:** Handles both text-node and element-level boundaries correctly. Much simpler than walking text nodes and matching containers.
- **Also:** Clamp selection range to container boundaries instead of rejecting selections that extend outside, and check `sel.anchorNode`/`sel.focusNode` containment instead of `commonAncestorContainer`.
