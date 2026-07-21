// ── Nexleaf Design System — DateField ────────────────────────────────────────
// A normal-looking date input that opens the DatePicker calendar in a Popover
// on click. Pure composition: TextInput (display) + Popover (anchor/dismiss)
// + DatePicker (selection). Selecting a day fills the field and closes the
// calendar; Escape / outside click also close.
//
//   <DateField label="Configuration date" required value={date} onChange={setDate} />

import { useRef, useState } from 'react';
import { TextInput } from '../TextInput/TextInput.jsx';
import { Popover } from '../Popover/Popover.jsx';
import { DatePicker } from '../DatePicker/DatePicker.jsx';
import { TEXT_SUBDUED } from '../../tokens/index.js';

const IcoCalendar = ({ size = 20, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="3.25" y="4.25" width="13.5" height="12.5" rx="1.5" stroke={color} strokeWidth="1.5" />
    <path d="M3.25 8h13.5" stroke={color} strokeWidth="1.5" />
    <path d="M7 2.75v3M13 2.75v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

function defaultFormat(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * DateField
 *
 * @param {string} [label]
 * @param {boolean} [required]
 * @param {Date|null} [value]            Selected date (single-date mode).
 * @param {(d:Date) => void} [onChange]  Fires with the picked Date; the popover closes.
 * @param {string} [placeholder='Select a date']
 * @param {string} [helpText]
 * @param {string} [error]
 * @param {boolean} [disabled]
 * @param {(d:Date) => string} [formatDate]  Display formatter (default: 20 Jul 2026).
 * @param {Date} [minDate]               Passed through to DatePicker.
 * @param {Date} [maxDate]               Passed through to DatePicker.
 */
export function DateField({
  label,
  required,
  value,
  onChange,
  placeholder = 'Select a date',
  helpText,
  error,
  disabled,
  formatDate = defaultFormat,
  minDate,
  maxDate,
}) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        ref={anchorRef}
        onClick={() => { if (!disabled) setOpen(true); }}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        <TextInput
          label={label}
          required={required}
          placeholder={placeholder}
          value={value ? formatDate(value) : ''}
          onChange={() => {}}
          suffix={<IcoCalendar />}
          helpText={helpText}
          error={error}
          disabled={disabled}
        />
      </div>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorRef={anchorRef}
        role="dialog"
        ariaLabel={`${label || 'Date'}: choose a date`}
        minWidth={0}
        maxHeight="none"
      >
        <DatePicker
          value={value}
          onChange={(d) => { onChange?.(d); setOpen(false); }}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Popover>
    </>
  );
}
