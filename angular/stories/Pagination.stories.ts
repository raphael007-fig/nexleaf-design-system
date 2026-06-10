import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxPaginationComponent } from '../projects/nexleaf-angular/src/lib/pagination/pagination.component';
import { NxPaginationModule } from '../projects/nexleaf-angular/src/lib/pagination/pagination.module';

/**
 * nx-pagination — prev/next pagination in `page` and `table` variants.
 */
const meta: Meta<NxPaginationComponent> = {
  title: 'Components/Navigation/Pagination',
  component: NxPaginationComponent,
  decorators: [moduleMetadata({ imports: [NxPaginationModule] })],
};
export default meta;

type Story = StoryObj<NxPaginationComponent>;

export const Types: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:24px; max-width:480px;">
        <div>
          <div style="font: 12px/1.4 sans-serif; color: var(--nx-text-subdued, #6d7175); margin-bottom: 8px;">type="page"</div>
          <nx-pagination type="page" [hasPrevious]="true" [hasNext]="true"></nx-pagination>
        </div>
        <div>
          <div style="font: 12px/1.4 sans-serif; color: var(--nx-text-subdued, #6d7175); margin-bottom: 8px;">type="table"</div>
          <nx-pagination type="table" label="1-25 of 248" [hasPrevious]="false" [hasNext]="true"></nx-pagination>
        </div>
      </div>
    `,
  }),
};
