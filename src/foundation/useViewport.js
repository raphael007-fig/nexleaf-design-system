// ── Nexleaf Design System — Viewport hooks ────────────────────────────────────
//
// Single source of truth for responsive behavior. Previously `useIsMobile` lived
// inside IndexTable and a separate `useViewport` lived inside the ApplicationLayout
// story; they have been consolidated here so every component agrees on breakpoints
// and resize handling.
//
// Breakpoints (px, max-width semantics — "below" means narrower than):
//   sm = 640   →  phone / stacked-card layouts
//   md = 768   →  tablet / collapsed side nav
//   lg = 1024  →  small desktop
//
// All hooks are SSR-safe: they fall back to a sensible default when `window`
// is undefined and only subscribe to resize after mount.

export const BP_SM = 640;
export const BP_MD = 768;
export const BP_LG = 1024;

import { useEffect, useState } from 'react';

// Returns the live viewport width plus the common "below breakpoint" booleans.
// Use this when a component needs the actual width or several breakpoint checks.
export function useViewport() {
  const get = () => (typeof window === 'undefined' ? 1440 : window.innerWidth);
  const [width, setWidth] = useState(get);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return {
    width,
    isBelowSm: width < BP_SM,
    isBelowMd: width < BP_MD,
    isBelowLg: width < BP_LG,
  };
}

// Returns true when the viewport is at or below `breakpoint`. Uses matchMedia so
// it only re-renders on threshold crossings (cheaper than width subscriptions
// when a component just needs a single boolean). Defaults to the `sm` breakpoint.
export function useIsMobile(breakpoint = BP_SM) {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else mq.addListener(handler); // older Safari
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else mq.removeListener(handler);
    };
  }, [query]);
  return isMobile;
}
