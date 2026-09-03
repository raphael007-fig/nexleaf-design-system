// ── Module home — role-gated launcher (§3) ─────────────────────────────────────
// Clone of Patterns/Module Navigation's Home (primary level: NO side nav), with
// the §3 gating rule applied: a module card renders ONLY when the persona's
// scope has data/access behind it. Hidden ≠ empty — an out-of-scope surface
// never shows a broken zero-shell; it simply is not there.
import { AppShell } from '@ds/components/AppShell/AppShell.jsx';
import { NavCard } from '@ds/components/NavCard/NavCard.jsx';
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
        {/* Greeting — the ratified Home copy, verbatim. Content beyond the
            module grid (action cards etc.) is NOT invented here: the module's
            own Figma frames are the content reference, and none exist yet for
            the lab home. */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 450, color: TEXT_SUBDUED }}>Hey there 😊,</p>
          <h1 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 700, lineHeight: '32px', letterSpacing: '-0.2px', color: TEXT_DEFAULT }}>
            What would you like to do today?
          </h1>
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

        {/* Prototype note — hub annotation, not product UI. Explains what this
            state demonstrates so the gating reads as deliberate on review. */}
        <p style={{ marginTop: 32, textAlign: 'center', fontSize: 12, lineHeight: '18px', color: TEXT_SUBDUED }}>
          Prototype note · signed in as {personaDef.label} ({personaDef.grant}) —{' '}
          {scopeRows.length} records in scope{hiddenCount > 0
            ? `; ${hiddenCount} of ${MODULES.length} modules hidden because this scope has no data or access behind them (hidden, not empty)`
            : ''}.
        </p>
      </div>
    </AppShell>
  );
}
