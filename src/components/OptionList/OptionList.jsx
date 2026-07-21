import { useState, useId } from 'react';
import { Checkbox } from '../Checkbox/Checkbox.jsx';
import { getItemId, getItemLabel } from '../../foundation/itemShape.js';

const IcoCheckTick = ({ color = '#303030', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, display: 'block' }}>
    <path d="M4.5 10.5 8 14 15.5 6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IcoMediaPlaceholder = ({ color = '#616161', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, display: 'block' }}>
    <rect x="2.5" y="4" width="15" height="12" rx="2" stroke={color} strokeWidth="1.3" />
    <circle cx="7" cy="8.5" r="1.5" fill={color} />
    <path d="M2.5 13.5 6.5 10l3 3 2.5-2 5 4" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// `flush`  — borderless, full-width container (embed inside a dropdown/sheet).
// `dense`  — compact rows matching the standalone OptionList size (13px / 6px
//            padding / ~32px), instead of flush's 48px touch targets. Combine
//            `flush dense` for a dropdown that reads at the OptionList row size.
export function OptionList({ title, options = [], selected, onChange, allowMultiple = false, sections = [], error, ariaLabel, flush = false, dense = false }) {
  const [hovKey, setHovKey] = useState(null);
  const [focKey, setFocKey] = useState(null);
  const baseId = useId();
  // Single top-level title (no sections) labels the whole listbox; grouped
  // sections each label their own role="group" instead.
  const hasSections = sections.length > 0;
  const listLabelId = (!hasSections && title) ? `${baseId}-label` : undefined;

  const resolvedSections = sections.length > 0 ? sections : [{ title, options }];

  function isSelected(val) {
    if (allowMultiple) return Array.isArray(selected) && selected.includes(val);
    return selected === val;
  }

  function handleSelect(val, disabled) {
    if (disabled || !onChange) return;
    if (allowMultiple) {
      const curr = Array.isArray(selected) ? selected : [];
      onChange(curr.includes(val) ? curr.filter(v => v !== val) : [...curr, val]);
    } else {
      onChange(val);
    }
  }

  function itemBg(val, disabled, key) {
    if (disabled) return 'transparent';
    if (isSelected(val)) return '#ebebeb';
    if (hovKey === key) return '#f1f1f1';
    return 'transparent';
  }

  return (
    <div role="listbox"
      aria-multiselectable={allowMultiple || undefined}
      aria-label={!listLabelId ? ariaLabel : undefined}
      aria-labelledby={listLabelId}
      style={flush
        ? { background: 'transparent', border: 'none', borderRadius: 0, padding: 0,
            fontFamily: 'Inter,sans-serif', display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0 }
        : { background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8,
            padding: 4, fontFamily: 'Inter,sans-serif',
            display: 'inline-flex', flexDirection: 'column', minWidth: 160 }}>
      {resolvedSections.map((section, si) => {
        const sectionTitleId = section.title ? `${baseId}-sec-${si}` : undefined;
        // A grouped section gets role="group" + aria-labelledby; the single
        // un-sectioned title instead labels the listbox itself (above).
        const groupProps = hasSections && section.title
          ? { role: 'group', 'aria-labelledby': sectionTitleId }
          : {};
        return (
        <div key={si} {...groupProps} style={si > 0 ? { borderTop: '1px solid #ebebeb', marginTop: 4, paddingTop: 4 } : {}}>
          {section.title && (
            <div style={{ padding: '2px 6px 4px', userSelect: 'none' }}>
              <span id={sectionTitleId ?? listLabelId} style={{ fontSize: 13, fontWeight: 650, lineHeight: '20px', color: '#303030' }}>{section.title}</span>
            </div>
          )}
          {(section.options || []).map((opt) => {
            // Canonical identity is `id` (falls back to legacy `value`).
            const optId = getItemId(opt, 'OptionList');
            const optLabel = getItemLabel(opt);
            const key = `${si}-${optId}`;
            const sel = isSelected(optId);
            const foc = focKey === key;
            return (
              <div key={optId}
                tabIndex={opt.disabled ? -1 : 0}
                role="option" aria-selected={sel}
                onClick={() => handleSelect(optId, opt.disabled)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelect(optId, opt.disabled); } }}
                onMouseEnter={() => !opt.disabled && setHovKey(key)}
                onMouseLeave={() => setHovKey(null)}
                onFocus={() => setFocKey(key)}
                onBlur={() => setFocKey(null)}
                style={{ display: 'flex', alignItems: 'center', gap: 8,
                  // `dense` = the compact standalone-OptionList row size even
                  // inside a flush container (used by the SelectInput /
                  // SearchSelect dropdowns).
                  padding: dense ? '6px 8px' : (flush ? '12px 14px' : 6),
                  minHeight: (flush && !dense) ? 48 : undefined,
                  borderRadius: dense ? 8 : (flush ? 12 : 8),
                  background: itemBg(optId, opt.disabled, key),
                  cursor: opt.disabled ? 'not-allowed' : 'pointer',
                  position: 'relative', outline: 'none',
                  transition: 'background 0.1s', userSelect: 'none' }}>
                {foc && !opt.disabled && (
                  <div style={{ position: 'absolute', inset: -1, borderRadius: 9,
                    border: '2px solid #005bd3', pointerEvents: 'none', zIndex: 1 }} />
                )}
                {allowMultiple && (
                  <div onClick={e => e.stopPropagation()} style={{ flexShrink: 0 }}>
                    <Checkbox checked={sel} disabled={opt.disabled}
                      onChange={() => handleSelect(optId, opt.disabled)} />
                  </div>
                )}
                {opt.media && (
                  <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                    {opt.media === true
                      ? <IcoMediaPlaceholder color={opt.disabled ? '#b5b5b5' : '#616161'} />
                      : opt.media}
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: (flush && !dense) ? 14 : 13,
                      // Body text — the dropdown/sheet row is content, not a
                      // heading. `flush` used to render 15px/500 which read as
                      // title text; body is 13–14px/450 (selected → 550 medium,
                      // never the 650 heading weight). `dense` = 13px to match
                      // the standalone OptionList.
                      fontWeight: (flush || dense)
                        ? (!allowMultiple && sel ? 550 : 450)
                        : ((!allowMultiple && sel) ? 650 : 450),
                      lineHeight: '20px',
                      color: opt.disabled ? '#b5b5b5' : '#303030',
                      whiteSpace: flush ? 'normal' : 'nowrap' }}>
                      {optLabel}
                    </span>
                    {opt.badge && (
                      <div style={{ display: 'inline-flex', alignItems: 'center',
                        background: 'rgba(0,0,0,0.06)', borderRadius: 8, height: 20, padding: '2px 8px' }}>
                        <span style={{ fontSize: 12, fontWeight: 550, lineHeight: '16px',
                          color: opt.disabled ? '#b5b5b5' : '#616161', whiteSpace: 'nowrap' }}>
                          {typeof opt.badge === 'string' ? opt.badge : 'Label'}
                        </span>
                      </div>
                    )}
                  </div>
                  {opt.description && (
                    <span style={{ fontSize: 11, fontWeight: 450, lineHeight: '16px',
                      color: opt.disabled ? '#b5b5b5' : '#616161', whiteSpace: 'nowrap' }}>
                      {opt.description}
                    </span>
                  )}
                </div>
                {!allowMultiple && sel && <IcoCheckTick color="#303030" size={20} />}
              </div>
            );
          })}
        </div>
        );
      })}
      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px 2px' }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="#d92d20" style={{ flexShrink: 0 }}>
            <path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Z" />
            <path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
            <path fillRule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
          </svg>
          <span style={{ fontSize: 13, color: '#d92d20', fontFamily: 'Inter,sans-serif', lineHeight: '20px' }}>{error}</span>
        </div>
      )}
    </div>
  );
}
