# Analysis of 2_Emotional_Framework.md — Skipped for Adventures

**Date:** 2026-02-06 20:21
**Scope:** `context/core_rules/2_Emotional_Framework.md` — no output

## Summary
Reviewed the emotional framework file and determined nothing needs extraction for Liska Adventures prompts.

## What was in the source file
- 19 emotion entries with metaphors (Dragon Inside/anger, Rainy Cloud/sadness, Prickly Hedgehog/self-pity, etc.)
- Somatic descriptions for each emotion (how it feels in the body)
- Narrative examples in EN and RU for each
- 4-step Emotion Unfolding Sequence (physical expression → internal feeling → automatic coping → learned coping)

## Decision
- **Chose:** Skip entirely
- **Why:** This was the backbone of the psychological story system where models needed prescribed metaphors and somatic descriptions. For adventures, we trust the model to write emotions naturally. The "show physically before labeling" principle is standard show-don't-tell that doesn't need to be spelled out.
- **Note:** Old file remains in place for use by the psychological story pipeline. We are only extracting into `prompts/`, not modifying or deleting source files.
