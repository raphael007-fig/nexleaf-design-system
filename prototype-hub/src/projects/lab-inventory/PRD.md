# Lab Equipment — Kenya NPHL MVP · brief (working copy)

> Source: implementation brief pasted by Raphael, 2026-09-03 (from the Sep 2 Raf ↔ Ednah
> meeting). Epic: PD-41. This is the repo working copy so Claude sessions have it in-context.

## Scope (V1)

Inventory management for the **National Public Health Lab (NPHL), Nairobi**, with **one
walk-in cold room** as the single monitored asset. Everything else is catalog-only.
Lab is a **new subsection under Inventory** — existing Cold Chain / RTMD / Passive /
Solar areas untouched. Web-only (D7), responsive.

- Hierarchy: `Kenya Lab` (global group, never selectable) → `NPHL` (region) → 8 labs +
  calibration centre = **facilities**. Region always derived from facility.
- New entity `LabEquipment` — NOT a CCE variant; must not pollute CCE counts/uptime.
- `Type` = managed list (seeded, D3), doubles as the monitored/cataloged switch.
  Monitored V1: Walk-in Cold Room. Later: Fridge/Freezer. Everything else catalog-only.
- Asset tag (the lab's own scheme) is the **primary identifier**; serial optional.
- Condition reuses **Passive Equipment's 4-value vocabulary**; "Old/New" = age → note.
- Roles via the 4 region lists (§3): biomed lead = Admin Regions @ NPHL (sees all);
  lab tech = User Regions @ own facility; QA = read-only. **No data = surface hidden;
  loading ≠ empty ≠ out-of-scope.**

## Phases / prototypes

| Phase | Prototype | What |
|---|---|---|
| 1 | `lab-register` | Canonical list: KPI row (denominators), counted tabs, right-drawer filters, View-to-enter |
| 1 | `add-lab-equipment` | Short catalog form; monitorable type → "Set up monitoring" CTA |
| 1 | `bulk-import` | Upload → column map (§8) → validation preview → confirm |
| 2 | `cold-room-monitoring` | Agreed Add-Equipment order; base station + **N sensors on ONE record** (D2); 5-contact hard cap with counter (D4); no thresholds (D5: WICR 2–8 °C admin config) |
| 3 | `cold-room-detail` | TempChart pattern + per-sensor selector + right rail |
| 0/4 | `module-home` | Role-gated launcher — cards hidden where scope has no data |

## §10 decisions built to (all recommended "A" answers)

D1 central Cold Store facility (pending Ednah) · D2 one record + sensor array (confirm
data model w/ Lucas) · D3 seeded type list, no admin UI · D4 hard cap 5 contacts +
counter · D5 inherit WICR 2–8 °C bands (confirm durations on site) · D6 build with the
4 known labs, config-driven · D7 web-only.

## Out of scope (V1)

Fridge/freezer monitoring, maintenance & service requests for lab kit, calibration/cert
records, ultra-cold monitoring, alarm ack/timeline, terminology neutralisation.
