# Analysis of 4_Structure_And_Style.md for Liska Adventures

**Date:** 2026-02-06 20:31
**Scope:** `context/core_rules/4_Structure_And_Style.md` → `prompts/writing_style.md`

## Summary
Extracted prose craft guidance from the structure/style file. Dropped the entire five-act beat system.

## What was in the source file
- **Five-Act Story Structure** (~240 lines): Rigid beat-by-beat system with psychology requirements, engagement requirements, and length constraints per beat
- **Prose Style & Formatting** (~160 lines): Show don't tell, conversational tone, 3rd person past, word counts, page structure, forbidden tropes, voice guidelines (90/10 active/passive), vocabulary development (3-5% advanced), literary devices, cultural adaptation, dialogue formatting
- **Page Breakdown** (~20 lines): Physical book layout specs

## Decisions Made

### Five-act structure → dropped
- **Why:** Already replaced with "use established frameworks" in the story structure section. The old beat system was designed for psychological stories.

### Word count → simplified
- **Chose:** "~700 words" instead of "500-700 words" with page/line/spread specs
- **Why:** User wanted just the target number, not the detailed page breakdown.

### Child-perspective design → extracted
- **Chose:** One line: "Write from a child's perspective — small things feel huge."
- **Why:** Valuable framing that a model might not default to. Helps ground the adventure in a child's experience of scale.

### Vocabulary → bumped to 10%
- **Chose:** ~10% advanced words (up from 3-5%)
- **Why:** User decision — adventures should expand vocabulary more aggressively.

### Cultural adaptation → extracted
- **Chose:** Paragraph about adaptation not literal translation, plus dialogue and internal thought formatting for EN/RU
- **Why:** Critical for the bilingual pipeline. Added internal thoughts formatting (italics in EN, guillemets in RU) which wasn't in the original file but is needed.

### Dropped from this file
- Voice guidelines (90/10 active/passive) — too prescriptive
- Adjective rule — covered by general vocabulary guidance
- Literary devices (titles, refrains) — model can handle
- Page breakdown structure — production detail, not writing guidance
- Flagging for review — old pipeline process

## Key Files
- `context/core_rules/4_Structure_And_Style.md` — source (unchanged)
- `prompts/writing_style.md` — updated with Prose Style, Format, Forbidden Tropes, Translation sections
