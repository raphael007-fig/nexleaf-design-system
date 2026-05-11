import { useState } from 'react';
import { Accordion } from './Accordion.jsx';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  decorators: [Story => <div style={{ width: 400 }}><Story /></div>],
};

export const Collapsed = {
  args: { title: 'Morning Reading', open: false, required: true },
};

export const Expanded = {
  args: {
    title: 'Morning Reading',
    open: true,
    required: true,
    children: <p style={{ fontSize: 13, color: '#616161' }}>Form fields go here.</p>,
  },
};

export const WithContent = {
  args: {
    title: 'Evening Reading',
    open: false,
    hasContent: true,
    children: <p style={{ fontSize: 13, color: '#616161' }}>Already has data.</p>,
  },
};

export const WithDescription = {
  name: 'With description',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 400, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Closed with description</div>
        <Accordion
          title="Morning Reading"
          description="Record the temperature at the start of the day"
          required
          open={false}
        />

        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 8 }}>Open with description</div>
        <Accordion
          title="Associated Components"
          description="Primary components and accessories linked to this equipment"
          open={open}
          onToggle={() => setOpen(o => !o)}
        >
          <p style={{ fontSize: 13, color: '#303030', margin: 0 }}>Content goes here.</p>
        </Accordion>
      </div>
    );
  },
};

export const Interactive = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Accordion title="Morning Temperature Reading" required open={open} onToggle={() => setOpen(!open)}>
        <p style={{ fontSize: 13, color: '#303030' }}>Temperature: 4.5°C</p>
      </Accordion>
    );
  },
};

export const InteractionStates = {
  name: 'Interaction states',
  render: () => {
    const [openMorning, setOpenMorning] = useState(false);
    const [openEvening, setOpenEvening] = useState(false);
    const [openNotes, setOpenNotes] = useState(true);
    const [morning, setMorning] = useState('');
    const [evening, setEvening] = useState('4.1');
    const [notes, setNotes] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 400, fontFamily: 'Inter, sans-serif' }}>
        <Accordion
          title="Morning Reading"
          required
          open={openMorning}
          onToggle={() => setOpenMorning(o => !o)}
          hasContent={!!morning}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 500, color: '#303030' }}>
              Temperature (°C)
              <input
                type="number"
                placeholder="e.g. 4.5"
                value={morning}
                onChange={e => setMorning(e.target.value)}
                style={{ padding: '10px 14px', border: '1px solid #8a8a8a', borderRadius: 8, fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none' }}
              />
            </label>
          </div>
        </Accordion>

        <Accordion
          title="Evening Reading"
          required
          open={openEvening}
          onToggle={() => setOpenEvening(o => !o)}
          hasContent={!!evening}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 500, color: '#303030' }}>
              Temperature (°C)
              <input
                type="number"
                placeholder="e.g. 4.5"
                value={evening}
                onChange={e => setEvening(e.target.value)}
                style={{ padding: '10px 14px', border: '1px solid #8a8a8a', borderRadius: 8, fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none' }}
              />
            </label>
          </div>
        </Accordion>

        <Accordion
          title="Notes"
          open={openNotes}
          onToggle={() => setOpenNotes(o => !o)}
          hasContent={!!notes}
        >
          <textarea
            placeholder="Add optional notes…"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #8a8a8a', borderRadius: 8, fontSize: 13, fontFamily: 'Inter, sans-serif', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
          />
        </Accordion>
      </div>
    );
  },
};

export const AllStates = {
  name: 'All States',
  render: () => {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(true);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 400, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Closed</div>
        <Accordion title="Morning Reading" open={false} required />

        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Closed — has content (green dot)</div>
        <Accordion title="Evening Reading" open={false} hasContent />

        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Open</div>
        <Accordion title="Morning Reading" open={true} required onToggle={() => {}}>
          <p style={{ fontSize: 13, color: '#616161', margin: 0 }}>Form fields go here</p>
        </Accordion>

        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>With description</div>
        <Accordion
          title="Associated Components"
          description="Primary components and accessories linked to this equipment"
          open={false}
        />

        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Interactive</div>
        <Accordion title="Click to toggle" required open={open1} onToggle={() => setOpen1(o => !o)} hasContent={open1}>
          <p style={{ fontSize: 13, color: '#303030', margin: 0 }}>Temperature: 4.5°C</p>
        </Accordion>
      </div>
    );
  },
};
