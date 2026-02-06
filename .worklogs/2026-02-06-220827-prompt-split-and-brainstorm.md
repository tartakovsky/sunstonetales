# Prompt system split, setting extraction, and adventure brainstorm

**Date:** 2026-02-06 22:08
**Scope:** `prompts/*.md`, `liska_adventures/brainstorms/`

## Summary
Split writing_style.md into three files (universal, adventure, psychological). Created setting.md from 10 location files. Added secondary characters to characters.md. Brainstormed 7 adventure story ideas from unfinished psychological story material.

## Context & Problem
The previous session created writing_style.md and characters.md by extracting from core_rules and character files. This session needed to:
1. Add secondary characters (approved but not yet written)
2. Create setting.md (referenced but didn't exist)
3. Split writing_style.md because we now write two types of stories: adventure stories and psychological stories, with shared foundations
4. Begin brainstorming adventure stories, using material from unfinished psychological stories

## Decisions Made

### Secondary characters added to characters.md
- Mara, Daric, Lucia, Slypaws, Zanziri, Kebab Man, Lynx Cub, Caterpillow, Mood Flowers, Slothy
- Key corrections: Zanziri — no literal "assassin" mention. Lucia is human. Russian names: Котусеница, Шашлычник, Ленивчик, Рысёнок
- Lynx Cub inferred from Toothy Adventure story — shy kid Liska helps

### Setting.md created from 10 location files
- Compressed 10 setting/*.md files (mostly image-gen prompts) into world overview + 6 key locations
- Added cultural vibe notes: Sunstone City = Eastern/Thousand-and-One-Nights feel. Sar-Gora (Liska's origin) = Western/Northern/Siberian feel
- Indoor rooms folded into "Home", playground folded into "Yard"

### Writing_style.md split into three files
- **writing_style.md** (universal) — prose style, vocabulary, humor, forbidden tropes, format, translation, world/characters refs, parent-child bonding goal
- **adventure_story.md** — physical quest + emotional thread, Liska helps others emotionally, flexible structure (Hero's Journey etc), distributed emotional weight, invisible psychology
- **psychological_story.md** — each story = one specific developmental struggle for ages 4-6, series covers full range. Stories first (engaging, dramatic), not SEL worksheets. Emotional arc: fun opening → challenge → struggle → support → discovery → growth → warm closing. Psychology is central and visible, models good practices for children and adults

### Key principles reinforced by user throughout
- **Direction, not rules** — describe the vibe, not the specifics. "Max 3 exchanges" makes the model count instead of write well.
- **Don't close doors** — avoid specifics that prevent other valid approaches
- **Stories first** — psychological stories must be engaging narratives, not dressed-up therapy
- **Not Liska-centric** — psychological challenges can belong to any character
- **Parent-child bonding** — universal goal across both story types: strengthen the bond between reader and listener

### Adventure brainstorm from unfinished stories
Read all unfinished stories (7, 8, 10, 12-20) and identified repurposable material:
- **Story 14 (Night of Twinkling Lights)** — richest source. Glow beetles, beetle conductor, festival, fox name-story. User flagged this as "at least two stories" — the fox backstory could be a standalone adventure
- **Story 10 (Posh Guard)** — Guard Omar is an outstanding character worth recurring
- **Story 15 (Wishing Cave)** — Crystal Cave setting is pure adventure material
- **Story 17 (Children's Market)** — trade-chain adventure potential
- **Story 7 (Liska Tuft)** — camp setting for nighttime adventure
- **Story 13 (Next Stone)** — Story Stones quest

Generated 7 adventure ideas: Glow Beetle Hunt, Crystal Cave, Great Trade, Fox in the Snow, Guard Omar's Mystery, Camp Night, Story Stone Quest. All dumped to liska_adventures/brainstorms/adventure_ideas.md.

## Key Files for Context
- `prompts/writing_style.md` — universal writing guide
- `prompts/adventure_story.md` — adventure-specific guidance
- `prompts/psychological_story.md` — psychological story-specific guidance
- `prompts/setting.md` — world, city, culture, locations
- `prompts/characters.md` — all characters (3 main + 10 secondary)
- `liska_adventures/brainstorms/adventure_ideas.md` — 7 rough adventure brainstorms with source material notes
- `.worklogs/2026-02-06-211654-characters-analysis.md` — characters worklog
- `.worklogs/2026-02-06-212250-setting-analysis.md` — setting worklog

## Next Steps / Continuation Plan
1. Review and select which adventure ideas to develop first
2. Decide which unfinished psychological stories (7, 8, 10, 12-20) stay as psychological vs get repurposed for adventures
3. Develop selected adventure story from brainstorm to outline
4. Consider whether any prompt files need further refinement based on actual story writing experience
5. The liska_struggles stories that remain psychological should be reviewed against the new simplified psychological_story.md guidance to see if they need rework
