import { useState } from 'react';

const IcoErrorCircle = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="#d92d20" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Z" />
    <path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <path fillRule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
  </svg>
);

export function TextInput({
  label, placeholder, value, onChange, disabled, readOnly,
  suffix, prefix, required, helpText, error, labelAction, onLabelAction,
  type = 'text', clearButton, borderless = false, tone = 'default', size = 'medium',
}) {
  const [internalVal, setInternalVal] = useState(value || '');
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isControlled = onChange !== undefined;
  const val = isControlled ? (value || '') : internalVal;

  function handleChange(e) {
    if (!isControlled) setInternalVal(e.target.value);
    if (onChange) onChange(e);
  }

  let border, bg, textColor, focusShadow;
  if (disabled || readOnly) {
    border = 'none'; bg = 'rgba(0,0,0,0.08)'; textColor = '#b5b5b5'; focusShadow = 'none';
  } else if (error) {
    border = '0.66px solid #8e1f0b'; bg = '#fee9e8'; textColor = '#303030'; focusShadow = 'none';
  } else if (borderless) {
    border = 'none'; bg = hovered || focused ? '#f0f0f0' : 'transparent'; textColor = '#303030'; focusShadow = 'none';
  } else if (tone === 'magic') {
    border = focused || hovered ? '0.66px solid #8051ff' : '0.66px solid #9474ff';
    bg = focused || hovered ? '#f3f1ff' : '#f8f7ff';
    textColor = '#5700d1'; focusShadow = focused ? '0 0 0 2px #8051ff' : 'none';
  } else if (focused) {
    border = '0.66px solid #616161'; bg = '#fafafa'; textColor = '#303030'; focusShadow = '0 0 0 2px #005bd3';
  } else if (hovered) {
    border = '0.66px solid #616161'; bg = '#fafafa'; textColor = '#303030'; focusShadow = 'none';
  } else {
    border = '0.66px solid #8a8a8a'; bg = '#fdfdfd'; textColor = '#303030'; focusShadow = 'none';
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Inter,sans-serif' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: disabled ? '#b5b5b5' : '#303030', fontFamily: 'Inter,sans-serif' }}>
            {label}{required && <span style={{ color: '#d92d20', marginLeft: 2 }}>*</span>}
          </label>
          {labelAction && (
            <button onClick={onLabelAction} style={{ fontSize: 13, fontWeight: 500, color: '#005bd3', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Inter,sans-serif' }}>
              {labelAction}
            </button>
          )}
        </div>
      )}
      <div
        style={{ display: 'flex', alignItems: 'center', padding: size === 'slim' ? '4px 10px' : '6px 12px',
          borderRadius: borderless ? 6 : 8, border, background: bg, gap: 6,
          boxShadow: focusShadow, transition: 'border-color 0.12s,background 0.12s,box-shadow 0.12s' }}
        onMouseEnter={() => !disabled && !readOnly && setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        {prefix && <span style={{ color: tone === 'magic' ? '#8051ff' : '#616161', flexShrink: 0, display: 'flex', alignItems: 'center', fontSize: 13 }}>{prefix}</span>}
        <input type={type} value={val} onChange={handleChange}
          placeholder={placeholder} disabled={disabled || readOnly}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontSize: 13, fontFamily: 'Inter,sans-serif', lineHeight: '20px',
            color: disabled || readOnly ? '#b5b5b5' : textColor,
            cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'auto', minWidth: 0 }} />
        {clearButton && val && !disabled && (
          <button onClick={() => handleChange({ target: { value: '' } })}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#9e9e9e">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" />
            </svg>
          </button>
        )}
        {suffix && <span style={{ fontSize: 13, color: '#616161', flexShrink: 0, fontFamily: 'Inter,sans-serif' }}>{suffix}</span>}
      </div>
      {error && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
          <IcoErrorCircle />
          <span style={{ fontSize: 13, color: '#d92d20', fontFamily: 'Inter,sans-serif', lineHeight: '20px' }}>{error}</span>
        </div>
      )}
      {helpText && !error && (
        <span style={{ fontSize: 13, color: '#616161', fontFamily: 'Inter,sans-serif', lineHeight: '20px' }}>{helpText}</span>
      )}
    </div>
  );
}
