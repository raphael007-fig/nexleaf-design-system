import React from 'react';
// SHARED SCREEN — the workspace chrome shared by the List and Calendar views
// (PD-34 / PD-35): page header, the five filters, the List/Calendar toggle,
// then whatever the view renders beneath.
//
// Layout follows src/pages/ApplicationLayout: contentWidth full, wrapper
// padding '0 16px 32px' with top padding 0, 24px section rhythm.
import { Page, SelectInput, Btn, Card } from '@ds';

const FILTERS = [
  { key: 'region',    label: 'Region',         options: ['Nairobi', 'Mombasa', 'Kisumu', 'Nyeri'] },
  { key: 'facility',  label: 'Facility',       options: ['Pumwani Maternity Hospital', 'Likoni Clinic', 'Kisumu District Hospital', 'Nyeri Health Center'] },
  { key: 'monitoring',label: 'Monitoring',     options: ['Monitored', 'Not monitored'] },
  { key: 'equipment', label: 'Equipment Type', options: ['Cold Room', 'Refrigerator', 'Freezer', 'Vaccine Carrier'] },
  { key: 'status',    label: 'Status',         options: ['Complete', 'Morning Only', 'Pending', 'Amended'] },
];

export default function WorkspaceShell({
  view = 'list',
  onViewChange,
  filters = {},
  onFilterChange,
  disabled = false,
  loading = false,
  children,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Page
        title="Manual Temperature Recording"
        loading={loading}
        secondaryActions={[]}
        titleDisclosure={undefined}
      />

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flex: 1 }}>
          {FILTERS.map((f) => (
            <div key={f.key} style={{ width: 256, maxWidth: '100%' }}>
              <SelectInput
                label={f.label}
                placeholder="Select"
                options={f.options.map((o) => ({ label: o, value: o }))}
                value={filters[f.key] || ''}
                onChange={(v) => onFilterChange && onFilterChange(f.key, v)}
                disabled={disabled}
                skeleton={loading}
              />
            </div>
          ))}
        </div>

        {/* A Btn pair rather than BtnGroupSegmented: the segmented group has no
            active state, and which view you are on is the whole point here. */}
        <div style={{ display: 'inline-flex', gap: 4 }}>
          <Btn variant={view === 'list' ? 'primary' : 'secondary'} size="small"
            onClick={() => onViewChange && onViewChange('list')}>List</Btn>
          <Btn variant={view === 'calendar' ? 'primary' : 'secondary'} size="small"
            onClick={() => onViewChange && onViewChange('calendar')}>Calendar</Btn>
        </div>
      </div>

      <Card>{children}</Card>
    </div>
  );
}
