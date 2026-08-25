# Temperature Readings — change log

Human-readable history of what changed and why. One entry per change (newest first).
Mirror each entry in the matching Jira ticket.

## 2026-08-05 — Figma ⇄ prototype parity pass [PD-31]
- **What:** brought both sides into sync. Prototype: real `AppShell` chrome (TopBar + collapsed SideNavigation), placement per `ApplicationLayout` (`contentWidth="full"`, wrapper top padding 0, 24px section rhythm), the temperature nav tree (Home · RTMDs/Devices · Record Temperature · Summaries[Daily/Weekly/Monthly] · Event Logs · Settings), compact `inCard` Banner with no title, selection checkboxes on, Region column removed. Figma: Raf's updated nav rail across all three frames, nav layered **above** the top bar (the rail carries the logo), primary button bound to `Color/bg/fill/fill-emphasis`, checkbox column restored as Column 1.
- **Why:** design and prototype must tell the same story; several divergences had accumulated (nav tree, banner shape, checkboxes, button colour, spacing).
- **Source:** Raf, review session 2026-08-05.
- **Note:** the Figma Index table supports 7 columns and the checkbox takes one. Rather than drop a field, **Morning and Evening are paired in one column** ("3.2 / 4.1") so Region keeps its own column. All 7 fields are present on both sides. An 8-column Index table variant is requested on PD-16; once it exists the readings can split back out.

## 2026-08-03 — Record reading action [PD-31]
- **What:** Added a "Record reading" primary button (top right of the header) with a disclosure dropdown — "Enter manually" / "Get from attached RTMD device" — built from Btn + Popover + OptionList, with Toast feedback on selection.
- **Why:** Users need an entry point to submit a reading directly from the readings screen; two capture modes (manual vs RTMD) were requested.
- **Source:** verbal (Raf, 2026-08-03).

## 2026-07-31 — Created [PD-31]
- **What:** Initial prototype — Page header, 3 metric cards, a warning Banner, and a sortable IndexTable of facility readings.
- **Why:** Seed prototype to validate the hub wiring and the Poltail import path.
- **Source:** Setup / verbal.

## 2026-08-24 — Top bar corrected in Figma; subtitle removed from prototype
- **What:** Figma — replaced the top bar in all three state frames with a clone of the canonical
  Design Rep bar (`8483:64221`): `Right content` restored to an instance, `Actions` (Kenya pill)
  moved to its correct place as a group-level sibling, home crumb back to a text button, and the
  breadcrumb retargeted to `Home › Temperature Readings › Daily` with the `...` truncation hidden.
  Prototype — removed the `<Page subtitle>` "Cold-chain submissions across facilities".
- **Why:** Raf flagged the Figma top bar as wrong, then flagged that the subtitle existed only in
  the prototype. Figma's header is title-only, so the prototype was the side to change.
- **Correction logged:** the bar was first mis-diagnosed as a hand-rolled lookalike because it is a
  `GROUP` — but the group is the canonical house pattern, and the DS library's `Top bar` is the
  generic Polaris bar, not the ColdTrace one. Reverted; the real defects were the detached
  `Right content`, the misplaced `Actions`, and stale breadcrumb text.
- **Parity:** 48 visible strings, both sides, matching.
- **Source:** Raf, verbal.
