# amendment

- **2026-08-27** Built the flow from the Figma state set (section `9248:51450`, PD-38).
  Seven states togglable: A1 and A2 editable amend forms, A3 and A4 audit trails,
  A5 and A6 post-amendment summaries with the history drawer, A7 window expired.
- **2026-08-27** Encoded the two independent windows: past entry 7 days, amendment
  3 days. A reason is required (the primary stays disabled until one is chosen) and
  the audit trail is additive, matching the preservation banner.
- **2026-08-27** `Print Page` sits in the page header, not at the card bottom.
- **2026-08-27** A5 vs A6 is modelled as a behaviour flag (`revertable`), which is the
  real difference between them. Awaiting Raphael's decision.
- **2026-08-27** Scaffold created.
