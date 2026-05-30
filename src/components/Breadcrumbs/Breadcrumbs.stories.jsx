import { useState } from 'react';
import { Breadcrumbs } from './Breadcrumbs.jsx';
import { PolarisIconImg } from '../PolarisIcon/PolarisIcon.jsx';

export default {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'padded' },
};

// ── Demo data ────────────────────────────────────────────────────────────
// The Home crumb is icon-only across the project. The label string stays
// on each item so it's still the accessible name (aria-label + title).
const HOME = {
  id: 'home',
  label: 'Home',
  icon: <PolarisIconImg name="HomeFilledIcon" size={20} color="#303030" />,
  iconOnly: true,
};

const TRAIL_1 = [
  HOME,
];
const TRAIL_2 = [
  HOME,
  { label: 'Equipment Management' },
];
const TRAIL_3 = [
  HOME,
  { label: 'Equipment Management' },
  { label: 'ColdChain Equipment' },
];
const TRAIL_4 = [
  HOME,
  { label: 'Equipment Management' },
  { label: 'View Equipment details' },
  { label: 'ColdChain Equipment' },
];
const TRAIL_6 = [
  HOME,
  { label: 'Equipment Management' },
  { label: 'ColdChain Equipment' },
  { label: 'View Equipment details' },
  { label: 'View RTMD Details' },
  { label: 'Facility' },
];

// ── Basic stories ────────────────────────────────────────────────────────
export const OneLevel = {
  name: '1 level — Home only',
  render: () => <Breadcrumbs items={TRAIL_1} onNavigate={() => {}} />,
};

export const TwoLevels = {
  name: '2 levels',
  render: () => <Breadcrumbs items={TRAIL_2} onNavigate={() => {}} />,
};

export const ThreeLevels = {
  name: '3 levels (no collapse)',
  render: () => <Breadcrumbs items={TRAIL_3} onNavigate={() => {}} />,
};

export const FourLevelsCollapsed = {
  name: '4 levels — collapsed with "…"',
  render: () => <Breadcrumbs items={TRAIL_4} onNavigate={() => {}} />,
};

export const SixLevelsCollapsed = {
  name: '6 levels — "…" with popover of 3 hidden items',
  render: () => <Breadcrumbs items={TRAIL_6} onNavigate={() => {}} />,
};

// ── Screenshot reference — all five rows from the spec ───────────────────
export const ProgressionFromScreenshot = {
  name: 'Progression — matches design spec',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, fontFamily: 'Inter, sans-serif' }}>
      <Breadcrumbs items={TRAIL_1} onNavigate={() => {}} />
      <Breadcrumbs items={TRAIL_2} onNavigate={() => {}} />
      <Breadcrumbs items={TRAIL_3} onNavigate={() => {}} />
      <Breadcrumbs items={TRAIL_4} onNavigate={() => {}} />
      <Breadcrumbs items={TRAIL_6} onNavigate={() => {}} />
    </div>
  ),
};

// ── Live "reset / step back" behavior ────────────────────────────────────
// Clicking any crumb truncates the trail to that point. Clicking Home
// resets to just [Home]. This is the canonical consumer pattern.
export const LiveNavigation = {
  name: 'Live — click any crumb to reset trail',
  render: () => {
    const FULL = [
      HOME,
      { label: 'Equipment Management' },
      { label: 'ColdChain Equipment' },
      { label: 'View Equipment details' },
      { label: 'View RTMD Details' },
      { label: 'Facility' },
    ];
    const [trail, setTrail] = useState(FULL);

    function navigate(index) {
      // Truncate trail so the clicked crumb becomes the new "current"
      setTrail(trail.slice(0, index + 1));
    }

    function deeper() {
      const next = FULL[trail.length];
      if (next) setTrail([...trail, next]);
    }

    function reset() { setTrail(FULL); }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Inter, sans-serif' }}>
        <Breadcrumbs items={trail} onNavigate={navigate} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={deeper}
            disabled={trail.length === FULL.length}
            style={{
              padding: '8px 16px', borderRadius: 8,
              background: trail.length === FULL.length ? 'rgba(0,0,0,0.06)' : '#ffffff',
              border: '1.5px solid #c9c9c9',
              cursor: trail.length === FULL.length ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
              color: trail.length === FULL.length ? '#b5b5b5' : '#303030',
            }}>
            Go deeper
          </button>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: '8px 16px', borderRadius: 8, background: '#ffffff',
              border: '1.5px solid #c9c9c9', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#303030',
            }}>
            Restore full trail
          </button>
        </div>
        <div style={{ fontSize: 12, color: '#616161', lineHeight: '18px' }}>
          Trail depth: {trail.length} · Last clicked crumb becomes the new "current". Clicking <strong>Home</strong> resets entirely.
        </div>
      </div>
    );
  },
};

// ── Interaction states reference ─────────────────────────────────────────
export const InteractionStates = {
  name: 'Interaction states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'Inter, sans-serif' }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
          Default
        </div>
        <Breadcrumbs items={TRAIL_3} onNavigate={() => {}} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
          Collapsed (hover the "…")
        </div>
        <Breadcrumbs items={TRAIL_6} onNavigate={() => {}} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
          Disabled (whole component)
        </div>
        <Breadcrumbs items={TRAIL_6} onNavigate={() => {}} disabled />
      </div>
    </div>
  ),
};

// ── Loading skeleton ─────────────────────────────────────────────────────
export const Loading = {
  name: 'Loading',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'Inter, sans-serif' }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
          Loading — skeleton placeholders
        </div>
        <Breadcrumbs items={TRAIL_3} loading onNavigate={() => {}} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
          Loaded — for comparison
        </div>
        <Breadcrumbs items={TRAIL_3} onNavigate={() => {}} />
      </div>
    </div>
  ),
};

// ── onSelect (preferred) — uses id from item ─────────────────────────────
export const OnSelectCallback = {
  name: 'onSelect (preferred API)',
  render: () => {
    const FULL = [
      HOME,
      { id: 'equipment', label: 'Equipment Management' },
      { id: 'coldchain', label: 'ColdChain Equipment' },
      { id: 'details',   label: 'View Equipment details' },
    ];
    const [trail, setTrail] = useState(FULL);
    const [lastId, setLastId] = useState(null);

    function handleSelect(id, item) {
      setLastId(id);
      const idx = trail.findIndex(t => t.id === id);
      if (idx >= 0) setTrail(trail.slice(0, idx + 1));
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Inter, sans-serif' }}>
        <Breadcrumbs items={trail} onSelect={handleSelect} />
        <div style={{ fontSize: 12, color: '#616161' }}>
          Last selected id: <code>{lastId ?? '—'}</code>
        </div>
        <button
          type="button"
          onClick={() => { setTrail(FULL); setLastId(null); }}
          style={{
            alignSelf: 'flex-start',
            padding: '8px 16px', borderRadius: 8, background: '#ffffff',
            border: '1.5px solid #c9c9c9', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#303030',
          }}>
          Restore full trail
        </button>
      </div>
    );
  },
};

// ── Custom collapse threshold ────────────────────────────────────────────
export const CustomCollapseThreshold = {
  name: 'Custom collapseAfter={5}',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ fontSize: 12, color: '#616161' }}>
        4 items with <code>collapseAfter=5</code> → no collapse (rendered in full).
      </div>
      <Breadcrumbs items={TRAIL_4} onNavigate={() => {}} collapseAfter={5} />
      <div style={{ fontSize: 12, color: '#616161', marginTop: 8 }}>
        6 items with <code>collapseAfter=5</code> → collapses.
      </div>
      <Breadcrumbs items={TRAIL_6} onNavigate={() => {}} collapseAfter={5} />
    </div>
  ),
};
