import { useState } from 'react';
import { AppShell, RailCollapseToggle } from './AppShell.jsx';
import { Page } from '../Page/Page.jsx';
import { Btn } from '../Btn/Btn.jsx';
import { Cell } from '../Cell/Cell.jsx';
import { CardLayoutType6, Card, CardSectionTitle, CardField } from '../Card/Card.jsx';
import { NavCard } from '../NavCard/NavCard.jsx';
import { EquipmentCard } from '../EquipmentCard/EquipmentCard.jsx';
import { TertiaryActions } from '../TertiaryActions/TertiaryActions.jsx';
import { COLDTRACE_NAV_ITEMS } from '../MenuDrawer/MenuDrawer.jsx';
import { useNavSync } from '../../foundation/useNavSync.js';
import { AiChatPanel } from '../Toolbar/Toolbar.jsx';
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
function Home({ onOpenModule }) {
  // Grids reflow in pure CSS (flex-wrap + auto-fit) so they key off the ACTUAL
  // available width — no JS measurement, no resize lag, and they can never spill
  // past the viewport (the old window-width breakpoints lagged a frame on resize,
  // briefly overflowing → a horizontal scrollbar).
  return (
    <div>
      {/* Greeting */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 450, color: '#616161' }}>Hey there 😊,</p>
        <h1 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 700, lineHeight: '32px', letterSpacing: '-0.2px', color: '#303030' }}>
          What would you like to do today?
        </h1>
      </div>

      {/* Action row — Quick Action (~1fr) + Action Required (~2fr) side by side,
          wrapping to a stack when they no longer fit. flex-wrap keeps the ratio
          when wide and stacks when narrow, with no JS width measurement. */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
        <div style={{ flex: '1 1 260px', minWidth: 0 }}>
          <CardLayoutType6 icon={<IcoScanRows />} title="Quick Action">
            <Cell
              icon={<IcoQr />}
              iconTone="neutral"
              title="Scan QR Code or Enter Serial No."
              onClick={() => onOpenModule('coldchain')}
              ariaLabel="Scan QR Code or Enter Serial No."
            />
          </CardLayoutType6>
        </div>

        <div style={{ flex: '2 1 460px', minWidth: 0 }}>
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
              <Cell icon={<IcoGear />} iconTone="neutral" title="Maintenance due" description="Generator GEN-2023-005 | Power Room" hasChevron onClick={() => onOpenModule('coldchain')} ariaLabel="Maintenance due" />
            </div>
          </CardLayoutType6>
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
function List({ title, titleDisclosure, onOpenRecord }) {
  // Title + switcher are derived from the single nav source (useNavSync) by the
  // parent and passed straight in — the switcher (popover desktop / BottomSheet
  // mobile) already routes selections back through the shared writer.
  return (
    <Page
      flushTop
      title={title}
      titleDisclosure={titleDisclosure}
      primaryAction={{ content: '+ Add New', onClick: () => {} }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
        {EQUIPMENT.map((e) => (
          <EquipmentCard key={e.id} {...e} onClick={() => onOpenRecord(e)} />
        ))}
      </div>
    </Page>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
        <Card>
          <CardSectionTitle>Description</CardSectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 12 }}>
            <CardField label="Equipment Type" value={record.type} />
            <CardField label="Serial Number" value={record.serial} />
            <CardField label="Facility" value={record.facility} />
            <CardField label="Maintenance" value={record.maintenance || 'Unknown'} />
          </div>
        </Card>
      </div>
    </>
  );
}

// ─── Assembled responsive app ─────────────────────────────────────────────────
// Resize the canvas (or use the viewport addon) to cross 1024px: desktop docks
// the rail; tablet/mobile use the hamburger → MenuDrawer. The route/IA is the
// same at every size — only the shell adapts.
export const ResponsiveApp = {
  name: 'Assembled app (Primary / Secondary / Tertiary)',
  render: () => {
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
      >
        {/* Ask AI opens the chat panel (same behaviour as the Application Layout). */}
        <AiChatPanel open={chatOpen} onClose={() => setChatOpen(false)}>
          <div style={{ padding: 24, fontSize: 13, color: '#616161' }}>
            AI chat panel content lives here.
          </div>
        </AiChatPanel>
        {view === 'home' && <Home onOpenModule={navigate} />}
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
  },
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
