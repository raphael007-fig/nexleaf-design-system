// ── Module-scoped navigation registry ─────────────────────────────────────────
// ONE entry per Home card. The Home page is a launcher (level="primary", no
// nav); stepping through a card puts you inside that module and the rail/drawer
// shows ONLY that module's world (level="secondary"). AppShell, useNavSync and
// MenuDrawer all take `navItems` as a prop, so switching modules is just
// handing the shell a different tree — no component changes.
//
// Scaling rule: adding module #10 = ONE entry here (id, title, nav) + a home
// tile. Scoped nav, breadcrumbs, drawer, and the title switcher come for free.
//
// Structural notes (ratified in the build brief):
//   • RTMDs moved OUT of Inventory into Temperature Monitoring.
//   • Performance moved OUT of Inventory into Reports.
//   • Provisional placements (deliberate defaults, one-line moves later):
//     Electrification → inventory · Event Logs → temperature · Maps → reports.
//   • `forecasting` nav is TBD (scope undecided); `facilities` is minimal.
//
// Item shape matches COLDTRACE_NAV_ITEMS: icons on top-level items and groups
// (PolarisIconImg); sub-items are text-only ({ id, label }).

import { PolarisIconImg } from '../components/PolarisIcon/PolarisIcon.jsx';

const ico = (name) => <PolarisIconImg name={name} size={20} color="#303030" />;

// Every module tree gets Home prepended (the escape hatch back to the launcher)
// via navItemsForModule() — keeps the registry pure module content.
export const MODULE_HOME_ITEM = { id: 'home', label: 'Home', icon: ico('HomeFilledIcon') };

export const MODULES = [
  {
    id: 'inventory',
    title: 'Inventory Management',
    nav: [
      { id: 'health-status', label: 'Health Status', icon: ico('HeartFilledIcon') },
      {
        id: 'inventory-group', label: 'Inventory', icon: ico('InventoryFilledIcon'),
        children: [
          { id: 'coldchain', label: 'Cold Chain Equipment' },
          { id: 'passive', label: 'Passive Equipment' },
          { id: 'solar', label: 'Solar Equipment' },
          { id: 'oxygen', label: 'Oxygen Equipment' },
          { id: 'lab', label: 'Lab Equipment' },
          { id: 'general', label: 'General Equipment' },
          { id: 'activity-log', label: 'Activity Log' },
        ],
      },
      { id: 'spare-parts', label: 'Spare Parts', icon: ico('WrenchIcon') },
      // Provisional: lives here (vs reports).
      { id: 'electrification', label: 'Electrification', icon: ico('FlashIcon') },
    ],
  },
  {
    id: 'temperature',
    title: 'Temperature Monitoring',
    nav: [
      // Moved in from inventory.
      { id: 'rtmds', label: 'RTMDs / Devices', icon: ico('WifiIcon') },
      { id: 'record-temperature', label: 'Record Temperature', icon: ico('ComposeIcon') },
      {
        id: 'summaries', label: 'Summaries', icon: ico('CalendarIcon'),
        children: [
          { id: 'summary-daily', label: 'Daily' },
          { id: 'summary-weekly', label: 'Weekly' },
          { id: 'summary-monthly', label: 'Monthly' },
        ],
      },
      // Provisional: lives here (vs events).
      { id: 'event-logs', label: 'Event Logs', icon: ico('ListBulletedIcon') },
    ],
  },
  {
    id: 'learning',
    title: 'Learning Hub',
    nav: [
      // Home / My Learning / Community are in-page tabs, not nav items.
      { id: 'training', label: 'Training', icon: ico('BookOpenIcon') },
      { id: 'learning-admin', label: 'Admin', icon: ico('ShieldPersonIcon') },
    ],
  },
  {
    id: 'reports',
    title: 'Reports',
    nav: [
      { id: 'reports-overview', label: 'Overview', icon: ico('ChartLineIcon') },
      { id: 'reports-hub', label: 'Reports Hub', icon: ico('FileIcon') },
      // Moved in from inventory.
      { id: 'performance', label: 'Performance', icon: ico('GaugeFilledIcon') },
      // Provisional: lives here (vs facilities).
      { id: 'maps', label: 'Maps', icon: ico('LocationIcon') },
    ],
  },
  {
    id: 'facilities',
    title: 'Facility Registry',
    // NET-NEW — minimal until scope is confirmed. Detail pages are tertiary.
    nav: [
      { id: 'facilities-list', label: 'Facilities', icon: ico('StoreIcon') },
    ],
  },
  {
    id: 'forecasting',
    title: 'Forecasting',
    // Nav TBD — scope not yet decided (stock/vaccine forecasting vs predictive
    // maintenance). The card + module shell exist so the door is real.
    nav: [],
  },
  {
    id: 'events',
    title: 'Events',
    nav: [
      {
        id: 'subscriptions', label: 'Subscriptions', icon: ico('NotificationIcon'),
        children: [
          { id: 'sub-escalated', label: 'Escalated Temperature' },
          { id: 'sub-weekly', label: 'Weekly Reports' },
          { id: 'sub-monthly', label: 'Monthly Reports' },
        ],
      },
      {
        id: 'sms-group', label: 'SMS', icon: ico('ChatIcon'),
        children: [
          { id: 'sms', label: 'SMS' },
          { id: 'gateways', label: 'Gateways' },
        ],
      },
    ],
  },
  {
    id: 'transport',
    title: 'ColdChain Transport',
    // Single page: list + trip detail (detail is tertiary).
    nav: [
      { id: 'transport-list', label: 'Transport', icon: ico('DeliveryIcon') },
    ],
  },
  {
    id: 'service',
    title: 'Service Requests',
    nav: [
      { id: 'tech-hub', label: 'Tech Hub Home', icon: ico('AppsIcon') },
      { id: 'service-requests', label: 'Service Requests', icon: ico('ClipboardChecklistIcon') },
      // Technician Performance lives here; "Add Technician" is an action, not nav.
      { id: 'service-admin', label: 'Admin View', icon: ico('TeamIcon') },
    ],
  },
];

export const MODULE_NAVS = Object.fromEntries(MODULES.map((m) => [m.id, m.nav]));

/** The tree the shell receives for a module: Home + the module's own items. */
export function navItemsForModule(moduleId) {
  return [MODULE_HOME_ITEM, ...(MODULE_NAVS[moduleId] || [])];
}

/** First navigable id in a module (groups are pages — Model 2). */
export function firstItemIdForModule(moduleId) {
  const nav = MODULE_NAVS[moduleId] || [];
  return nav.length ? nav[0].id : 'home';
}
