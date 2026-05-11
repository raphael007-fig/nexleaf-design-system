import { useState } from 'react';
import {
  BTN_SHADOW_DEFAULT, BTN_SHADOW_HOVER, BTN_SHADOW_ACTIVE,
  BTN_SHADOW_PRIMARY, BTN_SHADOW_CRITICAL, FOCUS_RING,
} from '../../tokens/index.js';

const IcoChevDown = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Btn({
  children, onClick, disabled, variant = 'primary', tone = 'default', size = 'medium',
  fullWidth, type = 'button', icon, disclosure,
  small, secondary,
}) {
  const [hov, setHov] = useState(false);
  const [act, setAct] = useState(false);
  const [foc, setFoc] = useState(false);

  const v = variant === 'secondary' ? 'default'
    : variant === 'ghost' ? 'plain'
      : variant === 'destructive' ? 'primary'
        : variant;
  const t = variant === 'destructive' ? 'critical' : tone;
  const sz = small ? 'micro' : size;

  const SIZES = {
    micro:  { padding: '4px 8px',  fontSize: 12, lineHeight: '16px' },
    medium: { padding: '6px 12px', fontSize: 12, lineHeight: '16px' },
    large:  { padding: '6px 12px', fontSize: 13, lineHeight: '20px' },
  };
  const s = SIZES[sz] || SIZES.medium;
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
    borderRadius: 8, fontFamily: 'Inter,sans-serif', border: 'none', outline: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: fullWidth ? '100%' : undefined, whiteSpace: 'nowrap', ...s, boxSizing: 'border-box',
  };
  const evts = disabled ? {} : {
    onMouseEnter: () => setHov(true), onMouseLeave: () => { setHov(false); setAct(false); },
    onMouseDown: () => setAct(true),  onMouseUp: () => setAct(false),
    onFocus: () => setFoc(true),      onBlur: () => setFoc(false),
  };

  const inner = (
    <>
      {icon && <span style={{ display: 'flex', alignItems: 'center', width: 16, height: 16, overflow: 'hidden', flexShrink: 0 }}>{icon}</span>}
      {children}
      {disclosure && <IcoChevDown size={16} color="currentColor" />}
    </>
  );

  if (v === 'plain') {
    return (
      <button type={type} disabled={disabled} onClick={disabled ? undefined : onClick} {...evts}
        style={{ ...base, background: 'transparent', color: disabled ? '#b5b5b5' : '#005bd3', fontWeight: 450, fontSize: 13, padding: 0,
          textDecoration: (!disabled && hov) ? 'underline' : 'none',
          boxShadow: foc ? FOCUS_RING : 'none' }}>
        {inner}
      </button>
    );
  }
  if (v === 'tertiary') {
    const bg = disabled ? 'rgba(0,0,0,0.05)' : act ? '#f1f1f1' : hov ? '#f7f7f7' : 'transparent';
    return (
      <button type={type} disabled={disabled} onClick={disabled ? undefined : onClick} {...evts}
        style={{ ...base, background: bg, color: disabled ? '#b5b5b5' : '#303030', fontWeight: 550,
          boxShadow: foc ? FOCUS_RING : 'none' }}>
        {inner}
      </button>
    );
  }
  if (v === 'primary') {
    const bg = disabled ? 'rgba(0,0,0,0.05)'
      : t === 'critical' ? '#e51c00'
        : t === 'success'  ? '#29845a'
          : '#303030';
    const baseShadow = (t === 'critical' || t === 'success') ? BTN_SHADOW_CRITICAL : BTN_SHADOW_PRIMARY;
    const activeShadow = `inset 0 2px 1px rgba(0,0,0,0.3), ${baseShadow}`;
    const shadow = disabled ? 'none'
      : foc ? `${FOCUS_RING}, ${act ? activeShadow : baseShadow}`
        : act ? activeShadow
          : baseShadow;
    return (
      <button type={type} disabled={disabled} onClick={disabled ? undefined : onClick} {...evts}
        style={{ ...base, background: bg, color: disabled ? '#b5b5b5' : '#fff', fontWeight: 600, boxShadow: shadow,
          filter: (!disabled && hov && !act) ? 'brightness(1.08)' : 'none' }}>
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
    <button type={type} disabled={disabled} onClick={disabled ? undefined : onClick} {...evts}
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
