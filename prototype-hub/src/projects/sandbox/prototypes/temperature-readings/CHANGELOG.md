# Temperature Readings — change log

Human-readable history of what changed and why. One entry per change (newest first).
Mirror each entry in the matching Jira ticket.

## 2026-08-03 — Record reading action [PD-31]
- **What:** Added a "Record reading" primary button (top right of the header) with a disclosure dropdown — "Enter manually" / "Get from attached RTMD device" — built from Btn + Popover + OptionList, with Toast feedback on selection.
- **Why:** Users need an entry point to submit a reading directly from the readings screen; two capture modes (manual vs RTMD) were requested.
- **Source:** verbal (Raf, 2026-08-03).

## 2026-07-31 — Created [PD-31]
- **What:** Initial prototype — Page header, 3 metric cards, a warning Banner, and a sortable IndexTable of facility readings.
- **Why:** Seed prototype to validate the hub wiring and the Poltail import path.
- **Source:** Setup / verbal.
