# Reset scroll position when switching story spreads

**Date:** 2026-02-12 14:33
**Scope:** landing/src/components/story/story-reader.tsx

## Summary
Fixed the story reader so it scrolls back to the top when navigating between spreads/pages. Previously the scroll position persisted, forcing readers to manually scroll up on each new page.

## Context & Problem
When reading a story and advancing to the next spread (via swipe, keyboard, or button), the `.reader-text` div kept its `scrollTop` from the previous spread. Long pages would leave the reader mid-scroll on the next page.

## Decisions Made

### Scroll reset in `go` callback
- **Chose:** `if (textEl) textEl.scrollTop = 0;` directly in the `go` callback
- **Why:** Simple, immediate, no extra useEffect needed. The `textEl` ref is already available via state setter pattern.
- **Alternatives considered:**
  - useEffect watching `current` — more indirect, adds an extra render cycle for no benefit

## Key Files for Context
- `landing/src/components/story/story-reader.tsx` — the story reader component (line ~199)
