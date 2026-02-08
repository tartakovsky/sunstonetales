# Add "Лиска и Хрустальная пещера" story with images

**Date:** 2026-02-08 22:40
**Scope:** landing/src/content/stories/liska-and-the-wishing-cave/, landing/src/content/stories/index.ts, R2 bucket

## Summary
Created the full story page for "Лиска и Хрустальная пещера" (Russian only). Converted 6 story images + 1 cover from JPEG to WebP, uploaded to R2, built MDX with images placed at narrative beats. Registered in stories index.

## Context & Problem
Second adventure story completed (Crystal Cave / Wishing Cave). Needed to go from raw JPEG images + Russian prose text to a deployed story page matching the existing `why-liska-is-named-liska` pattern.

## Decisions Made

### Image naming and placement
- **Chose:** 6 images placed at narrative beats: cave entrance, lynx cub losing leaf, entering cave, pool discovery, splashing in pool, returning leaf
- **Why:** Each image marks a story transition, matching the picture-book spread pattern

### Image mapping
- `A_rocky_cave` → `wish-leaves-at-cave-entrance` (opening)
- `Same_place_on` → `lynx-cub-loses-leaf` (inciting incident)
- `Three_children_walking` → `three-friends-entering-cave` (going deeper)
- `94d7e7f7` → `three-friends-at-crystal-pool` (pool discovery, same pixels as cover but separate asset)
- `Continue_the_6th` → `friends-splashing-in-pool` (wonder/play)
- `Outside_the_cave` → `returning-leaf-to-lynx-cub` (resolution)
- `cover.jpeg` → `cover.webp` (cover image only)

### Russian only
- **Chose:** No English locale for this story
- **Why:** User specified Russian version only

## Key Files for Context
- `landing/src/content/stories/liska-and-the-wishing-cave/` — story structure
- `liska_adventures/liska_and_the_wishing_cave/v2_prose_ru.md` — source Russian text
- `liska_adventures/brainstorms/3_crystal_cave.md` — brainstorm with beat structure
- `.worklogs/2026-02-08-190451-story-reader-and-content.md` — original story deployment pattern
