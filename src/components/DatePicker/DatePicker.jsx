import { useState, useMemo, useRef, useEffect, useCallback } from 'react';

// ─── Helpers ──────────────────────────────────────────────────────
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WEEKDAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const WEEKDAYS_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

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
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return startOfDay(x); };
const addMonths = (d, n) => { const x = new Date(d); x.setDate(1); x.setMonth(x.getMonth() + n); const day = Math.min(d.getDate(), new Date(x.getFullYear(), x.getMonth()+1, 0).getDate()); x.setDate(day); return startOfDay(x); };
// Stable per-day key used for data-date lookups when moving focus.
const dateKey = d => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

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
function DayCell({ date, currentMonth, selected, inRange, rangeStart, rangeEnd, today, disabled, focused, onClick, onHover, onKeyDown }) {
  const [hov, setHov] = useState(false);
  const isSelected = selected || rangeStart || rangeEnd;

  let bg = 'transparent';
  let color = currentMonth ? '#303030' : '#b5b5b5';
  let borderRadius = 999;

  if (disabled) {
    color = '#b5b5b5';
  } else if (isSelected) {
    bg = '#303030'; color = '#fff';
    if (rangeStart && !rangeEnd) { borderRadius = '999px 0 0 999px'; }
    if (rangeEnd && !rangeStart) { borderRadius = '0 999px 999px 0'; }
  } else if (inRange) {
    bg = '#ebebeb'; color = '#303030'; borderRadius = 0;
  } else if (hov && currentMonth) {
    bg = '#f5f5f5';
  }

  const showTodayOutline = today && !isSelected && !inRange;
  // Roving tabindex: only the focused day in the grid is tabbable.
  const tabIndex = currentMonth ? (focused ? 0 : -1) : -1;
  const focusRing = focused ? '0 0 0 2px #005bd3' : 'none';

  return (
    <div role="gridcell"
      data-date={currentMonth ? dateKey(date) : undefined}
      aria-selected={isSelected ? true : undefined}
      aria-current={today ? 'date' : undefined}
      aria-disabled={disabled || undefined}
      aria-label={`${WEEKDAYS_FULL[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
      tabIndex={tabIndex}
      onMouseEnter={() => { setHov(true); onHover && onHover(date); }}
      onMouseLeave={() => setHov(false)}
      onClick={() => !disabled && currentMonth && onClick && onClick(date)}
      onKeyDown={onKeyDown}
      style={{
        width: 32, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 450,
        background: bg, color, borderRadius,
        cursor: disabled || !currentMonth ? 'default' : 'pointer',
        userSelect: 'none', outline: 'none',
        boxShadow: focused
          ? (showTodayOutline ? `inset 0 0 0 0.66px #8a8a8a, ${focusRing}` : focusRing)
          : (showTodayOutline ? 'inset 0 0 0 0.66px #8a8a8a' : 'none'),
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
  allowRange, minDate, maxDate, today, focusedDate,
  onDayClick, onDayHover, onDayKeyDown, showHeader, onPrev, onNext,
}) {
  const grid = useMemo(() => buildMonthGrid(year, month), [year, month]);
  // Chunk the flat 42-cell grid into six 7-day weeks so each can be a row.
  const weeks = useMemo(() => {
    const out = [];
    for (let i = 0; i < grid.length; i += 7) out.push(grid.slice(i, i + 7));
    return out;
  }, [grid]);

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

      {/* Calendar grid */}
      <div role="grid" aria-label={`${MONTHS[month]} ${year}`}
        style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Weekday header row */}
        <div role="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 32px)', gap: 0 }}>
          {WEEKDAYS.map((w, wi) => (
            <div key={w} role="columnheader" aria-label={WEEKDAYS_FULL[wi]} style={{
              width: 32, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: '#9e9e9e',
            }}>{w}</div>
          ))}
        </div>

        {/* Day rows */}
        {weeks.map((week, wi) => (
          <div key={wi} role="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 32px)', gap: 0 }}>
            {week.map(({ date, currentMonth }, i) => {
              const isSel = isSameDay(date, selected);
              const isStart = isSameDay(date, rangeStart);
              const isEnd   = isSameDay(date, rangeEnd);

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
              const isFocused = currentMonth && isSameDay(date, focusedDate);

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
                  focused={isFocused}
                  onClick={onDayClick}
                  onHover={onDayHover}
                  onKeyDown={onDayKeyDown}
                />
              );
            })}
          </div>
        ))}
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
  const rootRef = useRef(null);
  // Set after a keyboard move so the effect below can move DOM focus to the
  // newly-focused cell once React has re-rendered (and possibly shifted month).
  const pendingFocusKey = useRef(null);

  // Resolve a starting date for the cursor
  const seed = (() => {
    if (initialMonth) return new Date(initialMonth);
    if (allowRange && value?.start) return new Date(value.start);
    if (!allowRange && value)       return new Date(value);
    return new Date();
  })();
  const [cursor, setCursor] = useState({ y: seed.getFullYear(), m: seed.getMonth() });
  const [hoverDate, setHoverDate] = useState(null);
  // The day that owns tabIndex={0} in the grid (roving tabindex anchor).
  const [focusedDate, setFocusedDate] = useState(() => startOfDay(seed));

  function shiftMonth(delta) {
    const d = new Date(cursor.y, cursor.m + delta, 1);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
  }

  // True when `date` falls inside a currently displayed month grid.
  const isDisplayed = useCallback((date) => {
    const inFirst = date.getFullYear() === cursor.y && date.getMonth() === cursor.m;
    if (!multiMonth) return inFirst;
    const next = new Date(cursor.y, cursor.m + 1, 1);
    const inSecond = date.getFullYear() === next.getFullYear() && date.getMonth() === next.getMonth();
    return inFirst || inSecond;
  }, [cursor, multiMonth]);

  // Move the roving focus to `date`, scrolling the visible month into view if
  // the date isn't currently displayed. `viaKeyboard` queues a DOM .focus().
  const moveFocus = useCallback((date, viaKeyboard = true) => {
    setFocusedDate(date);
    if (!isDisplayed(date)) setCursor({ y: date.getFullYear(), m: date.getMonth() });
    if (viaKeyboard) pendingFocusKey.current = dateKey(date);
  }, [isDisplayed]);

  function handleDayClick(date) {
    setFocusedDate(date);
    if (!onChange) return;
    if (allowRange) {
      const r = value || {};
      if (!r.start || (r.start && r.end)) {
        onChange({ start: date, end: null });
        setHoverDate(null);
      } else {
        if (isBefore(date, r.start)) onChange({ start: date, end: r.start });
        else                          onChange({ start: r.start, end: date });
        setHoverDate(null);
      }
    } else {
      onChange(date);
    }
  }

  const isDisabledDate = useCallback((date) => {
    return (minDate && isBefore(date, minDate)) || (maxDate && isBefore(maxDate, date));
  }, [minDate, maxDate]);

  const handleDayKeyDown = useCallback((e) => {
    const base = focusedDate || today;
    let next = null;
    switch (e.key) {
      case 'ArrowLeft':  next = addDays(base, -1); break;
      case 'ArrowRight': next = addDays(base, +1); break;
      case 'ArrowUp':    next = addDays(base, -7); break;
      case 'ArrowDown':  next = addDays(base, +7); break;
      case 'Home':       next = addDays(base, -base.getDay()); break;        // Sunday of week
      case 'End':        next = addDays(base, 6 - base.getDay()); break;     // Saturday of week
      case 'PageUp':     next = addMonths(base, -1); break;
      case 'PageDown':   next = addMonths(base, +1); break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isDisabledDate(base)) handleDayClick(base);
        return;
      default:
        return;
    }
    e.preventDefault();
    if (next) moveFocus(next, true);
  }, [focusedDate, today, moveFocus, isDisabledDate]);

  // After a keyboard move, push DOM focus onto the matching cell.
  useEffect(() => {
    const key = pendingFocusKey.current;
    if (!key || !rootRef.current) return;
    const el = rootRef.current.querySelector(`[data-date="${key}"]`);
    if (el) el.focus();
    pendingFocusKey.current = null;
  });

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

  const sharedMonthProps = {
    selected: selectedSingle,
    rangeStart, rangeEnd, hoverDate, allowRange,
    minDate, maxDate, today, focusedDate,
    onDayClick: handleDayClick,
    onDayHover: allowRange ? setHoverDate : undefined,
    onDayKeyDown: handleDayKeyDown,
  };

  // Layout
  if (multiMonth && verticalStack) {
    return (
      <div ref={rootRef} style={cardStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {months.map((mm, i) => (
            <MonthView key={i} year={mm.y} month={mm.m} {...sharedMonthProps}
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
      <div ref={rootRef} style={cardStyle}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          {months.map((mm, i) => (
            <MonthView key={i} year={mm.y} month={mm.m} {...sharedMonthProps}
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
    <div ref={rootRef} style={cardStyle}>
      <MonthView year={cursor.y} month={cursor.m} {...sharedMonthProps}
        showHeader
        onPrev={() => shiftMonth(-1)}
        onNext={() => shiftMonth(+1)}
      />
    </div>
  );
}
