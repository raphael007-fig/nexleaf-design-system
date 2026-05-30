import { useState, useRef, useEffect, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { Tabs } from '../Tabs/Tabs.jsx';
import { TextInput } from '../TextInput/TextInput.jsx';
import { Btn } from '../Btn/Btn.jsx';
import { OptionList } from '../OptionList/OptionList.jsx';
import { Skeleton } from '../Skeleton/Skeleton.jsx';

// ─── Mobile breakpoint hook ───────────────────────────────────────────────────
//
// Returns true when the viewport is at or below `breakpoint`. SSR-safe (defaults
// to false when `window` is undefined). Used by `IndexTable` to switch between
// the desktop <table> layout and the stacked-card mobile layout.

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  );
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else mq.addListener(handler); // older Safari
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else mq.removeListener(handler);
    };
  }, [breakpoint]);
  return isMobile;
}

// Clamps a popover anchored to `rect` so it stays inside the viewport.
// Returns `{ top, left }` in fixed-position coordinates.
function viewportSafePos(rect, { minWidth = 200, estHeight = 240, gap = 6 } = {}) {
  if (typeof window === 'undefined') return { top: rect.bottom + gap, left: rect.left };
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const left = Math.max(8, Math.min(rect.left, vw - minWidth - 8));
  const wouldClipBottom = rect.bottom + estHeight + gap > vh;
  const top = wouldClipBottom
    ? Math.max(8, rect.top - estHeight - gap)
    : rect.bottom + gap;
  return { top, left };
}

// ─── Toolbar Icons ────────────────────────────────────────────────────────────

const IcoSearch = ({ size = 16, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
    <path fillRule="evenodd" d="M12.323 13.383a5.5 5.5 0 1 1 1.06-1.06l2.897 2.897a.75.75 0 1 1-1.06 1.06l-2.897-2.897Zm.677-4.383a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
  </svg>
);

const IcoFilter = ({ size = 16, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
    <path d="M3 6a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5h-12.5a.75.75 0 0 1-.75-.75Z" />
    <path d="M6.75 14a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z" />
    <path d="M5.5 9.25a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z" />
  </svg>
);

const IcoAdjust = ({ size = 16, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
    <path fillRule="evenodd" d="M9.095 6.25a3.001 3.001 0 0 1 5.81 0h1.345a.75.75 0 0 1 0 1.5h-1.345a3.001 3.001 0 0 1-5.81 0h-5.345a.75.75 0 0 1 0-1.5h5.345Zm1.405.75a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
    <path fillRule="evenodd" d="M8 16a3.001 3.001 0 0 0 2.905-2.25h5.345a.75.75 0 0 0 0-1.5h-5.345a3.001 3.001 0 0 0-5.81 0h-1.345a.75.75 0 0 0 0 1.5h1.345a3.001 3.001 0 0 0 2.905 2.25Zm1.5-3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
  </svg>
);

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

const IcoChevronUp = ({ size = 12, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 7.5L6 4L9.5 7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoChevronDown = ({ size = 12, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoSort = ({ size = 12, color = '#9e9e9e' }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 4.5L6 1.5L9.5 4.5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 7.5L6 10.5L9.5 7.5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoMoreVertical = ({ size = 16, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} aria-hidden="true">
    <circle cx="8" cy="3.5"  r="1.3" />
    <circle cx="8" cy="8"    r="1.3" />
    <circle cx="8" cy="12.5" r="1.3" />
  </svg>
);

// ─── LinkCell ─────────────────────────────────────────────────────────────────
//
// Renders one or more inline text links in a cell. When the list overflows
// `visible`, a "+N Others" link is rendered; hovering or focusing it opens a
// scrollable dropdown of the overflow items (each also a link).
//
// Items can use either `href` (renders an <a>) or `onClick` (renders a <button>
// styled like a link). Mixed usage in the same cell is supported.
//
// The dropdown is rendered via portal so the table's `overflow-x: auto`
// container does not clip it.
//
// Props:
//   items        — [{ label, href?, onClick? }]
//   visible      — number of items shown inline before overflow (default 1)
//   othersLabel  — label suffix used in the "+N <othersLabel>" trigger (default 'Others')
//   ariaLabel    — accessible name for the overflow trigger button

function LinkAnchor({ item, style }) {
  const [hov, setHov] = useState(false);
  const common = {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      color: hov ? '#004bb0' : '#005bd3',
      textDecoration: 'underline',
      fontFamily: 'Inter, sans-serif',
      fontSize: 13,
      fontWeight: 450,
      lineHeight: '20px',
      cursor: 'pointer',
      background: 'transparent',
      border: 'none',
      padding: 0,
      textAlign: 'left',
      ...style,
    },
  };
  if (item.href) {
    return <a href={item.href} {...common}>{item.label}</a>;
  }
  return (
    <button
      type="button"
      onClick={item.onClick}
      {...common}
    >
      {item.label}
    </button>
  );
}

export function LinkCell({ items = [], visible = 1, othersLabel = 'Others', ariaLabel }) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState(null);
  const [trigHov, setTrigHov] = useState(false);
  const trigRef = useRef(null);
  const popRef = useRef(null);
  const closeTimer = useRef(null);

  if (!items || items.length === 0) return null;

  const shown = items.slice(0, visible);
  const hidden = items.slice(visible);
  const hasOverflow = hidden.length > 0;

  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => clearTimeout(closeTimer.current);

  const openMenu = () => {
    if (trigRef.current) setRect(trigRef.current.getBoundingClientRect());
    setOpen(true);
  };

  // Close on Escape + outside click for keyboard / click users
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e) => {
      if (
        popRef.current && !popRef.current.contains(e.target) &&
        trigRef.current && !trigRef.current.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
      {shown.map((item, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <LinkAnchor item={item} />
          {i < shown.length - 1 && <span style={{ color: '#616161', marginRight: 2 }}>,</span>}
        </span>
      ))}

      {hasOverflow && (
        <>
          <button
            ref={trigRef}
            type="button"
            aria-haspopup="true"
            aria-expanded={open}
            aria-label={ariaLabel || `${hidden.length} more ${othersLabel.toLowerCase()}`}
            onMouseEnter={() => { setTrigHov(true); cancelClose(); openMenu(); }}
            onMouseLeave={() => { setTrigHov(false); scheduleClose(); }}
            onFocus={openMenu}
            onBlur={scheduleClose}
            onClick={() => open ? setOpen(false) : openMenu()}
            style={{
              color: trigHov || open ? '#004bb0' : '#005bd3',
              textDecoration: 'underline',
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: 450,
              lineHeight: '20px',
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              padding: 0,
              outline: 'none',
            }}
          >
            +{hidden.length} {othersLabel}
          </button>

          {open && rect && (() => {
            const minW = Math.max(rect.width + 40, 200);
            const pos = viewportSafePos(rect, { minWidth: minW, estHeight: 240, gap: 6 });
            return createPortal(
            <div
              ref={popRef}
              role="menu"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              style={{
                position: 'fixed',
                top: pos.top,
                left: pos.left,
                zIndex: 9999,
                minWidth: minW,
                maxWidth: 320,
                maxHeight: 240,
                overflowY: 'auto',
                background: '#ffffff',
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                padding: 4,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {hidden.map((item, i) => (
                <LinkMenuItem key={i} item={item} />
              ))}
            </div>,
            document.body
            );
          })()}
        </>
      )}
    </span>
  );
}

function LinkMenuItem({ item }) {
  const [hov, setHov] = useState(false);
  const common = {
    role: 'menuitem',
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      display: 'block',
      width: '100%',
      padding: '8px 12px',
      borderRadius: 6,
      color: hov ? '#004bb0' : '#005bd3',
      textDecoration: 'underline',
      fontFamily: 'Inter, sans-serif',
      fontSize: 13,
      fontWeight: 450,
      lineHeight: '20px',
      background: hov ? '#fafafa' : 'transparent',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      boxSizing: 'border-box',
    },
  };
  if (item.href) {
    return <a href={item.href} {...common}>{item.label}</a>;
  }
  return (
    <button type="button" onClick={item.onClick} {...common}>
      {item.label}
    </button>
  );
}

// ─── Row Actions Menu ─────────────────────────────────────────────────────────

function RowActionsMenu({ actions, row }) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState(null);
  const [hov,  setHov]  = useState(false);
  const btnRef  = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        btnRef.current  && !btnRef.current.contains(e.target)
      ) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown',   onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown',   onKey);
    };
  }, [open]);

  const toggle = () => {
    if (!open && btnRef.current) setRect(btnRef.current.getBoundingClientRect());
    setOpen(o => !o);
  };

  const resolved = typeof actions === 'function' ? actions(row) : actions;

  const normalActions      = resolved.filter(a => !a.destructive);
  const destructiveActions = resolved.filter(a =>  a.destructive);
  const toOptions = (arr) => arr.map((a) => ({
    value: String(resolved.indexOf(a)),
    label: a.destructive ? <span style={{ color: '#d92d20' }}>{a.label}</span> : a.label,
  }));
  const sections = [
    ...(normalActions.length      ? [{ options: toOptions(normalActions) }]      : []),
    ...(destructiveActions.length ? [{ options: toOptions(destructiveActions) }] : []),
  ];

  const handleChange = (value) => {
    const action = resolved[Number(value)];
    if (action?.onAction) action.onAction(row);
    setOpen(false);
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <button
        ref={btnRef}
        onClick={toggle}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        aria-label="More actions"
        style={{
          width: 28, height: 28, borderRadius: 6, border: 'none',
          background: open || hov ? 'rgba(0,0,0,0.06)' : 'transparent',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', padding: 0, flexShrink: 0,
          transition: 'background 0.12s', outline: 'none',
        }}
      >
        <IcoMoreVertical size={16} color="#303030" />
      </button>

      {open && rect && (() => {
        const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
        const estMenuH = 40 * resolved.length + 24;
        const flipUp = rect.bottom + estMenuH + 8 > vh;
        const top = flipUp
          ? Math.max(8, rect.top - estMenuH - 4)
          : rect.bottom + 4;
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1024;
        const right = Math.min(vw - 8, rect.right);
        return createPortal(
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top,
            left: right,
            transform: 'translateX(-100%)',
            zIndex: 9999,
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}
        >
          <OptionList sections={sections} onChange={handleChange} />
        </div>,
        document.body
        );
      })()}
    </div>
  );
}

// ─── Checkbox (supports indeterminate) ───────────────────────────────────────

function Checkbox({ checked, indeterminate, onChange, disabled, ariaLabel }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        width: 16,
        height: 16,
        cursor: disabled ? 'not-allowed' : 'pointer',
        flexShrink: 0,
        accentColor: '#005bd3',
      }}
    />
  );
}

// ─── BulkBar ──────────────────────────────────────────────────────────────────

function BulkBar({ count, bulkActions, onDeselectAll }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 12px',
      background: '#f0f7ff',
      borderBottom: '1px solid #e3e3e3',
      fontFamily: 'Inter, sans-serif',
    }}>
      <span style={{ fontSize: 13, fontWeight: 500, color: '#303030', lineHeight: '20px', marginRight: 4 }}>
        {count} selected
      </span>

      {bulkActions && bulkActions.length > 0 && (
        <div style={{ display: 'flex', gap: 6 }}>
          {bulkActions.map((action, i) => (
            <Btn key={i} variant="secondary" size="medium" onClick={action.onAction}>
              {action.label}
            </Btn>
          ))}
        </div>
      )}

      <div style={{ flex: 1 }} />

      <Btn variant="ghost" size="medium" onClick={onDeselectAll}>
        Deselect all
      </Btn>
    </div>
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRow({ colCount, includeCheckboxCell = true }) {
  return (
    <tr>
      {includeCheckboxCell && (
        <td style={{ padding: '12px 12px', borderBottom: '1px solid #ebebeb', width: 40 }}>
          <Skeleton width={16} height={16} radius={3} />
        </td>
      )}
      {Array.from({ length: colCount }).map((_, i) => (
        <td key={i} style={{ padding: '12px 8px', borderBottom: '1px solid #ebebeb' }}>
          <Skeleton.Line
            width={i === 0 ? '60%' : i === colCount - 1 ? '40%' : '75%'}
            delay={i * 0.07}
          />
        </td>
      ))}
    </tr>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ heading, description }) {
  return (
    <tr>
      <td colSpan={999} style={{ padding: '48px 24px', textAlign: 'center', borderBottom: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          {/* Illustration placeholder */}
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: '#f1f1f1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width={32} height={32} viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect x="4" y="8" width="24" height="18" rx="3" stroke="#b5b5b5" strokeWidth="1.5" />
              <path d="M4 13h24" stroke="#b5b5b5" strokeWidth="1.5" />
              <path d="M10 5v6M22 5v6" stroke="#b5b5b5" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="16" cy="21" r="3" stroke="#b5b5b5" strokeWidth="1.5" />
            </svg>
          </div>
          {heading && (
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              fontWeight: 600,
              color: '#303030',
              margin: 0,
              lineHeight: '24px',
            }}>
              {heading}
            </p>
          )}
          {description && (
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              color: '#616161',
              margin: 0,
              lineHeight: '20px',
              maxWidth: 320,
            }}>
              {description}
            </p>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── DataRow ──────────────────────────────────────────────────────────────────

function DataRow({ row, columns, isSelected, onToggle, hideCheckbox = false, rowActions }) {
  const [hovered, setHovered] = useState(false);

  const bg = isSelected
    ? '#f0f7ff'
    : hovered
      ? '#fafafa'
      : '#ffffff';

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: bg, transition: 'background 0.1s' }}
    >
      {/* Checkbox cell — hidden in bare/embedded mode */}
      {!hideCheckbox && (
        <td style={{ padding: '12px 12px', borderBottom: '1px solid #ebebeb', width: 40, verticalAlign: 'middle' }}>
          <Checkbox
            checked={isSelected}
            onChange={() => onToggle(row.id)}
            ariaLabel={`Select row ${row.id}`}
          />
        </td>
      )}

      {/* Data cells */}
      {columns.map((col) => {
        const align = col.align || 'left';
        const content = col.render ? col.render(row) : row[col.key];
        return (
          <td
            key={col.key}
            style={{
              padding: '12px 8px',
              borderBottom: '1px solid #ebebeb',
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: 450,
              color: '#303030',
              lineHeight: '20px',
              textAlign: align,
              verticalAlign: 'middle',
              whiteSpace: col.noWrap ? 'nowrap' : undefined,
              width: col.width || undefined,
            }}
          >
            {content}
          </td>
        );
      })}

      {/* Row actions (three-dot menu) */}
      {rowActions && (
        <td style={{
          padding: '4px 8px', borderBottom: '1px solid #ebebeb',
          width: 56, textAlign: 'center', verticalAlign: 'middle',
        }}>
          <RowActionsMenu actions={rowActions} row={row} />
        </td>
      )}
    </tr>
  );
}

// ─── SortIcon ─────────────────────────────────────────────────────────────────

function SortIcon({ colKey, sortKey, sortDir, hovered }) {
  const isActive = sortKey === colKey;
  if (isActive) {
    return sortDir === 'asc'
      ? <IcoChevronUp size={12} color="#303030" />
      : <IcoChevronDown size={12} color="#303030" />;
  }
  if (hovered) {
    return <IcoSort size={12} color="#9e9e9e" />;
  }
  return null;
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function IndexTableToolbar({
  tabs, activeTab, onTabChange,
  searchValue, onSearchChange, searchPlaceholder,
  toolbarActions,
  isMobile = false,
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'stretch' : 'center',
      justifyContent: 'space-between',
      padding: isMobile ? 8 : '6px 8px',
      borderBottom: '1px solid #e3e3e3',
      background: '#ffffff',
      minHeight: 44,
      gap: 8,
    }}>
      {/* Tabs (with horizontal scroll on mobile when many tabs) */}
      <div style={{
        flexShrink: 0,
        overflowX: isMobile ? 'auto' : undefined,
        WebkitOverflowScrolling: isMobile ? 'touch' : undefined,
      }}>
        {tabs && tabs.length > 0 && (
          <Tabs
            tabs={tabs}
            activeIndex={activeTab || 0}
            onChange={onTabChange}
          />
        )}
      </div>

      {/* Search + action buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        flexShrink: 0,
        flexWrap: isMobile ? 'wrap' : undefined,
      }}>
        {(onSearchChange !== undefined || searchValue !== undefined) && (
          <div style={{
            width: isMobile ? '100%' : 200,
            flex: isMobile ? '1 1 100%' : undefined,
          }}>
            <TextInput
              size="slim"
              placeholder={searchPlaceholder || 'Search…'}
              value={searchValue || ''}
              onChange={onSearchChange}
              prefix={<IcoSearch size={16} color="#616161" />}
              clearButton
              ariaLabel={searchPlaceholder || 'Search'}
            />
          </div>
        )}
        {toolbarActions && toolbarActions.map((action, i) => (
          <Btn
            key={i}
            variant="secondary"
            size="medium"
            icon={action.icon}
            onClick={action.onClick}
          >
            {action.label}
          </Btn>
        ))}
      </div>
    </div>
  );
}

// ─── Mobile: Sort menu ───────────────────────────────────────────────────────
//
// Replaces sortable column headers on mobile. Renders a "Sort ▾" trigger that
// opens a portal menu listing each sortable column × asc/desc. Clicking an
// option calls `onSort(key)`; if that key is already active it cycles dir.

function MobileSortMenu({ columns, sortKey, sortDir, onSort }) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState(null);
  const [hov,  setHov]  = useState(false);
  const btnRef  = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        btnRef.current  && !btnRef.current.contains(e.target)
      ) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown',   onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown',   onKey);
    };
  }, [open]);

  const toggle = () => {
    if (!open && btnRef.current) setRect(btnRef.current.getBoundingClientRect());
    setOpen(o => !o);
  };

  const activeLabel = (() => {
    const col = columns.find(c => c.key === sortKey);
    if (!col) return 'Sort';
    const labelText = typeof col.label === 'string' ? col.label : (col.mobileLabel || col.key);
    return `${labelText} ${sortDir === 'asc' ? '↑' : '↓'}`;
  })();

  const options = columns.map((col) => {
    const labelText = typeof col.label === 'string' ? col.label : (col.mobileLabel || col.key);
    const isActive = sortKey === col.key;
    return {
      value: col.key,
      label: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {labelText}
          {isActive && (
            <span style={{ color: '#616161', fontSize: 12 }}>
              {sortDir === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </span>
      ),
    };
  });

  const handleChange = (key) => {
    if (onSort) onSort(key);
    setOpen(false);
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        aria-haspopup="true"
        aria-expanded={open}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          height: 32,
          padding: '0 10px',
          borderRadius: 8,
          border: '1px solid #c9c9c9',
          background: open || hov ? '#fafafa' : '#ffffff',
          color: '#303030',
          fontFamily: 'Inter, sans-serif',
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        <IcoSort size={12} color="#616161" />
        <span>{activeLabel}</span>
        <IcoChevronDown size={12} color="#616161" />
      </button>

      {open && rect && (() => {
        const estMenuH = 40 * columns.length + 24;
        const pos = viewportSafePos(rect, { minWidth: 200, estHeight: estMenuH, gap: 4 });
        return createPortal(
          <div
            ref={menuRef}
            style={{
              position: 'fixed',
              top: pos.top,
              left: pos.left,
              zIndex: 9999,
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          >
            <OptionList sections={[{ options }]} onChange={handleChange} />
          </div>,
          document.body
        );
      })()}
    </div>
  );
}

// ─── Mobile: Header (Select all + Sort) ──────────────────────────────────────

function MobileHeader({
  bare, allSelected, someSelected, onSelectAll,
  sortableColumns, sortKey, sortDir, onSort,
  rowCount,
}) {
  const showSelect = !bare && rowCount > 0;
  const showSort = sortableColumns.length > 0 && onSort;
  if (!showSelect && !showSort) return null;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 12px',
      borderBottom: '1px solid #ebebeb',
      background: '#f7f7f7',
      gap: 8,
    }}>
      {showSelect ? (
        <label style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'Inter, sans-serif',
          fontSize: 13,
          fontWeight: 500,
          color: '#303030',
          cursor: 'pointer',
        }}>
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={onSelectAll}
            ariaLabel="Select all rows"
          />
          Select all
        </label>
      ) : <div />}
      {showSort && (
        <MobileSortMenu
          columns={sortableColumns}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={onSort}
        />
      )}
    </div>
  );
}

// ─── Mobile: Card row ────────────────────────────────────────────────────────
//
// Renders one row as a stacked card. Column resolution:
//   1. Drop any column with `col.hideOnMobile`
//   2. Title  = first column with `col.primary`, else the first visible column
//   3. Subtitle = first column with `col.subtitle` (≠ title), if any
//   4. Everything else becomes a label/value row in a 2-col grid
//
// `col.mobileLabel` overrides the label text (useful when `col.label` is JSX,
// e.g. an sr-only span).

function MobileCard({ row, columns, isSelected, onToggle, hideCheckbox, rowActions }) {
  const visible = columns.filter(c => !c.hideOnMobile);
  if (visible.length === 0) return null;
  const titleCol    = visible.find(c => c.primary)  || visible[0];
  const subtitleCol = visible.find(c => c.subtitle && c !== titleCol);
  const fieldCols   = visible.filter(c => c !== titleCol && c !== subtitleCol);

  const valueOf = (col) => (col.render ? col.render(row) : row[col.key]);
  const labelOf = (col) =>
    col.mobileLabel || (typeof col.label === 'string' ? col.label : '');

  return (
    <div style={{
      background: isSelected ? '#f0f7ff' : '#ffffff',
      border: `1px solid ${isSelected ? '#005bd3' : '#e0e0e0'}`,
      borderRadius: 12,
      padding: 16,
      transition: 'background 0.1s, border-color 0.1s',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {!hideCheckbox && (
          <div style={{ paddingTop: 2, flexShrink: 0 }}>
            <Checkbox
              checked={isSelected}
              onChange={() => onToggle(row.id)}
              ariaLabel={`Select row ${row.id}`}
            />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 600,
            color: '#303030',
            lineHeight: '20px',
            wordBreak: 'break-word',
          }}>
            {valueOf(titleCol)}
          </div>
          {subtitleCol && (
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: 450,
              color: '#616161',
              lineHeight: '18px',
              marginTop: 2,
              wordBreak: 'break-word',
            }}>
              {valueOf(subtitleCol)}
            </div>
          )}
        </div>
        {rowActions && (
          <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
            <RowActionsMenu actions={rowActions} row={row} />
          </div>
        )}
      </div>

      {fieldCols.length > 0 && (
        <>
          <div style={{ height: 1, background: '#ebebeb', margin: '12px 0' }} />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)',
            rowGap: 8,
            columnGap: 12,
            alignItems: 'start',
          }}>
            {fieldCols.map(col => (
              <Fragment key={col.key}>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#616161',
                  lineHeight: '20px',
                  minWidth: 0,
                }}>
                  {labelOf(col)}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 450,
                  color: '#303030',
                  lineHeight: '20px',
                  textAlign: 'right',
                  wordBreak: 'break-word',
                  minWidth: 0,
                }}>
                  {valueOf(col)}
                </div>
              </Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Mobile: Card list (replaces <tbody> on mobile) ──────────────────────────

function MobileCardList({
  rows, columns, selectedRows, onToggle, rowActions,
  hideCheckbox, loading, emptyState,
}) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 12,
    background: '#f1f1f1',
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: 12,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
            <Skeleton.Line width="50%" />
            <Skeleton.Line width="80%" delay={0.07} />
            <Skeleton.Line width="65%" delay={0.14} />
            <Skeleton.Line width="40%" delay={0.21} />
          </div>
        ))}
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <div style={{ padding: 16, background: '#f1f1f1' }}>
        <div style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: 12,
          padding: '32px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          textAlign: 'center',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: '#f1f1f1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width={32} height={32} viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect x="4" y="8" width="24" height="18" rx="3" stroke="#b5b5b5" strokeWidth="1.5" />
              <path d="M4 13h24" stroke="#b5b5b5" strokeWidth="1.5" />
              <path d="M10 5v6M22 5v6" stroke="#b5b5b5" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="16" cy="21" r="3" stroke="#b5b5b5" strokeWidth="1.5" />
            </svg>
          </div>
          {emptyState?.heading && (
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16, fontWeight: 600, color: '#303030',
              margin: 0, lineHeight: '24px',
            }}>
              {emptyState.heading}
            </p>
          )}
          {emptyState?.description && (
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14, fontWeight: 400, color: '#616161',
              margin: 0, lineHeight: '20px', maxWidth: 320,
            }}>
              {emptyState.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {rows.map(row => (
        <MobileCard
          key={row.id}
          row={row}
          columns={columns}
          isSelected={selectedRows.has(row.id)}
          onToggle={onToggle}
          hideCheckbox={hideCheckbox}
          rowActions={rowActions}
        />
      ))}
    </div>
  );
}

// ─── IndexTable ───────────────────────────────────────────────────────────────

/**
 * IndexTable
 *
 * Props:
 *   columns          — [{ key, label, sortable?, align?, width?, render?, noWrap? }]
 *   rows             — array of data objects (each must have a unique `id` field)
 *   selectedRows     — Set of row IDs currently selected
 *   onSelectionChange(newSet) — called when selection changes
 *   sortKey          — current sort column key
 *   sortDir          — 'asc' | 'desc'
 *   onSort(key)      — called when a sortable column header is clicked
 *   emptyState       — { heading, description }
 *   bulkActions      — [{ label, onAction }]
 *   loading          — boolean
 *   footer           — ReactNode rendered at the bottom of the card
 *   tabs             — [{ label, badge? }] tab items for toolbar
 *   activeTab        — number, index of active tab
 *   onTabChange(i)   — called when a tab is clicked
 *   searchValue      — string
 *   onSearchChange   — function(event) called on search input change
 *   searchPlaceholder — string
 *   toolbarActions   — [{ label, icon?, onClick }] secondary buttons in toolbar
 */
export function IndexTable({
  columns = [],
  rows = [],
  selectedRows = new Set(),
  onSelectionChange,
  sortKey,
  sortDir = 'asc',
  onSort,
  emptyState,
  bulkActions,
  loading = false,
  footer,
  tabs,
  activeTab,
  onTabChange,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  toolbarActions,
  rowActions,
  bare = false,
}) {
  const showToolbar = (tabs && tabs.length > 0) || onSearchChange !== undefined || (toolbarActions && toolbarActions.length > 0);
  const [hoveredHeader, setHoveredHeader] = useState(null);
  const isMobile = useIsMobile(640);
  const sortableColumns = columns.filter(c => c.sortable);

  // Select-all state
  const allSelected = rows.length > 0 && rows.every(r => selectedRows.has(r.id));
  const someSelected = rows.some(r => selectedRows.has(r.id)) && !allSelected;

  function handleSelectAll() {
    if (!onSelectionChange) return;
    if (allSelected) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(rows.map(r => r.id)));
    }
  }

  function handleToggleRow(id) {
    if (!onSelectionChange) return;
    const next = new Set(selectedRows);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onSelectionChange(next);
  }

  function handleDeselectAll() {
    if (onSelectionChange) onSelectionChange(new Set());
  }

  const showBulkBar = !bare && selectedRows.size > 0;

  return (
    <>
      <div style={bare ? {
        background: '#ffffff',
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
      } : {
        background: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: [
          'inset 1px 0 0 rgba(0,0,0,0.13)',
          'inset -1px 0 0 rgba(0,0,0,0.13)',
          'inset 0 -1px 0 rgba(0,0,0,0.17)',
          'inset 0 1px 0 rgba(204,204,204,0.5)',
          '0 3px 1px -1px rgba(26,26,26,0.07)',
        ].join(', '),
      }}>

        {/* Toolbar */}
        {showToolbar && (
          <IndexTableToolbar
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            searchPlaceholder={searchPlaceholder}
            toolbarActions={toolbarActions}
            isMobile={isMobile}
          />
        )}

        {/* Bulk action bar */}
        {showBulkBar && (
          <BulkBar
            count={selectedRows.size}
            bulkActions={bulkActions}
            onDeselectAll={handleDeselectAll}
          />
        )}

        {/* Mobile header (Select all + Sort) — only when in card mode */}
        {isMobile && (
          <MobileHeader
            bare={bare}
            allSelected={allSelected}
            someSelected={someSelected}
            onSelectAll={handleSelectAll}
            sortableColumns={sortableColumns}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={onSort}
            rowCount={rows.length}
          />
        )}

        {/* Body — stacked cards on mobile, table on desktop */}
        {isMobile ? (
          <MobileCardList
            rows={rows}
            columns={columns}
            selectedRows={selectedRows}
            onToggle={handleToggleRow}
            rowActions={rowActions}
            hideCheckbox={bare}
            loading={loading}
            emptyState={emptyState}
          />
        ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            tableLayout: 'auto',
          }}>
            {/* Header */}
            <thead>
              <tr style={{ background: '#f7f7f7', borderBottom: '1px solid #e3e3e3' }}>
                {/* Select-all checkbox — hidden in bare mode */}
                {!bare && (
                  <th style={{ padding: '8px 12px', width: 40, verticalAlign: 'middle', textAlign: 'left' }}>
                    <Checkbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={handleSelectAll}
                      ariaLabel="Select all rows"
                    />
                  </th>
                )}

                {/* Column headers */}
                {columns.map((col) => {
                  const isActive = sortKey === col.key;
                  const isHovered = hoveredHeader === col.key;
                  const align = col.align || 'left';

                  return (
                    <th
                      key={col.key}
                      scope="col"
                      onClick={col.sortable && onSort ? () => onSort(col.key) : undefined}
                      onMouseEnter={() => col.sortable && setHoveredHeader(col.key)}
                      onMouseLeave={() => setHoveredHeader(null)}
                      style={{
                        padding: '8px 8px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 12,
                        fontWeight: 550,
                        color: '#616161',
                        lineHeight: '16px',
                        textAlign: align,
                        cursor: col.sortable ? 'pointer' : 'default',
                        userSelect: 'none',
                        whiteSpace: 'nowrap',
                        width: col.width || undefined,
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {col.label}
                        {col.sortable && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', width: 12, height: 12, flexShrink: 0 }}>
                            <SortIcon
                              colKey={col.key}
                              sortKey={sortKey}
                              sortDir={sortDir}
                              hovered={isHovered}
                            />
                          </span>
                        )}
                      </span>
                    </th>
                  );
                })}

                {/* Row actions header — visually empty but labelled for AT */}
                {rowActions && (
                  <th scope="col" style={{ width: 56, padding: '8px 8px' }}>
                    <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                      Row actions
                    </span>
                  </th>
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow
                    key={i}
                    colCount={columns.length + (rowActions ? 1 : 0)}
                    includeCheckboxCell={!bare}
                  />
                ))
              ) : rows.length === 0 ? (
                <EmptyState
                  heading={emptyState?.heading}
                  description={emptyState?.description}
                />
              ) : (
                rows.map((row) => (
                  <DataRow
                    key={row.id}
                    row={row}
                    columns={columns}
                    isSelected={selectedRows.has(row.id)}
                    onToggle={handleToggleRow}
                    hideCheckbox={bare}
                    rowActions={rowActions}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        )}

        {/* Optional footer (e.g. Pagination) */}
        {footer && (
          <div style={{ borderTop: '1px solid #ebebeb' }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
