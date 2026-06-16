---
name: dashboard-prototyping-design
description: Prototype and design dashboards with clear goals, information architecture, responsive layouts, visual hierarchy, data states, and implementation-ready specs. Use when the user asks for dashboard prototyping, dashboard UI/UX design, analytics screens, admin dashboards, KPI dashboards, reporting interfaces, or design handoff guidance.
disable-model-invocation: true
---

# Dashboard Prototyping and Design

## When to use

Use this skill for dashboard concepting, wireframes, UI specs, implementation guidance, or reviews of analytics, reporting, admin, and KPI dashboards.

## Workflow

1. **Clarify the dashboard job**
   - Identify the audience, primary decisions, reporting cadence, and top 3 user tasks.
   - Separate must-have metrics from exploratory or secondary details.
   - Name unresolved assumptions before designing around them.

2. **Map the data story**
   - Define each metric, comparison period, dimension, and filter.
   - Note data freshness, permissions, empty states, partial data, and error states.
   - Prefer domain-specific labels over generic placeholders.

3. **Plan the information architecture**
   - Put the most decision-critical summary first.
   - Group related metrics into sections with clear hierarchy.
   - Use drill-downs for dense detail instead of crowding the initial view.

4. **Choose dashboard patterns**
   - Use KPI cards for headline values and deltas.
   - Use tables for precise comparison, ranking, and actions.
   - Use line charts for trends, bar charts for categories, and stacked charts only when composition matters.
   - Avoid decorative charts that do not answer a user question.

5. **Design interaction states**
   - Specify filters, date ranges, search, sorting, exports, drill-downs, tooltips, and saved views.
   - Include loading, empty, error, no-permission, and small-screen behavior.
   - Keep defaults useful without requiring setup.

6. **Align with the codebase**
   - Inspect existing design tokens, layout primitives, charting libraries, and component patterns before proposing new UI.
   - Reuse established spacing, typography, color, and accessibility conventions.
   - If implementing, keep the first prototype thin and composable.

7. **Prepare handoff**
   - Provide layout notes, component inventory, metric definitions, interaction details, and open questions.
   - Call out tradeoffs between fidelity, implementation cost, and data availability.

## Output template

Use this structure for dashboard design responses:

```markdown
## Dashboard Goal
[Audience, decision, and primary workflow.]

## Layout
- Header:
- Summary:
- Main content:
- Detail area:
- Secondary actions:

## Metrics and Data
| Metric | Definition | Source/assumption | Visualization |
| --- | --- | --- | --- |

## Interactions and States
- Filters:
- Drill-downs:
- Loading:
- Empty:
- Error:
- Responsive:

## Implementation Notes
- Components:
- Design tokens:
- Accessibility:
- Risks/open questions:
```

## Quality checklist

- [ ] The first screen answers the user's main question.
- [ ] Every chart has a clear purpose and readable labels.
- [ ] Comparisons use consistent time periods and units.
- [ ] Filters and defaults match common user workflows.
- [ ] Loading, empty, error, permission, and responsive states are covered.
- [ ] The proposal reuses existing product patterns unless there is a clear reason not to.
