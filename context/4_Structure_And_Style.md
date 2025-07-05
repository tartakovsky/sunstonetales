# 4. Narrative Structure

This document consolidates all rules related to the story's plot structure, prose mechanics, and formatting.

---

## Five-Act Story Structure (Ages 4-6)

This structure includes beats for dysregulation and solution discovery.

---

### **Act 1: Introduction**

*   **Beat 1.1: Introduce setting and atmosphere**
    *   Describe the environment in 1-2 vivid, relevant lines to create an evocative image and establish the initial emotional tone.
*   **Beat 1.2: Introduce character(s)**
    *   Present the main character(s) and their initial state.
    *   Portray characters in a cute, endearing, fun, or otherwise engaging way.
    *   Use "show, don't tell". Express the character through their actions.

---

### **Act 2: Inciting Incident – The Challenge Begins**

*   **Beat 2.1: Lead-up**
    *   Events that set the stage for the problem. This is an opportunity to showcase fun character behaviors based on their humor profiles and engagement types.
    *   Slot: `Fun` from @fun_types.csv
    *   Slot: `Engagement` from @engagement_types.csv
*   **Beat 2.2: The Catalyst (Misstep / Misjudgment / Accidental Event)**
    *   Slot: `Engagement` from @engagement_types.csv
    *   Slot (Optional): `Fun` from @fun_types.csv
    *   The character's suboptimal action or an accident creates/triggers the problem.
*   **Beat 2.3: The Core Incident (The External Problem / Challenge)**
    *   A clear, tangible problem is established with immediate impact.
    *   Slot (Optional): `Fun` from @fun_types.csv. Problematic behavior can be presented humorously (e.g., as exaggerated or endearing), provided it aligns with the story's mood.
    *   Slot: `Engagement` from @engagement_types.csv
    *   Slot: `Emotional Trigger` from @emotional_triggers.csv
*   **Beat 2.4: Fallout**
    *   The child experiences initial dysregulation and a negative emotional reaction to the Core Incident. Should be mild, the deep low should be reserved for the low point later.
    *   Slot: `Engagement` from @engagement_types.csv
    *   Slot: `Emotion Group Triggered` from @emotion_groups.csv
    *   Slot: `Dysregulation` from @dysregulation_types.csv

---

### **Act 3: Attempts to Solve / Unravel – Facing the Problem & Inner Turmoil**

*   **Beat 3.1: Recovery (Optional)**
    *   If dysregulation is significant, the first regulation cycle occurs. The child attempts to manage distress through co-regulation (with adult support like calming presence, validation) or self-regulation (using a simple coping behaviour), becoming somewhat calmer. Light coaching may occur. Might be a few word-long if emotions are not the focus of the story. Then recovery might be physical. Getting up, finding the balance, etc.
    *   Slot: `Engagement` from @engagement_types.csv
    *   Slot: `Regulation Strategy` from @regulation_strategies.md
        *   Slot: `Coping Strategy` from @coping_strategies.csv
        *   Slot (Optional): `Fun` from @fun_types.csv. Coping might potentially be portrayed in an endearing or exaggerated way.
        *   Slot: `Support` from @support_types.csv
*   **Beat 3.2: Attempt 1 (Initial Reaction / Less Considered Approach)**
    *   The child makes an initial, often impulsive, effort to solve the problem, leading to failure or a partial outcome.
    *   Slot (Optional): `Support` from @support_types.csv. If neccessary, a parent can give some tool or advice or question here.
*   **Beat 3.3: Attempt 2 (Developing Approach / New Complication)**
    *   Slot: `Engagement` from @engagement_types.csv
    *   Slot (Optional): `Fun` from @fun_types.csv. The attempt can be portrayed in a fun way. Exaggerated, endearing, etc. Only if it aligns with the story mood.
    *   The child tries a different approach, possibly showing some learning, but it results in a more significant setback or a new complication.
*   **Beat 3.4: Low Point (Emotional & Practical Setback)**
    *   Something goes wrong. A moment of intense negative emotion and feeling overwhelmed, where the character confronts their limitations and the consequences of failures.
    *   Slot: `Engagement` from @engagement_types.csv. Typically something expectation / tension related.
    *   Slot: `Emotional Trigger` from @emotional_triggers.csv
        *   Typically `Performance Failure`, `Social Rejection`, can be others depending on the plot
    *   Slot: `Emotion Group Triggered` from @emotion_groups.csv
    *   Slot: `Dysregulation` from @dysregulation_types.csv
*   **Beat 3.5: Recovery**
    *   The second regulation cycle occurs. The child engages deeply in co-regulation or self-regulation to manage the intense emotions of the Low Point, becoming calm and receptive to new thinking. Physical / situation recovery might follow.
    *   Slot: `Regulation Strategy` from @regulation_strategies.md
        *   Slot: `Coping Strategy` from @coping_strategies.csv
        *   Slot: `Support` from @support_types.csv
*   **Beat 3.6: Re-evaluation**
    *   Reflection and solution construction occurs. During solution construction, the child processes failures and emotions. Adults might facilitate, but the child should be main and active participant as much as it's reasonable. New approaches emerge through one of the `Solution Discovery Processes`. A promising approach is selected. Rehearsal potentially follows, involving mental/physical practice of the new plan. This phase also provides a slot for learning or re-affirming coping behaviours to manage emotions during the upcoming attempt. Or external better-adapted behaviours. Important to keep any of it simple at age-appropriate level.
    *   **Solution Building:**
        *   Gather info if still necessary
        *   Slot: `Solution Discovery Process` from @solution_discovery_processes.csv
        *   Solution discovered. Child understands what needs to be done. They might or might not be prepared to do it yet. If preparation is necessary, use the next section.
    *   **Preparation, if necessary:**
        *   Slot: `Coping Strategy` from @coping_strategies.csv
        *   Slot: `Support` from @support_types.csv
        *   Slot: `Practice` from @practice_types.csv

---

### **Act 4: Climax & Solution – Overcoming Externally & Internally**

*   **Beat 4.1: Final Attempt / Approach (Applying New Understanding / Changed Behaviour)**
    *   The child implements the constructed solution with more maturity or better emotional control.
    *   Slot (Optional): `Fun` from @fun_types.csv
    *   Slot: `Engagement` from @engagement_types.csv
    *   Slot: `Coping Strategy` from @coping_strategies.csv
*   **Beat 4.2: Rising Tension / Suspense**
    *   The outcome is uncertain as the attempt unfolds, testing the character's resolve.
    *   Slot: `Engagement` from @engagement_types.csv
*   **Beat 4.3: The Turning Point / Final Push (Demonstrating Growth in Action)**
    *   The critical action or decision that directly leads to success, often overcoming a final internal hurdle.
    *   Slot: `Engagement` from @engagement_types.csv
    *   Slot (Optional): `Fun` from @fun_types.csv
    *   Slot: `Coping Strategy` from @coping_strategies.csv
*   **Beat 4.4: Success (External Problem Resolved)**
    *   The Core Incident is successfully resolved.
*   **Beat 4.5: Immediate Reward / Relief (Accomplishment & Positive Emotion)**
    *   A direct positive consequence, social, emotional, physical, etc, and strong positive emotional release are experienced.

---

### **Act 5: Resolution & Conclusion – Integrating the Growth**

*   **Beat 5.1: Relaxation / Immediate Aftermath (Processing the Journey)**
    *   Tension subsides; characters process the success and the entire experience (both the external challenge and their internal journey).
    *   Slot (Optional): `Fun` from @fun_types.csv
*   **Beat 5.2: Reflection & Learning (Internalizing the Lesson & Growth)**
    *   The meaning of events, the character's personal growth, and the lesson learned from the experience (often about themselves, their emotions, problem-solving, or their initial misjudgment) are understood or articulated.
    *   Slot: `Engagement` from @engagement_types.csv. Typically calm, cognitive, etc.
    *   Slot: `Support` from @support_types.csv
*   **Beat 5.3: Making it Right / Integration (Acknowledging & Embodying Change)**
    *   If the initial Catalyst involved a mistake by the protagonist, this is where apologies, forgiveness (self or others), or clearly demonstrating changed behavior occurs. The internal growth is integrated into their ongoing actions and self-perception.
    *   Slot: `Engagement` from @engagement_types.csv. Typically calm, empathy-focused, etc.
    *   Slot: `Support` from @support_types.csv
*   **Beat 5.4: New Status Quo / Harmonious Scene (Character Transformed)**
    *   A sense of new normalcy, where the character is demonstrably more capable, confident, emotionally intelligent, or has a more mature perspective. Relationships may be strengthened due to the shared experience and observed growth.
*   **Beat 5.5: Concluding Thought / Wrap-up**
    *   A final sentence or two providing closure, often reinforcing the positive change in the character, the value of the experience, or the positive outcome of their growth.

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
*   **Total Text Length**: 500-800 words.
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

### **3. Sentence & Vocabulary**

*   **Rhythmic Flow**: Vary sentence length to create a natural, pleasant cadence. Avoid choppy sentences.
    *   **Instead of**: "Liska was confused. She tilted her head."
    *   **Write**: "Liska tilted her head in confusion."
*   **Connecting Words**: Use simple connectors (e.g., "And," "But," "So," "Then") to create a smooth, flowing narrative.
*   **Simple Vocabulary**: Prioritize common nouns and verbs that a 5-year-old can easily understand.
*   **Adjective Rule**: Use only simple, concrete adjectives. Avoid abstract or multi-syllabic words.
    *   **Use**: `big`, `soft`, `happy`, `little`, `red`, `warm`.
    *   **Avoid**: `tremendous`, `ethereal`, `melancholy`, `minuscule`, `crimson`, `tepid`.

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
