# Trigger redeploy after Postgres cleanup

**Date:** 2026-02-09 10:30
**Scope:** landing/next.config.ts

## Summary
Trivial comment change to trigger a Railway redeploy after manually deleting duplicate Postgres services (Postgres-31xq, Postgres-OrN2, Postgres-b-OT). The duplicate services were created by failed `railway add` CLI attempts and were causing "Failed to create deployment" errors.

## Context & Problem
Multiple `railway add -d postgres` attempts (using `script` to work around interactive mode) silently created 3 extra Postgres services. Railway deployments failed at the "Create container" step with all these services present. User manually deleted the duplicates, leaving one clean "Postgres" service. Need a git push to trigger a fresh deploy.
