// ── Nexleaf Design System — useNavSync ────────────────────────────────────────
// The single-source-of-truth engine that keeps the whole navigation system in
// lock-step: SideNavigation / MenuDrawer selection, the Breadcrumbs trail, and
// the Secondary page title switcher (popover on desktop, BottomSheet on mobile).
//
// ONE state — `activeId` — drives everything. Every surface is a pure projection
// of it over the nav `items` tree, and every entry point (rail click, breadcrumb
// click, title-switcher pick) writes back through the same `go(id)` so they can
// never drift. Identical on desktop / iPad / mobile / wrapped app — only the
// surface that renders each projection changes, never the data.
//
//   const nav = useNavSync(COLDTRACE_NAV_ITEMS, { home: HOME_CRUMB, initialId: 'home' });
//   <AppShell activeItemId={nav.activeId} onNavSelect={nav.go}
//             breadcrumbs={nav.breadcrumbs} onBreadcrumbSelect={nav.go}>
//     <Page title={nav.labelFor(nav.activeId)}
//           titleDisclosure={nav.titleDisclosureFor()} … />
//   </AppShell>
//
// The Tertiary "detail" (a record with no nav id) is a separate dimension the
// caller owns; append its crumb to `nav.breadcrumbs` when a record is open.

import { useState, useMemo, useCallback } from 'react';
import { trailFor, siblingsFor } from '../components/SideNavigation/SideNavigation.jsx';

export function useNavSync(items, { home, initialId, groupsArePages = false } = {}) {
  const homeId = home ? home.id : undefined;
  const [activeId, setActiveId] = useState(initialId ?? homeId ?? null);

  // Resolve a clicked id to a destination. By default a group/parent has no page
  // of its own → land on its first child. When `groupsArePages` is true the
  // parent IS a page, so it passes through unchanged (full sync on the parent).
  const resolveTarget = useCallback((id) => {
    if (id === homeId || groupsArePages) return id;
    const group = (items || []).find((it) => it.id === id && it.children && it.children.length);
    return group ? group.children[0].id : id;
  }, [items, homeId, groupsArePages]);

  // The ONE writer — every surface routes through this.
  const go = useCallback((id) => setActiveId(resolveTarget(id)), [resolveTarget]);

  // Label for any id (top-level item or child) — handy for the page title.
  const labelFor = useCallback((id) => {
    for (const it of items || []) {
      if (it.id === id) return typeof it.label === 'string' ? it.label : id;
      const c = it.children && it.children.find((ch) => ch.id === id);
      if (c) return c.label;
    }
    return id;
  }, [items]);

  // Breadcrumb trail — pure projection of activeId over the tree.
  const breadcrumbs = useMemo(
    () => trailFor(items, activeId, { home }),
    [items, activeId, home],
  );

  // Title-switcher config for a page: the active item's siblings, already wired
  // to `go`. Returns null when the id has no switchable siblings (no chevron).
  // Drop straight into <Page titleDisclosure={…} /> — it renders a popover on
  // desktop and a BottomSheet on mobile, both feeding the same `go`.
  const titleDisclosureFor = useCallback((id = activeId, extra = {}) => {
    const s = siblingsFor(items, id);
    return s ? { ...s, onSelect: go, ...extra } : null;
  }, [items, activeId, go]);

  return { activeId, setActiveId, go, labelFor, breadcrumbs, titleDisclosureFor };
}
