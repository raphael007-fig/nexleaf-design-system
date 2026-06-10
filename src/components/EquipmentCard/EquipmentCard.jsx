// ── Nexleaf Design System — EquipmentCard (mobile list card) ──────────────────
// On mobile, table-heavy equipment lists become cards. Each card shows only the
// decision-critical fields and keeps the distinct status dimensions clearly
// separated (Health / Maintenance / Lifecycle) — never a copy of every desktop
// column. The whole card is tappable and routes to the record (tertiary) page.
//
//   <EquipmentCard
//     name="Vestfrost MK 144" type="Vaccine Freezer"
//     serial="DCM-2024-001" facility="Mombasa"
//     health="functional" maintenance="upcoming" lifecycle="approaching decommissioning"
//     onClick={() => goTo(id)} />

import { useState } from 'react';
import { StatusBadge } from '../Badge/Badge.jsx';
import { Skeleton } from '../Skeleton/Skeleton.jsx';
import {
  TEXT_DEFAULT, TEXT_SUBDUED, BORDER_DEFAULT,
  COLOR_PRIMARY, COLOR_PRIMARY_HOVER_SHADOW, BG_SURFACE, BG_SURFACE_ACTIVE,
} from '../../tokens/index.js';

const IcoChevron = ({ color = TEXT_SUBDUED }) => (
  <svg width={18} height={18} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7.5 5l5 5-5 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoFridge = ({ color = TEXT_SUBDUED }) => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="6" y="3" width="12" height="18" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M6 10h12M9 6v2M9 13v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoPin = ({ color = TEXT_SUBDUED }) => (
  <svg width={14} height={14} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 17s5-4.5 5-9a5 5 0 1 0-10 0c0 4.5 5 9 5 9Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    <circle cx="10" cy="8" r="1.6" stroke={color} strokeWidth="1.4" />
  </svg>
);

// Shared card container styles (used by both the data card and the skeleton),
// so the loading placeholder is the same shape/size and the list never reflows.
const cardShell = {
  display: 'flex', gap: 12, alignItems: 'flex-start', width: '100%',
  padding: 12, background: BG_SURFACE, borderRadius: 8,
  fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
};

export function EquipmentCard({
  name,
  type,
  serial,
  facility,
  image,
  icon,
  health,
  maintenance,
  lifecycle,
  onClick,
  ariaLabel,
  // Render a shape-matching skeleton in place of the content (list still loading).
  loading = false,
  // Force the interactive look in docs: 'default' | 'hover'.
  state = 'default',
}) {
  const [hover, setHover] = useState(false);
  const interactive = typeof onClick === 'function';

  if (loading) {
    return (
      <div style={{ ...cardShell, border: `1px solid ${BORDER_DEFAULT}` }} aria-busy="true" aria-label="Loading equipment">
        <Skeleton width={48} height={48} radius={8} ariaLabel="Loading equipment" />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 2 }}>
          <Skeleton width="60%" height={12} ariaLabel={null} />
          <Skeleton width="85%" height={11} ariaLabel={null} />
          <Skeleton width="45%" height={11} ariaLabel={null} />
          <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
            <Skeleton width={70} height={18} radius={100} ariaLabel={null} />
            <Skeleton width={58} height={18} radius={100} ariaLabel={null} />
          </div>
        </div>
      </div>
    );
  }

  // Hover ring shows on real hover (interactive) or when forced via `state`.
  const showHover = state === 'hover' || (hover && interactive);

  return (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={ariaLabel || name}
      onClick={onClick}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...cardShell,
        border: `1px solid ${showHover ? COLOR_PRIMARY : BORDER_DEFAULT}`,
        boxShadow: showHover ? `0 0 0 1px ${COLOR_PRIMARY_HOVER_SHADOW}` : 'none',
        cursor: interactive ? 'pointer' : 'default', textAlign: 'left',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: 48, height: 48, borderRadius: 8, flexShrink: 0, overflow: 'hidden',
        background: BG_SURFACE_ACTIVE, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {image
          ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : (icon || <IcoFridge />)}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{
            flex: 1, minWidth: 0, fontSize: 14, fontWeight: 650, color: TEXT_DEFAULT,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {name}
          </span>
          {interactive && <span style={{ flexShrink: 0, marginTop: 1 }}><IcoChevron /></span>}
        </div>

        {(type || serial) && (
          <span style={{
            fontSize: 13, fontWeight: 450, color: TEXT_SUBDUED,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {[type, serial].filter(Boolean).join(' · ')}
          </span>
        )}

        {facility && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 450, color: TEXT_SUBDUED }}>
            <IcoPin /> {facility}
          </span>
        )}

        {/* Status dimensions — clearly separated, text + color (never color alone) */}
        {(health || maintenance || lifecycle) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 }}>
            {health && <StatusBadge status={health} />}
            {maintenance && <StatusBadge status={maintenance} />}
            {lifecycle && <StatusBadge status={lifecycle} />}
          </div>
        )}
      </div>
    </div>
  );
}
