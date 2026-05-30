import { useState } from 'react';
import { Tag, TagGroup } from './Tag.jsx';
import { Btn } from '../Btn/Btn.jsx';

export default {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'padded' },
  decorators: [Story => <div style={{ fontFamily: 'Inter, sans-serif' }}><Story /></div>],
};

const IcoInfo = () => (
  <svg width={12} height={12} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
    <line x1="6" y1="5.5" x2="6" y2="8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="6" cy="3.6" r="0.7" fill="currentColor" />
  </svg>
);

const Row = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
    <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      {label}
    </div>
    {children}
  </div>
);

// ─── All States ───────────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      <Row label="Default tone — non-removable">
        <TagGroup>
          <Tag label="Rest" />
          <Tag label="Hover" />
          <Tag label="Focus" />
          <Tag label="Active" />
          <Tag label="Disabled" disabled />
        </TagGroup>
      </Row>

      <Row label="Default tone — removable">
        <TagGroup>
          <Tag label="Rest"     removable onRemove={() => {}} />
          <Tag label="Hover"    removable onRemove={() => {}} />
          <Tag label="Focus"    removable onRemove={() => {}} />
          <Tag label="Active"   removable onRemove={() => {}} />
          <Tag label="Disabled" removable onRemove={() => {}} disabled />
        </TagGroup>
      </Row>

      <Row label="Magic tone">
        <TagGroup>
          <Tag label="Rest"     tone="magic" />
          <Tag label="With icon" tone="magic" icon={<IcoInfo />} />
          <Tag label="Removable" tone="magic" icon={<IcoInfo />} removable onRemove={() => {}} />
          <Tag label="Removable" tone="magic" removable onRemove={() => {}} />
          <Tag label="Disabled"  tone="magic" disabled />
        </TagGroup>
      </Row>

      <Row label="With icon">
        <TagGroup>
          <Tag label="Label" icon={<IcoInfo />} />
          <Tag label="Label" icon={<IcoInfo />} removable onRemove={() => {}} />
        </TagGroup>
      </Row>

      <Row label="Group — wrapping">
        <div style={{ width: 380 }}>
          <TagGroup>
            {['Fridges','Freezers','Vaccine cold chain','Africa','Asia','Q4 2024','Active monitoring'].map(t => (
              <Tag key={t} label={t} removable onRemove={() => {}} />
            ))}
          </TagGroup>
        </div>
      </Row>

    </div>
  ),
};

// ─── Interaction states ───────────────────────────────────────────
export const InteractionStates = {
  name: 'Interaction states',
  render: () => {
    const [tags, setTags] = useState(['Fridges','Freezers','Africa','Asia']);
    const [magic, setMagic] = useState(['Smart sensor','Predictive']);
    const [saved, setSaved] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, maxWidth: 480 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Selected filters
          </div>
          <TagGroup>
            {tags.map(t => (
              <Tag key={t} label={t} removable onRemove={() => setTags(tags.filter(x => x !== t))} />
            ))}
            {tags.length === 0 && (
              <span style={{ fontSize: 13, color: '#9e9e9e', fontFamily: 'Inter, sans-serif' }}>No filters selected.</span>
            )}
          </TagGroup>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            AI-suggested tags
          </div>
          <TagGroup>
            {magic.map(t => (
              <Tag key={t} label={t} tone="magic" icon={<IcoInfo />} removable
                onRemove={() => setMagic(magic.filter(x => x !== t))} />
            ))}
          </TagGroup>
        </div>

        <div style={{ alignSelf: 'flex-start' }}>
          <Btn variant="primary" small onClick={() => setSaved(true)}>Save selection</Btn>
        </div>

        {saved && (
          <div style={{ fontSize: 12, color: '#0c5132', background: '#cdfee1', borderRadius: 8, padding: '8px 12px', alignSelf: 'flex-start' }}>
            {tags.length + magic.length} tags saved.
          </div>
        )}
      </div>
    );
  },
};

// ─── Individual stories ───────────────────────────────────────────
export const Default      = { args: { label: 'Label' } };
export const Removable    = { args: { label: 'Label', removable: true, onRemove: () => {} } };
export const Magic        = { args: { label: 'Label', tone: 'magic' } };
export const MagicWithIcon = { args: { label: 'Label', tone: 'magic', icon: <IcoInfo />, removable: true, onRemove: () => {} } };
export const WithIcon     = { args: { label: 'Label', icon: <IcoInfo /> } };
export const Disabled     = { args: { label: 'Label', disabled: true } };
export const DisabledRemovable = { args: { label: 'Label', removable: true, disabled: true, onRemove: () => {} } };
