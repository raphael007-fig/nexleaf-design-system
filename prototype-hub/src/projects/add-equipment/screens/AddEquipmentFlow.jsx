// ── Prototype B — Add Equipment flow (Ednah's edits) ──────────────────────────
// This is PROTOTYPE B's flow: a fork of the baseline (Prototype A, which lives
// in the design system as Pages/Add Equipment) reworked from Ednah's July 2026
// walkthrough. It lives HERE in the prototype app, not in the design system —
// it is exploratory prototype work, not a published DS pattern. It composes
// the real DS components via the @ds alias. Key differences from A:
//   • Third-party = manual capture only: one "device" step (creatable
//     Manufacturer + Device/model dropdowns, unique identifier + optional
//     sensor id). No integration / connection / pairing / access code.
//   • RTMD reordered facility-first: facility & contacts → select RTMD →
//     configure → assign sensor (real sensor serial) → confirm → details.
//   • Location capture is optional and never blocks configuration.
//   • Only the Nexleaf RTMD counts as automatic; everything else is manual.
//
// The flow is reached from (1) a failed serial-number search in Manual
// Temperature Recording, (2) an unassigned QR-code scan, or (3) Equipment
// Management → Add Equipment.
//
// ARCHITECTURE NOTE — this file is two layers, deliberately separable:
//   1. A generic ADDITION-FLOW WIZARD SYSTEM (content-agnostic): Page header +
//      Stepper + fixed-height card with pinned footer (StepFrame/useFixedFrame),
//      phase spines with micro-steps inside phases, visited-step tap
//      navigation, and secondary→tertiary shell-level switching.
//   2. The Add Equipment CONTENT: its phase spines (phasesFor) and step bodies.
// Any other "add X" flow (e.g. Add Solar Equipment, Figma 8061-292936) can
// reuse layer 1 by supplying its own phases + step bodies.
//
// Three concepts stay separate throughout: the EQUIPMENT record, the
// MONITORING DEVICE on it, and the INTEGRATION that (maybe) pulls its data.
// An equipment record can exist with a monitoring device and no integration —
// "not monitored by Nexleaf" is not "unmonitored".
//
// Pure composition — Card, Cell, Btn, Banner, Badge, Tag, Modal, RadioGroup,
// SelectInput, SearchSelect, TextInput, NumberInput, TextareaInput, Checkbox,
// DatePicker, Upload, Divider — no new visual primitives, all colors
// from tokens.

import { useState, useEffect, useRef } from 'react';
import { Page } from '@ds/components/Page/Page.jsx';
import { useIsMobile, useViewport } from '@ds/foundation/useViewport.js';
import { Card, CardSectionTitle } from '@ds/components/Card/Card.jsx';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { Banner } from '@ds/components/Banner/Banner.jsx';
import { Badge } from '@ds/components/Badge/Badge.jsx';
import { Tag } from '@ds/components/Tag/Tag.jsx';
import { Modal } from '@ds/components/Modal/Modal.jsx';
import { Cell } from '@ds/components/Cell/Cell.jsx';
import { Divider } from '@ds/components/Divider/Divider.jsx';
import { Checkbox } from '@ds/components/Checkbox/Checkbox.jsx';
import { RadioGroup } from '@ds/components/RadioButton/RadioButton.jsx';
import { TextInput } from '@ds/components/TextInput/TextInput.jsx';
import { NumberInput } from '@ds/components/NumberInput/NumberInput.jsx';
import { TextareaInput } from '@ds/components/TextareaInput/TextareaInput.jsx';
import { SelectInput } from '@ds/components/SelectInput/SelectInput.jsx';
import { SearchSelect, SearchSelectMulti } from '@ds/components/SearchSelect/SearchSelect.jsx';
import { Upload } from '@ds/components/Upload/Upload.jsx';
import { Stepper } from '@ds/components/Stepper/Stepper.jsx';
import { DateField } from '@ds/components/DateField/DateField.jsx';
import { Toast } from '@ds/components/Toast/Toast.jsx';
import { OptionCard } from '@ds/components/OptionCard/OptionCard.jsx';
import { SubmissionSuccessCard } from '@ds/components/SubmissionSuccessCard/SubmissionSuccessCard.jsx';
import { Illustration } from '@ds/foundation/illustrations/index.jsx';
import { ScanQrCodeBody } from '@ds/pages/ScanQrCode/ScanQrCodeBody.jsx';
import { PolarisIconImg } from '@ds/components/PolarisIcon/PolarisIcon.jsx';
import {
  TEXT_DEFAULT, TEXT_SUBDUED, TEXT_INFO, TEXT_CRITICAL, BG_INFO, BG_WARNING, BG_SUCCESS, BG_SURFACE, BG_SELECTED,
  BORDER_LIGHT, BORDER_INFO, BORDER_DEFAULT,
  COLOR_PRIMARY, COLOR_SUCCESS,
} from '@ds/tokens/index.js';

// ─── Reference data (prototype backend) ───────────────────────────────────────

// Equipment already registered in ColdTrace — the serial search matches
// against these. Order matters: stories reference EXISTING_SERIALS[1].
export const EXISTING_EQUIPMENT = [
  { serial: 'EQ1-001', name: 'Haier HBC-80 Vaccine Refrigerator', facility: 'Mombasa North Health Centre', region: 'Coast Region', county: 'Mombasa County', monitoring: 'Nexleaf RTMD', qr: 'QR-00412' },
  { serial: 'CCE-2214-KLF', name: 'B Medical TCW 3000 AC Refrigerator', facility: 'Likoni Sub-County Hospital', region: 'Coast Region', county: 'Mombasa County', monitoring: 'Manual recording', qr: 'QR-01118' },
  { serial: 'VF-2024-001234', name: 'Vestfrost MK 204 ILR Refrigerator', facility: 'Mbagathi County Referral Hospital', region: 'Nairobi Region', county: 'Nairobi County', monitoring: 'Nexleaf RTMD' },
  { serial: 'CCE-2024-MK114-002', name: 'Vestfrost MK 114 Vaccine Refrigerator', facility: 'Pumwani Maternity Hospital', region: 'Nairobi Region', county: 'Nairobi County', monitoring: 'Berlinger integration' },
  { serial: 'CCE-2024-MK114-014', name: 'Vestfrost MK 114 Vaccine Refrigerator', facility: 'Kenyatta National Hospital', region: 'Nairobi Region', county: 'Nairobi County', monitoring: 'Manual recording' },
  { serial: 'CCE-2024-MK144-001', name: 'Vestfrost MK 144 ILR Refrigerator', facility: 'Coast General Teaching & Referral Hospital', region: 'Coast Region', county: 'Mombasa County', monitoring: 'Nexleaf RTMD' },
];
export const EXISTING_SERIALS = EXISTING_EQUIPMENT.map((e) => e.serial);
export const ASSIGNED_QRS = EXISTING_EQUIPMENT.map((e) => e.qr).filter(Boolean);

export const RTMDS = [
  { id: 'rtmd-1', imei: '356938035643809', mac: 'DC:2C:26:0A:4F:12', model: 'ColdTrace 5', kind: 'CT5' },
  { id: 'rtmd-2', imei: '359871060312345', mac: 'DC:2C:26:0A:51:88', model: 'ColdTrace 5', kind: 'CT5' },
  { id: 'rtmd-3', imei: '352099001761481', mac: 'F0:9E:9E:11:23:C4', model: 'ColdTrace X', kind: 'CTX' },
];

// Sensor assignment is a DROPDOWN, never free text (Ednah, Aug 2026):
//   CTX — sensor serials are pre-fed into the system; type-to-filter and
//         assign an existing one.
//   CT5 — exactly four sensors, labelled A–D (D is ambient, not tied to a CCE).
const CTX_SENSORS = [
  'SEN-10021', 'SEN-10022', 'SEN-10036', 'SEN-10041', 'SEN-10057',
  'SEN-10063', 'SEN-10078', 'SEN-10084', 'SEN-10092', 'SEN-10105',
];
const CT5_SENSORS = ['Sensor A', 'Sensor B', 'Sensor C', 'Sensor D (ambient)'];

// supported = an automatic integration exists for this manufacturer today.
export const PROVIDERS = [
  { id: 'berlinger', label: 'Berlinger Fridge-tag / Q-tag', supported: true },
  { id: 'logtag',    label: 'LogTag', supported: true },
  { id: 'haier',     label: 'Haier Biomedical (built-in)', supported: true },
  { id: 'bmedical',  label: 'B Medical Systems (built-in)', supported: false },
  { id: 'elitech',   label: 'Elitech', supported: false },
  { id: 'other',     label: 'Other / not listed', supported: false },
];

export const FACILITIES = [
  { id: 'coast', label: 'Coast Region', children: [
    { id: 'coast-general', label: 'Coast General Teaching & Referral Hospital' },
    { id: 'mombasa-north', label: 'Mombasa North Health Centre' },
    { id: 'likoni', label: 'Likoni Sub-County Hospital' },
  ] },
  { id: 'nairobi', label: 'Nairobi Region', children: [
    { id: 'knh', label: 'Kenyatta National Hospital' },
    { id: 'mbagathi', label: 'Mbagathi County Referral Hospital' },
  ] },
  { id: 'nyanza', label: 'Nyanza Region', children: [
    { id: 'jaramogi', label: 'Jaramogi Oginga Odinga Teaching & Referral Hospital' },
  ] },
];

// Facility alarm contacts (prototype directory). A facility can have up to 5
// RTMD alarm contacts; new contacts created in the flow join this directory.
const OCCUPATIONS = ['Nurse', 'EPI Manager', 'Facility In-charge', 'Technician', 'Data Officer'];
const LANGUAGES = ['English', 'Swahili', 'French', 'Portuguese'];

// 50 directory contacts — long enough to exercise search and the 10-contact
// limit realistically. Deterministic phones/roles cycle through the lists.
const CONTACT_NAMES = [
  'John Zulu', 'Joseph Wambura', 'Johnson Waluza', 'Agness Waiganjo', 'Mary Achieng',
  'Peter Otieno', 'Grace Banda', 'Fatuma Hassan', 'Daniel Mwangi', 'Esther Phiri',
  'Samuel Kilonzo', 'Lucy Nyambura', 'Brian Ochieng', 'Amina Juma', 'Kondwani Mhango',
  'Beatrice Wanjiru', 'Elias Mtenga', 'Naomi Chirwa', 'Victor Kamau', 'Halima Said',
  'Chisomo Nkhoma', 'Janet Moraa', 'Emmanuel Ssemwanga', 'Rehema Mushi', 'Patrick Ngwira',
  'Caroline Atieno', 'Yusuf Mwakyusa', 'Tamanda Kachale', 'George Njoroge', 'Zainab Omar',
  'Blessings Kaunda', 'Winnie Adhiambo', 'Frank Massawe', 'Chikondi Mbewe', 'Dennis Kiprotich',
  'Salma Athumani', 'Mphatso Gondwe', 'Josephine Wairimu', 'Godfrey Lubega', 'Neema Msangi',
  'Limbani Chirambo', 'Pauline Nekesa', 'Abdallah Kombo', 'Thandiwe Moyo', 'Kevin Mutua',
  'Stella Kihoro', 'Baraka Mwamba', 'Ruth Nabirye', 'Isaac Cheruiyot', 'Dorothy Zimba',
];
const CONTACT_CODES = ['+254 7', '+255 7', '+265 9', '+256 7'];
export const ALARM_CONTACTS = CONTACT_NAMES.map((name, i) => ({
  id: `c${i + 1}`,
  name,
  phone: `${CONTACT_CODES[i % CONTACT_CODES.length]}${String(11 + i)} ${String(100 + ((i * 37) % 900)).padStart(3, '0')} ${String(100 + ((i * 61) % 900)).padStart(3, '0')}`,
  occupation: OCCUPATIONS[i % OCCUPATIONS.length],
  language: LANGUAGES[i % 2],
}));
const MAX_ALARM_CONTACTS = 10;

// Equipment Details data set — mirrors the production "Create New Equipment"
// modal: Equipment Information (make & model, serial, funding source),
// Installation Details (status, region + facility), Maintenance & Warranty
// (warranty years), QR Code.
const MAKE_MODELS = [
  'Vestfrost MK 144', 'Vestfrost MK 204', 'Vestfrost VLS 054 SDD',
  'Haier Biomedical HBC-80', 'Haier Biomedical HBD-116', 'Haier Biomedical HTC-112',
  'B Medical Systems TCW 40 SDD', 'B Medical Systems TCW 3000 AC',
  'Godrej GVR 51 Lite', 'Godrej GVR 100 AC',
  'Dometic TCW 2000 AC', 'Zero Appliances ZLF 30 AC',
];
// Equipment type is DERIVED from the make/model (populated from WHO PQS data)
// — the flow never asks fridge vs freezer (Ednah, Aug 2026).
const MAKE_MODEL_TYPES = {
  'Vestfrost MK 144': 'Vaccine Refrigerator',
  'Vestfrost MK 204': 'Vaccine Refrigerator',
  'Vestfrost VLS 054 SDD': 'Vaccine Refrigerator (solar)',
  'Haier Biomedical HBC-80': 'Vaccine Refrigerator',
  'Haier Biomedical HBD-116': 'Vaccine Freezer',
  'Haier Biomedical HTC-112': 'Vaccine Refrigerator',
  'B Medical Systems TCW 40 SDD': 'Vaccine Refrigerator (solar)',
  'B Medical Systems TCW 3000 AC': 'Vaccine Refrigerator',
  'Godrej GVR 51 Lite': 'Vaccine Refrigerator',
  'Godrej GVR 100 AC': 'Vaccine Refrigerator',
  'Dometic TCW 2000 AC': 'Vaccine Refrigerator',
  'Zero Appliances ZLF 30 AC': 'Vaccine Freezer',
};
const equipmentTypeOf = (makeModel) => MAKE_MODEL_TYPES[makeModel] || 'Unknown type';
const FUNDING_SOURCES = ['Gavi', 'UNICEF', 'Ministry of Health', 'World Bank', 'Global Fund', 'Government of Kenya', 'Other'];
const EQUIPMENT_STATUS = [
  { id: 'installed', label: 'Installed' },
  { id: 'not-installed', label: 'Not Installed' },
];
const POWER_SOURCES = ['Grid Electricity', 'Gas', 'Kerosene', 'Solar', 'Unpowered', 'Generator'];
const WARRANTY_YEARS = ['1 year', '2 years', '3 years', '5 years', '10 years', 'No warranty'];
const COMM_METHODS = ['Display only (read on device)', 'USB download', 'Bluetooth to phone app', 'SMS gateway', 'Manual export from vendor portal'];
const COMPARTMENTS = ['Fridge compartment (+2 to +8 °C)', 'Freezer compartment (−25 to −15 °C)', 'Ambient / room'];

// Third-party monitoring devices (Prototype B) — pre-select lists for the
// device step. Both dropdowns are creatable ("+ Add …" types a new value), so
// unlisted manufacturers/models never block the flow. No integration flags:
// third-party capture is inventory-only, data is recorded manually.
const DEVICE_MANUFACTURERS = ['Berlinger', 'LogTag', 'Haier Biomedical', 'B Medical Systems', 'Elitech', 'Sensitech', 'Marcus (non-Nexleaf RTMD)'];
const DEVICE_MODELS = {
  'Berlinger': ['Fridge-tag', 'Fridge-tag 2', 'Fridge-tag 3', 'Q-tag (transport)'],
  'LogTag': ['TRID30-7', 'UTRID-16', 'VAXTAG'],
  'Haier Biomedical': ['Built-in monitor', 'U-Cool display'],
  'B Medical Systems': ['Built-in monitor'],
  'Elitech': ['RC-5', 'RC-5+', 'LogEt 8'],
  'Sensitech': ['TempTale 4', 'TempTale GEO'],
  'Marcus (non-Nexleaf RTMD)': ['RTMD (wired sensor)', 'RTMD (Bluetooth)'],
};

const REGIONS = FACILITIES.map(({ id, label }) => ({ id, label }));

function regionOfFacility(facilityId) {
  return FACILITIES.find((r) => (r.children || []).some((f) => f.id === facilityId))?.id || '';
}

function regionLabel(id) {
  return REGIONS.find((r) => r.id === id)?.label || 'Not set';
}

function facilityLabel(id) {
  for (const region of FACILITIES) {
    const hit = (region.children || []).find((f) => f.id === id);
    if (hit) return hit.label;
  }
  return id || '—';
}

function providerById(id) {
  return PROVIDERS.find((p) => p.id === id) || null;
}

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ─── Inline icons (Nexleaf Icons V2 style — 20×20, inline SVG only) ───────────

// Icons come from the design system's Polaris catalog — never hand-drawn SVG.
// These thin wrappers keep the original call sites (<IcoQr size={20} />) working
// while the artwork itself is owned by the DS. See ds-components-only.
const IcoSearch = ({ size = 20, color = TEXT_SUBDUED }) => (
  <PolarisIconImg name="SearchIcon" size={size} color={color} />
);

const IcoQr = ({ size = 20, color = TEXT_SUBDUED }) => (
  <PolarisIconImg name="ShopcodesIcon" size={size} color={color} />
);

const IcoThermometer = ({ size = 20, color = TEXT_SUBDUED }) => (
  <PolarisIconImg name="GaugeIcon" size={size} color={color} />
);

const IcoDevice = ({ size = 20, color = TEXT_SUBDUED }) => (
  <PolarisIconImg name="MobileIcon" size={size} color={color} />
);

const IcoCloud = ({ size = 20, color = TEXT_SUBDUED }) => (
  <PolarisIconImg name="ConnectIcon" size={size} color={color} />
);

const IcoLocation = ({ size = 20, color = TEXT_SUBDUED }) => (
  <PolarisIconImg name="LocationIcon" size={size} color={color} />
);

// QR preview — a deterministic QR-style pattern derived from the code string
// (three finder squares + hashed data modules). Prototype rendering; inline
// SVG only, no QR library.
export function QrPreview({ code, size = 200 }) {
  const n = 21;
  let h = 2166136261;
  for (let i = 0; i < code.length; i++) { h ^= code.charCodeAt(i); h = Math.imul(h, 16777619); }
  const rand = () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
  const inFinder = (r, c) => (r < 8 && c < 8) || (r < 8 && c >= n - 8) || (r >= n - 8 && c < 8);
  const cells = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!inFinder(r, c) && rand() > 0.52) cells.push([r, c]);
    }
  }
  const u = size / n;
  const finder = (x, y) => (
    <g key={`f${x}-${y}`}>
      <rect x={x * u} y={y * u} width={7 * u} height={7 * u} fill={TEXT_DEFAULT} />
      <rect x={(x + 1) * u} y={(y + 1) * u} width={5 * u} height={5 * u} fill={BG_SURFACE} />
      <rect x={(x + 2) * u} y={(y + 2) * u} width={3 * u} height={3 * u} fill={TEXT_DEFAULT} />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`QR code ${code}`}>
      <rect width={size} height={size} fill={BG_SURFACE} />
      {finder(0, 0)}
      {finder(n - 7, 0)}
      {finder(0, n - 7)}
      {cells.map(([r, c]) => (
        <rect key={`${r}.${c}`} x={c * u} y={r * u} width={u} height={u} fill={TEXT_DEFAULT} />
      ))}
    </svg>
  );
}

const IcoCamera = ({ size = 16, color = 'currentColor' }) => (
  <PolarisIconImg name="CameraIcon" size={size} color={color} />
);

const IcoCheckCircle = ({ size = 20, color = COLOR_SUCCESS }) => (
  <PolarisIconImg name="CheckCircleIcon" size={size} color={color} />
);

const IcoClipboard = ({ size = 20, color = TEXT_SUBDUED }) => (
  <PolarisIconImg name="ClipboardIcon" size={size} color={color} />
);

// Monitoring-method illustrations now come from the Illustration Hub
// (Foundation/Illustrations): monitored / connect-monitor / not-monitored.
const METHOD_OPTIONS = [
  {
    id: 'rtmd',
    title: 'Monitored Equipment by Nexleaf',
    description: 'A Nexleaf remote temperature monitoring device is (or will be) installed on this equipment. Data uploads automatically.',
    illo: 'monitored',
  },
  {
    id: 'external',
    title: 'Built in or 3rd Party Device',
    description: 'The equipment has its own logger or display e.g. a built-in Haier logger or a Berlinger Fridge-tag. You’ll identify the device so it’s on record.',
    illo: 'connect-monitor',
  },
  {
    id: 'none',
    title: 'Unmonitored Equipment',
    description: 'No device records this equipment’s temperature. Temperatures will be recorded manually with a thermometer.',
    illo: 'not-monitored',
  },
];

const IcoUser = ({ size = 20, color = TEXT_SUBDUED }) => (
  <PolarisIconImg name="PersonIcon" size={size} color={color} />
);

// ─── Small shared layout pieces (composition, not new primitives) ─────────────

// Circle media recipe from the Scan QR Code page / CardLayoutType5.
function CircleMedia({ tone = 'info', children }) {
  const bg = tone === 'warning' ? BG_WARNING : tone === 'success' ? BG_SUCCESS : BG_INFO;
  return (
    <div aria-hidden="true" style={{
      width: 88, height: 88, borderRadius: '50%', background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      margin: '0 auto',
    }}>
      {children}
    </div>
  );
}

// One wizard step: eyebrow (flow + step count) · title · subtitle · body · footer.
// All wizard fields stack vertically in one column.
const FIELD_STACK = { display: 'flex', flexDirection: 'column', gap: 20 };

// Wizard step chrome (Figma 8061-292936): Page header (back arrow + title +
// subtitle) above a full-bleed white card carrying the phase Stepper, the
// step's section heading + fields, and the Back / Next footer.
// Desktop app-frame measurement: the card's bottom edge lands at the viewport
// bottom (level with the nav's Collapse button) and the page itself never
// scrolls — ancestor paddings below the card are measured and absorbed.
// The frame is fixed at every breakpoint — tertiary pages sync the card to the screen.
export function useFixedFrame(deps = []) {
  const fixed = true; // tertiary page: the card syncs to the screen height at every breakpoint
  const ref = useRef(null);
  const [top, setTop] = useState(184);
  const [bottomInset, setBottomInset] = useState(16);
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      setTop(Math.round(el.getBoundingClientRect().top));
      let inset = 0;
      for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
        const cs = getComputedStyle(n);
        inset += (parseFloat(cs.paddingBottom) || 0) + (parseFloat(cs.marginBottom) || 0);
      }
      setBottomInset(Math.max(16, Math.round(inset)));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [fixed, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps
  // dvh tracks the *visible* viewport on mobile (browser chrome collapsing).
  return { ref, fixed, height: `calc(100dvh - ${top + bottomInset}px)` };
}

export function StepFrame({ header, onBack, stepper, title, subtitle, children, footerLeft, footerRight, contentMaxWidth = 620 }) {
  const isMobile = useIsMobile();
  // The labeled stepper needs ~900px before five phases fit without clipping;
  // below that the compact variant (circles + "Step X of Y" line) takes over.
  const { width: viewportWidth } = useViewport();
  const compactStepper = viewportWidth < 920;
  const { ref: frameRef, height: frameHeight } = useFixedFrame([header?.subtitle]);

  const inner = (
    <div ref={frameRef}>
      <Card style={{
        height: frameHeight, overflow: 'hidden',
        padding: isMobile ? '20px 16px 12px' : '32px 40px 20px',
        gap: 0,
      }}>
        {stepper && (
          <div style={{ flexShrink: 0 }}>
            <Stepper phases={stepper.phases} activeIndex={stepper.activeIndex} compact={compactStepper} navigable={stepper.navigable} onSelect={stepper.onSelect} />
          </div>
        )}

        {/* The only scrollable region (desktop) — the step's content */}
        <div style={{
          flex: '1 1 auto', minHeight: 0,
          overflowY: 'auto',
          marginTop: stepper ? (isMobile ? 20 : 28) : 0,
          paddingRight: 8,
        }}>
          <div style={{ width: '100%', maxWidth: contentMaxWidth, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 650, lineHeight: '24px', color: TEXT_DEFAULT }}>
                {title}
              </h2>
              {subtitle && (
                <p style={{ margin: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
                  {subtitle}
                </p>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 8 }}>
              {children}
            </div>
          </div>
        </div>

        {(footerLeft || footerRight) && (
          <div style={{
            flexShrink: 0,
            paddingTop: isMobile ? 12 : 16,
            borderTop: `1px solid ${BORDER_LIGHT}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>{footerLeft}</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>{footerRight}</div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
  if (!header) return inner;
  return (
    <Page
      title={header.title}
      subtitle={header.subtitle}
      backAction={{ onClick: onBack, ariaLabel: 'Back' }}
      flushTop
    >
      {inner}
    </Page>
  );
}

// Scan QR Code screen with the same fixed-frame height as the wizard steps,
// so both surfaces end on the same line.
function ScanScreen({ onScan, onSubmit }) {
  const { ref, height } = useFixedFrame();
  return (
    <div ref={ref}>
      <ScanQrCodeBody
        onScan={onScan}
        onSubmit={onSubmit}
        style={{ height, minHeight: 0, overflowY: 'auto' }}
      />
    </div>
  );
}

// Search-result panel (Scan Progress dialog): the design system's in-card
// compact tinted Banner carrying name + serial + facility; a selection ring
// wraps it when the result is part of a pick list.
function ResultPanel({ title, lines, selectable = false, selected = false, onSelect }) {
  return (
    <div
      role={selectable ? 'radio' : undefined}
      aria-checked={selectable ? selected : undefined}
      tabIndex={selectable ? 0 : undefined}
      onClick={selectable ? onSelect : undefined}
      onKeyDown={selectable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); } } : undefined}
      style={{
        borderRadius: 8, outline: 'none',
        boxShadow: selectable && selected ? `0 0 0 2px ${COLOR_PRIMARY}` : 'none',
        cursor: selectable ? 'pointer' : 'default',
        transition: 'box-shadow 0.12s ease',
      }}
    >
      <Banner tone="info" inCard hideIcon>
        <span style={{ display: 'block', fontWeight: 650 }}>{title}</span>
        {lines.map((l) => (
          <span key={l} style={{ display: 'block' }}>{l}</span>
        ))}
      </Banner>
    </div>
  );
}

// Form section header — icon + title over a hairline, grouping detail fields
// exactly like the production Create New Equipment modal.
export function FormSection({ icon, title, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${BORDER_LIGHT}`, paddingBottom: 8 }}>
        {icon}
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 650, lineHeight: '20px', color: TEXT_DEFAULT }}>
          {title}{required && <span style={{ color: TEXT_CRITICAL, marginLeft: 2 }}>*</span>}
        </h3>
      </div>
      {children}
    </div>
  );
}

// Summary rows — a two-column definition list (label left, value right) with
// comfortable rhythm; hairlines only BETWEEN rows. Pass rows as
// [label, value] tuples; falsy entries are skipped (conditional rows).
export function ReviewRows({ rows }) {
  const visible = rows.filter(Boolean);
  return (
    <div>
      {visible.map(([label, value], i) => (
        <div
          key={label}
          style={{
            display: 'flex', gap: 24, alignItems: 'baseline',
            padding: '12px 0',
            borderBottom: i < visible.length - 1 ? `1px solid ${BORDER_LIGHT}` : 'none',
          }}
        >
          <span style={{ width: 180, flexShrink: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
            {label}
          </span>
          <span style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 500, lineHeight: '20px', color: TEXT_DEFAULT, overflowWrap: 'anywhere' }}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

// Review-section header: CardSectionTitle + an optional completion status Badge
// + a ghost Edit action.
export function ReviewSection({ icon, title, status, onEdit, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <CardSectionTitle icon={icon} title={title} />
          {status}
        </div>
        {onEdit && <Btn variant="ghost" small onClick={onEdit}>Edit</Btn>}
      </div>
      {children}
    </div>
  );
}


// ─── Wizard phases (Figma 8061-292936 — solar-equipment wizard chrome) ────────
// Each monitoring method gets its own phase spine for the horizontal stepper;
// micro-steps advance within a phase, so one layout serves all three flows.

// Ednah's universal order (Aug 2026): Facility → Equipment details →
// Monitoring device LAST → Review. "Equipment is the primary; monitoring is
// secondary." The installer picks the CCE first, then assigns what monitors it.
function phasesFor(method) {
  if (method === 'rtmd') {
    return [
      { label: 'Facility & Contacts', steps: ['facility'] },
      { label: 'Equipment Details', steps: ['details'] },
      { label: 'RTMD & Sensor', steps: ['rtmd-select', 'rtmd-configure', 'rtmd-sensors', 'rtmd-confirm'] },
      { label: 'Review & Submit', steps: ['review'] },
    ];
  }
  if (method === 'external') {
    return [
      { label: 'Facility', steps: ['facility'] },
      { label: 'Equipment Details', steps: ['details'] },
      { label: 'Monitoring Device', steps: ['device'] },
      { label: 'Review & Submit', steps: ['review'] },
    ];
  }
  return [
    { label: 'Facility', steps: ['facility'] },
    { label: 'Equipment Details', steps: ['details'] },
    { label: 'Review & Submit', steps: ['review'] },
  ];
}

const WIZARD_SUBTITLES = {
  rtmd: 'Install the Nexleaf RTMD and register the equipment it monitors on the Nexleaf platform.',
  external: 'Register the equipment, then identify the third-party device that monitors it.',
  none: 'Register the equipment for manual temperature recording on the Nexleaf platform.',
};

const ENTRY_COPY = {
  'serial-search': {
    icon: <IcoSearch size={20} color={TEXT_INFO} />,
    title: 'No equipment found with this serial number.',
    body: 'You can register the equipment.',
    cta: 'Add Equipment',
    secondary: 'Scan Again',
  },
  'qr-scan': {
    icon: <IcoQr size={20} color={TEXT_INFO} />,
    title: 'No equipment is associated with this QR code.',
    body: 'You can add the equipment now and this QR code will be assigned to it automatically.',
    cta: 'Add and Assign Equipment',
    secondary: 'Scan Again',
  },
};

/**
 * AlarmContactsField — the facility's RTMD alarm-contact picker, exactly as the
 * third-party / RTMD add-equipment flow asks for it: heading + cap sentence,
 * multi-select over the facility directory, a "Create a new contact" escape
 * hatch with its structured modal, and one Cell per added contact. Layer 1 —
 * exported so the cold-room monitoring install flow uses this one
 * implementation rather than a copy that drifts.
 *
 * Contacts are OPTIONAL by design: with none, the empty state says plainly
 * that alarms only reach the ColdTrace dashboard.
 *
 * @param {string[]} contacts        Selected contact ids.
 * @param {(ids: string[]) => void} onChange
 * @param {object[]} directory       [{id, name, phone, occupation, language}]
 * @param {(contact) => void} onDirectoryAdd  Called with a newly created contact.
 * @param {number} [max]             Platform cap (10 RTMD alarm contacts).
 * @param {(notice: {tone, message}) => void} [onNotice]  Cap-exceeded toast.
 */
export function AlarmContactsField({
  contacts = [], onChange, directory = [], onDirectoryAdd, max = MAX_ALARM_CONTACTS, onNotice,
}) {
  const [draft, setDraft] = useState(null);
  const [draftErrors, setDraftErrors] = useState({});
  const added = contacts.map((id) => directory.find((c) => c.id === id)).filter(Boolean);
  const options = directory.map((c) => ({ id: c.id, label: `${c.name} · ${c.phone}` }));
  const atLimit = added.length >= max;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 650, lineHeight: '20px', color: TEXT_DEFAULT }}>
          Alarm contacts
        </h3>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
          A facility can have up to {max} RTMD alarm contacts. They receive SMS alerts when this RTMD raises an alarm.
        </p>
      </div>

      {/* Multi-select: checking adds, unchecking removes — kept in sync
          with the contact list below. */}
      <SearchSelectMulti
        label="Add alarm contacts"
        placeholder="Search contacts by name…"
        tagsInside
        options={options}
        value={contacts}
        onChange={(ids) => {
          if (ids.length > max) {
            onNotice?.({ tone: 'warning', message: `A facility can have at most ${max} alarm contacts. Remove one to add someone else.` });
            return;
          }
          onChange?.(ids);
        }}
      />
      {!atLimit ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: -12 }}>
          <span style={{ fontSize: 13, fontWeight: 450, color: TEXT_SUBDUED }}>
            Search and select contacts, or
          </span>
          <Btn variant="ghost" small onClick={() => {
            setDraftErrors({});
            setDraft({ email: '', phone: '', first: '', last: '', occupation: '', language: 'English' });
          }}>
            Create a new contact
          </Btn>
        </div>
      ) : (
        <Banner tone="info" title="Contact limit reached">
          This facility has the maximum of {max} alarm contacts. Remove one to add or create someone else.
        </Banner>
      )}

      {added.length === 0 ? (
        <Banner tone="info" inCard>
          No alarm contacts in this facility yet. Without contacts, alarms only appear on the ColdTrace dashboard.
        </Banner>
      ) : (
        added.map((c) => (
          <Cell
            key={c.id}
            icon={<IcoUser />}
            iconTone="info"
            title={c.name}
            titleBadge={<Badge tone="success" size="small">Added</Badge>}
            description={`${c.phone} · ${c.occupation}${c.language ? ` · ${c.language}` : ''}`}
            buttonLabel="Remove"
            onButtonClick={() => onChange?.(contacts.filter((id) => id !== c.id))}
            ariaLabel={`Alarm contact ${c.name}`}
          />
        ))
      )}

      {/* Create Facility Contact — structured modal, saves into the directory */}
      <Modal
        open={draft != null}
        onClose={() => setDraft(null)}
        title="Create facility contact"
        maxWidth={480}
        footer={<>
          <Btn variant="secondary" small onClick={() => setDraft(null)}>Cancel</Btn>
          <Btn variant="primary" small onClick={() => {
            const e = {};
            if (!draft.phone.trim()) e.phone = 'Phone number is required.';
            if (!draft.first.trim()) e.first = 'First name is required.';
            setDraftErrors(e);
            if (Object.keys(e).length) return;
            const contact = {
              id: `new-${Date.now()}`,
              name: `${draft.first.trim()} ${draft.last.trim()}`.trim(),
              phone: draft.phone.trim(),
              occupation: draft.occupation || 'Facility staff',
              language: draft.language,
              email: draft.email.trim(),
            };
            onDirectoryAdd?.(contact);
            if (contacts.length < max) onChange?.([...contacts, contact.id]);
            setDraft(null);
          }}>Save</Btn>
        </>}
      >
        {draft != null && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextInput
              label="Phone number"
              required
              placeholder="e.g. +254 722 000 000"
              helpText="Include the country code. SMS alarm alerts go to this number."
              value={draft.phone}
              onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
              error={draftErrors.phone}
            />
            <TextInput
              label="Email address"
              placeholder="e.g. j.zulu@moh.go.ke"
              value={draft.email}
              onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
            />
            <TextInput
              label="First name"
              required
              value={draft.first}
              onChange={(e) => setDraft((d) => ({ ...d, first: e.target.value }))}
              error={draftErrors.first}
            />
            <TextInput
              label="Last name"
              value={draft.last}
              onChange={(e) => setDraft((d) => ({ ...d, last: e.target.value }))}
            />
            <SelectInput
              label="Occupation"
              options={OCCUPATIONS}
              placeholder="Select…"
              value={draft.occupation}
              onChange={(e) => setDraft((d) => ({ ...d, occupation: e.target.value }))}
            />
            <SelectInput
              label="Language"
              options={LANGUAGES}
              helpText="Alarm SMS messages are sent in this language."
              value={draft.language}
              onChange={(e) => setDraft((d) => ({ ...d, language: e.target.value }))}
            />
          </div>
        )}
      </Modal>
    </>
  );
}

// ─── Main flow ────────────────────────────────────────────────────────────────

/**
 * AddEquipmentFlow
 *
 * @param {'serial-search'|'qr-scan'|'equipment-management'} [entryContext]
 * @param {string} [entrySerial]   Serial preserved from the failed search.
 * @param {string} [entryQr]       QR code preserved from the unassigned scan.
 * @param {string} [initialStep]   Open the prototype at a given state.
 * @param {object} [initialData]   Partial {equipment, monitoring, rtmd, integration, externalDevice} overrides.
 * @param {object} [initialErrors] Field errors to show immediately (prototype states).
 * @param {'success'|'failed'|'unavailable'|'auto'} [simulateConnection='auto']
 * @param {() => void} [onExit]    Cancel / leave the flow.
 * @param {(record) => void} [onCreated] Fires when the equipment is created.
 * @param {(step:string) => void} [onStepChange] Fires as the flow moves between steps.
 */
export function AddEquipmentFlow({
  entryContext = 'equipment-management',
  entrySerial = '',
  entryQr = '',
  initialStep,
  initialData = {},
  initialErrors = {},
  initialCancelOpen = false,
  simulateConnection = 'auto',
  // Prototype-only: forces an otherwise-transient condition so it can be
  // reviewed as a static state. 'submitting' | 'submit-failed' | 'offline'
  // | 'location-denied' | 'no-readings'
  simulate = null,
  onExit,
  onCreated,
  onStepChange,
}) {
  const firstStep = initialStep
    || (entryContext === 'serial-search' || entryContext === 'qr-scan' ? 'entry' : 'method');
  // When the flow starts at the Scan QR Code screen, the entry context is set
  // by what the user does there (search vs scan) instead of by the prop.
  const searchFirst = firstStep === 'search';

  const isMobile = useIsMobile();
  const [entryCtx, setEntryCtx] = useState(entryContext);
  const [step, setStep] = useState(firstStep);
  // Every step the user has reached — visited phases stay tappable in the
  // stepper (backward and forward again) without losing entered data.
  const [visitedSteps, setVisitedSteps] = useState(() => {
    const v = new Set([firstStep]);
    // Deep-linked prototype states open mid-flow with earlier phases prefilled;
    // treat those phases as visited so the stepper can jump to them.
    const ph = phasesFor(initialData.monitoring?.method ?? null);
    const idx = ph.findIndex((pp) => pp.steps.includes(firstStep));
    ph.slice(0, Math.max(0, idx)).forEach((pp) => pp.steps.forEach((st) => v.add(st)));
    return v;
  });
  useEffect(() => {
    setVisitedSteps((v) => (v.has(step) ? v : new Set(v).add(step)));
    onStepChange?.(step);
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps
  const [history, setHistory] = useState([]);
  const [errors, setErrors] = useState(initialErrors);
  const [cancelOpen, setCancelOpen] = useState(initialCancelOpen);
  const [scanOpen, setScanOpen] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  // Assign QR Code modal: null = closed; { scanning, scanned } while open.
  const [assignQr, setAssignQr] = useState(null);
  const [qrViewOpen, setQrViewOpen] = useState(false);
  const [nextQrSeq, setNextQrSeq] = useState(3307);
  // Prototype B: location is optional and never a hard stop, so the permission
  // prompt is opt-in (via the banner action) rather than an auto-popup.
  const [locationPromptOpen, setLocationPromptOpen] = useState(false);
  const [searchNotice, setSearchNotice] = useState(null);
  // Scan Progress dialog: null = closed; { query, matches, exact, selected }.
  // selected is a serial, or '__new__' for "add as new equipment".
  const [searchResults, setSearchResults] = useState(null);
  const fromRecording = entryCtx === 'serial-search' || entryCtx === 'qr-scan';

  // The three separate concepts: equipment / monitoring device / integration.
  const [equipment, setEquipment] = useState({
    serial: entrySerial, qrCode: entryQr,
    makeModel: '', fundingSource: '',
    status: '', installDate: null, powerSource: '',
    regionId: '', facilityId: '',
    warrantyYears: '',
    ...initialData.equipment,
  });
  // monitoring.method: 'rtmd' | 'external' | 'none'
  const [monitoring, setMonitoring] = useState({ method: null, ...initialData.monitoring });
  const [rtmd, setRtmd] = useState({
    deviceId: '', configDate: new Date(), locationGranted: false,
    configured: false, configuring: false, facilityId: '',
    sensor1: { compartment: COMPARTMENTS[0], min: 2, max: 8 },
    hasSensor2: false,
    sensor2: { compartment: COMPARTMENTS[1], min: -25, max: -15 },
    contacts: [],
    ...initialData.rtmd,
  });
  // Facility alarm-contact directory (created contacts join it) + the
  // create-contact modal draft (null = closed).
  const [contactDirectory, setContactDirectory] = useState(ALARM_CONTACTS);
  const [integration, setIntegration] = useState({
    providerId: '', deviceId: '', accessCode: '',
    status: 'not_connected', // not_connected | connecting | connected | failed | unavailable
    lastSync: null, latestReading: null,
    ...initialData.integration,
  });
  const [externalDevice, setExternalDevice] = useState({
    manufacturer: '', model: '', serial: '', identifier: '', comm: '', notes: '', photos: [],
    ...initialData.externalDevice,
  });
  // "+ Add" entries typed into the device dropdowns this session.
  const [customManufacturers, setCustomManufacturers] = useState([]);
  const [customModels, setCustomModels] = useState([]);
  const [reading, setReading] = useState({ value: '', saved: false });


  // ── Navigation ──────────────────────────────────────────────────────────────
  function goTo(next) {
    setHistory((h) => [...h, step]);
    setErrors({});
    setStep(next);
  }
  function goBack() {
    setHistory((h) => {
      if (!h.length) { onExit?.(); return h; }
      const prev = h[h.length - 1];
      setErrors({});
      setStep(prev);
      return h.slice(0, -1);
    });
  }

  // ── Scan QR Code entry — search / scan / reset ──────────────────────────────
  function submitSerial(serial) {
    const s = (serial || '').trim();
    if (!s) {
      setSearchNotice({ tone: 'warning', message: 'Enter a serial number from the equipment label, or scan the QR code instead.' });
      return;
    }
    const q = s.toUpperCase();
    const exact = EXISTING_EQUIPMENT.find((e) => e.serial.toUpperCase() === q);
    const matches = exact ? [exact] : EXISTING_EQUIPMENT.filter((e) => e.serial.toUpperCase().includes(q));
    setSearchNotice(null);
    if (exact) {
      // Instance 1 — one identical record found
      setSearchResults({ query: s, matches, exact: true, selected: exact.serial });
      return;
    }
    if (matches.length > 0) {
      // Instance 2 — several close matches. No auto-preselect: the user must
      // explicitly choose one (or "add as new"); Continue stays disabled until then.
      setSearchResults({ query: s, matches, exact: false, selected: null });
      return;
    }
    // Instance 3 — nothing identical: offer to add the equipment
    setEntryCtx('serial-search');
    setEquipment((prev) => ({ ...prev, serial: s }));
    goTo('entry');
  }

  function continueFromResults() {
    const r = searchResults;
    if (!r) return;
    if (r.selected === '__new__') {
      setSearchResults(null);
      setEntryCtx('serial-search');
      setEquipment((prev) => ({ ...prev, serial: r.query }));
      goTo('method');
      return;
    }
    const eq = r.matches.find((m) => m.serial === r.selected);
    setSearchResults(null);
    setSearchNotice({ tone: 'success', message: `Opening ${eq.name} (${eq.serial}) for temperature recording.` });
  }

  // Close the entry pop-up back onto the scan screen (Search/Scan again, ✕,
  // backdrop, Escape). Works whether or not the flow started at the scanner.
  function backToSearch() {
    setErrors({});
    setStep('search');
    setHistory([]);
  }

  function simulateScan() {
    setScanOpen(true);
    // Prototype scanner — two instances, alternating per scan for the demo:
    //   odd scans  → an UNASSIGNED label → "no equipment associated" pop-up
    //   even scans → a REGISTERED label  → Scan Progress with the exact record
    setTimeout(() => {
      setScanOpen(false);
      setSearchNotice(null);
      if (scanCount % 2 === 1) {
        const tagged = EXISTING_EQUIPMENT.filter((e) => e.qr);
        const eq = tagged[Math.floor(scanCount / 2) % tagged.length];
        setSearchResults({ query: eq.qr, matches: [eq], exact: true, selected: eq.serial });
      } else {
        setEntryCtx('qr-scan');
        setEquipment((prev) => ({ ...prev, qrCode: prev.qrCode || 'QR-30977' }));
        goTo('entry');
      }
      setScanCount((c) => c + 1);
    }, 1400);
  }

  // Leave the flow: back to the Scan QR Code screen when it's the entry point,
  // otherwise hand off to the host (Equipment Management, etc.).
  function exitFlow() {
    if (!searchFirst) { onExit?.(); return; }
    setStep('search');
    setHistory([]);
    setErrors({});
    setSearchNotice(null);
    setLocationPromptOpen(true);
    setVisitedSteps(new Set(['search']));
    setEntryCtx(entryContext);
    setEquipment({ serial: '', qrCode: '', makeModel: '', fundingSource: '', status: '', installDate: null, powerSource: '', regionId: '', facilityId: '', warrantyYears: '' });
    setMonitoring({ method: null });
    setRtmd({
      deviceId: '', configDate: new Date(), locationGranted: false,
      configured: false, configuring: false, facilityId: '',
      sensor1: { compartment: COMPARTMENTS[0], min: 2, max: 8 },
      hasSensor2: false,
      sensor2: { compartment: COMPARTMENTS[1], min: -25, max: -15 },
      contacts: [],
    });
    setIntegration({ providerId: '', deviceId: '', accessCode: '', status: 'not_connected', lastSync: null, latestReading: null });
    setExternalDevice({ manufacturer: '', model: '', serial: '', identifier: '', comm: '', notes: '', photos: [] });
    setReading({ value: '', saved: false });
    onExit?.();
  }

  // One wizard chrome (header + phase stepper) shared by all three flows —
  // the phase spine comes from the chosen monitoring method.
  const phases = phasesFor(monitoring.method);
  const wizardChrome = {
    header: {
      title: 'Add Equipment',
      subtitle: WIZARD_SUBTITLES[monitoring.method] || WIZARD_SUBTITLES.none,
    },
    onBack: goBack,
    stepper: {
      phases,
      activeIndex: Math.max(0, phases.findIndex((p) => p.steps.includes(step))),
      navigable: phases.map((p) => p.steps.some((st) => visitedSteps.has(st))),
      onSelect: (i) => {
        const phase = phases[i];
        const target = phase.steps.find((st) => visitedSteps.has(st)) || phase.steps[0];
        if (target !== step) goTo(target);
      },
    },
  };

  // ── Prototype backend actions ───────────────────────────────────────────────
  function configureRtmd() {
    setRtmd((s) => ({ ...s, configuring: true }));
    setTimeout(() => setRtmd((s) => ({ ...s, configuring: false, configured: true })), 1100);
  }

  // Entering Equipment Details: backfill Region from an already-chosen
  // facility (RTMD path) and default Status to Installed for RTMD installs.
  useEffect(() => {
    if (step !== 'details') return;
    setEquipment((s) => {
      const status = s.status || (monitoring.method === 'rtmd' ? 'installed' : '');
      return {
        ...s,
        regionId: s.regionId || regionOfFacility(s.facilityId),
        status,
        installDate: s.installDate || (status === 'installed' ? new Date() : null),
      };
    });
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  function validateDetails() {
    const e = {};
    if (!equipment.serial.trim()) e.serial = 'Serial number is required.';
    else if (EXISTING_SERIALS.includes(equipment.serial.trim())) {
      e.serial = 'An equipment record with this serial number already exists. Search for it in Manual Temperature Recording instead of creating a duplicate.';
    }
    if (!equipment.qrCode) {
      e.qrCode = 'A QR code is required. Assign one to continue.';
    } else if (ASSIGNED_QRS.includes(equipment.qrCode.trim())) {
      e.qrCode = 'This QR code is already assigned to another equipment record. Remove it there first, or scan a different code.';
    }
    if (!equipment.makeModel) e.makeModel = 'Equipment make and model is required.';
    if (!equipment.status) e.status = 'Equipment status is required.';
    if (!equipment.regionId) e.regionId = 'Region is required.';
    if (!equipment.facilityId) e.facilityId = 'Facility is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function createEquipment() {
    const record = { equipment, monitoring, rtmd, integration, externalDevice };
    onCreated?.(record);
    goTo('success');
    // Confirmation toast over the success page — instant feedback that the
    // submission went through, on top of the completion report.
    setSearchNotice({
      tone: 'success',
      message: `${equipment.makeModel || 'Equipment'}${equipment.serial ? ` (${equipment.serial})` : ''} was added successfully.`,
    });
  }

  // Temperature source, derived — only the Nexleaf RTMD uploads automatically.
  // Third-party devices and unmonitored equipment are recorded manually (no
  // third-party integration is live in production).
  const temperatureSource =
    monitoring.method === 'rtmd' ? 'Automatic · Nexleaf RTMD' : 'Manual recording';

  const contactNames = rtmd.contacts
    .map((id) => contactDirectory.find((c) => c.id === id)?.name)
    .filter(Boolean);

  // Required-field gates — the footer primary stays disabled until the step's
  // required fields are filled (uniqueness checks still run on click).
  const stepReady = {
    'rtmd-select': !!(rtmd.deviceId && rtmd.configDate),
    facility: !!rtmd.facilityId,
    device: !!(externalDevice.manufacturer.trim() && externalDevice.serial.trim()),
    details: !!(
      equipment.makeModel && equipment.serial.trim() && equipment.status
      && equipment.regionId && equipment.facilityId && equipment.qrCode
    ),
  };

  // ── Shared footer buttons ───────────────────────────────────────────────────
  const backBtn = <Btn variant="secondary" onClick={goBack}>Back</Btn>;
  const continueBtn = (onClick, label = 'Next', disabled = false) => (
    <Btn variant="primary" onClick={onClick} disabled={disabled}>{label}</Btn>
  );

  // ─── Steps ───────────────────────────────────────────────────────────────────

  let body = null;

  // Main entry — Scan QR Code / enter serial number (the shared "Select an
  // Option" surface from the design system, reused as-is). It also stays on
  // screen as the backdrop for the entry pop-ups below.
  // Full-width white surface (matches the design system's assembled Scan QR
  // Code page) — only the inner content is centered, the card fills the frame.
  const searchScreen = (
    <ScanScreen onScan={simulateScan} onSubmit={submitSerial} />
  );

  if (step === 'search') {
    body = searchScreen;
  }

  // Entry pop-ups — failed serial search / unassigned QR, over the scanner.
  if (step === 'entry') {
    const copy = ENTRY_COPY[entryCtx] || ENTRY_COPY['serial-search'];
    body = (
      <>
        {searchScreen}
        <Modal
          open
          onClose={backToSearch}
          title={copy.title}
          footer={<>
            <Btn variant="secondary" small onClick={backToSearch}>{copy.secondary}</Btn>
            <Btn variant="primary" small onClick={() => goTo('method')}>{copy.cta}</Btn>
          </>}
        >
          {/* Figma 8060-292312 / 292548: in-card info Banner carrying the
              scanned QR / entered serial, then the explanation line. */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Banner tone="info" inCard icon={copy.icon}>
              {entryCtx === 'qr-scan' ? (equipment.qrCode || entryQr || 'QR-30977') : (equipment.serial || entrySerial || 'CCE-30977-KLF')}
            </Banner>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_DEFAULT }}>
              {copy.body}
            </p>
          </div>
        </Modal>
      </>
    );
  }

  // Step: monitoring-method decision — the shared first question, as a modal
  // over the scanner (Figma 8055-205358). Continue stays disabled until a
  // method card is selected.
  if (step === 'method') {
    body = (
      <>
        {searchScreen}
        <Modal
          open
          onClose={() => (history.length ? goBack() : setCancelOpen(true))}
          title="How is this equipment's temperature monitored?"
          footer={<>
            <Btn variant="secondary" small onClick={() => setCancelOpen(true)}>Cancel</Btn>
            <Btn
              variant="primary"
              small
              disabled={!monitoring.method}
              onClick={() => goTo('facility')}
            >
              Continue
            </Btn>
          </>}
        >
          <div role="radiogroup" aria-label="How is this equipment's temperature monitored?" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {METHOD_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.id}
                media={<Illustration name={opt.illo} size={64} />}
                title={opt.title}
                description={opt.description}
                selected={monitoring.method === opt.id}
                onSelect={() => { setMonitoring({ method: opt.id }); setErrors({}); }}
              />
            ))}
          </div>
        </Modal>
      </>
    );
  }

  // ── Flow 1 — Nexleaf RTMD ───────────────────────────────────────────────────
  if (step === 'rtmd-select') {
    // One field matches either identifier — each option carries IMEI + MAC +
    // model, so typing any of them filters the list.
    const opts = RTMDS.map((d) => ({
      id: d.id,
      label: `${d.imei} · ${d.mac} · ${d.model}`,
    }));
    body = (
      <StepFrame
        {...wizardChrome}
        title="Select the RTMD"
        subtitle="Pick the Nexleaf device being installed on this equipment. Search by the IMEI or MAC address printed on its label."
        footerRight={<>{backBtn}{continueBtn(() => goTo('rtmd-configure'), 'Next', !stepReady['rtmd-select'])}</>}
      >
        <div style={FIELD_STACK}>
          <SearchSelect
            label="RTMD (IMEI or MAC address)"
            required
            placeholder="Search by IMEI or MAC address…"
            options={opts}
            value={rtmd.deviceId}
            onChange={(v) => { setRtmd((s) => ({ ...s, deviceId: v })); setErrors((prev) => ({ ...prev, rtmd: undefined })); }}
            error={errors.rtmd}
          />
          <DateField
            label="Configuration date"
            required
            value={rtmd.configDate}
            onChange={(d) => { setRtmd((s) => ({ ...s, configDate: d })); setErrors((prev) => ({ ...prev, configDate: undefined })); }}
            helpText="When this RTMD is being configured on the equipment. This is usually today."
            error={errors.configDate}
          />
        </div>
      </StepFrame>
    );
  }

  if (step === 'rtmd-configure') {
    const device = RTMDS.find((d) => d.id === rtmd.deviceId) || RTMDS[0];
    const askLocation = !rtmd.locationGranted && locationPromptOpen;
    body = (
      <StepFrame
        {...wizardChrome}
        title="Configure RTMD"
        subtitle="Push the configuration to the device. Keep the RTMD powered on and within network coverage."
        footerRight={<>{backBtn}
          {rtmd.configured
            ? continueBtn(() => goTo('rtmd-sensors'), 'Next')
            : (
              <Btn
                variant="primary"
                loading={rtmd.configuring}
                disabled={rtmd.configuring}
                onClick={configureRtmd}
              >
                {rtmd.configuring ? 'Configuring…' : 'Configure RTMD'}
              </Btn>
            )}
        </>}
      >
        <ReviewRows rows={[
          ['Device', device.model],
          ['IMEI', device.imei],
          ['MAC address', device.mac],
          ['Configuration date', formatDate(rtmd.configDate)],
        ]} />
        {rtmd.locationGranted ? (
          <Banner tone="success" title="Location captured">
            −4.0435° S, 39.6682° E · accuracy ±8 m. The installation location is saved with this RTMD.
          </Banner>
        ) : simulate === 'location-denied' ? (
          <Banner tone="warning" title="Location access was blocked">
            This RTMD will be registered without an installation location — alerts and reports will point
            to the facility instead of the exact spot. You can add it later from the RTMD's page. To allow
            it now, enable location for ColdTrace in your browser or phone settings, then select Allow
            location access again.
          </Banner>
        ) : (
          <Banner
            tone="info"
            title="Add the installation location (optional)"
            actions={[{ label: 'Allow location access', onClick: () => setLocationPromptOpen(true) }]}
          >
            ColdTrace can record where the RTMD is installed so alerts and reports point to the right place. You can configure and continue without it — this doesn't block registration.
          </Banner>
        )}
        {rtmd.configured && (
          <Banner tone="success" title="RTMD configured">
            The device accepted the configuration and reported a first heartbeat.
          </Banner>
        )}

        {/* Location permission — a system-prompt style modal over this step */}
        <Modal
          open={askLocation}
          onClose={() => setLocationPromptOpen(false)}
          title="Allow ColdTrace to use this phone's location?"
          size="small"
          footer={<>
            <Btn variant="secondary" small onClick={() => setLocationPromptOpen(false)}>Not now</Btn>
            <Btn variant="primary" small onClick={() => { setRtmd((s) => ({ ...s, locationGranted: true })); setLocationPromptOpen(false); }}>
              Allow location access
            </Btn>
          </>}
        >
          <Cell
            icon={<IcoLocation />}
            iconTone="info"
            title="Use this phone's location once"
            description="Captured only at configuration time, to record where this RTMD is installed. ColdTrace does not track your location."
            descriptionLines={0}
          />
        </Modal>
      </StepFrame>
    );
  }

  // One facility step for ALL methods — the facility informs the region, so
  // the flow never asks region. Alarm contacts are an RTMD concept and only
  // appear on the Nexleaf path.
  if (step === 'facility') {
    const isRtmdMethod = monitoring.method === 'rtmd';
    body = (
      <StepFrame
        {...wizardChrome}
        title={isRtmdMethod ? 'Facility & alarm contacts' : 'Facility'}
        subtitle={isRtmdMethod
          ? 'The facility where this equipment is installed, and who gets its RTMD SMS alarm alerts.'
          : 'The facility where this equipment is installed. It also sets the region.'}
        footerRight={<>{backBtn}{continueBtn(() => {
          setEquipment((s) => ({
            ...s,
            facilityId: rtmd.facilityId || s.facilityId,
            regionId: regionOfFacility(rtmd.facilityId) || s.regionId,
          }));
          goTo('details');
        }, 'Next', !stepReady.facility)}</>}
      >
        <SearchSelect
          label="Facility"
          required
          placeholder="Search facilities…"
          options={FACILITIES}
          value={rtmd.facilityId}
          onChange={(v) => { setRtmd((s) => ({ ...s, facilityId: v })); setErrors({}); }}
          error={errors.facility}
        />
        {rtmd.facilityId && (
          <p style={{ margin: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
            Region: {regionLabel(regionOfFacility(rtmd.facilityId))} — set by the facility.
          </p>
        )}

        {isRtmdMethod && rtmd.facilityId && (
          <AlarmContactsField
            contacts={rtmd.contacts}
            onChange={(ids) => setRtmd((st) => ({ ...st, contacts: ids }))}
            directory={contactDirectory}
            onDirectoryAdd={(c) => setContactDirectory((d) => [...d, c])}
            onNotice={setSearchNotice}
          />
        )}
      </StepFrame>
    );
  }

  if (step === 'rtmd-sensors') {
    // Sensor assignment is a DROPDOWN, never free text (Ednah, Aug 2026):
    //   CTX — sensor serials are pre-fed into the system; type to filter.
    //   CT5 — exactly four sensors, labelled A–D (D is ambient).
    // No compartment question (the equipment's make/model already says fridge
    // vs freezer) and no min/max alarm inputs (thresholds follow WHO
    // recommendations and are admin-only configuration).
    const sensorDevice = RTMDS.find((d) => d.id === rtmd.deviceId) || RTMDS[0];
    const isCtx = sensorDevice.kind === 'CTX';
    const sensorOptions = (isCtx ? CTX_SENSORS : CT5_SENSORS).map((s) => ({ id: s, label: s }));
    body = (
      <StepFrame
        {...wizardChrome}
        title="Assign the sensor"
        subtitle={`Select the ${sensorDevice.model} sensor that is monitoring ${equipment.makeModel || 'this equipment'}.`}
        footerRight={<>{backBtn}{continueBtn(() => goTo('rtmd-confirm'), 'Next', !rtmd.sensor1.serial)}</>}
      >
        <ReviewRows rows={[
          ['Equipment', `${equipment.makeModel || 'Not set'} · ${equipmentTypeOf(equipment.makeModel)}`],
          ['RTMD', `${sensorDevice.model} · ${sensorDevice.imei}`],
        ]} />
        <Banner tone="info" inCard>
          {isCtx
            ? 'CTX pairs with the sensor, not the base station. Sensor serials are pre-registered — search and assign the one installed in this equipment.'
            : 'CT5 has four sensors, labelled A to D. Assign the one installed in this equipment. Sensor D is ambient and is not tied to a CCE.'}
        </Banner>
        <SearchSelect
          label={isCtx ? 'Sensor serial number' : 'Sensor'}
          required
          placeholder={isCtx ? 'Search registered sensor serials…' : 'Select sensor A–D…'}
          options={sensorOptions}
          value={rtmd.sensor1.serial || ''}
          onChange={(v) => setRtmd((s) => ({ ...s, sensor1: { ...s.sensor1, serial: v } }))}
        />
        <p style={{ margin: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
          Alarm thresholds follow WHO recommendations for this equipment type and are managed by administrators — they are not set during installation.
        </p>
      </StepFrame>
    );
  }

  if (step === 'rtmd-confirm') {
    const device = RTMDS.find((d) => d.id === rtmd.deviceId) || RTMDS[0];
    body = (
      <StepFrame
        {...wizardChrome}
        title="Confirm RTMD installation"
        subtitle="Review the monitoring setup, then continue to the final review."
        footerRight={<>{backBtn}{continueBtn(() => goTo('review'), 'Confirm RTMD')}</>}
      >
        <Banner tone="success" title="RTMD ready">
          Sensor data will upload automatically once the equipment record is created.
        </Banner>
        <ReviewRows rows={[
          ['Equipment', `${equipment.makeModel || 'Not set'} · ${equipmentTypeOf(equipment.makeModel)}`],
          ['Device', `${device.model} · ${device.imei}`],
          ['Facility', facilityLabel(rtmd.facilityId)],
          ['Alarm contacts', contactNames.length ? contactNames.join(', ') : 'None (dashboard alarms only)'],
          ['Configured on', formatDate(rtmd.configDate)],
          ['Sensor', rtmd.sensor1.serial || 'Not assigned'],
          ['Alarm thresholds', 'WHO recommendation for this equipment type (admin-managed)'],
        ]} />
      </StepFrame>
    );
  }

  // ── Flow 2 — Third-party monitoring device (manual capture) ─────────────────
  // No integration / connection / pairing: the third-party device is captured
  // for inventory so a reader knows WHAT monitors this equipment. Temperatures
  // are entered manually in Manual Temperature Recording.
  if (step === 'device') {
    // Pre-select lists + anything the user typed in via "+ Add" this session.
    const manufacturerOpts = [
      ...DEVICE_MANUFACTURERS,
      ...customManufacturers.filter((m) => !DEVICE_MANUFACTURERS.includes(m)),
    ].map((m) => ({ id: m, label: m }));
    const baseModels = DEVICE_MODELS[externalDevice.manufacturer] || [];
    const modelOpts = [
      ...baseModels,
      ...customModels.filter((m) => !baseModels.includes(m)),
    ].map((m) => ({ id: m, label: m }));
    body = (
      <StepFrame
        {...wizardChrome}
        title="Monitoring device"
        subtitle="Identify the third-party device that monitors this equipment. This is for inventory — temperatures are recorded manually."
        footerRight={<>{backBtn}{continueBtn(() => goTo('review'), 'Next', !stepReady.device)}</>}
      >
        <div style={FIELD_STACK}>
          {/* Pre-select with "+ Add" — an unlisted manufacturer never blocks. */}
          <SearchSelect
            label="Manufacturer"
            required
            placeholder="Select or type a manufacturer…"
            options={manufacturerOpts}
            value={externalDevice.manufacturer}
            onChange={(v) => { setExternalDevice((s) => ({ ...s, manufacturer: v, model: '' })); setErrors({}); }}
            onCreate={(text) => {
              setCustomManufacturers((l) => (l.includes(text) ? l : [...l, text]));
              setExternalDevice((s) => ({ ...s, manufacturer: text, model: '' }));
              setErrors({});
            }}
            error={errors.exManufacturer}
          />
          <SearchSelect
            label="Device / model"
            placeholder="Select or type a device…"
            options={modelOpts}
            value={externalDevice.model}
            onChange={(v) => setExternalDevice((s) => ({ ...s, model: v }))}
            onCreate={(text) => {
              setCustomModels((l) => (l.includes(text) ? l : [...l, text]));
              setExternalDevice((s) => ({ ...s, model: text }));
            }}
          />
          {/* Unique identifier is mandatory; the sensor identifier sits on the
              same line and is optional (RTMDs include it, a Fridge-tag won't). */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: '2 1 220px', minWidth: 0 }}>
              <TextInput
                label="Unique identifier"
                required
                placeholder="e.g. FT-124456"
                helpText="The serial that makes this device unique. For RTMDs, include the sensor identifier."
                value={externalDevice.serial}
                onChange={(e) => setExternalDevice((s) => ({ ...s, serial: e.target.value }))}
                error={errors.exSerial}
              />
            </div>
            <div style={{ flex: '1 1 150px', minWidth: 0 }}>
              <TextInput
                label="Sensor identifier"
                placeholder="Optional · e.g. sensor A"
                value={externalDevice.identifier}
                onChange={(e) => setExternalDevice((s) => ({ ...s, identifier: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </StepFrame>
    );
  }

  // ── Equipment details (all flows converge here) ─────────────────────────────
  if (step === 'details') {
    body = (
      <StepFrame
        {...wizardChrome}
        title="Equipment details"
        subtitle="The equipment record itself. It exists independently of any monitoring device or integration."
        footerRight={<>{backBtn}{continueBtn(() => {
          // Monitoring comes AFTER the equipment (Ednah: equipment is the
          // primary, monitoring is secondary).
          if (!validateDetails()) return;
          goTo(monitoring.method === 'rtmd' ? 'rtmd-select'
            : monitoring.method === 'external' ? 'device'
              : 'review');
        }, 'Next', !stepReady.details)}</>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <FormSection icon={<IcoDevice color={TEXT_DEFAULT} />} title="Equipment Information">
            <SearchSelect
              label="Equipment make and model"
              required
              placeholder="Search make and model…"
              options={MAKE_MODELS.map((m) => ({ id: m, label: m }))}
              value={equipment.makeModel}
              onChange={(v) => setEquipment((s) => ({ ...s, makeModel: v }))}
              error={errors.makeModel}
            />
            {equipment.makeModel && (
              <p style={{ margin: '-8px 0 0', fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
                Equipment type: {equipmentTypeOf(equipment.makeModel)} — detected from the model (PQS).
              </p>
            )}
            <TextInput
              label="Serial number"
              required
              placeholder="e.g. VF-2024-001234"
              helpText={entryCtx === 'serial-search'
                ? 'Kept from your search. Edit it if it was mistyped.'
                : 'Enter the full serial number from the label on the equipment.'}
              value={equipment.serial}
              onChange={(e) => setEquipment((s) => ({ ...s, serial: e.target.value }))}
              error={errors.serial}
            />
            <SelectInput
              label="Funding source"
              options={FUNDING_SOURCES}
              placeholder="Select…"
              value={equipment.fundingSource}
              onChange={(e) => setEquipment((s) => ({ ...s, fundingSource: e.target.value }))}
            />
          </FormSection>

          <FormSection icon={<IcoLocation color={TEXT_DEFAULT} />} title="Installation Details">
            <RadioGroup
              title="Equipment status"
              required
              name="equipment-status"
              value={equipment.status}
              onChange={(id) => {
                setEquipment((s) => ({
                  ...s,
                  status: id,
                  installDate: id === 'installed' ? (s.installDate || new Date()) : s.installDate,
                }));
                setErrors((prev) => ({ ...prev, status: undefined }));
              }}
              options={EQUIPMENT_STATUS}
              error={errors.status}
            />
            {equipment.status === 'installed' && (
              <>
                <DateField
                  label="Equipment install date"
                  value={equipment.installDate}
                  onChange={(d) => setEquipment((s) => ({ ...s, installDate: d }))}
                  helpText="When the equipment was installed at the facility. Defaults to today."
                />
                <SelectInput
                  label="Power source"
                  options={POWER_SOURCES}
                  placeholder="Select…"
                  value={equipment.powerSource}
                  onChange={(e) => setEquipment((s) => ({ ...s, powerSource: e.target.value }))}
                />
              </>
            )}
            {/* Facility was chosen in step 1 and informs the region — the flow
                never re-asks either (Ednah, Aug 2026). */}
            <ReviewRows rows={[
              ['Facility', facilityLabel(equipment.facilityId)],
              ['Region', `${regionLabel(equipment.regionId)} — set by the facility`],
            ]} />
          </FormSection>

          <FormSection icon={<IcoClipboard color={TEXT_DEFAULT} />} title="Maintenance and Warranty">
            <SelectInput
              label="Warranty years"
              options={WARRANTY_YEARS}
              placeholder="Select…"
              value={equipment.warrantyYears}
              onChange={(e) => setEquipment((s) => ({ ...s, warrantyYears: e.target.value }))}
            />
          </FormSection>

          <FormSection icon={<IcoQr color={TEXT_DEFAULT} />} title="QR Code" required>
            {equipment.qrCode ? (
              <>
                <Banner tone="info" inCard icon={<IcoQr size={20} color={TEXT_INFO} />}>
                  <><strong>{equipment.qrCode}</strong>{entryCtx === 'qr-scan'
                    ? ' was captured from your scan and will be linked to this equipment when the record is created.'
                    : ' is ready and will be linked to this equipment when the record is created.'}</>
                </Banner>
                {errors.qrCode && (
                  <p style={{ margin: '-8px 0 0', fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_CRITICAL }}>
                    {errors.qrCode}
                  </p>
                )}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Btn variant="secondary" onClick={() => setQrViewOpen(true)}>
                    Check QR Code
                  </Btn>
                  <Btn variant="secondary" onClick={() => setAssignQr({ scanning: false, scanned: null })}>
                    Reassign QR Code
                  </Btn>
                </div>
              </>
            ) : (
              <>
                <Banner tone="info" inCard icon={<IcoQr size={20} color={TEXT_INFO} />}>
                  No QR code has been generated for this equipment yet. Every equipment record needs one — assign it to continue.
                </Banner>
                {errors.qrCode && (
                  <p style={{ margin: '-8px 0 0', fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_CRITICAL }}>
                    {errors.qrCode}
                  </p>
                )}
                <div style={{ display: 'flex' }}>
                  <Btn variant="secondary" onClick={() => setAssignQr({ scanning: false, scanned: null })}>
                    Assign QR Code
                  </Btn>
                </div>
              </>
            )}
          </FormSection>
        </div>

        {/* Check QR Code — view the assigned label */}
        <Modal
          open={qrViewOpen}
          onClose={() => setQrViewOpen(false)}
          title="QR Code"
          size="small"
          footer={
            <Btn variant="secondary" small onClick={() => setQrViewOpen(false)}>Close</Btn>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '12px 0', textAlign: 'center' }}>
            <div style={{ border: `1px solid ${BORDER_LIGHT}`, borderRadius: 12, padding: 16 }}>
              <QrPreview code={equipment.qrCode || 'QR'} size={192} />
            </div>
            <span style={{ fontSize: 16, fontWeight: 650, lineHeight: '24px', color: TEXT_DEFAULT }}>
              {equipment.qrCode}
            </span>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
              This label will identify the equipment. Scanning it opens the equipment record.
            </p>
          </div>
        </Modal>

        {/* Assign QR Code — scan panel modal (simulated scanner issues a fresh label) */}
        <Modal
          open={assignQr != null}
          onClose={() => setAssignQr(null)}
          title="Assign QR Code"
          footer={<>
            <Btn variant="secondary" small onClick={() => setAssignQr(null)}>Cancel</Btn>
            <Btn
              variant="primary"
              small
              disabled={!assignQr?.scanned}
              onClick={() => {
                const code = assignQr.scanned;
                setEquipment((s) => ({ ...s, qrCode: code }));
                setErrors((prev) => ({ ...prev, qrCode: undefined }));
                setAssignQr(null);
                setSearchNotice({ tone: 'success', message: `${code} assigned to this equipment.` });
              }}
            >
              Assign QR Code
            </Btn>
          </>}
        >
          {assignQr != null && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{
                border: `1px solid ${BORDER_LIGHT}`, borderRadius: 12,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                padding: '40px 24px',
              }}>
                <IcoQr size={44} color={TEXT_SUBDUED} />
                <span style={{ fontSize: 16, fontWeight: 650, lineHeight: '24px', color: TEXT_DEFAULT }}>
                  Scan QR Code
                </span>
                <Btn
                  variant="primary"
                  icon={<IcoCamera />}
                  loading={assignQr.scanning}
                  disabled={assignQr.scanning}
                  onClick={() => {
                    setAssignQr((a) => ({ ...a, scanning: true }));
                    const code = `QR-${nextQrSeq}`;
                    setNextQrSeq((n) => n + 1);
                    setTimeout(() => setAssignQr((a) => (a ? { scanning: false, scanned: code } : a)), 1200);
                  }}
                >
                  {assignQr.scanning ? 'Scanning…' : assignQr.scanned ? 'Scan Again' : 'Start Scanning'}
                </Btn>
              </div>
              {assignQr.scanned && (
                <Banner tone="success" inCard>
                  QR Code scanned successfully! ({assignQr.scanned})
                </Banner>
              )}
            </div>
          )}
        </Modal>
      </StepFrame>
    );
  }

  // ── Review & confirm ────────────────────────────────────────────────────────
  if (step === 'review') {
    const device = RTMDS.find((d) => d.id === rtmd.deviceId);
    const isRtmd = monitoring.method === 'rtmd';
    const isExternal = monitoring.method === 'external';
    // Completion flags → section status badges (existing Badge component only).
    const equipmentComplete = !!(equipment.makeModel && equipment.serial.trim() && equipment.status && equipment.regionId && equipment.facilityId);
    const badge = (tone, text) => <Badge tone={tone} size="small">{text}</Badge>;
    const submitting = simulate === 'submitting';
    const submitFailed = simulate === 'submit-failed';
    const offline = simulate === 'offline';
    const submitLabel = submitting ? 'Creating record…' : submitFailed ? 'Try again' : 'Submit';
    body = (
      <StepFrame
        {...wizardChrome}
        title="Review and confirm"
        subtitle="Check everything before the equipment record is created."
        footerRight={<>{backBtn}{continueBtn(createEquipment, submitLabel, submitting || offline)}</>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

        {submitting && (
          <Banner tone="info" inCard title="Creating the equipment record">
            This can take a few moments. Stay on this page — leaving now will discard everything you entered.
          </Banner>
        )}

        {submitFailed && (
          <Banner tone="critical" inCard title="Couldn't create the equipment record">
            The server rejected the request. Nothing was saved and nothing you entered has been lost —
            select Try again. If it keeps failing, note the serial number and contact support.
          </Banner>
        )}

        {offline && (
          <Banner tone="warning" inCard title="You're offline">
            The equipment record can't be created without a connection. Everything you've entered is kept
            on this device — reconnect and submit again.
          </Banner>
        )}

        {/* Equipment — the equipment record itself (its own make/model/serial). */}
        <ReviewSection
          icon={<IcoDevice color={TEXT_DEFAULT} />}
          title="Equipment"
          status={badge(equipmentComplete ? 'success' : 'warning', equipmentComplete ? 'Complete' : 'Incomplete')}
          onEdit={() => goTo('details')}
        >
          <ReviewRows rows={[
            ['Make and model', equipment.makeModel || 'Not set'],
            ['Serial number', equipment.serial || 'Not set'],
            ['Funding source', equipment.fundingSource || 'Not set'],
            ['Equipment status', EQUIPMENT_STATUS.find((o) => o.id === equipment.status)?.label || 'Not set'],
            equipment.status === 'installed' && ['Install date', formatDate(equipment.installDate)],
            equipment.status === 'installed' && ['Power source', equipment.powerSource || 'Not set'],
            ['Region', regionLabel(equipment.regionId)],
            ['Facility', facilityLabel(equipment.facilityId)],
            ['Warranty', equipment.warrantyYears || 'Not set'],
          ]} />
        </ReviewSection>

        {/* Monitoring Device — separate from Equipment; NOT assumed to share a
            manufacturer. Shown for RTMD and built-in / third-party devices. */}
        {isRtmd && (
          <ReviewSection
            icon={<IcoThermometer color={TEXT_DEFAULT} />}
            title="Monitoring Device"
            status={badge('success', 'Registered')}
            onEdit={() => goTo('rtmd-select')}
          >
            <ReviewRows rows={[
              ['Manufacturer', 'Nexleaf'],
              ['Model', device ? device.model : 'Not set'],
              ['Serial number (IMEI)', device ? device.imei : 'Not set'],
              ['Monitoring type', 'Nexleaf RTMD'],
            ]} />
          </ReviewSection>
        )}
        {isExternal && (
          <ReviewSection
            icon={<IcoThermometer color={TEXT_DEFAULT} />}
            title="Monitoring Device"
            status={badge('success', 'Registered')}
            onEdit={() => goTo('device')}
          >
            <ReviewRows rows={[
              ['Manufacturer', externalDevice.manufacturer || 'Not set'],
              ['Device / model', externalDevice.model || 'Not set'],
              ['Unique identifier', externalDevice.serial || 'Not set'],
              externalDevice.identifier && ['Sensor identifier', externalDevice.identifier],
              ['Monitoring type', 'Manual recording'],
            ]} />
          </ReviewSection>
        )}

        {/* RTMD Configuration — the install setup (facility, sensors, contacts). */}
        {isRtmd && (
          <ReviewSection
            icon={<IcoDevice color={TEXT_DEFAULT} />}
            title="RTMD Configuration"
            status={badge('success', 'Complete')}
            onEdit={() => goTo('rtmd-configure')}
          >
            <ReviewRows rows={[
              ['Configured on', formatDate(rtmd.configDate)],
              ['Sensor', rtmd.sensor1.serial || 'Not assigned'],
              ['Alarm thresholds', 'WHO recommendation (admin-managed)'],
              ['Alarm contacts', contactNames.length ? contactNames.join(', ') : 'None (dashboard alarms only)'],
            ]} />
          </ReviewSection>
        )}

        {/* Unmonitored Equipment. */}
        {monitoring.method === 'none' && (
          <ReviewSection
            icon={<IcoThermometer color={TEXT_DEFAULT} />}
            title="Monitoring"
            status={badge('default', 'Unmonitored Equipment')}
            onEdit={() => goTo('method')}
          >
            <ReviewRows rows={[
              ['Monitoring type', 'Unmonitored Equipment'],
              ['Temperature source', 'Manual recording'],
            ]} />
          </ReviewSection>
        )}

        {/* QR Code. */}
        <ReviewSection
          icon={<IcoQr color={TEXT_DEFAULT} />}
          title="QR Code"
          status={equipment.qrCode ? badge('success', 'Assigned') : badge('warning', 'Not assigned')}
          onEdit={() => goTo('details')}
        >
          <ReviewRows rows={[
            ['QR code', equipment.qrCode || 'Not assigned'],
          ]} />
        </ReviewSection>

        {temperatureSource === 'Manual recording' && (
          <Banner tone="info" inCard>
            This equipment will appear in Manual Temperature Recording for twice-daily readings.
          </Banner>
        )}
        </div>
      </StepFrame>
    );
  }

  // ── Success — return to Manual Temperature Recording ────────────────────────
  if (step === 'success') {
    const successDevice = RTMDS.find((d) => d.id === rtmd.deviceId);
    const isRtmd = monitoring.method === 'rtmd';
    const isExternal = monitoring.method === 'external';
    const isManual = temperatureSource === 'Manual recording';
    // Monitoring one-liner for the summary card.
    const monitoringSummary = isRtmd
      ? `Nexleaf RTMD · ${successDevice ? successDevice.model : 'ColdTrace'}`
      : isExternal
        ? `${[externalDevice.manufacturer, externalDevice.model].filter(Boolean).join(' ') || 'Monitoring device'}${externalDevice.serial ? ` · ${externalDevice.serial}` : ''}`
        : 'Unmonitored Equipment';
    // Completion status → the DS success panel's tone-dot status lines.
    // Only the Nexleaf RTMD uploads automatically; third-party is manual, so
    // there's no integration/connection state to report here.
    const statusLines = [
      { dot: 'success', text: 'Equipment registered' },
      isRtmd && { dot: 'success', text: 'Monitoring device configured' },
      isExternal && { dot: 'success', text: 'Monitoring device registered' },
      { dot: equipment.qrCode ? 'success' : 'warning', text: equipment.qrCode ? 'QR code assigned' : 'QR code not assigned' },
      { dot: 'success', text: isManual ? 'Ready for temperature recording' : 'Ready for use' },
    ].filter(Boolean);
    // What's-next framing, per monitoring type → panel footer.
    const nextMessage = simulate === 'no-readings'
      ? 'The record is saved, but this RTMD has not reported a reading yet.'
      : isManual
        ? 'This equipment is ready for manual temperature recording.'
        : 'This equipment is ready for use. Readings upload automatically.';

    // Entry-point-tailored actions (same destinations as before).
    let primaryAction;
    let secondaryActions;
    if (fromRecording && isManual) {
      primaryAction = { label: 'Record First Temperature', onClick: exitFlow };
      secondaryActions = [{ label: 'View Equipment', onClick: exitFlow }];
    } else if (fromRecording) {
      primaryAction = { label: 'View Equipment', onClick: exitFlow };
      secondaryActions = [{ label: 'Back to temperature tasks', onClick: exitFlow }];
    } else {
      primaryAction = { label: 'View Equipment', onClick: onExit };
      secondaryActions = [{ label: 'Add Another Equipment', onClick: () => {
        setStep('method'); setHistory([]); setErrors({});
        setEquipment({ serial: '', qrCode: '', makeModel: '', fundingSource: '', status: '', installDate: null, powerSource: '', regionId: '', facilityId: '', warrantyYears: '' });
        setMonitoring({ method: null });
      } }];
    }

    body = (
      // The confirmation sits directly on the flow's own white card (same
      // surface as every wizard step) — SubmissionSuccessCard renders flush
      // (surface={false}) so there's no nested white-on-white card. The Add
      // Equipment flow supplies all the content: identity, completion status,
      // what's next.
      <Card style={{ minHeight: 'calc(100vh - 160px)', padding: isMobile ? '24px 16px' : '40px 32px', justifyContent: 'center' }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <SubmissionSuccessCard
            surface={false}
            title="Equipment added successfully"
            homeAction={{ onClick: onExit }}
            sections={[
              { lines: [
                { label: 'Equipment', value: `${equipment.makeModel || 'Not set'}${equipment.serial ? ` · ${equipment.serial}` : ''}` },
                { label: 'Monitoring', value: monitoringSummary },
                { label: 'QR code', value: equipment.qrCode || 'Not assigned' },
                { label: 'Facility', value: `${facilityLabel(equipment.facilityId)} · ${regionLabel(equipment.regionId)}` },
              ] },
              { heading: 'Completion status', lines: statusLines },
            ]}
            footer={{ label: 'What’s next', value: nextMessage }}
            primaryAction={primaryAction}
            secondaryActions={secondaryActions}
          />
          {simulate === 'no-readings' && (
            <div style={{ width: '100%', maxWidth: 560 }}>
              <Banner tone="warning" inCard title="No readings received yet">
                An RTMD usually reports within its upload interval — an hour on the default configuration.
                If nothing arrives by then, check the device is powered and has signal, then use Device Logs
                on the RTMD's page to confirm whether it has sent anything at all.
              </Banner>
            </div>
          )}
        </div>
      </Card>
    );
  }

  // ── Frame + cancel confirmation ─────────────────────────────────────────────
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {body}
      {searchNotice && (
        <Toast tone={searchNotice.tone} onDismiss={() => setSearchNotice(null)}>
          {searchNotice.message}
        </Toast>
      )}
      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title="Discard this equipment?"
        size="small"
        footer={<>
          <Btn variant="secondary" onClick={() => setCancelOpen(false)}>Keep editing</Btn>
          <Btn variant="destructive" onClick={() => { setCancelOpen(false); exitFlow(); }}>Discard</Btn>
        </>}
      >
        <p style={{ margin: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
          Nothing has been saved yet. {searchFirst
            ? 'You’ll return to the Scan QR Code screen.'
            : fromRecording
              ? `You’ll return to Manual Temperature Recording${equipment.serial ? `, and the serial number ${equipment.serial} you entered will be kept in the search` : ''}.`
              : 'You’ll return to Equipment Management.'}
        </p>
      </Modal>

      {/* Scan Progress — serial-search results (Figma: single match, multiple
          matches with "add as new", or fall through to the not-found pop-up) */}
      <Modal
        open={searchResults != null}
        onClose={() => setSearchResults(null)}
        title="Scan Progress"
        maxWidth={520}
        footer={<>
          <Btn variant="secondary" small onClick={() => setSearchResults(null)}>Cancel</Btn>
          <Btn variant="primary" small disabled={!searchResults?.selected} onClick={continueFromResults}>Continue</Btn>
        </>}
      >
        {searchResults != null && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {!searchResults.exact && (
              <p style={{ margin: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
                {searchResults.matches.length} registered {searchResults.matches.length === 1 ? 'record matches' : 'records match'} “{searchResults.query}”.
                Select the right one, or add it as new equipment.
              </p>
            )}
            {searchResults.matches.map((eq) => (
              <ResultPanel
                key={eq.serial}
                title={eq.name}
                lines={[
                  `Serial Number: ${eq.serial}`,
                  `${eq.facility} · ${eq.region || eq.county}`,
                  `Monitoring: ${eq.monitoring || 'Manual recording'}`,
                ]}
                selectable={!searchResults.exact}
                selected={searchResults.selected === eq.serial}
                onSelect={() => setSearchResults((r) => ({ ...r, selected: eq.serial }))}
              />
            ))}
            {!searchResults.exact && (
              <div
                role="radio"
                aria-checked={searchResults.selected === '__new__'}
                tabIndex={0}
                onClick={() => setSearchResults((r) => ({ ...r, selected: '__new__' }))}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSearchResults((r) => ({ ...r, selected: '__new__' })); } }}
                style={{
                  background: BG_SURFACE, borderRadius: 8, padding: '12px 16px',
                  boxShadow: searchResults.selected === '__new__' ? `0 0 0 2px ${COLOR_PRIMARY}` : `inset 0 0 0 1px ${BORDER_DEFAULT}`,
                  outline: 'none', cursor: 'pointer', transition: 'box-shadow 0.12s ease',
                  display: 'flex', flexDirection: 'column', gap: 2,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 650, lineHeight: '20px', color: TEXT_DEFAULT }}>
                  None of these? Add as new equipment
                </span>
                <span style={{ fontSize: 13, fontWeight: 450, lineHeight: '18px', color: TEXT_SUBDUED }}>
                  Create a new record with the serial number “{searchResults.query}”.
                </span>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Prototype scanner — simulates reading an unassigned QR label */}
      <Modal
        open={scanOpen}
        onClose={() => setScanOpen(false)}
        title="Scan QR code"
        size="small"
        showCloseButton={false}
        closeOnBackdrop={false}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '8px 0', textAlign: 'center' }}>
          <CircleMedia tone="info"><IcoQr size={44} color={TEXT_DEFAULT} /></CircleMedia>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
            Looking for a QR label. Hold the camera steady…
          </p>
        </div>
      </Modal>
    </div>
  );
}
