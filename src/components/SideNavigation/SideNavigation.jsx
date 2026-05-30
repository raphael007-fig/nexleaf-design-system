import { useState, useMemo, useRef, useCallback } from 'react';
import { Skeleton } from '../Skeleton/Skeleton.jsx';

// ─── siblingsFor: helper for wiring the Page Title Disclosure ───────────────
//
// Given the same `items` array passed to `SideNavigation`, returns the prop
// shape `Page`'s `titleDisclosure` expects — or `null` if the current page
// has no usable siblings (so the chevron stays hidden).
//
//   const disclosure = siblingsFor(EQUIPMENT_ITEMS, 'coldchain');
//   // → { sectionTitle: 'Inventory',
//   //     activeItemId: 'coldchain',
//   //     items: [{ id: 'coldchain', ... }, { id: 'rtmds', ... }, …] }
//
// Returns `null` when:
//   • `currentId` is not a child of any group, OR
//   • the matching group has fewer than `minSiblings` children (default 2,
//     because a single-child group has nothing to switch between).
//
// Drop the result straight into `<Page titleDisclosure={…} />` — null safely
// hides the chevron without any extra guard in the consumer.

export function siblingsFor(items, currentId, { minSiblings = 2 } = {}) {
  if (!items || !currentId) return null;
  for (const item of items) {
    if (!item.children || item.children.length < minSiblings) continue;
    if (item.children.some(c => c.id === currentId)) {
      return {
        sectionTitle: typeof item.label === 'string' ? item.label : undefined,
        activeItemId: currentId,
        items: item.children.map(({ id, label, disabled }) => ({ id, label, disabled })),
      };
    }
  }
  return null;
}

// ─── Tokens used here ────────────────────────────────────────────────────────
//   bg-page (#f1f1f1)            — sidebar background
//   bg-input-focus (#fafafa)     — selected sub-item bg
//   text-default (#303030)       — primary label color
//   text-subdued (#616161)       — sub-item rest color
//   border-default (#e0e0e0)     — right edge inset shadow uses rgba(0,0,0,0.13)
//   --nx-radius-page-corner: 24  — outer rounded right corners
//   --nx-radius-item:        8   — interactive item radius
//
// All values inlined to match the project's no-Tailwind / inline-styles pattern.

const SIDEBAR_BG          = '#f1f1f1';
const ITEM_BG_HOVER       = 'rgba(0,0,0,0.05)';
const ITEM_BG_SELECTED    = '#fafafa';
const TEXT_DEFAULT        = '#303030';
const TEXT_SUBDUED        = '#616161';
const TEXT_DISABLED       = '#b5b5b5';
const GUIDE_LINE          = '#b5b5b5';
const RIGHT_EDGE_SHADOW   = 'inset -1px 0 0 0 rgba(0,0,0,0.13)';
const FOCUS_RING          = '0 0 0 2px #005bd3';
const CORNER_RADIUS       = 24;
const ITEM_RADIUS         = 8;

// Connector geometry — all guide marks share the same x column so the line
// reads as one continuous stroke from the parent's icon down to the active
// sub-item's arrowhead.
//
// Where the column sits:
//   parent button padding-left = 8 px, icon width = 20 px
//   → parent icon center = button-left + 8 + 10 = 18 px
//
// The stub, the pass-through line, and the L-curve's vertical are all 1.5 px
// wide centered on x=18 — so each one occupies screen x=17.25 → 18.75. That
// drops the connector cleanly out of the bottom of the parent's icon glyph.
const GUIDE_COL_LEFT = 17.25;
const GUIDE_COL_WIDTH = 1.5;

// L-shape "↳→" indicator on the active sub-item: vertical drop from the top
// of the row, soft curve to horizontal, then a chevron arrow pointing at the
// active label. The arrow tip lands at SVG x=17 (≈ screen x=34.25), just left
// of the 36 px label indent so the arrow visually points AT the active text.
const ActiveSubIndicator = () => (
  <svg
    width="20"
    height="19"
    viewBox="0 0 20 19"
    fill="none"
    aria-hidden="true"
    style={{
      position: 'absolute',
      left: GUIDE_COL_LEFT,
      top: 0,
      pointerEvents: 'none',
    }}
  >
    {/* L-shape: vertical from top → quadratic curve → horizontal to the arrow */}
    <path
      d="M0.75 0 V10 Q0.75 13.5, 4.25 13.5 H17"
      stroke={GUIDE_LINE}
      strokeWidth="1.5"
      strokeLinecap="butt"
      strokeLinejoin="round"
    />
    {/* Chevron arrowhead pointing right, tip at (17, 13.5) — overlapping the
        end of the horizontal stroke so the join reads as one continuous line. */}
    <path
      d="M14.5 11 L17 13.5 L14.5 16"
      stroke={GUIDE_LINE}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Full-height vertical line rendered on every rest sub-item that sits BETWEEN
// the expanded parent and the active sub-item — without these, selecting a
// later child (e.g. "Solar Equipment") leaves a visible gap between the
// parent stub and the active row's L-curve. Stacked, they form one unbroken
// stroke from the parent's icon all the way down to the arrow.
const SubItemPassthroughLine = () => (
  <span
    aria-hidden="true"
    style={{
      position: 'absolute',
      left: GUIDE_COL_LEFT,
      top: 0,
      bottom: 0,
      width: GUIDE_COL_WIDTH,
      background: GUIDE_LINE,
      pointerEvents: 'none',
    }}
  />
);

// Short vertical stub under the expanded parent row, dropping out of the
// bottom of the parent's icon glyph. Lives in the same x column
// (`GUIDE_COL_LEFT` / `GUIDE_COL_WIDTH`) as the pass-through line and the
// L-curve's vertical — declared as constants on the indicator below so they
// can't drift apart.
const ParentExpandedStub = () => (
  <span
    aria-hidden="true"
    style={{
      position: 'absolute',
      left: GUIDE_COL_LEFT,
      bottom: 0,
      width: GUIDE_COL_WIDTH,
      height: 4,
      background: GUIDE_LINE,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
    }}
  />
);

// ─── NavItem (top-level) ─────────────────────────────────────────────────────
//
// Renders one top-level row. If `children` is provided the parent is treated
// as a group: clicking it expands/collapses, and the children render directly
// below. In collapsed sidebar mode only the icon is shown and children are
// hidden — clicking the icon falls through to `onSelect` (or just expands
// behavior is suppressed since the labels aren't visible anyway).

function NavItem({
  item,
  collapsed,
  isActive,
  activeItemId,
  expanded,
  onToggleExpand,
  onSelect,
  onCollapsedChange,
  rowIndex,
  registerRow,
}) {
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const hasChildren = !!(item.children && item.children.length > 0);

  const handleClick = (e) => {
    e.preventDefault();
    if (hasChildren) {
      if (collapsed) {
        // Clicking a parent-with-children in collapsed mode auto-expands the
        // entire sidebar AND ensures the group itself is open — so the user
        // immediately sees the sub-items they came to look for. We only call
        // `onToggleExpand` when the group is currently closed; if it was
        // already open (from a previous expanded session) we leave it alone
        // so toggle doesn't accidentally close it.
        if (onCollapsedChange) onCollapsedChange(false);
        if (!expanded) onToggleExpand(item.id);
      } else {
        onToggleExpand(item.id);
      }
    }
    if (item.onClick) item.onClick();
    if (onSelect) onSelect(item.id);
  };

  // Parents (with children) and leaves both get the selected pill when active.
  // When a sub-item is the active one, `activeItemId` !== `item.id` for the
  // parent so `isActive` is false and the parent stays unhighlighted — which
  // is correct: the visual emphasis moves down to the sub-item. The parent
  // only "wins" the highlight when it itself is the active id (e.g. after a
  // collapsed-icon click that selects the parent as the landing destination).
  const isSelected = isActive;
  const showStub = hasChildren && expanded && !collapsed;

  return (
    <li style={{ listStyle: 'none', position: 'relative' }}>
      <div style={{ padding: '0 12px' }}>
        <button
          type="button"
          ref={(el) => registerRow(rowIndex, el)}
          data-nav-row-index={rowIndex}
          onClick={handleClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-current={isSelected ? 'page' : undefined}
          aria-expanded={hasChildren && !collapsed ? expanded : undefined}
          title={collapsed ? item.label : undefined}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: collapsed ? 0 : 8,
            width: '100%',
            // Vertical padding is identical in both states (4 top / 4 bottom)
            // so each row is exactly 28 px tall whether the rail is collapsed
            // or expanded. Without this, the +6 collapsed padding adds 4 px
            // per row and the whole stack shifts down on collapse, breaking
            // the visual continuity between the two layouts.
            padding: collapsed ? '4px' : '4px 4px 4px 8px',
            borderRadius: ITEM_RADIUS,
            border: 'none',
            background: isSelected
              ? ITEM_BG_SELECTED
              : hover ? ITEM_BG_HOVER : 'transparent',
            color: TEXT_DEFAULT,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: isSelected ? 650 : 550,
            letterSpacing: isSelected ? '-0.065px' : 0,
            lineHeight: '20px',
            textAlign: 'left',
            outline: 'none',
            boxShadow: focused ? FOCUS_RING : undefined,
            justifyContent: collapsed ? 'center' : 'flex-start',
            transition: 'background 0.12s, box-shadow 0.12s',
          }}
        >
          {item.icon && (
            <span
              aria-hidden="true"
              style={{
                width: 20, height: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                color: TEXT_DEFAULT,
              }}
            >
              {item.icon}
            </span>
          )}
          {!collapsed && (
            <span
              style={{
                flex: '1 0 0',
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </span>
          )}
          {showStub && <ParentExpandedStub />}
        </button>
      </div>
    </li>
  );
}

// ─── NavSubItem (indented child row) ─────────────────────────────────────────

function NavSubItem({
  child, isActive, isOnPathToActive = false, onSelect,
  rowIndex, registerRow,
}) {
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const disabled = !!child.disabled;

  return (
    <li style={{ listStyle: 'none', position: 'relative' }}>
      <div style={{ padding: '0 12px' }}>
        <button
          type="button"
          ref={(el) => registerRow(rowIndex, el)}
          data-nav-row-index={rowIndex}
          onClick={(e) => {
            e.preventDefault();
            if (disabled) return;
            if (child.onClick) child.onClick();
            if (onSelect) onSelect(child.id);
          }}
          onMouseEnter={() => !disabled && setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-current={isActive ? 'page' : undefined}
          aria-disabled={disabled ? 'true' : undefined}
          tabIndex={disabled ? -1 : undefined}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            paddingLeft: 36,
            paddingRight: 4,
            paddingTop: 4,
            paddingBottom: 4,
            borderRadius: ITEM_RADIUS,
            border: 'none',
            background: isActive
              ? ITEM_BG_SELECTED
              : (!disabled && hover) ? ITEM_BG_HOVER : 'transparent',
            color: disabled
              ? TEXT_DISABLED
              : (isActive ? TEXT_DEFAULT : TEXT_SUBDUED),
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: isActive ? 650 : 450,
            letterSpacing: isActive ? '-0.065px' : 0,
            lineHeight: '20px',
            textAlign: 'left',
            outline: 'none',
            boxShadow: focused ? FOCUS_RING : undefined,
            transition: 'background 0.12s, box-shadow 0.12s',
          }}
        >
          <span
            style={{
              flex: '1 0 0',
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {child.label}
          </span>
          {isActive && <ActiveSubIndicator />}
          {!isActive && isOnPathToActive && <SubItemPassthroughLine />}
        </button>
      </div>
    </li>
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────
// One placeholder row matching the 28 px row height. In collapsed mode shows
// a centered icon-sized square; expanded shows an icon square + a flex line.
function NavSkeletonRow({ collapsed, delay }) {
  return (
    <li style={{ listStyle: 'none' }}>
      <div style={{ padding: '0 12px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: collapsed ? 0 : 8,
            padding: collapsed ? '4px' : '4px 4px 4px 8px',
            height: 28,
            boxSizing: 'border-box',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <Skeleton width={20} height={20} radius={4} delay={delay} ariaLabel={null} />
          {!collapsed && (
            <Skeleton.Line width="70%" height={13} delay={delay} />
          )}
        </div>
      </div>
    </li>
  );
}

// ─── SideNavigation (root) ───────────────────────────────────────────────────
//
// Props:
//   items             — Array<{ id, label, icon?, onClick?, disabled?, children? }>
//                       children: Array<{ id, label, onClick?, disabled? }>
//   activeItemId      — string. The currently-selected id (top-level OR sub).
//                       If it matches a sub-item id, that sub-item is
//                       highlighted; its parent group auto-expands.
//   onSelect          — fn(id) called for any click. PREFERRED.
//   onItemSelect      — fn(id) legacy alias of `onSelect`. Both fire when set.
//   logo              — ReactNode shown at the top of the panel.
//   footer            — ReactNode shown at the bottom (optional).
//   collapsed         — boolean. When true, sidebar collapses to icon-only.
//   onCollapsedChange — fn(nextCollapsed). Called when the component itself
//                       wants to flip collapsed state. Today fires only when
//                       a collapsed parent-with-children is clicked — the
//                       sidebar then asks to expand so the user can see the
//                       sub-items immediately. Pair this with the same
//                       setter that drives `collapsed`.
//   defaultExpandedGroups — string[]. Initial expanded parent ids
//                       (uncontrolled). When `activeItemId` matches a child,
//                       its parent is auto-added to expanded set.
//   expandedGroups    — string[]. Controlled expanded ids. When passed,
//                       defaultExpandedGroups is ignored.
//   onToggleGroup     — fn(id, nextExpanded). Fired when a parent is toggled.
//   width             — number. Expanded width. Default 240.
//   collapsedWidth    — number. Default 60.
//   ariaLabel         — string. Default 'Main navigation'.
//   loading           — boolean. Renders skeleton rows in place of items.
//   skeletonRows      — number. Skeleton row count when loading. Default 6.

export function SideNavigation({
  items = [],
  activeItemId,
  onSelect,
  onItemSelect,
  logo,
  footer,
  collapsed = false,
  onCollapsedChange,
  defaultExpandedGroups,
  expandedGroups: controlledExpanded,
  onToggleGroup,
  width = 240,
  collapsedWidth = 60,
  ariaLabel = 'Main navigation',
  loading = false,
  skeletonRows = 6,
}) {
  // Compute which group(s) contain the active sub-item — these auto-expand.
  // A group whose child is currently active can't be "hidden" by the user;
  // any manual collapse is overlaid by this merge so the active row stays
  // visible. That's intentional UX, not a bug.
  const autoExpandedFromActive = useMemo(() => {
    if (!activeItemId) return [];
    const hits = [];
    for (const it of items) {
      if (it.children && it.children.some(c => c.id === activeItemId)) {
        hits.push(it.id);
      }
    }
    return hits;
  }, [items, activeItemId]);

  const [internalExpanded, setInternalExpanded] = useState(
    () => new Set(defaultExpandedGroups || [])
  );

  // Effective set = user-toggled state (controlled or internal) merged with
  // auto-expansion driven by activeItemId. Derived in render — no effects.
  const expandedSet = useMemo(() => {
    const base = controlledExpanded
      ? new Set(controlledExpanded)
      : new Set(internalExpanded);
    autoExpandedFromActive.forEach(id => base.add(id));
    return base;
  }, [controlledExpanded, internalExpanded, autoExpandedFromActive]);

  const handleToggleExpand = (id) => {
    const isOpen = expandedSet.has(id);
    if (onToggleGroup) onToggleGroup(id, !isOpen);
    if (controlledExpanded) return;
    setInternalExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Fire both onSelect (preferred) and onItemSelect (legacy alias).
  const handleSelect = useCallback((id) => {
    if (onSelect) onSelect(id);
    if (onItemSelect) onItemSelect(id);
  }, [onSelect, onItemSelect]);

  // ── Visible-row registry for keyboard navigation ───────────────────────────
  //
  // Build the ordered list of rows that are currently rendered + focusable
  // (i.e. visible). Each entry has enough metadata for the arrow-key handler
  // to do the right thing without re-walking the tree:
  //   { kind: 'parent' | 'leaf' | 'sub',
  //     id, parentId?, hasChildren, expanded, disabled }
  // The ref array is indexed in the same order so we can imperatively focus
  // by index. The flat-array model is simpler than a recursive walk and lets
  // Home/End work in O(1).
  const visibleRows = useMemo(() => {
    if (loading) return [];
    const rows = [];
    for (const item of items) {
      const hasChildren = !!(item.children && item.children.length > 0);
      const isExpanded = hasChildren && !collapsed && expandedSet.has(item.id);
      rows.push({
        kind: hasChildren ? 'parent' : 'leaf',
        id: item.id,
        hasChildren,
        expanded: isExpanded,
        disabled: !!item.disabled,
      });
      if (isExpanded) {
        for (const child of item.children) {
          rows.push({
            kind: 'sub',
            id: child.id,
            parentId: item.id,
            hasChildren: false,
            expanded: false,
            disabled: !!child.disabled,
          });
        }
      }
    }
    return rows;
  }, [items, collapsed, expandedSet, loading]);

  const rowRefs = useRef([]);
  const registerRow = useCallback((index, el) => {
    rowRefs.current[index] = el;
  }, []);

  // Focus a row by index, skipping disabled rows. `direction` is +1/-1.
  const focusRow = useCallback((index, direction = 1) => {
    const len = visibleRows.length;
    if (len === 0) return;
    let i = index;
    // Clamp to range.
    if (i < 0) i = 0;
    if (i > len - 1) i = len - 1;
    // Skip disabled by stepping in `direction` until a non-disabled row is
    // found. If we run off either end with no enabled row available, no-op.
    let guard = 0;
    while (visibleRows[i] && visibleRows[i].disabled) {
      i += direction;
      if (i < 0 || i > len - 1) return;
      if (++guard > len) return;
    }
    const el = rowRefs.current[i];
    if (el && typeof el.focus === 'function') el.focus();
  }, [visibleRows]);

  // Resolve the currently-focused row's index from `document.activeElement`.
  // Returns -1 if focus isn't on a nav row (e.g. focus is on the footer).
  const currentIndex = () => {
    if (typeof document === 'undefined') return -1;
    const active = document.activeElement;
    if (!active || !active.getAttribute) return -1;
    const raw = active.getAttribute('data-nav-row-index');
    if (raw == null) return -1;
    const n = parseInt(raw, 10);
    return Number.isNaN(n) ? -1 : n;
  };

  const handleKeyDown = (e) => {
    if (visibleRows.length === 0) return;
    const idx = currentIndex();
    if (idx < 0) return;
    const row = visibleRows[idx];
    if (!row) return;

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        focusRow(idx + 1, +1);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        focusRow(idx - 1, -1);
        break;
      }
      case 'Home': {
        e.preventDefault();
        focusRow(0, +1);
        break;
      }
      case 'End': {
        e.preventDefault();
        focusRow(visibleRows.length - 1, -1);
        break;
      }
      case 'ArrowRight': {
        // Expand a collapsed parent. Don't move focus.
        if (row.hasChildren && !row.expanded && !collapsed) {
          e.preventDefault();
          handleToggleExpand(row.id);
        }
        break;
      }
      case 'ArrowLeft': {
        if (row.kind === 'sub') {
          // Jump to the parent row.
          e.preventDefault();
          const parentIdx = visibleRows.findIndex(
            r => r.kind === 'parent' && r.id === row.parentId
          );
          if (parentIdx >= 0) focusRow(parentIdx, -1);
        } else if (row.hasChildren && row.expanded) {
          // Collapse the group; keep focus on the parent.
          e.preventDefault();
          handleToggleExpand(row.id);
        }
        break;
      }
      // Enter / Space activation is delegated to the button's native
      // behavior (click fires on Enter & Space for <button>).
      default:
        break;
    }
  };

  const currentWidth = collapsed ? collapsedWidth : width;

  // Logo skeleton (consistent with empty-state / loading visual).
  const logoSkeleton = (
    <div style={{ height: 44, width: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Skeleton width={44} height={44} radius={8} ariaLabel="Loading navigation" />
    </div>
  );

  return (
    <nav
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      style={{
        width: currentWidth,
        minHeight: '100%',
        background: SIDEBAR_BG,
        borderTopRightRadius: collapsed ? 0 : CORNER_RADIUS,
        borderBottomRightRadius: collapsed ? 0 : CORNER_RADIUS,
        boxShadow: RIGHT_EDGE_SHADOW,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: 16,
        boxSizing: 'border-box',
        fontFamily: 'Inter, sans-serif',
        transition: 'width 0.18s ease',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {(logo || loading) && (
          <div
            style={{
              // Vertical padding is constant (6 / 6) → wrapper is 56 px tall
              // in both states. Only horizontal padding shifts so the icon
              // mark fits inside the narrower collapsed rail.
              padding: collapsed ? '6px 8px' : '6px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderTopRightRadius: collapsed ? 0 : CORNER_RADIUS,
            }}
          >
            <div style={{
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {loading ? logoSkeleton : logo}
            </div>
          </div>
        )}

        {(loading || items.length === 0) ? (
          // Empty state is rendered as skeleton rows — same visual as the
          // explicit `loading` mode. Reads as "this nav is initialising"
          // rather than a dead end, which is almost always the truth in
          // production (items arrive from a fetch, not from a static array).
          // `aria-busy` lets assistive tech announce the in-progress state.
          <ul
            style={{ listStyle: 'none', margin: 0, padding: 0 }}
            role="status"
            aria-busy="true"
            aria-label="Loading navigation"
          >
            {Array.from({ length: skeletonRows }).map((_, i) => (
              <NavSkeletonRow key={i} collapsed={collapsed} delay={i * 0.08} />
            ))}
          </ul>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {(() => {
              // Walk items + (when expanded) children, assigning each row a
              // stable rowIndex matching the `visibleRows` registry above.
              const nodes = [];
              let rowIndex = 0;
              for (const item of items) {
                const hasChildren = !!(item.children && item.children.length > 0);
                const isExpandedHere = hasChildren && !collapsed && expandedSet.has(item.id);
                const myIndex = rowIndex++;
                nodes.push(
                  <NavItem
                    key={item.id}
                    item={item}
                    collapsed={collapsed}
                    isActive={activeItemId === item.id}
                    activeItemId={activeItemId}
                    expanded={expandedSet.has(item.id)}
                    onToggleExpand={handleToggleExpand}
                    onSelect={handleSelect}
                    onCollapsedChange={onCollapsedChange}
                    rowIndex={myIndex}
                    registerRow={registerRow}
                  />
                );
                if (isExpandedHere) {
                  const activeIdx = item.children.findIndex(c => c.id === activeItemId);
                  // Render children as their own <ul>, preserving the existing
                  // markup shape. Each child gets the next sequential rowIndex.
                  nodes.push(
                    <li key={`${item.id}-children`} style={{ listStyle: 'none' }}>
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {item.children.map((child, idx) => {
                          const childIndex = rowIndex++;
                          return (
                            <NavSubItem
                              key={child.id}
                              child={child}
                              isActive={child.id === activeItemId}
                              isOnPathToActive={activeIdx !== -1 && idx < activeIdx}
                              onSelect={handleSelect}
                              rowIndex={childIndex}
                              registerRow={registerRow}
                            />
                          );
                        })}
                      </ul>
                    </li>
                  );
                }
              }
              return nodes;
            })()}
          </ul>
        )}
      </div>

      {footer && (
        <div style={{ padding: collapsed ? '0 12px' : '0 12px' }}>
          {footer}
        </div>
      )}
    </nav>
  );
}
