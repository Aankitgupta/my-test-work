# AGENTS.md

## Cursor Cloud specific instructions

This repository contains multiple independent dashboard prototypes on separate branches. The most substantial is the **Modern Agent Performance Dashboard** on branch `cursor/modern-dashboard-highcharts-b2cb` — a React 19 + TypeScript + Vite 8 + Highcharts app.

### Branch overview

| Branch | Content | Runnable? |
|--------|---------|-----------|
| `main` | Empty (README only) | No |
| `cursor/modern-dashboard-highcharts-b2cb` | React + Highcharts dashboard | Yes — `npm install && npm run dev` |
| `cursor/dashboard-redesign-9962` | Static HTML/CSS dashboard | Open `index.html` directly |
| `cursor/sales-dashboard-73d1` | Vanilla JS sales dashboard | Open `index.html` directly |
| `cursor/create-dashboard-skill-d62b` | Cursor skill definition (Markdown) | N/A |
| `cursor/dashboard-designing-skill-738c` | Cursor skill definition (Markdown) | N/A |

### React dashboard (primary branch)

- **Dev server**: `npm run dev` starts Vite on `http://localhost:5173`
- **Type checking**: `npm run typecheck` (runs `tsc -b --noEmit`)
- **Build**: `npm run build` (runs `tsc -b && vite build`, outputs to `dist/`)
- **No tests**: There is no test framework configured.
- **No linter**: There is no ESLint or other linter configured.
- **No database or external services needed** — all data is hardcoded in `src/data/dashboardData.ts`.
- **No environment variables** are required.
