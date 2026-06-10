import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxTextInputComponent } from '../projects/nexleaf-angular/src/lib/text-input/text-input.component';
import { NxTextInputModule } from '../projects/nexleaf-angular/src/lib/text-input/text-input.module';

/**
 * nx-text-input — single-line text field. Renders the shared `.nx-field` /
 * `.nx-input` CSS classes from the bundled @nexleaf/angular/styles.css.
 */
const meta: Meta<NxTextInputComponent> = {
  title: 'Components/Inputs/TextInput',
  component: NxTextInputComponent,
  decorators: [moduleMetadata({ imports: [NxTextInputModule] })],
};
export default meta;

type Story = StoryObj<NxTextInputComponent>;

export const States: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; max-width:360px;">
        <nx-text-input
          label="Facility name"
          placeholder="e.g. Lilongwe District Hospital"
        ></nx-text-input>
        <nx-text-input
          label="Device serial number"
          value="CT5-02841"
        ></nx-text-input>
        <nx-text-input
          label="Assigned technician"
          value="A. Banda"
          [disabled]="true"
        ></nx-text-input>
        <nx-text-input
          label="Contact phone"
          value="12345"
          error="Enter a valid phone number"
        ></nx-text-input>
        <nx-text-input
          label="Fridge ID"
          placeholder="e.g. FR-104"
          [required]="true"
          helpText="Printed on the label inside the fridge door"
        ></nx-text-input>
      </div>
    `,
  }),
};
