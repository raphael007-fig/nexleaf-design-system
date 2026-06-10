import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxTagComponent } from '../projects/nexleaf-angular/src/lib/tag/tag.component';
import { NxTagModule } from '../projects/nexleaf-angular/src/lib/tag/tag.module';

/**
 * nx-tag / nx-tag-group — removable chip and its grouping row. Styled by the
 * shared Tag.css in the bundled @nexleaf/angular/styles.css.
 */
const meta: Meta<NxTagComponent> = {
  title: 'Components/Tag',
  component: NxTagComponent,
  decorators: [moduleMetadata({ imports: [NxTagModule] })],
};
export default meta;

type Story = StoryObj<NxTagComponent>;

export const States: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; align-items:flex-start;">
        <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
          <nx-tag label="Vaccine Fridge"></nx-tag>
          <nx-tag label="Cold Room" [removable]="true"></nx-tag>
          <nx-tag label="Auto-tagged" tone="magic"></nx-tag>
          <nx-tag label="Archived Site" [removable]="true" [disabled]="true"></nx-tag>
        </div>
        <nx-tag-group>
          <nx-tag label="ILR" [removable]="true"></nx-tag>
          <nx-tag label="Freezer" [removable]="true"></nx-tag>
          <nx-tag label="Solar Direct Drive" [removable]="true"></nx-tag>
          <nx-tag label="Voltage Stabilizer" [removable]="true"></nx-tag>
        </nx-tag-group>
      </div>
    `,
  }),
};
