# Create lab — changelog

## 2026-09-09 — created
Built from the Lab Equipment Design meeting (Raphael, Ednah Kiome, Innocent
Kithinji, Sep 9 2026). Innocent raised that no create-lab form existed anywhere
in the designs; Ednah ruled the lab form IS the facility creation form, with:

- "Facility name" → **Lab name**, "Facility code" → **Lab code**
- URL `/facility` → **`/facility/lab`**
- Section 3 "Vaccine Services & Cold Chain" **removed**, replaced by the lab's
  **inventory mapping** — "they don't do vaccine, so we can remove this and
  just link them to creating the inventory for that lab here"
- Sections 2 (Supply Chain & Logistics), 4 (Transport & Waste Management) and
  5 (Staff) **carried over**. Transport & waste kept deliberately: "for
  consistency, we would rather do it instead of eliminating it. And it's
  relevant."
- Equipment temperature ranges are **unchanged** from the vaccine cold chain
  (−15 to −25 °C) — Innocent asked, Ednah confirmed. No change needed here.

Reuses `StepFrame` / `FormSection` from the Add-Equipment wizard, the same
system `ColdRoomFlow` reuses, so the three flows cannot drift.

## 2026-09-09 — three of the four "open questions" were already answered

Raphael asked whether the PRD answered them. It did, and so did the ratified
product context. All three answers contradicted what this screen had been built
with, so it was corrected:

1. **Host facility — REMOVED.** PRD §Scope and the product context both state
   the hierarchy as "Kenya Lab (global group, never selectable) → NPHL = region
   → **labs = facilities**; region always derived from facility." A lab IS a
   facility; there is no host-hospital entity in V1 to derive a region from.
   Region is now asked directly. Ednah's "most labs are hosted within a
   hospital" is a fact about the world, not a field — it lives in the helper
   text. The `lab-identification-standalone` state now simply shows a lab in
   the NPHL region rather than a "no host facility" exception, which was
   incoherent under this model.
2. **Staff labels — REVERTED to the facility form's.** The platform's
   `Occupation` taxonomy is `Biomedical Engineer · Biomedical Technician · Cold
   Chain Technician · EPI Supervisor · Health Center Manager · Nurse · Partner ·
   Vaccine Handler`. There is no "Lab Technologist", so the invented "Lab
   Technologists and Analysts" was wrong. Reads "Number of Epi Nurses and
   Vaccine Handlers" again.
3. **Vaccine-named supply fields — RESTORED.** The PRD lists **terminology
   neutralisation as out of scope for V1**. "Vaccine Supply Point" and "Mode of
   Vaccine Supply" keep their names, with the live form's own helper text
   ("Facility that delivers vaccines to this location").

## Still open — one question, for Ednah

**Total population served** ("catchment area population") is carried over from
the facility form and is answered nowhere. A reference lab serves a referral
network, not a vaccinating population, so this may want dropping or renaming.
Everything else on this screen now traces to a ratified source.
