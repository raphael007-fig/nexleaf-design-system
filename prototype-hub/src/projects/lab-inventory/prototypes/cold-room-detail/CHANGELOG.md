# Cold room record — monitoring detail — change log

## 2026-09-03 — Built from the Kenya NPHL MVP brief
- **What:** Tertiary record view: TempChart pattern cloned from Pages/Temperature Alert Detail (2–8 °C band from the type config), Tabs per-sensor selector across the record's 4 sensors (ambient un-banded), sensors-on-this-record card, right rail (facility/record/device/contacts with '2 of 5' counter). States: default, loading, partial (Sensor B silent), no-readings-yet, chart-error.
- **Why:** Sep 2 Raf ↔ Ednah meeting — NPHL lab inventory MVP, cold-room-first. Built to the §10 recommended decisions (D1–D7).
- **Source:** Implementation brief (PRD.md in this project) · epic PD-41.
- **States:** driven from screens/states.jsx (shared registry) — deep-linkable via ?state=<id>.

## 2026-09-03 — Browser-verified fixes
- **What:** Defects found reading every rendered state on localhost and fixed same turn: register loading/error no longer show live tab counts, pagination or KPI numbers (— until data resolves); import success card used the wrong SubmissionSuccessCard section shape and rendered blank — fixed; type inference checks centrifuge/specific types before the fridge catch-all and no longer guesses mixer/autoclave/distiller (they flag "Type not recognised"); detail above-8°C stat now agrees with the drawn series; home cold-room temp matches the detail average (5.7 °C).
- **Why:** loading ≠ empty ≠ error must be visually true, and sample data must agree across the flow.
- **Source:** in-browser verification pass, 2026-09-03.
