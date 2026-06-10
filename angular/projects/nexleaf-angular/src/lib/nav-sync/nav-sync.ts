// ── Nexleaf Design System — nav-sync helpers (Angular / framework-agnostic) ───
// TS port of the React `trailFor` / `siblingsFor` helpers (see
// src/components/SideNavigation/SideNavigation.jsx and src/foundation/
// useNavSync.js). These are the single-source engine that keeps the side nav /
// drawer selection, the breadcrumb trail, and the Secondary page title switcher
// in lock-step: keep ONE `activeId` and derive everything from it.
//
//   trail = trailFor(NAV_ITEMS, activeId, { home: HOME_CRUMB });
//   switcher = siblingsFor(NAV_ITEMS, activeId);  // null → no chevron
//
// Pure functions — no Angular dependency — so they work in components, guards,
// resolvers, or plain TS. Pair with nx-menu-drawer / nx-top-bar.

import { NxNavItem } from '../menu-drawer/menu-drawer.component';

export interface NxCrumb {
  id: string;
  label: string;
  iconOnly?: boolean;
}

export interface NxTitleSwitcher {
  sectionTitle?: string;
  activeItemId: string;
  items: { id: string; label: string; disabled?: boolean }[];
}

/**
 * The active item's switchable siblings, or null when it has fewer than
 * `minSiblings` (default 2) — i.e. nothing to switch between, so no chevron.
 */
export function siblingsFor(
  items: NxNavItem[],
  currentId: string,
  opts: { minSiblings?: number } = {},
): NxTitleSwitcher | null {
  const minSiblings = opts.minSiblings ?? 2;
  if (!items || !currentId) return null;
  for (const item of items) {
    if (!item.children || item.children.length < minSiblings) continue;
    if (item.children.some((c) => c.id === currentId)) {
      return {
        sectionTitle: typeof item.label === 'string' ? item.label : undefined,
        activeItemId: currentId,
        items: item.children.map(({ id, label, disabled }) => ({ id, label, disabled })),
      };
    }
  }
  return null;
}

/**
 * Ordered breadcrumb trail for `currentId`:
 *   • home id / null / unknown → [home]
 *   • top-level leaf           → [home, item]
 *   • child of a group         → [home, group, child]
 * The group crumb carries its own id so a click can resolve to its first child.
 */
export function trailFor(
  items: NxNavItem[],
  currentId: string | null | undefined,
  opts: { home?: NxCrumb } = {},
): NxCrumb[] {
  const home = opts.home || null;
  const homeId = home ? home.id : undefined;
  const root: NxCrumb[] = home ? [home] : [];

  if (currentId == null || currentId === homeId) return root;

  for (const item of items || []) {
    if (item.id === homeId) continue;
    if (item.id === currentId) return [...root, { id: item.id, label: item.label }];
    if (item.children) {
      const child = item.children.find((c) => c.id === currentId);
      if (child) {
        return [...root, { id: item.id, label: item.label }, { id: child.id, label: child.label }];
      }
    }
  }
  return root;
}

/**
 * Resolve a clicked id to a destination. By default a group lands on its first
 * child; when `groupsArePages` is true the parent IS a page and passes through
 * unchanged (full sync on the parent).
 */
export function resolveNavTarget(items: NxNavItem[], id: string, groupsArePages = false): string {
  if (groupsArePages) return id;
  const group = (items || []).find((it) => it.id === id && it.children && it.children.length);
  return group && group.children ? group.children[0].id : id;
}
