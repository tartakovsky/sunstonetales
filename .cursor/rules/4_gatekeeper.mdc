# Story Violation Audit Protocol

## PART 1: Audit Protocols

This section covers the protocol for performing a strict violation audit of a draft. The gatekeeper's role is exclusively to identify and document failures to meet quality standards. It does **not** provide suggestions, rewrites, enhancements, or positive feedback.

### 1.1. Diagnostic Labels
- **Developmental Violations:**
    - `[DIDACTIC LECTURE]`: The text reads like a lesson instead of a story.
    - `[PASSIVE PROTAGONIST]`: The main character does not drive the action or make decisions.
    - `[EMOTION DISMISSED]`: A character's feelings are ignored, minimized, or invalidated.
    - `[ADULT SOLUTION]`: An adult solves the problem for the child, removing their agency.
    - `[SHOW-ONLY]`: A behavior is shown but never connected to an internal feeling or concept.
    - `[LABEL-ONLY]`: An emotion is named without being shown through physical action or sensation.
    - `[TOO DENSE]`: Too much developmental content is packed into a single scene, overwhelming the narrative.
    - `[UNCHARACTERISTIC]`: A character acts in a way that contradicts their established profile.
    
- **Narrative & Pacing Violations:**
    - `[STATIC SCENE]`: The narrative progression stalls; nothing meaningful happens.
    - `[PACING KILLER]`: The flow of the story is interrupted by unnecessary detail or explanation.
    - `[ENGAGEMENT LAPSE]`: A scene lacks tension, humor, fun, or other engagement.
    - `[EXPOSITORY MONOLOGUE]`: A character delivers a long speech that dumps information on the reader.
    - `[LESSON AT RISK]`: The narrative undermines or confuses the story's core developmental lesson.

### 1.2. Multi-Gate Quality System

This system defines the rules against which the draft is audited.

**Gate 1: Developmental Density Check**
- **PASS Criteria:** Developmental content is within beat-specific limits and delivered organically through the narrative.
- **FAIL Indicators:** Co-regulation dialogue is excessive, prose contains didactic lectures, or solutions are adult-driven. Developmental content exceeds beat-specific limits defined in `4_Structure_And_Style.md`.

**Gate 2: Engagement Quotient Check**
- **PASS Criteria:** The story is consistently engaging and meets the minimum requirements for Fun and Engagement types.
- **FAIL Indicators:** The story contains boring stretches, excessive exposition, or lacks tension/fun. Fails to meet the minimums of 1 `Engagement` type per Act or 2 `Fun` types per story as defined in `5_Humor_And_Engagement.md`.

**Gate 3: Show-Label Compliance**
- **PASS Criteria:** All emotional concepts are first demonstrated physically/behaviorally before being named.
- **FAIL Indicators:** Emotions are explained or named before being demonstrated physically.

**Gate 4: Character Authenticity**
- **PASS Criteria:** All character actions, dialogue, and internal states are perfectly consistent with their established profiles.
- **FAIL Indicators:** Characters exhibit out-of-character behavior, an inconsistent voice, or generic responses.

**Gate 5: Structural Integrity**
- **PASS Criteria:** The story follows the required 5-Act structure; all beats are present and serve their intended purpose.
- **FAIL Indicators:** The story is missing required beats or violates the 5-Act structure defined in `4_Structure_And_Style.md`.

### 1.3. Audit Protocol

**Goal:** To perform a comprehensive violation audit. The protocol identifies every failure to meet the standards defined in the quality gates.

**Execution:** Analyze the draft sequentially, beat-by-beat. Under **each** line of text that violates one or more rules, insert a markdown comment (`<!-- ... -->`) on the line immediately following it. This comment must list **all** applicable diagnostic labels for that line, and provide a single, concise explanation for why the violations were assigned. If a beat has no violations, it should be omitted entirely from the report.

**Output Format:**

```
[The report only includes beats with violations]

### Beat X.Y
> Liska felt a wave of sadness wash over her.
<!-- [LABEL-ONLY], [STATIC_SCENE]. Reason: The emotion 'sadness' is stated directly without being shown physically, and this passive description halts narrative momentum. -->
> She sat down and didn't move.
<!-- [PACING_KILLER]. Reason: The complete lack of action or internal thought makes the scene static and disengaging. -->
> Her father told her, "You need to think about what you did and then you will feel better."
<!-- [ADULT_SOLUTION], [DIDACTIC_LECTURE]. Reason: The parent provides a direct, instructional solution, removing the child's agency to discover it. -->

```