# Don't hijack mobile long-press with contextmenu handler

**Date:** 2026-02-09 12:01
**Scope:** story-reader.tsx

## Summary
Guard onContextMenu handler with `pointer: fine` media query so it only fires on desktop. Mobile long-press now behaves natively.

## Context & Problem
On mobile, long-press triggers both text selection and the `contextmenu` event. Our handler was intercepting it with `preventDefault()`, breaking native selection behavior on touch devices.

## Decisions Made
- **Chose:** `window.matchMedia("(pointer: fine)").matches` check at top of handler
- **Why:** Simplest way to distinguish desktop mouse from mobile touch. On mobile the handler returns early, native behavior is fully preserved. Annotations remain desktop-only for now.
