# Module home — role-gated launcher — change log

## 2026-09-03 — Built from the Kenya NPHL MVP brief
- **What:** Primary launcher cloned from Patterns/Module Navigation with §3 gating: module cards render only where the persona's scope has data/access (hidden ≠ empty); includes the interactive end-to-end assembly (home → register → add/import/monitoring → detail). States: lead / tech / QA personas.
- **Why:** Sep 2 Raf ↔ Ednah meeting — NPHL lab inventory MVP, cold-room-first. Built to the §10 recommended decisions (D1–D7).
- **Source:** Implementation brief (PRD.md in this project) · epic PD-41.
- **States:** driven from screens/states.jsx (shared registry) — deep-linkable via ?state=<id>.

## 2026-09-03 — Browser-verified fixes
- **What:** Defects found reading every rendered state on localhost and fixed same turn: register loading/error no longer show live tab counts, pagination or KPI numbers (— until data resolves); import success card used the wrong SubmissionSuccessCard section shape and rendered blank — fixed; type inference checks centrifuge/specific types before the fridge catch-all and no longer guesses mixer/autoclave/distiller (they flag "Type not recognised"); detail above-8°C stat now agrees with the drawn series; home cold-room temp matches the detail average (5.7 °C).
- **Why:** loading ≠ empty ≠ error must be visually true, and sample data must agree across the flow.
- **Source:** in-browser verification pass, 2026-09-03.

## 2026-09-03 — Invented content stripped (Raf: "fix all one by one")
- **What:** Removed the invented action cards ("Your Lab Register", "Cold Room") and the "N modules hidden" product card — no Figma frame backs that content, and the module's frames are the content reference. Home is now the ratified greeting + the role-gated module grid only; persona/scope/gating info moved to a clearly-labelled "Prototype note" caption (hub annotation, not product UI).
- **Source:** FIGMA-MAP rule (Storybook = layout reference, frames = content reference), 2026-09-03.
