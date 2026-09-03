# Lab register — Inventory ▸ Lab — change log

## 2026-09-03 — Built from the Kenya NPHL MVP brief
- **What:** Canonical list pattern (ApplicationLayout Sectioned clone): Page + facility scope control, 4 MetricCards with stated denominators, counted tabs (All/Monitored/Cataloged/Decommissioned — decommissioned stays reachable), IndexTable with explicit View, right-drawer filters (Reset All/Apply). States: populated ×3 personas, loading (no zero-chrome), empty-in-scope, error, out-of-scope (surface hidden → module home).
- **Why:** Sep 2 Raf ↔ Ednah meeting — NPHL lab inventory MVP, cold-room-first. Built to the §10 recommended decisions (D1–D7).
- **Source:** Implementation brief (PRD.md in this project) · epic PD-41.
- **States:** driven from screens/states.jsx (shared registry) — deep-linkable via ?state=<id>.

## 2026-09-03 — Browser-verified fixes
- **What:** Defects found reading every rendered state on localhost and fixed same turn: register loading/error no longer show live tab counts, pagination or KPI numbers (— until data resolves); import success card used the wrong SubmissionSuccessCard section shape and rendered blank — fixed; type inference checks centrifuge/specific types before the fridge catch-all and no longer guesses mixer/autoclave/distiller (they flag "Type not recognised"); detail above-8°C stat now agrees with the drawn series; home cold-room temp matches the detail average (5.7 °C).
- **Why:** loading ≠ empty ≠ error must be visually true, and sample data must agree across the flow.
- **Source:** in-browser verification pass, 2026-09-03.

## 2026-09-03 — Return-from-Add toast (Raf: "fix all one by one")
- **What:** New `initialToast` + `onSetUpMonitoring` props: arriving from a save shows the §5.2 success toast (with the monitoring action when the type supports it) over the highlighted row. Breadcrumb-label reconciliation documented in LabShell + PRD.md (ratified moduleNavs registry outranks the brief's "Home › Inventory › Lab" shorthand).
