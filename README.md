# Modern Agent Performance Dashboard

This repository contains a Vite + React prototype for a simplified agent
performance dashboard using Highcharts.

## What changed in the redesign

- Replaced dense scorecard-first layout with an executive insight flow.
- Highlighted the four core KPIs as modern cards with goal health, team average,
  and next action.
- Added Highcharts-based trend, goal attainment, and workload focus visuals.
- Preserved scorecard and weekly detail data in compact sections for drilldown.
- Kept dashboard data in `src/data/dashboardData.ts` so it can be replaced by an
  API response later.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
