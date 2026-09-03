# Cold room record — monitoring detail — change log

## 2026-09-03 — Built from the Kenya NPHL MVP brief
- **What:** Tertiary record view: TempChart pattern cloned from Pages/Temperature Alert Detail (2–8 °C band from the type config), Tabs per-sensor selector across the record's 4 sensors (ambient un-banded), sensors-on-this-record card, right rail (facility/record/device/contacts with '2 of 5' counter). States: default, loading, partial (Sensor B silent), no-readings-yet, chart-error.
- **Why:** Sep 2 Raf ↔ Ednah meeting — NPHL lab inventory MVP, cold-room-first. Built to the §10 recommended decisions (D1–D7).
- **Source:** Implementation brief (PRD.md in this project) · epic PD-41.
- **States:** driven from screens/states.jsx (shared registry) — deep-linkable via ?state=<id>.
