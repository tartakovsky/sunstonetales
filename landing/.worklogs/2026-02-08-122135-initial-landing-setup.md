# Initial Sunstone Tales landing setup

**Date:** 2026-02-08 12:21
**Scope:** Entire landing/ folder

## Summary
Initialize the Sunstone Tales landing as its own git repo, pushed to tartakovsky/sunstonetales on GitHub. This is a copy of the steady-parent landing template that will be converted into the Sunstone Tales brand page.

## Context & Problem
We need a landing page for Sunstone Tales (children's bedtime stories). The steady-parent project has a mature Next.js 16 + Tailwind v4 + MDX landing architecture that we're reusing as a template engine. The landing/ folder was copied from steady-parent into the sunstone writing project, and now needs its own repo for Railway deployment.

## Decisions Made

### Separate repo for landing
- **Chose:** Own repo `tartakovsky/sunstonetales` rather than a subfolder of sunstone
- **Why:** Railway deploys from GitHub repos. Cleaner to have landing as its own repo with its own deploy pipeline.
- **Alternatives considered:**
  - Monorepo with sunstone writing project — rejected because the writing project has no deployment needs and mixing concerns adds complexity

### Template approach
- **Chose:** Copy entire steady-parent landing and convert
- **Why:** Reuses all components, styles, pro-blocks, deployment config. Much faster than building from scratch.

## Next Steps / Continuation Plan
1. Set up Railway service pointed at this repo
2. Configure R2 bucket (sunstonetales-media) for public access
3. Clean out steady-parent specific code (quiz, old blog posts, etc.)
4. Rewrite content for Sunstone Tales
5. Build StoryGrid component
6. Update branding (navbar, footer, about page)
