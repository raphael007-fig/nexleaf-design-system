import { useState, useRef, useEffect, useMemo } from 'react';
import { Tag, TagGroup } from '../Tag/Tag.jsx';
import { Btn } from '../Btn/Btn.jsx';
import { TextInput } from '../TextInput/TextInput.jsx';
import { BottomSheet } from '../BottomSheet/BottomSheet.jsx';
import { OptionList } from '../OptionList/OptionList.jsx';
import { useIsMobile } from '../../foundation/useViewport.js';
import { getItemId, getItemLabel } from '../../foundation/itemShape.js';

// Canonical identity for any tree node is `id` (falls back to legacy `value`).
const oid = (o) => getItemId(o, 'SearchSelect');

// ─── Icons ────────────────────────────────────────────────────────────────────

const IcoChevron = ({ open }) => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true"
    style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
    <path d="M4 6l4 4 4-4" stroke="#616161" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoX = ({ size = 10, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoErrorCircle = () => (
  <svg width={16} height={16} viewBox="0 0 20 20" fill="#d92d20" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Z" />
    <path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <path fillRule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
  </svg>
);

// ─── Tree helpers ─────────────────────────────────────────────────────────────

function hasChildren(opt) { return Array.isArray(opt.children) && opt.children.length > 0; }

// Find an option (anywhere in the tree) by id — returns the matching node
function findOption(opts, value) {
  for (const o of opts) {
    if (oid(o) === value) return o;
    if (hasChildren(o)) {
      const f = findOption(o.children, value);
      if (f) return f;
    }
  }
  return null;
}

// Flatten all LEAF options (used for the single-select dropdown + selected label lookup)
function flattenLeaves(opts) {
  return opts.flatMap(o => hasChildren(o) ? flattenLeaves(o.children) : [o]);
}

// Filter the tree against a query. A branch is kept if itself or any descendant matches.
function filterTree(opts, query) {
  if (!query) return opts;
  const q = query.toLowerCase();
  const walk = list => list.flatMap(o => {
    const selfMatch = String(getItemLabel(o) ?? '').toLowerCase().includes(q);
    if (hasChildren(o)) {
      const kids = walk(o.children);
      if (selfMatch || kids.length) return [{ ...o, children: selfMatch ? o.children : kids }];
      return [];
    }
    return selfMatch ? [o] : [];
  });
  return walk(opts);
}

// ─── Dropdown — one canonical OptionList (flat options or grouped sections) ───

// Convert a filtered option tree into OptionList shape. Flat lists pass
// straight through as `options`; one level of branches (e.g. Region → Facility)
// becomes OptionList `sections`. This keeps EVERY dropdown menu — single,
// multi, flat, or grouped — rendered by the one canonical OptionList component.
function toOptionListProps(filtered) {
  if (filtered.every((o) => !hasChildren(o))) return { options: filtered };
  const sections = [];
  let loose = [];
  const flushLoose = () => { if (loose.length) { sections.push({ options: loose }); loose = []; } };
  for (const o of filtered) {
    // A branch → a section carrying the branch `id`, which lets OptionList
    // render a selectable header (Region "select all Facilities") in multi mode.
    if (hasChildren(o)) { flushLoose(); sections.push({ id: oid(o), title: getItemLabel(o), options: o.children }); }
    else loose.push(o);
  }
  flushLoose();
  return { sections };
}

function Dropdown({ options, query, multiple, selected, onSelectSingle, onReplaceMulti }) {
  const filtered = filterTree(options, query);
  return (
    <div style={{
      position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999,
      marginTop: 4, background: '#fff',
      border: '1px solid #e0e0e0', borderRadius: 8,
      boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
      overflow: 'hidden',
    }}>
      <div style={{ maxHeight: 280, overflowY: 'auto', padding: 4 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '12px 14px', fontSize: 13, color: '#9e9e9e',
            fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
            No results for "{query}"
          </div>
        ) : (
          <OptionList
            flush
            dense
            allowMultiple={multiple}
            {...toOptionListProps(filtered)}
            selected={multiple ? Array.from(selected) : (Array.from(selected)[0] ?? null)}
            ariaLabel="Options"
            // Single → one id; multi → the full next array (OptionList already
            // handles leaf + branch "select all", so pass it straight through).
            onChange={(next) => { multiple ? onReplaceMulti(next) : onSelectSingle(next); }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Shared field-level styles (mirrors TextInput) ────────────────────────────

function getFieldStyles({ focused, hovered, open, disabled, error }) {
  if (disabled) {
    return { border: 'none', bg: 'rgba(0,0,0,0.08)', textColor: '#b5b5b5', focusShadow: 'none' };
  }
  if (error) {
    return { border: '0.66px solid #8e1f0b', bg: '#fee9e8', textColor: '#303030', focusShadow: 'none' };
  }
  if (focused || open) {
    return { border: '0.66px solid #616161', bg: '#fafafa', textColor: '#303030', focusShadow: '0 0 0 2px #005bd3' };
  }
  if (hovered) {
    return { border: '0.66px solid #616161', bg: '#fafafa', textColor: '#303030', focusShadow: 'none' };
  }
  return { border: '0.66px solid #8a8a8a', bg: '#fdfdfd', textColor: '#303030', focusShadow: 'none' };
}

// ─── SearchSelect — Single ────────────────────────────────────────────────────

export function SearchSelect({ label, required, placeholder = 'Select…', options = [], value, onChange, disabled, error }) {
  const [open,    setOpen]    = useState(false);
  const [query,   setQuery]   = useState('');
  const [hovered, setHovered] = useState(false);
  const wrapRef  = useRef(null);
  const inputRef = useRef(null);

  const selectedSet   = useMemo(() => new Set(value ? [value] : []), [value]);
  const selectedLabel = value ? (getItemLabel(findOption(options, value)) || '') : '';

  const { border, bg, textColor, focusShadow } = getFieldStyles({ focused: open, hovered, open, disabled, error });

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const close = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) { setOpen(false); setQuery(''); } };
    const esc   = e => { if (e.key === 'Escape') { setOpen(false); setQuery(''); } };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, [open]);

  const handleOpen = () => { if (!disabled) { setOpen(true); setQuery(''); } };

  const handleSelectSingle = (id) => {
    // Single select: OptionList only emits leaf ids (branch headers are plain).
    if (id == null) return;
    onChange && onChange(id);
    setOpen(false);
    setQuery('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange && onChange('');
    setOpen(false);
    setQuery('');
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Inter, sans-serif' }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 500, color: disabled ? '#b5b5b5' : '#303030', fontFamily: 'Inter, sans-serif' }}>
          {label}{required && <span style={{ color: '#d92d20', marginLeft: 2 }}>*</span>}
        </label>
      )}

      <div ref={wrapRef} style={{ position: 'relative' }}>
        <div
          onMouseEnter={() => !disabled && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 8,
            border, background: bg,
            cursor: disabled ? 'not-allowed' : 'text',
            boxShadow: focusShadow,
            transition: 'border-color 0.12s, background 0.12s, box-shadow 0.12s',
          }}
        >
          {open ? (
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={selectedLabel || placeholder}
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 13, fontFamily: 'Inter, sans-serif', color: textColor,
                fontWeight: 450, lineHeight: '20px', cursor: 'text', minWidth: 0,
              }}
            />
          ) : (
            <span
              onClick={handleOpen}
              style={{
                flex: 1, fontSize: 13, fontWeight: 450, lineHeight: '20px',
                color: selectedLabel ? textColor : '#9e9e9e',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                cursor: disabled ? 'not-allowed' : 'pointer', userSelect: 'none',
              }}
            >
              {selectedLabel || placeholder}
            </span>
          )}

          {selectedLabel && !disabled && !open && (
            <button type="button" onClick={handleClear} aria-label="Clear selection"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                display: 'flex', alignItems: 'center', flexShrink: 0,
                fontFamily: 'Inter, sans-serif' }}>
              <IcoX size={11} color="#9e9e9e" />
            </button>
          )}
          <span onClick={handleOpen} style={{ cursor: disabled ? 'not-allowed' : 'pointer', display: 'flex' }}>
            <IcoChevron open={open} />
          </span>
        </div>

        {open && (
          <Dropdown
            options={options}
            query={query}
            multiple={false}
            selected={selectedSet}
            onSelectSingle={handleSelectSingle}
          />
        )}
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
          <IcoErrorCircle />
          <span style={{ fontSize: 13, color: '#d92d20', fontFamily: 'Inter, sans-serif', lineHeight: '20px' }}>{error}</span>
        </div>
      )}
    </div>
  );
}

// ─── SearchSelectMulti ────────────────────────────────────────────────────────

export function SearchSelectMulti({
  label, required, placeholder = 'Select…',
  options = [], value = [], onChange,
  disabled, error, maxTags,
  tagsInside = false, // when true → render tags inside the field with overflow logic
}) {
  const [open,    setOpen]    = useState(false);
  const [query,   setQuery]   = useState('');
  const [hovered, setHovered] = useState(false);
  const wrapRef  = useRef(null);
  const inputRef = useRef(null);

  const selected     = value || [];
  const selectedSet  = useMemo(() => new Set(selected), [selected]);
  const allLeaves    = useMemo(() => flattenLeaves(options), [options]);

  const { border, bg, textColor, focusShadow } = getFieldStyles({ focused: open, hovered, open, disabled, error });

  useEffect(() => {
    if (!open) { setQuery(''); return; }
    inputRef.current?.focus();
    const close = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const esc   = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, [open]);

  // OptionList emits the full next selection (leaf + branch "select all"
  // already resolved); we only enforce maxTags before handing it up.
  const handleReplace = (next) => {
    if (!onChange) return;
    onChange(maxTags && next.length > maxTags ? next.slice(0, maxTags) : next);
  };

  const handleClearAll = (e) => { e.stopPropagation(); onChange && onChange([]); };
  const handleOpen    = () => { if (!disabled) setOpen(true); };

  const removeOne = (val) => onChange && onChange(selected.filter(v => v !== val));

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Inter, sans-serif' }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 500, color: disabled ? '#b5b5b5' : '#303030', fontFamily: 'Inter, sans-serif' }}>
          {label}{required && <span style={{ color: '#d92d20', marginLeft: 2 }}>*</span>}
        </label>
      )}

      <div ref={wrapRef} style={{ position: 'relative' }}>
        <div
          onMouseEnter={() => !disabled && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => !disabled && !open && handleOpen()}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: tagsInside && selected.length > 0 && !open ? '5px 12px' : '6px 12px',
            minHeight: 36,
            borderRadius: 8,
            border, background: bg,
            cursor: disabled ? 'not-allowed' : 'text',
            boxShadow: focusShadow,
            transition: 'border-color 0.12s, background 0.12s, box-shadow 0.12s',
            overflow: 'hidden',
          }}
        >
          {open ? (
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={selected.length > 0 ? `${selected.length} selected` : placeholder}
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 13, fontFamily: 'Inter, sans-serif', color: textColor,
                fontWeight: 450, lineHeight: '20px', cursor: 'text', minWidth: 0,
              }}
            />
          ) : tagsInside && selected.length > 0 ? (
            <InlineTagSummary
              selected={selected}
              allLeaves={allLeaves}
              disabled={disabled}
              onRemove={removeOne}
            />
          ) : (
            <span
              style={{
                flex: 1, fontSize: 13, fontWeight: 450, lineHeight: '20px',
                color: selected.length > 0 ? '#303030' : '#9e9e9e',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                cursor: disabled ? 'not-allowed' : 'pointer', userSelect: 'none',
              }}
            >
              {selected.length > 0 ? `${selected.length} selected` : placeholder}
            </span>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, marginLeft: 'auto' }}>
            {selected.length > 0 && !disabled && !open && (
              <button type="button" onClick={handleClearAll} aria-label="Clear all selections"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center', fontFamily: 'Inter, sans-serif' }}>
                <IcoX size={11} color="#9e9e9e" />
              </button>
            )}
            <span onClick={handleOpen} style={{ cursor: disabled ? 'not-allowed' : 'pointer', display: 'flex' }}>
              <IcoChevron open={open} />
            </span>
          </div>
        </div>

        {open && (
          <Dropdown
            options={options}
            query={query}
            multiple={true}
            selected={selectedSet}
            onReplaceMulti={handleReplace}
          />
        )}
      </div>

      {/* Default: tags rendered below the field — when tagsInside is false */}
      {!tagsInside && selected.length > 0 && (
        <div style={{ paddingTop: 2 }}>
          <TagGroup gap={6}>
            {selected.map(val => {
              const opt = findOption(options, val);
              return opt ? (
                <Tag key={val} label={getItemLabel(opt)} disabled={disabled} removable
                  onRemove={() => removeOne(val)} />
              ) : null;
            })}
          </TagGroup>
        </div>
      )}

      {error && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
          <IcoErrorCircle />
          <span style={{ fontSize: 13, color: '#d92d20', fontFamily: 'Inter, sans-serif', lineHeight: '20px' }}>{error}</span>
        </div>
      )}
    </div>
  );
}

// ─── Inline tag summary (used when tagsInside is true) ────────────────────────
// Layout rule: the first chip takes at most 50% of the row's width. If its label
// is longer than that, the label inside the chip ellipsises (the chip itself
// stays one line, never wraps). Every remaining selection collapses into a
// single "+N others" chip. Nothing ever escapes the field.
function InlineTagSummary({ selected, allLeaves, disabled, onRemove }) {
  const labelOf  = v => { const o = allLeaves.find(o => oid(o) === v); return o ? getItemLabel(o) : v; };
  const firstVal = selected[0];
  const firstLab = labelOf(firstVal);
  const extra    = selected.length - 1;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      flex: 1, minWidth: 0,
    }}>
      {/* First chip — sits at its natural width, capped at 50% of the row.
          Only truncates when the label would push past that cap. */}
      <div style={{ display: 'flex', minWidth: 0, maxWidth: '50%' }}>
        <Tag
          label={firstLab}
          truncate
          removable={!disabled}
          disabled={disabled}
          onRemove={() => onRemove(firstVal)}
        />
      </div>
      {/* Overflow chip — never shrinks, never wraps */}
      {extra > 0 && (
        <Tag
          label={`+ ${extra} ${extra === 1 ? 'other' : 'others'}`}
          disabled={disabled}
        />
      )}
    </div>
  );
}

// ─── SearchSelectButton ──────────────────────────────────────────────────────
// Same dropdown + search + tree behaviour as SearchSelect, but the *trigger*
// is a `Btn`-style button. The button's label summarises the selection:
//   • 0 selected   → placeholder text
//   • 1 selected   → that option's label
//   • N selected   → "First +N Others"   (multi only)
//
// Use this when the selector lives inline in a toolbar / filter bar / row of
// buttons rather than in a vertical form. Single and multi are the same
// component — pass `multiple` to switch.

export function SearchSelectButton({
  label,                       // accessible name for the trigger button
  placeholder = 'Select…',
  options = [],
  value,                       // string (single) or string[] (multi)
  onChange,
  multiple = false,
  disabled = false,
  size = 'medium',             // 'small' | 'medium' | 'large' — matches Btn sizing
  maxTags,
  dropdownWidth = 320,
  // Optional leading glyph rendered before the label inside the trigger.
  // Pass any React node — typically a 16-px PolarisIconImg or inline SVG.
  // Used by region / location pickers ("📍 Choose Region"), filter triggers
  // ("⛃ Status"), etc. When omitted, the button renders label-only as
  // before, so this is a non-breaking addition.
  leadingIcon,
}) {
  const [open,  setOpen]  = useState(false);
  const [query, setQuery] = useState('');
  const [align, setAlign] = useState('left'); // 'left' | 'right' — auto-set from trigger position
  const wrapRef    = useRef(null);
  const popoverRef = useRef(null);
  // On mobile the picker opens a full BottomSheet (more room for the search +
  // tree) instead of a cramped anchored popover.
  const isMobile = useIsMobile();

  const selected    = multiple ? (value || []) : (value ? [value] : []);
  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const allLeaves   = useMemo(() => flattenLeaves(options), [options]);

  useEffect(() => {
    if (!open) { setQuery(''); return; }
    // On mobile the BottomSheet owns focus + dismissal (backdrop / Escape /
    // swipe), so skip the popover's anchoring + outside-click wiring.
    if (isMobile) return;
    // Decide which edge the popover anchors to. If the trigger's center sits
    // in the right half of the viewport, anchor right so the dropdown opens
    // leftward and doesn't get clipped off-screen. Otherwise anchor left.
    const rect = wrapRef.current?.getBoundingClientRect();
    if (rect) {
      const triggerCenter = rect.left + rect.width / 2;
      setAlign(triggerCenter > window.innerWidth / 2 ? 'right' : 'left');
    }
    // Move focus to the search input inside the popover. TextInput doesn't
    // expose a ref, so we reach in through the popover wrapper.
    const focusInput = () => popoverRef.current?.querySelector('input')?.focus();
    // Defer one frame so the popover has actually mounted.
    const id = window.requestAnimationFrame(focusInput);
    const close = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const esc   = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      window.cancelAnimationFrame(id);
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [open, isMobile]);

  const handleSelectSingle = (id) => {
    if (id == null) return;
    onChange && onChange(id);
    setOpen(false);
  };
  // OptionList already resolves leaf + branch "select all"; just enforce maxTags.
  const handleReplace = (next) => {
    if (!onChange) return;
    onChange(maxTags && next.length > maxTags ? next.slice(0, maxTags) : next);
  };

  // ── Trigger label parts ──────────────────────────────────────────────────
  // The first label and the "+N Others" suffix are rendered as two separate
  // inline-flex children so that the cap (maxWidth) applies *only* to the
  // first label. Same logic family as the tagsInside InlineTagSummary —
  // a cap, not a basis, so short labels stay at natural width and only long
  // labels get ellipsised. The overflow suffix never shrinks.
  const firstLabel = selected.length
    ? (getItemLabel(allLeaves.find(o => oid(o) === selected[0])) || selected[0])
    : '';
  const extra = selected.length - 1;
  const isPlaceholder = selected.length === 0;
  const overflowSuffix = extra > 0 ? `+${extra} ${extra === 1 ? 'Other' : 'Others'}` : '';

  return (
    <div ref={wrapRef} style={{
      position: 'relative', display: 'inline-block',
      maxWidth: '100%', fontFamily: 'Inter, sans-serif',
    }}>
      {/* Trigger — uses the design-system Btn (variant="secondary" + disclosure
          chevron). Sizing maps directly onto Btn's three sizes (small / medium
          / large). ARIA lives directly on the rendered <button> via Btn's
          aria-* passthrough — no wrapping element with a competing role, so
          axe's "nested-interactive" rule stays clean. */}
        <Btn
          variant="secondary"
          // On mobile the trigger takes the large (44→40px touch) size so it
          // lines up with the other stacked page-header actions; on desktop it
          // honours the passed `size` (default medium).
          small={!isMobile && size === 'small'}
          size={isMobile ? 'large' : (size === 'large' ? 'large' : 'medium')}
          disclosure
          // `Btn`'s `icon` slot renders a 16-px wrapper before the label;
          // passing the leadingIcon through here keeps the icon, label,
          // overflow suffix, and chevron all on the same baseline without
          // adding any inline-flex wrappers inside `children`.
          icon={leadingIcon}
          disabled={disabled}
          onClick={() => !disabled && setOpen(o => !o)}
          ariaLabel={label}
          ariaHaspopup="listbox"
          ariaExpanded={open}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'baseline', gap: 4,
            minWidth: 0, maxWidth: 168, /* overall trigger label cap (240 × 0.7) */
            verticalAlign: 'bottom',
          }}>
            {/* First label — ellipsises when long. Cap (maxWidth), not a
                basis, so short labels stay at natural width. */}
            <span style={{
              minWidth: 0, maxWidth: '100%',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              color: isPlaceholder ? '#616161' : (disabled ? '#b5b5b5' : '#303030'),
              fontWeight: isPlaceholder ? 450 : 550,
            }}>
              {isPlaceholder ? placeholder : firstLabel}
            </span>
            {/* Overflow suffix — always visible, never shrinks */}
            {overflowSuffix && (
              <span style={{
                flexShrink: 0, whiteSpace: 'nowrap',
                color: disabled ? '#b5b5b5' : '#303030',
                fontWeight: 550,
              }}>
                {overflowSuffix}
              </span>
            )}
          </span>
        </Btn>

      {/* Shared content — search field + option tree. Rendered in an anchored
          popover on desktop and a BottomSheet on mobile. */}
      {open && (() => {
        const list = (
          <>
            <div style={{ padding: isMobile ? '0 0 8px' : 12 }}>
              <TextInput
                placeholder="Search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                clearButton
                ariaLabel="Search options"
              />
            </div>
            <div style={{ maxHeight: isMobile ? '60vh' : 320, overflowY: 'auto', padding: isMobile ? 0 : '0 6px 6px' }}>
              {(() => {
                const filtered = filterTree(options, query);
                if (filtered.length === 0) {
                  return (
                    <div style={{
                      padding: '12px 14px', fontSize: 13, color: '#9e9e9e',
                      fontFamily: 'Inter, sans-serif', textAlign: 'center',
                    }}>
                      No results for "{query}"
                    </div>
                  );
                }
                return (
                  <OptionList
                    flush
                    dense
                    allowMultiple={multiple}
                    {...toOptionListProps(filtered)}
                    selected={multiple ? Array.from(selectedSet) : (Array.from(selectedSet)[0] ?? null)}
                    ariaLabel={typeof label === 'string' ? label : 'Options'}
                    // Single → one id; multi → full next array (OptionList
                    // resolves leaf + branch "select all").
                    onChange={(next) => { multiple ? handleReplace(next) : handleSelectSingle(next); }}
                  />
                );
              })()}
            </div>
          </>
        );

        // Mobile: full BottomSheet (manages focus/scrim/escape/swipe).
        if (isMobile) {
          return (
            <BottomSheet open onClose={() => setOpen(false)} title={label} showCloseButton>
              {list}
            </BottomSheet>
          );
        }

        // Desktop: anchored popover.
        return (
          <div ref={popoverRef} style={{
            position: 'absolute', top: '100%',
            left: align === 'left' ? 0 : 'auto',
            right: align === 'right' ? 0 : 'auto',
            zIndex: 999,
            marginTop: 6,
            width: dropdownWidth, maxWidth: '90vw',
            background: '#fff',
            border: '1px solid #e0e0e0', borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          }}>
            {list}
          </div>
        );
      })()}
    </div>
  );
}
