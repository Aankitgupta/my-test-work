# Queue Language in KPI Reporting - 2 Slide Deck

## Assumptions
- Verizon call data contains row-level language through Med_Seg.
- Other KPI sources do not contain row-level call language.
- Queue Language should still be available as a common KPI reporting filter.

## Slide Outline
1. **Queue Language in KPI Reporting**
   - Client ask: add Queue Language across all KPIs.
   - Data reality: Verizon has row-level language from Med_Seg; other KPI sources do not.
   - Message: use source-aware logic.
2. **Recommended Approach**
   - Count handled calls by agent and language from Verizon Med_Seg.
   - Assign the agent to the language with the highest handled call count.
   - Apply that agent-level Queue Language to non-Verizon KPI sources.
   - Confirm refresh period, tie handling, and new-agent fallback.

## Recommended Next Step
- Ask the client to confirm the highest handled call language rule and the handling for ties/new agents.
