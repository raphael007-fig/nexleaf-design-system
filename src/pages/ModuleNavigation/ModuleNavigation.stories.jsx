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
import { Card, CardSectionTitle, CardField } from '../../components/Card/Card.jsx';
import { NavCard } from '../../components/NavCard/NavCard.jsx';
import { AiChatDemo } from '../../components/AiChat/AiChatDemo.jsx';
import { useNavSync } from '../../foundation/useNavSync.js';
import {
  MODULES, MODULE_HOME_ITEM, navItemsForModule, firstItemIdForModule,
} from '../../foundation/moduleNavs.jsx';
import { TEXT_DEFAULT, TEXT_SUBDUED } from '../../tokens/index.js';
// Home module-grid illustrations — shared with the other home surfaces.
import illoEquipment from '../ApplicationLayout/home-illustrations/equipment-management.svg?raw';
import illoMonitoring from '../ApplicationLayout/home-illustrations/monitoring.svg?raw';
import illoTraining from '../ApplicationLayout/home-illustrations/training.svg?raw';
import illoReports from '../ApplicationLayout/home-illustrations/reports-hub.svg?raw';
import illoFacility from '../ApplicationLayout/home-illustrations/facility-management.svg?raw';
import illoForecasting from '../ApplicationLayout/home-illustrations/forecasting.svg?raw';
import illoEvents from '../ApplicationLayout/home-illustrations/events.svg?raw';
import illoTransport from '../ApplicationLayout/home-illustrations/coldtrace-transport.svg?raw';
import illoHealthHub from '../ApplicationLayout/home-illustrations/health-tech-hub.svg?raw';

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
  const [chatOpen, setChatOpen] = useState(false);
  const module = MODULES.find((m) => m.id === moduleId) || null;
  const items = module ? navItemsForModule(module.id) : [MODULE_HOME_ITEM];

  // One nav engine over WHICHEVER module tree is active — breadcrumbs, labels,
  // and the sibling switcher are pure projections of (items, activeId).
  const nav = useNavSync(items, { home: HOME_CRUMB, initialId: 'home', groupsArePages: true });

  const goHome = () => { setModuleId(null); nav.setActiveId('home'); };
  const openModule = (id) => { setModuleId(id); nav.setActiveId(firstItemIdForModule(id)); };
  const select = (id) => {
    if (id === 'home') return goHome();
    // The injected module crumb → the module's landing (its first section).
    if (id === '__module') return nav.go(firstItemIdForModule(module.id));
    nav.go(id);
  };

  const isHome = module == null;

  // Breadcrumb STRUCTURE rule: Home › [Module] › [Section] (› subsection). The
  // scoped tree can't produce the module level itself, so it's injected after
  // the icon-only Home crumb; Breadcrumbs' own collapse rule handles 4+ levels.
  const breadcrumbs = isHome
    ? [HOME_CRUMB]
    : [nav.breadcrumbs[0], { id: '__module', label: module.title }, ...nav.breadcrumbs.slice(1)];

  return (
    <AppShell
      level={isHome ? 'primary' : 'secondary'}
      navItems={items}
      activeItemId={nav.activeId}
      onNavSelect={select}
      breadcrumbs={breadcrumbs}
      onBreadcrumbSelect={select}
      contentWidth="fluid"
      onAskAi={() => setChatOpen((o) => !o)}
      askAiActive={chatOpen}
    >
      <AiChatDemo open={chatOpen} onClose={() => setChatOpen(false)} />

      {isHome ? (
        <div>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 450, color: TEXT_SUBDUED }}>Hey there 😊,</p>
            <h1 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 700, lineHeight: '32px', letterSpacing: '-0.2px', color: TEXT_DEFAULT }}>
              What would you like to do today?
            </h1>
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
