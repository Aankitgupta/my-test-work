# Queue Language in KPI Reporting - 2 Slide Deck

## Assumptions
- Verizon call data contains row-level language through Med_Seg.
- Other KPI sources do not contain row-level call language.
- Queue Language should still be available as a common KPI reporting filter.
- Agent language should be counted over the same KPI reporting period selected in the dashboard; if no period is selected, use the latest completed month.

## Slide Outline
1. **Queue Language in KPI Reporting**
   - Client ask: add Queue Language across all KPIs.
   - Data reality: Verizon has row-level language from Med_Seg; other KPI sources do not.
   - Message: use source-aware logic.
2. **Recommended Approach**
   - Count handled calls by agent and language from Verizon Med_Seg for the same KPI reporting period.
   - Assign the agent to the language with the highest handled call count in that period.
   - Apply that agent-level Queue Language to non-Verizon KPI sources.
   - Default to the latest completed month when no reporting period is selected.
   - Confirm tie handling and new-agent fallback.

## Recommended Next Step
- Ask the client to confirm the highest handled call language rule, the reporting-period alignment, and the handling for ties/new agents.
