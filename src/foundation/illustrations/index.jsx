// ── Illustration Hub ──────────────────────────────────────────────────────────
// THE home for every illustration in the design system. All spot artwork lives
// in this folder and every surface pulls from here — no illustration files
// scattered inside component or page folders. Browse the full set in Storybook:
// Foundation/Illustrations.
//
// Two ways to consume:
//   1. <Illustration name="monitored" size={64} />          — via the catalog
//   2. import raw from '.../illustrations/monitored.svg?raw' — direct raw import
// Both are canonical; the catalog adds discoverability + a uniform renderer.
//
// Adding artwork: drop the kebab-case .svg here + ONE catalog entry below.

import illoEquipmentManagement from './equipment-management.svg?raw';
import illoMonitoring from './monitoring.svg?raw';
import illoTraining from './training.svg?raw';
import illoReportsHub from './reports-hub.svg?raw';
import illoAnalyticsReports from './analytics-reports.svg?raw';
import illoFacilityManagement from './facility-management.svg?raw';
import illoForecasting from './forecasting.svg?raw';
import illoEvents from './events.svg?raw';
import illoColdtraceTransport from './coldtrace-transport.svg?raw';
import illoHealthTechHub from './health-tech-hub.svg?raw';
import illoNoteSync from './note-sync.svg?raw';
import illoConnectMonitor from './connect-monitor.svg?raw';
import illoMonitored from './monitored.svg?raw';
import illoNotMonitored from './not-monitored.svg?raw';

/**
 * The catalog. `usage` says where the artwork is (or is meant to be) used so
 * designers/engineers can pick the right one without archaeology.
 */
export const ILLUSTRATIONS = {
  // ── Home module tiles (80×80 in NavCards) ─────────────────────────────────
  'equipment-management': { title: 'Equipment Management', svg: illoEquipmentManagement, usage: 'Home tile — Inventory Management module' },
  'monitoring':           { title: 'Monitoring',           svg: illoMonitoring,           usage: 'Home tile — Temperature Monitoring module' },
  'training':             { title: 'Training',             svg: illoTraining,             usage: 'Home tile — Learning Hub module' },
  'reports-hub':          { title: 'Reports Hub',          svg: illoReportsHub,           usage: 'Home tile — Reports module' },
  'analytics-reports':    { title: 'Analytics Reports',    svg: illoAnalyticsReports,     usage: 'Reports surfaces (alternate reports artwork)' },
  'facility-management':  { title: 'Facility Management',  svg: illoFacilityManagement,   usage: 'Home tile — Facility Registry module' },
  'forecasting':          { title: 'Forecasting',          svg: illoForecasting,          usage: 'Home tile — Forecasting module' },
  'events':               { title: 'Events',               svg: illoEvents,               usage: 'Home tile — Events module' },
  'coldtrace-transport':  { title: 'ColdTrace Transport',  svg: illoColdtraceTransport,   usage: 'Home tile — ColdChain Transport module' },
  'health-tech-hub':      { title: 'Health Tech Hub',      svg: illoHealthTechHub,        usage: 'Home tile — Service Requests module' },

  // ── AI chat ────────────────────────────────────────────────────────────────
  'note-sync':            { title: 'Note Sync',            svg: illoNoteSync,             usage: 'AiChat — media card artwork' },

  // ── Monitoring status (64×64 — Add Equipment monitoring-type choices) ─────
  'connect-monitor':      { title: 'Connect Monitor',      svg: illoConnectMonitor,       usage: 'Monitoring type — built-in / 3rd-party device (connectable)' },
  'monitored':            { title: 'Monitored',            svg: illoMonitored,            usage: 'Monitoring type — Nexleaf RTMD installed' },
  'not-monitored':        { title: 'Not Monitored',        svg: illoNotMonitored,         usage: 'Monitoring type — manual thermometer recording' },
};

/**
 * Illustration — uniform renderer for hub artwork.
 * Scales the SVG to `size` (square) exactly like the home tiles' media wrapper,
 * so every consumer gets identical sizing behavior.
 *
 * @param {keyof typeof ILLUSTRATIONS} name  Catalog id (kebab-case).
 * @param {number} [size=80]                 Rendered width/height in px.
 * @param {string} [ariaLabel]               Accessible name; omitted = decorative.
 */
export function Illustration({ name, size = 80, ariaLabel }) {
  const entry = ILLUSTRATIONS[name];
  if (!entry) return null;
  return (
    <span
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : 'true'}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, flexShrink: 0 }}
      ref={(node) => {
        if (!node) return;
        const el = node.querySelector('svg');
        if (el) { el.setAttribute('width', String(size)); el.setAttribute('height', String(size)); el.style.display = 'block'; }
      }}
      dangerouslySetInnerHTML={{ __html: entry.svg }}
    />
  );
}
