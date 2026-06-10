import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxToggleComponent } from '../projects/nexleaf-angular/src/lib/toggle/toggle.component';
import { NxToggleModule } from '../projects/nexleaf-angular/src/lib/toggle/toggle.module';

/**
 * nx-toggle — switch / toggle control. Renders the shared `.nx-toggle` CSS
 * classes from the bundled @nexleaf/angular/styles.css.
 */
const meta: Meta<NxToggleComponent> = {
  title: 'Components/Toggle',
  component: NxToggleComponent,
  decorators: [moduleMetadata({ imports: [NxToggleModule] })],
};
export default meta;

type Story = StoryObj<NxToggleComponent>;

export const States: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; max-width:360px;">
        <nx-toggle label="SMS alerts"></nx-toggle>
        <nx-toggle label="Temperature excursion alarms" [checked]="true"></nx-toggle>
        <nx-toggle
          label="Daily summary report"
          [checked]="true"
          helpText="Sent to the facility supervisor at 6:00 PM"
        ></nx-toggle>
        <nx-toggle label="Remote configuration" [disabled]="true"></nx-toggle>
      </div>
    `,
  }),
};
