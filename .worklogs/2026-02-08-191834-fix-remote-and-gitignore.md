# Fix git remote and remove .wrangler state

**Date:** 2026-02-08 19:18
**Scope:** .gitignore, .wrangler/

## Summary
Switched git remote from tartakovsky/stories to tartakovsky/sunstonetales. Removed accidentally committed .wrangler/ local state and added it to .gitignore.

## Context & Problem
Remote was pointing to the old `stories` repo. The correct repo is `sunstonetales`. Also `.wrangler/` local Cloudflare dev state was committed by accident.

## Decisions Made

### Switch remote URL
- **Chose:** `git remote set-url origin` to sunstonetales repo
- **Why:** Railway auto-deploys from sunstonetales, not stories

### Remove .wrangler from tracking
- **Chose:** `git rm --cached` + add to .gitignore
- **Why:** Local Wrangler state (SQLite files, R2 blobs) should never be in the repo
