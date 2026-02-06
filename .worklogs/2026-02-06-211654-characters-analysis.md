# Characters analysis and compression for Liska Adventures prompts

**Date:** 2026-02-06 21:16
**Scope:** `characters/**` → `prompts/characters.md`

## Summary
Compressed 30+ character files (profiles, humor docs, arcane abilities, emotional tells, coping strategies) into a single concise `characters.md` with 3 main characters and 9 secondary characters/creatures. All arcane/magic abilities dropped from every character.

## Context & Problem
The old character system had separate files for each character's profile, humor style, arcane abilities, emotional tells, and coping strategies — designed for a rigid pipeline where each stage consumed specific inputs. For the simplified Liska Adventures prompts, we need minimal character descriptions that give direction without constraining the model.

## Decisions Made

### Main characters (Liska, Anji, Tahrra) — compressed to essentials
- **Chose:** Brief physical description, one-line personality, key behavioral traits
- **Why:** Smart model can infer behavior from personality description; over-specifying closes doors

### Liska personality — generalized
- **Chose:** "Curious, bold, and impulsive — she leaps before she looks. Feels everything big, bounces back fast."
- **Alternatives considered:**
  - Specific traits list (struggles with turn-taking, pulls away from touch) — rejected because too limiting, makes every story about those specific traits
  - "Emotionally stable" — rejected because it would flatten her; model with no context would write her as bland

### Emotional distribution guidance
- **Chose:** Added to writing_style.md Story Identity: "Liska feels emotions naturally but moves through them quickly — she's the one who notices and helps others with theirs."
- **Why:** Prevents model from centering all emotional drama on protagonist without making her flat

### Expressiveness — anthropomorphic framing
- **Chose:** "Full human-like emotional expressions, plus animal features on top — an extremely expressive tail, ears that move with her mood, fur that puffs up in big moments."
- **Why:** User clarified these are human children in animal form, not animals. Human expressions are the base, animal features are extras. Tail positions not listed — just "extremely expressive" to avoid the model repeating the same positions.

### Pet names — kept
- **Chose:** Full list of EN and RU pet names with parent-specific usage notes
- **Why:** Without these, the model invents weird pet names. The parent-specific rules (mother does NOT use пушистик) are uninferrable.

### Surname "Kotichek" — dropped
- **Chose:** Not included anywhere
- **Why:** Model would overuse it. First names only.

### All arcane/magic abilities — dropped for every character
- **Chose:** Removed all references to arcane powers, magical abilities, dimensional pockets (Slypaws kept as personality quirk without magic explanation)
- **Why:** No magic in the world. Previously "arcane" features were part of a different story type.

### Anji — simplified
- **Chose:** "Boundless energy, good-natured" as core, plus specific behavioral traits
- **Why:** "Good-natured but everything causes mess" was redundant — boundless energy already implies mess

### Tahrra — added insight role
- **Chose:** "childlike wisdom that sees right through the nonsense. Deadpan delivery."
- **Why:** Her role as the one who speaks simple truths is her defining narrative function

### Lucia — human, language barrier
- **Chose:** Explicitly stated "human, the only human character" with Latin-flavored broken speech
- **Why:** Critical distinction — she's not anthropomorphic. Language barrier is a strength. Signature words ("Friendus!", "Maximus!") are key to her voice.

### Zanziri — dangerous but gentle
- **Chose:** "Moves like someone who could be very dangerous but chooses not to be"
- **Alternatives considered:**
  - "Like an assassin living peacefully in a village" — rejected, user said don't literally mention assassin
  - The implication is clear from the description without naming it

### Biological creatures kept
- **Chose:** Caterpillow (color-changing empathic Murr) and Mood Flowers included with explicit "(biological, not magical)" tags
- **Why:** These are part of the world's natural biology, not magic. The distinction matters given the "no magic" rule.

### Kebab Man, Slothy — minimal entries
- **Chose:** Brief descriptions with Russian names
- **Why:** These are simple supporting elements — a comedy friend and a comfort object. Don't need elaborate profiles.

### Humor profiles — dropped for all characters
- **Chose:** No character-specific humor sections
- **Why:** Same reasoning as dropping humor examples from writing_style.md — specific humor patterns become templates. The personality descriptions imply humor style.

## Key Files
- `prompts/characters.md` — the output file with all compressed characters
- `prompts/writing_style.md` — references characters.md, contains emotional distribution guidance
- `characters/` — all source files (unchanged)
- `.worklogs/2026-02-06-201659-core-principles-analysis.md` — where Liska's emotional role was first discussed
