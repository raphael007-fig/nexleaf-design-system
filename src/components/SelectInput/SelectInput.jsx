// ── Nexleaf Design System — SelectInput ──────────────────────────────────────
// Dropdown select rendered with the system's OWN OptionList in a Popover — not
// the native <select>, whose OS-drawn menu (macOS/iOS especially) breaks visual
// consistency across platforms. The field, label, error, and help rows are
// unchanged; only the open menu is now ours.
//
// API is unchanged and event-compatible: `onChange` still receives an
// event-shaped object ({ target: { value } }), so existing consumers using
// `e.target.value` keep working.

import { useRef, useState } from 'react';
import { Skeleton, SkeletonGroup } from '../Skeleton/Skeleton.jsx';
import { Popover } from '../Popover/Popover.jsx';
import { OptionList } from '../OptionList/OptionList.jsx';
import { getItemId, getItemLabel } from '../../foundation/itemShape.js';

const IcoErrorCircle = () => (
  <svg width={16} height={16} viewBox="0 0 20 20" fill="#d92d20" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Z" />
    <path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <path fillRule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
  </svg>
);

const IcoChevron = ({ open }) => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true"
    style={{ flexShrink: 0, transition: 'transform 0.12s ease', transform: open ? 'rotate(180deg)' : 'none' }}>
    <path d="M4 6l4 4 4-4" stroke="#616161" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function SelectInput({ label, options = [], placeholder, disabled, value, onChange, required, error, helpText, skeleton = false }) {
  const [internal,  setInternal]  = useState('');
  const [focused,   setFocused]   = useState(false);
  const [hovered,   setHovered]   = useState(false);
  const [open,      setOpen]      = useState(false);
  const anchorRef = useRef(null);

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
  const selectedLabel = (() => {
    const hit = options.find((o) => getItemId(o, 'SelectInput') === val);
    return hit != null ? getItemLabel(hit) : '';
  })();

  function select(id) {
    if (!isControlled) setInternal(id);
    // Event-shaped payload keeps `e.target.value` consumers working.
    if (onChange) onChange({ target: { value: id } });
    setOpen(false);
    anchorRef.current?.focus();
  }

  let border, bg, focusShadow;
  if (disabled) {
    border = 'none'; bg = 'rgba(0,0,0,0.08)'; focusShadow = 'none';
  } else if (error) {
    border = '0.66px solid #8e1f0b'; bg = '#fee9e8'; focusShadow = 'none';
  } else if (focused || open) {
    border = '0.66px solid #616161'; bg = '#fafafa'; focusShadow = open ? 'none' : '0 0 0 2px #005bd3';
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
      <div style={{ position: 'relative' }}>
        <button
          ref={anchorRef}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={typeof label === 'string' ? label : undefined}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); setOpen(true); }
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onMouseEnter={() => !disabled && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 10px 6px 12px',
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
            textAlign: 'left',
          }}
        >
          <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selectedLabel || placeholder || 'Select…'}
          </span>
          <IcoChevron open={open} />
        </button>
        <Popover
          open={open}
          onClose={() => setOpen(false)}
          anchorRef={anchorRef}
          role="listbox"
          ariaLabel={typeof label === 'string' ? label : 'Options'}
          matchWidth
        >
          <div style={{ padding: 4 }}>
            <OptionList
              flush
              dense
              options={options}
              selected={val}
              onChange={select}
              ariaLabel={typeof label === 'string' ? label : 'Options'}
            />
          </div>
        </Popover>
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
