---
name: dashboard-prototyping
description: Design and build interactive, code-based dashboard prototypes for analytics, operations, product, KPI, and executive reporting. Use when the user asks to prototype, mock up, scaffold, or build a working dashboard, turn a sketch/screenshot/requirements into a clickable dashboard, or choose layout, KPIs, charts, and styling for a dashboard prototype.
disable-model-invocation: true
---

# Dashboard Prototyping

Build a working, good-looking dashboard prototype fast, then refine it. This skill pairs lightweight design decisions with concrete, runnable code so the user gets something interactive to react to instead of a spec.

## When to use this skill

- The user wants a **functional** dashboard prototype (HTML/CSS/JS or a framework), not just a written design or a Figma mockup.
- The user provides a screenshot, sketch, requirements list, or sample data and wants it turned into a clickable dashboard.
- The user wants to iterate quickly on layout, charts, KPIs, and theming.

For pure design strategy or Figma refinement, prefer the `dashboard-designing` or `create-dashboard` skills instead.

## Workflow

Copy this checklist and track progress:

```
- [ ] 1. Frame the dashboard (audience, decision, key metrics)
- [ ] 2. Pick the stack
- [ ] 3. Sketch the layout (sections + grid)
- [ ] 4. Define data (real, sample, or mock)
- [ ] 5. Build the prototype (KPIs -> charts -> tables -> filters)
- [ ] 6. Apply the visual system (tokens, spacing, color)
- [ ] 7. Run it, verify, and iterate
```

### 1. Frame the dashboard

State the goal in one sentence: *who* uses it, *what decision* it supports, *how often* they look. Then split metrics into **primary KPIs** (top), **diagnostics** (middle trends/breakdowns), and **detail** (tables, bottom). Do not ask more than 1-2 questions; make reasonable assumptions, state them, and build.

### 2. Pick the stack

Default to the lowest-friction option that meets the need:

| Need | Recommended stack |
| --- | --- |
| Quick single-file mockup, no build | Single `index.html` + vanilla JS + a CDN chart lib |
| Interactive app, components, state | Vite + React (+ TypeScript) |
| Already in a repo | Match the existing framework and conventions |

Chart library default: **Chart.js** (CDN, simple) for quick mocks; **Highcharts** or **Recharts** when richer interactivity is needed. Reuse whatever the repo already depends on.

### 3. Sketch the layout

Use a responsive CSS grid. Standard structure:

```
+------------------------------------------------------+
| Title / data freshness        [filters]  [time range]|
+------------------------------------------------------+
| KPI card | KPI card | KPI card | KPI card            |  <- summary row
+------------------------------------------------------+
| Primary trend chart            | Secondary breakdown |  <- diagnosis
+------------------------------------------------------+
| Detail / ranked table (full width)                   |  <- detail
+------------------------------------------------------+
```

Rules: summary first, diagnosis second, detail last; most important KPI visible without scrolling; align everything to one grid and spacing scale.

### 4. Define data

- Prefer real data the user provides.
- Otherwise generate **realistic** mock data (plausible values, trends, and labels) in a separate `data` module so it is easy to swap for an API later.
- Never hardcode values directly inside chart configs; drive charts and cards from the data module.

### 5. Build the prototype

Build in this order so something renders early: KPI cards → primary chart → table → filters/interactions. Wire filters and the time-range selector to actually update the data and re-render. Include empty, loading, and error states even in a prototype (a simple placeholder is fine).

### 6. Apply the visual system

Define design tokens up front (CSS custom properties or a theme object):

- Spacing scale (e.g. 4 / 8 / 12 / 16 / 24 / 32).
- One neutral palette for most surfaces/text; reserve saturated colors for status (green on-track, amber attention, red risk, blue neutral/selected).
- Consistent card style (radius, subtle border or shadow, padding), typography scale for labels/values/headers.
- Respect any existing brand or design system in the repo.

### 7. Run it, verify, and iterate

Always run the prototype and confirm it renders.

- Single-file: open `index.html` (or serve with `python3 -m http.server`).
- Vite: `npm install` then `npm run dev`.

Verify charts render with data, filters update the view, and the layout is responsive. Capture a screenshot/recording for the user, then iterate on their feedback.

## Quick-start templates

### Single-file prototype (vanilla + Chart.js)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Dashboard Prototype</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    :root {
      --bg: #f6f7fb; --surface: #fff; --text: #1f2430; --muted: #6b7280;
      --border: #e5e7eb; --accent: #2563eb;
      --ok: #16a34a; --warn: #d97706; --risk: #dc2626;
      --s2: 8px; --s3: 12px; --s4: 16px; --s6: 24px;
      --radius: 12px;
    }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, sans-serif; background: var(--bg); color: var(--text); }
    .wrap { max-width: 1200px; margin: 0 auto; padding: var(--s6); }
    .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--s6); }
    .grid { display: grid; gap: var(--s4); grid-template-columns: repeat(4, 1fr); }
    .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: var(--s4); }
    .kpi .label { color: var(--muted); font-size: 13px; }
    .kpi .value { font-size: 28px; font-weight: 700; margin-top: var(--s2); }
    .kpi .delta.up { color: var(--ok); } .kpi .delta.down { color: var(--risk); }
    .span-2 { grid-column: span 2; } .span-4 { grid-column: span 4; }
    canvas { width: 100% !important; }
    @media (max-width: 800px) { .grid { grid-template-columns: 1fr 1fr; } .span-2 { grid-column: span 2; } }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="topbar">
      <div><h1 style="margin:0;font-size:20px">Sales Overview</h1>
        <small style="color:var(--muted)">Updated just now</small></div>
      <select id="range"><option>Last 7 days</option><option>Last 30 days</option></select>
    </div>
    <div class="grid" id="kpis"></div>
    <div class="grid" style="margin-top:16px">
      <div class="card span-2"><canvas id="trend"></canvas></div>
      <div class="card span-2"><canvas id="breakdown"></canvas></div>
    </div>
  </div>
  <script>
    // Mock data module: swap for a real API later.
    const data = {
      kpis: [
        { label: 'Revenue', value: '$128.4k', delta: '+8.2%', dir: 'up' },
        { label: 'Orders', value: '3,421', delta: '+3.1%', dir: 'up' },
        { label: 'Avg Order', value: '$37.5', delta: '-1.4%', dir: 'down' },
        { label: 'Conversion', value: '2.8%', delta: '+0.3pp', dir: 'up' },
      ],
      trend: { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], values: [18,22,19,27,31,24,29] },
      breakdown: { labels: ['Web','Mobile','Partner','Retail'], values: [52,28,12,8] },
    };
    document.getElementById('kpis').innerHTML = data.kpis.map(k => `
      <div class="card kpi"><div class="label">${k.label}</div>
        <div class="value">${k.value}</div>
        <div class="delta ${k.dir}">${k.delta}</div></div>`).join('');
    new Chart(document.getElementById('trend'), { type: 'line',
      data: { labels: data.trend.labels, datasets: [{ label: 'Revenue ($k)', data: data.trend.values,
        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--accent'), tension: .35, fill: false }] },
      options: { plugins: { legend: { display: false } } } });
    new Chart(document.getElementById('breakdown'), { type: 'bar',
      data: { labels: data.breakdown.labels, datasets: [{ label: 'Share %', data: data.breakdown.values,
        backgroundColor: '#93c5fd' }] },
      options: { plugins: { legend: { display: false } } } });
  </script>
</body>
</html>
```

### React + Vite scaffold

```bash
npm create vite@latest dashboard -- --template react-ts
cd dashboard && npm install recharts
npm run dev
```

Structure: `src/data/` (mock/API data), `src/components/MetricCard.tsx`, `src/components/charts/`, `src/theme.ts` (tokens), `src/App.tsx` (layout grid). Keep data out of components and pass it via props.

## Chart selection cheat sheet

- **KPI card**: single current value + delta + optional sparkline / target progress.
- **Line/area**: trends over time.
- **Bar (sorted)**: category comparison and ranking.
- **Stacked bar/area**: part-to-whole over time, only when composition matters.
- **Table**: exact values, rankings, auditability, operational follow-up.
- **Heatmap**: dense matrix comparisons with meaningful ordering.
- Avoid pie/donut unless there are very few categories and exact comparison is not the point.

## Quality checklist

- [ ] Primary purpose is obvious within 5 seconds; top KPI visible without scrolling.
- [ ] Layout follows summary → diagnosis → detail and aligns to one grid/spacing scale.
- [ ] Charts and cards are driven by a data module, not hardcoded inline.
- [ ] Filters and time-range selector actually update the view.
- [ ] KPIs show units, time windows, and meaningful comparisons (delta/target).
- [ ] Color is consistent and not the only signal of status; contrast is accessible.
- [ ] Empty, loading, and error states exist.
- [ ] The prototype runs and renders; a screenshot or recording is provided.

## Response format

When delivering a prototype, report back with:

```markdown
## What was built
- [Stack and files created]

## Layout & metrics
- [Sections, KPIs, charts, and why]

## How to run
- [Exact command(s)]

## Assumptions & next steps
- [Mock data used, open questions, suggested iterations]
```
