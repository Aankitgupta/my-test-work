---
name: create-dashboard
description: Refine dashboard prototypes in Figma for analytics, operations, KPI, admin, or executive reporting workflows. Use when the user asks to create, redesign, polish, or refine a dashboard, especially from a screenshot, wireframe, or Figma prototype.
disable-model-invocation: true
---

# Create Dashboard

## Purpose

Use this skill to refine dashboard prototypes in Figma with a focus on clarity, hierarchy, scanability, and implementation-ready structure.

## First response

If the user asks to refine a dashboard in Figma:

1. Confirm whether a Figma file/frame link or Figma MCP/tool access is available.
2. If only a screenshot is available, produce a refinement plan or design spec; do not claim to edit Figma directly.
3. If Figma access is available, inspect the relevant frame before editing.
4. Preserve the user's business domain and terminology.

## Dashboard refinement workflow

1. **Audit the current prototype**
   - Identify the primary user goal.
   - List dashboard sections, filters, KPI cards, charts, tables, and navigation.
   - Note visual issues: weak hierarchy, crowded spacing, inconsistent alignment, low contrast, duplicate labels, unclear grouping, or noisy decoration.

2. **Clarify information architecture**
   - Put global controls at the top.
   - Group KPI cards immediately after filters.
   - Place summary cards before detailed tables and trend charts.
   - Separate unrelated workflows into clear panels or lanes.
   - Use consistent section titles and metric names.

3. **Improve visual hierarchy**
   - Use one primary accent color and a restrained supporting palette.
   - Make the most important metric visually dominant.
   - Reduce heavy borders; prefer spacing, subtle dividers, and panel backgrounds.
   - Use consistent typography for labels, values, section headers, and captions.
   - Align all cards and tables to a shared grid.

4. **Refine Figma structure**
   - Use Auto Layout for filter bars, KPI rows, card groups, tables, and dashboard sections.
   - Convert repeated elements into components: filter chip, KPI card, scorecard row, table header, table row, chart panel, sidebar label.
   - Use variants for active, inactive, warning, success, and empty states.
   - Name layers semantically, such as `KPI Card / Monthly Goal` or `Section / Hygiene Tracker`.
   - Use color and text styles or variables when available.

5. **Check usability**
   - Filters should show current selections clearly.
   - KPI values should include units, currency, or percent where applicable.
   - Gap metrics should make positive, negative, and neutral states obvious.
   - Tables should have readable row height, aligned numeric columns, and clear empty states.
   - Charts should include axis labels, data labels only where useful, and enough contrast for the trend line.

6. **Prepare handoff**
   - Summarize what changed and why.
   - Call out any assumptions.
   - Provide component names, style tokens, and unresolved questions.
   - If edits were made in Figma, include the edited file/frame reference.

## Specific guidance for practice-performance dashboards

For dental, medical, or practice operations dashboards like a "Practice Success Tracker" and "Hygiene Tracker":

- Keep date, location, provider, and period filters in a single control bar.
- Use KPI cards for monthly goal, current production, production gap, weekly goal, and weekly gap.
- Present production momentum as a compact scorecard with goal, actual, scheduled, and gap rows.
- Present hygiene performance with weekly goal, completed visits, remaining visits, and progress-to-goal.
- Put operational detail tables below summary KPIs.
- Use a trend chart for trailing-period performance, with the current period visually highlighted.
- Use green for on-track/progress, amber for attention, red for risk, and blue for neutral navigation or selected filters.

## Output format

When reporting back, use:

```markdown
## Dashboard refinement summary
- [Concise list of design changes]

## Key improvements
- Hierarchy: [What is easier to see first]
- Layout: [How sections were reorganized]
- Components: [Reusable Figma components/styles created or recommended]
- Usability: [How filtering, KPIs, tables, or charts became clearer]

## Assumptions / next inputs
- [Any missing Figma link, data definitions, or stakeholder decisions]
```

## Quality checklist

- [ ] Primary dashboard goal is obvious within 5 seconds.
- [ ] Global filters are grouped and visually distinct from content.
- [ ] KPI cards use consistent size, labels, values, and states.
- [ ] Related metrics are grouped into clear sections.
- [ ] Tables and charts support the summary instead of competing with it.
- [ ] Spacing, alignment, typography, and colors are consistent.
- [ ] Repeated UI is componentized in Figma.
- [ ] The final response distinguishes actual Figma edits from recommendations.
