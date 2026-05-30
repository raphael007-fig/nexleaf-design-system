import { useState } from 'react';
import { TextareaInput } from './TextareaInput.jsx';
import { Btn } from '../Btn/Btn.jsx';

export default {
  title: 'Components/Forms/TextareaInput',
  component: TextareaInput,
  parameters: { layout: 'padded' },
  decorators: [Story => <div style={{ width: 400 }}><Story /></div>],
};

const SectionLabel = ({ children }) => (
  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#9e9e9e',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, marginTop: 20 }}>
    {children}
  </div>
);

// ─── All States ───────────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      <SectionLabel>Default</SectionLabel>
      <TextareaInput label="Label" placeholder="Value" />

      <SectionLabel>Required</SectionLabel>
      <TextareaInput label="Notes" required placeholder="Add notes…" />

      <SectionLabel>With value</SectionLabel>
      <TextareaInput label="Label" value="Value" />

      <SectionLabel>Hover (focus the field below)</SectionLabel>
      <TextareaInput label="Label" value="Value" />

      <SectionLabel>Focused</SectionLabel>
      <TextareaInput label="Label" value="Value" />

      <SectionLabel>Disabled</SectionLabel>
      <TextareaInput label="Label" value="Value" disabled />

      <SectionLabel>Read-only</SectionLabel>
      <TextareaInput label="Label" value="Value" readOnly />

      <SectionLabel>Error</SectionLabel>
      <TextareaInput label="Label" value="Value" error="Error message" />

      <SectionLabel>With help text</SectionLabel>
      <TextareaInput label="Label" value="Value" helpText="Help text" />

      <SectionLabel>With max length</SectionLabel>
      <TextareaInput label="Label" value="Value" maxLength={120} />

      <SectionLabel>Label action</SectionLabel>
      <TextareaInput label="Label" value="Value" labelAction="Action" onLabelAction={() => {}} />
    </div>
  ),
};

// ─── Interaction states ───────────────────────────────────────────
export const InteractionStates = {
  name: 'Interaction states',
  render: () => {
    const [notes, setNotes] = useState('');
    const [attempted, setAttempted] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Inter, sans-serif' }}>
        <TextareaInput
          label="Notes"
          required
          placeholder="Add notes about this reading…"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          error={attempted && !notes ? 'Notes are required.' : undefined}
          helpText="Describe any unusual conditions observed."
          maxLength={500}
          rows={5}
        />
        <TextareaInput
          label="Previous notes"
          value="Fridge door was left open for 2 minutes during restocking."
          readOnly
        />
        <TextareaInput
          label="System log"
          value="No access"
          disabled
        />
        <div style={{ alignSelf: 'flex-start' }}>
          <Btn variant="primary" small onClick={() => setAttempted(true)}>Save</Btn>
        </div>
      </div>
    );
  },
};

// ─── Individual stories ───────────────────────────────────────────
export const Default    = { args: { label: 'Notes', placeholder: 'Add notes…' } };
export const WithError  = { args: { label: 'Notes', value: 'Some text', error: 'This field is required.' } };
export const WithMaxLength = { args: { label: 'Description', value: 'Value', maxLength: 120 } };
export const Disabled   = { args: { label: 'Notes', value: 'Cannot edit', disabled: true } };
