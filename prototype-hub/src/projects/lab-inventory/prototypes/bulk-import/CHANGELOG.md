# Bulk import — spreadsheet register — change log

## 2026-09-03 — Built from the Kenya NPHL MVP brief
- **What:** Upload → column map (their headers → our fields, §8 suggestions pre-filled) → preview with validation badges (dup asset tag, type not recognised, condition needs review; 'Old' kept as note, never a condition) → confirm → success. Flagged rows import anyway, marked for review. States: each step, importing, error, success.
- **Why:** Sep 2 Raf ↔ Ednah meeting — NPHL lab inventory MVP, cold-room-first. Built to the §10 recommended decisions (D1–D7).
- **Source:** Implementation brief (PRD.md in this project) · epic PD-41.
- **States:** driven from screens/states.jsx (shared registry) — deep-linkable via ?state=<id>.

## 2026-09-03 — Browser-verified fixes
- **What:** Defects found reading every rendered state on localhost and fixed same turn: register loading/error no longer show live tab counts, pagination or KPI numbers (— until data resolves); import success card used the wrong SubmissionSuccessCard section shape and rendered blank — fixed; type inference checks centrifuge/specific types before the fridge catch-all and no longer guesses mixer/autoclave/distiller (they flag "Type not recognised"); detail above-8°C stat now agrees with the drawn series; home cold-room temp matches the detail average (5.7 °C).
- **Why:** loading ≠ empty ≠ error must be visually true, and sample data must agree across the flow.
- **Source:** in-browser verification pass, 2026-09-03.

## 2026-09-03 — End-to-end pass (Raf: "make it end to end and solid")
- **What:** Every state now renders through one wired assembly (AssembledLabApp), so every View / Edit / Add / Import / Cancel / back / breadcrumb leads to its real page from ANY state. New: catalog record detail (View now lands somewhere for all 21 rows), Edit mode on the form (prefilled, dup-check excludes self, "was updated" toast), module placeholders for non-inventory cards (ratified FeaturePage pattern), import-return toast, edge-case row (longest tag/name/location), and registered states for filtered-empty, submitting, details-validation, duplicate-tag, edit-mode and 4 catalog-record states. ALL banners converted to the inCard compact variant (Raf: "use incard banner component everywhere") — the titled Banner variant is no longer used; rule encoded in ds-components-only.
- **Verified in-browser:** module card → register → View → record detail → Edit → save → toast · add validation → cancel · cold-room View → detail → back · review → Submit → success → View record · cancel modal → Discard → register · Reports card → placeholder → Home. No horizontal overflow down to ~620px (pane's floor; 375 unverified).
