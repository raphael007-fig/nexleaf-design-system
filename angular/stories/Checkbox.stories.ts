import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxCheckboxComponent } from '../projects/nexleaf-angular/src/lib/checkbox/checkbox.component';
import { NxCheckboxModule } from '../projects/nexleaf-angular/src/lib/checkbox/checkbox.module';

/**
 * nx-checkbox — checkbox control. Renders the shared `.nx-checkbox` CSS
 * classes from the bundled @nexleaf/angular/styles.css.
 *
 * Note: the component has no `tone` input, so no magic-tone state is shown.
 */
const meta: Meta<NxCheckboxComponent> = {
  title: 'Components/Checkbox',
  component: NxCheckboxComponent,
  decorators: [moduleMetadata({ imports: [NxCheckboxModule] })],
};
export default meta;

type Story = StoryObj<NxCheckboxComponent>;

export const States: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; max-width:360px;">
        <nx-checkbox label="Fridge seal intact"></nx-checkbox>
        <nx-checkbox label="Thermometer present and working" [checked]="true"></nx-checkbox>
        <nx-checkbox label="Backup generator available" [disabled]="true"></nx-checkbox>
        <nx-checkbox
          label="I confirm this reading was taken manually"
          error="You must confirm before submitting"
        ></nx-checkbox>
      </div>
    `,
  }),
};
