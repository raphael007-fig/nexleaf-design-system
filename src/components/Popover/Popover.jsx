// ── Nexleaf Design System — Popover ───────────────────────────────────────────
// Non-modal floating layer anchored to a trigger element. Renders through a
// portal (so it escapes `overflow:hidden`/`clip` ancestors), clamps itself to
// the viewport, dismisses on outside-click / Escape, and returns focus to the
// trigger on close. Row-action menus, overflow link lists, sort menus, and the
// Page title disclosure all sit on top of this.
//
//   const triggerRef = useRef(null);
//   <button ref={triggerRef} onClick={() => setOpen(o => !o)} aria-haspopup="menu"
//           aria-expanded={open}>…</button>
//   <Popover open={open} onClose={() => setOpen(false)} anchorRef={triggerRef}
//            role="menu" ariaLabel="Row actions">
//     …items…
//   </Popover>

import { useRef, useState, useLayoutEffect, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  useEscapeKey, useOnInteractOutside, useReturnFocus, getFocusable, prefersReducedMotion,
} from '../../foundation/overlay/overlayHooks.js';
import { BG_SURFACE, BORDER_DEFAULT } from '../../tokens/index.js';

// Clamp a popover of (estWidth × estHeight) anchored to `rect` into the
// viewport, flipping above the trigger when it would clip the bottom edge.
function computePosition(rect, { placement, gap, estWidth, estHeight, matchWidth }) {
  if (typeof window === 'undefined') {
    return { top: rect.bottom + gap, left: rect.left, width: matchWidth ? rect.width : undefined };
  }
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = matchWidth ? rect.width : estWidth;

  const alignEnd = placement === 'bottom-end' || placement === 'top-end';
  let left = alignEnd ? rect.right - width : rect.left;
  left = Math.max(8, Math.min(left, vw - width - 8));

  const wantsTop = placement === 'top-start' || placement === 'top-end';
  const clipsBottom = rect.bottom + estHeight + gap > vh;
  const placeAbove = wantsTop || clipsBottom;
  const top = placeAbove
    ? Math.max(8, rect.top - estHeight - gap)
    : rect.bottom + gap;

  return { top, left, width: matchWidth ? rect.width : undefined, maxWidth: vw - 16 };
}

export function Popover({
  open,
  onClose,
  anchorRef,
  children,
  placement = 'bottom-start',
  gap = 6,
  matchWidth = false,
  minWidth = 200,
  maxHeight = 'min(60vh, 360px)',
  role = 'menu',
  ariaLabel,
  autoFocus = true,
  surface = true,
  zIndex = 1100,
}) {
  const popRef = useRef(null);
  const [pos, setPos] = useState(null);

  useReturnFocus(open);
  useEscapeKey(open, onClose);
  useOnInteractOutside(open, [popRef, anchorRef], onClose);

  const reposition = useCallback(() => {
    const trigger = anchorRef && anchorRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const measured = popRef.current;
    const estWidth = Math.max(minWidth, measured ? measured.offsetWidth : minWidth);
    const estHeight = measured ? measured.offsetHeight : 240;
    setPos(computePosition(rect, { placement, gap, estWidth, estHeight, matchWidth }));
  }, [anchorRef, placement, gap, matchWidth, minWidth]);

  // Position before paint to avoid a flash at (0,0).
  useLayoutEffect(() => {
    if (open) reposition();
  }, [open, reposition]);

  // Re-measure once mounted (real height), and track scroll/resize while open.
  useEffect(() => {
    if (!open) return;
    reposition();
    const onScroll = () => reposition();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [open, reposition]);

  // Move focus into the popover on open (menus/listboxes expect this).
  useEffect(() => {
    if (!open || !autoFocus) return;
    const raf = requestAnimationFrame(() => {
      const container = popRef.current;
      if (!container) return;
      const target = container.querySelector('[data-autofocus]') || getFocusable(container)[0];
      if (target) target.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, [open, autoFocus]);

  if (!open || typeof document === 'undefined') return null;

  const reduce = prefersReducedMotion();

  const surfaceStyle = surface ? {
    background: BG_SURFACE, border: `1px solid ${BORDER_DEFAULT}`, borderRadius: 12,
    boxShadow: '0 6px 20px rgba(0,0,0,0.12)', overflow: 'hidden',
  } : {};

  return createPortal(
    <div
      ref={popRef}
      role={role || undefined}
      aria-label={ariaLabel}
      style={{
        position: 'fixed',
        top: pos ? pos.top : -9999,
        left: pos ? pos.left : -9999,
        width: pos && pos.width ? pos.width : undefined,
        minWidth: matchWidth ? undefined : minWidth,
        maxWidth: pos ? pos.maxWidth : '100vw',
        maxHeight,
        overflowY: 'auto',
        zIndex,
        visibility: pos ? 'visible' : 'hidden',
        animation: reduce || !pos ? 'none' : 'nxFadeInScale 0.14s ease-out',
        ...surfaceStyle,
      }}
    >
      {children}
    </div>,
    document.body
  );
}
