import { useState } from 'react';
import { MenuDrawer, COLDTRACE_NAV_ITEMS } from './MenuDrawer.jsx';
import { Btn } from '../Btn/Btn.jsx';

export default {
  title: 'Patterns/Responsive/MenuDrawer',
  component: MenuDrawer,
  parameters: { layout: 'fullscreen' },
};

function DrawerDemo({ width, initialActive = 'coldchain' }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(initialActive);
  return (
    <div style={{ padding: 24, fontFamily: 'Inter, sans-serif' }}>
      <Btn variant="secondary" onClick={() => setOpen(true)}>Open menu</Btn>
      <p style={{ marginTop: 12, fontSize: 13, color: '#616161' }}>
        Active item: <strong>{active}</strong>
      </p>
      <MenuDrawer
        open={open}
        onClose={() => setOpen(false)}
        activeItemId={active}
        onSelect={(id) => { setActive(id); setOpen(false); }}
        width={width}
      />
    </div>
  );
}

// Mobile drawer — 84–88vw capped at 320px. Inventory auto-expands because the
// active item (coldchain) is one of its children.
export const Mobile = {
  name: 'Mobile (drawer-first)',
  render: () => <DrawerDemo />,
};

// Tablet drawer — slide-out overlay, wider panel.
export const Tablet = {
  name: 'Tablet (wider overlay)',
  render: () => <DrawerDemo width={360} initialActive="performance" />,
};

// Active parent (no active child) — Health Status selected at the top level.
export const TopLevelActive = {
  name: 'Top-level item active',
  render: () => <DrawerDemo initialActive="health-status" />,
};

// Interaction states — opens with an active child (coldchain), so Inventory is
// expanded and the active row carries the selected treatment. Hover/focus the
// other rows live to see the hover fill + brand-blue focus ring (owned by
// SideNavigation; the drawer doesn't re-implement row states).
export const States = {
  name: 'Interaction states',
  render: () => <DrawerDemo initialActive="coldchain" />,
};

// Loading — skeleton nav rows in place of the live list; the logo header and
// footer area stay intact so the panel doesn't reflow when data arrives.
function LoadingDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ padding: 24, fontFamily: 'Inter, sans-serif' }}>
      <Btn variant="secondary" onClick={() => setOpen(true)}>Open menu</Btn>
      <MenuDrawer open={open} onClose={() => setOpen(false)} loading />
    </div>
  );
}

export const Loading = {
  name: 'Loading',
  render: () => <LoadingDemo />,
};

export const Items = {
  name: 'Default nav tree (data)',
  render: () => (
    <pre style={{
      fontFamily: 'ui-monospace, monospace', fontSize: 12, color: '#303030',
      background: '#f7f7f7', padding: 16, borderRadius: 8, overflow: 'auto',
    }}>
      {JSON.stringify(COLDTRACE_NAV_ITEMS.map(i => ({
        id: i.id, label: i.label, children: i.children?.map(c => c.id),
      })), null, 2)}
    </pre>
  ),
};
