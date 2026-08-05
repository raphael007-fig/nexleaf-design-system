// ── Pages / RTMD Issue Details ────────────────────────────────────────────────
// Prototype of the revised "Issue Details" drawer for RTMD Details, per the
// Jul 2026 error-codes direction (Martin / Susan / Raphael):
//   • The diagnosis has ALREADY happened — no "Run Full Diagnostics" /
//     "Analyze Device". The drawer ends with "What would you like to do next?"
//   • Suspected issue is an expandable row — the short description (support
//     spreadsheet column C) reveals on interaction, not by default.
//   • Steps split into Recommended (remote steps — what support walks a nurse
//     through) and Advanced (in-person steps for technicians/biomeds),
//     Advanced collapsed by default and hidden when a code has none.
//   • Resources deep-link into the Training Hub (KB article per code) instead
//     of external PDFs; the section hides when no article exists.
//   • The same drawer must render a SPECIFIC code, a FAMILY (e.g. 1400
//     series), and codes with sparse content — switch scenarios below.
// Content comes from the support team's error-code spreadsheet (RTMD error
// codes → root cause / short description / remote steps / in-person steps).
//
// Composition notes: section headers are CardSectionTitle; steps are a
// semantic <ol> in a bordered list container (radius 8 / border-default /
// border-lighter separators — flush when nested inside the Advanced-steps
// Accordion); Training Hub resources are typed link rows (video / guide /
// article — anchor per the CardField link idiom, leading type icon, meta line
// naming type + destination) stacked in the same bordered container language,
// so the drawer keeps ONE elevation system (borders, not card shadows);
// actions sit in a ButtonGroup.

import { useState } from 'react';
import { Page } from '../../components/Page/Page.jsx';
import { Card, CardSectionTitle, CardField } from '../../components/Card/Card.jsx';
import { Badge, StatusBadge } from '../../components/Badge/Badge.jsx';
import { Btn, ButtonGroup } from '../../components/Btn/Btn.jsx';
import { Accordion } from '../../components/Accordion/Accordion.jsx';
import { SelectInput } from '../../components/SelectInput/SelectInput.jsx';
import { SlideOver } from '../../components/SlideOver/SlideOver.jsx';
import { Divider } from '../../components/Divider/Divider.jsx';
import {
  BG_PAGE, BG_SURFACE, BG_SURFACE_HOVER, BORDER_DEFAULT, BORDER_LIGHTER,
  TEXT_DEFAULT, TEXT_SUBDUED, FOCUS_RING, RADIUS_SM,
} from '../../tokens/index.js';

export default {
  title: 'Pages/RTMD Issue Details',
  parameters: { layout: 'fullscreen' },
};

// ─── Scenario data (support-team error-code spreadsheet) ─────────────────────
// Shape mirrors what the backend will return: one exact code, or one family.
// `resource` is the Training Hub KB article (absent for most codes today).

// Device-type fallback resource — the comprehensive troubleshooting guide
// Martin showed in the Training Hub ("has all of the possible issues in it").
// Resources resolve down a ladder that mirrors the error ladder: use the
// code-specific resource when one exists (only 1000 & 1200 today), fall back
// to the device type's comprehensive guide otherwise — most valuable exactly
// when confidence is low and we can't pinpoint the code.
const CTX_GUIDE = {
  type: 'pdf',
  title: 'CTX troubleshooting guide',
  description: 'Covers all CTX issues · PDF · Training Hub',
};

// Status education (not troubleshooting) — the one resource that legitimately
// belongs on equipment-Unknown A/B/C, where the actual fix lives on the
// associated RTMD. Ties to the "What does each status mean?" drawer on the
// RTMD Inventory. Single shared object so support edits it in one place.
const STATUS_EXPLAINER = {
  type: 'article',
  title: 'Understanding equipment statuses',
  description: 'What Functional, Faulty and Unknown mean · Training Hub',
};

const SCENARIOS = [
  {
    id: '1200',
    label: '1200: SD card / firmware (specific code, full content)',
    statusLabel: 'Faulty: Error code 1200',
    lastData: '6 days ago · 24 Jul 2026, 09:41',
    layers: { basestation: 'Faulty', sensor: 'Unknown', cce: 'Unknown' },
    layersNote: 'While the base station is down, its sensors and fridges can’t be assessed.',
    issueTitle: 'SD card or firmware issue',
    shortDescription:
      'CT5 logged an SD card error, or CTX logged a critical firmware fault, close to the last time data was sent.',
    recommended: [
      'Check the power cable is plugged in.',
      'Check the power adapter is plugged in and working.',
      'If the device stays offline after the power checks, contact support@coldtrace.org.',
    ],
    advanced: [
      'Copy the SD card files and share them with support@coldtrace.org.',
      'Update or replace the SD card.',
    ],
    resources: [
      {
        type: 'video',
        title: 'How to replace an SD card',
        description: 'Video · 2 min · Training Hub',
      },
      // The spreadsheet's KB link for 1200 is a Service Desk article —
      // external destination, opens in a new tab (back returns the user).
      {
        type: 'guide',
        title: 'SD card troubleshooting guide',
        description: 'Step-by-step guide with pictures · Service Desk',
        source: 'service-desk',
      },
    ],
  },
  {
    id: '1000',
    label: '1000: Never sent data (specific code, long steps)',
    statusLabel: 'Faulty: Error code 1000',
    lastData: 'Never. No data has been received from this device',
    layers: { basestation: 'Unknown', sensor: 'Unknown', cce: 'Unknown' },
    layersNote: 'Nothing has ever reported, so the whole monitoring chain is unassessed.',
    issueTitle: 'Device has never sent data',
    shortDescription:
      'No data has ever been received from this base station. Could be an incomplete or duplicate registration, an inactive or uncredited SIM, or a wrong APN setting.',
    recommended: [
      'Check the power cable is plugged in.',
      'Check the power adapter is plugged in and working.',
      'Take a photo of the IMEI and email it to support@coldtrace.org.',
      'If the device isn’t actually installed yet, contact support@coldtrace.org.',
    ],
    advanced: [
      'Check the SIM card is present and active.',
      'Force an upload from the device.',
      'Factory reset the device.',
      'Copy the SD card files and share them with support@coldtrace.org.',
      'Update or replace the SD card.',
    ],
    resources: [
      // Spreadsheet KB link for 1000 — Service Desk article, external.
      {
        type: 'article',
        title: 'Data not getting uploaded',
        description: 'Knowledge base article · Service Desk',
        source: 'service-desk',
      },
      CTX_GUIDE,
    ],
  },
  {
    id: '1400',
    label: '1400 series: Connectivity (family, no exact code)',
    statusLabel: 'Faulty: 1400 series (Connectivity)',
    lastData: '3 days ago · 27 Jul 2026, 16:05',
    layers: { basestation: 'Faulty', sensor: 'Unknown', cce: 'Unknown' },
    layersNote: 'While the base station is down, its sensors and fridges can’t be assessed.',
    issueTitle: 'Connectivity issue, exact cause not yet determined',
    shortDescription:
      'The device is having trouble staying connected. The system could not narrow this down to a single cause. It may be cellular signal strength or repeated failed network activations.',
    recommended: [
      'Check the signal strength trend over the last 2 days.',
      'Check data minutes received per day for a drop-off pattern.',
    ],
    advanced: [
      'Reposition the device or check for physical obstructions to cellular signal.',
      'Procure and fit an antenna extension if signal remains poor.',
    ],
    resources: [CTX_GUIDE],
  },
  {
    id: '1913',
    label: '1913: SIM not paid (specific code, sparse content)',
    statusLabel: 'Faulty: Error code 1913',
    lastData: '12 days ago · 18 Jul 2026, 11:22',
    layers: { basestation: 'Faulty', sensor: 'Unknown', cce: 'Unknown' },
    layersNote: 'While the base station is down, its sensors and fridges can’t be assessed.',
    issueTitle: 'SIM card is not paid',
    shortDescription:
      'SIM registration is failing, most likely because the line has been suspended for non-payment.',
    recommended: [
      'Contact the SIM/network provider to check the account and billing status.',
    ],
    advanced: [
      'Reactivate or replace the SIM once the account status is resolved.',
    ],
    resources: [CTX_GUIDE],
  },
  // ── Multiple issue FAMILIES — the third shape Nick's error tree returns.
  // Never stack raw codes (Susan: "displaying multiple error codes is
  // probably going to be very confusing"). Instead: a short ranked list of
  // expandable suspected issues, each owning its OWN steps, so users always
  // know which steps belong to which cause. Codes stay de-emphasized in the
  // row title; the status badge counts issues instead of listing codes.
  {
    id: 'multi-1300-1400',
    label: 'Multiple families: power (1300) or connectivity (1400)',
    statusLabel: 'Faulty: 2 suspected issues',
    lastData: '4 days ago · 26 Jul 2026, 05:58',
    layers: { basestation: 'Faulty', sensor: 'Unknown', cce: 'Unknown' },
    layersNote: 'While the base station is down, its sensors and fridges can’t be assessed.',
    issues: [
      {
        title: 'Power or battery issue',
        series: '1300 series',
        likelihood: 'Most likely',
        shortDescription:
          'The battery has averaged below 50% over the last two weeks. It may not be holding charge, or the power adapter may be failing.',
        recommended: [
          'Check the power cable is plugged in.',
          'Check the power adapter is plugged in and working.',
        ],
        advanced: [
          'Swap in a known-good micro-USB adapter to isolate the fault.',
          'Inspect the battery and replace it if puffed, swollen or degraded.',
        ],
      },
      {
        title: 'Connectivity issue',
        series: '1400 series',
        likelihood: 'Also possible',
        shortDescription:
          'The device may be struggling to reach the network: weak cellular signal, or repeated failed network activations.',
        recommended: [
          'Check the signal strength trend over the last 2 days.',
          'Check data minutes received per day for a drop-off pattern.',
        ],
        advanced: [
          'Reposition the device or check for physical obstructions to cellular signal.',
          'Procure and fit an antenna extension if signal remains poor.',
        ],
      },
    ],
    recommended: [],
    advanced: [],
    resources: [CTX_GUIDE],
  },
  // ── VERY LOW confidence — the honest degenerate case. Nothing fired
  // beyond "device stopped sending" (1000/1900 catch-all territory), so the
  // drawer shows ONE generic row + universal first steps instead of
  // speculative accordions. Confidence ladder: high = exact code (1200),
  // medium = one family (1400), low = ranked multi (1300/1400),
  // very low = this.
  {
    id: 'verylow-undetermined',
    label: 'Very low confidence: cause not yet determined',
    statusLabel: 'Faulty: Cause not determined',
    lastData: '11 days ago · 19 Jul 2026, 03:47',
    layers: { basestation: 'Faulty', sensor: 'Unknown', cce: 'Unknown' },
    layersNote: 'While the base station is down, its sensors and fridges can’t be assessed.',
    issueTitle: 'Device stopped reporting, cause not yet determined',
    shortDescription:
      'The device has stopped sending data, but the diagnostic checks could not narrow this down to a specific cause. Start with the universal checks below, and request service if the device stays offline.',
    recommended: [
      'Check the power cable is plugged in.',
      'Check the power adapter is plugged in and working.',
      'Force an upload from the device.',
      'If the device stays offline, contact support@coldtrace.org.',
    ],
    advanced: [
      'Check the SIM card is present and active.',
      'Factory reset the device.',
    ],
    resources: [CTX_GUIDE],
  },
  // ── SENSOR layer (2xxx) — from the functional-status tree. Basestation is
  // healthy; the fault is at the sensor, so the CCE goes Unknown. Steps come
  // from the spreadsheet's "broken sensor / probe" row (which the tree maps
  // to 2100/2140) — the 2xxx codes are the support team's next content gap.
  {
    id: '2100-sensor',
    label: '2100: Sensor faulty (sensor layer, basestation healthy)',
    statusLabel: 'Faulty: Error code 2100',
    lastData: '26 minutes ago · base station reporting normally',
    layers: { basestation: 'Functional', sensor: 'Faulty', cce: 'Unknown' },
    layersNote: 'The base station is healthy. The problem is at the sensor, so its fridge can’t be assessed.',
    issueTitle: 'Sensor issue',
    shortDescription:
      'The sensor has stopped sending data. It may be unplugged, have a damaged wire, be broken, or the sensor port may be damaged.',
    recommended: [
      'Check the sensor cable is plugged in and undamaged.',
      'Contact support@coldtrace.org to confirm the fault.',
    ],
    advanced: [
      'Arrange a replacement sensor cable or sensor.',
    ],
    resources: [CTX_GUIDE],
  },
  // ── Equipment (CCE) scenarios — Martin's "system" ask: the same drawer
  // serving fridges/solar, not just RTMDs. Unknown ≠ broken fridge; it's
  // usually a MONITORING problem, so the drawer explains why and surfaces
  // the associated RTMD as the cause.
  // The four Unknown reasons (Jill's list): A. associated RTMD faulty,
  // B. no data in the last 7 days, C. insufficient data, D. unmonitored.
  // Same drawer, dynamic copy — plus the RTMD card whenever one is linked.
  {
    id: 'eq-unknown-rtmd',
    kind: 'equipment',
    label: 'Equipment (CCE) Unknown A: associated RTMD is faulty',
    page: { title: 'Equipment Details', subtitle: 'Vestfrost VLS 054 · Martins Home' },
    pageBadge: { label: 'Unknown', tone: 'default' },
    summaryTitle: 'This equipment is marked as Unknown.',
    drawerTitle: 'Status Details',
    issueSectionTitle: 'Why is this happening?',
    statusLabel: 'Unknown: Monitoring device issue',
    statusTone: 'default',
    lastData: '5 days ago · 25 Jul 2026, 14:30',
    layers: { basestation: 'Faulty', sensor: 'Unknown', cce: 'Unknown' },
    layersNote: 'The chain is broken at the base station. The fridge itself may be fine.',
    issueTitle: 'We can’t confidently determine this equipment’s health',
    shortDescription:
      'The associated monitoring device (RTMD) is currently experiencing an issue, so ColdTrace is not receiving the temperature data needed to assess this equipment. This is a monitoring problem, not necessarily a fridge problem.',
    recommended: [],
    advanced: [],
    associatedDevice: {
      name: 'CTX Base Station',
      deviceId: '355026070228719',
      status: 'Faulty',
      issue: 'SIM connectivity issues',
    },
    resources: [STATUS_EXPLAINER],
  },
  {
    id: 'eq-unknown-nodata',
    kind: 'equipment',
    label: 'Equipment (CCE) Unknown B: no data in the last 7 days',
    page: { title: 'Equipment Details', subtitle: 'Vestfrost VLS 054 · Martins Home' },
    pageBadge: { label: 'Unknown', tone: 'default' },
    summaryTitle: 'This equipment is marked as Unknown.',
    drawerTitle: 'Status Details',
    issueSectionTitle: 'Why is this happening?',
    statusLabel: 'Unknown: No monitoring data',
    statusTone: 'default',
    lastData: '9 days ago · 21 Jul 2026, 07:12',
    layers: { basestation: 'Faulty', sensor: 'Unknown', cce: 'Unknown' },
    layersNote: 'The chain is broken at the base station. The fridge itself may be fine.',
    issueTitle: 'No monitoring data received in the last 7 days',
    shortDescription:
      'The associated RTMD has stopped sending data, so ColdTrace cannot assess this equipment’s health. This is a monitoring problem, not necessarily a fridge problem.',
    recommended: [],
    advanced: [],
    associatedDevice: {
      name: 'CTX Base Station',
      deviceId: '355026070228719',
      status: 'Faulty',
      issue: 'Not yet determined. Open the RTMD for diagnosis',
    },
    resources: [STATUS_EXPLAINER],
  },
  {
    id: 'eq-unknown-insufficient',
    kind: 'equipment',
    label: 'Equipment (CCE) Unknown C: insufficient data',
    page: { title: 'Equipment Details', subtitle: 'Vestfrost VLS 054 · Martins Home' },
    pageBadge: { label: 'Unknown', tone: 'default' },
    summaryTitle: 'This equipment is marked as Unknown.',
    drawerTitle: 'Status Details',
    issueSectionTitle: 'Why is this happening?',
    statusLabel: 'Unknown: Insufficient data (3000)',
    statusTone: 'default',
    lastData: '2 hours ago · intermittent over the past week',
    layers: { basestation: 'Functional', sensor: 'Functional', cce: 'Unknown' },
    layersNote: 'Monitoring is working. There just isn’t enough reliable data yet to assess the fridge.',
    issueTitle: 'Not enough reliable data to assess this equipment',
    shortDescription:
      'Monitoring data exists, but there is not enough reliable data to confidently determine this equipment’s health. Data has been arriving intermittently from the associated RTMD.',
    recommended: [],
    advanced: [],
    associatedDevice: {
      name: 'CTX Base Station',
      deviceId: '355026070228719',
      status: 'Functional',
      issue: 'Intermittent uploads, possible signal issue',
    },
    resources: [STATUS_EXPLAINER],
  },
  {
    id: 'eq-unknown-unmonitored',
    kind: 'equipment',
    label: 'Equipment (CCE) Unknown D: not monitored',
    page: { title: 'Equipment Details', subtitle: 'Haier HBC-80 · Martins Home' },
    pageBadge: { label: 'Unknown', tone: 'default' },
    summaryTitle: 'This equipment is marked as Unknown.',
    drawerTitle: 'Status Details',
    issueSectionTitle: 'Why is this happening?',
    statusLabel: 'Unknown: Not monitored',
    statusTone: 'default',
    issueTitle: 'This equipment is not connected to a monitoring device',
    shortDescription:
      'ColdTrace cannot automatically determine this equipment’s status because no RTMD is associated with it.',
    recommended: [
      'If this equipment should be monitored, associate an RTMD with it from the equipment settings.',
    ],
    advanced: [],
    associatedDevice: null,
    // D is the one Unknown reason whose fix is EQUIPMENT-level, so a resource
    // belongs here. A/B/C intentionally have none — their troubleshooting
    // (and resources) live on the associated RTMD's drawer, one home per
    // issue. Placeholder title until the support team writes the guide.
    resources: [
      {
        type: 'guide',
        title: 'Associating an RTMD with equipment',
        description: 'Setup guide · Training Hub',
      },
      {
        type: 'video',
        title: 'How to associate an RTMD',
        description: 'Video · 3 min · Training Hub',
      },
    ],
  },
  // ── Equipment FAULTY (3xxx) — the inverse of the Unknown story: the whole
  // monitoring chain is healthy, so this IS a real equipment problem. Steps
  // are placeholders pending support-team content for CCE codes.
  {
    id: 'eq-faulty-3100',
    kind: 'equipment',
    label: 'Equipment (CCE) Faulty: 3100 warm (monitoring healthy)',
    page: { title: 'Equipment Details', subtitle: 'Vestfrost VLS 054 · Martins Home' },
    pageBadge: { label: 'Faulty', tone: 'critical' },
    summaryTitle: 'This equipment is marked as Faulty.',
    drawerTitle: 'Status Details',
    issueSectionTitle: 'Why is this happening?',
    statusLabel: 'Faulty: Error code 3100',
    statusTone: 'critical',
    lastData: '18 minutes ago · reporting normally',
    layers: { basestation: 'Functional', sensor: 'Functional', cce: 'Faulty' },
    layersNote: 'The monitoring chain is healthy. This is an equipment problem, not a monitoring problem.',
    issueTitle: 'Fridge is running warm / hot alarms',
    shortDescription:
      'Temperature data shows this fridge running warm or triggering hot alarms over the past 7 days. Possible causes include holdover issues or a thermostat problem.',
    recommended: [
      'Check the fridge door is closed and sealing properly.',
      'Request service if hot alarms continue.',
    ],
    advanced: [],
    associatedDevice: null,
    resources: [],
  },
];

// ─── Drawer building blocks (thin compositions — no new visual CSS) ──────────

// Numbered steps as a semantic <ol>. Default renders inside a bordered list
// container (radius 8 / border-default, per the "list containers" convention);
// `flush` drops the border for use inside an Accordion body, which already
// provides the container.
function StepList({ steps, flush = false }) {
  return (
    <ol style={{
      listStyle: 'none', margin: 0, padding: 0,
      fontFamily: 'Inter, sans-serif',
      ...(flush ? null : {
        border: `1px solid ${BORDER_DEFAULT}`,
        borderRadius: RADIUS_SM,
        overflow: 'hidden',
        background: BG_SURFACE,
      }),
    }}>
      {steps.map((step, i) => (
        <li key={i} style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          padding: flush ? '10px 0' : '10px 12px',
          borderTop: i === 0 ? 'none' : `1px solid ${BORDER_LIGHTER}`,
        }}>
          <span aria-hidden="true" style={{
            fontSize: 13, fontWeight: 600, color: TEXT_SUBDUED,
            lineHeight: '20px', flexShrink: 0, minWidth: 16,
          }}>
            {i + 1}
          </span>
          <span style={{ fontSize: 13, fontWeight: 450, color: TEXT_DEFAULT, lineHeight: '20px' }}>
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

// Resource-type icons — inline SVG per the icon system (20×20, no packages).
const IcoPlayCircle = ({ size = 20, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="7.25" stroke={color} strokeWidth="1.5" />
    <path d="M8.5 7.5L12.5 10L8.5 12.5V7.5Z" fill={color} />
  </svg>
);
const IcoDocument = ({ size = 20, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5.5 3.25h6.19c.2 0 .39.08.53.22l2.31 2.31c.14.14.22.33.22.53v10.44c0 .41-.34.75-.75.75H5.5a.75.75 0 0 1-.75-.75V4c0-.41.34-.75.75-.75Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7.5 9h5M7.5 12h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const RESOURCE_ICONS = { video: IcoPlayCircle, guide: IcoDocument, article: IcoDocument, pdf: IcoDocument };

// External-destination affordance (Service Desk portal opens in a new tab —
// the chevron is reserved for in-app navigation like the Training Hub).
const IcoExternal = ({ size = 18, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M7 4.5H4.75A.75.75 0 0 0 4 5.25v8c0 .41.34.75.75.75h8a.75.75 0 0 0 .75-.75V11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10.5 4h3.5v3.5M13.75 4.25 8.75 9.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Training Hub deep links, as rows in ONE bordered list container — same
// container language as StepList, so mixed resource types (video / guide /
// article) stack without multiplying boxes. Each row is an anchor (per the
// CardField link idiom): leading type icon, title, meta line naming the type
// and destination, trailing chevron. Focus ring is inset so the container's
// overflow-hidden corners don't clip it.
function ResourceRow({ type, title, description, external, onClick, first }) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const Icon = RESOURCE_ICONS[type] || IcoDocument;
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick?.(); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={`${title} (${type}), opens in ${external ? 'the Service Desk portal in a new tab' : 'the Training Hub'}`}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px', textDecoration: 'none',
        borderTop: first ? 'none' : `1px solid ${BORDER_LIGHTER}`,
        background: hov ? BG_SURFACE_HOVER : BG_SURFACE,
        boxShadow: foc ? `inset ${FOCUS_RING}` : 'none', outline: 'none',
        transition: 'background-color 0.15s ease',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <span style={{ display: 'flex', flexShrink: 0 }}><Icon /></span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, flex: 1 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: TEXT_DEFAULT, lineHeight: '20px' }}>
          {title}
        </span>
        <span style={{ fontSize: 13, fontWeight: 450, color: TEXT_SUBDUED, lineHeight: '20px' }}>
          {description}
        </span>
      </span>
      {external ? (
        <span style={{ display: 'flex', flexShrink: 0 }}><IcoExternal /></span>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
          <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke={TEXT_SUBDUED} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </a>
  );
}

function ResourceList({ resources, onOpen }) {
  return (
    <div style={{
      border: `1px solid ${BORDER_DEFAULT}`, borderRadius: RADIUS_SM,
      overflow: 'hidden', background: BG_SURFACE,
    }}>
      {resources.map((r, i) => (
        <ResourceRow
          key={r.title}
          type={r.type}
          title={r.title}
          description={r.description}
          external={r.source === 'service-desk'}
          onClick={() => onOpen?.(r)}
          first={i === 0}
        />
      ))}
    </div>
  );
}

// The equipment ↔ RTMD relationship card: when equipment is Unknown because
// of its monitoring device, show the linked RTMD and route the user to its
// diagnosis. CardField pairs + StatusBadge in the shared bordered container.
function AssociatedDeviceCard({ device, onViewDetails }) {
  return (
    <div style={{
      border: `1px solid ${BORDER_DEFAULT}`, borderRadius: RADIUS_SM,
      background: BG_SURFACE, padding: 16,
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <CardField label="Monitoring Device" value={device.name} />
        <CardField label="ID (MAC or IMEI)" value={device.deviceId} />
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 0 0', minWidth: 0 }}>
          <span style={{
            fontSize: 13, fontWeight: 650, color: TEXT_DEFAULT,
            lineHeight: '20px', fontFamily: 'Inter, sans-serif',
          }}>
            Status
          </span>
          <span><StatusBadge status={device.status} /></span>
        </div>
        <CardField label="Possible Issue" value={device.issue} />
      </div>
      <div>
        <Btn variant="ghost" small onClick={onViewDetails}>View RTMD Details</Btn>
      </div>
    </div>
  );
}

// The tri-layer status strip from the ColdTrace Functional Status tree
// (Mural): every error code stamps BASESTATION → SENSOR → CCE, and a fault
// at one layer cascades UNKNOWN downstream. Surfacing all three connects
// "this device is broken" to "that's why the fridge shows Unknown" — and,
// inverted, "the chain is healthy, so this IS an equipment problem".
const LAYER_LABELS = [['basestation', 'Base Station'], ['sensor', 'Sensor'], ['cce', 'CCE']];
function MonitoringChain({ layers, note }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {LAYER_LABELS.map(([key, label]) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{
              fontSize: 12, fontWeight: 550, color: TEXT_SUBDUED,
              fontFamily: 'Inter, sans-serif',
            }}>
              {label}
            </span>
            <span><StatusBadge status={layers[key]} /></span>
          </div>
        ))}
      </div>
      {note && (
        <span style={{
          fontSize: 13, fontWeight: 450, color: TEXT_SUBDUED,
          lineHeight: '20px', fontFamily: 'Inter, sans-serif',
        }}>
          {note}
        </span>
      )}
    </div>
  );
}

// ─── The Issue Details drawer ────────────────────────────────────────────────

function IssueDetailsDrawer({ open, onClose, scenario }) {
  const [issueOpen, setIssueOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [chainOpen, setChainOpen] = useState(false);
  // Multi-family mode: several suspected issues, each with independently
  // expandable detail (steps scoped per issue, never pooled).
  const [openIssues, setOpenIssues] = useState(() => new Set());
  const multi = Array.isArray(scenario.issues) && scenario.issues.length > 0;
  const toggleIssue = (i) => setOpenIssues(prev => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });

  return (
    <SlideOver open={open} onClose={onClose} title={scenario.drawerTitle ?? 'Issue Details'} width={480}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Status — equipment scenarios use the Unknown (default) tone.
            "Last data received" is the one piece of history worth surfacing
            here; the full plot lives behind View Recent Data / View Logs. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CardSectionTitle title={scenario.kind === 'equipment' ? 'Equipment Status' : 'Device Status'} />
            <Badge tone={scenario.statusTone ?? 'critical'}>{scenario.statusLabel}</Badge>
          </div>
          {scenario.lastData && (
            <span style={{
              fontSize: 13, fontWeight: 450, color: TEXT_SUBDUED,
              lineHeight: '20px', fontFamily: 'Inter, sans-serif',
            }}>
              Last data received: {scenario.lastData}
            </span>
          )}
        </div>

        {/* Monitoring chain — the tri-layer contract from the functional-
            status tree, collapsed by default. The header carries a compact
            text summary so the chain stays scannable without expanding;
            expanding reveals the badges + the cascade explanation. Hidden
            when there's no chain (e.g. unmonitored equipment). */}
        {scenario.layers && (
          <Accordion
            title="Monitoring Chain"
            description={LAYER_LABELS.map(([k, label]) => `${label}: ${scenario.layers[k]}`).join(' · ')}
            open={chainOpen}
            onToggle={() => setChainOpen(o => !o)}
          >
            <MonitoringChain layers={scenario.layers} note={scenario.layersNote} />
          </Accordion>
        )}

        {/* Suspected issue(s) — short description reveals on interaction.
            Multi-family: ranked expandable rows ("Most likely" first), each
            owning its OWN recommended/advanced steps so the user always knows
            which steps belong to which cause. Codes stay de-emphasized in
            the row title; the badge above counts issues instead of listing
            codes. */}
        {multi ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CardSectionTitle title="Suspected Issues" />
            {scenario.issues.map((issue, i) => (
              <Accordion
                key={issue.series}
                title={`${issue.title} (${issue.series})`}
                description={`${issue.likelihood} · What does this mean?`}
                open={openIssues.has(i)}
                onToggle={() => toggleIssue(i)}
              >
                <p style={{
                  margin: 0, fontSize: 13, fontWeight: 450, color: TEXT_SUBDUED,
                  lineHeight: '20px', fontFamily: 'Inter, sans-serif',
                }}>
                  {issue.shortDescription}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <CardSectionTitle title="Recommended steps" />
                  <StepList steps={issue.recommended} flush />
                </div>
                {issue.advanced.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <CardSectionTitle title="Advanced steps (for technicians)" />
                    <StepList steps={issue.advanced} flush />
                  </div>
                )}
              </Accordion>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CardSectionTitle title={scenario.issueSectionTitle ?? 'Suspected Issue'} />
            <Accordion
              title={scenario.issueTitle}
              description="What does this mean?"
              open={issueOpen}
              onToggle={() => setIssueOpen(o => !o)}
            >
              <p style={{
                margin: 0, fontSize: 13, fontWeight: 450, color: TEXT_SUBDUED,
                lineHeight: '20px', fontFamily: 'Inter, sans-serif',
              }}>
                {scenario.shortDescription}
              </p>
            </Accordion>
          </div>
        )}

        {/* Equipment ↔ RTMD relationship — the cause, when the equipment's
            Unknown status traces back to its monitoring device */}
        {scenario.associatedDevice && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CardSectionTitle title="Associated Monitoring Device" />
            <AssociatedDeviceCard device={scenario.associatedDevice} onViewDetails={() => {}} />
          </div>
        )}

        {/* Recommended steps — the remote steps support walks anyone through;
            hidden when the fix lives elsewhere (e.g. on the associated RTMD) */}
        {scenario.recommended.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CardSectionTitle title="Recommended Steps" />
            <StepList steps={scenario.recommended} />
          </div>
        )}

        {/* Advanced steps — in-person, for technicians; hidden when none.
            Flush list: the Accordion body already provides the container. */}
        {scenario.advanced.length > 0 && (
          <Accordion
            title="Advanced steps"
            description="For technicians and biomed engineers"
            open={advancedOpen}
            onToggle={() => setAdvancedOpen(o => !o)}
          >
            <StepList steps={scenario.advanced} flush />
          </Accordion>
        )}

        {/* Helpful resources — Training Hub deep links (video / guide /
            article rows); the section hides when a code has none. */}
        {scenario.resources.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CardSectionTitle title="Helpful Resources" />
            <ResourceList resources={scenario.resources} onOpen={() => {}} />
          </div>
        )}

        <Divider />

        {/* Closing actions — the diagnosis already happened, so this is the
            only decision point. Request Service is the V1 action; Nexleaf AI
            stays supplementary. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <CardSectionTitle title="What would you like to do next?" />
          <ButtonGroup>
            <Btn variant="primary" onClick={() => {}}>Request Service</Btn>
            <Btn variant="secondary" onClick={() => {}}>Troubleshoot with Nexleaf AI</Btn>
          </ButtonGroup>
          {/* Martin's power-user ask, kept tertiary per the meeting: ghost
              link to the logs/plot view, pre-filtered to the diagnosis
              window. Own row below the actions so it reads as a quiet
              follow-on, not a third button (the plain/ghost variant has no
              horizontal padding, so it aligns flush with the content edge).
              Easy to remove — or gate to super users — if unused. */}
          {scenario.kind !== 'equipment' && (
            <div style={{ marginTop: 4 }}>
              <Btn variant="ghost" onClick={() => {}}>View Recent Data</Btn>
            </div>
          )}
        </div>

      </div>
    </SlideOver>
  );
}

// ─── Story: simplified RTMD Details page hosting the drawer ─────────────────

export const Drawer = {
  name: 'Issue Details Drawer',
  render: () => {
    const [scenarioId, setScenarioId] = useState('1200');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const scenario = SCENARIOS.find(s => s.id === scenarioId);

    return (
      <main
        aria-labelledby="rtmd-issue-details-title"
        style={{ background: BG_PAGE, minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 48px' }}>
          <h1 id="rtmd-issue-details-title" style={{
            position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
            overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0,
          }}>
            RTMD Details: Issue Details drawer
          </h1>

          <Page
            title={scenario.page?.title ?? 'RTMD Details'}
            subtitle={scenario.page?.subtitle ?? 'ID: 869616062905859 · CTX Base Station · Martins Home'}
            backAction={{ onAction: () => {} }}
            metadata={[scenario.pageBadge ?? { label: 'Faulty', tone: 'critical' }]}
            secondaryActions={[{ content: 'View Logs', onAction: () => {} }]}
            primaryAction={{ content: 'Add Device', onAction: () => {} }}
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>

            {/* Demo control — stands in for whichever payload the backend
                returns (exact code / family / sparse code). */}
            <div style={{ flex: '3 1 420px', minWidth: 0 }}>
              <Card>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <SelectInput
                    label="Demo scenario: error payload returned by the backend"
                    options={SCENARIOS.map(s => ({ id: s.id, label: s.label }))}
                    value={scenarioId}
                    onChange={e => setScenarioId(e.target.value)}
                    helpText="One drawer, three shapes: exact code, error family, sparse content."
                  />
                </div>
              </Card>
            </div>

            {/* The status summary card — the drawer's entry point, in the
                right-sidebar position it occupies on RTMD Details. */}
            <div style={{ flex: '1 1 300px', minWidth: 0 }}>
              <Card>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <CardSectionTitle title={scenario.summaryTitle ?? 'This item is marked as Faulty.'} />
                  <span style={{ fontSize: 13, fontWeight: 450, color: TEXT_SUBDUED, lineHeight: '20px' }}>
                    {scenario.statusLabel}
                  </span>
                  <div style={{ marginTop: 4 }}>
                    <Btn variant="secondary" small onClick={() => setDrawerOpen(true)}>
                      View More Details about this issue
                    </Btn>
                  </div>
                </div>
              </Card>
            </div>

          </div>
        </div>

        <IssueDetailsDrawer
          key={scenario.id}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          scenario={scenario}
        />
      </main>
    );
  },
};
