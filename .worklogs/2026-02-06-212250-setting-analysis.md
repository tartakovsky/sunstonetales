# Setting extraction for Liska Adventures prompts

**Date:** 2026-02-06 21:22
**Scope:** `setting/*.md`, world info from character files → `prompts/setting.md`

## Summary
Compressed 10 location files (mostly image-gen prompts with narrative notes) plus scattered world-building references into a single concise `prompts/setting.md`. Covers world overview, city, culture, and 6 key locations.

## Context & Problem
The `setting/` directory contained 10 detailed location files designed for both image generation and writer reference. Each had exact dimensions, equipment lists, visual style notes, and sensory inventories. World-level info (city name, origin region, cultural practices) was scattered across character profiles. Needed a single file that gives a writer enough to feel the world without over-constraining scene descriptions.

## Decisions Made

### World overview — one paragraph
- **Chose:** Tech level, fantasy level, climate, inhabitants, explicit "no magic" and "no anthropomorphism of inanimate objects"
- **Why:** These are the uninferrable constraints. A model writing children's fantasy would default to magic without being told otherwise.

### Culture section — added
- **Chose:** 5 bullet points covering floor-sleeping, communal living, market culture, curtains-not-doors, rounded architecture
- **Why:** These details recur across every indoor scene and are specific enough that a model wouldn't infer them. Floor-sleeping especially — without this, every scene would have beds and chairs.

### Locations — compressed to vibes
- **Chose:** 6 locations (Yard, Beach, Jungle, Market, Camp, Home) with 1-3 sentence descriptions each
- **Alternatives considered:**
  - Include all 10 locations separately — rejected, the indoor rooms (kitchen, main room, bedrooms) are better folded into "Home"
  - Include equipment lists and dimensions — rejected, over-constraining for prose writing
  - Drop locations entirely — rejected, the specific geography (jungle next to city, 4 gates, grottos) gives the world its texture

### Playground — folded into Yard
- **Chose:** Mentioned as "The playground is in one corner" within the Yard description
- **Why:** Not important enough for its own section. The Yard is the parent location.

### Indoor rooms — folded into Home
- **Chose:** Kitchen, main room, Liska's bedroom combined into one "Liska's Home" entry with key sensory details
- **Why:** Individual room inventories are image-gen material, not prose guidance. A writer needs to know the vibe (golden walls, oil lamps, monstera, floor cushions) not the exact furniture list.

### Sar-Gora — one line
- **Chose:** "Liska's family originally comes from Sar-Gora, a snowy mountain region far away."
- **Why:** Important backstory context — Liska is a snow leopard in a tropical city. Worth stating but not elaborating.

## Key Files
- `prompts/setting.md` — the output file
- `prompts/writing_style.md` — references setting.md in World & Setting section
- `setting/*.md` — 10 source files (unchanged)
- `characters/Liska/liska.md` — source for Sar-Gora and Sunstone City names
