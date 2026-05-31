import { useState } from 'react';
import { Skeleton, SkeletonGroup } from '../Skeleton/Skeleton.jsx';
import { getItemId, getItemLabel } from '../../foundation/itemShape.js';

const IcoErrorCircle = () => (
  <svg width={16} height={16} viewBox="0 0 20 20" fill="#d92d20" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Z" />
    <path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <path fillRule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
  </svg>
);

export function SelectInput({ label, options = [], placeholder, disabled, value, onChange, required, error, helpText, skeleton = false }) {
  const [internal,  setInternal]  = useState('');
  const [focused,   setFocused]   = useState(false);
  const [hovered,   setHovered]   = useState(false);

  // Skeleton mode short-circuits rendering (hooks above stay called so order is
  // stable if a parent toggles `skeleton` in place). Mirrors TextInput: label
  // placeholder over a field-height block to preserve layout while loading.
  if (skeleton) {
    return (
      <SkeletonGroup label={`Loading ${typeof label === 'string' ? label : 'field'}`}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {label && <Skeleton.Line width={120} height={13} />}
          <Skeleton width="100%" height={34} radius={8} ariaLabel={null} />
        </div>
      </SkeletonGroup>
    );
  }

  const isControlled = onChange !== undefined;
  const val = isControlled ? (value || '') : internal;

  function handleChange(e) {
    if (!isControlled) setInternal(e.target.value);
    if (onChange) onChange(e);
  }

  let border, bg, focusShadow;
  if (disabled) {
    border = 'none'; bg = 'rgba(0,0,0,0.08)'; focusShadow = 'none';
  } else if (error) {
    border = '0.66px solid #8e1f0b'; bg = '#fee9e8'; focusShadow = 'none';
  } else if (focused) {
    border = '0.66px solid #616161'; bg = '#fafafa'; focusShadow = '0 0 0 2px #005bd3';
  } else if (hovered) {
    border = '0.66px solid #616161'; bg = '#fafafa'; focusShadow = 'none';
  } else {
    border = '0.66px solid #8a8a8a'; bg = '#fdfdfd'; focusShadow = 'none';
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Inter, sans-serif' }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 500, color: disabled ? '#b5b5b5' : '#303030', fontFamily: 'Inter, sans-serif' }}>
          {label}{required && <span style={{ color: '#d92d20', marginLeft: 2 }}>*</span>}
        </label>
      )}
      <select
        value={val}
        onChange={handleChange}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%',
          padding: '6px 36px 6px 12px',
          borderRadius: 8,
          border,
          background: bg,
          boxShadow: focusShadow,
          fontSize: 13,
          fontFamily: 'Inter, sans-serif',
          lineHeight: '20px',
          color: val ? (disabled ? '#b5b5b5' : '#303030') : '#9e9e9e',
          outline: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'border-color 0.12s, background 0.12s, box-shadow 0.12s',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%23616161' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 10px center',
          WebkitAppearance: 'none',
          appearance: 'none',
        }}
      >
        <option value="" disabled style={{ color: '#9e9e9e' }}>{placeholder || 'Select…'}</option>
        {options.map(o => {
          // Canonical identity is `id` (falls back to legacy `value`). Plain
          // string/number options are their own id + label.
          const v = getItemId(o, 'SelectInput');
          const l = getItemLabel(o);
          return <option key={v} value={v} style={{ color: '#303030' }}>{l}</option>;
        })}
      </select>
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
