import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxPageComponent } from '../projects/nexleaf-angular/src/lib/page/page.component';
import { NxPageModule } from '../projects/nexleaf-angular/src/lib/page/page.module';
import { NxTertiaryActionsModule } from '../projects/nexleaf-angular/src/lib/tertiary-actions/tertiary-actions.module';

/**
 * nx-page — page header + content shell. variant="record" renders the focused
 * tertiary record header (back + dominant name + health chip + serial) with the
 * action row projected into the `[actions]` slot.
 */
const meta: Meta<NxPageComponent> = {
  title: 'Components/Navigation/Header Page',
  component: NxPageComponent,
  decorators: [moduleMetadata({ imports: [NxPageModule, NxTertiaryActionsModule] })],
};
export default meta;

type Story = StoryObj<NxPageComponent>;

export const RecordVariant: Story = {
  render: () => ({
    props: {
      backAction: { onAction: () => {} },
    },
    template: `
      <div style="max-width:420px;">
        <nx-page
          variant="record"
          [mobile]="true"
          title="Hairer-HBC-80 (IOM)"
          status="functional"
          subtitle="Serial: HBC-2021-0080"
          [backAction]="backAction"
        >
          <div actions>
            <nx-tertiary-actions state="functional" [mobile]="true" [fullWidth]="true"></nx-tertiary-actions>
          </div>
        </nx-page>
      </div>
    `,
  }),
};

export const Default: Story = {
  render: () => ({
    props: {
      primaryAction: { content: 'Add Equipment', onAction: () => {} },
    },
    template: `
      <nx-page
        title="ColdChain Equipment"
        subtitle="248 records across 36 facilities"
        [primaryAction]="primaryAction"
      >
        <div style="height:120px; border: 1px dashed var(--nx-border-default, #c9cccf); border-radius: 8px; display:flex; align-items:center; justify-content:center; font: 13px/1 sans-serif; color: var(--nx-text-subdued, #6d7175);">
          Page content
        </div>
      </nx-page>
    `,
  }),
};
