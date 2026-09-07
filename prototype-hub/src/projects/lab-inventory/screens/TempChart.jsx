// ── Temperature history chart — amCharts 5 ────────────────────────────────────
// ColdTrace charts with amCharts (Raf, 2026-09-07), so the prototype does too:
// this is a real chart with a date axis, a hover cursor, tooltips and axis
// ranges — not a hand-drawn SVG that only looks like one. The library loads
// from CDN in prototype-hub/index.html (globals am5 / am5xy).
//
// Everything visual comes from DS tokens, so the chart sits in the same visual
// language as the cards around it. The acceptable band is an axis RANGE, which
// is the amCharts way of saying "this zone is configuration" — it scales and
// stays behind the series at any size.
//
// NOTE: the design system has no chart component (the canonical Storybook page
// Pages/Temperature Alert Detail hand-draws its own SVG). That is a real DS
// gap — flagged on PD-41 rather than silently patched here.
import { useEffect, useRef, useState } from 'react';
import {
  BG_INFO, BORDER_INFO, BORDER_LIGHTER, BG_HOVER,
  TEXT_SUBDUED, TEXT_PLACEHOLDER,
  COLOR_PRIMARY, COLOR_CRITICAL, COLOR_SUCCESS,
} from '@ds/tokens/index.js';

const HOUR = 60 * 60 * 1000;

/** Resolve the CDN globals — they may still be loading on first paint. */
function useAmCharts() {
  const [ready, setReady] = useState(() => typeof window !== 'undefined' && !!window.am5xy);
  useEffect(() => {
    if (ready) return undefined;
    const t = setInterval(() => {
      if (window.am5xy) { setReady(true); clearInterval(t); }
    }, 60);
    return () => clearInterval(t);
  }, [ready]);
  return ready;
}

/**
 * @param {{frac:number, temp:number}[]} points  frac 0→1 across the window.
 * @param {number} min  low threshold (configuration, never typed).
 * @param {number} max  high threshold.
 * @param {boolean} truncated  series stops early — the rest is a data gap.
 * @param {number} hours  window length; the x axis is real time.
 * @param {string} seriesName  legend/tooltip label for the plotted series.
 */
export function TempChart({
  points = [], min = 2, max = 8, truncated = false, hours = 24,
  seriesName = 'Sensor reading (RTMD)',
}) {
  const ready = useAmCharts();
  const divRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!ready || !divRef.current) return undefined;
    const { am5, am5xy } = window;
    const root = am5.Root.new(divRef.current);
    rootRef.current = root;
    root.setThemes([window.am5themes_Animated.new(root)]);
    root._logo?.dispose();
    root.interfaceColors.set('grid', am5.color(BORDER_LIGHTER));
    root.interfaceColors.set('text', am5.color(TEXT_SUBDUED));

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, panY: false, wheelX: 'none', wheelY: 'none',
      paddingLeft: 0, paddingRight: 8, paddingTop: 8, paddingBottom: 0,
      layout: root.verticalLayout,
    }));

    const now = Date.now();
    const start = now - hours * HOUR;
    const data = points.map((p) => ({ t: start + p.frac * (now - start), temp: p.temp }));

    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: { timeUnit: 'minute', count: 30 },
      renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 64, strokeOpacity: 0 }),
      tooltip: am5.Tooltip.new(root, {}),
      min: start, max: now, strictMinMax: true,
    }));
    xAxis.get('renderer').labels.template.setAll({ fontSize: 11, fill: am5.color(TEXT_PLACEHOLDER) });

    const values = [...points.map((p) => p.temp), min, max];
    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      min: Math.floor(Math.min(...values)) - 2,
      max: Math.ceil(Math.max(...values)) + 2,
      renderer: am5xy.AxisRendererY.new(root, { strokeOpacity: 0 }),
    }));
    yAxis.get('renderer').labels.template.setAll({ fontSize: 11, fill: am5.color(TEXT_PLACEHOLDER) });

    // Acceptable range — configuration drawn as an axis range, behind the line.
    const band = yAxis.createAxisRange(yAxis.makeDataItem({ value: min, endValue: max }));
    band.get('axisFill').setAll({
      fill: am5.color(BG_INFO), fillOpacity: 1, visible: true,
      stroke: am5.color(BORDER_INFO), strokeOpacity: 1, strokeDasharray: [3, 3],
    });

    // Data gap (a sensor that stopped reporting) — a shaded x-axis range that
    // says "no data" instead of letting the line imply flat readings.
    if (truncated && data.length) {
      const gapFrom = data[data.length - 1].t;
      const gap = xAxis.createAxisRange(xAxis.makeDataItem({ value: gapFrom, endValue: now }));
      gap.get('axisFill').setAll({ fill: am5.color(BG_HOVER), fillOpacity: 0.7, visible: true });
      gap.get('label').setAll({
        text: 'No data', fontSize: 11, fontWeight: '600',
        fill: am5.color(TEXT_SUBDUED), inside: true, centerY: am5.p50,
      });
    }

    const series = chart.series.push(am5xy.LineSeries.new(root, {
      name: seriesName, xAxis, yAxis, valueYField: 'temp', valueXField: 't',
      stroke: am5.color(COLOR_PRIMARY),
      tooltip: am5.Tooltip.new(root, {
        labelText: '[bold]{valueY} °C[/]\n{valueX.formatDate("HH:mm")}',
      }),
    }));
    series.strokes.template.setAll({ strokeWidth: 2 });

    // Last reading — green in range, red out of range, matching the KPI badge.
    const last = points[points.length - 1];
    if (last && !truncated) {
      series.bullets.push((r, s, dataItem) => {
        if (dataItem.dataContext !== data[data.length - 1]) return undefined;
        const out = last.temp > max || last.temp < min;
        return am5.Bullet.new(r, {
          sprite: am5.Circle.new(r, {
            radius: 5, fill: am5.color(out ? COLOR_CRITICAL : COLOR_SUCCESS),
            stroke: am5.color('#ffffff'), strokeWidth: 2,
          }),
        });
      });
    }

    chart.set('cursor', am5xy.XYCursor.new(root, { behavior: 'none', xAxis, yAxis }));
    series.data.setAll(data);
    series.appear(600);
    chart.appear(600);

    return () => { root.dispose(); rootRef.current = null; };
  }, [ready, points, min, max, truncated, hours, seriesName]);

  return (
    <div
      ref={divRef}
      role="img"
      aria-label={`Temperature history, last ${hours} hours, acceptable range ${min}–${max} °C`}
      style={{ width: '100%', height: 240 }}
    />
  );
}

/** Band + series key. amCharts owns the plot; this names what the band means. */
export function ChartLegend({ min = 2, max = 8, seriesName = 'Sensor reading (RTMD)' }) {
  const Item = ({ swatch, label }) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: TEXT_SUBDUED }}>
      {swatch}{label}
    </span>
  );
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Item
        swatch={<span style={{ width: 16, height: 2, background: COLOR_PRIMARY, display: 'inline-block', borderRadius: 1 }} />}
        label={seriesName}
      />
      <Item
        swatch={<span style={{ width: 14, height: 10, background: BG_INFO, border: `1px dashed ${BORDER_INFO}`, display: 'inline-block' }} />}
        label={`Acceptable range ${min}–${max} °C`}
      />
    </div>
  );
}
