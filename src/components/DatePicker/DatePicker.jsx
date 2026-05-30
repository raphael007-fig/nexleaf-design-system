import { useState, useMemo } from 'react';

// ─── Helpers ──────────────────────────────────────────────────────
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WEEKDAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const startOfDay = d => { const n = new Date(d); n.setHours(0,0,0,0); return n; };
const isSameDay  = (a,b) => a && b && startOfDay(a).getTime() === startOfDay(b).getTime();
const isBefore   = (a,b) => startOfDay(a).getTime() <  startOfDay(b).getTime();
const isBetween  = (d,a,b) => {
  if (!a || !b) return false;
  const t = startOfDay(d).getTime();
  const lo = Math.min(startOfDay(a).getTime(), startOfDay(b).getTime());
  const hi = Math.max(startOfDay(a).getTime(), startOfDay(b).getTime());
  return t > lo && t < hi;
};

function buildMonthGrid(year, month) {
  // returns 6×7 grid of { date, currentMonth }
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay()); // back to previous Sunday
  const grid = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    grid.push({ date: d, currentMonth: d.getMonth() === month });
  }
  return grid;
}

// ─── Icon arrows ──────────────────────────────────────────────────
const IcoArrowLeft = ({ color = '#303030' }) => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8l5 5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IcoArrowRight = ({ color = '#303030' }) => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <path d="M6 3l5 5-5 5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Single day cell ──────────────────────────────────────────────
function DayCell({ date, currentMonth, selected, inRange, rangeStart, rangeEnd, today, disabled, onClick, onHover }) {
  const [hov, setHov] = useState(false);
  const isSelected = selected || rangeStart || rangeEnd;

  let bg = 'transparent';
  let color = currentMonth ? '#303030' : '#b5b5b5';
  let borderRadius = 999;
  let leftCap = false, rightCap = false;

  if (disabled) {
    color = '#b5b5b5';
  } else if (isSelected) {
    bg = '#303030'; color = '#fff';
    if (rangeStart && !rangeEnd) { borderRadius = '999px 0 0 999px'; leftCap = true; }
    if (rangeEnd && !rangeStart) { borderRadius = '0 999px 999px 0'; rightCap = true; }
  } else if (inRange) {
    bg = '#ebebeb'; color = '#303030'; borderRadius = 0;
  } else if (hov && currentMonth) {
    bg = '#f5f5f5';
  }

  const showTodayOutline = today && !isSelected && !inRange;

  return (
    <div
      onMouseEnter={() => { setHov(true); onHover && onHover(date); }}
      onMouseLeave={() => setHov(false)}
      onClick={() => !disabled && currentMonth && onClick && onClick(date)}
      style={{
        width: 32, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 450,
        background: bg, color, borderRadius,
        cursor: disabled || !currentMonth ? 'default' : 'pointer',
        userSelect: 'none',
        boxShadow: showTodayOutline ? 'inset 0 0 0 0.66px #8a8a8a' : 'none',
        fontFamily: 'Inter, sans-serif',
        transition: 'background 0.12s',
      }}
    >
      {date.getDate()}
    </div>
  );
}

// ─── Month view ───────────────────────────────────────────────────
function MonthView({
  year, month, selected, rangeStart, rangeEnd, hoverDate,
  allowRange, minDate, maxDate, today,
  onDayClick, onDayHover, showHeader, onPrev, onNext,
}) {
  const grid = useMemo(() => buildMonthGrid(year, month), [year, month]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Header */}
      {showHeader && (
        <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 32px', alignItems: 'center', height: 32 }}>
          {onPrev ? (
            <button onClick={onPrev} aria-label="Previous month"
              style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', padding: 0,
                fontFamily: 'Inter, sans-serif' }}>
              <IcoArrowLeft />
            </button>
          ) : <span />}
          <div style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: '#303030' }}>
            {MONTHS[month]} {year}
          </div>
          {onNext ? (
            <button onClick={onNext} aria-label="Next month"
              style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', padding: 0, justifySelf: 'end',
                fontFamily: 'Inter, sans-serif' }}>
              <IcoArrowRight />
            </button>
          ) : <span />}
        </div>
      )}

      {/* Weekday row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 32px)', gap: 0 }}>
        {WEEKDAYS.map(w => (
          <div key={w} style={{
            width: 32, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: '#9e9e9e',
          }}>{w}</div>
        ))}
      </div>

      {/* Days */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 32px)', gap: 0 }}>
        {grid.map(({ date, currentMonth }, i) => {
          const isSel = isSameDay(date, selected);
          const isStart = isSameDay(date, rangeStart);
          const isEnd   = isSameDay(date, rangeEnd);

          // hover range preview
          let between = false;
          if (allowRange && rangeStart && !rangeEnd && hoverDate) {
            between = isBetween(date, rangeStart, hoverDate);
          } else if (rangeStart && rangeEnd) {
            between = isBetween(date, rangeStart, rangeEnd);
          }

          const isToday = isSameDay(date, today);
          const beforeMin = minDate && isBefore(date, minDate);
          const afterMax  = maxDate && isBefore(maxDate, date);
          const disabled = beforeMin || afterMax;

          return (
            <DayCell
              key={i}
              date={date}
              currentMonth={currentMonth}
              selected={isSel}
              inRange={between && currentMonth}
              rangeStart={isStart && currentMonth}
              rangeEnd={isEnd && currentMonth}
              today={isToday}
              disabled={disabled}
              onClick={onDayClick}
              onHover={onDayHover}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────
export function DatePicker({
  value, onChange,
  allowRange = false,
  multiMonth = false,
  verticalStack = false,
  minDate, maxDate,
  initialMonth,
}) {
  const today = useMemo(() => startOfDay(new Date()), []);

  // Resolve a starting date for the cursor
  const seed = (() => {
    if (initialMonth) return new Date(initialMonth);
    if (allowRange && value?.start) return new Date(value.start);
    if (!allowRange && value)       return new Date(value);
    return new Date();
  })();
  const [cursor, setCursor] = useState({ y: seed.getFullYear(), m: seed.getMonth() });
  const [hoverDate, setHoverDate] = useState(null);

  function shiftMonth(delta) {
    const d = new Date(cursor.y, cursor.m + delta, 1);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
  }

  function handleDayClick(date) {
    if (!onChange) return;
    if (allowRange) {
      const r = value || {};
      // No start, or both set → start new range
      if (!r.start || (r.start && r.end)) {
        onChange({ start: date, end: null });
        setHoverDate(null);
      } else {
        // Has start, no end → set end, normalize
        if (isBefore(date, r.start)) onChange({ start: date, end: r.start });
        else                          onChange({ start: r.start, end: date });
        setHoverDate(null);
      }
    } else {
      onChange(date);
    }
  }

  const rangeStart = allowRange ? value?.start : null;
  const rangeEnd   = allowRange ? value?.end   : null;
  const selectedSingle = !allowRange ? value : null;

  // Build months to show
  const months = [{ y: cursor.y, m: cursor.m }];
  if (multiMonth) {
    const next = new Date(cursor.y, cursor.m + 1, 1);
    months.push({ y: next.getFullYear(), m: next.getMonth() });
  }

  const cardStyle = {
    background: '#fdfdfd',
    border: '0.66px solid #e0e0e0',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Inter, sans-serif',
    display: 'inline-block',
  };

  // Layout
  if (multiMonth && verticalStack) {
    return (
      <div style={cardStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {months.map((mm, i) => (
            <MonthView
              key={i}
              year={mm.y} month={mm.m}
              selected={selectedSingle}
              rangeStart={rangeStart} rangeEnd={rangeEnd}
              hoverDate={hoverDate}
              allowRange={allowRange}
              minDate={minDate} maxDate={maxDate} today={today}
              onDayClick={handleDayClick}
              onDayHover={allowRange ? setHoverDate : undefined}
              showHeader
              onPrev={i === 0 ? () => shiftMonth(-1) : undefined}
              onNext={i === months.length - 1 ? () => shiftMonth(+1) : undefined}
            />
          ))}
        </div>
      </div>
    );
  }

  if (multiMonth) {
    return (
      <div style={cardStyle}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          {months.map((mm, i) => (
            <MonthView
              key={i}
              year={mm.y} month={mm.m}
              selected={selectedSingle}
              rangeStart={rangeStart} rangeEnd={rangeEnd}
              hoverDate={hoverDate}
              allowRange={allowRange}
              minDate={minDate} maxDate={maxDate} today={today}
              onDayClick={handleDayClick}
              onDayHover={allowRange ? setHoverDate : undefined}
              showHeader
              onPrev={i === 0 ? () => shiftMonth(-1) : undefined}
              onNext={i === months.length - 1 ? () => shiftMonth(+1) : undefined}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <MonthView
        year={cursor.y} month={cursor.m}
        selected={selectedSingle}
        rangeStart={rangeStart} rangeEnd={rangeEnd}
        hoverDate={hoverDate}
        allowRange={allowRange}
        minDate={minDate} maxDate={maxDate} today={today}
        onDayClick={handleDayClick}
        onDayHover={allowRange ? setHoverDate : undefined}
        showHeader
        onPrev={() => shiftMonth(-1)}
        onNext={() => shiftMonth(+1)}
      />
    </div>
  );
}
