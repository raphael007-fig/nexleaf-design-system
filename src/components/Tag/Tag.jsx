import { useState } from 'react';

// X icon (used inside the remove button)
const IcoX = ({ size = 10, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Pill-shaped chip representing a keyword or selected value.
// Tones: default (gray) / magic (purple). Removable shows a trailing X button.
//
// Default rest:  #ebebeb / #303030     Magic rest:  #ede7ff / #5700d1
// Default hover: #e0e0e0                Magic hover: #dcd0ff
// Focus ring:    0 0 0 2px #005bd3
// Disabled:      rgba(0,0,0,0.06) / #b5b5b5

export function Tag({
  label, children,
  tone = 'default',
  icon,
  removable = false,
  onRemove,
  onClick,
  disabled = false,
  truncate = false, // when true, label ellipsises; the chip will shrink to fit its parent
}) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const [act, setAct] = useState(false);
  const [xHov, setXHov] = useState(false);

  const isMagic = tone === 'magic';
  const isInteractive = !!onClick || removable;

  // ── Background + text ───────────────────────────────────────────
  let bg, color;
  if (disabled) {
    bg = 'rgba(0,0,0,0.06)';
    color = '#b5b5b5';
  } else if (isMagic) {
    color = '#5700d1';
    if (act)        bg = '#cbb8ff';
    else if (hov)   bg = '#dcd0ff';
    else            bg = '#ede7ff';
  } else {
    color = '#303030';
    if (act)        bg = '#d2d2d2';
    else if (hov)   bg = '#e0e0e0';
    else            bg = '#ebebeb';
  }

  const focusRing = foc && !disabled ? '0 0 0 2px #005bd3' : 'none';

  // ── X button styling ────────────────────────────────────────────
  const xButtonBg = xHov && !disabled
    ? (isMagic ? '#5700d1' : '#303030')
    : 'transparent';
  const xColor = xHov && !disabled
    ? '#ffffff'
    : (disabled ? '#b5b5b5' : (isMagic ? '#5700d1' : '#616161'));

  function handleRemove(e) {
    e.stopPropagation();
    if (!disabled && onRemove) onRemove();
  }
  function handleKey(e) {
    if (disabled) return;
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (removable && onRemove) { e.preventDefault(); onRemove(); }
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (onClick) { e.preventDefault(); onClick(e); }
    }
  }

  const labelContent = children ?? label;

  return (
    <span
      tabIndex={isInteractive && !disabled ? 0 : -1}
      onClick={!disabled && onClick ? onClick : undefined}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => { setHov(false); setAct(false); }}
      onMouseDown={() => !disabled && setAct(true)}
      onMouseUp={() => setAct(false)}
      onFocus={() => !disabled && setFoc(true)}
      onBlur={() => setFoc(false)}
      onKeyDown={handleKey}
      style={{
        display: 'inline-flex', alignItems: 'center',
        gap: icon ? 4 : (removable ? 4 : 0),
        background: bg, color,
        borderRadius: 100,
        padding: removable ? '3px 4px 3px 10px' : '3px 10px',
        fontSize: 13, fontWeight: 450, lineHeight: '18px',
        fontFamily: 'Inter, sans-serif',
        cursor: disabled ? 'not-allowed' : (isInteractive ? 'pointer' : 'default'),
        boxShadow: focusRing,
        outline: 'none', userSelect: 'none',
        flexShrink: truncate ? 1 : 0,
        minWidth: truncate ? 0 : undefined,
        maxWidth: truncate ? '100%' : undefined,
        transition: 'background 0.1s, box-shadow 0.12s',
      }}
    >
      {icon && (
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 14, height: 14, flexShrink: 0, color }} aria-hidden="true">
          {icon}
        </span>
      )}
      <span style={truncate ? {
        minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block',
      } : undefined}>{labelContent}</span>
      {removable && (
        <button
          type="button"
          aria-label={typeof labelContent === 'string' ? `Remove ${labelContent}` : 'Remove tag'}
          onClick={handleRemove}
          onMouseEnter={() => !disabled && setXHov(true)}
          onMouseLeave={() => setXHov(false)}
          disabled={disabled}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 18, height: 18, padding: 0,
            background: xButtonBg, border: 'none', borderRadius: '50%',
            cursor: disabled ? 'not-allowed' : 'pointer',
            flexShrink: 0,
            fontFamily: 'Inter, sans-serif',
            transition: 'background 0.1s',
          }}
        >
          <IcoX size={10} color={xColor} />
        </button>
      )}
    </span>
  );
}

// Convenience layout helper — wraps tags with consistent gap + wrap behaviour.
export function TagGroup({ children, gap = 8, wrap = true }) {
  return (
    <div style={{
      display: 'flex', flexWrap: wrap ? 'wrap' : 'nowrap',
      gap, alignItems: 'center',
      fontFamily: 'Inter, sans-serif',
    }}>
      {children}
    </div>
  );
}
