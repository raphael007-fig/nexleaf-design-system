// ── Patterns / Module Navigation ──────────────────────────────────────────────
// The module-scoped navigation model, assembled end-to-end:
//
//   Home (primary — NO nav, 9 module cards)
//     └─ click a card → that module's page (secondary) where the rail/drawer
//        shows ONLY that module's items (MODULE_NAVS registry) — nav, drawer,
//        breadcrumbs, and the title switcher all follow the same tree.
//        Home (rail item or breadcrumb) returns to the launcher.
//
// No component changes — AppShell/useNavSync/MenuDrawer already take navItems
// as a prop; this section is the registry + switching. The existing App Shell
// assembled story keeps the original single tree until this model is ratified.

import { useState } from 'react';
import { AppShell } from '../../components/AppShell/AppShell.jsx';
import { Page } from '../../components/Page/Page.jsx';
import { Card, CardSectionTitle, CardField, CardLayoutType6 } from '../../components/Card/Card.jsx';
import { Cell } from '../../components/Cell/Cell.jsx';
import { NavCard } from '../../components/NavCard/NavCard.jsx';
import { TemperatureTasksCard } from '../../components/TemperatureTasksCard/TemperatureTasksCard.jsx';
import { ScanQrCodeBody } from '../ScanQrCode/ScanQrCodeBody.jsx';
import { AiChatDemo } from '../../components/AiChat/AiChatDemo.jsx';
import { NavigateColdtraceModal, NotificationsModal, AccountMenu } from './TopBarPanels.jsx';
import { useNavSync } from '../../foundation/useNavSync.js';
import {
  MODULES, MODULE_HOME_ITEM, navItemsForModule, firstItemIdForModule,
} from '../../foundation/moduleNavs.jsx';
import { TEXT_DEFAULT, TEXT_SUBDUED } from '../../tokens/index.js';
// Home module-grid illustrations — shared with the other home surfaces.
import illoEquipment from '../../foundation/illustrations/equipment-management.svg?raw';
import illoMonitoring from '../../foundation/illustrations/monitoring.svg?raw';
import illoTraining from '../../foundation/illustrations/training.svg?raw';
import illoReports from '../../foundation/illustrations/reports-hub.svg?raw';
import illoFacility from '../../foundation/illustrations/facility-management.svg?raw';
import illoForecasting from '../../foundation/illustrations/forecasting.svg?raw';
import illoEvents from '../../foundation/illustrations/events.svg?raw';
import illoTransport from '../../foundation/illustrations/coldtrace-transport.svg?raw';
import illoHealthHub from '../../foundation/illustrations/health-tech-hub.svg?raw';

export default {
  title: 'Patterns/Module Navigation',
  parameters: { layout: 'fullscreen' },
};

const MODULE_ILLOS = {
  inventory: illoEquipment,
  temperature: illoMonitoring,
  learning: illoTraining,
  reports: illoReports,
  facilities: illoFacility,
  forecasting: illoForecasting,
  events: illoEvents,
  transport: illoTransport,
  service: illoHealthHub,
};

const IcoScanRows = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 6h2M4 10h2M4 14h2M8 6h8M8 10h8M8 14h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
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
const IcoQr = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
    <rect x="12" y="3" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
    <rect x="3" y="12" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
    <path d="M12 12h2v2M16 12v5M12 16h2" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

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

// ── Feature-page placeholder — every nav selection lands somewhere real ──────
function FeaturePage({ module, sectionLabel, titleDisclosure }) {
  return (
    <>
      <Page flushTop title={sectionLabel} titleDisclosure={titleDisclosure} />
      <Card style={{ marginTop: 8 }}>
        <CardSectionTitle title={module.title} />
        <div style={{ display: 'flex', gap: 12 }}>
          <CardField label="Module" value={module.title} />
          <CardField label="Section" value={sectionLabel} />
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', color: TEXT_SUBDUED }}>
          Feature-page placeholder — the {sectionLabel} content for {module.title} lands
          here. The point of this canvas is the LEFT NAV: it shows only this module's
          items, and the breadcrumb + title switcher derive from the same tree.
        </p>
      </Card>
    </>
  );
}

// Forecasting has no nav yet (scope undecided) — its module page says so.
function TbdModulePage({ module }) {
  return (
    <>
      <Page flushTop title={module.title} />
      <Card style={{ marginTop: 8 }}>
        <CardSectionTitle title="Navigation scope TBD" />
        <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', color: TEXT_SUBDUED }}>
          {module.title}'s navigation isn't ratified yet (stock/vaccine forecasting vs
          predictive maintenance). The Home card and module shell are live so the door
          exists; add its tree in <code>src/foundation/moduleNavs.jsx</code> when the
          scope lands.
        </p>
      </Card>
    </>
  );
}

// ── The assembled app: Home launcher ⇄ 9 module shells ───────────────────────
// Breadcrumb home crumb — the RATIFIED icon-only Home (the rail item shows the
// label; the trail shows just the glyph).
const HOME_CRUMB = { ...MODULE_HOME_ITEM, iconOnly: true };

function ModuleNavigationApp() {
  const [moduleId, setModuleId] = useState(null);      // null = Home launcher
  const [scanOpen, setScanOpen] = useState(false);     // Scan QR Code page
  const [chatOpen, setChatOpen] = useState(false);
  // Top-bar icon panels (after the static Kenya country pill).
  const [appsOpen, setAppsOpen] = useState(false);        // apps grid → Navigate ColdTrace
  const [notifOpen, setNotifOpen] = useState(false);      // bell → Notifications
  const [acctAnchor, setAcctAnchor] = useState(null);     // avatar → account menu (anchored)
  const module = MODULES.find((m) => m.id === moduleId) || null;
  const items = module ? navItemsForModule(module.id) : [MODULE_HOME_ITEM];

  // One nav engine over WHICHEVER module tree is active — breadcrumbs, labels,
  // and the sibling switcher are pure projections of (items, activeId).
  const nav = useNavSync(items, { home: HOME_CRUMB, initialId: 'home', groupsArePages: true });

  const goHome = () => { setModuleId(null); setScanOpen(false); nav.setActiveId('home'); };
  const openModule = (id) => { setModuleId(id); setScanOpen(false); nav.setActiveId(firstItemIdForModule(id)); };
  // Deep-link: open a module directly at a specific section (Home widgets use it).
  const openSection = (modId, sectionId) => { setModuleId(modId); setScanOpen(false); nav.setActiveId(sectionId); };
  const select = (id) => {
    if (id === 'home') return goHome();
    // The injected module crumb → the module's landing (its first section).
    if (id === '__module') return nav.go(firstItemIdForModule(module.id));
    nav.go(id);
  };

  const isHome = module == null && !scanOpen;

  // Breadcrumb STRUCTURE rule: Home › [Module] › [Section] (› subsection). The
  // scoped tree can't produce the module level itself, so it's injected after
  // the icon-only Home crumb; Breadcrumbs' own collapse rule handles 4+ levels.
  const breadcrumbs = isHome
    ? [HOME_CRUMB]
    : scanOpen
      ? [HOME_CRUMB, { id: 'scan', label: 'Scan QR Code' }]
      : [nav.breadcrumbs[0], { id: '__module', label: module.title }, ...nav.breadcrumbs.slice(1)];

  return (
    <AppShell
      level={isHome ? 'primary' : 'secondary'}
      // Scan is a Home-level quick action — its rail scope is just Home.
      navItems={items}
      activeItemId={nav.activeId}
      onNavSelect={select}
      breadcrumbs={breadcrumbs}
      onBreadcrumbSelect={select}
      contentWidth="fluid"
      onAskAi={() => setChatOpen((o) => !o)}
      askAiActive={chatOpen}
      // Static country pill (set at onboarding) · apps grid · bell · avatar.
      onApps={() => setAppsOpen(true)}
      onNotification={() => setNotifOpen(true)}
      onProfile={(e) => setAcctAnchor({ current: e.currentTarget })}
    >
      <AiChatDemo open={chatOpen} onClose={() => setChatOpen(false)} />
      <NavigateColdtraceModal open={appsOpen} onClose={() => setAppsOpen(false)} onOpenModule={openModule} />
      <NotificationsModal open={notifOpen} onClose={() => setNotifOpen(false)} />
      <AccountMenu open={!!acctAnchor} onClose={() => setAcctAnchor(null)} anchorRef={acctAnchor} onSelect={() => {}} />

      {scanOpen ? (
        <ScanQrCodeBody
          onScan={() => openSection('inventory', 'coldchain')}
          onSubmit={() => openSection('inventory', 'coldchain')}
        />
      ) : isHome ? (
        <div>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 450, color: TEXT_SUBDUED }}>Hey there 😊,</p>
            <h1 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 700, lineHeight: '32px', letterSpacing: '-0.2px', color: TEXT_DEFAULT }}>
              What would you like to do today?
            </h1>
          </div>
          {/* Action row — pulled from Home Layout 2: Quick Action · Today's
              Temp. Tasks · Action Required, one per module-grid column, each
              deep-linking into its module. */}
          <div className="nx-home-grid" style={{ marginBottom: 16 }}>
            <div className="nx-home-grid__tiles">
              <CardLayoutType6 icon={<IcoScanRows />} title="Quick Action">
                <Cell
                  icon={<IcoQr />}
                  iconTone="neutral"
                  title="Scan QR Code or Enter Serial No."
                  onClick={() => setScanOpen(true)}
                  ariaLabel="Scan QR Code or Enter Serial No."
                />
              </CardLayoutType6>
              <TemperatureTasksCard onRecord={() => openSection('temperature', 'record-temperature')} />
              <CardLayoutType6
                tone="critical"
                icon={<IcoAlertCircle />}
                title="Action Required"
                badge="5 Urgent Issues"
                actionLabel="View All"
                onAction={() => openSection('inventory', 'health-status')}
              >
                <Cell icon={<IcoGauge />} iconTone="neutral" title="Temperature exceeds threshold" description="Incubator HC 1501-2023-001 | Main Laboratory" hasChevron onClick={() => openSection('inventory', 'health-status')} ariaLabel="Temperature exceeds threshold" />
              </CardLayoutType6>
            </div>
          </div>

          <div className="nx-home-grid">
            <div className="nx-home-grid__tiles">
              {MODULES.map((m) => (
                <NavCard
                  key={m.id}
                  layout="home"
                  title={m.title}
                  media={<HomeMedia svg={MODULE_ILLOS[m.id]} />}
                  onClick={() => openModule(m.id)}
                  ariaLabel={m.title}
                />
              ))}
            </div>
          </div>
        </div>
      ) : module.nav.length === 0 ? (
        <TbdModulePage module={module} />
      ) : (
        <FeaturePage
          module={module}
          sectionLabel={nav.labelFor(nav.activeId)}
          titleDisclosure={nav.titleDisclosureFor(nav.activeId, { onSelect: select })}
        />
      )}
    </AppShell>
  );
}

export const FullFlow = {
  name: 'Home → all 9 modules (assembled)',
  render: () => <ModuleNavigationApp />,
};
