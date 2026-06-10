// ── Nexleaf Design System — AppShell (responsive application shell) ────────────
// The hybrid-responsive chrome for ColdTrace. It pairs the synchronized
// progressive `TopBar` (one navigation system, menu-always, that collapses by
// width — see TopBar) with the `MenuDrawer` the menu opens. Lower-priority top-
// bar controls (Notification, Profile) are NOT removed as the bar collapses —
// they live in the drawer, so they're always reachable.
//
// Same routes / IA at every size; only the shell adapts. Works in responsive
// web and iOS/Android/iPad containers (TopBar handles safe areas).
//
//   <AppShell activeItemId="coldchain" onNavSelect={go} breadcrumbs={trail}>
//     {page}
//   </AppShell>

import { useState } from 'react';
import { useViewport, BP_SM, BP_MD, BP_LG } from '../../foundation/useViewport.js';
import { TopBar, topBarOverflowForWidth } from '../TopBar/TopBar.jsx';
import { MenuDrawer, COLDTRACE_NAV_ITEMS, NexleafFullLogo, NexleafIconLogo } from '../MenuDrawer/MenuDrawer.jsx';
import { SideNavigation, trailFor } from '../SideNavigation/SideNavigation.jsx';
import {
  BG_PAGE, TEXT_DEFAULT, TEXT_SUBDUED, BG_HOVER_SUBTLE, FOCUS_RING, RADIUS_SM,
} from '../../tokens/index.js';

// Desktop rail collapse/expand control (rail footer). Icon + "Collapse" label
// when expanded; icon-only when collapsed — matches the SideNavigation rail.
//
// Interaction states (all token-driven, matching the rail's NavItem rows):
//   rest  → transparent bg, TEXT_SUBDUED label
//   hover → BG_HOVER_SUBTLE bg, TEXT_DEFAULT label (darkens to match rows)
//   focus → FOCUS_RING (2px COLOR_PRIMARY) ring; keyboard-reachable like nav rows
// `state` forces the hover look for docs ('default' | 'hover'). Exported so the
// docs can show the shell's OWN interactive chrome (rest / hover / focus) in
// isolation — the nav-row states themselves are owned by SideNavigation.
export function RailCollapseToggle({ collapsed, onToggle, state = 'default' }) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const showHover = state === 'hover' || hov;
  const textColor = showHover ? TEXT_DEFAULT : TEXT_SUBDUED;
  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
      aria-expanded={!collapsed}
      title={collapsed ? 'Expand' : 'Collapse'}
      style={{
        width: '100%', padding: collapsed ? 6 : '6px 10px',
        display: 'flex', alignItems: 'center', gap: 8,
        justifyContent: collapsed ? 'center' : 'flex-start',
        minHeight: 40, border: 'none', borderRadius: RADIUS_SM,
        background: showHover ? BG_HOVER_SUBTLE : 'transparent',
        color: textColor, cursor: 'pointer', outline: 'none',
        fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500,
        boxShadow: foc ? FOCUS_RING : 'none',
        transition: 'background 0.12s, color 0.12s, box-shadow 0.12s',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d={collapsed ? 'M7.5 5l5 5-5 5' : 'M12.5 5l-5 5 5 5'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {!collapsed && <span>Collapse</span>}
    </button>
  );
}

export function AppShell({
  navItems = COLDTRACE_NAV_ITEMS,
  activeItemId,
  onNavSelect,
  logo = <NexleafFullLogo height={44} />,   // drawer wordmark (TopBar uses the leaf mark)
  // Breadcrumbs: pass an explicit array, OR pass `homeCrumb` and let the shell
  // derive the trail from navItems + activeItemId (trailFor) so the bar stays in
  // sync with the rail/drawer for free. An explicit array always wins.
  breadcrumbs,
  homeCrumb,
  onBreadcrumbSelect,
  // 'primary' | 'secondary' | 'tertiary'. On MOBILE only, a tertiary (record /
  // detail) page is a focused record-confirmation surface: the global top bar is
  // hidden so the in-page record header takes priority (no competition between
  // global nav and record identity). iPad/tablet and desktop are unaffected —
  // they keep the global top bar for context.
  level,
  // Shared content container so Primary / Secondary / Tertiary line up with the
  // SAME width + vertical rhythm (no jump as you navigate). One uniform max-width
  // by default; pass a number to change it, or 'full' to opt a page out
  // (full-bleed — the page then owns its own padding/width).
  contentWidth = 1080,
  country = { code: 'KE', name: 'Kenya' },
  onAskAi,
  askAiActive = false,
  onApps,
  onNotification,
  onProfile,
  userInitials = 'NA',
  userAvatar,
  children,
}) {
  const { width } = useViewport();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [railCollapsed, setRailCollapsed] = useState(false);

  // Hybrid: dock the SideNavigation rail on desktop (≥lg); use the MenuDrawer
  // below. Same nav tree + activeId drive both — only the surface swaps.
  const docked = width >= BP_LG;
  const railWidth = railCollapsed ? 60 : 240;

  // Model 2 (split control): selecting any row navigates and closes the drawer.
  // Expanding a group is the caret's job inside SideNavigation — it doesn't
  // fire onSelect, so the drawer stays open while browsing.
  const select = (id) => { onNavSelect?.(id); setDrawerOpen(false); };

  // Focused mobile record page: hide the global top bar so the record header
  // leads. Phones only (< md) — iPad/tablet and desktop keep the bar.
  const hideTopBar = level === 'tertiary' && width < BP_MD;

  // Keep the drawer's Secondary tier in sync with the top bar: surface only the
  // controls that have overflowed OUT of the bar at the current width.
  const overflow = topBarOverflowForWidth(width);
  const secondaryVisible = [
    overflow.notification && 'notification',
    overflow.profile && 'profile',
  ].filter(Boolean);

  // Resolve the breadcrumb trail: explicit prop wins; otherwise derive it from
  // the nav tree + active id when a homeCrumb is provided; else none.
  const resolvedBreadcrumbs = breadcrumbs !== undefined
    ? breadcrumbs
    : (homeCrumb ? trailFor(navItems, activeItemId, { home: homeCrumb }) : []);

  // One content container for every level — same centered max-width + the same
  // top/side/bottom rhythm — so Primary/Secondary/Tertiary don't shift size or
  // vertical offset as you navigate. `contentWidth='full'` opts a page out.
  // When the top bar is hidden (focused mobile record page), the record header
  // IS the top of the page — it leads where the top bar would have sat, with a
  // small 12px breathing pad (+ safe-area) so the title doesn't touch the
  // viewport edge. The standard 24px would read as "starting low"; 0 reads as
  // cramped — 12 matches the top bar's own internal offset.
  const fullBleed = contentWidth === 'full' || contentWidth == null;
  const sidePad = width < BP_SM ? 12 : 16;
  const padTop = hideTopBar ? 'calc(12px + var(--nx-safe-top, 0px))' : '24px';
  const contentStyle = fullBleed
    ? { minWidth: 0 }
    : { maxWidth: contentWidth, margin: '0 auto', padding: `${padTop} ${sidePad}px 32px`, boxSizing: 'border-box', minWidth: 0 };

  return (
    <div style={{ background: BG_PAGE, minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Desktop (≥lg): docked SideNavigation rail — same nav tree + activeId as
          the drawer, so selection / breadcrumb / page title stay in lock-step. */}
      {docked && (
        <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 10 }}>
          <SideNavigation
            collapsed={railCollapsed}
            onCollapsedChange={setRailCollapsed}
            logo={railCollapsed ? <NexleafIconLogo size={44} /> : <NexleafFullLogo height={44} />}
            items={navItems}
            activeItemId={activeItemId}
            onSelect={(id) => onNavSelect?.(id)}
            footer={<RailCollapseToggle collapsed={railCollapsed} onToggle={() => setRailCollapsed((c) => !c)} />}
            ariaLabel="Main navigation"
          />
        </div>
      )}

      {/* Content column — offset by the rail on desktop. */}
      <div style={{ marginLeft: docked ? railWidth : 0, transition: 'margin-left 0.18s ease', minWidth: 0 }}>
        {/* One progressive top bar across every size. On desktop the docked rail
            leads, so the hamburger + logo are hidden (showMenu=false) and the
            breadcrumb leads. Suppressed on mobile tertiary (record header leads). */}
        {!hideTopBar && (
          <TopBar
            sticky
            showMenu={!docked}
            breadcrumbs={resolvedBreadcrumbs}
            onBreadcrumbSelect={onBreadcrumbSelect}
            onMenu={() => setDrawerOpen(true)}
            drawerOpen={drawerOpen}
            country={country}
            onAskAi={onAskAi}
            askAiActive={askAiActive}
            onApps={onApps}
            onNotification={onNotification}
            onProfile={onProfile}
            userInitials={userInitials}
            userAvatar={userAvatar}
          />
        )}

        <main style={{ minWidth: 0 }}>
          <div style={contentStyle}>{children}</div>
        </main>
      </div>

      {/* Tablet / mobile: the drawer the hamburger opens — also the home of
          Notification + Profile when they drop out of the top bar. */}
      {!docked && (
        <MenuDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          items={navItems}
          activeItemId={activeItemId}
          onSelect={select}
          logo={logo}
          onNotification={onNotification}
          onProfile={onProfile}
          secondaryVisible={secondaryVisible}
          width={width >= BP_MD ? 360 : 'min(86vw, 320px)'}
        />
      )}
    </div>
  );
}
