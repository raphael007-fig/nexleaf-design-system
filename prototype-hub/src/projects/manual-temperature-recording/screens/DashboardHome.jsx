import React from 'react';
// SHARED SCREEN — the ColdTrace home launcher, the entry point into Manual
// Temperature Recording. Built ONLY from Poltail components (see
// .claude/skills/ds-components-only). Reference: Figma 8127:118754 (home) and
// 8127:118912 (Today's Temperature Tasks drawer), section 9165:153497 on page
// "Daily Temp Recording".
//
// Composition notes, so nothing here is a hand-rolled lookalike:
//   • the three top cards are CardLayoutType6 (the Figma "Immediate Action"
//     card) and TemperatureTasksCard — the DS already ships the tasks widget
//     with the View All slide-over, Morning/Evening/Completed tabs and
//     pagination, so the drawer frame needs no new component;
//   • the module tiles are NavCard layout="home" on the .nx-home-grid, which is
//     the canonical home grid from Storybook "Patterns/Responsive/App Shell →
//     Assembled app (Primary / Secondary / Tertiary)" (src/global.css): a
//     container query that steps 3 -> 2 -> 1 and CAPS at three columns;
//   • row content is Cell;
//   • icons are Polaris only, via PolarisIconImg.
import {
  CardLayoutType6, Cell, NavCard, TemperatureTasksCard, PolarisIconImg,
} from '@ds';
// The home tile artwork ships WITH the design system (Foundation/Illustrations),
// it is not Figma-only — see src/foundation/illustrations/index.jsx.
import { Illustration } from '@ds/foundation/illustrations/index.jsx';

const ico = (name, color = '#616161') => <PolarisIconImg name={name} size={20} color={color} />;

// Module tiles, left->right, top->bottom exactly as the App Shell story orders
// them. Each tile's artwork is the shipped DS illustration (80x80, its own
// tinted disc baked in) pulled from the Foundation/Illustrations catalog.
//
// RETRACTION: this file previously carried a note claiming the illustrations
// "live only in the Figma file" and that the DS is "Polaris-icons-only", and
// hand-built a 64px tinted disc + Polaris glyph per tile. That was wrong on
// both counts. The artwork is in src/foundation/illustrations and the canonical
// tile is NavCard + <Illustration/>. Raphael caught it in the prototype.
const MODULES = [
  { id: 'inventory',   title: 'Inventory Management',   illo: 'equipment-management' },
  { id: 'temperature', title: 'Temperature Monitoring', illo: 'monitoring' },
  { id: 'learning',    title: 'Learning Hub',           illo: 'training' },
  { id: 'reports',     title: 'Reports',                illo: 'reports-hub' },
  { id: 'facilities',  title: 'Facility Registry',      illo: 'facility-management' },
  { id: 'forecasting', title: 'Forecasting',            illo: 'forecasting' },
  { id: 'events',      title: 'Events',                 illo: 'events' },
  { id: 'transport',   title: 'ColdTrace Transport',    illo: 'coldtrace-transport' },
  { id: 'service',     title: 'Service Requests',       illo: 'health-tech-hub' },
];

const FOOTER_LINKS = [
  { id: 'analytics', label: 'Nexleaf Analytics',        icon: 'ChartVerticalFilledIcon' },
  { id: 'terms',     label: 'ColdTrace Terms of Service', icon: 'NoteIcon' },
  { id: 'privacy',   label: 'Privacy Policy',          icon: 'LockFilledIcon' },
];

/**
 * DashboardHome
 *
 * @param {object}  tasks         {morning, evening, completed} — drives the tasks card AND its badge.
 * @param {object}  alert         {title, description} for the Action Required row.
 * @param {number}  urgentCount   Action Required badge count.
 * @param {fn}      onScan        Quick Action row.
 * @param {fn}      onRecord      A task row's Record button.
 * @param {fn}      onModule      A module tile.
 * @param {fn}      onViewAlerts  Action Required "View All".
 * @param {boolean} loading
 */
export default function DashboardHome({
  tasks,
  alert = {
    title: 'Temperature exceeds threshold',
    description: 'CCE-2024-NAI-100 | Pumwani Maternity Hospital',
  },
  urgentCount = 5,
  onScan,
  onRecord,
  onModule,
  onViewAlerts,
  loading = false,
}) {
  return (
    <>
      {/* Greeting — same two lines and same type ramp as the App Shell story's
          Home (24/700/32, -0.2px tracking over a 14/450 subdued line). */}
      <div style={{ textAlign: 'center', padding: '32px 0 0', marginBottom: 24 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 450, lineHeight: '20px', color: '#616161' }}>Hey there 😊,</p>
        <h1 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 700, lineHeight: '32px', letterSpacing: '-0.2px', color: '#303030' }}>
          What would you like to do today?
        </h1>
      </div>

      {/* Action row — the SAME .nx-home-grid as the module tiles below, so the
          three cards sit column-for-column on that grid (3 -> 2 -> 1). This is
          Home Layout 2 from the App Shell story: Quick Action, Temperature
          Tasks, Action Required, one card per column, in that order. */}
      <div className="nx-home-grid" style={{ marginBottom: 16 }}>
        <div className="nx-home-grid__tiles">
          <CardLayoutType6 icon={ico('BarcodeIcon')} title="Quick Action" loading={loading}>
            <Cell
              icon={ico('BarcodeIcon', '#303030')}
              iconTone="success"
              title="Scan QR Code or Enter Serial No."
              hasChevron
              onClick={onScan}
              ariaLabel="Scan a QR code or enter a serial number"
            />
          </CardLayoutType6>

          {/* The count badge, the tabs and the drawer all derive from `tasks`, so
              the card and its slide-over can never disagree — which is exactly
              the 10-vs-13 defect found in the Figma frames. */}
          <TemperatureTasksCard
            tasks={tasks}
            title="Today's Temperature Tasks"
            onRecord={onRecord}
            loading={loading}
          />
          <CardLayoutType6
            icon={ico('AlertTriangleIcon', '#8e1f0b')}
            title="Action Required"
            tone="critical"
            badge={`${urgentCount} Urgent Issues`}
            actionLabel="View All"
            onAction={onViewAlerts}
            loading={loading}
          >
            <Cell
              icon={ico('AlertTriangleIcon', '#8e1f0b')}
              iconTone="critical"
              title={alert.title}
              description={alert.description}
              hasChevron
              onClick={onViewAlerts}
              ariaLabel={alert.title}
            />
          </CardLayoutType6>
        </div>
      </div>

      {/* Module launcher — NavCard home tiles on .nx-home-grid. Capped at three
          columns on desktop and stepping 3 -> 2 -> 1 by CONTAINER width, so it
          is correct with the rail docked or not. (It used to be a
          `repeat(auto-fit, minmax(320px, 1fr))` grid, which uncapped to five
          columns on a wide screen and left an orphan row of four.) */}
      <div className="nx-home-grid" style={{ marginBottom: 24 }}>
        <div className="nx-home-grid__tiles">
          {MODULES.map((m) => (
            <NavCard
              key={m.id}
              layout="home"
              title={m.title}
              media={<Illustration name={m.illo} size={80} />}
              onClick={() => onModule?.(m)}
              ariaLabel={m.title}
              loading={loading}
            />
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap',
        padding: '8px 0 0',
      }}>
        {FOOTER_LINKS.map((l) => (
          <span key={l.id} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            font: '400 13px/20px Inter, sans-serif', color: '#616161',
          }}>
            <PolarisIconImg name={l.icon} size={16} color="#616161" />
            {l.label}
          </span>
        ))}
      </div>
    </>
  );
}
