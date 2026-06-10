import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxCellComponent } from '../projects/nexleaf-angular/src/lib/cell/cell.component';
import { NxCellModule } from '../projects/nexleaf-angular/src/lib/cell/cell.module';

/**
 * nx-cell — composable 64px list row. Styled by the shared Cell.css (plus
 * Badge.css / Btn.css / Skeleton.css) in the bundled @nexleaf/angular/styles.css.
 */
const meta: Meta<NxCellComponent> = {
  title: 'Components/Lists/Cell',
  component: NxCellComponent,
  decorators: [moduleMetadata({ imports: [NxCellModule] })],
};
export default meta;

type Story = StoryObj<NxCellComponent>;

export const States: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; max-width:560px;">
        <nx-cell
          title="Vaccine Refrigerator VF-2041-TZ"
          description="Kilimani Health Centre &middot; Dodoma Region"
          [interactive]="true"
          [hasChevron]="true"
        ></nx-cell>
        <nx-cell
          title="Cold Room CR-0114"
          description="Regional Vaccine Store &middot; last reading 6:05 AM"
          badge="Functional"
          [hasChevron]="true"
        ></nx-cell>
        <nx-cell
          title="Freezer FZ-0830"
          description="Mbeya District Hospital &middot; hover state forced"
          [interactive]="true"
          state="hover"
          [hasChevron]="true"
        ></nx-cell>
        <nx-cell [loading]="true"></nx-cell>
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; max-width:560px;">
        <nx-cell [loading]="true"></nx-cell>
        <nx-cell [loading]="true" [hasIcon]="true"></nx-cell>
        <nx-cell [loading]="true"></nx-cell>
      </div>
    `,
  }),
};
