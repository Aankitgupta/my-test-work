# Queue Language for KPI Reporting

## Assumptions
- Verizon call data contains row-level language through Med_Seg.
- Other KPI sources do not contain row-level call language.
- The client preference is to default Queue Language to the language with the greatest handled call volume.

## Slide Outline
1. **Queue Language for KPI Reporting**
   - Purpose: Introduce the client discussion and decision needed.
   - Content: Client discussion deck; decision needed on non-Verizon mapping.
2. **The client ask is clear: add Queue Language across KPIs**
   - Purpose: Summarize the mail-chain request.
   - Content: Add Queue Language dimension, Verizon has Med_Seg, other sources need mapping.
3. **Current data reality: language exists in one source only**
   - Purpose: Explain why derived logic is required.
   - Content: Verizon row-level language; other sources no row-level language; reporting filter requirement.
4. **Recommended mapping: default to the highest handled call language**
   - Purpose: Present the proposed rule.
   - Content: Count handled calls by language, assign default Queue Language, tag non-Verizon KPIs.
5. **Example: one agent mapped by highest call volume**
   - Purpose: Make the rule concrete.
   - Content: 20 French calls and 10 English calls means Queue Language = French.
6. **How the Queue Language filter should behave**
   - Purpose: Clarify source-specific behavior.
   - Content: Verizon uses actual Med_Seg row language; other sources use derived agent mapping.
7. **Implementation decisions to confirm**
   - Purpose: Surface remaining decisions before build.
   - Content: Reporting period, ties, new agents, audit view, label wording.
8. **Recommended next step**
   - Purpose: Close with a decision and implementation path.
   - Content: Confirm rule, build mapping, validate sample.

## Recommended Next Step
- Ask the client to confirm the highest handled call volume rule and the handling for ties/new agents.
