# 4. Narrative Structure

This document consolidates all rules related to the story's plot structure, prose mechanics, and formatting.

---

## Core Narrative Principles

These universal principles govern all stories and must be applied throughout the narrative:

*   **Show *and* Label**: Mandatory sequence for all emotions and concepts. First demonstrate through physical action, expression, or sensation, then provide the correct emotional vocabulary. Never name an emotion before showing it.
*   **Protagonist Agency**: The child character must be the primary driver of their own discovery and solutions. Adults guide through questions, modeling, and minimal support—they never provide answers or solve problems.
*   **Narrative Economy**: Every word must serve both the plot and the developmental lesson. No static scenes, didactic lectures, or extraneous descriptions. Maximum impact in minimum space.
*   **Action as Default**: Convert all inert dialogue into dynamic, physical interactions. Ground conversations in movement, environment, and sensory detail.
*   **Character Psychology as Engine**: Character traits (humor profiles, emotional tells, coping strategies) should generate both the story's fun moments and its developmental content. All actions must be consistent with established character profiles.
*   **Constraint-Native Creation**: Build the story around developmental requirements from the start, not as an add-on. The lesson should emerge naturally from the plot.

---

## Five-Act Story Structure (Ages 4-6)

This structure includes beats for dysregulation and solution discovery with specific developmental ratios and engagement requirements.

---

### **Act 1: Introduction**
**[Developmental Ratio: 100% Engagement, 0% Development]**
**[Engagement Requirement: At least 1 engagement type per act]**

*   **Beat 1.1: Introduce setting and atmosphere**
    *   Describe the environment in 1-2 vivid, relevant lines to create an evocative image and establish the initial emotional tone.
    *   Use sensory details (sight, sound, touch, smell, taste) appropriate for 4-6 year olds.
    *   **Constraint:** No developmental content allowed in this beat—focus purely on world-building and charm.
    *   Must immediately draw the user in and make them go "aww" or laugh
*   **Beat 1.2: Introduce character(s)**
    *   Present the main character(s) and their initial state.
    *   Portray characters in a cute, endearing, fun, or otherwise engaging way.
    *   Use "show, don't tell". Express the character through their actions.
    *   **Constraint:** No developmental content allowed—establish character personality and appeal only.
    *   Must align with established character profiles from character documents.
    *   Must immediately draw the user in and make them go "aww" or laugh

---

### **Act 2: Inciting Incident – The Challenge Begins**
**[Developmental Ratio: 80% Engagement, 20% Development]**
**[Engagement Requirement: At least 1 engagement type per act]**
**[Critical Beat Requirement: Inciting incident must have high engagement quotient]**

*   **Beat 2.1: Lead-up**
    *   Events that set the stage for the problem. This is an opportunity to showcase fun character behaviors based on their humor profiles and engagement types.
    *   Slot: `Fun` from @fun_types.csv (aligned with character humor profiles)
    *   Slot: `Engagement` from @engagement_types.csv
    *   **Constraint:** No developmental content allowed.
*   **Beat 2.2: The Catalyst (Misstep / Misjudgment / Accidental Event)**
    *   The character's suboptimal action or an accident creates/triggers the problem.
    *   Must be believable for the character based on their profile traits.
    *   Slot: `Engagement` from @engagement_types.csv
    *   Slot (Optional): `Fun` from @fun_types.csv
    *   **Constraint:** Action-focused—no developmental content.
*   **Beat 2.3: The Core Incident (The External Problem / Challenge)**
    *   A clear, tangible problem is established with immediate, obvious impact.
    *   Slot: `Engagement` from @engagement_types.csv
    *   Slot: `Emotional Trigger` from @emotional_triggers.csv (clearly implemented)
    *   Slot (Optional): `Fun` from @fun_types.csv (if humor aligns with story mood)
    *   **Constraint:** No regulation yet—focus on establishing the problem.
*   **Beat 2.4: Fallout**
    *   **REQUIRED:** The child experiences initial dysregulation and negative emotional reaction.
    *   Should be mild—reserve deep emotional low for Beat 3.4.
    *   Slot: `Engagement` from @engagement_types.csv
    *   Slot: `Emotion Group Triggered` from @emotion_groups.csv
    *   Slot: `Dysregulation` from @dysregulation_types.csv
    *   Write authentically to character profile.

---

### **Act 3: Attempts to Solve / Unravel – Facing the Problem & Inner Turmoil**
**[Developmental Ratio for Recovery Beats (3.1, 3.5): 60% Development, 40% Engagement]**
**[Developmental Ratio for Other Beats: 80% Engagement, 20% Development]**
**[Engagement Requirement: At least 1 engagement type per act]**
**[Critical Beat Requirement: Low Point must have high engagement quotient]**

*   **Beat 3.1: Recovery (Optional)**
    *   **[Primary developmental beat - 1-2 paragraphs maximum]**
    *   If dysregulation is significant, the first regulation cycle occurs. 
    *   Partial or full co-regulation allowed if needed.
    *   Can be brief (few words) if emotions aren't story focus—may be physical recovery.
    *   Slot: `Engagement` from @engagement_types.csv
    *   Slot: `Regulation Strategy` from @regulation_strategies.md involving:
        *   Slot: `Coping Strategy` from @coping_strategies.csv
        *   Slot: `Support` from @support_types.csv
        *   Slot (Optional): `Fun` from @fun_types.csv (if coping portrayed endearingly)
    *   **Co-regulation Constraints:** Maximum 3 exchanges, physical-first, embedded in action.
*   **Beat 3.2: Attempt 1 (Initial Reaction / Less Considered Approach)**
    *   The child makes an initial, often impulsive effort that's logical from their POV.
    *   Must be driven by and consistent with character's established traits.
    *   Leads to failure or partial outcome.
    *   Slot (Optional): `Support` from @support_types.csv
    *   **Adult Support Constraint:** Minimal only—questions, hints, or tools. No solutions.
*   **Beat 3.3: Attempt 2 (Developing Approach / New Complication)**
    *   The child tries a different approach showing some learning from Attempt 1.
    *   Still falls short in a character-consistent way.
    *   Results in more significant setback or new complication that logically follows.
    *   Slot: `Engagement` from @engagement_types.csv
    *   Slot (Optional): `Fun` from @fun_types.csv (if aligns with story mood)
    *   **Constraint:** Focus on action and engagement—minimal developmental content.
*   **Beat 3.4: Low Point (Emotional & Practical Setback)**
    *   **REQUIRED:** Must show intense negative emotion and feeling overwhelmed.
    *   Character confronts limitations and consequences of failures.
    *   Must feel emotionally and practically significant.
    *   Slot: `Engagement` from @engagement_types.csv (typically expectation/tension related)
    *   Slot: `Emotional Trigger` from @emotional_triggers.csv (commonly Performance Failure, Social Rejection)
    *   Slot: `Emotion Group Triggered` from @emotion_groups.csv
    *   Slot: `Dysregulation` from @dysregulation_types.csv
    *   **Show-Label Rule:** Physical manifestation of emotion BEFORE any labeling.
*   **Beat 3.5: Recovery**
    *   **[Main developmental beat - 1-2 paragraphs maximum]**
    *   Second regulation cycle—more involved than first recovery.
    *   Deep co-regulation or self-regulation to manage intense emotions from Low Point.
    *   Child becomes calm and receptive to new thinking.
    *   Slot: `Regulation Strategy` from @regulation_strategies.md involving:
        *   Slot: `Coping Strategy` from @coping_strategies.csv
        *   Slot: `Support` from @support_types.csv
    *   **Co-regulation Constraints:** Maximum 3 exchanges, physical-first, embedded in action.
    *   **Emotion Metaphors:** If used (1-2 max per story), must be introduced by adults here.
*   **Beat 3.6: Re-evaluation**
    *   Child processes failures and emotions, constructs solution.
    *   **Child Agency Requirement:** Child must be central agent in discovering solution.
    *   Adults facilitate through questions only—child reaches conclusions.
    *   **Solution Building Phase:**
        *   Gather information if still necessary
        *   Slot: `Solution Discovery Process` from @solution_discovery_processes.csv
        *   Solution discovered—child understands what needs to be done
    *   **Preparation Phase (if necessary):**
        *   Mental/physical practice of new plan
        *   Slot: `Coping Strategy` from @coping_strategies.csv
        *   Slot: `Support` from @support_types.csv
        *   Slot: `Practice` from @practice_types.csv
    *   Keep all elements simple and age-appropriate.

---

### **Act 4: Climax & Solution – Overcoming Externally & Internally**
**[Developmental Ratio: 90% Engagement, 10% Development]**
**[Engagement Requirement: At least 1 engagement type per act]**
**[Critical Beat Requirement: Climax must have high engagement quotient]**
**[Growth Constraint: Show development through action, not explanation]**

*   **Beat 4.1: Final Attempt / Approach (Applying New Understanding / Changed Behaviour)**
    *   The child implements the constructed solution with more maturity or better emotional control.
    *   Must clearly demonstrate change from earlier attempts.
    *   Slot: `Engagement` from @engagement_types.csv
    *   Slot: `Coping Strategy` from @coping_strategies.csv (explicitly allowed)
    *   Slot (Optional): `Fun` from @fun_types.csv
    *   **Constraint:** Show growth through changed behavior, not dialogue.
*   **Beat 4.2: Rising Tension / Suspense**
    *   The outcome is uncertain as the attempt unfolds, testing the character's resolve.
    *   Create genuine suspense where success is not guaranteed.
    *   Character's reaction under pressure must be authentic to their profile.
    *   Slot: `Engagement` from @engagement_types.csv
    *   **Constraint:** Pure tension and action—no developmental content.
*   **Beat 4.3: The Turning Point / Final Push (Demonstrating Growth in Action)**
    *   The critical action or decision that directly leads to success.
    *   Single, clear, decisive action proving character's growth.
    *   Often involves overcoming a final internal hurdle.
    *   Slot: `Engagement` from @engagement_types.csv
    *   Slot: `Coping Strategy` from @coping_strategies.csv (if overcoming internal hurdle)
    *   Slot (Optional): `Fun` from @fun_types.csv
    *   **Child Agency Requirement:** Child solves the problem themselves—paramount.
*   **Beat 4.4: Success (External Problem Resolved)**
    *   The Core Incident is successfully resolved.
    *   Make resolution obvious and directly linked to child's final attempt.
    *   **Constraint:** Focus on the triumph—no developmental commentary.
*   **Beat 4.5: Immediate Reward / Relief (Accomplishment & Positive Emotion)**
    *   Direct positive consequence (social, emotional, physical) experienced.
    *   Strong positive emotional release.
    *   **Show-Label Rule:** Show emotion physically first, label briefly if needed.

---

### **Act 5: Resolution & Conclusion – Integrating the Growth**
**[Developmental Ratio: 90% Engagement, 10% Development]**
**[Engagement Requirement: At least 1 engagement type per act]**
**[Growth Constraint: Show development through action and changed behavior]**

*   **Beat 5.1: Catharsis / Immediate Aftermath**
    *   Tension subsides; characters process the success and entire experience.
    *   Clear shift from tension to calm and relaxation.
    *   Slot (Optional): `Fun` from @fun_types.csv
    *   **Constraint:** Focus on celebration and relief, not analysis.
*   **Beat 5.2: Reflection & Learning (Internalizing the Lesson & Growth)**
    *   Child realizes meaning of events and personal growth.
    *   Lesson understood in simple, concrete, age-appropriate language.
    *   Slot: `Engagement` from @engagement_types.csv (typically calm, cognitive)
    *   Slot: `Support` from @support_types.csv (allowed)
    *   **Child Agency Requirement:** Realization belongs to the child.
    *   **Constraint:** Keep reflection brief and action-oriented.
*   **Beat 5.3: Making it Right / Integration (Acknowledging & Embodying Change)**
    *   If initial Catalyst involved mistake, apologies/forgiveness/changed behavior occurs.
    *   Child takes concrete action expressing their growth.
    *   Slot: `Engagement` from @engagement_types.csv (typically calm, empathy-focused)
    *   Slot: `Support` from @support_types.csv (allowed)
    *   **Constraint:** Demonstrate change through action, not explanation.
*   **Beat 5.4: New Status Quo / Harmonious Scene (Character Transformed)**
    *   New normalcy showing character more capable/confident/emotionally intelligent.
    *   Final scene shows character clearly different and more mature than Act 1.
    *   Relationships may be strengthened.
    *   **Constraint:** Show transformation through changed behavior and interactions.
*   **Beat 5.5: Concluding Thought / Wrap-up**
    *   Final 1-2 sentences providing closure.
    *   Provides clear closure and subtly reinforces main theme.
    *   **Constraint:** Keep brief and emotionally resonant, not didactic.

---

## Overall Story Requirements

These requirements apply across the entire story structure:

### **Engagement & Fun Distribution**
*   **Per-Act Minimum:** At least 1 engagement type from `@engagement_types.csv` in each act
*   **Story Total:** At least 2 fun types from `@fun_types.csv` distributed across the story
*   **Critical Beats:** Inciting incident (Act 2), Low Point (Beat 3.4), and Climax (Act 4) must have high engagement quotient
*   **Pacing Rule:** Maximum 2 consecutive paragraphs without tension, humor, or character action

### **Developmental Content Constraints**
*   **Emotion Metaphors:** Exactly 1-2 per story maximum, introduced by adult characters first
*   **Co-regulation Rules:** 
    *   Maximum 3 exchanges between child and adult during any co-regulation moment
    *   Must be physical-first (hugs, positioning, touch) before verbal
    *   Embedded in action—no stopping the plot for emotional processing
    *   During high-tension moments, co-regulation must be minimal (a glance, a soft word)
*   **Show-Label Sequence:** Mandatory for all emotions—physical manifestation FIRST, then brief labeling if needed

### **Character & Agency Requirements**
*   **Protagonist Agency:** Child character must be the primary driver of their discovery and solutions
*   **Adult Role:** Adults guide through questions, modeling, and minimal support—never provide answers or solve problems
*   **Character Consistency:** All actions must align with established character profiles
*   **Growth Through Action:** Demonstrate all development through changed behavior, not explanation or dialogue

<br>

---

## Prose Style & Formatting Guide

This guide provides unified style and formatting rules for writing children's stories for 4-6 year olds in both English and Russian.

### **1. Core Principles**

*   **Show, Don't Tell**: Describe actions to imply emotion.
    *   **Instead of**: "Liska was curious."
    *   **Write**: "Liska tilted her head. Her ears twitched."
*   **Conversational character**: Write as if a person is telling the story orally.
*   **Use age-approptiate language** for 5-6 year olds that parents speaking to children, or children speaking to each other, would use. Do not use awkward phrases, make it flow.
*   **Include connecting words** that facilitate smooth spoken delivery.
*   **Natural storytelling flow**: Use transitions and phrases that sound natural when spoken aloud.
*   **Rhythmic quality**: Ensure sentences have a pleasant cadence for parent-child reading sessions.
*   **Tense & Person**: Write exclusively in the 3rd person, past tense.

### **2. Document & Page Structure**

*   **Target Audience**: 4-6 year old children (language complexity for 5-year-olds).
*   **Total Text Length**: 500-700 words maximum.
*   **Page/Line Word Count**: 15-30 words.
*   **Page/Line Sentence Count**: 2-4 sentences.
*   **Format**: Each line of text in the draft represents one page. Do not use page numbers. Insert an empty line between each line/page.

#### **Example (Line Split Format)**

This shows how to correctly split output into multiple lines. Each line represents a "page" in a picture book.

**CORRECT:**
> Tonight, Liska was hunting a moonbeam. She pressed low to the ground. Her bottom gave a little wiggle and...
>
> She pounced like a tiny predator! But her paw only patted the floor with a little *fump*. Liska furrowed her brows in confusion.

**INCORRECT:**
> Tonight, Liska was hunting a moonbeam.
> She pressed low to the ground.
> Her bottom gave a little wiggle and...
> She pounced like a tiny predator!
> But her paw only patted the floor with a little *fump*.
> Liska furrowed her brows in confusion.

### **2.1 Forbidden Tropes**

Never include these elements in any story:

*   **Adult lectures or "teaching conversations"**: No scenes where adults explain emotions, concepts, or lessons for more than 1-2 sentences.
*   **Magic solutions or instant emotional fixes**: All emotional regulation must be realistic and require effort from the child.
*   **Passive protagonists**: The child must never simply be told the lesson or have problems solved for them by adults.
*   **Static scenes**: Every scene must advance the plot or develop character—no pauses for pure exposition.
*   **Didactic dialogue**: Characters should never speak primarily to convey a lesson to the reader.
*   **Premature problem resolution**: Avoid resolving emotional tension too quickly with adult intervention.

### **3. Sentence & Vocabulary**

*   **Age-Appropriate Language**: All vocabulary must be simple and common for 4-5 year olds. When a complex concept is necessary, it must be explained through simple actions or dialogue. Avoid abstract nouns and complex sentence structures.
*   **Rhythmic Flow**: Vary sentence length to create a natural, pleasant cadence. Avoid choppy sentences.
    *   **Instead of**: "Liska was confused. She tilted her head."
    *   **Write**: "Liska tilted her head in confusion."
*   **Connecting Words**: Use simple connectors (e.g., "And," "But," "So," "Then") to create a smooth, flowing narrative.
*   **Simple Vocabulary**: Prioritize common nouns and verbs that a 5-year-old can easily understand.
*   **Adjective Rule**: Use only simple, concrete adjectives. Avoid abstract or multi-syllabic words.
    *   **Use**: `big`, `soft`, `happy`, `little`, `red`, `warm`.
    *   **Avoid**: `tremendous`, `ethereal`, `melancholy`, `minuscule`, `crimson`, `tepid`.
*   **Pacing Rule**: Maximum 2 consecutive paragraphs without tension, humor, or character action. Edit for conciseness, cut anything that slows the pace.

### **4. Literary Devices**

*   **Story Titles**: Must be descriptive, specific, and memorable. They should convey both meaning and a specific situation.
    *   **EN Example**:
        *   Good: "Liska Saves for a Kebab"
        *   Bad: "Liska Learns To Save Money"
    *   **RU Example**:
        *   Good: "Лиска копит на шашлычок"
        *   Bad: "Лиска учится копить деньги"
*   **Metaphors and Images**: Must be simple, visual, and immediately understandable. They must be adapted to maintain emotional impact and cultural resonance for each target language.
*   **Refrains and Repeated Phrases**: Must be memorable, emotionally resonant, and easy for a child to chant.
    *   **EN Example**: "Afraid, but trying."
    *   **RU Example**: "Боюсь, но пробую"

### **5. Cultural Adaptation**
*   **Names and Cultural Elements**: Adapt concepts to natural Russian equivalents (e.g., "Meat pastry" → "чебурек").
*   **Refrains and Repeated Phrases**: Adapt refrains to be memorable and emotionally evocative in Russian (e.g., "From Purr to Growl" → "Мурчалки-рычалки").

### **5.1 Emotion Metaphors & Co-regulation Rules**

*   **Metaphor Limits**: Stories must contain exactly 1-2 emotion metaphors maximum.
    *   Metaphors must be introduced by adult characters first
    *   They should be simple, visual, and immediately understandable to a 5-year-old
    *   Integrate metaphors into action, not as explanatory tools
*   **Co-regulation Constraints**:
    *   Maximum 3 exchanges between child and adult during any co-regulation moment
    *   Must be physical-first (hugs, positioning, touch) before verbal
    *   Embedded in action—no stopping the plot for emotional processing
    *   During high-tension moments, co-regulation must be minimal (a glance, a soft word) to avoid premature conflict resolution
*   **Emotion Sequencing**: Always follow "Show and Label" principle
    *   First: Physical manifestation (tears, clenched fists, tight shoulders)
    *   Then: Brief labeling if needed ("That's frustration making your body tight")
    *   Never reverse this order

### **6. Dialogue Formatting**

#### **English**

*   Enclose dialogue in double quotation marks (`"`).
*   Place punctuation like commas, periods, and question marks **inside** the closing quotation mark.
*   **Correct Example**:
    ```
    "Let's build a fort," said Liska.

    "Okay!" squeaked Anji. "I'll get the blankets."
    ```

#### **Russian**

*   Use an em-dash (`—`) to introduce dialogue. Do not use quotation marks (`«»` or `""`).
*   **Correct Example**:
    ```
    — Давай построим форт, — сказал Лиска.

    — Хорошо! — пискнула Анжи. — Я принесу одеяла.
    ```

### **7. Flagging for Review**

**Mark in bold** any passages that are difficult to write while adhering to all rules. This allows for an editorial decision. Flag passages that involve:

*   Cultural concepts that may not be universally understood or easily translated.
*   Wordplay or puns that are difficult to execute with simple language.
*   Complex emotional states that are hard to convey through simple actions ("show, don't tell").
*   Abstract concepts that resist simplification.

<br>

---

## Page Breakdown Structure

This section defines the technical page structure for a standard picture book.

*   **Front matter**
    *   Front Cover
    *   [L] Inside Front Cover = Front Endpaper
    *   [R] Page 1 - Half-Title. Only the name of the book
    *   [L] Page 2 - Copyright, ISBN, etc
    *   [R] Page 3 - Full title. Author name, illustration, publisher logo, etc

*   **Content: 14 spreads = 28 pages for story and illustrations**
    *   [L] Page 4 - Story starts
    *   … Story pages
    *   [R] Page 31 - Last page of the story

*   **End matter**
    *   [L] Page 32 - End page, ‘Котец’ in my case
    *   [R] Inside Back Cover = Back Endpaper
    *   Back Cover
