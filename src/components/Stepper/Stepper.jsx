// ── Nexleaf Design System — Stepper ──────────────────────────────────────────
// Horizontal wizard phase stepper (Figma 84893-5520 "Step Grid").
//
// Four step states:
//   • Default   — grey ring, dark number, subdued label
//   • Active    — primary ring + primary number, dark label
//   • Completed — filled primary circle with a white check
//   • Hover     — a soft grey pill wraps the whole step (circle + label);
//                 space for the pill is always reserved so nothing shifts
//
// Steps the user has already visited can be made tappable via `navigable` +
// `onSelect` — jumping backward (or forward again) without losing state is the
// host's responsibility; the Stepper only reports the tap.
//
// Two variants:
//   • full (default) — numbered circles with labels below, dashed connectors
//   • compact        — circles only + a "Step X of Y · Label" line beneath;
//                      use when five labeled phases can't fit (< ~900px)
//
//   <Stepper
//     phases={[{ label: 'Select RTMD' }, { label: 'Configure RTMD' }]}
//     activeIndex={1}
//     navigable={[true, false]}
//     onSelect={(i) => goToPhase(i)}
//   />

import { Fragment, useState } from 'react';
import {
  TEXT_DEFAULT, TEXT_SUBDUED, TEXT_ON_PRIMARY,
  BG_SURFACE, BG_SURFACE_HOVER,
  BORDER_DEFAULT, BORDER_SECONDARY_BTN,
  COLOR_PRIMARY,
} from '../../tokens/index.js';

const Check = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="m3.5 8.5 3 3 6-6.5" stroke={TEXT_ON_PRIMARY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Stepper
 *
 * @param {{label: string}[]} phases     Ordered phases; `label` is required.
 * @param {number} [activeIndex=0]       Index of the current phase.
 * @param {boolean} [compact=false]      Circles-only variant with a summary line.
 * @param {boolean[]} [navigable=[]]     Per-phase: true → the step is tappable.
 * @param {(index:number) => void} [onSelect]  Fires when a navigable step is tapped.
 */
export function Stepper({ phases = [], activeIndex = 0, compact = false, navigable = [], onSelect }) {
  const size = compact ? 28 : 36;
  const active = phases[activeIndex];
  const [hov, setHov] = useState(-1);

  // Interaction props for one phase node. Visited phases are tappable; the
  // active phase and unvisited future phases are inert.
  const interactive = (i) => {
    const canGo = !!navigable[i] && i !== activeIndex && typeof onSelect === 'function';
    return {
      props: {
        role: canGo ? 'button' : undefined,
        tabIndex: canGo ? 0 : undefined,
        'aria-label': canGo ? `Go to step ${i + 1}: ${phases[i].label}` : undefined,
        'aria-disabled': !navigable[i] && i !== activeIndex ? true : undefined,
        onClick: canGo ? () => onSelect(i) : undefined,
        onKeyDown: canGo
          ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(i); } }
          : undefined,
        onMouseEnter: () => setHov(i),
        onMouseLeave: () => setHov(-1),
      },
      canGo,
    };
  };

  // Circle appearance comes purely from the step state; hover is expressed by
  // the pill background on the whole step, not by recolouring the circle.
  const circleStyle = (i, circleSize, fontSize) => {
    const isActive = i === activeIndex;
    const isDone = i < activeIndex;
    const ring = isActive || isDone ? COLOR_PRIMARY : BORDER_SECONDARY_BTN;
    return {
      width: circleSize, height: circleSize, borderRadius: '50%', boxSizing: 'border-box',
      border: `1.5px solid ${ring}`,
      background: isDone ? COLOR_PRIMARY : BG_SURFACE,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize, fontWeight: 600, flexShrink: 0,
      color: isDone ? TEXT_ON_PRIMARY : isActive ? COLOR_PRIMARY : TEXT_DEFAULT,
      fontFamily: 'Inter, sans-serif',
    };
  };

  if (compact) {
    return (
      <div style={{ width: '100%', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {phases.map((p, i) => {
            const isActive = i === activeIndex;
            const isDone = i < activeIndex;
            const it = interactive(i);
            return (
              <Fragment key={p.label}>
                {i > 0 && (
                  <div aria-hidden="true" style={{ flex: 1, borderTop: `2px dashed ${BORDER_DEFAULT}`, minWidth: 12, marginLeft: 6, marginRight: 6 }} />
                )}
                <div
                  aria-current={isActive ? 'step' : undefined}
                  {...it.props}
                  style={{
                    padding: 4, borderRadius: 10, flexShrink: 0,
                    background: hov === i && it.canGo ? BG_SURFACE_HOVER : 'transparent',
                    transition: 'background-color 0.12s ease',
                    cursor: it.canGo ? 'pointer' : 'default', outline: 'none',
                  }}
                >
                  <div style={circleStyle(i, size, 12)}>
                    {isDone ? <Check size={14} /> : i + 1}
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
        <p style={{ margin: '12px 0 0', fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
          Step {activeIndex + 1} of {phases.length} · <span style={{ fontWeight: 600, color: TEXT_DEFAULT }}>{active?.label}</span>
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%', fontFamily: 'Inter, sans-serif' }}>
      {phases.map((p, i) => {
        const isActive = i === activeIndex;
        const isDone = i < activeIndex;
        const it = interactive(i);
        const hovered = hov === i && it.canGo;
        return (
          <Fragment key={p.label}>
            {i > 0 && (
              <div aria-hidden="true" style={{
                flex: 1, borderTop: `2px dashed ${BORDER_DEFAULT}`,
                marginTop: 28, minWidth: 24,
              }} />
            )}
            <div
              aria-current={isActive ? 'step' : undefined}
              {...it.props}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                flexShrink: 0, minWidth: 0, maxWidth: 180,
                padding: '10px 16px', borderRadius: 12,
                background: hovered ? BG_SURFACE_HOVER : 'transparent',
                transition: 'background-color 0.12s ease',
                cursor: it.canGo ? 'pointer' : 'default', outline: 'none',
              }}
            >
              <div style={circleStyle(i, 36, 14)}>
                {isDone ? <Check size={16} /> : i + 1}
              </div>
              <span style={{
                fontSize: 13, fontWeight: isActive ? 600 : 500, lineHeight: '18px',
                color: isActive || isDone || hovered ? TEXT_DEFAULT : TEXT_SUBDUED, textAlign: 'center',
                overflowWrap: 'break-word', maxWidth: '100%',
              }}>
                {p.label}
              </span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
