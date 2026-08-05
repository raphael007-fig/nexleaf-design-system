# Temperature Readings — change log

Human-readable history of what changed and why. One entry per change (newest first).
Mirror each entry in the matching Jira ticket.

## 2026-08-05 — Figma ⇄ prototype parity pass [PD-31]
- **What:** brought both sides into sync. Prototype: real `AppShell` chrome (TopBar + collapsed SideNavigation), placement per `ApplicationLayout` (`contentWidth="full"`, wrapper top padding 0, 24px section rhythm), the temperature nav tree (Home · RTMDs/Devices · Record Temperature · Summaries[Daily/Weekly/Monthly] · Event Logs · Settings), compact `inCard` Banner with no title, selection checkboxes on, Region column removed. Figma: Raf's updated nav rail across all three frames, nav layered **above** the top bar (the rail carries the logo), primary button bound to `Color/bg/fill/fill-emphasis`, checkbox column restored as Column 1.
- **Why:** design and prototype must tell the same story; several divergences had accumulated (nav tree, banner shape, checkboxes, button colour, spacing).
- **Source:** Raf, review session 2026-08-05.
- **Note:** the Figma Index table supports 7 columns and the checkbox takes one, so **Region was dropped on both sides** — it's implied by the facility name.

## 2026-08-03 — Record reading action [PD-31]
- **What:** Added a "Record reading" primary button (top right of the header) with a disclosure dropdown — "Enter manually" / "Get from attached RTMD device" — built from Btn + Popover + OptionList, with Toast feedback on selection.
- **Why:** Users need an entry point to submit a reading directly from the readings screen; two capture modes (manual vs RTMD) were requested.
- **Source:** verbal (Raf, 2026-08-03).

## 2026-07-31 — Created [PD-31]
- **What:** Initial prototype — Page header, 3 metric cards, a warning Banner, and a sortable IndexTable of facility readings.
- **Why:** Seed prototype to validate the hub wiring and the Poltail import path.
- **Source:** Setup / verbal.
