import { useState } from 'react';

export function SelectInput({ label, options, placeholder, disabled, value, onChange, required }) {
  const [internal, setInternal] = useState('');
  const isControlled = onChange !== undefined;
  const val = isControlled ? (value || '') : internal;

  function handleChange(e) {
    if (!isControlled) setInternal(e.target.value);
    if (onChange) onChange(e);
  }

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 500, color: '#303030', display: 'block', marginBottom: 6, fontFamily: 'Inter,sans-serif' }}>
          {label}{required && <span style={{ color: '#d92d20', marginLeft: 2 }}>*</span>}
        </label>
      )}
      <select value={val} onChange={handleChange} disabled={disabled}
        style={{ width: '100%', padding: '10px 40px 10px 14px', borderRadius: 8,
          border: `1.5px solid ${disabled ? 'transparent' : '#8a8a8a'}`,
          background: disabled ? 'rgba(0,0,0,0.06)' : '#fdfdfd',
          fontSize: 14, color: val ? '#303030' : '#9e9e9e', outline: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontFamily: 'Inter,sans-serif',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23616161' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
          WebkitAppearance: 'none', appearance: 'none' }}>
        <option value="" disabled>{placeholder || 'Select…'}</option>
        {(options || []).map(o => <option key={o} value={o} style={{ color: '#303030' }}>{o}</option>)}
      </select>
    </div>
  );
}
