# Bump dark muted-foreground from 0.72 to 0.85

**Date:** 2026-02-08 20:41
**Scope:** landing/src/app/globals.css, landing/src/components/story/story-reader.tsx

## Summary
Reader body text (MDX `<p>` tags with `text-muted-foreground` class) was too dim at 0.72, too bright at 0.98 (inherit). Bumped `--muted-foreground` in both dark theme blocks from oklch(0.72) to oklch(0.85). Reverted the `color: inherit` override on `.reader-text p` — now the Tailwind class works naturally with the better variable value.
