import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxNumberInputComponent } from '../projects/nexleaf-angular/src/lib/number-input/number-input.component';
import { NxNumberInputModule } from '../projects/nexleaf-angular/src/lib/number-input/number-input.module';

/**
 * nx-number-input — numeric field with optional prefix/suffix. Renders the
 * shared `.nx-field` / `.nx-input` CSS classes.
 */
const meta: Meta<NxNumberInputComponent> = {
  title: 'Components/Inputs/NumberInput',
  component: NxNumberInputComponent,
  decorators: [moduleMetadata({ imports: [NxNumberInputModule] })],
};
export default meta;

type Story = StoryObj<NxNumberInputComponent>;

export const States: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; max-width:360px;">
        <nx-number-input
          label="Number of vaccine vials"
          [value]="48"
        ></nx-number-input>
        <nx-number-input
          label="Temperature"
          [value]="4.5"
          suffix="°C"
          [step]="0.1"
          helpText="Safe range is 2°C to 8°C"
        ></nx-number-input>
        <nx-number-input
          label="Battery voltage"
          [value]="12.6"
          suffix="V"
          [disabled]="true"
        ></nx-number-input>
        <nx-number-input
          label="Temperature"
          [value]="15"
          suffix="°C"
          error="Reading is outside the safe range (2°C to 8°C)"
        ></nx-number-input>
      </div>
    `,
  }),
};
