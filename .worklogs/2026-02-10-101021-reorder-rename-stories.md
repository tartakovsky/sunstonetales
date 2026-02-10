# Reorder, rename, and fix sentence case on Russian story titles

**Date:** 2026-02-10 10:10
**Scope:** stories index, all ru/meta.ts files, page.tsx files

## Summary
Reordered stories (adventures first), renamed two stories, fixed sentence case on all Russian titles, removed date-based sorting in favor of explicit array order.

## Changes

### Story order (adventures first)
1. Лиска и пещера желаний (wishing-cave)
2. Почему Лиску зовут Лиска
3. Лиска и игра теней
4. Лиска и веселые воспоминания
5. Лиска и зубастое приключение
6. Как Лиска копила на шашлычок
7. Как Лиска лечила хвост
8. Лиска и сердитые голоса (grumpy-voices)

### Renames
- **wishing-cave**: "Лиска и Хрустальная пещера" → "Лиска и пещера желаний"
- **treasure-braid → grumpy-voices**: slug changed to `liska-and-the-grumpy-voices`, Russian title "Лиска и сердитые голоса", English name "Liska and the Grumpy Voices"

### Sentence case fixes
All Russian titles now use sentence case (only character names and first letter capitalized).

### Sorting
Removed `available.sort()` from both page.tsx files — stories now render in the order defined in the `stories` array in index.ts.
