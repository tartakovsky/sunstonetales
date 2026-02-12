# Deduplicate story grid — single component used by both pages

**Date:** 2026-02-12 14:08
**Scope:** landing/src/components/landing/story-grid.tsx, landing/src/app/[locale]/page.tsx, landing/src/app/[locale]/stories/page.tsx

## Summary
Three copies of the story card grid existed (story-grid.tsx, home page, stories page). Consolidated into one StoryGrid component used by both pages. Also fixed the home page which still had the old grid-cols-1 and line-clamp-3.
