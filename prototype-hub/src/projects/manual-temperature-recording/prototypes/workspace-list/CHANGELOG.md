# workspace-list

- **2026-08-27** Built the flow from the Figma state set (section `9221:47950`, PD-34).
  All ten states togglable: W1 default, W1a loading, W1b empty first run, W1c empty
  filtered, W1d load error, W1e offline, W1f read-only regional staff, W1g rows
  selected, W1h past entry mode, W1i mixed statuses. Composed from Poltail via the
  shared screens `WorkspaceShell`, `RecordingDateBar`, `WorkspaceLegend`,
  `ReadingsTable`, on the shared `fixtures.js` so counts cannot drift.
- **2026-08-27** Recorded the past-entry Record rule: the per-row Record action stays
  **enabled** in past entry mode, because recording against a past date is the point of
  the mode. Only a read-only viewer (W1f) loses it.
- **2026-08-27** Scaffold created.
