import { useState, useMemo } from 'react';
import { AppShell, RailCollapseToggle } from './AppShell.jsx';
import { Page } from '../Page/Page.jsx';
import { Btn } from '../Btn/Btn.jsx';
import { Cell } from '../Cell/Cell.jsx';
import { MetricCard } from '../MetricCard/MetricCard.jsx';
import { IndexTable } from '../IndexTable/IndexTable.jsx';
import { Pagination } from '../Pagination/Pagination.jsx';
import { SearchSelectButton } from '../SearchSelect/SearchSelect.jsx';
import { StatusBadge } from '../Badge/Badge.jsx';
import { CardLayoutType6, Card, CardSectionTitle, CardField } from '../Card/Card.jsx';
import { TemperatureTasksCard } from '../TemperatureTasksCard/TemperatureTasksCard.jsx';
import { NavCard } from '../NavCard/NavCard.jsx';
import { TertiaryActions } from '../TertiaryActions/TertiaryActions.jsx';
import { COLDTRACE_NAV_ITEMS } from '../MenuDrawer/MenuDrawer.jsx';
import { useNavSync } from '../../foundation/useNavSync.js';
import { AiChatDemo } from '../AiChat/AiChatDemo.jsx';
import { PolarisIconImg } from '../PolarisIcon/PolarisIcon.jsx';
// Home module-grid illustrations — shared with the Sectioned Layout (Pages).
import illoEquipment from '../../pages/ApplicationLayout/home-illustrations/equipment-management.svg?raw';
import illoMonitoring from '../../pages/ApplicationLayout/home-illustrations/monitoring.svg?raw';
import illoTraining from '../../pages/ApplicationLayout/home-illustrations/training.svg?raw';
import illoReports from '../../pages/ApplicationLayout/home-illustrations/reports-hub.svg?raw';
import illoFacility from '../../pages/ApplicationLayout/home-illustrations/facility-management.svg?raw';
import illoForecasting from '../../pages/ApplicationLayout/home-illustrations/forecasting.svg?raw';
import illoEvents from '../../pages/ApplicationLayout/home-illustrations/events.svg?raw';
import illoTransport from '../../pages/ApplicationLayout/home-illustrations/coldtrace-transport.svg?raw';
import illoHealthHub from '../../pages/ApplicationLayout/home-illustrations/health-tech-hub.svg?raw';

export default {
  title: 'Patterns/Responsive/App Shell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
};

// ── Home glyphs + module-grid illustrations (imported from Sectioned Layout) ──
const IcoScanRows = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 6h2M4 10h2M4 14h2M8 6h8M8 10h8M8 14h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
// Alert circle — symmetric, optically balanced next to the small title (the
// triangle read bottom-heavy/lopsided at this size).
const IcoAlertCircle = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.5" />
    <path d="M10 6.3v4.4M10 13.4h.01" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IcoGauge = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3 14a7 7 0 1 1 14 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="m10 14 3.2-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="10" cy="14" r="1.4" fill={color} />
  </svg>
);
const IcoGear = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="2.4" stroke={color} strokeWidth="1.5" />
    <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IcoQr = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
    <rect x="12" y="3" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
    <rect x="3" y="12" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
    <path d="M12 12h2v2M16 12v5M12 16h2" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// 80×80 illustration wrapper (artwork already carries its own tinted disc).
const HomeMedia = ({ svg }) => (
  <span
    aria-hidden="true"
    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, flexShrink: 0 }}
    ref={(node) => {
      if (!node) return;
      const el = node.querySelector('svg');
      if (el) { el.setAttribute('width', '80'); el.setAttribute('height', '80'); el.style.display = 'block'; }
    }}
    dangerouslySetInnerHTML={{ __html: svg }}
  />
);

const HOME_SECTIONS = [
  { id: 'inventory',   title: 'Inventory Management',   svg: illoEquipment, target: 'coldchain' },
  { id: 'temperature', title: 'Temperature Monitoring', svg: illoMonitoring },
  { id: 'learning',    title: 'Learning Hub',           svg: illoTraining },
  { id: 'reports',     title: 'Reports',                svg: illoReports },
  { id: 'facility',    title: 'Facility Registry',      svg: illoFacility },
  { id: 'forecasting', title: 'Forecasting',            svg: illoForecasting },
  { id: 'events',      title: 'Events',                 svg: illoEvents },
  { id: 'transport',   title: 'ColdChain Transport',    svg: illoTransport },
  { id: 'service',     title: 'Service Requests',       svg: illoHealthHub },
];

const EQUIPMENT = [
  { id: 'hbc-80', name: 'Hairer-HBC-80 (IOM)', type: 'Vaccine Refrigerator', serial: 'BE0G91EAS0 00EJ8 S0003', facility: 'Main Laboratory', health: 'functional', maintenance: 'upcoming' },
  { id: 'vest-144', name: 'Vestfrost MK 144', type: 'Vaccine Freezer', serial: 'DCM-2024-001', facility: 'Mombasa', health: 'faulty', maintenance: 'overdue' },
  { id: 'bmed-004', name: 'B Medical Systems', type: 'Vaccine Refrigerator', serial: 'DCM-2024-004', facility: 'Kisumu', health: 'unknown' },
  { id: 'vest-304', name: 'Vestfrost MK 304', type: 'Vaccine Freezer', serial: 'DCM-2024-010', facility: 'Nakuru', health: 'functional', lifecycle: 'approaching decommissioning' },
];

// The nav tree + Home crumb fed into useNavSync — the single-source engine that
// keeps the rail/drawer, breadcrumb, and Secondary title switcher in lock-step.
const NAV_ITEMS = COLDTRACE_NAV_ITEMS;
const HOME_CRUMB = { id: 'home', label: 'Home', icon: <PolarisIconImg name="HomeFilledIcon" size={20} color="#303030" />, iconOnly: true };

// ─── Primary / Home ───────────────────────────────────────────────────────────
// `variant` is additive: 'default' is Home Layout 1 (unchanged); 'tasks' is
// Home Layout 2 — it inserts the "Today's Temperature Tasks" widget into the
// action row between Quick Action and Action Required.
function Home({ onOpenModule, variant = 'default' }) {
  const showTasks = variant === 'tasks';
  // Grids reflow in pure CSS (flex-wrap + auto-fit) so they key off the ACTUAL
  // available width — no JS measurement, no resize lag, and they can never spill
  // past the viewport (the old window-width breakpoints lagged a frame on resize,
  // briefly overflowing → a horizontal scrollbar).

  // Action-row cards defined once, then placed into whichever container the
  // layout needs (flex row for Layout 1, aligned 3-col grid for Layout 2).
  const quickActionCard = (
    <CardLayoutType6 icon={<IcoScanRows />} title="Quick Action">
      <Cell
        icon={<IcoQr />}
        iconTone="neutral"
        title="Scan QR Code or Enter Serial No."
        onClick={() => onOpenModule('coldchain')}
        ariaLabel="Scan QR Code or Enter Serial No."
      />
    </CardLayoutType6>
  );
  const actionRequiredCard = (
    <CardLayoutType6
      tone="critical"
      icon={<IcoAlertCircle />}
      title="Action Required"
      badge="5 Urgent Issues"
      actionLabel="View All"
      onAction={() => onOpenModule('coldchain')}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 12 }}>
        <Cell icon={<IcoGauge />} iconTone="neutral" title="Temperature exceeds threshold" description="Incubator HC 1501-2023-001 | Main Laboratory" hasChevron onClick={() => onOpenModule('coldchain')} ariaLabel="Temperature exceeds threshold" />
        {/* Layout 2 keeps Action Required to a single cell so it balances the
            three-column action row; Layout 1 shows both. */}
        {!showTasks && (
          <Cell icon={<IcoGear />} iconTone="neutral" title="Maintenance due" description="Generator GEN-2023-005 | Power Room" hasChevron onClick={() => onOpenModule('coldchain')} ariaLabel="Maintenance due" />
        )}
      </div>
    </CardLayoutType6>
  );

  return (
    <div>
      {/* Greeting */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 450, color: '#616161' }}>Hey there 😊,</p>
        <h1 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 700, lineHeight: '32px', letterSpacing: '-0.2px', color: '#303030' }}>
          What would you like to do today?
        </h1>
      </div>

      {/* Action row — always on the SAME .nx-home-grid as the module tiles
          below, so the cards sit column-for-column on that grid (3 → 2 → 1).
          • Layout 2 (showTasks): Quick Action · Temperature Tasks · Action
            Required — one card per column.
          • Layout 1: Quick Action rides column 1 and Action Required spans
            columns 2–3, its left edge starting exactly on the 2nd column line
            (see .nx-home-actions__* in global.css). */}
      <div className="nx-home-grid" style={{ marginBottom: 16 }}>
        <div className="nx-home-grid__tiles">
          {showTasks ? (
            <>
              {quickActionCard}
              <TemperatureTasksCard onRecord={() => onOpenModule('coldchain')} />
              {actionRequiredCard}
            </>
          ) : (
            <>
              <div className="nx-home-actions__quick">{quickActionCard}</div>
              <div className="nx-home-actions__wide">{actionRequiredCard}</div>
            </>
          )}
        </div>
      </div>

      {/* Section grid — NavCard home tiles. Capped at 3 columns on desktop,
          stepping 3 → 2 → 1 via container queries (see .nx-home-grid in
          global.css): container-relative, pure CSS, no overflow/resize lag. */}
      <div className="nx-home-grid">
        <div className="nx-home-grid__tiles">
          {HOME_SECTIONS.map(({ id, title, svg, target }) => (
            <NavCard
              key={id}
              layout="home"
              title={title}
              media={<HomeMedia svg={svg} />}
              onClick={target ? () => onOpenModule(target) : () => {}}
              ariaLabel={title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Secondary / List ─────────────────────────────────────────────────────────
// ONE responsive page at every size — the Application Layout's Sectioned view:
// Page header (title switcher + Region picker + Add New), interactive metric
// tiles, then the full IndexTable (tabs, search, bulk + row actions,
// pagination). No layout swap on resize: the metric grid auto-fits and
// IndexTable owns its own table → stacked-card reflow on narrow screens.

// Toolbar icons — same inline SVGs as the Sectioned Layout.
const IcoFilter = ({ size = 16, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3 5h14M6 10h8M8.5 15h3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IcoAdjust = ({ size = 16, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 4v5M4 12v4M10 4v2M10 9v7M16 4v8M16 15v1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="4" cy="10.5" r="1.5" stroke={color} strokeWidth="1.3" />
    <circle cx="10" cy="7.5" r="1.5" stroke={color} strokeWidth="1.3" />
    <circle cx="16" cy="13.5" r="1.5" stroke={color} strokeWidth="1.3" />
  </svg>
);

const EQUIP_COLUMNS = [
  { key: 'name',        label: 'Equipment Name', width: 200, primary: true },
  { key: 'type',        label: 'Type',           width: 170 },
  { key: 'serial',      label: 'Serial Number',  width: 190 },
  { key: 'facility',    label: 'Facility',       width: 160 },
  { key: 'health',      label: 'Health',         width: 120, render: (row) => <StatusBadge status={row.health} /> },
  { key: 'maintenance', label: 'Maintenance',    width: 140, render: (row) => (row.maintenance ? <StatusBadge status={row.maintenance} /> : '—') },
];

// Tab 0 shows everything; the rest filter on the health dimension.
const EQUIP_TABS = [
  { label: 'All',        filter: '__all' },
  { label: 'Functional', filter: 'functional' },
  { label: 'Faulty',     filter: 'faulty' },
  { label: 'Unknown',    filter: 'unknown' },
];

const EQUIP_METRICS = [
  { key: 'total',      title: 'Total Equipment', metric: '248', badge: { label: '5 Urgent',     tone: 'critical'  }, tooltip: 'All registered cold-chain equipment in this region.' },
  { key: 'functional', title: 'Functional',      metric: '210', badge: { label: 'Healthy',      tone: 'success'   }, tooltip: 'Equipment reporting a functional health status.' },
  { key: 'faulty',     title: 'Faulty',          metric: '12',  badge: { label: '3 Overdue',    tone: 'critical'  }, tooltip: 'Equipment with an open fault — service required.' },
  { key: 'unknown',    title: 'Unknown Status',  metric: '26',  badge: { label: 'Needs Review', tone: 'attention' }, tooltip: 'Equipment that has not reported a health status recently.' },
];

const REGION_OPTIONS = [
  { id: 'nairobi', label: 'Nairobi' },
  { id: 'coast',   label: 'Coast',       children: [{ id: 'mombasa', label: 'Mombasa' }, { id: 'kilifi', label: 'Kilifi' }] },
  { id: 'nyanza',  label: 'Nyanza',      children: [{ id: 'kisumu', label: 'Kisumu' }] },
  { id: 'rift',    label: 'Rift Valley', children: [{ id: 'nakuru', label: 'Nakuru' }] },
];

function List({ title, titleDisclosure, onOpenRecord }) {
  // Table-toolbar state — same shape as the Sectioned Layout: tab + search
  // filter the rows; changing either resets the selection so bulk actions
  // never target hidden rows. IndexTable's selection contract is a Set of ids.
  const [selected, setSelected] = useState(new Set());
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState([]);
  const [activeMetric, setActiveMetric] = useState(null);

  const filtered = useMemo(() => {
    const f = EQUIP_TABS[activeTab].filter;
    let rows = f === '__all' ? EQUIPMENT : EQUIPMENT.filter((r) => r.health === f);
    const q = search.trim().toLowerCase();
    if (q) rows = rows.filter((r) => [r.name, r.type, r.serial, r.facility].some((v) => v.toLowerCase().includes(q)));
    return rows;
  }, [activeTab, search]);

  const countFor = (filter) =>
    filter === '__all' ? EQUIPMENT.length : EQUIPMENT.filter((r) => r.health === filter).length;

  return (
    <>
      <Page
        flushTop
        title={title}
        titleDisclosure={titleDisclosure}
        secondaryActions={[{
          node: (
            <SearchSelectButton
              label="Region"
              placeholder="Choose Region"
              leadingIcon={<PolarisIconImg name="LocationIcon" size={16} color="currentColor" />}
              options={REGION_OPTIONS}
              value={region}
              onChange={setRegion}
              multiple
            />
          ),
        }]}
        primaryAction={{ content: '+ Add New', onClick: () => {} }}
      />

      {/* Metric tiles — interactive, same rhythm as the Sectioned Layout:
          Page's 24px bottom padding above, explicit 24px below to the table. */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
        gap: 12,
        marginBottom: 24,
      }}>
        {EQUIP_METRICS.map((card) => (
          <MetricCard
            key={card.key}
            title={card.title}
            metric={card.metric}
            badge={card.badge}
            infoTooltip={card.tooltip}
            selected={activeMetric === card.key}
            onClick={() => setActiveMetric((prev) => (prev === card.key ? null : card.key))}
          />
        ))}
      </div>

      <IndexTable
        columns={EQUIP_COLUMNS}
        rows={filtered}
        selectedRows={selected}
        onSelectionChange={setSelected}
        tabs={EQUIP_TABS.map((t) => ({ label: t.label, badge: countFor(t.filter) }))}
        activeTab={activeTab}
        onTabChange={(i) => { setActiveTab(i); setSelected(new Set()); }}
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setSelected(new Set()); }}
        searchPlaceholder="Search equipment…"
        toolbarActions={[
          { label: 'Filter',  icon: <IcoFilter size={16} />, onClick: () => {} },
          { label: 'Columns', icon: <IcoAdjust size={16} />, onClick: () => {} },
        ]}
        bulkActions={[
          { label: 'Export',  onAction: () => {} },
          { label: 'Archive', onAction: () => {} },
        ]}
        rowActions={[
          { label: 'View details', onAction: (row) => onOpenRecord(row) },
          { label: 'Edit',         onAction: () => {} },
          { label: 'Delete',       onAction: () => {}, destructive: true },
        ]}
        emptyState={{
          heading: 'No equipment matches this filter',
          description: 'Try a different status tab or clear the search.',
        }}
        footer={
          <Pagination
            type="table"
            hasPrevious={false}
            hasNext={false}
            label={filtered.length === 0 ? '0 of 0' : `1–${filtered.length} of ${filtered.length}`}
          />
        }
      />
    </>
  );
}

// ─── Tertiary / Detail ────────────────────────────────────────────────────────
function Detail({ record, onBack }) {
  const [sheetState] = useState(record.health);
  return (
    <>
      <Page
        flushTop
        variant="record"
        backAction={{ onClick: onBack }}
        title={record.name}
        status={record.health}
        subtitle={record.serial}
        actions={<TertiaryActions state={record.health === 'functional' ? 'functional' : record.health === 'faulty' ? 'faulty' : record.health === 'unknown' ? 'unknown' : 'functional'} onAction={() => {}} />}
      />
      {/* Record body — main description card (fields paired 2-per-row like
          CardLayoutType1, the canonical detail card) + a contact aside. The
          2fr/1fr flex row fills the full-width shell and wraps to a stack on
          narrow screens — same pattern as the Home action row. */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: '2 1 480px', minWidth: 0 }}>
          <Card>
            <CardSectionTitle title="Description" />
            {[
              [
                { label: 'Equipment Type', value: record.type },
                { label: 'Serial Number', value: record.serial },
              ],
              [
                { label: 'Facility', value: record.facility },
                { label: 'Maintenance', value: record.maintenance || 'Unknown' },
              ],
            ].map((pair, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, minHeight: 44, alignItems: 'center' }}>
                {pair.map((f) => <CardField key={f.label} label={f.label} value={f.value} />)}
              </div>
            ))}
          </Card>
        </div>
        <div style={{ flex: '1 1 280px', minWidth: 0 }}>
          <Card>
            <CardSectionTitle title="Added by" />
            <CardField label="Grace Mwangi" value="+254 712 345 678" />
          </Card>
        </div>
      </div>
    </>
  );
}

// ─── Assembled responsive app ─────────────────────────────────────────────────
// Resize the canvas (or use the viewport addon) to cross 1024px: desktop docks
// the rail; tablet/mobile use the hamburger → MenuDrawer. The route/IA is the
// same at every size — only the shell adapts.
// Shared assembled-app harness. `homeVariant` is threaded into the Home page so
// the two Home layouts share ONE assembled shell (nav sync, breadcrumbs, record
// drilldown) instead of duplicating it.
function AssembledApp({ homeVariant = 'default' }) {
    // ── Single source of truth via useNavSync ───────────────────────────────
    // `nav.activeId` drives the rail/drawer, breadcrumb, and title switcher.
    // `record` is the Tertiary detail (an extra dimension, not a nav id); `view`
    // is DERIVED, never stored.
    const nav = useNavSync(NAV_ITEMS, { home: HOME_CRUMB, initialId: 'home', groupsArePages: true });
    const [record, setRecord] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);   // Ask AI panel

    // One writer for every surface — also clears any open record so a nav/crumb
    // jump leaves the detail view.
    const navigate = (id) => { setRecord(null); nav.go(id); };

    const isHome = nav.activeId === 'home';
    const view = record ? 'detail' : isHome ? 'home' : 'list';

    // Breadcrumbs come straight from the hook (a pure projection of activeId) —
    // the Home crumb shows on the Primary page, just like the Application Layout
    // home; the record crumb is appended in detail. TopBar compresses/hides it
    // responsively.
    const breadcrumbs = record
      ? [...nav.breadcrumbs, { id: record.id, label: record.name }]
      : nav.breadcrumbs;

    // Page level drives the mobile tertiary focus behaviour (top bar hidden).
    const level = view === 'detail' ? 'tertiary' : view === 'list' ? 'secondary' : 'primary';

    return (
      <AppShell
        level={level}
        activeItemId={nav.activeId}
        onNavSelect={navigate}
        breadcrumbs={breadcrumbs}
        onBreadcrumbSelect={navigate}
        onAskAi={() => setChatOpen((o) => !o)}
        askAiActive={chatOpen}
        // 'fluid' = stretch like the Application Layout but KEEP the shell's
        // standard padding rhythm (24px top / 16px sides / 32px bottom). 'full'
        // would be true full-bleed — content hugging the rail with no insets —
        // which only suits pages that supply their own padding.
        contentWidth="fluid"
      >
        {/* Ask AI opens the canonical AI Chat Bot demo — the same assembled
            panel (welcome, scripted replies, history, dialogs) every surface
            shares, so the chat experience is identical system-wide. */}
        <AiChatDemo open={chatOpen} onClose={() => setChatOpen(false)} />
        {view === 'home' && <Home onOpenModule={navigate} variant={homeVariant} />}
        {view === 'list' && (
          <List
            title={nav.labelFor(nav.activeId)}
            titleDisclosure={nav.titleDisclosureFor(nav.activeId, { onSelect: navigate })}
            onOpenRecord={(r) => setRecord(r)}
          />
        )}
        {view === 'detail' && record && (
          <Detail record={record} onBack={() => setRecord(null)} />
        )}
      </AppShell>
    );
}

export const ResponsiveApp = {
  name: 'Assembled app (Primary / Secondary / Tertiary)',
  render: () => <AssembledApp />,
};

// ─── Home Layout 2 ─────────────────────────────────────────────────────────────
// Same assembled app as above, but the Home page runs Layout 2: the "Today's
// Temperature Tasks" widget joins the action row (Quick Action · Temperature
// Tasks · Action Required). Everything else — nav, breadcrumbs, list/detail
// drilldown — is identical.
export const HomeLayout2 = {
  name: 'Home Layout 2 (Temperature Tasks widget)',
  render: () => <AssembledApp homeVariant="tasks" />,
};

// ─── Interaction states ───────────────────────────────────────────────────────
// The shell's only OWN interactive control is the rail collapse toggle (the
// nav-row states — rest / hover / active / focus — are owned by SideNavigation,
// and the top-bar control states by Toolbar/TopBar). Shown here in isolation
// against the rail's #f1f1f1 background, expanded + collapsed, across rest +
// hover (forced via `state`); the focus ring shows on real keyboard focus (tab
// into any cell). For the states IN CONTEXT (selected rail row + the live
// toggle), see the docked rail in the "Shell only" / assembled canvases above —
// resize past 1024px to dock the rail.
export const States = {
  name: 'Interaction states',
  render: () => {
    const cell = (label, node) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#616161' }}>{label}</span>
        {/* Rail-tinted footer slot so the toggle reads exactly as it does docked. */}
        <div style={{ width: 240, background: '#f1f1f1', borderRadius: 12, padding: '8px 12px', boxSizing: 'border-box' }}>
          {node}
        </div>
      </div>
    );
    // `state="hover"` forces the hover look; the focus ring shows on real keyboard
    // focus (tab to the control here or in the docked rail), so it isn't faked —
    // it's documented in the MDX and reachable by tabbing into any canvas.
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, fontFamily: 'Inter, sans-serif', padding: 4 }}>
        {cell('Expanded — rest', <RailCollapseToggle collapsed={false} onToggle={() => {}} />)}
        {cell('Expanded — hover (forced)', <RailCollapseToggle collapsed={false} onToggle={() => {}} state="hover" />)}
        {cell('Collapsed — rest', <RailCollapseToggle collapsed onToggle={() => {}} />)}
        {cell('Collapsed — hover (forced)', <RailCollapseToggle collapsed onToggle={() => {}} state="hover" />)}
      </div>
    );
  },
};

// ─── Shell only (chrome) ──────────────────────────────────────────────────────
export const ShellOnly = {
  name: 'Shell only',
  render: () => {
    const [active, setActive] = useState('coldchain');
    return (
      <AppShell activeItemId={active} onNavSelect={setActive}>
        <div style={{ padding: 24, color: '#616161', fontSize: 14 }}>
          Page content goes here. Resize across 1024px to see the rail dock (desktop)
          vs the hamburger → drawer (tablet / mobile).
        </div>
      </AppShell>
    );
  },
};
