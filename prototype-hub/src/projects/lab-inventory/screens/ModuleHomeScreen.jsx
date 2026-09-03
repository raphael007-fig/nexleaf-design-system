// ── Module home — role-gated launcher (§3) ─────────────────────────────────────
// Clone of Patterns/Module Navigation's Home (primary level: NO side nav), with
// the §3 gating rule applied: a module card renders ONLY when the persona's
// scope has data/access behind it. Hidden ≠ empty — an out-of-scope surface
// never shows a broken zero-shell; it simply is not there.
import { AppShell } from '@ds/components/AppShell/AppShell.jsx';
import { NavCard } from '@ds/components/NavCard/NavCard.jsx';
import { Card, CardLayoutType6 } from '@ds/components/Card/Card.jsx';
import { Cell } from '@ds/components/Cell/Cell.jsx';
import { Badge } from '@ds/components/Badge/Badge.jsx';
import { PolarisIconImg } from '@ds/components/PolarisIcon/PolarisIcon.jsx';
import { Illustration } from '@ds/foundation/illustrations/index.jsx';
import { MODULES, MODULE_HOME_ITEM } from '@ds/foundation/moduleNavs.jsx';
import { TEXT_DEFAULT, TEXT_SUBDUED } from '@ds/tokens/index.js';
import { PERSONAS, rowsForPersona } from './labData.js';

const HOME_CRUMB = { ...MODULE_HOME_ITEM, iconOnly: true };

const MODULE_ILLOS = {
  inventory: 'equipment-management',
  temperature: 'monitoring',
  learning: 'training',
  reports: 'reports-hub',
  facilities: 'facility-management',
  forecasting: 'forecasting',
  events: 'events',
  transport: 'coldtrace-transport',
  service: 'health-tech-hub',
};

const IcoScanRows = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 6h2M4 10h2M4 14h2M8 6h8M8 10h8M8 14h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IcoGauge = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3 14a7 7 0 1 1 14 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="m10 14 3.2-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="10" cy="14" r="1.4" fill={color} />
  </svg>
);

/**
 * @param {'lead'|'tech'|'qa'} persona
 * @param {(moduleId:string)=>void} [onOpenModule]
 */
export function ModuleHomeScreen({ persona = 'lead', onOpenModule }) {
  const personaDef = PERSONAS.find((p) => p.id === persona) || PERSONAS[0];
  const visible = MODULES.filter((m) => personaDef.modules.includes(m.id));
  const hiddenCount = MODULES.length - visible.length;
  const scopeRows = rowsForPersona(persona);

  return (
    <AppShell
      level="primary"
      navItems={[MODULE_HOME_ITEM]}
      activeItemId="home"
      breadcrumbs={[HOME_CRUMB]}
      contentWidth="full"
    >
      <div style={{ padding: '24px 16px 32px', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 450, color: TEXT_SUBDUED }}>
            Hey there 😊 — signed in as {personaDef.label} ({personaDef.grant})
          </p>
          <h1 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 700, lineHeight: '32px', letterSpacing: '-0.2px', color: TEXT_DEFAULT }}>
            What would you like to do today?
          </h1>
        </div>

        {/* Action row — scoped: only what this persona can actually act on. */}
        <div className="nx-home-grid" style={{ marginBottom: 16 }}>
          <div className="nx-home-grid__tiles">
            <CardLayoutType6 icon={<IcoScanRows />} title="Your Lab Register">
              <Cell
                icon={<IcoScanRows />}
                iconTone="neutral"
                title={`${scopeRows.length} equipment records in your scope`}
                description={personaDef.facilities.length > 1
                  ? `Across all ${personaDef.facilities.length} NPHL facilities`
                  : 'Your facility only — other labs are outside your scope'}
                hasChevron
                onClick={() => onOpenModule?.('inventory')}
                ariaLabel="Open the lab register"
              />
            </CardLayoutType6>
            {personaDef.modules.includes('temperature') && (
              <CardLayoutType6 icon={<IcoGauge />} title="Cold Room" badge="In range">
                <Cell
                  icon={<IcoGauge />}
                  iconTone="neutral"
                  title="Walk-in Cold Room — 5.7 °C"
                  description="Central Cold Store · 4 sensors reporting"
                  hasChevron
                  onClick={() => onOpenModule?.('inventory')}
                  ariaLabel="Open the cold room record"
                />
              </CardLayoutType6>
            )}
          </div>
        </div>

        {/* Module grid — §3: no data in scope = the card does not render. */}
        <div className="nx-home-grid">
          <div className="nx-home-grid__tiles">
            {visible.map((m) => (
              <NavCard
                key={m.id}
                layout="home"
                title={m.title}
                media={<Illustration name={MODULE_ILLOS[m.id]} size={80} />}
                onClick={() => onOpenModule?.(m.id)}
                ariaLabel={m.title}
              />
            ))}
          </div>
        </div>

        {hiddenCount > 0 && (
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
            <Card style={{ maxWidth: 560 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <Badge size="small">{`${hiddenCount} modules hidden`}</Badge>
                <span style={{ fontSize: 12, lineHeight: '18px', color: TEXT_SUBDUED }}>
                  Surfaces with no data or access in your scope don’t appear — they are hidden,
                  not empty. Ask your administrator if you need one.
                </span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
}
