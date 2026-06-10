// ── Nexleaf Design System — SlideOver (overlay shell) ─────────────────────────
// A panel that slides in over a dimmed scrim, anchored to an edge of the
// viewport. One shell, three placements:
//   • placement="right"  → Right Slider Modal (default; contextual side panels)
//   • placement="left"   → backs the Menu Drawer (global navigation)
//   • placement="bottom" → backs the Bottom Sheet (mobile action overflow)
//
// All placements share the same accessible plumbing (focus trap, scroll lock,
// return focus, Escape, reduced-motion) via the overlay hooks, so behavior is
// consistent across every floating surface. MenuDrawer and BottomSheet compose
// this shell rather than re-implementing backdrop + dismissal.
//
//   <SlideOver open={open} onClose={close} title="Action Required">…</SlideOver>
//   <SlideOver open={open} onClose={close} placement="left">…</SlideOver>
//   <SlideOver open={open} onClose={close} placement="bottom" dragHandle>…</SlideOver>
//
// Responsive: right/left panels clamp width to 100vw (full-screen on phones);
// the bottom sheet spans full width and clamps height to `maxHeight`.

import { useRef, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  useFocusTrap, useScrollLock, useReturnFocus, useEscapeKey, prefersReducedMotion,
} from '../../foundation/overlay/overlayHooks.js';
import {
  BG_SURFACE, BORDER_DEFAULT, TEXT_DEFAULT, TEXT_SUBDUED, FOCUS_RING,
  SHADOW_OVERLAY, SHADOW_SHEET, Z_OVERLAY, RADIUS_XL, SHEET_MAX_H,
} from '../../tokens/index.js';

const IcoX = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5l10 10M15 5L5 15" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

function CloseButton({ onClick }) {
  const ref = useRef(null);
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Close"
      onClick={onClick}
      onFocus={() => { if (ref.current) ref.current.style.boxShadow = FOCUS_RING; }}
      onBlur={() => { if (ref.current) ref.current.style.boxShadow = 'none'; }}
      onMouseEnter={() => { if (ref.current) ref.current.style.background = 'rgba(0,0,0,0.06)'; }}
      onMouseLeave={() => { if (ref.current) ref.current.style.background = 'transparent'; }}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent',
        color: TEXT_SUBDUED, cursor: 'pointer', outline: 'none', flexShrink: 0, padding: 0,
      }}
    >
      <IcoX />
    </button>
  );
}

// Distance (px) the bottom sheet must be dragged down before release dismisses it.
const SHEET_CLOSE_THRESHOLD = 80;

export function SlideOver({
  open,
  onClose,
  children,
  title,
  titleAccessory,
  actions,
  footer,
  placement = 'right',
  width = 480,
  maxHeight = SHEET_MAX_H,
  dragHandle,
  bodyPadding = 24,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  panelBackground = BG_SURFACE,
  // Rounds the panel on its *anchored* edge (right→left placement, left→right
  // placement) so the curve reads against the scrim instead of a square corner.
  // Default 0 (square — Right Slider Modal unchanged); the nav drawer passes 24.
  panelRadius = 0,
  // 'auto' (default) focuses the first focusable on open; 'container' focuses
  // the dialog panel itself (no visible ring) — preferred for the nav drawer so
  // a nav row doesn't flash a focus ring the instant it opens.
  initialFocus = 'auto',
  ariaLabel,
  ariaLabelledby,
  zIndex = Z_OVERLAY,
}) {
  const dialogRef = useRef(null);
  const panelRef = useRef(null);
  const generatedTitleId = useId();
  const titleId = title != null ? generatedTitleId : undefined;

  // Bottom-sheet drag state (translateY while dragging).
  const dragRef = useRef({ active: false, startY: 0 });
  const [dragY, setDragY] = useState(0);

  useReturnFocus(open);
  useScrollLock(open);
  useFocusTrap(open, dialogRef, { initialFocus });
  useEscapeKey(open && closeOnEscape, onClose);

  if (!open || typeof document === 'undefined') return null;

  const reduce = prefersReducedMotion();
  const labelledBy = ariaLabelledby || titleId;
  const isBottom = placement === 'bottom';
  const isLeft = placement === 'left';
  const showDragHandle = dragHandle ?? isBottom;
  const hasHeader = title != null || showCloseButton || actions != null;
  const resolvedWidth = typeof width === 'number' ? `${width}px` : width;

  const animation = reduce ? 'none'
    : isBottom ? 'nxSlideInUp 0.24s ease-out both'
      : isLeft ? 'nxSlideInLeft 0.24s ease-out both'
        : 'slideInRight 0.24s ease-out both';

  // Backdrop flexbox aligns the panel to the correct edge.
  const backdropAlign = isBottom
    ? { alignItems: 'flex-end', justifyContent: 'center' }
    : { alignItems: 'stretch', justifyContent: isLeft ? 'flex-start' : 'flex-end' };

  const panelStyle = isBottom ? {
    width: '100%', maxWidth: 640, maxHeight, height: 'auto',
    background: panelBackground, boxShadow: SHADOW_SHEET,
    borderTopLeftRadius: RADIUS_XL, borderTopRightRadius: RADIUS_XL,
    paddingBottom: 'var(--nx-safe-bottom, 0px)',
  } : {
    width: `min(${resolvedWidth}, 100vw)`, height: '100%',
    background: panelBackground, boxShadow: SHADOW_OVERLAY,
    // Round the anchored edge so the curve shows against the scrim (panel has
    // overflow:hidden, so content clips to the rounded shape and the drop
    // shadow follows it).
    ...(panelRadius ? (isLeft
      ? { borderTopRightRadius: panelRadius, borderBottomRightRadius: panelRadius }
      : { borderTopLeftRadius: panelRadius, borderBottomLeftRadius: panelRadius })
      : null),
  };

  // ── Bottom-sheet drag-to-close ──────────────────────────────────────────────
  const onDragStart = (e) => {
    if (!isBottom) return;
    dragRef.current = { active: true, startY: e.touches ? e.touches[0].clientY : e.clientY };
  };
  const onDragMove = (e) => {
    if (!isBottom || !dragRef.current.active) return;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = y - dragRef.current.startY;
    if (delta > 0) setDragY(delta); // only allow downward drag
  };
  const onDragEnd = () => {
    if (!isBottom || !dragRef.current.active) return;
    dragRef.current.active = false;
    if (dragY > SHEET_CLOSE_THRESHOLD) { setDragY(0); onClose(); }
    else setDragY(0);
  };

  const dragHandleEl = showDragHandle && (
    <div
      onPointerDown={onDragStart}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      onPointerCancel={onDragEnd}
      style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '10px 0 6px', cursor: 'grab', touchAction: 'none', flexShrink: 0,
      }}
    >
      <span aria-hidden="true" style={{
        width: 36, height: 4, borderRadius: 100, background: '#d0d0d0', display: 'block',
      }} />
    </div>
  );

  const headerEl = hasHeader && (
    <header style={{ flexShrink: 0 }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, padding: '16px 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          {title != null && (
            <h2 id={titleId} style={{
              margin: 0, fontSize: 20, fontWeight: 650, lineHeight: '24px',
              letterSpacing: '-0.2px', color: TEXT_DEFAULT,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {title}
            </h2>
          )}
          {titleAccessory}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {actions}
          {showCloseButton && <CloseButton onClick={onClose} />}
        </div>
      </div>
      {!isBottom && <div style={{ height: 1, background: BORDER_DEFAULT, width: '100%' }} />}
    </header>
  );

  return createPortal(
    <div
      onMouseDown={e => { if (closeOnBackdrop && e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex,
        display: 'flex', ...backdropAlign,
        animation: reduce ? 'none' : 'nxFadeIn 0.2s ease-out',
      }}
    >
      <div
        ref={node => { dialogRef.current = node; panelRef.current = node; }}
        role="dialog"
        aria-modal="true"
        aria-label={!labelledBy ? ariaLabel : undefined}
        aria-labelledby={labelledBy}
        tabIndex={-1}
        style={{
          display: 'flex', flexDirection: 'column', outline: 'none', overflow: 'hidden',
          ...panelStyle,
          transform: dragY ? `translateY(${dragY}px)` : undefined,
          transition: dragRef.current.active ? 'none' : 'transform 0.18s ease-out',
          animation,
        }}
      >
        {dragHandleEl}
        {headerEl}
        <div style={{ padding: bodyPadding, overflowY: 'auto', flex: '1 1 auto' }}>
          {children}
        </div>
        {footer != null && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8,
            padding: 16, background: BG_SURFACE, borderTop: `1px solid ${BORDER_DEFAULT}`,
            flexShrink: 0,
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
