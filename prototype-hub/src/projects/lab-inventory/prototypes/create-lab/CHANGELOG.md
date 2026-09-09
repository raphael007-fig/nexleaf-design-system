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

## Open questions for Ednah
1. **Region vs host facility.** Ednah: a lab is mapped to a region, and most
   labs are hosted in a hospital, but NPHL's own regional labs are not mapped
   to a facility. Built as: host facility optional, region **derived** from it
   when present, asked **directly** when absent. Confirm that reading.
2. **Section 2 keeps vaccine-named fields.** "Supply chain & logistics" was
   called "still okay", but the facility version names three fields after
   vaccine supply. Renamed to neutral supply wording here — confirm, or restore
   the vaccine names.
3. **Staff labels.** The facility form asks for "Epi Nurses and Vaccine
   Handlers"; that does not fit a lab, so it reads "Lab Technologists and
   Analysts" here. Confirm the right role name.
4. **Total population served** is carried over ("catchment area population").
   Confirm a lab has a catchment at all.
