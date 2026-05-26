---
name: dashboard-designing
description: Design clear, useful dashboards for analytics, operations, product, and business intelligence use cases. Use when creating dashboard layouts, choosing charts and KPIs, reviewing dashboard UX, or when the user mentions dashboards, metrics, analytics views, reporting pages, or BI design.
disable-model-invocation: true
---

# Dashboard Designing

## Core Principles

- Start with the audience, decision, and cadence: who uses the dashboard, what they need to decide, and how often they return.
- Prefer a small set of high-signal KPIs over dense metric grids.
- Make hierarchy obvious: summary first, diagnosis second, detail last.
- Use plain metric names, visible units, and explicit time windows.
- Keep comparisons close to the metric: previous period, target, benchmark, or segment average.
- Design empty, loading, and error states as part of the dashboard, not as afterthoughts.

## Discovery Questions

Ask only for missing information that materially changes the design:

1. Who is the primary audience?
2. What decision or workflow should the dashboard support?
3. Which KPIs are required, and which are optional?
4. What time ranges, filters, and segments must be supported?
5. Are there existing brand, design system, or accessibility constraints?

## Dashboard Design Workflow

1. **Define purpose**
   - State the dashboard goal in one sentence.
   - Identify the primary user action after viewing it.

2. **Prioritize metrics**
   - Group metrics into: primary KPIs, diagnostic metrics, and supporting details.
   - Remove metrics that do not support the dashboard goal.

3. **Choose layout**
   - Top row: headline KPIs and overall status.
   - Middle: trend and comparison charts that explain movement.
   - Lower sections: breakdowns, tables, annotations, and drill-down details.

4. **Select visualizations**
   - KPI card: current value, delta, sparkline, target progress.
   - Line chart: trends over time.
   - Bar chart: category comparison.
   - Stacked bar or area chart: part-to-whole over time, only when composition matters.
   - Table: exact values, ranked items, auditability, or operational follow-up.
   - Heatmap: dense matrix comparisons with meaningful ordering.

5. **Design interactions**
   - Use global filters for time range and core segments.
   - Use local filters only when they affect a single section.
   - Support drill-downs from summary to detail.
   - Preserve context when navigating between dashboard states.

6. **Validate usability**
   - Check that the top-level story is understandable in under 30 seconds.
   - Verify that labels, units, legends, and time windows are unambiguous.
   - Confirm that color is not the only way to understand status.

## Layout Patterns

### Executive Overview

Use for leadership, business reviews, and periodic reporting.

```markdown
# [Dashboard Name]

[Time range selector] [Primary segment filters]

## Summary
[KPI card] [KPI card] [KPI card] [KPI card]

## Performance Over Time
[Primary trend chart]

## Key Drivers
[Breakdown chart] [Ranked table]

## Notes
[Definitions, data freshness, caveats]
```

### Operational Dashboard

Use for teams monitoring work queues, incidents, supply, support, or reliability.

```markdown
# [Dashboard Name]

[Status filter] [Owner/team filter] [Time range selector]

## Current State
[Alert/status card] [SLA card] [Backlog card] [Throughput card]

## Workload and Exceptions
[Queue trend] [Exception breakdown]

## Action List
[Prioritized table with owner, status, age, and next action]
```

### Product Analytics Dashboard

Use for funnels, retention, engagement, adoption, and user behavior.

```markdown
# [Dashboard Name]

[Time range selector] [Platform filter] [Cohort filter]

## Health Metrics
[Activation] [Engagement] [Retention] [Conversion]

## Journey
[Funnel chart] [Drop-off table]

## Segments
[Segment comparison] [Cohort trend]
```

## Visual Design Guidelines

- Use a consistent grid, spacing scale, and card structure.
- Use neutral colors for most data and reserve saturated colors for status, alerts, and selected states.
- Avoid pie charts unless there are very few categories and exact comparison is not important.
- Sort bars and tables by importance, value, or workflow order.
- Show data freshness near the dashboard title or source note.
- Keep legends close to charts; directly label series when practical.
- Use accessible contrast and do not rely on red/green alone.

## Review Checklist

- [ ] The dashboard has one clear primary purpose.
- [ ] The most important KPI is visible without scrolling.
- [ ] Metrics include units, time windows, and definitions where needed.
- [ ] Comparisons are meaningful and not misleading.
- [ ] Filters are necessary, understandable, and scoped correctly.
- [ ] Chart choices match the analytical task.
- [ ] Empty, loading, error, and no-results states are specified.
- [ ] Accessibility constraints are considered.
- [ ] The design explains data freshness and caveats.

## Response Format

When proposing a dashboard design, use:

```markdown
## Dashboard Purpose
[Audience, decision, and cadence]

## Recommended Layout
1. [Section name]: [purpose and components]
2. [Section name]: [purpose and components]

## Metrics
- [Metric]: [definition, display format, comparison]

## Visualizations
- [Chart/card]: [why it fits]

## Interactions and States
- Filters:
- Drill-downs:
- Empty/loading/error states:

## Risks and Open Questions
- [Data, UX, or interpretation risk]
```
