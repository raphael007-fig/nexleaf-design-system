import React from 'react';
// SHARED SCREEN — the readings table (PD-34).
// Facility · Make · Model · Serial Number · Type · Morning · Evening ·
// Recording Status, with a per-row Record action.
//
// Presentational: takes rows + callbacks so every flow drives the same table.
// Column order follows the reference frame; Make before Model (the transposition
// was one of the audit corrections on PD-34).
import { IndexTable, StatusBadge, Btn, Checkbox } from '@ds';

export default function ReadingsTable({
  rows = [],
  loading = false,
  selected = new Set(),
  onSelectionChange,
  onRecord,
  emptyState,
  readOnly = false,
  pastEntry = false,
  footer,
  bulkActions,
}) {
  const columns = [
    { key: 'facility', label: 'Facility', sortable: true },
    { key: 'make',     label: 'Make',     sortable: true },
    { key: 'model',    label: 'Model' },
    { key: 'serial',   label: 'Serial Number' },
    { key: 'type',     label: 'Type' },
    {
      key: 'morningDone', label: 'Morning', align: 'center',
      render: (row) => <Checkbox checked={row.morningDone} disabled onChange={() => {}} ariaLabel="Morning recorded" />,
    },
    {
      key: 'eveningDone', label: 'Evening', align: 'center',
      render: (row) => <Checkbox checked={row.eveningDone} disabled onChange={() => {}} ariaLabel="Evening recorded" />,
    },
    {
      key: 'status', label: 'Recording Status',
      render: (row) => <StatusBadge status={String(row.status).toLowerCase()}>{row.status}</StatusBadge>,
    },
    {
      key: 'action', label: '', align: 'right',
      // Past entry mode still allows recording: that is the whole point of the
      // mode, and the banner says entries save against the chosen date. Only a
      // read-only viewer (regional staff, W1f) loses the action.
      render: (row) => (
        <Btn
          variant="secondary"
          size="small"
          disabled={readOnly || (row.morningDone && row.eveningDone && !pastEntry)}
          onClick={() => onRecord && onRecord(row)}
        >
          {row.morningDone && row.eveningDone ? 'View' : 'Record'}
        </Btn>
      ),
    },
  ];

  return (
    <IndexTable
      columns={columns}
      rows={rows}
      loading={loading}
      selectedRows={selected}
      onSelectionChange={readOnly ? undefined : onSelectionChange}
      emptyState={emptyState}
      bulkActions={bulkActions}
      footer={footer}
    />
  );
}
