// ── Nexleaf Design System — BottomSheet (mobile action overflow) ──────────────
// The mobile-only overflow pattern. Opens when the user taps "More" on a
// tertiary/detail page, and also hosts mobile filters, sort, selectors, and
// grouped secondary actions. It composes the SlideOver shell (placement="bottom")
// — drag handle, slide-up, drag-down / tap-outside / Escape to close, focus trap,
// scroll lock, safe-area padding, height clamped to ~88vh — and layers the
// action-list / content chrome on top.
//
//   // Flat action list
//   <BottomSheet open={open} onClose={close} title="Actions"
//     actions={[{ id, label, icon, onClick }]} />
//
//   // Grouped (Record / Monitoring / Issues / Lifecycle), destructive separated
//   <BottomSheet open={open} onClose={close} groups={GROUPS} />
//
//   // Arbitrary content (filter / sort / selector)
//   <BottomSheet open={open} onClose={close} title="Filter">…controls…</BottomSheet>

import { SlideOver } from '../SlideOver/SlideOver.jsx';
import { Skeleton } from '../Skeleton/Skeleton.jsx';
import {
  TEXT_DEFAULT, TEXT_SUBDUED, TEXT_PLACEHOLDER, TEXT_DISABLED,
  COLOR_CRITICAL, BORDER_LIGHT, BG_SURFACE_ACTIVE, BG_PRESSED,
} from '../../tokens/index.js';

// Hover/focus on the action rows is handled with real CSS `:hover` (injected
// once) rather than JS handlers — JS mouseenter is unreliable on portaled
// content, and CSS is the correct mechanism for hover anyway.
const SHEET_STYLE_ID = 'nx-bottom-sheet-styles';
if (typeof document !== 'undefined' && !document.getElementById(SHEET_STYLE_ID)) {
  const tag = document.createElement('style');
  tag.id = SHEET_STYLE_ID;
  tag.textContent = `
    .nx-sheet-action { background: transparent; transition: background 0.12s; }
    .nx-sheet-action:hover:not(:disabled),
    .nx-sheet-action:focus-visible,
    .nx-sheet-action--hover { background: ${BG_SURFACE_ACTIVE}; }
    .nx-sheet-action:active:not(:disabled),
    .nx-sheet-action--active { background: ${BG_PRESSED}; }
  `;
  document.head.appendChild(tag);
}

const IcoChevronRight = ({ color = TEXT_PLACEHOLDER }) => (
  <svg width={18} height={18} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7.5 5l5 5-5 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// A single action row — comfortable ≥48px tap target. The hover/press state is
// an inset, rounded fill (not full-bleed), matching the Figma sheet. Destructive
// rows use the critical color. `state` ('default' | 'hover' | 'active') forces
// the interaction fill in docs via the `--hover`/`--active` modifier classes.
function SheetAction({ icon, label, onClick, destructive, disabled, trailing, state = 'default' }) {
  const color = disabled ? TEXT_DISABLED : destructive ? COLOR_CRITICAL : TEXT_DEFAULT;
  const stateClass = state === 'hover' ? ' nx-sheet-action--hover' : state === 'active' ? ' nx-sheet-action--active' : '';
  return (
    <button
      type="button"
      className={`nx-sheet-action${stateClass}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        display: 'flex', alignItems: 'center', gap: 12, width: '100%',
        minHeight: 52, padding: '14px 16px', border: 'none',
        borderRadius: 12, cursor: disabled ? 'not-allowed' : 'pointer', textAlign: 'left',
        fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 500, color,
        outline: 'none',
      }}
    >
      {icon && (
        <span style={{ display: 'inline-flex', flexShrink: 0, color }}>{icon}</span>
      )}
      <span style={{ flex: 1, minWidth: 0 }}>{label}</span>
      {trailing ?? null}
    </button>
  );
}

function GroupTitle({ children }) {
  return (
    <div style={{
      padding: '12px 16px 4px', fontFamily: 'Inter, sans-serif', fontSize: 12,
      fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: TEXT_SUBDUED,
    }}>
      {children}
    </div>
  );
}

const Sep = () => <div style={{ height: 1, background: BORDER_LIGHT, margin: '8px 4px' }} />;

// Shape-matching skeleton for the action list: ~5 rows, each a short icon + label
// line at the same 52px row height, so the sheet doesn't reflow when data lands.
// The sheet chrome (drag handle + title) stays intact above it.
function SheetLoading({ rows = 5 }) {
  return (
    <div role="menu" aria-busy="true" aria-label="Loading actions" style={{ paddingBottom: 8 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          style={{
            display: 'flex', alignItems: 'center', gap: 12, width: '100%',
            minHeight: 52, padding: '14px 16px', boxSizing: 'border-box',
          }}
        >
          <Skeleton width={20} height={20} radius={4} ariaLabel={i === 0 ? 'Loading actions' : null} />
          {/* Varied label widths so the placeholder reads like a real list. */}
          <Skeleton width={`${[62, 48, 70, 54, 40][i % 5]}%`} height={13} ariaLabel={null} />
        </div>
      ))}
    </div>
  );
}

export function BottomSheet({
  open,
  onClose,
  title,
  groups,
  actions,
  children,
  showCloseButton = false,
  closeAfterAction = true,
  // Render shape-matching skeleton rows in place of the action/option list,
  // keeping the sheet chrome (drag handle + title) intact while data loads.
  loading = false,
  ...rest
}) {
  // Normalize: groups win; else a flat actions array becomes one untitled group.
  const resolvedGroups = groups ?? (actions ? [{ actions }] : null);

  const runAction = (fn) => () => { fn?.(); if (closeAfterAction) onClose?.(); };

  return (
    <SlideOver
      open={open}
      onClose={onClose}
      placement="bottom"
      dragHandle
      title={title}
      showCloseButton={showCloseButton}
      bodyPadding={resolvedGroups || loading ? 8 : 16}
      ariaLabel={title ? undefined : 'Actions'}
      {...rest}
    >
      {loading ? (
        <SheetLoading />
      ) : resolvedGroups ? (
        <div role="menu" aria-label={title || 'Actions'} style={{ paddingBottom: 8 }}>
          {resolvedGroups.map((group, gi) => {
            const isDestructiveGroup = group.actions.every(a => a.destructive);
            return (
              <div key={group.title || gi} role="group" aria-label={group.title || undefined}>
                {/* Separate destructive groups, and separate any group after the first. */}
                {gi > 0 && <Sep />}
                {group.title && <GroupTitle>{group.title}</GroupTitle>}
                {group.actions.map((a) => (
                  <SheetAction
                    key={a.id || a.label}
                    icon={a.icon}
                    label={a.label}
                    destructive={a.destructive || isDestructiveGroup}
                    disabled={a.disabled}
                    trailing={a.hasChevron ? <IcoChevronRight /> : a.trailing}
                    onClick={runAction(a.onClick)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      ) : children}
    </SlideOver>
  );
}
