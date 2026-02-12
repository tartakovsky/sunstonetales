# Fix stories index page grid and description (duplicate of StoryGrid)

**Date:** 2026-02-12 14:00
**Scope:** landing/src/app/[locale]/stories/page.tsx

## Summary
The /stories page had its own inline grid markup separate from the StoryGrid component. Applied the same two fixes: always 2 columns, remove line-clamp-3.

## Context & Problem
Previous commit fixed StoryGrid component but the actual /stories route renders its own inline grid in page.tsx, not the shared component. The fixes didn't take effect.
