# Analysis of 1_Core_Principles.md for Liska Adventures simplification

**Date:** 2026-02-06 20:16
**Scope:** `context/core_rules/1_Core_Principles.md` → `prompts/writing_style.md`

## Summary
Analyzed the first core rules file and extracted compressed adventure-oriented guidance into the new writing style prompt.

## Context & Problem
The old `1_Core_Principles.md` was written for dumber models that needed every constraint spelled out. It contained ~65 lines covering characters, plot structures, morals, attention-keeping, emotion metaphors, and coping strategy introduction rules. For Liska Adventures (simpler adventure stories aimed at flow and entertainment with secondary-character psychological complexity), most of this is dead weight or actively harmful (over-constraining the model).

## What was in the source file
- **Characters for 4-5 year olds**: Generic guidelines (child-like, distinct, animal, redeemable villains, diverse)
- **Plot structures/tension**: Simple problem-solution arcs, mild tension, no life-threatening situations
- **Morals**: Kindness, friendship, not preachy, natural consequences
- **Keeping attention**: Voices, participation, cliffhangers, questions
- **Emotion Metaphors**: Rigid system — max 2 per story, introduced by parent first, never child invents them
- **Coping Strategy Introduction**: Must be introduced by parent, practiced before child can apply

## Decisions Made

### Characters section → deferred to characters.md
- **Chose:** One-line placeholder referencing `characters.md` instead of generic guidelines
- **Why:** We have actual designed characters with profiles. Generic "use animal characters" advice is noise. The characters file will be built from the `characters/` folder later.

### Plot structures → reference known frameworks
- **Chose:** Reference Hero's Journey, quest narratives, three-act structure rather than prescribing a custom beat system
- **Why:** Modern models know these structures. Referencing them gives direction without over-constraining. The old 5-act beat-by-beat system was too rigid and designed for psychological stories, not adventures.

### Morals → compressed to one line
- **Chose:** "Theme emerges from action, never from lectures."
- **Why:** A smart model doesn't need to be told "be kind, not preachy." The one anti-pattern to guard against (lecturing) is worth stating.

### Keeping attention → compressed to key techniques
- **Chose:** Tension, mystery, foreshadowing, cliffhangers for read-aloud pacing
- **Why:** These are the uninferrable structural techniques. "Use different voices" is obvious for a story.

### Emotion metaphors → dropped entirely
- **Chose:** Replace rigid metaphor system with "each story has an emotional dimension that emerges naturally"
- **Why:** The old system (Dragon Inside for anger, Rainy Cloud for sadness, etc.) was a crutch for models that couldn't write emotion. It also forced a specific style. Letting the model find the right emotional expression for each story is better. The emotional thread now comes from secondary characters and situations, not Liska herself.

### Coping strategies → dropped entirely
- **Chose:** Not included in adventure prompt
- **Why:** Liska doesn't go through emotional hardship in adventures. If a secondary character needs help, the model can handle that without a prescribed coping strategy menu.

## Key Files for Context
- `context/core_rules/1_Core_Principles.md` — source file analyzed
- `prompts/writing_style.md` — output file where compressed guidance was written
- `prompts/characters.md` — placeholder for character descriptions (to be filled later)
