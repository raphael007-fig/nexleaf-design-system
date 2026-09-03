# Lab register — Inventory ▸ Lab — change log

## 2026-09-03 — Built from the Kenya NPHL MVP brief
- **What:** Canonical list pattern (ApplicationLayout Sectioned clone): Page + facility scope control, 4 MetricCards with stated denominators, counted tabs (All/Monitored/Cataloged/Decommissioned — decommissioned stays reachable), IndexTable with explicit View, right-drawer filters (Reset All/Apply). States: populated ×3 personas, loading (no zero-chrome), empty-in-scope, error, out-of-scope (surface hidden → module home).
- **Why:** Sep 2 Raf ↔ Ednah meeting — NPHL lab inventory MVP, cold-room-first. Built to the §10 recommended decisions (D1–D7).
- **Source:** Implementation brief (PRD.md in this project) · epic PD-41.
- **States:** driven from screens/states.jsx (shared registry) — deep-linkable via ?state=<id>.
