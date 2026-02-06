# Analysis of .cursor/rules/ for Liska Adventures

**Date:** 2026-02-06 20:45
**Scope:** `.cursor/rules/*.mdc` → `prompts/writing_style.md`

## Summary
Reviewed all 10 cursor rule files. Extracted one line (world/setting reference). The entire pipeline is replaced by the simplified writing_style.md approach.

## What was in the source files
10 cursor rules forming a multi-stage pipeline:
- `0_brainstormer` — Socratic debate partner for idea testing
- `1_idea_developer` — Raw idea → plot outline (emotion-centric)
- `2_concept_extraction` — Extract core problem, emotion, metaphor, coping strategy
- `3_developmental_brainstorm` — Dev psych review of beat outlines
- `3_psy_reviewer` — Same, different format
- `3_writer_new` — Beat-by-beat writing + editing protocols (clean version)
- `3_writer` — Same but comprehensive (full audit + prose generation)
- `4_gatekeeper` — Violation audit with diagnostic labels
- `5_fn_analyzer` — Line-by-line functional analysis (ruthless prose editing)
- `frameword_builder` — Psychological framework generation per emotion

## Decisions Made

### Entire pipeline → replaced by writing_style.md
- **Why:** The 10-step pipeline was designed for dumber models writing psychological stories. Each stage had rigid inputs/outputs and referenced the now-dropped core_rules systems (emotion metaphors, coping strategies, dysregulation types, beat structures). For adventures with a smart model, `writing_style.md` provides direction without constraining the process.

### World/setting reference → extracted
- **Chose:** One line: "Low-fantasy, late-medieval world. No magic, no anthropomorphism of inanimate objects. See setting.md for details."
- **Why:** The world rules were buried in the humor file and writer docs. Worth stating explicitly since "no magic" is a real constraint that a model wouldn't assume for a children's fantasy setting.

### Things considered but dropped
- **AI behavior constraints** (no self-references, no meta-commentary) — unnecessary for a smart model
- **Role framing** ("You are an expert children's book author") — implied by the writing guide
- **Fn analyzer principles** (every line justifies existence) — already covered by "no static scenes" and the general tight-prose ethos
- **Brainstormer** — general tool, not story-specific, kept as-is in cursor rules

## Key Files
- `.cursor/rules/*.mdc` — all 10 files (unchanged)
- `prompts/writing_style.md` — added World & Setting section
