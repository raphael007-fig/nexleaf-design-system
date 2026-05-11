import { useState } from 'react';
import { Tabs } from './Tabs.jsx';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
};

const DEMO_TABS = [
  { label: 'All' },
  { label: 'Active' },
  { label: 'Draft' },
  { label: 'Archived' },
];

export const Default = {
  render: () => {
    const [active, setActive] = useState(0);
    return <Tabs tabs={DEMO_TABS} activeIndex={active} onChange={setActive} />;
  },
};

export const WithBadges = {
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = [
      { label: 'All', badge: '42' },
      { label: 'Active', badge: '12' },
      { label: 'Draft', badge: '8' },
      { label: 'Archived', badge: '22' },
    ];
    return <Tabs tabs={tabs} activeIndex={active} onChange={setActive} />;
  },
};

export const WithMoreViews = {
  render: () => {
    const [active, setActive] = useState(0);
    return <Tabs tabs={DEMO_TABS} activeIndex={active} onChange={setActive} moreViews />;
  },
};

export const WithAddNew = {
  render: () => {
    const [active, setActive] = useState(0);
    return <Tabs tabs={DEMO_TABS} activeIndex={active} onChange={setActive} canAddNew />;
  },
};

export const WithActions = {
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = DEMO_TABS.map((t, i) => ({ ...t, actions: i === active }));
    return <Tabs tabs={tabs} activeIndex={active} onChange={setActive} />;
  },
};

export const Fitted = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <div style={{ width: 400 }}>
        <Tabs tabs={DEMO_TABS} activeIndex={active} onChange={setActive} fitted />
      </div>
    );
  },
};

export const InteractionStates = {
  name: 'Interaction states',
  parameters: { layout: 'padded' },
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = [
      { label: 'All', badge: '42' },
      { label: 'Active', badge: '12' },
      { label: 'Draft', badge: '8' },
      { label: 'Archived', badge: '22', disabled: false },
      { label: 'Locked', disabled: true },
    ];
    const content = [
      'Showing all 42 temperature records across all devices.',
      'Showing 12 active devices currently recording.',
      '8 draft records awaiting review.',
      '22 archived records.',
      null,
    ];

    return (
      <div style={{ fontFamily: 'Inter, sans-serif', width: 560 }}>
        <Tabs tabs={tabs} activeIndex={active} onChange={setActive} />
        <div style={{
          marginTop: 0, padding: '16px 20px',
          background: '#ffffff', border: '1px solid #e0e0e0',
          borderTop: 'none', borderRadius: '0 0 8px 8px',
          fontSize: 13, color: '#616161', minHeight: 60,
        }}>
          {content[active] ?? <span style={{ color: '#b5b5b5' }}>This tab is locked.</span>}
        </div>
      </div>
    );
  },
};

export const AllStates = {
  name: 'All States',
  render: () => {
    const [active, setActive] = useState(0);
    const [active2, setActive2] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'Inter, sans-serif' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Default</div>
          <Tabs tabs={DEMO_TABS} activeIndex={active} onChange={setActive} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>With badges</div>
          <Tabs activeIndex={active} onChange={setActive} tabs={[
            { label: 'All', badge: '42' }, { label: 'Active', badge: '12' },
            { label: 'Draft', badge: '8' }, { label: 'Archived', badge: '22' },
          ]} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>With disabled tab</div>
          <Tabs activeIndex={0} onChange={() => {}} tabs={[
            { label: 'All' }, { label: 'Active' }, { label: 'Draft', disabled: true }, { label: 'Archived' },
          ]} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Fitted (400px container)</div>
          <div style={{ width: 400 }}>
            <Tabs fitted activeIndex={active2} onChange={setActive2} tabs={[
              { label: 'Morning' }, { label: 'Evening' }, { label: 'Both' },
            ]} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>More views + Add new</div>
          <Tabs tabs={DEMO_TABS} activeIndex={active} onChange={setActive} moreViews canAddNew />
        </div>
      </div>
    );
  },
};

export const WithDisabled = {
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = [
      { label: 'All' },
      { label: 'Active' },
      { label: 'Draft', disabled: true },
      { label: 'Archived' },
    ];
    return <Tabs tabs={tabs} activeIndex={active} onChange={setActive} />;
  },
};
