import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxRadioGroupComponent } from '../projects/nexleaf-angular/src/lib/radio/radio.component';
import { NxRadioModule } from '../projects/nexleaf-angular/src/lib/radio/radio.module';

/**
 * nx-radio-group / nx-radio — radio group with two-way bindable [value].
 * Child nx-radio options read selected state from the parent group.
 */
const meta: Meta<NxRadioGroupComponent> = {
  title: 'Components/RadioGroup',
  component: NxRadioGroupComponent,
  decorators: [moduleMetadata({ imports: [NxRadioModule] })],
};
export default meta;

type Story = StoryObj<NxRadioGroupComponent>;

export const States: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:24px; max-width:360px;">
        <nx-radio-group value="reading">
          <nx-radio
            value="reading"
            label="Record a temperature reading"
            helpText="Log the current fridge temperature"
          ></nx-radio>
          <nx-radio
            value="maintenance"
            label="Log a maintenance visit"
          ></nx-radio>
          <nx-radio
            value="stock"
            label="Update vaccine stock count"
            [disabled]="true"
          ></nx-radio>
        </nx-radio-group>

        <nx-radio-group value="" error="Select a reading time to continue">
          <nx-radio value="morning" label="Morning reading"></nx-radio>
          <nx-radio value="evening" label="Evening reading"></nx-radio>
        </nx-radio-group>
      </div>
    `,
  }),
};
