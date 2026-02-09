# Fix useTextSelection event listeners never attaching

**Date:** 2026-02-09 11:11
**Scope:** use-text-selection.ts, story-reader.tsx

## Summary
Event listeners for text selection were never attached because the useEffect ran before the container DOM element existed. Switched from useRef to callback ref pattern.

## Context & Problem
Previous fix (worklog `2026-02-09-105658`) corrected the offset computation logic, but the annotation tooltip STILL never appeared. Investigation revealed a React timing bug:

1. `useTextSelection` received a `RefObject` and its `useEffect` depended on `[containerRef, computeOffsets]`
2. Both are stable references — the effect runs exactly once, at mount
3. At mount, `containerRef.current` is `null` because the `.reader-text` div only renders after `parseSpreads` sets state
4. The effect exits early (`if (!container) return`) and never re-runs
5. Neither `mouseup` nor `selectionchange` listeners are ever attached

Verified via browser: manually-added mouseup listeners fired fine, proving events reach the element — the hook's listeners simply weren't there.

## Decisions Made

### Use callback ref + state instead of useRef
- **Chose:** `useState<HTMLDivElement | null>(null)` with `ref={setTextEl}` (callback ref), pass `textEl` directly to hook
- **Why:** When React sets a callback ref, it triggers a state update → re-render → the `useEffect` in the hook re-runs with the actual DOM element as a dependency. This is the standard React pattern for effects that need a DOM node.
- **Alternatives considered:**
  - Add `spreads.length` as extra dependency to the hook — hacky coupling between unrelated concerns
  - Use MutationObserver/polling — overcomplicated for a solved React pattern

## Key Files for Context
- `landing/src/components/story/annotations/use-text-selection.ts` — the hook, now accepts `HTMLElement | null` directly
- `landing/src/components/story/story-reader.tsx` — uses callback ref pattern
- `.worklogs/2026-02-09-105658-fix-text-selection.md` — previous fix (offset computation)
