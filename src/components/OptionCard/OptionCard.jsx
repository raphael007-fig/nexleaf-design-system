// ── Nexleaf Design System — OptionCard ───────────────────────────────────────
// A selectable illustrated card for one-of-N decisions where each option
// deserves explanation (media + title + description) — richer than a
// RadioGroup row, calmer than separate pages. Born as the monitoring-method
// chooser in the ColdTrace Add Equipment flow (Figma 8055-205358).
//
// The surface is the base Card; selection = bg-selected + 2px primary ring;
// hover = the interactive-card primary ring. Radio semantics: render a group
// wrapper with role="radiogroup" and one OptionCard per choice.
//
//   <div role="radiogroup" aria-label="How is it monitored?">
//     {options.map(o => (
//       <OptionCard key={o.id} media={o.media} title={o.title}
//         description={o.description}
//         selected={value === o.id} onSelect={() => setValue(o.id)} />
//     ))}
//   </div>

import { useState } from 'react';
import { Card } from '../Card/Card.jsx';
import {
  TEXT_DEFAULT, TEXT_DISABLED, BG_SURFACE, BG_SELECTED, BG_DISABLED,
  COLOR_PRIMARY, COLOR_PRIMARY_HOVER_SHADOW,
} from '../../tokens/index.js';

/**
 * OptionCard
 *
 * @param {React.ReactNode} [media]      Leading illustration / icon slot (e.g. 64px SVG).
 * @param {React.ReactNode} title
 * @param {React.ReactNode} [description]
 * @param {boolean} [selected=false]
 * @param {() => void} [onSelect]        Fires on click / Enter / Space.
 * @param {boolean} [disabled=false]
 */
export function OptionCard({ media, title, description, selected = false, onSelect, disabled = false }) {
  const [hov, setHov] = useState(false);
  const ring = disabled ? 'none'
    : selected ? `0 0 0 2px ${COLOR_PRIMARY}`
      : hov ? `0 0 0 1px ${COLOR_PRIMARY}, 0 2px 8px ${COLOR_PRIMARY_HOVER_SHADOW}`
        : 'none';
  return (
    <div
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onSelect}
      onKeyDown={disabled ? undefined : (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect?.(); }
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: 16, boxShadow: ring, outline: 'none',
        transition: 'box-shadow 0.15s ease',
      }}
    >
      <Card style={{
        flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16,
        borderRadius: 16,
        background: disabled ? BG_DISABLED : selected ? BG_SELECTED : BG_SURFACE,
      }}>
        {media && <div style={{ flexShrink: 0 }}>{media}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 650, lineHeight: '20px', color: disabled ? TEXT_DISABLED : TEXT_DEFAULT }}>
            {title}
          </span>
          {description && (
            <span style={{ fontSize: 12, fontWeight: 450, lineHeight: '16px', color: disabled ? TEXT_DISABLED : TEXT_DEFAULT }}>
              {description}
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}
