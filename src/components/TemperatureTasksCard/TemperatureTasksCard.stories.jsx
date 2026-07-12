import { useState } from 'react';
import {
  TemperatureTasksCard,
  TemperatureTasksPanel,
  SAMPLE_TEMPERATURE_TASKS,
} from './TemperatureTasksCard.jsx';
import { Btn } from '../Btn/Btn.jsx';

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
export const AllCompleted = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <TemperatureTasksCard
        tasks={{
          morning: [],
          evening: [],
          completed: SAMPLE_TEMPERATURE_TASKS.morning.concat(SAMPLE_TEMPERATURE_TASKS.evening),
        }}
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
