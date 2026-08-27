# Dashboard entry — change log

Human-readable history of what changed and why. One entry per change (newest first).
Mirror each entry in the matching Jira ticket.

## 2026-08-27 — Created from the Figma inspiration frames [PD-36]
- **What:** built the ColdTrace home launcher as the shared screen `DashboardHome` and wired it
  in this flow. Composition, all Poltail: `CardLayoutType6` for Quick Action and Action Required
  (tone `critical`, badge, `View All`), `Cell` for the rows, the design system's existing
  **`TemperatureTasksCard`** for Today's Temperature Tasks — which already ships the View All
  slide-over with Morning / Evening / Completed tabs and pagination, so the drawer frame needed no
  new component — `NavCard` layout `home` for the nine module tiles, and `PolarisIconImg`
  throughout. Placement per `src/pages/ApplicationLayout`: `AppShell level="primary"`,
  `contentWidth="full"`, wrapper `padding: '0 16px 32px'` with top padding 0, 24px section rhythm.
- **Why:** Raphael asked for the main dashboard built from the Figma inspiration frames
  `8127:118754` (home) and `8127:118912` (Today's Temperature Tasks drawer).
- **Source:** Raf, verbal 2026-08-27.
- **Corrections carried over from the Figma audit** (all logged on PD-33 / PD-36):
  - The card badge, the drawer tab counts and the drawer list all derive from one `tasks` object,
    so the `10 Pending` (card) vs `13 Pending` (drawer) contradiction in Figma cannot recur here.
  - The drawer rows are distinct equipment across six facilities; Figma repeats one row six times.
  - `Today's Temperature Tasks` uses one apostrophe form throughout (Figma mixes straight and curly).
  - No `AI Chat Bot (beta)` pill — chrome comes from the DS `TopBar` (Ask AI), per the 2026-08-26 ruling.
- **Known divergence, deliberate:** the nine module tiles use Polaris icons in a tinted disc rather
  than the bespoke illustrations in Figma. Those illustration assets exist only in the Figma file and
  the design system is Polaris-icons-only, so hand-drawing lookalikes would break the no-scratch rule.
  Flagged on PD-36 for a decision — export the assets, or keep icons.
- **Not verified:** this has not been run in a browser from this session (no dev server reachable
  here). It needs `npm run dev` and a look at `#/manual-temperature-recording/dashboard-entry`
  before it counts as working.
