import React, { useRef, useState } from 'react';
// Built ONLY from Poltail design-system components (via the @ds barrel).
// Layout anatomy matches the product: AppShell provides TopBar + SideNavigation
// rail; Page supplies the header + primaryAction. See FIGMA-MAP.md § layout anatomy.
import {
  AppShell, Page, MetricCard, Banner, IndexTable, Badge, Btn,
  Popover, OptionList, Toast, PolarisIconImg,
} from '@ds';

// Navigation for this surface — mirrors the "Side Navigation" reference frame Raf
// added to the Figma section (Home · RTMDs/Devices · Record Temperature ·
// Summaries[Daily/Weekly/Monthly] · Event Logs · Settings). This is the
// temperature-recording tree, NOT the generic ColdTrace equipment nav.
const ico = (name) => <PolarisIconImg name={name} size={20} color="#303030" />;
const TEMPERATURE_NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: ico('HomeFilledIcon') },
  { id: 'rtmds', label: 'RTMDs/Devices', icon: ico('MobileIcon') },
  { id: 'record-temperature', label: 'Record Temperature', icon: ico('ClipboardCheckFilledIcon') },
  {
    id: 'summaries', label: 'Summaries', icon: ico('ChartVerticalFilledIcon'),
    children: [
      { id: 'daily', label: 'Daily' },
      { id: 'weekly', label: 'Weekly' },
      { id: 'monthly', label: 'Monthly' },
    ],
  },
  { id: 'event-logs', label: 'Event Logs', icon: ico('NoteIcon') },
  { id: 'settings', label: 'Settings', icon: ico('SettingsFilledIcon') },
];

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

const RECORD_OPTIONS = [
  { id: 'manual', label: 'Enter manually' },
  { id: 'rtmd', label: 'Get from attached RTMD device' },
];

export default function TemperatureReadings() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeId, setActiveId] = useState('daily');
  const anchorRef = useRef(null);

  const handleRecordChoice = (id) => {
    setMenuOpen(false);
    setToast(
      id === 'manual'
        ? 'Manual entry — opens the temperature recording form.'
        : 'Reading from attached RTMD device…'
    );
  };

  return (
    <AppShell
      level="secondary"
      navItems={TEMPERATURE_NAV_ITEMS}
      activeItemId={activeId}
      onNavSelect={setActiveId}
      homeCrumb={{ id: 'home', label: 'Home' }}
      // Matches the Figma frames: collapsed rail.
      defaultRailCollapsed
      // Canonical shell config — see src/pages/ApplicationLayout (Sectioned layout):
      // contentWidth="full" so the content fills the right column and its edges
      // line up with the toolbar's breadcrumb (left) and avatar (right).
      contentWidth="full"
    >
      {/* Content wrapper per ApplicationLayout: horizontal 16px to match the
          Toolbar's padding, bottom 32px, and TOP PADDING 0 — <Page> already has
          its own 24px top padding, so adding more stacks two gaps and pushes the
          header too far down. */}
      <div style={{ padding: '0 16px 32px', boxSizing: 'border-box' }}>
      <div ref={anchorRef}>
        <Page
          title="Temperature Readings"
          subtitle="Cold-chain submissions across facilities"
          primaryAction={{
            content: 'Record reading',
            disclosure: true,
            onAction: () => setMenuOpen((v) => !v),
          }}
        />
      </div>
      <Popover
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchorRef={anchorRef}
        placement="bottom-end"
        minWidth={280}
        ariaLabel="Record reading options"
      >
        <OptionList
          flush
          dense
          options={RECORD_OPTIONS}
          onChange={handleRecordChoice}
          ariaLabel="How do you want to record the reading?"
        />
      </Popover>

      {/* Sections stack directly — Page's built-in bottom padding spaces it from
          the metrics; the metrics row carries marginBottom 24 so every vertical
          gap (toolbar→header, header→metrics, metrics→table) reads as 24px. */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <MetricCard title="Facilities reporting" metric="42" badge={{ tone: 'info', label: '42 of 46 total' }} />
        <MetricCard title="Complete today" metric="38" badge={{ tone: 'success', label: '92% of target' }} />
        <MetricCard title="Needs attention" metric="4" badge={{ tone: 'warning', label: '4 incomplete' }} />
      </div>

      {/* Matches the Figma Banner instance: Tone=warning, In card=true, Title=false
          — a single compact line, no title, not dismissable. */}
      <div style={{ marginBottom: 24 }}>
        <Banner tone="warning" inCard>
          Follow up before end of day to keep the cold-chain log complete.
        </Banner>
      </div>

      <IndexTable columns={COLUMNS} rows={ROWS} />
      </div>

      {toast && (
        <Toast tone="info" onDismiss={() => setToast(null)}>
          {toast}
        </Toast>
      )}
    </AppShell>
  );
}
