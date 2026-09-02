import { useState } from 'react';
import {
  TemperatureTasksCard,
  TemperatureTasksPanel,
  SAMPLE_TEMPERATURE_TASKS,
} from './TemperatureTasksCard.jsx';
import { Btn } from '../Btn/Btn.jsx';
import { Badge } from '../Badge/Badge.jsx';

export default {
  title: 'Components/TemperatureTasksCard',
  component: TemperatureTasksCard,
  parameters: { layout: 'padded' },
};

// The card as it sits in the Home Layout 2 action row — a ~460px column.
export const Default = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <TemperatureTasksCard onRecord={(t) => console.log('Record', t)} />
    </div>
  ),
};

// "View All" opens the SlideOver — Morning / Evening / Completed tabs + a
// paginated task list. Rendered open on load for docs.
export const ViewAll = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ maxWidth: 480 }}>
        <Btn variant="secondary" onClick={() => setOpen(true)}>Open “View All”</Btn>
        <TemperatureTasksPanel
          open={open}
          onClose={() => setOpen(false)}
          tasks={SAMPLE_TEMPERATURE_TASKS}
          onRecord={(t) => console.log('Record', t)}
        />
      </div>
    );
  },
};

// All sessions cleared — the pending badge disappears and each empty tab shows
// its own message.
// Home D1b (Figma 9196:38561): "All complete" badge + one empty-state Cell.
export const AllCompleted = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <TemperatureTasksCard
        tasks={{
          morning: [],
          evening: [],
          completed: SAMPLE_TEMPERATURE_TASKS.morning.concat(SAMPLE_TEMPERATURE_TASKS.evening),
        }}
        badge={<Badge tone="warning">All complete</Badge>}
        emptyState={{ title: 'Nothing left to record today', description: 'Morning and evening complete for all 10 CCEs' }}
      />
    </div>
  ),
};

// Home D1c (Figma 9196:38686): the task list failed to load. "—" badge, muted
// text in place of the body; View All stays so the panel is still reachable.
export const LoadError = {
  name: 'Load error',
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <TemperatureTasksCard
        tasks={{ morning: [], evening: [], completed: [] }}
        errorMessage="Unavailable — couldn't load"
      />
    </div>
  ),
};

export const Loading = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <TemperatureTasksCard loading />
    </div>
  ),
};
