---
name: powerpoint-client-call
description: Create or revise client-facing PowerPoint presentations for sales, success, strategy, implementation, or executive client calls. Use when the user asks for a PowerPoint, slide deck, client presentation, meeting deck, QBR, proposal deck, discovery call deck, or executive briefing.
disable-model-invocation: true
---

# PowerPoint Client Call

## Goal

Create polished, client-facing PowerPoint decks that help the presenter run a focused call, communicate value, and drive a clear next step.

## Discovery

Before drafting, identify:

1. Client name, audience, and seniority.
2. Call type: discovery, proposal, kickoff, update, QBR, renewal, escalation, or executive briefing.
3. Desired outcome and call-to-action.
4. Meeting length and expected number of slides.
5. Source material: notes, product details, metrics, screenshots, brand guidelines, or prior decks.
6. Required tone: consultative, executive, technical, persuasive, or neutral.

If key details are missing, make reasonable assumptions and list them in a short "Assumptions" section unless the user asked for questions first.

## Deck Structure

Default to this structure unless the user provides another format:

1. Title slide: client, meeting topic, date, presenter.
2. Agenda: three to five discussion topics.
3. Client context: goals, current state, challenges, or recent progress.
4. Key insight: the main message the client should remember.
5. Recommendation or solution: what is being proposed and why it fits.
6. Value and impact: business outcomes, metrics, risks reduced, or opportunities unlocked.
7. Plan or next steps: owners, sequence, decision points, and timing.
8. Discussion prompts: questions that keep the call interactive.
9. Appendix: detailed evidence, technical notes, or backup slides.

## Slide Writing Rules

- Use one main idea per slide.
- Lead with an action-oriented slide title, not a label.
- Keep bullets short: usually five bullets or fewer per slide.
- Prefer client outcomes over internal process.
- Avoid unsupported claims, invented metrics, and confidential details not provided by the user.
- Use plain executive language; define technical terms when the audience may be mixed.
- Make the final slide state the next decision or action clearly.

## Visual Guidance

- Use a 16:9 layout unless the user specifies otherwise.
- Keep visual hierarchy simple: title, key message, supporting evidence.
- Use tables for comparisons, timelines for plans, and callout boxes for decisions.
- Use screenshots only when they directly support the meeting objective.
- Preserve provided brand colors, logos, fonts, and templates.
- If no brand guidance exists, use a clean, restrained business style.

## PowerPoint Creation Workflow

1. Draft the narrative arc before creating slides.
2. Create a slide-by-slide outline with purpose, title, and content.
3. Build or revise the `.pptx` using the available project tooling.
4. Review for client readiness:
   - The story supports the desired call outcome.
   - The first three slides establish relevance quickly.
   - Each slide has a clear takeaway.
   - Numbers, names, dates, and claims are sourced from user-provided material.
   - The closing slide has a concrete next step.
5. If creating a file, save it with a descriptive lowercase filename such as `client-call-deck.pptx`.

## Output Format

When returning a deck plan, use:

```markdown
# [Deck Title]

## Assumptions
- [Only include when needed]

## Slide Outline
1. **[Slide title]**
   - Purpose: [Why this slide exists]
   - Content: [Key bullets or visual]
   - Speaker note: [Optional guidance]

## Recommended Next Step
- [Call-to-action or decision]
```

When returning a completed `.pptx`, include a concise summary of the narrative, the file path, and any assumptions made.
