import { useState } from 'react';
import { OptionList } from './OptionList.jsx';

export default {
  title: 'Components/Lists/OptionList',
  component: OptionList,
  parameters: { layout: 'centered' },
};

const LOCATIONS = [
  { id: 'apple-valley', label: 'Apple Valley' },
  { id: 'omaha',        label: 'Omaha' },
  { id: 'duluth',       label: 'Duluth' },
  { id: 'minneapolis',  label: 'Minneapolis' },
];

export const SingleSelect = {
  render: () => {
    const [val, setVal] = useState('omaha');
    return <OptionList title="Location" options={LOCATIONS} selected={val} onChange={setVal} />;
  },
};

export const MultiSelect = {
  render: () => {
    const [val, setVal] = useState(['vvm', 'maintenance']);
    const opts = [
      { id: 'transfer',    label: 'Vaccine Transfer' },
      { id: 'vvm',         label: 'VVM Check' },
      { id: 'discarded',   label: 'Frozen Vaccine Discarded' },
      { id: 'shake',       label: 'Shake Test Conducted' },
      { id: 'maintenance', label: 'Refrigerator Maintenance' },
    ];
    return <OptionList title="Actions taken" allowMultiple options={opts} selected={val} onChange={setVal} />;
  },
};

export const WithBadges = {
  render: () => {
    const [val, setVal] = useState('all');
    const opts = [
      { id: 'all',      label: 'All',      badge: '12' },
      { id: 'active',   label: 'Active',   badge: '3' },
      { id: 'draft',    label: 'Draft',    badge: '7' },
      { id: 'archived', label: 'Archived', badge: '24' },
    ];
    return <OptionList options={opts} selected={val} onChange={setVal} />;
  },
};

export const WithMedia = {
  render: () => {
    const [val, setVal] = useState('label2');
    const opts = LOCATIONS.map(o => ({ ...o, media: true }));
    return <OptionList options={opts} selected={val} onChange={setVal} />;
  },
};

export const WithSections = {
  render: () => {
    const [val, setVal] = useState([]);
    const sections = [
      { title: 'Refrigerators', options: [
        { id: 'fridge-a', label: 'Fridge A' },
        { id: 'fridge-b', label: 'Fridge B' },
      ]},
      { title: 'Freezers', options: [
        { id: 'freezer-a', label: 'Freezer A' },
        { id: 'freezer-b', label: 'Freezer B' },
      ]},
    ];
    return <OptionList allowMultiple sections={sections} selected={val} onChange={setVal} />;
  },
};

export const WithDisabled = {
  render: () => {
    const [val, setVal] = useState('a');
    const opts = [
      { id: 'a', label: 'Available' },
      { id: 'b', label: 'Unavailable', disabled: true },
      { id: 'c', label: 'In transit' },
    ];
    return <OptionList options={opts} selected={val} onChange={setVal} />;
  },
};

export const InteractionStates = {
  name: 'Interaction states',
  parameters: { layout: 'padded' },
  render: () => {
    const [location, setLocation] = useState('omaha');
    const [actions, setActions] = useState(['vvm']);

    return (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start', fontFamily: 'Inter, sans-serif' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Single select</div>
          <OptionList
            title="Device location"
            options={[
              { id: 'apple-valley', label: 'Apple Valley', description: 'Zone North' },
              { id: 'omaha',        label: 'Omaha',        description: 'Zone Central' },
              { id: 'duluth',       label: 'Duluth',       description: 'Zone North' },
              { id: 'minneapolis',  label: 'Minneapolis',  description: 'Zone Central' },
              { id: 'locked',       label: 'Restricted',   disabled: true },
            ]}
            selected={location}
            onChange={setLocation}
          />
          <p style={{ marginTop: 8, fontSize: 12, color: '#616161' }}>Selected: <strong>{location}</strong></p>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Multi-select</div>
          <OptionList
            allowMultiple
            title="Actions taken"
            options={[
              { id: 'vvm',         label: 'VVM Check',                  badge: 'Today' },
              { id: 'transfer',    label: 'Vaccine Transfer' },
              { id: 'shake',       label: 'Shake Test Conducted' },
              { id: 'maintenance', label: 'Refrigerator Maintenance' },
              { id: 'discarded',   label: 'Frozen Vaccine Discarded',   disabled: true },
            ]}
            selected={actions}
            onChange={setActions}
          />
          <p style={{ marginTop: 8, fontSize: 12, color: '#616161' }}>
            Selected: <strong>{actions.length ? actions.join(', ') : 'none'}</strong>
          </p>
        </div>
      </div>
    );
  },
};

export const AllStates = {
  name: 'All States',
  render: () => {
    const [single, setSingle] = useState('omaha');
    const [multi, setMulti] = useState(['vvm']);
    return (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start', fontFamily: 'Inter, sans-serif' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Single select</div>
          <OptionList title="Location" options={LOCATIONS} selected={single} onChange={setSingle} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Multi-select</div>
          <OptionList allowMultiple title="Actions" selected={multi} onChange={setMulti}
            options={[
              { id: 'vvm', label: 'VVM Check' },
              { id: 'transfer', label: 'Vaccine Transfer' },
              { id: 'discarded', label: 'Frozen Vaccine Discarded', disabled: true },
            ]} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>With badges + descriptions</div>
          <OptionList selected={single} onChange={setSingle}
            options={[
              { id: 'omaha', label: 'Omaha', badge: '3', description: 'Zone North' },
              { id: 'duluth', label: 'Duluth', badge: '7', description: 'Zone South' },
              { id: 'locked', label: 'Locked facility', disabled: true },
            ]} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Error state</div>
          <OptionList options={LOCATIONS} selected={null} error="Please select a location." />
        </div>
      </div>
    );
  },
};

export const WithError = {
  render: () => (
    <OptionList options={LOCATIONS} selected={null} error="Please select a location." />
  ),
};
