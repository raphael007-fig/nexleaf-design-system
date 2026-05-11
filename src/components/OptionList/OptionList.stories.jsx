import { useState } from 'react';
import { OptionList } from './OptionList.jsx';

export default {
  title: 'Components/OptionList',
  component: OptionList,
  parameters: { layout: 'centered' },
};

const LOCATIONS = [
  { value: 'apple-valley', label: 'Apple Valley' },
  { value: 'omaha',        label: 'Omaha' },
  { value: 'duluth',       label: 'Duluth' },
  { value: 'minneapolis',  label: 'Minneapolis' },
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
      { value: 'transfer',    label: 'Vaccine Transfer' },
      { value: 'vvm',         label: 'VVM Check' },
      { value: 'discarded',   label: 'Frozen Vaccine Discarded' },
      { value: 'shake',       label: 'Shake Test Conducted' },
      { value: 'maintenance', label: 'Refrigerator Maintenance' },
    ];
    return <OptionList title="Actions taken" allowMultiple options={opts} selected={val} onChange={setVal} />;
  },
};

export const WithBadges = {
  render: () => {
    const [val, setVal] = useState('all');
    const opts = [
      { value: 'all',      label: 'All',      badge: '12' },
      { value: 'active',   label: 'Active',   badge: '3' },
      { value: 'draft',    label: 'Draft',    badge: '7' },
      { value: 'archived', label: 'Archived', badge: '24' },
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
        { value: 'fridge-a', label: 'Fridge A' },
        { value: 'fridge-b', label: 'Fridge B' },
      ]},
      { title: 'Freezers', options: [
        { value: 'freezer-a', label: 'Freezer A' },
        { value: 'freezer-b', label: 'Freezer B' },
      ]},
    ];
    return <OptionList allowMultiple sections={sections} selected={val} onChange={setVal} />;
  },
};

export const WithDisabled = {
  render: () => {
    const [val, setVal] = useState('a');
    const opts = [
      { value: 'a', label: 'Available' },
      { value: 'b', label: 'Unavailable', disabled: true },
      { value: 'c', label: 'In transit' },
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
              { value: 'apple-valley', label: 'Apple Valley', description: 'Zone North' },
              { value: 'omaha',        label: 'Omaha',        description: 'Zone Central' },
              { value: 'duluth',       label: 'Duluth',       description: 'Zone North' },
              { value: 'minneapolis',  label: 'Minneapolis',  description: 'Zone Central' },
              { value: 'locked',       label: 'Restricted',   disabled: true },
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
              { value: 'vvm',         label: 'VVM Check',                  badge: 'Today' },
              { value: 'transfer',    label: 'Vaccine Transfer' },
              { value: 'shake',       label: 'Shake Test Conducted' },
              { value: 'maintenance', label: 'Refrigerator Maintenance' },
              { value: 'discarded',   label: 'Frozen Vaccine Discarded',   disabled: true },
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
              { value: 'vvm', label: 'VVM Check' },
              { value: 'transfer', label: 'Vaccine Transfer' },
              { value: 'discarded', label: 'Frozen Vaccine Discarded', disabled: true },
            ]} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>With badges + descriptions</div>
          <OptionList selected={single} onChange={setSingle}
            options={[
              { value: 'omaha', label: 'Omaha', badge: '3', description: 'Zone North' },
              { value: 'duluth', label: 'Duluth', badge: '7', description: 'Zone South' },
              { value: 'locked', label: 'Locked facility', disabled: true },
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
