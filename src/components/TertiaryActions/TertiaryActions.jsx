// ── Nexleaf Design System — TertiaryActions (state-driven record actions) ─────
// The action pattern for a tertiary (record/detail) page. Renders exactly two
// controls — a contextual PRIMARY action + a MORE button. The primary action is
// driven by equipment state (never hardcoded to Edit Information): when the
// equipment has an issue, the primary guides the user toward resolving it.
//
//   Functional      → Edit Information
//   Faulty          → Create Service Request
//   Unknown         → View Monitoring Issue
//   Decommissioning → Review Decommissioning
//
// On mobile, More opens a BottomSheet; on desktop/wide tablet, a Popover menu.
//
//   <TertiaryActions state="faulty" onAction={(id) => route(id)} />

import { useRef, useState } from 'react';
import { Btn } from '../Btn/Btn.jsx';
import { BottomSheet } from '../BottomSheet/BottomSheet.jsx';
import { Popover } from '../Popover/Popover.jsx';
import { useIsMobile } from '../../foundation/useViewport.js';
import { TEXT_DEFAULT, COLOR_CRITICAL, BG_HOVER } from '../../tokens/index.js';

const A = (id, label, extra) => ({ id, label, ...extra });

// Canonical state → { primary, more } map. The single source of truth for which
// action leads on a record page and what overflows into More.
export const TERTIARY_ACTION_MAP = {
  functional: {
    primary: A('edit', 'Edit Information'),
    more: [
      A('view-summary', 'View Summary'),
      A('create-service-request', 'Create Service Request'),
      A('view-plot', 'View Plot'),
      A('view-daily-summary', 'View Daily Summary'),
      A('assign-qr', 'Assign QR Code'),
    ],
  },
  faulty: {
    primary: A('create-service-request', 'Create Service Request'),
    more: [
      A('edit', 'Edit Information'),
      A('view-open-issues', 'View Open Issues'),
      A('view-plot', 'View Plot'),
      A('view-daily-summary', 'View Daily Summary'),
      A('assign-qr', 'Assign QR Code'),
    ],
  },
  unknown: {
    primary: A('view-monitoring-issue', 'View Monitoring Issue'),
    more: [
      A('edit', 'Edit Information'),
      A('create-service-request', 'Create Service Request'),
      A('view-plot', 'View Plot'),
      A('view-daily-summary', 'View Daily Summary'),
      A('assign-qr', 'Assign QR Code'),
    ],
  },
  decommissioning: {
    primary: A('review-decommissioning', 'Review Decommissioning'),
    more: [
      A('edit', 'Edit Information'),
      A('create-service-request', 'Create Service Request'),
      A('view-history', 'View History'),
      A('export-record', 'Export Record'),
    ],
  },
};

// Normalize a few aliases onto the four canonical states.
function resolveState(state) {
  const key = String(state ?? '').toLowerCase();
  if (key === 'active') return 'functional';
  if (key === 'approaching decommissioning' || key === 'approaching-decommissioning' || key === 'decommissioned') return 'decommissioning';
  return TERTIARY_ACTION_MAP[key] ? key : 'functional';
}

/** Returns { primary, more } for a given equipment state (no rendering). */
export function getTertiaryActions(state) {
  return TERTIARY_ACTION_MAP[resolveState(state)];
}

// Desktop Popover menu row.
function MenuRow({ label, destructive, onClick }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      onMouseEnter={(e) => { e.currentTarget.style.background = BG_HOVER; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      style={{
        display: 'flex', alignItems: 'center', width: '100%', minHeight: 40,
        padding: '8px 12px', background: 'transparent', border: 'none', cursor: 'pointer',
        textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
        color: destructive ? COLOR_CRITICAL : TEXT_DEFAULT, borderRadius: 6,
      }}
    >
      {label}
    </button>
  );
}

export function TertiaryActions({
  state,
  onAction,
  mobile,                 // override; defaults to useIsMobile()
  moreLabel = 'More',
  primaryVariant = 'primary',
  groups,                 // optional grouped more-actions for the mobile sheet
  fullWidth,              // override; off by default (compact, like desktop)
}) {
  const autoMobile = useIsMobile();
  const isMobile = mobile ?? autoMobile;
  const cfg = getTertiaryActions(state);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const moreRef = useRef(null);

  const fire = (id) => { onAction?.(id); };
  // Compact by default at every size — the SAME [Primary][More ▾] pair as
  // desktop; mobile only differs by the taller `large` touch height. Callers
  // can still opt into full-width by passing `fullWidth`.
  const stretch = fullWidth ?? false;

  return (
    <div style={{ display: 'flex', gap: 8, width: stretch ? '100%' : undefined }}>
      <Btn
        variant={primaryVariant}
        fullWidth={stretch}
        size={isMobile ? 'large' : 'medium'}
        onClick={() => fire(cfg.primary.id)}
      >
        {cfg.primary.label}
      </Btn>

      {isMobile ? (
        <>
          <Btn variant="secondary" fullWidth={stretch} size="large" disclosure onClick={() => setSheetOpen(true)}>
            {moreLabel}
          </Btn>
          <BottomSheet
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            title="Actions"
            groups={groups
              ? groups.map((g) => ({ ...g, actions: g.actions.map((a) => ({ ...a, onClick: () => fire(a.id) })) }))
              : undefined}
            actions={groups ? undefined : cfg.more.map((a) => ({ ...a, onClick: () => fire(a.id) }))}
          />
        </>
      ) : (
        <>
          <span ref={moreRef} style={{ display: 'inline-flex' }}>
            <Btn variant="secondary" disclosure onClick={() => setMenuOpen((o) => !o)}>
              {moreLabel}
            </Btn>
          </span>
          <Popover
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            anchorRef={moreRef}
            placement="bottom-end"
            role="menu"
            ariaLabel="More actions"
          >
            <div style={{ padding: 4, minWidth: 220 }}>
              {cfg.more.map((a) => (
                <MenuRow
                  key={a.id}
                  label={a.label}
                  destructive={a.destructive}
                  onClick={() => { setMenuOpen(false); fire(a.id); }}
                />
              ))}
            </div>
          </Popover>
        </>
      )}
    </div>
  );
}
