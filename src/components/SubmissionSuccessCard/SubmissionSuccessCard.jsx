// ── Nexleaf Design System — SubmissionSuccessCard ────────────────────────────
// A GENERIC submission-confirmation layout: icon in a tinted circle, centered
// title, an info-surface detail panel (sections of lines + an optional
// status-dot line), an optional footer line, and an action row. Any flow that
// ends in "your submission was recorded" composes it — service requests,
// installations, maintenance logs — not just temperature readings.
//
//   <SubmissionSuccessCard
//     title="Service Request Submitted"
//     status={{ tone: 'success', label: 'Request Logged' }}
//     sections={[
//       { lines: ['Equipment Name: MK 114 Vaccine Refrigerator', 'Facility: Pumwani Maternity Hospital'] },
//       { heading: 'Request:', lines: ['Category: Compressor fault', 'Priority: High'] },
//     ]}
//     footer={{ label: 'Ticket', value: 'SR-2026-0142' }}
//     primaryAction={{ label: 'Track Request', onClick: fn }}
//     secondaryActions={[{ label: 'Back to Equipment', onClick: fn }]}
//   />
//
// The cold-chain flows use the `TemperatureSubmissionSuccessCard` preset below,
// which derives the four morning/complete × today/past states from its data.
//
// Pure composition: Card edge-shadow surface, info-Banner panel, Btn, status
// dots — every color a token, all icons inline SVG. The CSS-class twin lives
// in SubmissionSuccessCard.css (`.nx-submission-success`).

import { Btn } from '../Btn/Btn.jsx';
import {
  BG_SURFACE, TEXT_DEFAULT,
  BG_INFO, TEXT_INFO, BORDER_INFO,
  COLOR_SUCCESS, COLOR_MORNING, BORDER_WARNING,
  COLOR_PRIMARY, RADIUS_SM, RADIUS_XL,
} from '../../tokens/index.js';

// Same edge recipe as Card / Cell / NavCard so the confirmation sits in the
// established surface family.
const CARD_SHADOW = [
  '0 1px 0 rgba(26,26,26,0.07)',
  'inset 1px 0 0 rgba(0,0,0,0.13)',
  'inset -1px 0 0 rgba(0,0,0,0.13)',
  'inset 0 -1px 0 rgba(0,0,0,0.17)',
  'inset 0 1px 0 rgba(204,204,204,0.5)',
].join(', ');

// Aligned with the Badge tone vocabulary.
const DOT_TONES = {
  success: COLOR_SUCCESS,     // green — done
  warning: BORDER_WARNING,    // amber — in progress / pending
  attention: COLOR_MORNING,   // orange — needs awareness (e.g. past entry)
};

// Default icon: document-with-check in the tinted circle — inline SVG.
function IcoDocCheck() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <path d="M9 5h11l5 5v18a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 8 28V6.5A1.5 1.5 0 0 1 9.5 5z" fill={BG_SURFACE} stroke="#616161" strokeWidth="1.4" />
      <path d="M20 5v5h5" stroke="#616161" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="24" cy="25" r="7" fill={COLOR_SUCCESS} />
      <path d="M21 25l2.2 2.2 4-4.4" stroke={BG_SURFACE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const IcoFolder = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M3 7.5C3 6.67 3.67 6 4.5 6H8l2 2h5.5C16.33 8 17 8.67 17 9.5v6c0 .83-.67 1.5-1.5 1.5h-11C3.67 17 3 16.33 3 15.5v-8z" stroke={TEXT_INFO} strokeWidth="1.2" />
  </svg>
);

function Line({ children, bold }) {
  return (
    <div style={{ fontSize: 13, color: TEXT_INFO, lineHeight: '20px', fontWeight: bold ? 650 : 450, fontFamily: 'Inter, sans-serif' }}>
      {children}
    </div>
  );
}

/**
 * SubmissionSuccessCard — generic confirmation layout.
 *
 * @param {string} title                       Centered heading, e.g. "Service Request Submitted"
 * @param {ReactNode} [icon]                   Icon inside the tinted circle (default: doc-with-check)
 * @param {ReactNode} [panelIcon]              Leading icon of the detail panel (default: folder)
 * @param {Array<{heading?:string, lines:Array<Line>}>} sections
 *        Panel content. Sections are separated by a 12px gap; a section's
 *        `heading` renders bold. A Line is one of:
 *          'plain text'                                — 13/450 info line
 *          {label:'Facility', value:'Pumwani…'}        — rendered "label: value"
 *          {dot:'success'|'warning'|'attention', text} — status line with a tone dot
 * @param {{label:string, value:string}} [footer]  Line under the panel
 * @param {{label:string, onClick?:()=>void}} [primaryAction]
 * @param {Array<{label:string, onClick?:()=>void}>} [secondaryActions]
 * @param {{label?:string, onClick:()=>void}} [homeAction]  Top-right plain link
 * @param {number} [maxWidth=640]
 * @param {boolean} [surface=true]  Render the card's own white surface + edge
 *        shadow. Pass `false` to sit flush on a host white background (e.g. a
 *        flow that already provides the card) — drops the bg, shadow and radius.
 */
export function SubmissionSuccessCard({
  title,
  icon,
  panelIcon,
  sections = [],
  footer,
  primaryAction,
  secondaryActions = [],
  homeAction,
  maxWidth = 640,
  surface = true,
}) {
  return (
    <div style={{
      ...(surface
        ? { background: BG_SURFACE, borderRadius: RADIUS_XL, boxShadow: CARD_SHADOW, padding: '28px 40px 32px' }
        : { background: 'transparent', padding: 0 }),
      width: '100%', maxWidth, position: 'relative',
      boxSizing: 'border-box', fontFamily: 'Inter, sans-serif',
    }}>
      {homeAction && (
        <button onClick={homeAction.onClick} style={{
          position: 'absolute', top: 24, right: 24, background: 'none', border: 'none',
          cursor: 'pointer', fontSize: 13, color: COLOR_PRIMARY, fontWeight: 550, fontFamily: 'Inter, sans-serif',
        }}>{homeAction.label ?? 'Go to Home Page'}</button>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, marginBottom: 16 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: BG_INFO, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon ?? <IcoDocCheck />}
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 650, color: TEXT_DEFAULT, marginBottom: 20 }}>
        {title}
      </div>

      {/* Detail panel — info Banner surface */}
      <div style={{ background: BG_INFO, border: `1px solid ${BORDER_INFO}`, borderRadius: RADIUS_SM, padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        {panelIcon ?? <IcoFolder />}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
          {sections.map((section, si) => (
            <div key={si} style={{ display: 'contents' }}>
              {si > 0 && <div style={{ height: 12 }} />}
              {section.heading && <Line bold>{section.heading}</Line>}
              {section.lines.map((line, li) => {
                if (typeof line === 'string') return <Line key={li}>{line}</Line>;
                if (line.dot) {
                  return (
                    <div key={li} style={{ fontSize: 13, color: TEXT_INFO, lineHeight: '20px', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif' }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: DOT_TONES[line.dot] ?? DOT_TONES.success, flexShrink: 0, display: 'inline-block' }} />
                      {line.text}
                    </div>
                  );
                }
                return <Line key={li}>{`${line.label}: ${line.value}`}</Line>;
              })}
            </div>
          ))}
        </div>
      </div>

      {footer && (
        <div style={{ fontSize: 13, color: TEXT_DEFAULT, margin: '16px 0', fontFamily: 'Inter, sans-serif' }}>
          <strong style={{ fontWeight: 650 }}>{footer.label}:</strong> {footer.value}
        </div>
      )}

      {(primaryAction || secondaryActions.length > 0) && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: footer ? 0 : 16 }}>
          {primaryAction && <Btn variant="primary" onClick={primaryAction.onClick}>{primaryAction.label}</Btn>}
          {secondaryActions.map((a, i) => (
            <Btn key={i} variant="secondary" onClick={a.onClick}>{a.label}</Btn>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Cold-chain preset ─────────────────────────────────────────────────────────
// The temperature-recording flows' four states (morning-only / complete ×
// today / past-entry), derived from the data. Kept as a thin adapter over the
// generic layout so product flows stay one-liners.

/**
 * TemperatureSubmissionSuccessCard
 *
 * @param {{name:string, serial:string, facility:string}} equipment
 * @param {string}  recordingDate   e.g. "Jul 21, 2026"
 * @param {boolean} [pastEntry]     back-filled against a past date
 * @param {string}  [submittedOn]   shown only for past entries
 * @param {{temp, prevMax?, prevMin?, alarms?, alarmDuration?, alarmActions?, recordedBy, recordedAt}} morning
 * @param {{temp, equipmentStatus, recordedBy, recordedAt}} [evening]  presence ⇒ complete
 * @param {string}   [equipmentStatus]
 * @param {()=>void} [onPrimary]     Record Evening Temperature / Record Another CCE
 * @param {()=>void} [onViewLogs]
 * @param {()=>void} [onServiceRequest]
 * @param {()=>void} [onHome]
 */
export function TemperatureSubmissionSuccessCard({
  equipment,
  recordingDate,
  pastEntry = false,
  submittedOn,
  morning,
  evening,
  equipmentStatus,
  onPrimary,
  onViewLogs,
  onServiceRequest,
  onHome,
}) {
  const complete = !!evening;
  const status = pastEntry
    ? { tone: 'attention', label: complete ? 'Past Entry — Complete' : 'Past Entry — Morning Recorded' }
    : complete
      ? { tone: 'success', label: 'Daily Record Complete' }
      : { tone: 'warning', label: 'Evening Pending' };

  const identity = {
    lines: [
      `Equipment Name: ${equipment.name}`,
      `Serial Number: ${equipment.serial}`,
      `Facility: ${equipment.facility}`,
    ],
  };
  const dates = {
    lines: [
      `Recording Date: ${recordingDate}`,
      ...(pastEntry && submittedOn ? [`Submitted On: ${submittedOn}`] : []),
      { dot: status.tone, text: `Record Status: ${status.label}` },
    ],
  };
  const morningSection = {
    heading: 'Morning Reading:',
    lines: [
      `Morning Temp: ${morning.temp} °C`,
      ...(morning.prevMax != null || morning.prevMin != null
        ? [`Yesterday Max/Min: ${morning.prevMax ?? '—'} °C / ${morning.prevMin ?? '—'} °C`] : []),
      `Alarms: ${morning.alarms ? 'Yes' : 'No'}`,
      ...(morning.alarms && morning.alarmDuration ? [`Duration: ${morning.alarmDuration}`] : []),
      ...(morning.alarms && morning.alarmActions ? [`Action Taken: ${morning.alarmActions}`] : []),
      `Recorded by: ${morning.recordedBy} | ${morning.recordedAt}`,
    ],
  };
  const eveningSection = complete ? {
    heading: 'Evening Reading:',
    lines: [
      `Evening Temp: ${evening.temp} °C`,
      `Equipment Status: ${evening.equipmentStatus}`,
      `Recorded by: ${evening.recordedBy} | ${evening.recordedAt}`,
    ],
  } : null;

  return (
    <SubmissionSuccessCard
      title={complete ? 'Daily Temperature Record Completed' : 'Morning Temperature Recorded'}
      sections={[
        identity,
        dates,
        morningSection,
        ...(eveningSection ? [eveningSection] : []),
      ]}
      footer={{ label: 'Equipment Status', value: equipmentStatus ?? (evening ? evening.equipmentStatus : 'Functional') }}
      primaryAction={onPrimary ? { label: complete ? 'Record Another CCE' : 'Record Evening Temperature', onClick: onPrimary } : undefined}
      secondaryActions={[
        ...(onViewLogs ? [{ label: 'View Temperature Logs', onClick: onViewLogs }] : []),
        ...(onServiceRequest ? [{ label: 'Create Service Request', onClick: onServiceRequest }] : []),
      ]}
      homeAction={onHome ? { onClick: onHome } : undefined}
    />
  );
}

// Sample data used by the Storybook stories (and handy for prototypes).
export const SAMPLE_SUBMISSION = {
  equipment: { name: 'MK 114 Vaccine Refrigerator', serial: 'CCE-2024-MK114-002', facility: 'Pumwani Maternity Hospital' },
  recordingDate: 'Jul 21, 2026',
  morning: { temp: '2', prevMax: '12', prevMin: '12', alarms: false, recordedBy: 'Juma Mwangi', recordedAt: 'Jul 21, 2026 | 01:48 PM' },
  evening: { temp: '-1', equipmentStatus: 'Faulty/Needs Repair', recordedBy: 'Amani Karanja', recordedAt: 'Jul 21, 2026 | 01:49 PM' },
};
