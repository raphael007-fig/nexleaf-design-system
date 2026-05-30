import { useState } from 'react';

const IcoAlertCircle = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="6.5" stroke="#8e1f0b" strokeWidth="1.2" />
    <line x1="8" y1="5.5" x2="8" y2="9.5" stroke="#8e1f0b" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="8" cy="11.25" r="0.7" fill="#8e1f0b" />
  </svg>
);

// Track: 36×20px pill. Thumb: 14×14px circle, 3px inset.
// Checked → thumb slides right, track goes dark (#303030).
// Error unchecked → pinkish track. Error checked → red track (#d92d20).

export function Toggle({ label, helpText, error, disabled = false, checked = false, onChange }) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);

  const isOn = !!checked;

  // ── Track colour ────────────────────────────────────────────────
  let trackBg, trackBorder;
  if (disabled) {
    trackBg = 'rgba(0,0,0,0.08)'; trackBorder = 'none';
  } else if (error && isOn) {
    trackBg = '#d92d20'; trackBorder = 'none';
  } else if (error && !isOn) {
    trackBg = '#fee9e8'; trackBorder = '0.66px solid #8e1f0b';
  } else if (isOn) {
    trackBg = hov ? '#4a4a4a' : '#303030'; trackBorder = 'none';
  } else if (hov) {
    trackBg = '#e0e0e0'; trackBorder = 'none';
  } else {
    trackBg = '#ebebeb'; trackBorder = 'none';
  }

  // ── Thumb colour ────────────────────────────────────────────────
  const thumbBg = disabled ? '#c9c9c9' : '#ffffff';
  const thumbShadow = disabled ? 'none' : '0 1px 3px rgba(0,0,0,0.20)';

  // ── Focus ring ──────────────────────────────────────────────────
  const focusRing = foc && !disabled ? '0 0 0 2px #005bd3' : 'none';

  const labelColor = disabled ? '#b5b5b5' : '#303030';
  const helpColor  = disabled ? '#b5b5b5' : '#616161';

  function handleToggle() {
    if (disabled || !onChange) return;
    onChange(!isOn);
  }

  function handleKey(e) {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleToggle(); }
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

        {/* Track */}
        <div
          role="switch"
          aria-checked={isOn}
          tabIndex={disabled ? -1 : 0}
          onClick={handleToggle}
          onKeyDown={handleKey}
          onMouseEnter={() => !disabled && setHov(true)}
          onMouseLeave={() => setHov(false)}
          onFocus={() => !disabled && setFoc(true)}
          onBlur={() => setFoc(false)}
          style={{
            position: 'relative',
            width: 36, height: 20,
            borderRadius: 100,
            background: trackBg,
            border: trackBorder,
            boxSizing: 'border-box',
            boxShadow: focusRing,
            cursor: disabled ? 'not-allowed' : 'pointer',
            flexShrink: 0,
            outline: 'none',
            transition: 'background 0.18s, box-shadow 0.15s',
          }}
        >
          {/* Thumb */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: isOn ? 'calc(100% - 17px)' : 3,
            transform: 'translateY(-50%)',
            width: 14, height: 14,
            borderRadius: '50%',
            background: thumbBg,
            boxShadow: thumbShadow,
            transition: 'left 0.18s',
          }} />
        </div>

        {/* Label */}
        {label && (
          <span
            onClick={handleToggle}
            style={{
              fontSize: 13, fontWeight: 450, lineHeight: '20px',
              color: labelColor, fontFamily: 'Inter, sans-serif',
              userSelect: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            {label}
          </span>
        )}
      </div>

      {/* Help text */}
      {helpText && !error && (
        <div style={{ paddingLeft: 44 }}>
          <span style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: helpColor, fontFamily: 'Inter, sans-serif' }}>
            {helpText}
          </span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ paddingLeft: 44, display: 'flex', alignItems: 'center', gap: 6 }}>
          <IcoAlertCircle />
          <span style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: '#8e1f0b', fontFamily: 'Inter, sans-serif' }}>
            {error}
          </span>
        </div>
      )}
    </div>
  );
}
