import { useEffect, useState } from 'react';
import {
  BTN_SHADOW_DEFAULT, BTN_SHADOW_HOVER, BTN_SHADOW_ACTIVE,
  BTN_SHADOW_PRIMARY, BTN_SHADOW_CRITICAL, FOCUS_RING,
  COLOR_PRIMARY, COLOR_PRIMARY_HOVER, COLOR_PRIMARY_PRESSED,
} from '../../tokens/index.js';

// Focus ring used on the primary blue button. The default FOCUS_RING is itself
// blue, so it would disappear against the button background — pair an inset
// white ring with an outer dark ring to keep the indicator visible.
const FOCUS_RING_ON_PRIMARY = 'inset 0 0 0 2px #ffffff, 0 0 0 2px #303030';
import { Skeleton } from '../Skeleton/Skeleton.jsx';

const IcoChevDown = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Spinner (used by loading state) ──────────────────────────────────────────
// 14×14 circular spinner that picks up the current text color. Sized to sit in
// the same 16×16 slot as the icon prop, so the button's overall width stays
// identical between resting and loading states.

const SPINNER_KEYFRAME_ID = 'nx-btn-spinner-keyframe';
function useBtnSpinnerKeyframe() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(SPINNER_KEYFRAME_ID)) return;
    const tag = document.createElement('style');
    tag.id = SPINNER_KEYFRAME_ID;
    tag.textContent = `@keyframes nxBtnSpin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(tag);
  }, []);
}

function BtnSpinner() {
  useBtnSpinnerKeyframe();
  return (
    <span style={{ display: 'flex', alignItems: 'center', width: 16, height: 16, flexShrink: 0 }}>
      <svg width={14} height={14} viewBox="0 0 14 14" aria-hidden="true"
        style={{ animation: 'nxBtnSpin 0.7s linear infinite' }}>
        <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
        <path d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// ─── Skeleton sizing per Btn size token ───────────────────────────────────────
// Heights mirror padding + line-height so the skeleton occupies the same box
// the real button would (preserves layout — no jump when content arrives).

const SKELETON_HEIGHTS = { micro: 24, medium: 28, large: 32 };
const DEFAULT_SKELETON_WIDTHS = { micro: 64, medium: 96, large: 120 };

export function Btn({
  children, onClick, disabled, variant = 'primary', tone = 'default', size = 'medium',
  fullWidth, type = 'button', icon, disclosure,
  small, secondary,
  loading = false,
  skeleton = false,
  skeletonWidth,
  ariaLabel, ariaHaspopup, ariaExpanded, ariaControls,
}) {
  const sz = small ? 'micro' : size;

  // Skeleton mode short-circuits everything else. Used while the *page* is
  // loading — we don't know which button this will end up being, we just need
  // a placeholder of the right size in its place.
  if (skeleton) {
    return (
      <Skeleton
        width={fullWidth ? '100%' : (skeletonWidth ?? DEFAULT_SKELETON_WIDTHS[sz] ?? 96)}
        height={SKELETON_HEIGHTS[sz] ?? 28}
        radius={8}
      />
    );
  }

  // ARIA props collected into a single object for spread onto the rendered <button>.
  // Kept as an object so we don't sprinkle prop-drilling across every variant branch.
  const ariaProps = {
    'aria-label':    ariaLabel,
    'aria-haspopup': ariaHaspopup,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    'aria-busy':     loading || undefined,
  };
  const [hov, setHov] = useState(false);
  const [act, setAct] = useState(false);
  const [foc, setFoc] = useState(false);

  const v = variant === 'secondary' ? 'default'
    : variant === 'ghost' ? 'plain'
      : variant === 'destructive' ? 'primary'
        : variant === 'strong' ? 'strong'
          : variant;
  const t = variant === 'destructive' ? 'critical' : tone;

  // Loading short-circuits clicks but the button keeps rendering at its
  // resting size, so users see "Saving…" not "the button vanished".
  const isInert = disabled || loading;

  const SIZES = {
    micro:  { padding: '4px 8px',  fontSize: 12, lineHeight: '16px' },
    medium: { padding: '6px 12px', fontSize: 12, lineHeight: '16px' },
    large:  { padding: '6px 12px', fontSize: 13, lineHeight: '20px' },
  };
  const s = SIZES[sz] || SIZES.medium;
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
    borderRadius: 8, fontFamily: 'Inter,sans-serif', border: 'none', outline: 'none',
    cursor: loading ? 'progress' : disabled ? 'not-allowed' : 'pointer',
    width: fullWidth ? '100%' : undefined, whiteSpace: 'nowrap', ...s, boxSizing: 'border-box',
  };
  const evts = isInert ? {} : {
    onMouseEnter: () => setHov(true), onMouseLeave: () => { setHov(false); setAct(false); },
    onMouseDown: () => setAct(true),  onMouseUp: () => setAct(false),
    onFocus: () => setFoc(true),      onBlur: () => setFoc(false),
  };

  // Leading slot: spinner during loading, icon at rest. Disclosure chevron is
  // suppressed during loading so the button doesn't look "actionable" mid-action.
  const leading = loading
    ? <BtnSpinner />
    : (icon && <span style={{ display: 'flex', alignItems: 'center', width: 16, height: 16, overflow: 'hidden', flexShrink: 0 }}>{icon}</span>);

  const inner = (
    <>
      {leading}
      {children}
      {!loading && disclosure && <IcoChevDown size={16} color="currentColor" />}
    </>
  );

  if (v === 'plain') {
    return (
      <button type={type} disabled={isInert} onClick={isInert ? undefined : onClick} {...evts} {...ariaProps}
        style={{ ...base, background: 'transparent', color: disabled ? '#b5b5b5' : '#005bd3', fontWeight: 450, fontSize: 13, padding: 0,
          textDecoration: (!isInert && hov) ? 'underline' : 'none',
          boxShadow: foc ? FOCUS_RING : 'none' }}>
        {inner}
      </button>
    );
  }
  if (v === 'tertiary') {
    const bg = disabled ? 'rgba(0,0,0,0.05)' : act ? '#f1f1f1' : hov ? '#f7f7f7' : 'transparent';
    return (
      <button type={type} disabled={isInert} onClick={isInert ? undefined : onClick} {...evts} {...ariaProps}
        style={{ ...base, background: bg, color: disabled ? '#b5b5b5' : '#303030', fontWeight: 550,
          boxShadow: foc ? FOCUS_RING : 'none' }}>
        {inner}
      </button>
    );
  }
  if (v === 'primary') {
    // Default tone is the brand blue; critical/success keep their filled tones.
    // Brand-blue path uses discrete hover/pressed colors (not filter:brightness)
    // because darkening a saturated blue with filter looks washed out.
    const isToned = t === 'critical' || t === 'success';
    const bg = disabled ? 'rgba(0,0,0,0.05)'
      : t === 'critical' ? '#e51c00'
        : t === 'success'  ? '#29845a'
          : act ? COLOR_PRIMARY_PRESSED
            : hov ? COLOR_PRIMARY_HOVER
              : COLOR_PRIMARY;
    const baseShadow = isToned ? BTN_SHADOW_CRITICAL : BTN_SHADOW_PRIMARY;
    const activeShadow = `inset 0 2px 1px rgba(0,0,0,0.3), ${baseShadow}`;
    // Blue button needs the inset-white + outer-dark focus ring so the indicator
    // is visible. Toned (red/green) variants keep the standard FOCUS_RING.
    const focusRing = isToned ? FOCUS_RING : FOCUS_RING_ON_PRIMARY;
    const shadow = disabled ? 'none'
      : foc ? `${focusRing}, ${act ? activeShadow : baseShadow}`
        : act ? activeShadow
          : baseShadow;
    // filter:brightness only applied for toned variants — blue uses real bg swaps.
    const filterFx = isToned && !isInert && hov && !act ? 'brightness(1.08)' : 'none';
    return (
      <button type={type} disabled={isInert} onClick={isInert ? undefined : onClick} {...evts} {...ariaProps}
        style={{ ...base, background: bg, color: disabled ? '#b5b5b5' : '#fff', fontWeight: 600, boxShadow: shadow,
          filter: filterFx }}>
        {inner}
      </button>
    );
  }
  if (v === 'strong') {
    // Dark filled high-emphasis CTA — what the old `primary` used to be.
    // Use when you need more visual weight than the brand-blue primary,
    // e.g. confirmation modals, marketing CTAs.
    const bg = disabled ? 'rgba(0,0,0,0.05)' : '#303030';
    const baseShadow = BTN_SHADOW_PRIMARY;
    const activeShadow = `inset 0 2px 1px rgba(0,0,0,0.3), ${baseShadow}`;
    const shadow = disabled ? 'none'
      : foc ? `${FOCUS_RING}, ${act ? activeShadow : baseShadow}`
        : act ? activeShadow
          : baseShadow;
    return (
      <button type={type} disabled={isInert} onClick={isInert ? undefined : onClick} {...evts} {...ariaProps}
        style={{ ...base, background: bg, color: disabled ? '#b5b5b5' : '#fff', fontWeight: 600, boxShadow: shadow,
          filter: (!isInert && hov && !act) ? 'brightness(1.08)' : 'none' }}>
        {inner}
      </button>
    );
  }
  // default variant
  const bg = disabled ? 'rgba(0,0,0,0.05)' : act ? '#cccccc' : hov ? '#fafafa' : '#ffffff';
  const shadow = disabled ? 'none'
    : act  ? (foc ? `${FOCUS_RING}, ${BTN_SHADOW_ACTIVE}` : BTN_SHADOW_ACTIVE)
      : hov  ? (foc ? `${FOCUS_RING}, ${BTN_SHADOW_HOVER}`  : BTN_SHADOW_HOVER)
        : foc  ? `${FOCUS_RING}, ${BTN_SHADOW_DEFAULT}`
          :         BTN_SHADOW_DEFAULT;
  return (
    <button type={type} disabled={isInert} onClick={isInert ? undefined : onClick} {...evts} {...ariaProps}
      style={{ ...base, background: bg, color: disabled ? '#b5b5b5' : '#303030', fontWeight: 550, boxShadow: shadow }}>
      {inner}
    </button>
  );
}

export function IconBtn({ icon, onClick, disabled, variant = 'default', type = 'button' }) {
  const [hov, setHov] = useState(false);
  const [act, setAct] = useState(false);
  const [foc, setFoc] = useState(false);
  const isPrimary = variant === 'primary';
  const evts = disabled ? {} : {
    onMouseEnter: () => setHov(true), onMouseLeave: () => { setHov(false); setAct(false); },
    onMouseDown: () => setAct(true),  onMouseUp: () => setAct(false),
    onFocus: () => setFoc(true),      onBlur: () => setFoc(false),
  };
  const bg = disabled ? 'rgba(0,0,0,0.05)' : isPrimary ? '#303030' : act ? '#cccccc' : hov ? '#fafafa' : '#ffffff';
  const baseShadow = isPrimary ? BTN_SHADOW_PRIMARY : BTN_SHADOW_DEFAULT;
  const hoverShadow = isPrimary ? BTN_SHADOW_PRIMARY : BTN_SHADOW_HOVER;
  const activeShadow = isPrimary ? `inset 0 2px 1px rgba(0,0,0,0.3), ${BTN_SHADOW_PRIMARY}` : BTN_SHADOW_ACTIVE;
  const shadow = disabled ? 'none'
    : foc ? `${FOCUS_RING}, ${act ? activeShadow : hov ? hoverShadow : baseShadow}`
      : act ? activeShadow : hov ? hoverShadow : baseShadow;
  return (
    <button type={type} disabled={disabled} onClick={disabled ? undefined : onClick} {...evts}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '6px 4px', borderRadius: 8, border: 'none', outline: 'none', cursor: disabled ? 'not-allowed' : 'pointer', background: bg, boxShadow: shadow,
        filter: isPrimary && !disabled && hov && !act ? 'brightness(1.08)' : 'none' }}>
      <span style={{ width: 20, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</span>
    </button>
  );
}

export function ButtonGroup({ children, gap = 'tight' }) {
  const gapPx = gap === 'extra-tight' ? 4 : gap === 'loose' ? 20 : 8;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: gapPx, flexWrap: 'wrap' }}>
      {children}
    </div>
  );
}

function SegmentBtn({ label, icon, onClick, disabled, borderRadius, isLast }) {
  const [hov, setHov] = useState(false);
  const [act, setAct] = useState(false);
  const [foc, setFoc] = useState(false);
  const evts = disabled ? {} : {
    onMouseEnter: () => setHov(true), onMouseLeave: () => { setHov(false); setAct(false); },
    onMouseDown: () => setAct(true),  onMouseUp: () => setAct(false),
    onFocus: () => setFoc(true),      onBlur: () => setFoc(false),
  };
  const bg = disabled ? 'rgba(0,0,0,0.05)' : act ? '#cccccc' : hov ? '#fafafa' : '#ffffff';
  const shadow = disabled ? 'none'
    : act  ? (foc ? `${FOCUS_RING}, ${BTN_SHADOW_ACTIVE}` : BTN_SHADOW_ACTIVE)
      : hov  ? (foc ? `${FOCUS_RING}, ${BTN_SHADOW_HOVER}`  : BTN_SHADOW_HOVER)
        : foc  ? `${FOCUS_RING}, ${BTN_SHADOW_DEFAULT}`
          :         BTN_SHADOW_DEFAULT;
  return (
    <button type="button" disabled={disabled} onClick={disabled ? undefined : onClick} {...evts}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        padding: '6px 12px', borderRadius, border: 'none', outline: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer', background: bg, boxShadow: shadow,
        fontSize: 12, fontWeight: 550, lineHeight: '16px', color: disabled ? '#b5b5b5' : '#303030',
        fontFamily: 'Inter,sans-serif', whiteSpace: 'nowrap',
        marginRight: isLast ? 0 : -1, position: 'relative',
        zIndex: (foc || hov || act) ? 1 : 0, boxSizing: 'border-box' }}>
      {icon && <span style={{ display: 'flex', alignItems: 'center', width: 16, height: 16, flexShrink: 0, overflow: 'hidden' }}>{icon}</span>}
      {label}
    </button>
  );
}

export function BtnGroupSegmented({ buttons = [], connectedTop = false }) {
  const n = buttons.length;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'stretch' }}>
      {buttons.map((btn, i) => {
        const isFirst = i === 0;
        const isLast  = i === n - 1;
        const tl = (!connectedTop && isFirst) ? 8 : 0;
        const tr = (!connectedTop && isLast)  ? 8 : 0;
        const br = isLast  ? 8 : 0;
        const bl = isFirst ? 8 : 0;
        return (
          <SegmentBtn key={i} label={btn.label} icon={btn.icon}
            onClick={btn.onClick} disabled={btn.disabled}
            borderRadius={`${tl}px ${tr}px ${br}px ${bl}px`}
            isLast={isLast} />
        );
      })}
    </div>
  );
}
