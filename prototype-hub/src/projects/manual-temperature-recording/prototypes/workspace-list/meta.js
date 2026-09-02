export default {
  title: 'Workspace: List view',
  description: 'Filters, one constant Recording Date bar (steppers, Jump to Today, Pick Date, and a Past Entry badge; the bar itself does not change colour), legend, and the readings table with a per-row Record action. All ten states togglable.',
  type: 'flow',
  screens: ['WorkspaceShell', 'RecordingDateBar', 'WorkspaceLegend', 'ReadingsTable', 'StateSwitcher'],
  status: 'In Review',
  jiraKey: 'PD-34',
  tags: ['workspace', 'IndexTable', 'cold-chain', 'states'],
  updated: '2026-08-27',
};
