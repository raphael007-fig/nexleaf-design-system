# Cold room monitoring — install flow — change log

## 2026-09-03 — Built from the Kenya NPHL MVP brief
- **What:** Phase 2 via the agreed Aug 24/25 order (wizard chrome cloned from AddEquipmentFlow layer 1): Facility & Contacts (hard 5-cap with 'N of 5' counter, D4) → Equipment Details (Type read-only Walk-in Cold Room, no compartment) → Base Station & Sensors (dropdowns only; CT5 A–D / CTX pre-fed; N sensors on ONE record, D2) → Review & Submit. No thresholds anywhere (D5). States: every step, contacts-at-cap, sensors-assigned, submitting, submit-failed, offline, success; cancel = destructive-confirm modal.
- **Why:** Sep 2 Raf ↔ Ednah meeting — NPHL lab inventory MVP, cold-room-first. Built to the §10 recommended decisions (D1–D7).
- **Source:** Implementation brief (PRD.md in this project) · epic PD-41.
- **States:** driven from screens/states.jsx (shared registry) — deep-linkable via ?state=<id>.
