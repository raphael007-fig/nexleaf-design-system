# states-set

- **2026-09-02** Register now tracks BOTH surfaces. Each of the five sections carries its
  `mobileNode` beside its desktop `node`, so the mobile twin is one click away. Added a
  `MOBILE_ONLY` register for the five states that exist on mobile with no desktop frame:
  W1j / W1k / W1l (filter sheet, shared by list and calendar), W1m and W3e (filters applied).
  Desktop lays the five filters out inline, so a filter sheet has nothing to pair with there.
  Corrects a false parity report: the register at 45 was never "5 states behind" — it is in
  exact parity with the 45 desktop frames, and the mobile surface simply has 5 more.

- **2026-08-27** Built the module state register (PD-39): all 46 states across the five
  flows, each keyed by the same id as its Figma frame so parity can be diffed by id.
  Every section links to its Figma node and its prototype flow.
- **2026-08-27** Scaffold created.
