import { useState } from 'react';
import { Cell } from './Cell.jsx';

// Demo icon — a clipboard glyph rendered at 20px inside the green tile.
const ClipboardIcon = ({ size = 20, color = '#12B76A' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="4.25" y="3.75" width="11.5" height="13" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M7.5 3.75A1.25 1.25 0 018.75 2.5h2.5a1.25 1.25 0 011.25 1.25v.5a.75.75 0 01-.75.75h-3.5a.75.75 0 01-.75-.75v-.5z"
      stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7.5 9.5h5M7.5 12.5h3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default {
  title: 'Components/Lists/Cell',
  component: Cell,
  parameters: { layout: 'padded' },
  argTypes: {
    title:        { control: 'text' },
    description:  { control: 'text' },
    titleBadge:   { control: 'text' },
    badge:        { control: 'text' },
    buttonLabel:  { control: 'text' },
    hasRadioButton: { control: 'boolean' },
    hasToggle:    { control: 'boolean' },
    hasChevron:   { control: 'boolean' },
    state:        { control: 'inline-radio', options: ['default', 'hover'] },
    loading:      { control: 'boolean' },
    icon:         { control: false },
    onClick:      { control: false },
  },
};

const ICON = <ClipboardIcon />;

export const Default = {
  args: {
    icon: ICON,
    title: 'Equipment Manual',
    description: 'Cold chain handling & storage',
    hasChevron: true,
    onClick: () => {},
    ariaLabel: 'Equipment Manual',
  },
};

export const WithButton = {
  name: 'With button',
  args: {
    icon: ICON,
    title: 'Associated Component',
    description: 'Data Logger · ColdTrace G3',
    buttonLabel: 'View',
  },
};

export const WithTitleBadge = {
  name: 'With title badge',
  args: {
    icon: ICON,
    title: 'Equipment Manual',
    titleBadge: 'New',
    description: 'Cold chain handling & storage',
    hasChevron: true,
    onClick: () => {},
    ariaLabel: 'Equipment Manual',
  },
};

export const WithBadge = {
  name: 'With trailing badge',
  args: {
    icon: ICON,
    title: 'Associated Component',
    description: 'Data Logger · ColdTrace G3',
    badge: '3 items',
  },
};

export const TitleOnly = {
  name: 'Title only',
  args: {
    title: 'Primary Components',
    hasChevron: true,
    onClick: () => {},
    ariaLabel: 'Primary Components',
  },
};

export const Hover = {
  name: 'Hover state',
  args: {
    icon: ICON,
    title: 'Equipment Manual',
    description: 'Cold chain handling & storage',
    hasChevron: true,
    state: 'hover',
  },
};

// Interactive toggle / radio rows keep their own state.
export const WithToggle = {
  name: 'With toggle',
  render: () => {
    const [on, setOn] = useState(true);
    return (
      <Cell
        icon={ICON}
        title="Email notifications"
        description="Alerts when a reading breaches range"
        hasToggle
        toggleChecked={on}
        onToggleChange={setOn}
      />
    );
  },
};

export const WithRadio = {
  name: 'With radio (selectable list)',
  render: () => {
    const [sel, setSel] = useState('a');
    const rows = [
      { id: 'a', title: 'North Kenya', description: 'Lodwar County Hospital' },
      { id: 'b', title: 'Central Kenya', description: 'Nyeri Referral Hospital' },
      { id: 'c', title: 'Coast', description: 'Mombasa District Hospital' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
        {rows.map((r) => (
          <Cell
            key={r.id}
            title={r.title}
            description={r.description}
            hasRadioButton
            radioChecked={sel === r.id}
            onRadioChange={() => setSel(r.id)}
            onClick={() => setSel(r.id)}
            ariaLabel={r.title}
          />
        ))}
      </div>
    );
  },
};

// Loading skeleton — shape-matching placeholder.
export const Loading = {
  name: 'Loading skeleton',
  args: {
    loading: true,
  },
};

export const LoadingList = {
  name: 'Loading list',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
      {[0, 1, 2].map((i) => (
        <Cell key={i} loading />
      ))}
    </div>
  ),
};

export const AllStates = {
  name: 'All States',
  parameters: { layout: 'padded' },
  render: () => {
    const [on, setOn] = useState(true);
    const Section = ({ label, children }) => (
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          {label}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
      </div>
    );
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 520 }}>
        <Section label="Default">
          <Cell icon={ICON} title="Equipment Manual" description="Cold chain handling & storage" hasChevron onClick={() => {}} ariaLabel="Equipment Manual" />
        </Section>
        <Section label="Hover">
          <Cell icon={ICON} title="Equipment Manual" description="Cold chain handling & storage" hasChevron state="hover" />
        </Section>
        <Section label="Trailing controls">
          <Cell icon={ICON} title="With button" description="Secondary, small" buttonLabel="View" />
          <Cell icon={ICON} title="With badge" description="Default tone" badge="3 items" />
          <Cell icon={ICON} title="With title badge" titleBadge="New" description="Beside the title" hasChevron />
          <Cell icon={ICON} title="With toggle" description="Self-managed state" hasToggle toggleChecked={on} onToggleChange={setOn} />
        </Section>
        <Section label="No icon">
          <Cell title="Primary Components" hasChevron onClick={() => {}} ariaLabel="Primary Components" />
          <Cell title="Accessories" badge="2" />
        </Section>
        <Section label="Loading">
          <Cell loading />
          <Cell loading hasIcon={false} />
        </Section>
      </div>
    );
  },
};
