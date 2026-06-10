// ── Nexleaf Design System — TopBar (synchronized responsive top navigation) ───
// ONE top navigation system that adapts to the ACTUAL available width (measured,
// not just fixed breakpoints), so it works for any viewport and any breadcrumb
// length. Ask AI stays centered as long as it fits; the moment content would
// crowd it the layout steps down — keeping the highest-priority controls and
// moving lower-priority ones into the Menu drawer (never deleting them).
//
// Three measured modes (widest → narrowest):
//   1. center-bc → Ask AI centered, breadcrumb shown on the left.
//   2. center    → breadcrumb would overlap the centered Ask AI → breadcrumb
//                  disappears; Ask AI stays centered.
//   3. flow      → the gap to the right-side controls gets tight → Ask AI shifts
//                  into the left flow and the bar re-balances (space-between).
// Notification + Profile collapse into the drawer as width tightens. Always
// kept: Menu · Logo · Ask AI · Country · App switcher. Every layout decision
// comes from ONE measurement pass (no desync).
//
//   <TopBar onMenu={open} breadcrumbs={trail} country={{code,name}}
//           onApps={…} onNotification={…} onProfile={…} />

import { useRef, useState, useLayoutEffect } from 'react';
import {
  ToolbarMenuButton, ToolbarAskAiButton, ToolbarRegionSelector,
  ToolbarIconButton, ToolbarAvatar,
} from '../Toolbar/Toolbar.jsx';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs.jsx';
import { NexleafIconLogo } from '../MenuDrawer/MenuDrawer.jsx';
import { Skeleton } from '../Skeleton/Skeleton.jsx';

const IcoGrid = ({ color = '#303030' }) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="3.5" y="3.5" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
    <rect x="11.5" y="3.5" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
    <rect x="3.5" y="11.5" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
    <rect x="11.5" y="11.5" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
  </svg>
);
const IcoBell = ({ color = '#303030' }) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 3a4 4 0 0 0-4 4c0 4-1.5 5-1.5 5h11S14 11 14 7a4 4 0 0 0-4-4ZM8.5 15a1.5 1.5 0 0 0 3 0" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

// Width → representative state (docs `state` override only).
export function topBarStateForWidth(width) {
  if (width >= 1024) return 'wide';
  if (width >= 900) return 'medium';
  if (width >= 768) return 'compact';
  return 'mobile';
}

// Forced look per state — for docs (`state` prop). Mirrors the measured stepdown.
const FORCED = {
  wide:    { mode: 'center-bc', bell: true,  profile: true,  mobileH: false, hideLogo: false },
  medium:  { mode: 'center',    bell: true,  profile: true,  mobileH: false, hideLogo: false },
  compact: { mode: 'flow',      bell: true,  profile: false, mobileH: false, hideLogo: false },
  mobile:  { mode: 'flow',      bell: false, profile: false, mobileH: true,  hideLogo: true  },
};

const GAP = 24;          // min breathing space each side of the centered Ask AI
const PAD = 32;          // bar horizontal padding budget (both sides)
const BELL_MIN = 736;    // content width to keep the bell (≈ 768 viewport)
const PROFILE_MIN = 868; // content width to keep the profile (≈ 900 viewport)

// Which lower-priority controls have overflowed OUT of the top bar at a given
// viewport width — i.e. what the Menu drawer must surface as its Secondary tier.
// Mirrors the measured stepdown (BELL_MIN / PROFILE_MIN + PAD) so the drawer
// stays IN SYNC with the bar: the bell drops below ~768, the profile below ~900.
// `true` = the control is NOT in the bar, so the drawer shows it.
export function topBarOverflowForWidth(width) {
  return {
    notification: width < BELL_MIN + PAD,    // bell hidden in bar → show in drawer
    profile: width < PROFILE_MIN + PAD,      // profile hidden in bar → show in drawer
  };
}

export function TopBar({
  onMenu,
  // Leaf mark sized to match the collapsed SideNavigation rail (44) so the
  // brand reads consistently across the top bar, rail, and drawer.
  logo = <NexleafIconLogo size={44} />,
  // When false, the hamburger + logo are omitted and the breadcrumb leads —
  // used when a docked SideNavigation rail already carries the brand + nav
  // (desktop). Defaults true (mobile/tablet drawer-first).
  showMenu = true,
  breadcrumbs = [],
  onBreadcrumbSelect,
  askAiLabel = 'Ask AI',
  askAiActive = false,
  onAskAi,
  country = { code: 'KE', name: 'Kenya' },
  onApps,
  onNotification,
  onProfile,
  userInitials = 'NA',
  userAvatar,
  state,                  // override the measured layout (for docs)
  // Swap the data-bearing bits — breadcrumb, region/country pill, and avatar —
  // for shape-matching skeletons while the page data loads. The menu button,
  // logo, Ask AI button, and app switcher are static chrome, so they stay as-is
  // (no skeleton). Uses the shared `Skeleton` primitive so the pulse matches the
  // rest of the system and the bar keeps its height (no reflow when data lands).
  loading = false,
  drawerOpen = false,
  safeArea = true,
  sticky = false,
  background = '#f1f1f1',
}) {
  const forced = state ? FORCED[state] : null;

  const barRef = useRef(null);
  const mLeft = useRef(null);   // menu + logo
  const mBc = useRef(null);     // breadcrumb
  const mAsk = useRef(null);    // Ask AI
  const mRight = useRef(null);  // full right group (country + apps + bell + profile)
  const [layout, setLayout] = useState({ mode: 'center', bell: true, profile: true, mobileH: false, hideLogo: false });

  useLayoutEffect(() => {
    if (forced) return;
    const el = barRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const recompute = () => {
      const containerW = el.clientWidth - PAD;
      const askW = mAsk.current ? mAsk.current.offsetWidth : 0;
      const leftW = mLeft.current ? mLeft.current.offsetWidth : 0;
      const bcW = mBc.current ? mBc.current.offsetWidth : 0;
      const rightW = mRight.current ? mRight.current.offsetWidth : 0; // full set (conservative)
      const avail = (containerW - askW) / 2 - GAP;

      let mode;
      if (breadcrumbs.length > 0 && bcW > 0 && (leftW + 12 + bcW) <= avail && rightW <= avail) mode = 'center-bc';
      else if (leftW <= avail && rightW <= avail) mode = 'center';
      else mode = 'flow';

      // In flow mode (Ask AI shares the row with menu/logo + the right group),
      // drop the logo when the whole row — menu + logo + Ask AI + right controls
      // — would overflow. This is what stops Ask AI and the Country selector from
      // colliding on phones. (rightW is the full set, so we err toward hiding the
      // logo a touch early rather than letting them overlap.)
      const fitGap = 8;
      const hideLogo = mode === 'flow' && (leftW + fitGap + askW + fitGap + rightW) > containerW;

      const next = {
        mode,
        bell: containerW >= BELL_MIN,
        profile: containerW >= PROFILE_MIN,
        mobileH: containerW < BELL_MIN,
        hideLogo,
      };
      setLayout((prev) =>
        (prev.mode === next.mode && prev.bell === next.bell && prev.profile === next.profile && prev.mobileH === next.mobileH && prev.hideLogo === next.hideLogo)
          ? prev : next);
    };
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    recompute();
    return () => ro.disconnect();
  }, [forced, breadcrumbs, country.code, country.name, askAiLabel]);

  const eff = forced || layout;
  const { mode, bell, profile, mobileH, hideLogo } = eff;
  const gap = mobileH ? 8 : 12;

  // ── Reusable control groups ─────────────────────────────────────────────────
  const menuBtn = <ToolbarMenuButton onClick={onMenu} ariaLabel="Open menu" expanded={drawerOpen} />;
  const logoEl = <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{logo}</span>;
  // Full menu+logo cluster — used by the offscreen measurer so the fit math is
  // stable (it always counts the logo, even when the live bar has dropped it).
  const menuLogo = (<>{menuBtn}{logoEl}</>);
  const askAiBtn = <ToolbarAskAiButton label={askAiLabel} active={askAiActive} onClick={onAskAi} />;
  // Breadcrumb → a wide single-line skeleton while loading; it occupies the same
  // start-region slot so the row keeps its shape.
  const bcEl = loading
    ? <Skeleton width={200} height={20} radius={4} ariaLabel="Loading navigation" />
    : breadcrumbs.length > 0
      ? <Breadcrumbs items={breadcrumbs} onSelect={onBreadcrumbSelect} />
      : null;
  // Fixed control order: Country · Apps · [Bell] · [Profile]. Bell/Profile drop
  // into the drawer when hidden — never deleted. While loading, the region pill
  // (~80px, 8px radius to match the pill) and the avatar (36px circle) become
  // skeletons; the app switcher / bell stay as live chrome.
  const region = loading
    ? <Skeleton width={80} height={36} radius={8} ariaLabel={null} />
    : <ToolbarRegionSelector countryCode={country.code} value={country.name} />;
  const apps = <ToolbarIconButton icon={<IcoGrid />} ariaLabel="Apps" onClick={onApps} />;
  const bellBtn = <ToolbarIconButton icon={<IcoBell />} ariaLabel="Notifications" onClick={onNotification} />;
  const profileBtn = loading
    ? <Skeleton width={36} height={36} radius="50%" ariaLabel={null} />
    : <ToolbarAvatar initials={userInitials} src={userAvatar} alt="Profile" onClick={onProfile} />;

  const centered = mode === 'center' || mode === 'center-bc';

  return (
    <div style={{
      background,
      paddingTop: safeArea ? 'var(--nx-safe-top, 0px)' : undefined,
      paddingLeft: safeArea ? 'var(--nx-safe-left, 0px)' : undefined,
      paddingRight: safeArea ? 'var(--nx-safe-right, 0px)' : undefined,
      position: sticky ? 'sticky' : undefined,
      top: sticky ? 0 : undefined,
      zIndex: sticky ? 'var(--nx-z-sticky, 100)' : undefined,
    }}>
      <header
        ref={barRef}
        role="banner"
        aria-busy={loading ? true : undefined}
        style={{
          position: 'relative', display: 'flex', alignItems: 'center', gap,
          minHeight: mobileH ? 48 : 56, padding: mobileH ? '0 12px' : '0 16px',
          background, fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', width: '100%',
        }}
      >
        {/* Left group — shrinks/clips; in flow it also carries Ask AI. */}
        <div style={{ display: 'flex', alignItems: 'center', gap, minWidth: 0, overflow: 'hidden', flex: '0 1 auto' }}>
          {/* Menu + logo are hidden when a docked rail leads (showMenu=false). */}
          {showMenu && menuBtn}
          {/* Logo is dropped on the tightest (mobile) layouts so Ask AI and the
              Country selector stop colliding — the brand still lives in the
              drawer the menu button opens. */}
          {showMenu && !hideLogo && logoEl}
          {mode === 'center-bc' && bcEl && <div style={{ minWidth: 0, overflow: 'hidden' }}>{bcEl}</div>}
          {mode === 'flow' && <span style={{ flexShrink: 0 }}>{askAiBtn}</span>}
        </div>

        {/* Ask AI — absolutely centered in the viewport for the centered modes. */}
        {centered && (
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>{askAiBtn}</div>
        )}

        {/* Right group — pinned right (margin-left:auto = space-between in flow). */}
        <div style={{ display: 'flex', alignItems: 'center', gap: mobileH ? 6 : 8, marginLeft: 'auto', flexShrink: 0 }}>
          {region}
          {apps}
          {bell && bellBtn}
          {profile && profileBtn}
        </div>

        {/* Off-screen measurer — intrinsic widths, independent of the current
            mode (so the decision can't loop). The right span always includes the
            full set, so the mode decision is conservative and never overlaps.
            Wrapped in a 0×0 overflow-hidden box so this full-width row can NOT
            extend the page's scroll width (otherwise it adds a phantom
            horizontal scrollbar on narrow screens). The inner row is absolutely
            positioned, so it still lays out at its natural width for measuring. */}
        <div aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute', top: 0, left: 0, visibility: 'hidden', pointerEvents: 'none',
              display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap,
            }}
          >
            <span ref={mLeft} style={{ display: 'inline-flex', alignItems: 'center', gap }}>{menuLogo}</span>
            <span ref={mBc} style={{ display: 'inline-flex', alignItems: 'center' }}>{bcEl}</span>
            <span ref={mAsk} style={{ display: 'inline-flex', alignItems: 'center' }}>{askAiBtn}</span>
            <span ref={mRight} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {region}{apps}{bellBtn}{profileBtn}
            </span>
          </div>
        </div>
      </header>
    </div>
  );
}
