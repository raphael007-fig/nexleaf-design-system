import { useState, useRef, useEffect } from 'react';
import { OptionList } from '../OptionList/OptionList.jsx';
import { Skeleton } from '../Skeleton/Skeleton.jsx';

// Chevron separator between crumbs
const Chevron = ({ size = 16, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M6 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Truncate a label to `max` characters with a trailing "…" so long
// crumb names don't blow out the toolbar width. Returns both the
// visible string and the full string (for the `title` tooltip).
function truncateLabel(label, max) {
  if (!max || typeof label !== 'string' || label.length <= max) {
    return { visible: label, full: label, truncated: false };
  }
  return { visible: label.slice(0, max - 1).trimEnd() + '…', full: label, truncated: true };
}

// ── Single crumb (pill for current, plain interactive for previous) ───────
//
// `icon` and `iconOnly` are opt-in per-item. When `iconOnly` is true the
// label collapses; the original label string is moved to `aria-label` and
// `title` so the crumb still has an accessible name and a hover tooltip.
function Crumb({ label, icon, iconOnly, isCurrent, onClick, disabled, maxLabelChars }) {
  const showIconOnly = !!icon && !!iconOnly;
  const { visible, full, truncated } = truncateLabel(label, maxLabelChars);
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const [act, setAct] = useState(false);

  const interactive = !disabled && !!onClick && !isCurrent;

  // Background: current = constant grey pill. Previous = transparent, grey on hover.
  let bg = 'transparent';
  if (disabled)        bg = 'transparent';
  else if (isCurrent)  bg = '#ebebeb';
  else if (act)        bg = '#d2d2d2';
  else if (hov)        bg = '#ebebeb';

  const color = disabled ? '#b5b5b5' : '#303030';

  // Icon-only crumbs collapse to a 28×28 square pill (padding 4 all sides
  // around a 20 px icon). Text crumbs keep their original 4×10 pill.
  const padding = showIconOnly ? '4px' : '4px 10px';
  // The label is always the accessible name for icon-only mode; for label
  // mode it only becomes an aria-label when truncated (otherwise the visible
  // text is the accessible name).
  const accessibleName = showIconOnly ? label : (truncated ? full : undefined);
  const tooltip        = showIconOnly ? label : (truncated ? full : undefined);

  // Composes icon + label so the same JSX path renders both modes. When
  // `iconOnly` is set we skip the text span entirely.
  const innerContent = (
    <>
      {icon && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 20, height: 20,
            marginRight: showIconOnly ? 0 : 6,
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
      )}
      {!showIconOnly && <span>{visible}</span>}
    </>
  );

  if (isCurrent) {
    return (
      <span
        aria-current="page"
        aria-label={accessibleName}
        title={tooltip}
        style={{
          display: 'inline-flex', alignItems: 'center',
          padding, background: bg, color,
          fontFamily: 'Inter, sans-serif',
          fontSize: 14, fontWeight: 550, lineHeight: '20px',
          borderRadius: 8, whiteSpace: 'nowrap',
        }}
      >
        {innerContent}
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled || !onClick}
      aria-label={accessibleName}
      title={tooltip}
      onClick={interactive ? onClick : undefined}
      onMouseEnter={() => interactive && setHov(true)}
      onMouseLeave={() => { setHov(false); setAct(false); }}
      onMouseDown={() => interactive && setAct(true)}
      onMouseUp={() => setAct(false)}
      onFocus={() => interactive && setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding, background: bg, color,
        fontFamily: 'Inter, sans-serif',
        fontSize: 14, fontWeight: 450, lineHeight: '20px',
        border: 'none', borderRadius: 8,
        cursor: interactive ? 'pointer' : (disabled ? 'not-allowed' : 'default'),
        outline: 'none',
        boxShadow: foc ? '0 0 0 2px #005bd3' : 'none',
        transition: 'background 0.1s, box-shadow 0.12s',
        whiteSpace: 'nowrap',
      }}
    >
      {innerContent}
    </button>
  );
}

// ── "..." crumb with hover/click popover showing hidden middle items ──────
function EllipsisCrumb({ hiddenItems, startIndex, onNavigate, disabled }) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const closeTimer = useRef(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    function onDocDown(e) {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    }
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('mousedown', onDocDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Hover open with tiny delay tolerance so user can move into popover
  function openOnHover() {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    if (!disabled) { setHov(true); setOpen(true); }
  }
  function scheduleClose() {
    setHov(false);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }
  function cancelClose() {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }

  const bg = !disabled && (hov || open) ? '#ebebeb' : 'transparent';
  const color = disabled ? '#b5b5b5' : '#303030';

  return (
    <span
      ref={wrapRef}
      onMouseEnter={openOnHover}
      onMouseLeave={scheduleClose}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
    >
      <button
        type="button"
        disabled={disabled}
        aria-label={`Show ${hiddenItems.length} hidden breadcrumb ${hiddenItems.length === 1 ? 'item' : 'items'}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => !disabled && setOpen(o => !o)}
        onFocus={() => { setFoc(true); if (!disabled) setOpen(true); }}
        onBlur={() => setFoc(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          padding: '4px 10px',
          background: bg, color,
          border: 'none', borderRadius: 8,
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontSize: 14, fontWeight: 550, lineHeight: '20px',
          letterSpacing: '0.05em',
          outline: 'none',
          boxShadow: foc ? '0 0 0 2px #005bd3' : 'none',
          transition: 'background 0.1s, box-shadow 0.12s',
          whiteSpace: 'nowrap',
        }}
      >
        …
      </button>
      {open && hiddenItems.length > 0 && (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          style={{
            position: 'absolute', top: '100%', left: 0,
            marginTop: 6,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            zIndex: 1000,
          }}
        >
          <OptionList
            options={hiddenItems.map((it, i) => ({
              value: startIndex + i,
              label: it.label,
            }))}
            onChange={(val) => { setOpen(false); onNavigate(val); }}
          />
        </div>
      )}
    </span>
  );
}

// ── Loading skeleton ─────────────────────────────────────────────────────
// Renders 3 placeholder pills separated by skeleton chevrons. Skips the
// overflow-popover logic entirely; the consumer just toggles `loading`
// while data is being fetched.
function BreadcrumbsSkeleton() {
  const PILL_H = 20; // matches lineHeight: '20px' for crumb text
  const widths = [44, 132, 96];
  return (
    <nav aria-label="Breadcrumb" style={{ fontFamily: 'Inter, sans-serif', minWidth: 0 }}>
      <ol style={{
        display: 'flex', alignItems: 'center', flexWrap: 'nowrap',
        gap: 4, listStyle: 'none', margin: 0, padding: 0,
        whiteSpace: 'nowrap',
      }}>
        {widths.map((w, i) => (
          <li key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '4px 10px', borderRadius: 8,
            }}>
              <Skeleton width={w} height={PILL_H - 6} radius={4} delay={i * 0.08} />
            </span>
            {i < widths.length - 1 && (
              <Skeleton width={6} height={10} radius={2} delay={i * 0.08 + 0.04} />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ── Breadcrumbs ──────────────────────────────────────────────────────────
//
// Each item is:
//   {
//     label:    string                — required, used as text and as the
//                                       accessible name when icon-only
//     id?:      string|number         — preferred id for `onSelect`
//     key?:     string|number         — legacy id fallback
//     icon?:    ReactNode             — optional leading icon (20×20)
//     iconOnly?: boolean              — when true with `icon`, the label
//                                       collapses; the crumb becomes a
//                                       28×28 square pill. The label stays
//                                       on as aria-label + title tooltip.
//   }
//
// Two navigation callbacks are supported, both fire on click:
//   • onSelect(id, item)       — preferred, system-standard API.
//                                 id = item.id ?? item.key ?? String(index).
//   • onNavigate(index, item)  — legacy. Still supported for back-compat.
//
// Collapse rule: collapseAfter is the threshold. When items.length is
// greater than collapseAfter (default 3), the trail renders as
// first + second + "…" + last (four visible elements). Everything
// between items[1] and items[lastIndex] is hidden inside the "…"
// popover. The consumer owns the trail array; this component has no
// internal history.
//
// `loading` (boolean) renders a skeleton placeholder and skips the
// overflow-popover logic entirely.
//
export function Breadcrumbs({
  items = [],
  onNavigate,
  onSelect,
  collapseAfter = 3,
  disabled = false,
  maxLabelChars = 16,
  loading = false,
}) {
  if (loading) return <BreadcrumbsSkeleton />;
  if (!items.length) return null;

  const lastIndex = items.length - 1;
  const shouldCollapse = items.length > collapseAfter;

  // Build the visible node list. When collapsed, always render
  // first + second + "…" + last (4 visible elements). The popover
  // holds every crumb between items[1] and items[lastIndex].
  let nodes;
  if (!shouldCollapse) {
    nodes = items.map((item, i) => ({ kind: 'item', item, index: i }));
  } else {
    nodes = [
      { kind: 'item', item: items[0], index: 0 },
      { kind: 'item', item: items[1], index: 1 },
      { kind: 'ellipsis', hidden: items.slice(2, lastIndex), startIndex: 2 },
      { kind: 'item', item: items[lastIndex], index: lastIndex },
    ];
  }

  function handleNav(i) {
    if (disabled) return;
    const item = items[i];
    if (onNavigate) onNavigate(i, item);
    if (onSelect) {
      const id = item && item.id != null
        ? item.id
        : (item && item.key != null ? item.key : String(i));
      onSelect(id, item);
    }
  }

  return (
    <nav aria-label="Breadcrumb" style={{ fontFamily: 'Inter, sans-serif', minWidth: 0 }}>
      <ol style={{
        display: 'flex', alignItems: 'center', flexWrap: 'nowrap',
        gap: 4, listStyle: 'none', margin: 0, padding: 0,
        whiteSpace: 'nowrap',
      }}>
        {nodes.map((node, idx) => {
          const isLastNode = idx === nodes.length - 1;
          return (
            <li key={node.kind === 'item' ? `i-${node.index}` : `e-${idx}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {node.kind === 'item' ? (
                <Crumb
                  label={node.item.label}
                  icon={node.item.icon}
                  iconOnly={node.item.iconOnly}
                  isCurrent={node.index === lastIndex}
                  onClick={node.index === lastIndex ? undefined : () => handleNav(node.index)}
                  disabled={disabled}
                  maxLabelChars={maxLabelChars}
                />
              ) : (
                <EllipsisCrumb
                  hiddenItems={node.hidden}
                  startIndex={node.startIndex}
                  onNavigate={handleNav}
                  disabled={disabled}
                />
              )}
              {!isLastNode && <Chevron />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
