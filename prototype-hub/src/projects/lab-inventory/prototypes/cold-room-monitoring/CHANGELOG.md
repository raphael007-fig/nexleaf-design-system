# Cold room monitoring — install flow — change log

## 2026-09-03 — Built from the Kenya NPHL MVP brief
- **What:** Phase 2 via the agreed Aug 24/25 order (wizard chrome cloned from AddEquipmentFlow layer 1): Facility & Contacts (hard 5-cap with 'N of 5' counter, D4) → Equipment Details (Type read-only Walk-in Cold Room, no compartment) → Base Station & Sensors (dropdowns only; CT5 A–D / CTX pre-fed; N sensors on ONE record, D2) → Review & Submit. No thresholds anywhere (D5). States: every step, contacts-at-cap, sensors-assigned, submitting, submit-failed, offline, success; cancel = destructive-confirm modal.
- **Why:** Sep 2 Raf ↔ Ednah meeting — NPHL lab inventory MVP, cold-room-first. Built to the §10 recommended decisions (D1–D7).
- **Source:** Implementation brief (PRD.md in this project) · epic PD-41.
- **States:** driven from screens/states.jsx (shared registry) — deep-linkable via ?state=<id>.

## 2026-09-03 — Divergence fixes (Raf: "fix all one by one")
- **What:** (1) QR code is now required in Equipment Details — same rule as the CCE install flow (Aug 25 decision), shown in Review; pending Ednah's confirm that lab assets carry QR codes (PD-41). (2) The wizard chrome (StepFrame / FormSection / ReviewRows / ReviewSection) is now IMPORTED from AddEquipmentFlow's exported layer 1 instead of cloned — the two flows can no longer drift.
- **Source:** self-audit against the Aug 24/25 decisions log + Raf's go, 2026-09-03.

## 2026-09-03 — End-to-end pass (Raf: "make it end to end and solid")
- **What:** Every state now renders through one wired assembly (AssembledLabApp), so every View / Edit / Add / Import / Cancel / back / breadcrumb leads to its real page from ANY state. New: catalog record detail (View now lands somewhere for all 21 rows), Edit mode on the form (prefilled, dup-check excludes self, "was updated" toast), module placeholders for non-inventory cards (ratified FeaturePage pattern), import-return toast, edge-case row (longest tag/name/location), and registered states for filtered-empty, submitting, details-validation, duplicate-tag, edit-mode and 4 catalog-record states. ALL banners converted to the inCard compact variant (Raf: "use incard banner component everywhere") — the titled Banner variant is no longer used; rule encoded in ds-components-only.
- **Verified in-browser:** module card → register → View → record detail → Edit → save → toast · add validation → cancel · cold-room View → detail → back · review → Submit → success → View record · cancel modal → Discard → register · Reports card → placeholder → Home. No horizontal overflow down to ~620px (pane's floor; 375 unverified).
