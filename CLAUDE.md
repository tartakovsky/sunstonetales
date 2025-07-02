# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a children's therapeutic story creation project called "Seberiada" that develops structured narratives for ages 4-6. The project combines developmental psychology with storytelling to create emotionally supportive stories featuring the character Liska (a snow leopard cub) and friends.

## Story Development Workflow

### 6-Step Story Creation Process

Stories follow a standardized development pipeline in `stories/` subdirectories:

1. **1_concept_extraction.md** - Extract core problem and developmental goals from input
2. **2_structural_blueprint.md** - Apply 5-act structure with emotional regulation beats
3. **3_psy_review.md** - Psychological review ensuring age-appropriate emotional content
4. **4_narrative_storyboard.md** - Scene-by-scene story breakdown
5. **5_pre_prose_narrative.md** - Narrative flow preparation
6. **6_prose_draft.md** - Final prose following strict formatting rules

### Story Structure Requirements

All stories follow the **5-Act + Dysregulation + Solution Discovery** structure defined in `context/five_act_4_to_6_yo.md`:
- Act 1: Introduction (setting, character)
- Act 2: Inciting Incident (challenge begins)
- Act 3: Attempts to Solve (facing problem & inner turmoil)
- Act 4: Climax & Solution (overcoming externally & internally)
- Act 5: Resolution & Conclusion (integrating growth)

## Prose Style Guidelines

### Critical Formatting Rules (context/prose_style.md)

- **Target**: Ages 4-6, 500-800 total words
- **Page Format**: Each paragraph = one page/illustration, 15-30 words per page
- **Tense**: 3rd person, past tense exclusively
- **Language**: Simple vocabulary, show don't tell, conversational tone
- **Dialogue**:
  - English: Double quotes with punctuation inside
  - Russian: Em-dash (—) format, no quotation marks

### Character and Content Guidelines

- **Characters**: Simple, identifiable animal characters with clear emotions
- **Tension**: Mild problems only (lost items, misunderstandings, fears)
- **Morals**: Clear but not preachy lessons about emotions, friendship, courage
- **Emotion Metaphors**: Maximum 2 per story, explicitly explained
- **Coping Strategies**: Must be introduced by adults before children can use them

## Project Architecture

### Core Context Files

- `context/storytelling_guidelines.md` - Character and plot requirements
- `context/prose_style.md` - Writing and formatting rules
- `context/five_act_4_to_6_yo.md` - Story structure template
- `context/emotional_metaphors.md` - Approved metaphor patterns
- `context/regulation_strategies.md` - Child emotional regulation approaches

### Character System

Character profiles in `context/characters/[NAME]/`:
- `[name]_profile.md` - Basic character information
- `[name]_arcane.md` - Detailed psychological profile
- Special files for Liska: `auto_coping.md`, `learned_coping.md`, `emotional_tells.md`

### Data Files (CSV format)

Located in `context/`:
- `coping_strategies.csv` - Age-appropriate coping mechanisms
- `emotion_groups.csv` - Categorized emotional states
- `emotional_triggers.csv` - Common childhood emotional triggers
- `dysregulation_types.csv` - Types of emotional dysregulation
- `regulation_strategies.csv` - Strategies for emotional regulation
- And more specialized data files

## Development Commands

No build system detected. This appears to be a content creation project using markdown files.

## File Organization

- `stories/[N]. [story_name]/` - Individual story development folders
- `stories/template_steps/` - Empty template files for new stories
- `context/` - All reference materials and guidelines
- `marketing/` - Project marketing and branding materials
- `backups/` - Historical versions of content

## Python Utilities

- `symlink_creator.py` - Creates symbolic links for file organization
- `fix_symlinks.py` - Repairs broken symbolic links
- `final_symlink_creator.py` - Final symlink organization

## Working with Stories

When creating or editing stories:

1. Always reference `context/prose_style.md` for formatting requirements
2. Follow the 6-step development process in order
3. Ensure emotional content aligns with age 4-6 developmental needs
4. Use character profiles from `context/characters/` for consistency
5. Apply the 5-act structure from `context/five_act_4_to_6_yo.md`
6. Validate against storytelling guidelines before finalizing

## Language Support

Project supports both English and Russian with language-specific formatting rules for dialogue and cultural adaptation requirements.