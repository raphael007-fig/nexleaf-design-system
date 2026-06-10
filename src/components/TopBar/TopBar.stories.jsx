import { useState } from 'react';
import { TopBar } from './TopBar.jsx';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer.jsx';
import { PolarisIconImg } from '../PolarisIcon/PolarisIcon.jsx';
import {
  ToolbarMenuButton, ToolbarIconButton, ToolbarAskAiButton,
  ToolbarRegionSelector, ToolbarAvatar,
} from '../Toolbar/Toolbar.jsx';

export default {
  title: 'Components/Navigation/TopBar',
  component: TopBar,
  parameters: { layout: 'fullscreen' },
};

const TRAIL = [
  { id: 'home', label: 'Home', icon: <PolarisIconImg name="HomeFilledIcon" size={20} color="#303030" />, iconOnly: true },
  { id: 'inventory', label: 'Inventory Management' },
  { id: 'coldchain', label: 'ColdChain Equipment' },
  { id: 'hbc-80', label: 'Hairer-HBC-80 (IOM)' },
];

const frame = (label, node) => (
  <div style={{ marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
    <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', margin: '0 0 6px 4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
    <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>{node}</div>
  </div>
);

// ─── Progressive transition — all four states stacked ─────────────────────────
// One system collapsing by width: full → compressed breadcrumb → hidden, then
// Notification → drawer, then Profile → drawer. Control order never changes.
export const ProgressiveTransition = {
  name: 'Progressive transition (all states)',
  render: () => (
    <div style={{ padding: 24, background: '#f1f1f1' }}>
      {frame('Wide desktop / tablet — full breadcrumb + Bell + Profile',
        <TopBar state="wide" breadcrumbs={TRAIL} safeArea={false} onMenu={() => {}} />)}
      {frame('Medium tablet — compressed breadcrumb (Home / … / current)',
        <TopBar state="medium" breadcrumbs={TRAIL} safeArea={false} onMenu={() => {}} />)}
      {frame('Compact tablet — no breadcrumb, Bell kept, Profile → drawer',
        <TopBar state="compact" breadcrumbs={TRAIL} safeArea={false} onMenu={() => {}} />)}
      {frame('Mobile — no breadcrumb, Bell + Profile → drawer',
        <TopBar state="mobile" breadcrumbs={TRAIL} safeArea={false} onMenu={() => {}} />)}
    </div>
  ),
};

// ─── Live responsive (resize the canvas / viewport addon) ─────────────────────
export const Responsive = {
  name: 'Responsive (resize)',
  render: () => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('coldchain');
    return (
      <div style={{ minHeight: '100vh', background: '#f1f1f1' }}>
        <TopBar
          sticky
          breadcrumbs={TRAIL}
          onMenu={() => setOpen(true)}
          drawerOpen={open}
          onBreadcrumbSelect={(id) => setActive(id)}
        />
        <p style={{ padding: 24, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#616161' }}>
          Resize across 1024 / 900 / 768 to watch the breadcrumb compress then disappear,
          then Profile and Notification move into the drawer (open the menu to find them).
        </p>
        <MenuDrawer open={open} onClose={() => setOpen(false)} activeItemId={active} onSelect={(id) => { setActive(id); setOpen(false); }} />
      </div>
    );
  },
};

// Individual states ------------------------------------------------------------
export const Wide = { render: () => <TopBar state="wide" breadcrumbs={TRAIL} safeArea={false} onMenu={() => {}} /> };
export const Medium = { render: () => <TopBar state="medium" breadcrumbs={TRAIL} safeArea={false} onMenu={() => {}} /> };
export const Compact = { render: () => <TopBar state="compact" breadcrumbs={TRAIL} safeArea={false} onMenu={() => {}} /> };
export const Mobile = { render: () => <TopBar state="mobile" breadcrumbs={TRAIL} safeArea={false} onMenu={() => {}} /> };

// ─── Interaction states — the shared Toolbar controls ─────────────────────────
// The bar's controls are the shared Toolbar subcomponents (ToolbarMenuButton /
// ToolbarIconButton / ToolbarAskAiButton / ToolbarRegionSelector / ToolbarAvatar).
// They each drive hover / pressed / focus in JS internally (the Angular `nx-*`
// classes drive the same via :hover / :active / :focus-visible). We don't rebuild
// them — this story lays them out so the rest + active + disabled looks are
// visible side-by-side; hover/pressed are live (point at a control to see them).
const APPS = <PolarisIconImg name="AppsIcon" size={20} color="#303030" />;
const BELL = <PolarisIconImg name="NotificationIcon" size={20} color="#303030" />;

const stateCol = (label, node) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
    <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
    {node}
  </div>
);

export const States = {
  name: 'Interaction states',
  render: () => (
    <div style={{ padding: 24, background: '#f1f1f1', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Rest — every control as it sits in the bar. */}
      {stateCol('Rest (hover / focus / press are live)',
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <ToolbarMenuButton onClick={() => {}} ariaLabel="Open menu" />
          <ToolbarIconButton icon={APPS} ariaLabel="Apps" onClick={() => {}} />
          <ToolbarIconButton icon={BELL} ariaLabel="Notifications" onClick={() => {}} />
          <ToolbarAskAiButton onClick={() => {}} />
          <ToolbarRegionSelector countryCode="KE" value="Kenya" />
          <ToolbarAvatar initials="NA" alt="Profile" onClick={() => {}} />
        </div>
      )}
      {/* Active / expanded — the persistent "open" look (Ask AI panel open). */}
      {stateCol('Active (Ask AI panel open)',
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <ToolbarMenuButton onClick={() => {}} ariaLabel="Open menu" expanded />
          <ToolbarAskAiButton onClick={() => {}} active />
        </div>
      )}
      {/* Disabled — every control's non-interactive look. */}
      {stateCol('Disabled',
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <ToolbarMenuButton ariaLabel="Open menu" disabled />
          <ToolbarIconButton icon={APPS} ariaLabel="Apps" disabled />
          <ToolbarIconButton icon={BELL} ariaLabel="Notifications" disabled />
          <ToolbarAskAiButton disabled />
          <ToolbarRegionSelector countryCode="KE" value="Kenya" disabled />
        </div>
      )}
    </div>
  ),
};

// ─── Loading — breadcrumb / region / avatar become skeletons ──────────────────
// The data-bearing bits swap for shape-matching skeletons; the menu, logo,
// Ask AI, and app switcher stay as static chrome so the bar keeps its shape.
export const Loading = {
  name: 'Loading',
  render: () => (
    <div style={{ padding: 24, background: '#f1f1f1' }}>
      {frame('Wide — breadcrumb + region pill + avatar as skeletons',
        <TopBar state="wide" loading breadcrumbs={TRAIL} safeArea={false} onMenu={() => {}} />)}
      {frame('Compact — region pill + (bell) + skeletons, no breadcrumb',
        <TopBar state="compact" loading breadcrumbs={TRAIL} safeArea={false} onMenu={() => {}} />)}
    </div>
  ),
};
