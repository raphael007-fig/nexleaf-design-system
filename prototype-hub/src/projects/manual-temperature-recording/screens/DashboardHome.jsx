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
//   • the module tiles are NavCard layout="home";
//   • row content is Cell;
//   • icons are Polaris only, via PolarisIconImg.
import {
  CardLayoutType6, Cell, NavCard, TemperatureTasksCard, PolarisIconImg,
} from '@ds';

const ico = (name, color = '#616161') => <PolarisIconImg name={name} size={20} color={color} />;

// Module tiles, left→right, top→bottom exactly as drawn in 8127:118754.
// NOTE (divergence, deliberate): Figma uses bespoke illustrations for these
// tiles. Those assets live only in the Figma file, and the design system is
// Polaris-icons-only, so each tile carries its Polaris equivalent in a tinted
// disc. Logged on PD-36 rather than hand-drawing lookalike artwork.
const MODULES = [
  { id: 'inventory',   title: 'Inventory Management', icon: 'InventoryFilledIcon',       tint: '#eaf4ff' },
  { id: 'temperature', title: 'Temperature Monitoring', icon: 'ChartVerticalFilledIcon', tint: '#fff1e3' },
  { id: 'learning',    title: 'Learning Hub',         icon: 'NoteIcon',                  tint: '#e6f6f0' },
  { id: 'reports',     title: 'Reports',              icon: 'ClipboardCheckFilledIcon',  tint: '#eaf4ff' },
  { id: 'facilities',  title: 'Facility Registry',    icon: 'StoreFilledIcon',           tint: '#e6f6f0' },
  { id: 'forecasting', title: 'Forecasting',          icon: 'ChartVerticalFilledIcon',   tint: '#eaf4ff' },
  { id: 'events',      title: 'Events',               icon: 'CalendarIcon',              tint: '#fff1e3' },
  { id: 'transport',   title: 'ColdTrace Transport',  icon: 'DeliveryFilledIcon',        tint: '#e6f6f0' },
  { id: 'service',     title: 'Service Requests',     icon: 'SettingsFilledIcon',        tint: '#f1f1f1' },
];

const FOOTER_LINKS = [
  { id: 'analytics', label: 'Nexleaf Analytics',        icon: 'ChartVerticalFilledIcon' },
  { id: 'terms',     label: 'ColdTrace Terms of Service', icon: 'NoteIcon' },
  { id: 'privacy',   label: 'Privacy Policy',          icon: 'LockFilledIcon' },
];

function TileMedia({ icon, tint }) {
  return (
    <div style={{
      width: 64, height: 64, borderRadius: '50%', background: tint,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <PolarisIconImg name={icon} size={28} color="#303030" />
    </div>
  );
}

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
      {/* Greeting — 8127:118754 centres both lines above the card row. */}
      <div style={{ textAlign: 'center', padding: '32px 0 24px' }}>
        <div style={{ font: '400 13px/20px Inter, sans-serif', color: '#616161' }}>Hey there 😊,</div>
        <h1 style={{ margin: '4px 0 0', font: '700 28px/36px Inter, sans-serif', color: '#303030' }}>
          What would you like to do today?
        </h1>
      </div>

      {/* Three entry cards. 24px section rhythm per ApplicationLayout. */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 16, marginBottom: 24,
      }}>
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

        {/* The count badge, the tabs and the drawer all derive from `tasks`, so
            the card and its slide-over can never disagree — which is exactly
            the 10-vs-13 defect found in the Figma frames. */}
        <TemperatureTasksCard
          tasks={tasks}
          title="Today's Temperature Tasks"
          onRecord={onRecord}
          loading={loading}
        />
      </div>

      {/* Module launcher — 3 x 3 as drawn. */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 16, marginBottom: 24,
      }}>
        {MODULES.map((m) => (
          <NavCard
            key={m.id}
            layout="home"
            title={m.title}
            media={<TileMedia icon={m.icon} tint={m.tint} />}
            hasButton={false}
            onClick={() => onModule?.(m)}
            ariaLabel={m.title}
            loading={loading}
          />
        ))}
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
