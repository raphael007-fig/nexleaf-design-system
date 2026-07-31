import React from 'react';
// Built ONLY from Poltail design-system components (via the @ds barrel).
import { Page, MetricCard, Banner, IndexTable, Badge } from '@ds';

const COLUMNS = [
  { key: 'date', label: 'Date', sortable: true },
  { key: 'facility', label: 'Facility', sortable: true },
  { key: 'region', label: 'Region' },
  { key: 'morning', label: 'Morning °C', sortable: true, align: 'right' },
  { key: 'evening', label: 'Evening °C', sortable: true, align: 'right' },
  { key: 'status', label: 'Status', render: (row) => <Badge tone={row.statusTone}>{row.status}</Badge> },
  { key: 'submittedBy', label: 'Submitted by' },
];

const ROWS = [
  { id: 1, date: 'Apr 28, 2026', facility: 'Kisumu District Hospital', region: 'Kisumu', morning: '3.2', evening: '4.1', status: 'Complete', statusTone: 'success', submittedBy: 'Mary A.' },
  { id: 2, date: 'Apr 28, 2026', facility: 'Nairobi General', region: 'Nairobi', morning: '2.9', evening: '3.8', status: 'Complete', statusTone: 'success', submittedBy: 'James O.' },
  { id: 3, date: 'Apr 28, 2026', facility: 'Mombasa Clinic', region: 'Mombasa', morning: '—', evening: '—', status: 'Pending', statusTone: 'attention', submittedBy: '—' },
  { id: 4, date: 'Apr 27, 2026', facility: 'Eldoret Referral', region: 'Eldoret', morning: '4.5', evening: '5.2', status: 'Complete', statusTone: 'success', submittedBy: 'Anne K.' },
  { id: 5, date: 'Apr 27, 2026', facility: 'Nakuru Provincial', region: 'Nakuru', morning: '8.9', evening: '—', status: 'Incomplete', statusTone: 'warning', submittedBy: 'Peter M.' },
];

export default function TemperatureReadings() {
  return (
    <div style={{ background: '#f1f1f1', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: 24 }}>
        <Page title="Temperature Readings" subtitle="Cold-chain submissions across facilities" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, margin: '16px 0' }}>
          <MetricCard title="Facilities reporting" metric="42" />
          <MetricCard title="Complete today" metric="38" />
          <MetricCard title="Needs attention" metric="4" selected />
        </div>
        <Banner tone="warning" title="4 facilities have incomplete readings">
          Follow up before end of day to keep the cold-chain log complete.
        </Banner>
        <div style={{ marginTop: 16 }}>
          <IndexTable columns={COLUMNS} rows={ROWS} />
        </div>
      </div>
    </div>
  );
}
