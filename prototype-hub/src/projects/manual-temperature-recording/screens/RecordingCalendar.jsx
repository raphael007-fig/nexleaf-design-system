import React from 'react';
// SHARED SCREEN — the calendar month grid (PD-35).
// Facility group rows with equipment sub-rows and one column per day. The day
// pill carries completion as a glyph and temperature condition as fill, which
// is the July 14 revision that produced Prototype G.
//
// The day pill shares its token set with the Recording Date strip, so a change
// to one has to change the other.
import { Badge, PolarisIconImg, Skeleton } from '@ds';

const FILL = {
  within: '#cdfee1',
  above:  '#fedad9',
  below:  '#e0f0ff',
  none:   '#ffffff',
};

// Deterministic sample condition so the grid demonstrates the legend rather
// than sitting empty (an audit correction on PD-35: empty day cells meant the
// legend proved nothing).
function cellFor(rowIndex, day, upTo) {
  if (day > upTo) return { fill: 'none', glyph: null };
  const seed = (rowIndex * 7 + day * 3) % 10;
  const fill = seed < 6 ? 'within' : seed < 8 ? 'above' : 'below';
  const glyph = seed % 4 === 0 ? 'ClockIcon' : 'CheckIcon';
  return { fill, glyph };
}

export default function RecordingCalendar({
  groups = [],
  daysInMonth = 31,
  recordedUpTo = 27,
  today = 27,
  loading = false,
  emptyState,
}) {
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} />)}
      </div>
    );
  }
  if (!groups.length && emptyState) {
    return (
      <div style={{ padding: 48, textAlign: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#303030', marginBottom: 4 }}>{emptyState.heading}</div>
        <div style={{ fontSize: 13, color: '#616161' }}>{emptyState.description}</div>
      </div>
    );
  }

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const dow = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 12 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#616161', fontWeight: 500, position: 'sticky', left: 0, background: '#fff' }}>
              Equipment
            </th>
            {days.map((d) => (
              <th key={d} style={{ padding: '4px 2px', color: d === today ? '#005bd3' : '#616161', fontWeight: 500, minWidth: 22 }}>
                <div>{dow[(d - 1) % 7]}</div>
                <div>{d}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((g, gi) => (
            <React.Fragment key={g.facility}>
              <tr>
                <td colSpan={days.length + 1} style={{ padding: '8px 12px', background: '#f7f7f7', fontWeight: 600, color: '#303030' }}>
                  {g.facility} <Badge tone="default" size="small">{String(g.items.length)}</Badge>
                </td>
              </tr>
              {g.items.map((item, ri) => (
                <tr key={item.serial}>
                  <td style={{ padding: '6px 12px', color: '#303030', whiteSpace: 'nowrap', position: 'sticky', left: 0, background: '#fff' }}>
                    {item.make} {item.model}
                    <div style={{ color: '#8a8a8a', fontSize: 11 }}>{item.serial}</div>
                  </td>
                  {days.map((d) => {
                    const c = cellFor(gi * 5 + ri, d, recordedUpTo);
                    return (
                      <td key={d} style={{ padding: 1, textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 20, height: 20, borderRadius: 6,
                          background: FILL[c.fill],
                          border: d === today ? '1px solid #005bd3' : '1px solid #f0f0f0',
                        }}>
                          {c.glyph && <PolarisIconImg name={c.glyph} size={12} color="#4a4a4a" />}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
