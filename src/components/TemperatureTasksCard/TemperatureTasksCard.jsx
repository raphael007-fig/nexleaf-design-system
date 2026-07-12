// ── Nexleaf Design System — TemperatureTasksCard ─────────────────────────────
// "Today's Temperature Tasks" home widget. A sibling of the Action Card
// (CardLayoutType6): same header (icon + title + count badge + "View All"),
// same Cell rows — the ONLY difference is the trailing control. Action Required
// rows end in a chevron (navigate); temperature-task rows end in a **Record**
// button (act in place).
//
// This is pure composition — it introduces no new visual primitives. It reuses
// Card surface + header, Cell (buttonLabel="Record"), Btn, Badge, Tabs,
// Pagination, and SlideOver. "View All" opens the SlideOver with Morning /
// Evening / Completed tabs and a paginated task list, mirroring the Figma.
//
//   <TemperatureTasksCard tasks={{ morning, evening, completed }} onRecord={fn} />

import { useState } from 'react';
import { Btn } from '../Btn/Btn.jsx';
import { StatusBadge } from '../Badge/Badge.jsx';
import { Cell } from '../Cell/Cell.jsx';
import { Tabs } from '../Tabs/Tabs.jsx';
import { Pagination } from '../Pagination/Pagination.jsx';
import { SlideOver } from '../SlideOver/SlideOver.jsx';
import { Skeleton, SkeletonGroup } from '../Skeleton/Skeleton.jsx';

// Card surface shadow — identical recipe to Card / Cell so this widget shares
// the exact edge treatment as the Action Card beside it.
const CARD_SHADOW = [
  '0 1px 0 rgba(26,26,26,0.07)',
  'inset 1px 0 0 rgba(0,0,0,0.13)',
  'inset -1px 0 0 rgba(0,0,0,0.13)',
  'inset 0 -1px 0 rgba(0,0,0,0.17)',
  'inset 0 1px 0 rgba(204,204,204,0.5)',
].join(', ');

// Gauge glyph — same family as the Action Card row icons (inline SVG, no
// icon package, per the design-system constraint).
const IcoGauge = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M3 14a7 7 0 1 1 14 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="m10 14 3.2-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="10" cy="14" r="1.4" fill={color} />
  </svg>
);

// ── Sample data (also the Storybook default) ────────────────────────────────
export const SAMPLE_TEMPERATURE_TASKS = {
  morning: Array.from({ length: 6 }, (_, i) => ({
    id: `m${i + 1}`, name: 'Health Centre Fridge A', facility: 'Mombasa North Facility', session: 'Morning',
  })),
  evening: Array.from({ length: 7 }, (_, i) => ({
    id: `e${i + 1}`, name: 'Health Centre Fridge A', facility: 'Mombasa North Facility', session: 'Evening',
  })),
  completed: [],
};

// One task row: a Cell with a trailing "Record" button (vs the Action Card's
// chevron). `showSession` appends "| Morning" to the facility line, matching the
// preview row in the card; the slide-over omits it (the tab already says which).
function TaskRow({ task, onRecord, showSession = false }) {
  const description = showSession && task.session
    ? `${task.facility} | ${task.session}`
    : task.facility;
  return (
    <Cell
      icon={<IcoGauge />}
      iconTone="warning"
      title={task.name}
      description={description}
      buttonLabel="Record"
      onButtonClick={() => onRecord?.(task)}
      ariaLabel={`Record temperature for ${task.name}`}
    />
  );
}

/**
 * TemperatureTasksCard
 *
 * @param {{morning:Task[],evening:Task[],completed:Task[]}} [tasks]
 * @param {number}   [previewCount=1]   Rows shown inside the card body.
 * @param {number}   [pageSize=6]       Rows per page inside the "View All" panel.
 * @param {(task)=>void} [onRecord]     Fires when a row's Record button is clicked.
 * @param {string}   [title='Today's Temperature Tasks']
 * @param {boolean}  [loading=false]    Header + Cell-row skeleton.
 *
 * Task = { id, name, facility, session }
 */
export function TemperatureTasksCard({
  tasks = SAMPLE_TEMPERATURE_TASKS,
  previewCount = 1,
  pageSize = 6,
  onRecord,
  title = "Today's Temp. Tasks",
  loading = false,
}) {
  const [viewAllOpen, setViewAllOpen] = useState(false);

  const morning = tasks.morning ?? [];
  const evening = tasks.evening ?? [];
  const completed = tasks.completed ?? [];
  const pendingCount = morning.length + evening.length;

  const surface = {
    background: '#ffffff',
    borderRadius: 8,
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    boxShadow: CARD_SHADOW,
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
  };

  // ─── Loading skeleton — matches the Action Card's loading shape ──────────
  if (loading) {
    return (
      <div style={surface}>
        <SkeletonGroup label="Loading temperature tasks">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <Skeleton width={20} height={20} radius={4} ariaLabel={null} />
              <Skeleton width={150} height={12} radius={4} delay={0.04} ariaLabel={null} />
              <Skeleton width={72} height={20} radius={100} delay={0.08} ariaLabel={null} />
            </div>
            <Skeleton width={64} height={16} radius={4} delay={0.12} ariaLabel={null} />
          </div>
          <Cell loading />
        </SkeletonGroup>
      </div>
    );
  }

  const preview = morning.concat(evening).slice(0, previewCount);

  return (
    <>
      <div style={surface}>
        {/* Header — icon + title + pending badge + View All (ghost button) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
              <span style={{ display: 'flex', flexShrink: 0 }}><IcoGauge /></span>
              {/* Truncate with an ellipsis rather than hard-clipping under the
                  badge when the column is narrow. */}
              <span style={{ fontSize: 12, fontWeight: 550, lineHeight: '16px', color: '#303030', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {title}
              </span>
            </div>
            {pendingCount > 0 && (
              <span style={{ flexShrink: 0 }}><StatusBadge status="pending">{`${pendingCount} Pending`}</StatusBadge></span>
            )}
          </div>
          <Btn variant="ghost" onClick={() => setViewAllOpen(true)}>View All</Btn>
        </div>

        {/* Body — preview rows, each with a Record button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {preview.map((task) => (
            <TaskRow key={task.id} task={task} onRecord={onRecord} showSession />
          ))}
        </div>
      </div>

      <TemperatureTasksPanel
        open={viewAllOpen}
        onClose={() => setViewAllOpen(false)}
        title={title}
        tasks={tasks}
        pageSize={pageSize}
        onRecord={onRecord}
      />
    </>
  );
}

// ── "View All" panel ─────────────────────────────────────────────────────────
// A right SlideOver with Morning / Evening / Completed tabs + a paginated list.
// Exported separately so it can be documented / opened on its own.
export function TemperatureTasksPanel({
  open,
  onClose,
  tasks = SAMPLE_TEMPERATURE_TASKS,
  title = "Today's Temp. Tasks",
  pageSize = 6,
  onRecord,
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const [page, setPage] = useState(0);

  const groups = [
    { id: 'morning', label: 'Morning', rows: tasks.morning ?? [] },
    { id: 'evening', label: 'Evening', rows: tasks.evening ?? [] },
    { id: 'completed', label: 'Completed', rows: tasks.completed ?? [] },
  ];
  const active = groups[tabIndex];
  const pendingCount = (tasks.morning ?? []).length + (tasks.evening ?? []).length;

  const pageCount = Math.max(1, Math.ceil(active.rows.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = active.rows.slice(safePage * pageSize, safePage * pageSize + pageSize);

  const selectTab = (_id, _item, i) => { setTabIndex(i); setPage(0); };

  return (
    <SlideOver
      open={open}
      onClose={onClose}
      title={title}
      titleAccessory={pendingCount > 0 ? <StatusBadge status="pending">{`${pendingCount} Pending`}</StatusBadge> : null}
      footer={active.rows.length > pageSize ? (
        <Pagination
          hasPrevious={safePage > 0}
          hasNext={safePage < pageCount - 1}
          onPrevious={() => setPage((p) => Math.max(0, p - 1))}
          onNext={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
        />
      ) : null}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Tabs
          tabs={groups.map((g) => ({ id: g.id, label: g.label, badge: g.rows.length }))}
          activeIndex={tabIndex}
          onSelect={selectTab}
        />
        {pageRows.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pageRows.map((task) => (
              <TaskRow key={task.id} task={task} onRecord={onRecord} />
            ))}
          </div>
        ) : (
          <div style={{ padding: '32px 0', textAlign: 'center', color: '#616161', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
            {active.id === 'completed' ? 'No tasks completed yet.' : 'No tasks in this session.'}
          </div>
        )}
      </div>
    </SlideOver>
  );
}
