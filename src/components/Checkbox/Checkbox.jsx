import { useState } from 'react';

const IcoCheckSmall = ({ color = '#fff' }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8.5L6 11.5L13 4.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IcoMinusSmall = ({ color = '#fff' }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 8h8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IcoAlertCircle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="6.5" stroke="#8e1f0b" strokeWidth="1.2" />
    <line x1="8" y1="5.5" x2="8" y2="9.5" stroke="#8e1f0b" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="8" cy="11.25" r="0.7" fill="#8e1f0b" />
  </svg>
);

export function Checkbox({ label, helpText, error, disabled = false, checked = false, onChange, tone = 'default' }) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);

  const isChecked = checked === true || checked === 'true';
  const isIndet   = checked === 'indeterminate';
  const isMagic   = tone === 'magic';
  const hasCheckContent = isChecked || isIndet;

  let boxBg, boxBorder;
  if (disabled) {
    boxBg = 'rgba(0,0,0,0.08)'; boxBorder = 'none';
  } else if (error && !hasCheckContent) {
    boxBg = '#fee9e8'; boxBorder = '0.66px solid #8e1f0b';
  } else if (error && hasCheckContent) {
    boxBg = '#8e1f0b'; boxBorder = 'none';
  } else if (hasCheckContent) {
    boxBg = isMagic ? '#8051ff' : '#303030'; boxBorder = 'none';
  } else if (hov || foc) {
    boxBg = isMagic ? '#f3f1ff' : '#fafafa'; boxBorder = isMagic ? '0.66px solid #8051ff' : '0.66px solid #616161';
  } else {
    boxBg = isMagic ? '#f8f7ff' : '#fdfdfd'; boxBorder = isMagic ? '0.66px solid #9474ff' : '0.66px solid #8a8a8a';
  }

  const iconColor  = disabled && hasCheckContent ? 'rgba(160,160,160,0.7)' : '#fff';
  const labelColor = disabled ? '#b5b5b5' : (isMagic && hasCheckContent) ? '#5700d1' : '#303030';
  const helpColor  = disabled ? '#b5b5b5' : '#616161';
  const focusRing  = (foc && !disabled) ? { boxShadow: '0 0 0 2px #005bd3', borderRadius: 4 } : {};

  function handleToggle() {
    if (disabled || !onChange) return;
    onChange(isIndet ? true : !isChecked);
  }
  function handleKey(e) {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleToggle(); }
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ ...focusRing, display: 'flex', alignItems: 'flex-start', borderRadius: 4, flexShrink: 0 }}>
          <div
            role="checkbox" aria-checked={isIndet ? 'mixed' : isChecked}
            tabIndex={disabled ? -1 : 0}
            onClick={handleToggle} onKeyDown={handleKey}
            onMouseEnter={() => !disabled && setHov(true)} onMouseLeave={() => !disabled && setHov(false)}
            onFocus={() => !disabled && setFoc(true)} onBlur={() => setFoc(false)}
            style={{ width: 16, height: 16, borderRadius: 4, background: boxBg, border: boxBorder,
              flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: disabled ? 'not-allowed' : 'pointer',
              overflow: 'hidden', boxSizing: 'border-box', outline: 'none' }}>
            {isChecked && <IcoCheckSmall color={iconColor} />}
            {isIndet   && <IcoMinusSmall color={iconColor} />}
          </div>
        </div>
        {label && (
          <span onClick={handleToggle}
            style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: labelColor,
              fontFamily: 'Inter,sans-serif', padding: '4px 0', userSelect: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer' }}>
            {label}
          </span>
        )}
      </div>
      {helpText && !error && (
        <div style={{ paddingLeft: 24, paddingBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: helpColor, fontFamily: 'Inter,sans-serif' }}>{helpText}</span>
        </div>
      )}
      {error && (
        <div style={{ paddingLeft: 24, paddingBottom: 4, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <IcoAlertCircle />
            <span style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: '#8e1f0b', fontFamily: 'Inter,sans-serif' }}>{error}</span>
          </div>
          {helpText && <span style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: helpColor, fontFamily: 'Inter,sans-serif' }}>{helpText}</span>}
        </div>
      )}
    </div>
  );
}

export function RadioButton({ label, helpText, disabled = false, checked = false, onChange }) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);

  let dotBg, dotBorder;
  if (disabled) {
    dotBg = 'rgba(0,0,0,0.08)'; dotBorder = 'none';
  } else if (checked) {
    dotBg = '#303030'; dotBorder = 'none';
  } else if (hov || foc) {
    dotBg = '#fafafa'; dotBorder = '0.66px solid #616161';
  } else {
    dotBg = '#fdfdfd'; dotBorder = '0.66px solid #8a8a8a';
  }

  const focusRing  = (foc && !disabled) ? { boxShadow: '0 0 0 2px #005bd3', borderRadius: '50%' } : {};
  const labelColor = disabled ? '#b5b5b5' : '#303030';
  const helpColor  = disabled ? '#b5b5b5' : '#616161';

  function handleClick() { if (!disabled && onChange) onChange(); }
  function handleKey(e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleClick(); } }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ ...focusRing, display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
          <div
            role="radio" aria-checked={checked}
            tabIndex={disabled ? -1 : 0}
            onClick={handleClick} onKeyDown={handleKey}
            onMouseEnter={() => !disabled && setHov(true)} onMouseLeave={() => !disabled && setHov(false)}
            onFocus={() => !disabled && setFoc(true)} onBlur={() => setFoc(false)}
            style={{ width: 16, height: 16, borderRadius: '50%', background: dotBg, border: dotBorder,
              flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: disabled ? 'not-allowed' : 'pointer',
              boxSizing: 'border-box', outline: 'none' }}>
            {checked && <div style={{ width: 6, height: 6, borderRadius: '50%', background: disabled ? 'rgba(160,160,160,0.7)' : '#fff', flexShrink: 0 }} />}
          </div>
        </div>
        {label && (
          <span onClick={handleClick}
            style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: labelColor,
              fontFamily: 'Inter,sans-serif', padding: '4px 0', userSelect: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer' }}>
            {label}
          </span>
        )}
      </div>
      {helpText && (
        <div style={{ paddingLeft: 24, paddingBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: helpColor, fontFamily: 'Inter,sans-serif' }}>{helpText}</span>
        </div>
      )}
    </div>
  );
}

export function ChoiceList({ title, choices = [], selected, onChange, allowMultiple = false, error }) {
  function isSelected(value) {
    if (allowMultiple) return Array.isArray(selected) && selected.includes(value);
    return selected === value;
  }
  function handleChange(value) {
    if (!onChange) return;
    if (allowMultiple) {
      const cur = Array.isArray(selected) ? selected : [];
      onChange(cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value]);
    } else {
      onChange(value);
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {title && (
        <div style={{ paddingBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: '#303030', fontFamily: 'Inter,sans-serif' }}>{title}</span>
        </div>
      )}
      {choices.map(choice =>
        allowMultiple ? (
          <Checkbox key={choice.value} label={choice.label} helpText={choice.helpText}
            checked={isSelected(choice.value)} disabled={choice.disabled}
            onChange={() => handleChange(choice.value)} />
        ) : (
          <RadioButton key={choice.value} label={choice.label} helpText={choice.helpText}
            checked={isSelected(choice.value)} disabled={choice.disabled}
            onChange={() => handleChange(choice.value)} />
        )
      )}
      {error && (
        <div style={{ paddingTop: 4, paddingBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <IcoAlertCircle />
          <span style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: '#8e1f0b', fontFamily: 'Inter,sans-serif' }}>{error}</span>
        </div>
      )}
    </div>
  );
}
