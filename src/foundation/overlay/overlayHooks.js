// ── Nexleaf Design System — Overlay behavior hooks ────────────────────────────
// Shared focus / scroll / keyboard plumbing for Modal, Popover, and any other
// layer that floats above the page. Keeping these in one place means every
// overlay surface gets the same accessible behavior instead of each one
// re-implementing (and forgetting) a piece.

import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function getFocusable(container) {
  if (!container) return [];
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement
  );
}

// Capture whatever was focused when `active` flips true, restore it when the
// overlay closes. Prevents the "focus jumps to <body>" trap on dismissal.
export function useReturnFocus(active) {
  const prevFocusRef = useRef(null);
  useEffect(() => {
    if (!active) return;
    prevFocusRef.current = document.activeElement;
    return () => {
      const el = prevFocusRef.current;
      // Element may have unmounted (e.g. row deleted) — guard before focusing.
      if (el && typeof el.focus === 'function' && document.contains(el)) {
        el.focus();
      }
    };
  }, [active]);
}

// Lock <body> scroll while active, compensating for the scrollbar width so the
// page doesn't shift sideways when the bar disappears.
export function useScrollLock(active) {
  useEffect(() => {
    if (!active || typeof document === 'undefined') return;
    const { body, documentElement: html } = document;
    const scrollBarW = window.innerWidth - html.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    body.style.overflow = 'hidden';
    if (scrollBarW > 0) {
      const current = parseFloat(getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${current + scrollBarW}px`;
    }
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [active]);
}

// Trap Tab focus inside containerRef while active, and move focus into the
// container on open. Targeting order:
//   • [data-autofocus] descendant, if present (always wins)
//   • otherwise, when initialFocus === 'container', the container itself —
//     used by surfaces like the nav drawer where auto-focusing the first item
//     would flash a "pressed" focus ring on a nav row the moment it opens;
//     focusing the dialog (role=dialog, tabIndex -1, no visible ring) is the
//     correct pattern and leaves the list visually at rest.
//   • otherwise the first focusable (default — Modal/Popover form surfaces)
//   • finally the container as a last resort.
export function useFocusTrap(active, containerRef, { initialFocus = 'auto' } = {}) {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    // Move focus inside on the next frame so portal children are mounted.
    const raf = requestAnimationFrame(() => {
      const preferred = container.querySelector('[data-autofocus]');
      const target = preferred
        || (initialFocus === 'container' ? container : getFocusable(container)[0])
        || container;
      if (target) target.focus();
    });

    const onKeyDown = e => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusable(container);
      if (focusable.length === 0) {
        e.preventDefault();
        container.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;
      if (e.shiftKey) {
        if (activeEl === first || !container.contains(activeEl)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (activeEl === last || !container.contains(activeEl)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('keydown', onKeyDown);
    };
  }, [active, containerRef, initialFocus]);
}

// Fire `onEscape` on the Escape key while active. Document-level so it works
// even when focus is on the backdrop.
export function useEscapeKey(active, onEscape) {
  useEffect(() => {
    if (!active || !onEscape) return;
    const handler = e => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onEscape(e);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active, onEscape]);
}

// Fire `handler` on a pointer/focus event outside every ref in `refs`.
// Used by Popover (dismiss on click-away) — Modal uses a backdrop instead.
export function useOnInteractOutside(active, refs, handler) {
  useEffect(() => {
    if (!active || !handler) return;
    const refList = Array.isArray(refs) ? refs : [refs];
    const isInside = target =>
      refList.some(r => r.current && r.current.contains(target));
    const onPointerDown = e => {
      if (!isInside(e.target)) handler(e);
    };
    const onFocusIn = e => {
      if (!isInside(e.target)) handler(e);
    };
    document.addEventListener('mousedown', onPointerDown, true);
    document.addEventListener('touchstart', onPointerDown, true);
    document.addEventListener('focusin', onFocusIn, true);
    return () => {
      document.removeEventListener('mousedown', onPointerDown, true);
      document.removeEventListener('touchstart', onPointerDown, true);
      document.removeEventListener('focusin', onFocusIn, true);
    };
  }, [active, refs, handler]);
}

// True when the user has asked the OS to minimize motion. Read once at call
// time (sufficient for entrance animations) — components that need live
// updates can subscribe to the media query themselves.
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
