import { useState } from 'react';

const IcoAlertCircle = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="6.5" stroke="#8e1f0b" strokeWidth="1.2" />
    <line x1="8" y1="5.5" x2="8" y2="9.5" stroke="#8e1f0b" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="8" cy="11.25" r="0.7" fill="#8e1f0b" />
  </svg>
);

// Outer dot: 16×16px circle. Inner dot: 6×6px (checked only).
// Default tone → dark #303030 fill on check. Magic tone → purple #8051ff fill on check.
// Error → pinkish fill #fee9e8 + #8e1f0b border (unchecked); #8e1f0b fill (checked).

export function RadioButton({
  label, helpText, error, disabled = false, checked = false, onChange,
  tone = 'default', name,
}) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);

  const isMagic = tone === 'magic';

  // ── Outer ring colours ──────────────────────────────────────────
  let ringBg, ringBorder;
  if (disabled) {
    ringBg = 'rgba(0,0,0,0.08)'; ringBorder = 'none';
  } else if (error && checked) {
    ringBg = '#8e1f0b'; ringBorder = 'none';
  } else if (error && !checked) {
    ringBg = '#fee9e8'; ringBorder = '0.66px solid #8e1f0b';
  } else if (checked) {
    ringBg = isMagic ? '#8051ff' : '#303030'; ringBorder = 'none';
  } else if (hov || foc) {
    ringBg = isMagic ? '#f3f1ff' : '#fafafa';
    ringBorder = isMagic ? '0.66px solid #8051ff' : '0.66px solid #616161';
  } else {
    ringBg = isMagic ? '#f8f7ff' : '#fdfdfd';
    ringBorder = isMagic ? '0.66px solid #9474ff' : '0.66px solid #8a8a8a';
  }

  const innerDotBg = disabled ? 'rgba(160,160,160,0.7)' : '#fff';
  const labelColor = disabled
    ? '#b5b5b5'
    : (isMagic && checked) ? '#5700d1' : '#303030';
  const helpColor  = disabled ? '#b5b5b5' : '#616161';
  const focusRing  = (foc && !disabled)
    ? { boxShadow: '0 0 0 2px #005bd3', borderRadius: '50%' }
    : {};

  function handleSelect() {
    if (disabled || !onChange) return;
    if (!checked) onChange(true);
  }
  function handleKey(e) {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleSelect(); }
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ ...focusRing, display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
          <div
            role="radio"
            aria-checked={checked}
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : 0}
            data-name={name}
            onClick={handleSelect}
            onKeyDown={handleKey}
            onMouseEnter={() => !disabled && setHov(true)}
            onMouseLeave={() => !disabled && setHov(false)}
            onFocus={() => !disabled && setFoc(true)}
            onBlur={() => setFoc(false)}
            style={{
              width: 16, height: 16, borderRadius: '50%',
              background: ringBg, border: ringBorder,
              flexShrink: 0, position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: disabled ? 'not-allowed' : 'pointer',
              boxSizing: 'border-box', outline: 'none',
              transition: 'background 0.12s, border-color 0.12s',
            }}
          >
            {checked && (
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: innerDotBg, flexShrink: 0,
              }} />
            )}
          </div>
        </div>
        {label && (
          <span
            onClick={handleSelect}
            style={{
              fontSize: 13, fontWeight: 450, lineHeight: '20px',
              color: labelColor, fontFamily: 'Inter, sans-serif',
              padding: '4px 0', userSelect: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            {label}
          </span>
        )}
      </div>

      {helpText && !error && (
        <div style={{ paddingLeft: 24, paddingBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: helpColor, fontFamily: 'Inter, sans-serif' }}>
            {helpText}
          </span>
        </div>
      )}

      {error && (
        <div style={{ paddingLeft: 24, paddingBottom: 4, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <IcoAlertCircle />
            <span style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: '#8e1f0b', fontFamily: 'Inter, sans-serif' }}>
              {error}
            </span>
          </div>
          {helpText && (
            <span style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: helpColor, fontFamily: 'Inter, sans-serif' }}>
              {helpText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Group helper ─────────────────────────────────────────────────
export function RadioGroup({
  title, name, value, onChange, options = [], disabled, tone = 'default', error, required,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Inter, sans-serif' }}>
      {title && (
        <span style={{ fontSize: 13, fontWeight: 500, color: disabled ? '#b5b5b5' : '#303030', lineHeight: '20px' }}>
          {title}{required && <span style={{ color: '#d92d20', marginLeft: 2 }}>*</span>}
        </span>
      )}
      {options.map(opt => (
        <RadioButton
          key={opt.value}
          name={name}
          label={opt.label}
          helpText={opt.helpText}
          checked={value === opt.value}
          disabled={disabled || opt.disabled}
          tone={tone}
          onChange={() => onChange && onChange(opt.value)}
        />
      ))}
      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 4 }}>
          <IcoAlertCircle />
          <span style={{ fontSize: 13, color: '#8e1f0b', fontFamily: 'Inter, sans-serif', lineHeight: '20px' }}>
            {error}
          </span>
        </div>
      )}
    </div>
  );
}
