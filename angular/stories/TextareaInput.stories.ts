import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxTextareaInputComponent } from '../projects/nexleaf-angular/src/lib/textarea-input/textarea-input.component';
import { NxTextareaInputModule } from '../projects/nexleaf-angular/src/lib/textarea-input/textarea-input.module';

/**
 * nx-textarea-input — multi-line text field. Renders the shared `.nx-field` /
 * `.nx-input` / `.nx-textarea` CSS classes.
 */
const meta: Meta<NxTextareaInputComponent> = {
  title: 'Components/Inputs/TextareaInput',
  component: NxTextareaInputComponent,
  decorators: [moduleMetadata({ imports: [NxTextareaInputModule] })],
};
export default meta;

type Story = StoryObj<NxTextareaInputComponent>;

export const States: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; max-width:360px;">
        <nx-textarea-input
          label="Notes"
          placeholder="Describe what you observed at the fridge"
          helpText="Visible to the supervising EPI officer"
        ></nx-textarea-input>
        <nx-textarea-input
          label="Reason for excursion"
          value=""
          [required]="true"
          error="A reason is required when the temperature is out of range"
        ></nx-textarea-input>
        <nx-textarea-input
          label="Notes"
          value="Fridge door was left ajar during restocking; closed and confirmed seal."
          [disabled]="true"
        ></nx-textarea-input>
      </div>
    `,
  }),
};
