import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Tabs } from '../Tabs/Tabs.jsx';
import { TextInput } from '../TextInput/TextInput.jsx';
import { Btn } from '../Btn/Btn.jsx';
import { OptionList } from '../OptionList/OptionList.jsx';

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

      {open && rect && createPortal(
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top:  rect.bottom + 4,
            left: rect.right,
            transform: 'translateX(-100%)',
            zIndex: 9999,
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}
        >
          <OptionList sections={sections} onChange={handleChange} />
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── Checkbox (supports indeterminate) ───────────────────────────────────────

function Checkbox({ checked, indeterminate, onChange, disabled }) {
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

function SkeletonRow({ colCount }) {
  return (
    <tr>
      <td style={{ padding: '12px 12px', borderBottom: '1px solid #ebebeb', width: 40 }}>
        <div style={{ width: 16, height: 16, borderRadius: 3, background: '#e8e8e8', animation: 'indexTablePulse 1.4s ease-in-out infinite' }} />
      </td>
      {Array.from({ length: colCount }).map((_, i) => (
        <td key={i} style={{ padding: '12px 8px', borderBottom: '1px solid #ebebeb' }}>
          <div style={{
            height: 13,
            borderRadius: 4,
            background: '#e8e8e8',
            width: i === 0 ? '60%' : i === colCount - 1 ? '40%' : '75%',
            animation: 'indexTablePulse 1.4s ease-in-out infinite',
            animationDelay: `${i * 0.07}s`,
          }} />
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
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 8px',
      borderBottom: '1px solid #e3e3e3',
      background: '#ffffff',
      minHeight: 44,
      gap: 8,
    }}>
      {/* Left: Tabs */}
      <div style={{ flexShrink: 0 }}>
        {tabs && tabs.length > 0 && (
          <Tabs
            tabs={tabs}
            activeIndex={activeTab || 0}
            onChange={onTabChange}
          />
        )}
      </div>

      {/* Right: Search + action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        {(onSearchChange !== undefined || searchValue !== undefined) && (
          <div style={{ width: 200 }}>
            <TextInput
              size="slim"
              placeholder={searchPlaceholder || 'Search…'}
              value={searchValue || ''}
              onChange={onSearchChange}
              prefix={<IcoSearch size={16} color="#616161" />}
              clearButton
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
      {/* Keyframes for skeleton pulse */}
      <style>{`
        @keyframes indexTablePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

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

        {/* Table */}
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

                {/* Row actions header — empty */}
                {rowActions && (
                  <th style={{ width: 56, padding: '8px 8px' }} />
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} colCount={columns.length + (rowActions ? 1 : 0)} />
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
