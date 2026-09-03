// ── LabShell — the one shell wrapper every Lab MVP screen goes through ────────
// Ratified nav-visibility rules:
//   primary   → no side nav (module home / launcher)
//   secondary → full scoped nav (the Inventory Management module tree)
//   tertiary  → desktop rail only; top bar hidden on mobile (AppShell owns it)
// Breadcrumb structure: Home › [Module] › [Section] (› subsection) — the module
// crumb is injected because the scoped tree can't produce it (same trick as
// Patterns/Module Navigation).
import { AppShell } from '@ds/components/AppShell/AppShell.jsx';
import { PolarisIconImg } from '@ds/components/PolarisIcon/PolarisIcon.jsx';
import { navItemsForModule } from '@ds/foundation/moduleNavs.jsx';

export const HOME_CRUMB = {
  id: 'home',
  label: 'Home',
  icon: <PolarisIconImg name="HomeFilledIcon" size={20} color="#303030" />,
  iconOnly: true,
};

// Label reconciliation (2026-09-03): the brief's §5.1 writes the trail as
// "Home › Inventory › Lab" — shorthand. The RATIFIED module registry
// (src/foundation/moduleNavs.jsx) names the module "Inventory Management" and
// the nav item "Lab Equipment", and the registry outranks a brief's shorthand
// (same rule as "a frame Raphael touched outranks the written spec"). If the
// short labels are wanted, they change in moduleNavs.jsx — one line — not here.
const MODULE_CRUMB = { id: '__module', label: 'Inventory Management' };
const LAB_CRUMB = { id: 'lab', label: 'Lab Equipment' };

const INVENTORY_NAV = navItemsForModule('inventory');

/**
 * @param {'secondary'|'tertiary'} [level]
 * @param {Array<{id,label}>} [trail]  Crumbs after Home › Inventory Management › Lab Equipment.
 * @param {(id:string)=>void} [onCrumb]  Breadcrumb / nav selection (prototype: usually a state jump).
 */
export function LabShell({ level = 'secondary', trail = [], onCrumb, children }) {
  const breadcrumbs = [HOME_CRUMB, MODULE_CRUMB, LAB_CRUMB, ...trail];
  return (
    <AppShell
      level={level}
      navItems={INVENTORY_NAV}
      activeItemId="lab"
      onNavSelect={onCrumb}
      breadcrumbs={breadcrumbs}
      onBreadcrumbSelect={onCrumb}
      contentWidth="full"
    >
      <div style={{ padding: '0 16px 32px', boxSizing: 'border-box' }}>
        {children}
      </div>
    </AppShell>
  );
}
