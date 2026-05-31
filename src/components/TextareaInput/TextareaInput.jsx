import { useState } from 'react';
import { Skeleton, SkeletonGroup } from '../Skeleton/Skeleton.jsx';

const IcoErrorCircle = () => (
  <svg width={16} height={16} viewBox="0 0 20 20" fill="#d92d20" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Z" />
    <path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <path fillRule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
  </svg>
);

export function TextareaInput({
  label, placeholder, value, onChange, disabled, readOnly,
  required, helpText, error, labelAction, onLabelAction,
  rows = 4, maxLength, skeleton = false,
}) {
  const [internalVal, setInternalVal] = useState(value || '');
  const [focused,  setFocused]  = useState(false);
  const [hovered,  setHovered]  = useState(false);

  // Skeleton mode short-circuits rendering (hooks above stay called so order is
  // stable if a parent toggles `skeleton` in place). Block height tracks `rows`
  // so the placeholder matches the real textarea's footprint (no layout jump).
  if (skeleton) {
    const fieldHeight = 16 + rows * 20; // vertical padding + rows × line-height
    return (
      <SkeletonGroup label={`Loading ${typeof label === 'string' ? label : 'field'}`}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {label && <Skeleton.Line width={120} height={13} />}
          <Skeleton width="100%" height={fieldHeight} radius={8} ariaLabel={null} />
        </div>
      </SkeletonGroup>
    );
  }

  const isControlled = onChange !== undefined;
  const val = isControlled ? (value || '') : internalVal;

  function handleChange(e) {
    if (maxLength && e.target.value.length > maxLength) return;
    if (!isControlled) setInternalVal(e.target.value);
    if (onChange) onChange(e);
  }

  let border, bg, textColor, focusShadow;
  if (disabled || readOnly) {
    border = 'none'; bg = 'rgba(0,0,0,0.08)'; textColor = '#b5b5b5'; focusShadow = 'none';
  } else if (error) {
    border = '0.66px solid #8e1f0b'; bg = '#fee9e8'; textColor = '#303030'; focusShadow = 'none';
  } else if (focused) {
    border = '0.66px solid #616161'; bg = '#fafafa'; textColor = '#303030'; focusShadow = '0 0 0 2px #005bd3';
  } else if (hovered) {
    border = '0.66px solid #616161'; bg = '#fafafa'; textColor = '#303030'; focusShadow = 'none';
  } else {
    border = '0.66px solid #8a8a8a'; bg = '#fdfdfd'; textColor = '#303030'; focusShadow = 'none';
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Inter, sans-serif' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: disabled ? '#b5b5b5' : '#303030', fontFamily: 'Inter, sans-serif' }}>
            {label}{required && <span style={{ color: '#d92d20', marginLeft: 2 }}>*</span>}
          </label>
          {labelAction && (
            <button onClick={onLabelAction} style={{ fontSize: 13, fontWeight: 500, color: '#005bd3', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Inter, sans-serif' }}>
              {labelAction}
            </button>
          )}
        </div>
      )}

      <div style={{ position: 'relative' }}
        onMouseEnter={() => !disabled && !readOnly && setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <textarea
          value={val}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || readOnly}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%', display: 'block', boxSizing: 'border-box',
            padding: '8px 12px',
            borderRadius: 8, border, background: bg,
            boxShadow: focusShadow,
            fontSize: 13, fontFamily: 'Inter, sans-serif', lineHeight: '20px',
            color: disabled || readOnly ? '#b5b5b5' : textColor,
            resize: 'vertical', outline: 'none',
            cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'auto',
            transition: 'border-color 0.12s, background 0.12s, box-shadow 0.12s',
          }}
        />
        {maxLength && (
          <span style={{
            position: 'absolute', bottom: 8, right: 10,
            fontSize: 12, color: '#9e9e9e', fontFamily: 'Inter, sans-serif',
            pointerEvents: 'none', lineHeight: '16px',
          }}>
            {val.length}/{maxLength}
          </span>
        )}
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
          <IcoErrorCircle />
          <span style={{ fontSize: 13, color: '#d92d20', fontFamily: 'Inter, sans-serif', lineHeight: '20px' }}>{error}</span>
        </div>
      )}
      {helpText && !error && (
        <span style={{ fontSize: 13, color: '#616161', fontFamily: 'Inter, sans-serif', lineHeight: '20px' }}>{helpText}</span>
      )}
    </div>
  );
}
