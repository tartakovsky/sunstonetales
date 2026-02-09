# Retrigger deploy after transient container creation failure

**Date:** 2026-02-09 11:20
**Scope:** landing/next.config.ts

## Summary
Trivial comment change to retrigger Railway deploy. Previous deploy (commit 9c1a3cb) built successfully but failed at "Deploy > Create container" — a transient Railway infrastructure issue.
