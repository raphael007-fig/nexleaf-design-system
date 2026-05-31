export const BADGE_TONES = {
  default:    { bg: 'rgba(0,0,0,0.06)', color: '#616161',  dot: '#616161',  label: 'Default' },
  info:       { bg: '#e0f0ff',          color: '#00527c',  dot: '#00527c',  label: 'Info' },
  success:    { bg: '#cdfee1',          color: '#0c5132',  dot: '#0c5132',  label: 'Success' },
  attention:  { bg: '#ffef9d',          color: '#4f4700',  dot: '#4f4700',  label: 'Attention' },
  warning:    { bg: '#ffd6a4',          color: '#5e4200',  dot: '#5e4200',  label: 'Warning' },
  critical:   { bg: '#fedad9',          color: '#8e1f0b',  dot: '#8e1f0b',  label: 'Critical' },
  enabled:    { bg: 'rgba(0,0,0,0.06)', color: '#616161',  dot: '#12b76a',  label: 'Enabled' },
  'read-only':{ bg: 'transparent',      color: '#616161',  dot: '#616161',  label: 'Read only' },
  new:        { bg: 'rgba(0,0,0,0.06)', color: '#616161',  dot: '#616161',  label: 'New' },
};

// Strong tones — exact values from Figma (node 108227:921)
export const BADGE_STRONG_TONES = {
  'info-strong':       { bg: '#91d0ff', color: '#00527c', dot: '#002133', label: 'Info' },
  'success-strong':    { bg: '#29845a', color: '#f8fffb', dot: '#f8fffb', label: 'Success' },
  'attention-strong':  { bg: '#ffe600', color: '#332e00', dot: '#332e00', label: 'Attention' },
  'warning-strong':    { bg: '#ffb800', color: '#5e4200', dot: '#5e4200', label: 'Warning' },
  'critical-strong':   { bg: '#e51c00', color: '#fffbfb', dot: '#fffbfb', label: 'Critical' },
};

const ALL_TONES = { ...BADGE_TONES, ...BADGE_STRONG_TONES };

const ProgressDot = ({ dotColor }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 20, height: 20, flexShrink: 0,
  }}>
    <span style={{
      width: 8, height: 8, borderRadius: 3,
      border: `1.25px solid ${dotColor}`,
      background: dotColor,
      display: 'block',
    }} />
  </span>
);

const IconInfoCircle = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true" style={{ flexShrink: 0 }}>
    <path fillRule="evenodd" d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Zm0 5.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM9.25 9a.75.75 0 0 1 1.5 0v4.25a.75.75 0 0 1-1.5 0V9Z" />
  </svg>
);

const IconX = ({ size = 10, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M15.28 4.72a.75.75 0 0 0-1.06 0L10 8.94 5.78 4.72a.75.75 0 0 0-1.06 1.06L8.94 10l-4.22 4.22a.75.75 0 1 0 1.06 1.06L10 11.06l4.22 4.22a.75.75 0 1 0 1.06-1.06L11.06 10l4.22-4.22a.75.75 0 0 0 0-1.06Z" />
  </svg>
);

export { IconInfoCircle };

/**
 * Badge
 *
 * Props:
 *   tone         — any key from BADGE_TONES or BADGE_STRONG_TONES
 *   size         — 'medium' (default) | 'large'
 *   progress     — 'incomplete' | 'partial' | 'complete'  (legacy progress dots, regular tones only)
 *   progressIndicator — boolean, shows a filled rounded-square dot (strong tone variant)
 *   icon         — boolean, shows an info-circle icon before the label
 *   onDismiss    — function, shows a × button after the label
 */
export function Badge({
  tone = 'default',
  size = 'medium',
  progress,
  progressIndicator,
  icon,
  onDismiss,
  children,
}) {
  const t = ALL_TONES[tone] || BADGE_TONES.default;
  const isLarge = size === 'large';

  // Leading slot: progressIndicator dot OR legacy progress OR icon
  const hasLeading = progressIndicator || progress || icon;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: t.bg, borderRadius: 8,
      height: isLarge ? undefined : 20,
      paddingTop: isLarge ? 4 : 2,
      paddingBottom: isLarge ? 4 : 2,
      paddingLeft: hasLeading ? 0 : 8,
      paddingRight: onDismiss ? 4 : 8,
      flexShrink: 0,
    }}>

      {/* Progress indicator dot (strong-tone style — filled rounded square) */}
      {progressIndicator && !progress && (
        <ProgressDot dotColor={t.dot} />
      )}

      {/* Legacy progress dots (regular tones) */}
      {progress === 'incomplete' && (
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, flexShrink: 0 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', border: `1.25px solid ${t.dot}`, display: 'block' }} />
        </span>
      )}
      {progress === 'partial' && (
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, flexShrink: 0 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, border: `1.25px solid ${t.dot}`, background: `${t.dot}66`, display: 'block' }} />
        </span>
      )}
      {progress === 'complete' && (
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, flexShrink: 0 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, border: `1.25px solid ${t.dot}`, background: t.dot, display: 'block' }} />
        </span>
      )}

      {/* Info circle icon */}
      {icon && !progress && !progressIndicator && (
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, flexShrink: 0 }}>
          <IconInfoCircle size={14} color={t.color} />
        </span>
      )}

      {/* Label */}
      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 550, lineHeight: '16px',
        color: t.color, whiteSpace: 'nowrap',
      }}>
        {children || t.label}
      </span>

      {/* Dismiss button */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 16, height: 16, padding: 0, margin: '0 0 0 2px',
            background: 'transparent', border: 'none', cursor: 'pointer',
            borderRadius: 4, flexShrink: 0, color: t.color, opacity: 0.8,
          }}
        >
          <IconX size={10} color={t.color} />
        </button>
      )}
    </span>
  );
}

// Canonical status→tone map. Covers the generic workflow statuses plus the
// equipment-domain statuses that pages (EquipmentDetail, ApplicationLayout)
// previously re-implemented locally. Keys are matched case-insensitively, so a
// row value of "Under Maintenance" resolves the same as "under-maintenance".
// Mapping onto BADGE_TONES reproduces the exact same colors those page-local
// badges used, so there's a single source of truth now.
export const STATUS_BADGE_MAP = {
  // generic workflow
  pending:        { tone: 'attention', label: 'Pending' },
  completed:      { tone: 'success',   label: 'Completed' },
  locked:         { tone: 'default',   label: 'Locked' },
  critical:       { tone: 'critical',  label: 'Critical' },
  info:           { tone: 'info',      label: 'Info' },
  // equipment domain
  active:                { tone: 'success',  label: 'Active' },
  unknown:               { tone: 'default',  label: 'Unknown' },
  decommissioned:        { tone: 'warning',  label: 'Decommissioned' },
  faulty:                { tone: 'critical', label: 'Faulty' },
  'under maintenance':   { tone: 'info',     label: 'Under Maintenance' },
  'under-maintenance':   { tone: 'info',     label: 'Under Maintenance' },
  maintenance:           { tone: 'info',     label: 'Under Maintenance' },
};

// StatusBadge — semantic wrapper over <Badge>. Accepts a `status` key (any key
// in STATUS_BADGE_MAP, case-insensitive) and renders the matching tone + label.
// Unknown keys fall back to the default tone with the raw status as the label,
// so new domain statuses degrade gracefully instead of disappearing.
export function StatusBadge({ status, children, size }) {
  const key = String(status ?? '').toLowerCase();
  const entry = STATUS_BADGE_MAP[key] || { tone: 'default', label: status || 'Unknown' };
  return <Badge tone={entry.tone} size={size}>{children || entry.label}</Badge>;
}
