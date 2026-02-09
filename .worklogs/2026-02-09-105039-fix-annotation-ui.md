# Fix annotation tooltip not appearing on text selection

**Date:** 2026-02-09 10:50
**Scope:** landing/src/components/story/story-reader.tsx

## Summary
Narrowed desktop hover zones from 25% screen width to 3.5rem. The wide zones (z-index 55) were overlapping the text pane (z-index 50) and capturing mouseup events, preventing the text selection hook from firing and the annotation tooltip from appearing.

## Context & Problem
User couldn't see annotation tooltip on production — selecting text only showed the OS context menu. The annotation tooltip triggers on mouseup after text selection. The desktop navigation hover zones were 25% wide fixed-position divs sitting on top of the text area, intercepting mouse events before they reached the text.
