import { Divider } from './Divider.jsx';

export default {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
  argTypes: { variant: { control: 'select', options: ['default', 'strong', 'subtle'] } },
};

export const Default = { args: { variant: 'default' } };
export const Strong  = { args: { variant: 'strong' } };
export const Subtle  = { args: { variant: 'subtle' } };

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400, background: '#fff', padding: 24 }}>
      <div>
        <p style={{ fontSize: 13, marginBottom: 8, color: '#616161' }}>Default</p>
        <Divider />
      </div>
      <div>
        <p style={{ fontSize: 13, marginBottom: 8, color: '#616161' }}>Strong</p>
        <Divider variant="strong" />
      </div>
      <div>
        <p style={{ fontSize: 13, marginBottom: 8, color: '#616161' }}>Subtle</p>
        <Divider variant="subtle" />
      </div>
    </div>
  ),
};
