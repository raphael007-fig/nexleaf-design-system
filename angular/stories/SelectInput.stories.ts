import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxSelectInputComponent } from '../projects/nexleaf-angular/src/lib/select-input/select-input.component';
import { NxSelectInputModule } from '../projects/nexleaf-angular/src/lib/select-input/select-input.module';

/**
 * nx-select-input — native dropdown select. Renders the shared `.nx-field` /
 * `.nx-input` CSS classes.
 *
 * Note: the component has no `error` input, so no error state is shown here.
 */
const meta: Meta<NxSelectInputComponent> = {
  title: 'Components/Inputs/SelectInput',
  component: NxSelectInputComponent,
  decorators: [moduleMetadata({ imports: [NxSelectInputModule] })],
};
export default meta;

type Story = StoryObj<NxSelectInputComponent>;

const REGIONS = ['Northern Region', 'Central Region', 'Southern Region'];

export const States: Story = {
  render: () => ({
    props: { regions: REGIONS },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; max-width:360px;">
        <nx-select-input
          label="Region"
          placeholder="Select a region"
          value=""
          [options]="regions"
        ></nx-select-input>
        <nx-select-input
          label="Region"
          value="Central Region"
          [options]="regions"
          [required]="true"
        ></nx-select-input>
        <nx-select-input
          label="Region"
          value="Northern Region"
          [options]="regions"
          [disabled]="true"
        ></nx-select-input>
      </div>
    `,
  }),
};
