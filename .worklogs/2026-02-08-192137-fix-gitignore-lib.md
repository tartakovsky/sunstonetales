# Fix gitignore lib/ pattern blocking landing/src/lib/

**Date:** 2026-02-08 19:21
**Scope:** .gitignore, landing/src/lib/

## Summary
Python's `lib/` gitignore pattern was matching `landing/src/lib/`, preventing `i18n.ts` and `utils.ts` from being committed. Changed to `/lib/` (root-only match). This caused the Railway build to fail with "Module not found: Can't resolve '@/lib/utils'" and '@/lib/i18n'.

## Decisions Made
- **Chose:** Change `lib/` to `/lib/` in .gitignore
- **Why:** `/lib/` only matches at repo root, not nested `src/lib/` directories
