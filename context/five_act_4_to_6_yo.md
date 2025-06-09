# Story Structure: 5-act + Dysregulation + Solution Discovery

## Act 1: Introduction
Sections 1.1 and 1.2 can be reordered to best suit the narrative.

### 1.1: Introduce setting and atmosphere
Describe the environment in 2-3 vivid, relevant lines to create an evocative image and establish the initial emotional tone.

### 1.2: Introduce character(s)
Present the main character(s) and their initial state.
- Portray characters in a cute, endearing, fun, or otherwise engaging way.

## Act 2: Inciting Incident – The Challenge Begins
### 2.1: Lead-up
Events that set the stage for the problem. This is an opportunity to showcase fun character behaviors based on their humor profiles and engagement types.
- Slot: `Fun` from @fun_types.csv
- Slot: `Engagement` from @engagement_types.csv

### 2.2: The Catalyst (Misstep / Misjudgment / Accidental Event)
- Slot: `Engagement` from @engagement_types.csv
- Slot (Optional): `Fun` from @fun_types.csv

The character's suboptimal action or an accident creates/triggers the problem.

### 2.3: The Core Incident (The External Problem / Challenge)
A clear, tangible problem is established with immediate impact.
- Slot (Optional): `Fun` from @fun_types.csv. Problematic behavior can be presented humorously (e.g., as exaggerated or endearing), provided it aligns with the story's mood.
- Slot: `Engagement` from @engagement_types.csv
- Slot: `Emotional Trigger` from @emotional_triggers.csv

### 2.4: Fallout
The child experiences initial dysregulation and a negative emotional reaction to the Core Incident. Might be mild if the emotional inner state of the main character is not the focus of the story.
- Slot: `Engagement` from @engagement_types.csv
- Slot: `Emotion Group Triggered` from @emotion_groups.csv
- Slot: `Dysregulation` from @dysregulation_types.csv

## Act 3: Attempts to Solve / Unravel – Facing the Problem & Inner Turmoil
### 3.1: Recovery (Optional)
If dysregulation is significant, the first regulation cycle occurs. The child attempts to manage distress through co-regulation (with adult support like calming presence, validation) or self-regulation (using a simple coping behaviour), becoming somewhat calmer. Light coaching may occur. Might be a few word-long if emotions are not the focus of the story. Then recovery might be physical. Getting up, finding the balance, etc.
- Slot: `Engagement` from @engagement_types.csv
- Slot: `Regulation Strategy` from @regulation_strategies.md
    - Slot: `Coping Strategy` from @coping_strategies.csv
    - Slot (Optional): `Fun` from @fun_types.csv. Coping might potentially be portrayed in an endearing or exaggerated way. 
    - Slot: `Support` from @support_types.csv

### 3.2: Attempt 1 (Initial Reaction / Less Considered Approach)
The child makes an initial, often impulsive, effort to solve the problem, leading to failure or a partial outcome.
- Slot (Optional): `Support` from @support_types.csv. If neccessary, a parent can give some tool or advice or question here. 

### 3.3: Attempt 2 (Developing Approach / New Complication)
- Slot: `Engagement` from @engagement_types.csv
- Slot (Optional): `Fun` from @fun_types.csv. The attempt can be portrayed in a fun way. Exaggerated, endearing, etc. Only if it aligns with the story mood.

The child tries a different approach, possibly showing some learning, but it results in a more significant setback or a new complication.

### 3.4: Low Point (Emotional & Practical Setback)
Something goes wrong. A moment of intense negative emotion and feeling overwhelmed, where the character confronts their limitations and the consequences of failures.
- Slot: `Engagement` from @engagement_types.csv. Typically something expectation / tension related. 
- Slot: `Emotional Trigger` from @emotional_triggers.csv
    - Typically `Performance Failure`, `Social Rejection`, can be others depending on the plot
- Slot: `Emotion Group Triggered` from @emotion_groups.csv
- Slot: `Dysregulation` from @dysregulation_types.csv

### 3.5: Recovery
The second regulation cycle occurs. The child engages deeply in co-regulation or self-regulation to manage the intense emotions of the Low Point, becoming calm and receptive to new thinking. Physical / situation recovery might follow.
- Slot: `Regulation Strategy` from @regulation_strategies.md
    - Slot: `Coping Strategy` from @coping_strategies.csv
    - Slot: `Support` from @support_types.csv

### 3.6: Re-evaluation
Reflection and solution construction occurs. During solution construction, the child processes failures and emotions. Adults might facilitate, but the child should be main and active participant as much as it's reasonable. New approaches emerge through one of the `Solution Discovery Processes`. A promising approach is selected. Rehearsal potentially follows, involving mental/physical practice of the new plan. This phase also provides a slot for learning or re-affirming coping behaviours to manage emotions during the upcoming attempt. Or external better-adapted behaviours. Important to keep any of it simple at age-appropriate level.

Solution Building:
- Gather info if still necessary
- Slot: `Solution Discovery Process` from @solution_discovery_processes.csv
- Solution discovered. Child understands what needs to be done. They might or might not be prepared to do it yet. If preparation is necessary, use the next section.

Preparation, if necessary:
- Slot: `Coping Strategy` from @coping_strategies.csv
- Slot: `Support` from @support_types.csv
- Slot: `Practice` from @practice_types.csv

## Act 4: Climax & Solution – Overcoming Externally & Internally
### 4.1: Final Attempt / Approach (Applying New Understanding / Changed Behaviour)
The child implements the constructed solution with more maturity or better emotional control.
- Slot (Optional): `Fun` from @fun_types.csv
- Slot: `Engagement` from @engagement_types.csv
- Slot: `Coping Strategy` from @coping_strategies.csv

### 4.2: Rising Tension / Suspense
The outcome is uncertain as the attempt unfolds, testing the character's resolve.
- Slot: `Engagement` from @engagement_types.csv

### 4.3: The Turning Point / Final Push (Demonstrating Growth in Action)
The critical action or decision that directly leads to success, often overcoming a final internal hurdle.
- Slot: `Engagement` from @engagement_types.csv
- Slot (Optional): `Fun` from @fun_types.csv
- Slot: `Coping Strategy` from @coping_strategies.csv

### 4.4: Success (External Problem Resolved)
The Core Incident is successfully resolved.

### 4.5: Immediate Reward / Relief (Accomplishment & Positive Emotion)
A direct positive consequence, social, emotional, physical, etc, and strong positive emotional release are experienced.

## Act 5: Resolution & Conclusion – Integrating the Growth
### 5.1: Relaxation / Immediate Aftermath (Processing the Journey)
Tension subsides; characters process the success and the entire experience (both the external challenge and their internal journey).
- Slot (Optional): `Fun` from @fun_types.csv

### 5.2: Reflection & Learning (Internalizing the Lesson & Growth)
The meaning of events, the character's personal growth, and the lesson learned from the experience (often about themselves, their emotions, problem-solving, or their initial misjudgment) are understood or articulated.
- Slot: `Engagement` from @engagement_types.csv. Typically calm, cognitive, etc.
- Slot: `Support` from @support_types.csv

### 5.3: Making it Right / Integration (Acknowledging & Embodying Change)
If the initial Catalyst involved a mistake by the protagonist, this is where apologies, forgiveness (self or others), or clearly demonstrating changed behavior occurs. The internal growth is integrated into their ongoing actions and self-perception.
- Slot: `Engagement` from @engagement_types.csv. Typically calm, empathy-focused, etc.
- Slot: `Support` from @support_types.csv

### 5.4: New Status Quo / Harmonious Scene (Character Transformed)
A sense of new normalcy, where the character is demonstrably more capable, confident, emotionally intelligent, or has a more mature perspective. Relationships may be strengthened due to the shared experience and observed growth.

### 5.5: Concluding Thought / Wrap-up
A final sentence or two providing closure, often reinforcing the positive change in the character, the value of the experience, or the positive outcome of their growth.