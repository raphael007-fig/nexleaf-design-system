// ── Pages / Add Equipment — Manual Temperature Recording ─────────────────────
// The Add Equipment flow reached from (1) a failed serial-number search in
// Manual Temperature Recording, (2) an unassigned QR-code scan, or (3)
// Equipment Management → Add Equipment.
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
import { Page } from '../../components/Page/Page.jsx';
import { useIsMobile, useViewport } from '../../foundation/useViewport.js';
import { Card, CardSectionTitle, CardField, CardDivider } from '../../components/Card/Card.jsx';
import { Btn } from '../../components/Btn/Btn.jsx';
import { Banner } from '../../components/Banner/Banner.jsx';
import { Badge } from '../../components/Badge/Badge.jsx';
import { Tag } from '../../components/Tag/Tag.jsx';
import { Modal } from '../../components/Modal/Modal.jsx';
import { Cell } from '../../components/Cell/Cell.jsx';
import { Divider } from '../../components/Divider/Divider.jsx';
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx';
import { TextInput } from '../../components/TextInput/TextInput.jsx';
import { NumberInput } from '../../components/NumberInput/NumberInput.jsx';
import { TextareaInput } from '../../components/TextareaInput/TextareaInput.jsx';
import { SelectInput } from '../../components/SelectInput/SelectInput.jsx';
import { SearchSelect, SearchSelectMulti } from '../../components/SearchSelect/SearchSelect.jsx';
import { Upload } from '../../components/Upload/Upload.jsx';
import { Stepper } from '../../components/Stepper/Stepper.jsx';
import { DateField } from '../../components/DateField/DateField.jsx';
import { Toast } from '../../components/Toast/Toast.jsx';
import { OptionCard } from '../../components/OptionCard/OptionCard.jsx';
import { ScanQrCodeBody } from '../ScanQrCode/ScanQrCodeBody.jsx';
import {
  TEXT_DEFAULT, TEXT_SUBDUED, TEXT_INFO, BG_INFO, BG_WARNING, BG_SUCCESS, BG_SURFACE,
  BORDER_LIGHT,
  COLOR_PRIMARY, COLOR_SUCCESS, COLOR_SUCCESS_FILLED, COLOR_CRITICAL_STRONG,
} from '../../tokens/index.js';

// ─── Reference data (prototype backend) ───────────────────────────────────────

export const EXISTING_SERIALS = ['EQ1-001', 'CCE-2214-KLF', 'VF-2024-001234'];
export const ASSIGNED_QRS = ['QR-00412', 'QR-01118'];

export const RTMDS = [
  { id: 'rtmd-1', imei: '356938035643809', mac: 'DC:2C:26:0A:4F:12', model: 'ColdTrace 5' },
  { id: 'rtmd-2', imei: '359871060312345', mac: 'DC:2C:26:0A:51:88', model: 'ColdTrace 5' },
  { id: 'rtmd-3', imei: '352099001761481', mac: 'F0:9E:9E:11:23:C4', model: 'ColdTrace X' },
];

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

const EQUIPMENT_TYPES = ['ILR Refrigerator', 'Vaccine Freezer', 'Refrigerator-Freezer Combo', 'Walk-in Cold Room', 'Transport Cold Box'];
const EQUIPMENT_MAKERS = ['Vestfrost', 'Haier Biomedical', 'B Medical Systems', 'Godrej', 'Dometic', 'Zero Appliances'];
const COMM_METHODS = ['Display only (read on device)', 'USB download', 'Bluetooth to phone app', 'SMS gateway', 'Manual export from vendor portal'];
const COMPARTMENTS = ['Fridge compartment (+2 to +8 °C)', 'Freezer compartment (−25 to −15 °C)', 'Ambient / room'];

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

const IcoSearch = ({ size = 20, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="5.25" stroke={color} strokeWidth="1.5" />
    <path d="m13 13 3.5 3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoQr = ({ size = 20, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2.75" y="2.75" width="5.5" height="5.5" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="11.75" y="2.75" width="5.5" height="5.5" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="2.75" y="11.75" width="5.5" height="5.5" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="11.5" y="11.5" width="2.5" height="2.5" rx="0.5" fill={color} />
    <rect x="15" y="15" width="2.5" height="2.5" rx="0.5" fill={color} />
  </svg>
);

const IcoThermometer = ({ size = 20, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M8.5 3.5a1.5 1.5 0 0 1 3 0v7.1a3.5 3.5 0 1 1-3 0V3.5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="10" cy="13.75" r="1.4" fill={color} />
    <path d="M10 12.5V7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoDevice = ({ size = 20, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="3.25" y="4.25" width="13.5" height="9.5" rx="1.5" stroke={color} strokeWidth="1.5" />
    <path d="M7 16h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.5 7.5h4M6.5 10h2.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IcoCloud = ({ size = 20, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M6 14.5a3.25 3.25 0 0 1-.4-6.48 4.5 4.5 0 0 1 8.77 1.03A2.75 2.75 0 0 1 14 14.5H6Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const IcoLocation = ({ size = 20, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 17.5s5.5-4.7 5.5-8.75a5.5 5.5 0 1 0-11 0C4.5 12.8 10 17.5 10 17.5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="10" cy="8.75" r="1.9" stroke={color} strokeWidth="1.5" />
  </svg>
);

const IcoCheckCircle = ({ size = 20, color = COLOR_SUCCESS }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="7.25" stroke={color} strokeWidth="1.5" />
    <path d="m6.8 10.2 2.1 2.1 4.3-4.6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoClipboard = ({ size = 20, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="4.75" y="3.75" width="10.5" height="13.5" rx="1.5" stroke={color} strokeWidth="1.5" />
    <path d="M7.5 3.75h5v1.75a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1-.75-.75V3.75Z" fill={color} />
    <path d="M7.5 9.5h5M7.5 12.5h3.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// Monitoring-method illustrations (64px, inline SVG, token colors only) — a
// monitored screen with a status badge: check = Nexleaf, signal = third-party,
// cross = unmonitored. Matches the Figma cards' 64px illustration slot.
const IlloMonitor = ({ badge, size = 64 }) => {
  const badgeFill = badge === 'check' ? COLOR_SUCCESS_FILLED
    : badge === 'signal' ? COLOR_PRIMARY
      : COLOR_CRITICAL_STRONG;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="8" y="12" width="44" height="30" rx="4" fill={BG_INFO} stroke={COLOR_PRIMARY} strokeWidth="2.5" />
      <path d="M15 32c3-6 6-6 9 0s6 6 9 0 6-6 9 0" stroke={COLOR_PRIMARY} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 42v7" stroke={COLOR_PRIMARY} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 52h20" stroke={COLOR_PRIMARY} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="50" cy="16" r="11" fill={badgeFill} stroke={BG_SURFACE} strokeWidth="2.5" />
      {badge === 'check' && (
        <path d="m45.5 16.2 3 3 5-5.5" stroke={BG_SURFACE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {badge === 'signal' && (<>
        <path d="M46 18.5a6 6 0 0 1 8 0" stroke={BG_SURFACE} strokeWidth="2" strokeLinecap="round" />
        <path d="M47.8 15.6a3.6 3.6 0 0 1 4.4 0" stroke={BG_SURFACE} strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="20.4" r="1.4" fill={BG_SURFACE} />
      </>)}
      {badge === 'cross' && (
        <path d="m46.5 12.5 7 7m0-7-7 7" stroke={BG_SURFACE} strokeWidth="2.5" strokeLinecap="round" />
      )}
    </svg>
  );
};

const METHOD_OPTIONS = [
  {
    id: 'rtmd',
    title: 'Monitored Equipment by Nexleaf',
    description: 'A Nexleaf remote temperature monitoring device is (or will be) installed on this equipment. Data uploads automatically.',
    badge: 'check',
  },
  {
    id: 'external',
    title: 'Built in or 3rd Party Device',
    description: 'The equipment has its own logger or display e.g. a built-in Haier logger or a Berlinger Fridge-tag. We’ll check whether it can be connected.',
    badge: 'signal',
  },
  {
    id: 'none',
    title: 'Unmonitored Equipment',
    description: 'No device records this equipment’s temperature. Temperatures will be recorded manually with a thermometer.',
    badge: 'cross',
  },
];

const IcoUser = ({ size = 20, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="6.75" r="3" stroke={color} strokeWidth="1.5" />
    <path d="M4.25 16.5a5.75 5.75 0 0 1 11.5 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
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
function useFixedFrame(deps = []) {
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

function StepFrame({ header, onBack, stepper, title, subtitle, children, footerLeft, footerRight }) {
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
          <div style={{ width: '100%', maxWidth: 620, display: 'flex', flexDirection: 'column' }}>
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

// Review-section header: CardSectionTitle + a ghost Edit action.
function ReviewSection({ icon, title, onEdit, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <CardSectionTitle icon={icon} title={title} />
        {onEdit && <Btn variant="ghost" small onClick={onEdit}>Edit</Btn>}
      </div>
      {children}
    </div>
  );
}

// ─── Wizard phases (Figma 8061-292936 — solar-equipment wizard chrome) ────────
// Each monitoring method gets its own phase spine for the horizontal stepper;
// micro-steps advance within a phase, so one layout serves all three flows.

function phasesFor(method, provider) {
  if (method === 'rtmd') {
    return [
      { label: 'Select RTMD', steps: ['rtmd-select'] },
      { label: 'Configure RTMD', steps: ['rtmd-configure'] },
      { label: 'Facility & Sensors', steps: ['rtmd-facility', 'rtmd-sensors', 'rtmd-confirm'] },
      { label: 'Equipment Details', steps: ['details'] },
      { label: 'Review & Submit', steps: ['review'] },
    ];
  }
  if (method === 'external') {
    return [
      { label: 'Monitoring Device', steps: ['provider'] },
      provider
        ? (provider.supported
          ? { label: 'Connect Device', steps: ['connect', 'connected'] }
          : { label: 'Register Device', steps: ['register'] })
        : { label: 'Connect / Register', steps: ['connect', 'connected', 'register'] },
      { label: 'Equipment Details', steps: ['details'] },
      { label: 'Review & Submit', steps: ['review'] },
    ];
  }
  return [
    { label: 'Equipment Details', steps: ['details'] },
    { label: 'Review & Submit', steps: ['review'] },
  ];
}

const WIZARD_SUBTITLES = {
  rtmd: 'Install the Nexleaf RTMD and register the equipment it monitors on the Nexleaf platform.',
  external: 'Connect or register the monitoring device and register the equipment it monitors.',
  none: 'Register the equipment for manual temperature recording on the Nexleaf platform.',
};

const ENTRY_COPY = {
  'serial-search': {
    icon: <IcoSearch size={20} color={TEXT_INFO} />,
    title: 'No equipment found with this serial number.',
    body: 'It may not be registered yet. You can add it now, and the serial number you entered will be kept.',
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
    const ph = phasesFor(
      initialData.monitoring?.method ?? null,
      providerById(initialData.integration?.providerId || initialData.externalDevice?.providerId),
    );
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
  const [locationPromptOpen, setLocationPromptOpen] = useState(true);
  const [searchNotice, setSearchNotice] = useState(null);
  const fromRecording = entryCtx === 'serial-search' || entryCtx === 'qr-scan';

  // The three separate concepts: equipment / monitoring device / integration.
  const [equipment, setEquipment] = useState({
    serial: entrySerial, qrCode: entryQr, type: '', manufacturer: '', model: '',
    facilityId: '', location: '',
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
  const [contactDraft, setContactDraft] = useState(null);
  const [contactErrors, setContactErrors] = useState({});
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
  const [reading, setReading] = useState({ value: '', saved: false });

  const provider = providerById(integration.providerId || externalDevice.providerId);

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
    if (EXISTING_SERIALS.includes(s)) {
      setSearchNotice({ tone: 'success', message: `${s} is already registered. Its record opens here for temperature recording.` });
      return;
    }
    setSearchNotice(null);
    setEntryCtx('serial-search');
    setEquipment((prev) => ({ ...prev, serial: s }));
    goTo('entry');
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
    // Prototype scanner: after a beat, "reads" an unassigned QR label.
    setTimeout(() => {
      setScanOpen(false);
      setSearchNotice(null);
      setEntryCtx('qr-scan');
      setEquipment((prev) => ({ ...prev, qrCode: prev.qrCode || 'QR-30977' }));
      goTo('entry');
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
    setEquipment({ serial: '', qrCode: '', type: '', manufacturer: '', model: '', facilityId: '', location: '' });
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
  const phases = phasesFor(monitoring.method, provider);
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
  function connectDevice() {
    const outcome = simulateConnection !== 'auto'
      ? simulateConnection
      : integration.accessCode === '0000' ? 'failed'
        : integration.deviceId.toUpperCase().startsWith('OFF') ? 'unavailable'
          : 'success';
    setIntegration((s) => ({ ...s, status: 'connecting' }));
    setTimeout(() => {
      if (outcome === 'success') {
        setIntegration((s) => ({
          ...s, status: 'connected', lastSync: 'Just now', latestReading: '+4.6 °C at 09:42',
        }));
        setHistory((h) => [...h, 'connect']);
        setStep('connected');
      } else {
        setIntegration((s) => ({ ...s, status: outcome }));
      }
    }, 900);
  }

  function configureRtmd() {
    setRtmd((s) => ({ ...s, configuring: true }));
    setTimeout(() => setRtmd((s) => ({ ...s, configuring: false, configured: true })), 1100);
  }

  function validateDetails() {
    const e = {};
    if (!equipment.serial.trim()) e.serial = 'Serial number is required.';
    else if (EXISTING_SERIALS.includes(equipment.serial.trim())) {
      e.serial = 'An equipment record with this serial number already exists. Search for it in Manual Temperature Recording instead of creating a duplicate.';
    }
    if (equipment.qrCode && ASSIGNED_QRS.includes(equipment.qrCode.trim())) {
      e.qrCode = 'This QR code is already assigned to another equipment record. Remove it there first, or scan a different code.';
    }
    if (!equipment.type) e.type = 'Equipment type is required.';
    if (!equipment.manufacturer) e.manufacturer = 'Manufacturer is required.';
    if (!equipment.facilityId) e.facilityId = 'Facility is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function createEquipment() {
    const record = { equipment, monitoring, rtmd, integration, externalDevice };
    onCreated?.(record);
    goTo('success');
  }

  // Temperature source, derived — RTMD / connected integration = automatic;
  // everything else = manual recording.
  const temperatureSource =
    monitoring.method === 'rtmd' ? 'Automatic · Nexleaf RTMD'
      : monitoring.method === 'external' && integration.status === 'connected'
        ? `Automatic · ${provider?.label || 'integration'}`
        : 'Manual recording';

  const contactNames = rtmd.contacts
    .map((id) => contactDirectory.find((c) => c.id === id)?.name)
    .filter(Boolean);

  // ── Shared footer buttons ───────────────────────────────────────────────────
  const cancelBtn = <Btn variant="ghost" onClick={() => setCancelOpen(true)}>Cancel</Btn>;
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
              onClick={() => goTo(monitoring.method === 'rtmd' ? 'rtmd-select' : monitoring.method === 'external' ? 'provider' : 'details')}
            >
              Continue
            </Btn>
          </>}
        >
          <div role="radiogroup" aria-label="How is this equipment's temperature monitored?" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {METHOD_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.id}
                media={<IlloMonitor badge={opt.badge} />}
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
        footerLeft={cancelBtn}
        footerRight={<>{backBtn}{continueBtn(() => {
          const e = {};
          if (!rtmd.deviceId) e.rtmd = 'Select an RTMD to continue.';
          if (!rtmd.configDate) e.configDate = 'Configuration date is required.';
          setErrors(e);
          if (Object.keys(e).length) return;
          goTo('rtmd-configure');
        })}</>}
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
        footerLeft={cancelBtn}
        footerRight={<>{backBtn}{continueBtn(() => goTo('rtmd-facility'), 'Next', !rtmd.configured)}</>}
      >
        <div>
          <CardField label="Device" value={device.model} />
          <CardDivider />
          <CardField label="IMEI" value={device.imei} />
          <CardDivider />
          <CardField label="MAC address" value={device.mac} />
          <CardDivider />
          <CardField label="Configuration date" value={formatDate(rtmd.configDate)} />
        </div>
        {rtmd.locationGranted ? (
          <Banner tone="success" title="Location captured">
            −4.0435° S, 39.6682° E · accuracy ±8 m. The installation location is saved with this RTMD.
          </Banner>
        ) : (
          <Banner
            tone="info"
            title="Location permission needed"
            actions={[{ label: 'Allow location access', onClick: () => setLocationPromptOpen(true) }]}
          >
            ColdTrace records where the RTMD is installed so alerts and reports point to the right place.
          </Banner>
        )}
        {rtmd.configured ? (
          <Banner tone="success" title="RTMD configured">
            The device accepted the configuration and reported a first heartbeat.
          </Banner>
        ) : (
          <Btn variant="primary" fullWidth loading={rtmd.configuring} disabled={!rtmd.locationGranted || rtmd.configuring} onClick={configureRtmd}>
            {rtmd.configuring ? 'Configuring…' : 'Configure RTMD'}
          </Btn>
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

  if (step === 'rtmd-facility') {
    const added = rtmd.contacts.map((id) => contactDirectory.find((c) => c.id === id)).filter(Boolean);
    const contactOptions = contactDirectory.map((c) => ({ id: c.id, label: `${c.name} · ${c.phone}` }));
    const atLimit = added.length >= MAX_ALARM_CONTACTS;
    body = (
      <StepFrame
        {...wizardChrome}
        title="Facility & alarm contacts"
        subtitle="The facility where this RTMD and equipment are installed, and who gets its SMS alarm alerts."
        footerLeft={cancelBtn}
        footerRight={<>{backBtn}{continueBtn(() => {
          if (!rtmd.facilityId) { setErrors({ facility: 'Select a facility to continue.' }); return; }
          setEquipment((s) => ({ ...s, facilityId: rtmd.facilityId || s.facilityId }));
          goTo('rtmd-sensors');
        })}</>}
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
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 650, lineHeight: '20px', color: TEXT_DEFAULT }}>
                Alarm contacts
              </h3>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
                A facility can have up to {MAX_ALARM_CONTACTS} RTMD alarm contacts. They receive SMS alerts when this RTMD raises an alarm.
              </p>
            </div>

            {/* Multi-select: checking adds, unchecking removes — kept in sync
                with the contact list below. */}
            <SearchSelectMulti
              label="Add alarm contacts"
              placeholder="Search contacts by name…"
              tagsInside
              options={contactOptions}
              value={rtmd.contacts}
              onChange={(ids) => {
                if (ids.length > MAX_ALARM_CONTACTS) {
                  setSearchNotice({ tone: 'warning', message: `A facility can have at most ${MAX_ALARM_CONTACTS} alarm contacts. Remove one to add someone else.` });
                  return;
                }
                setRtmd((s) => ({ ...s, contacts: ids }));
              }}
            />
            {!atLimit ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: -12 }}>
                <span style={{ fontSize: 13, fontWeight: 450, color: TEXT_SUBDUED }}>
                  Search and select contacts, or
                </span>
                <Btn variant="ghost" small onClick={() => {
                  setContactErrors({});
                  setContactDraft({ email: '', phone: '', first: '', last: '', occupation: '', language: 'English' });
                }}>
                  Create a new contact
                </Btn>
              </div>
            ) : (
              <Banner tone="info" title="Contact limit reached">
                This facility has the maximum of {MAX_ALARM_CONTACTS} alarm contacts. Remove one to add or create someone else.
              </Banner>
            )}

            {added.length === 0 ? (
              <Banner tone="info">
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
                  onButtonClick={() => setRtmd((s) => ({ ...s, contacts: s.contacts.filter((id) => id !== c.id) }))}
                  ariaLabel={`Alarm contact ${c.name}`}
                />
              ))
            )}
          </>
        )}

        {/* Create Facility Contact — structured modal, saves into the directory */}
        <Modal
          open={contactDraft != null}
          onClose={() => setContactDraft(null)}
          title="Create facility contact"
          maxWidth={480}
          footer={<>
            <Btn variant="secondary" small onClick={() => setContactDraft(null)}>Cancel</Btn>
            <Btn variant="primary" small onClick={() => {
              const e = {};
              if (!contactDraft.phone.trim()) e.phone = 'Phone number is required.';
              if (!contactDraft.first.trim()) e.first = 'First name is required.';
              setContactErrors(e);
              if (Object.keys(e).length) return;
              const id = `new-${Date.now()}`;
              const contact = {
                id,
                name: `${contactDraft.first.trim()} ${contactDraft.last.trim()}`.trim(),
                phone: contactDraft.phone.trim(),
                occupation: contactDraft.occupation || 'Facility staff',
                language: contactDraft.language,
                email: contactDraft.email.trim(),
              };
              setContactDirectory((d) => [...d, contact]);
              setRtmd((s) => (s.contacts.length < MAX_ALARM_CONTACTS
                ? { ...s, contacts: [...s.contacts, id] }
                : s));
              setContactDraft(null);
            }}>Save</Btn>
          </>}
        >
          {contactDraft != null && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <TextInput
                label="Phone number"
                required
                placeholder="e.g. +254 722 000 000"
                helpText="Include the country code. SMS alarm alerts go to this number."
                value={contactDraft.phone}
                onChange={(e) => setContactDraft((d) => ({ ...d, phone: e.target.value }))}
                error={contactErrors.phone}
              />
              <TextInput
                label="Email address"
                placeholder="e.g. j.zulu@moh.go.ke"
                value={contactDraft.email}
                onChange={(e) => setContactDraft((d) => ({ ...d, email: e.target.value }))}
              />
              <TextInput
                label="First name"
                required
                value={contactDraft.first}
                onChange={(e) => setContactDraft((d) => ({ ...d, first: e.target.value }))}
                error={contactErrors.first}
              />
              <TextInput
                label="Last name"
                value={contactDraft.last}
                onChange={(e) => setContactDraft((d) => ({ ...d, last: e.target.value }))}
              />
              <SelectInput
                label="Occupation"
                options={OCCUPATIONS}
                placeholder="Select…"
                value={contactDraft.occupation}
                onChange={(e) => setContactDraft((d) => ({ ...d, occupation: e.target.value }))}
              />
              <SelectInput
                label="Language"
                options={LANGUAGES}
                helpText="Alarm SMS messages are sent in this language."
                value={contactDraft.language}
                onChange={(e) => setContactDraft((d) => ({ ...d, language: e.target.value }))}
              />
            </div>
          )}
        </Modal>
      </StepFrame>
    );
  }

  if (step === 'rtmd-sensors') {
    body = (
      <StepFrame
        {...wizardChrome}
        title="Sensor configuration"
        subtitle="Set what each sensor probe monitors and its safe temperature range."
        footerLeft={cancelBtn}
        footerRight={<>{backBtn}{continueBtn(() => goTo('rtmd-confirm'))}</>}
      >
        <SelectInput
          label="Sensor 1 compartment"
          required
          options={COMPARTMENTS}
          value={rtmd.sensor1.compartment}
          onChange={(e) => setRtmd((s) => ({ ...s, sensor1: { ...s.sensor1, compartment: e.target.value } }))}
        />
        <NumberInput label="Min alarm" suffix="°C" step={0.5} value={rtmd.sensor1.min}
          onChange={(v) => setRtmd((s) => ({ ...s, sensor1: { ...s.sensor1, min: v } }))} />
        <NumberInput label="Max alarm" suffix="°C" step={0.5} value={rtmd.sensor1.max}
          onChange={(v) => setRtmd((s) => ({ ...s, sensor1: { ...s.sensor1, max: v } }))} />
        <Checkbox
          label="This RTMD monitors a second compartment"
          checked={rtmd.hasSensor2}
          onChange={() => setRtmd((s) => ({ ...s, hasSensor2: !s.hasSensor2 }))}
        />
        {rtmd.hasSensor2 && (
          <>
            <SelectInput
              label="Sensor 2 compartment"
              options={COMPARTMENTS}
              value={rtmd.sensor2.compartment}
              onChange={(e) => setRtmd((s) => ({ ...s, sensor2: { ...s.sensor2, compartment: e.target.value } }))}
            />
            <NumberInput label="Min alarm" suffix="°C" step={0.5} value={rtmd.sensor2.min}
              onChange={(v) => setRtmd((s) => ({ ...s, sensor2: { ...s.sensor2, min: v } }))} />
            <NumberInput label="Max alarm" suffix="°C" step={0.5} value={rtmd.sensor2.max}
              onChange={(v) => setRtmd((s) => ({ ...s, sensor2: { ...s.sensor2, max: v } }))} />
          </>
        )}
      </StepFrame>
    );
  }

  if (step === 'rtmd-confirm') {
    const device = RTMDS.find((d) => d.id === rtmd.deviceId) || RTMDS[0];
    body = (
      <StepFrame
        {...wizardChrome}
        title="Confirm RTMD installation"
        subtitle="Review the monitoring setup. Next you'll add the equipment's own details."
        footerLeft={cancelBtn}
        footerRight={<>{backBtn}{continueBtn(() => goTo('details'), 'Confirm RTMD')}</>}
      >
        <Banner tone="success" title="RTMD ready">
          Sensor data will upload automatically once the equipment record is created.
        </Banner>
        <div>
          <CardField label="Device" value={`${device.model} · ${device.imei}`} />
          <CardDivider />
          <CardField label="Facility" value={facilityLabel(rtmd.facilityId)} />
          <CardDivider />
          <CardField label="Alarm contacts" value={contactNames.length ? contactNames.join(', ') : 'None (dashboard alarms only)'} />
          <CardDivider />
          <CardField label="Configured on" value={formatDate(rtmd.configDate)} />
          <CardDivider />
          <CardField label="Sensor 1" value={`${rtmd.sensor1.compartment} · ${rtmd.sensor1.min} to ${rtmd.sensor1.max} °C`} />
          {rtmd.hasSensor2 && (<>
            <CardDivider />
            <CardField label="Sensor 2" value={`${rtmd.sensor2.compartment} · ${rtmd.sensor2.min} to ${rtmd.sensor2.max} °C`} />
          </>)}
        </div>
      </StepFrame>
    );
  }

  // ── Flow 2 — Built-in / third-party device ──────────────────────────────────
  if (step === 'provider') {
    body = (
      <StepFrame
        {...wizardChrome}
        title="Monitoring device manufacturer"
        subtitle="Who makes the monitoring device on this equipment? We'll check whether ColdTrace can collect its data automatically."
        footerLeft={cancelBtn}
        footerRight={<>{backBtn}{continueBtn(() => {
          if (!provider) { setErrors({ provider: 'Select the device manufacturer to continue.' }); return; }
          goTo(provider.supported ? 'connect' : 'register');
        })}</>}
      >
        <SearchSelect
          label="Manufacturer"
          required
          placeholder="Search manufacturers…"
          options={PROVIDERS.map(({ id, label }) => ({ id, label }))}
          value={integration.providerId}
          onChange={(v) => {
            setIntegration((s) => ({ ...s, providerId: v, status: 'not_connected' }));
            setExternalDevice((s) => ({ ...s, providerId: v, manufacturer: providerById(v)?.label || '' }));
            setErrors({});
          }}
          error={errors.provider}
        />
        {provider && provider.supported && (
          <Banner tone="success" title="Automatic data collection available">
            ColdTrace has an integration for {provider.label}. Connect the device and its readings will upload automatically, with no manual recording needed.
          </Banner>
        )}
        {provider && !provider.supported && (
          <Banner tone="info" title="Automatic data collection not yet available">
            ColdTrace doesn't have an integration for {provider.label} yet. You can still register the device. Temperatures will be recorded manually until an integration is available.
          </Banner>
        )}
      </StepFrame>
    );
  }

  if (step === 'connect') {
    const busy = integration.status === 'connecting';
    body = (
      <StepFrame
        {...wizardChrome}
        title={`Connect ${provider?.label || 'monitoring device'}`}
        subtitle="Enter the connection details from the device or its vendor portal. ColdTrace validates the connection before continuing."
        footerLeft={cancelBtn}
        footerRight={<>{backBtn}
          <Btn variant="primary" loading={busy} disabled={busy} onClick={() => {
            const e = {};
            if (!integration.deviceId.trim()) e.deviceId = 'Device ID is required.';
            if (!integration.accessCode.trim()) e.accessCode = 'Access code is required.';
            setErrors(e);
            if (Object.keys(e).length) return;
            connectDevice();
          }}>{busy ? 'Validating…' : 'Connect device'}</Btn>
        </>}
      >
        <Cell
          icon={<IcoCloud />}
          iconTone="info"
          title="Automatic data collection"
          description="Once connected, readings sync on the provider's schedule and manual recording is switched off for this equipment."
          descriptionLines={0}
        />
        {integration.status === 'failed' && (
          <Banner
            tone="critical"
            title="Connection failed"
            actions={[{ label: 'Register without connecting', onClick: () => goTo('register') }]}
          >
            The provider rejected these credentials. Check the Device ID and access code on the device label or vendor portal, then try again.
          </Banner>
        )}
        {integration.status === 'unavailable' && (
          <Banner
            tone="warning"
            title="Connection service unavailable"
            actions={[{ label: 'Register without connecting', onClick: () => goTo('register') }]}
          >
            {provider?.label || 'The provider'}'s service isn't responding right now. Try again in a few minutes, or register the device and connect it later. Nothing you've entered will be lost.
          </Banner>
        )}
        <div style={FIELD_STACK}>
        <TextInput
          label="Device ID"
          required
          placeholder="e.g. FT2-0048812"
          helpText="Printed on the device label, or shown in the vendor portal."
          value={integration.deviceId}
          onChange={(e) => setIntegration((s) => ({ ...s, deviceId: e.target.value }))}
          error={errors.deviceId}
          disabled={busy}
        />
        <TextInput
          label="Access code"
          required
          placeholder="6-digit code"
          helpText="The pairing / API access code issued by the provider for this device."
          value={integration.accessCode}
          onChange={(e) => setIntegration((s) => ({ ...s, accessCode: e.target.value }))}
          error={errors.accessCode}
          disabled={busy}
        />
        </div>
      </StepFrame>
    );
  }

  if (step === 'connected') {
    body = (
      <StepFrame
        {...wizardChrome}
        title="Device connected"
        subtitle="ColdTrace validated the connection and pulled the first reading."
        footerLeft={cancelBtn}
        footerRight={<>{backBtn}{continueBtn(() => goTo('details'), 'Continue to equipment details')}</>}
      >
        <Cell
          icon={<IcoCheckCircle />}
          iconTone="success"
          title={provider?.label || 'Monitoring device'}
          description={`Device ID ${integration.deviceId || 'FT2-0048812'}`}
          badge={<Badge tone="success">Connected</Badge>}
        />
        <div>
          <CardField label="Last sync" value={integration.lastSync || 'Just now'} />
          <CardDivider />
          <CardField label="Latest reading" value={integration.latestReading || '+4.6 °C at 09:42'} />
          <CardDivider />
          <CardField label="Temperature source" value="Automatic · integration" />
        </div>
      </StepFrame>
    );
  }

  if (step === 'register') {
    body = (
      <StepFrame
        {...wizardChrome}
        title="Register the monitoring device"
        subtitle="Save the device's details with the equipment record. If an integration becomes available later, it can be connected without recreating the equipment."
        footerLeft={cancelBtn}
        footerRight={<>{backBtn}{continueBtn(() => {
          const e = {};
          if (!externalDevice.manufacturer.trim()) e.exManufacturer = 'Manufacturer is required.';
          if (!externalDevice.serial.trim()) e.exSerial = 'Device serial number is required.';
          setErrors(e);
          if (Object.keys(e).length) return;
          goTo('details');
        }, 'Save device and continue')}</>}
      >
        <Banner tone="info" title="Temperature source: manual recording">
          Until this device is connected, temperatures for the equipment are recorded manually in Manual Temperature Recording.
        </Banner>
        <div style={FIELD_STACK}>
        <TextInput
          label="Manufacturer"
          required
          placeholder="e.g. Elitech"
          value={externalDevice.manufacturer}
          onChange={(e) => setExternalDevice((s) => ({ ...s, manufacturer: e.target.value }))}
          error={errors.exManufacturer}
        />
        <TextInput
          label="Model"
          placeholder="e.g. RC-5+"
          value={externalDevice.model}
          onChange={(e) => setExternalDevice((s) => ({ ...s, model: e.target.value }))}
        />
        <TextInput
          label="Device serial number"
          required
          placeholder="e.g. EL-2025-118842"
          helpText="From the label on the monitoring device itself, not the equipment's serial."
          value={externalDevice.serial}
          onChange={(e) => setExternalDevice((s) => ({ ...s, serial: e.target.value }))}
          error={errors.exSerial}
        />
        <TextInput
          label="Device identifier"
          placeholder="e.g. logger ID, probe ID"
          helpText="Any other identifier used by the vendor. It helps match the device when an integration is connected later."
          value={externalDevice.identifier}
          onChange={(e) => setExternalDevice((s) => ({ ...s, identifier: e.target.value }))}
        />
        <SelectInput
          label="How is data read from the device?"
          options={COMM_METHODS}
          placeholder="Select…"
          value={externalDevice.comm}
          onChange={(e) => setExternalDevice((s) => ({ ...s, comm: e.target.value }))}
        />
        </div>
        <TextareaInput
          label="Notes"
          rows={3}
          placeholder="e.g. Display on front panel; battery replaced Mar 2026."
          value={externalDevice.notes}
          onChange={(e) => setExternalDevice((s) => ({ ...s, notes: e.target.value }))}
        />
        <Upload
          label="Photo of the device (optional)"
          helperText="A photo of the device and its label helps confirm the model during a future integration."
          maxFiles={1}
          files={externalDevice.photos}
          onAddFiles={(picked) => setExternalDevice((s) => ({
            ...s,
            photos: picked.slice(0, 1).map((f, i) => ({
              id: `photo-${i}`, name: f.name, size: f.size, uploadedAt: new Date(), status: 'done',
            })),
          }))}
          onRemove={() => setExternalDevice((s) => ({ ...s, photos: [] }))}
        />
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
        footerLeft={cancelBtn}
        footerRight={<>{backBtn}{continueBtn(() => { if (validateDetails()) goTo('review'); })}</>}
      >
        <div style={FIELD_STACK}>
        <TextInput
          label="Equipment serial number"
          required
          placeholder="e.g. VF-2024-001234"
          helpText={entryCtx === 'serial-search'
            ? 'Kept from your search. Edit it if it was mistyped.'
            : 'Enter the full serial number from the label on the equipment.'}
          value={equipment.serial}
          onChange={(e) => setEquipment((s) => ({ ...s, serial: e.target.value }))}
          error={errors.serial}
        />
        <TextInput
          label="QR code"
          placeholder="e.g. QR-30977"
          helpText={entryCtx === 'qr-scan'
            ? 'Kept from your scan. It will be assigned to this equipment.'
            : 'Optional. Scan or type a ColdTrace QR label to assign it.'}
          value={equipment.qrCode}
          onChange={(e) => setEquipment((s) => ({ ...s, qrCode: e.target.value }))}
          error={errors.qrCode}
        />
        <SelectInput
          label="Equipment type"
          required
          options={EQUIPMENT_TYPES}
          placeholder="Select…"
          value={equipment.type}
          onChange={(e) => setEquipment((s) => ({ ...s, type: e.target.value }))}
          error={errors.type}
        />
        <SelectInput
          label="Manufacturer"
          required
          options={EQUIPMENT_MAKERS}
          placeholder="Select…"
          value={equipment.manufacturer}
          onChange={(e) => setEquipment((s) => ({ ...s, manufacturer: e.target.value }))}
          error={errors.manufacturer}
        />
        <TextInput
          label="Model"
          placeholder="e.g. MK 144"
          value={equipment.model}
          onChange={(e) => setEquipment((s) => ({ ...s, model: e.target.value }))}
        />
        <SearchSelect
          label="Facility"
          required
          placeholder="Search facilities…"
          options={FACILITIES}
          value={equipment.facilityId}
          onChange={(v) => setEquipment((s) => ({ ...s, facilityId: v }))}
          error={errors.facilityId}
        />
        <TextInput
          label="Location within facility"
          placeholder="e.g. EPI store room"
          value={equipment.location}
          onChange={(e) => setEquipment((s) => ({ ...s, location: e.target.value }))}
        />
        </div>
      </StepFrame>
    );
  }

  // ── Review & confirm ────────────────────────────────────────────────────────
  if (step === 'review') {
    const device = RTMDS.find((d) => d.id === rtmd.deviceId);
    body = (
      <StepFrame
        {...wizardChrome}
        title="Review and confirm"
        subtitle="Check everything before the equipment record is created."
        footerLeft={cancelBtn}
        footerRight={<>{backBtn}{continueBtn(createEquipment, entryCtx === 'qr-scan' ? 'Add and Assign Equipment' : 'Add Equipment')}</>}
      >
        <ReviewSection icon={<IcoDevice color={TEXT_DEFAULT} />} title="Equipment" onEdit={() => goTo('details')}>
          <CardField label="Serial number" value={equipment.serial || '—'} />
          <CardDivider />
          <CardField label="QR code" value={equipment.qrCode || 'Not assigned'} />
          <CardDivider />
          <CardField label="Type" value={equipment.type || '—'} />
          <CardDivider />
          <CardField label="Make & model" value={[equipment.manufacturer, equipment.model].filter(Boolean).join(' ') || '—'} />
          <CardDivider />
          <CardField label="Facility" value={facilityLabel(equipment.facilityId)} />
          <CardDivider />
          <CardField label="Location" value={equipment.location || '—'} />
        </ReviewSection>

        <ReviewSection
          icon={<IcoThermometer color={TEXT_DEFAULT} />}
          title="Temperature monitoring"
          onEdit={() => goTo('method')}
        >
          {monitoring.method === 'rtmd' && (<>
            <CardField label="Method" value="Nexleaf RTMD" />
            <CardDivider />
            <CardField label="Alarm contacts" value={contactNames.length ? contactNames.join(', ') : 'None (dashboard alarms only)'} />
            <CardDivider />
            <CardField label="Device" value={device ? `${device.model} · ${device.imei}` : '—'} />
            <CardDivider />
            <CardField label="Sensor 1" value={`${rtmd.sensor1.compartment} · ${rtmd.sensor1.min} to ${rtmd.sensor1.max} °C`} />
            {rtmd.hasSensor2 && (<>
              <CardDivider />
              <CardField label="Sensor 2" value={`${rtmd.sensor2.compartment} · ${rtmd.sensor2.min} to ${rtmd.sensor2.max} °C`} />
            </>)}
          </>)}
          {monitoring.method === 'external' && integration.status === 'connected' && (<>
            <CardField label="Method" value="Third-party integration" />
            <CardDivider />
            <CardField label="Provider" value={provider?.label || '—'} />
            <CardDivider />
            <CardField label="Status" value="Connected · synced just now" />
          </>)}
          {monitoring.method === 'external' && integration.status !== 'connected' && (<>
            <CardField label="Method" value="Monitoring device (not connected)" />
            <CardDivider />
            <CardField label="Device" value={[externalDevice.manufacturer, externalDevice.model].filter(Boolean).join(' ') || provider?.label || '—'} />
            <CardDivider />
            <CardField label="Device serial" value={externalDevice.serial || '—'} />
          </>)}
          {monitoring.method === 'none' && (
            <CardField label="Method" value="No monitoring device" />
          )}
          <CardDivider />
          <CardField label="Temperature source" value={temperatureSource} />
        </ReviewSection>

        {temperatureSource === 'Manual recording' && (
          <Banner tone="info">
            This equipment will appear in Manual Temperature Recording for twice-daily readings.
          </Banner>
        )}
      </StepFrame>
    );
  }

  // ── Success — return to Manual Temperature Recording ────────────────────────
  if (step === 'success') {
    body = (
      <Card style={{ minHeight: 'calc(100vh - 160px)', padding: isMobile ? '24px 16px' : '40px 32px', gap: 0 }}>
        <div style={{ width: '100%', maxWidth: 620, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
          <CircleMedia tone="success"><IcoCheckCircle size={44} color={TEXT_DEFAULT} /></CircleMedia>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, lineHeight: '28px', color: TEXT_DEFAULT }}>
            {entryCtx === 'qr-scan' ? 'Equipment added and QR code assigned' : 'Equipment added'}
          </h2>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED, maxWidth: 420 }}>
            {fromRecording
              ? 'You’re back in Manual Temperature Recording. Record the first temperature for this equipment now.'
              : 'The equipment record was created.'}
          </p>
        </div>

        <Cell
          icon={<IcoThermometer />}
          iconTone="success"
          title={[equipment.manufacturer, equipment.model].filter(Boolean).join(' ') || equipment.type || 'New equipment'}
          description={`${equipment.serial || 'No serial'} · ${facilityLabel(equipment.facilityId)}`}
          badge={<Badge tone="success">{temperatureSource === 'Manual recording' ? 'Manual recording' : 'Automatic'}</Badge>}
        />

        {fromRecording && temperatureSource === 'Manual recording' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Divider />
            {reading.saved ? (
              <Banner tone="success" title="Reading saved">
                {reading.value} °C recorded for {equipment.serial || 'this equipment'}, morning session.
              </Banner>
            ) : (
              <>
                <NumberInput
                  label="Current temperature"
                  required
                  suffix="°C"
                  step={0.1}
                  placeholder="e.g. 4.5"
                  helpText="Normal range: +2 to +8 °C"
                  value={reading.value}
                  onChange={(v) => setReading((s) => ({ ...s, value: v }))}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Btn variant="primary" disabled={reading.value === ''} onClick={() => setReading((s) => ({ ...s, saved: true }))}>
                    Save reading
                  </Btn>
                </div>
              </>
            )}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8 }}>
          {fromRecording
            ? <Btn variant="secondary" onClick={exitFlow}>Back to temperature tasks</Btn>
            : <>
                <Btn variant="secondary" onClick={onExit}>Done</Btn>
                <Btn variant="primary" onClick={() => {
                  setStep('method'); setHistory([]); setErrors({});
                  setEquipment({ serial: '', qrCode: '', type: '', manufacturer: '', model: '', facilityId: '', location: '' });
                  setMonitoring({ method: null });
                }}>Add another equipment</Btn>
              </>}
        </div>
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
