import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxBreadcrumbsComponent } from '../projects/nexleaf-angular/src/lib/toolbar/toolbar.component';
import { NxToolbarModule } from '../projects/nexleaf-angular/src/lib/toolbar/toolbar.module';

/**
 * nx-breadcrumbs — breadcrumb trail. Declared in NxToolbarModule (the toolbar
 * lib owns the top-of-app chrome pieces).
 */
const meta: Meta<NxBreadcrumbsComponent> = {
  title: 'Components/Navigation/Breadcrumbs',
  component: NxBreadcrumbsComponent,
  decorators: [moduleMetadata({ imports: [NxToolbarModule] })],
};
export default meta;

type Story = StoryObj<NxBreadcrumbsComponent>;

export const Trail: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Home' },
        { label: 'Inventory Management' },
        { label: 'ColdChain Equipment' },
        { label: 'Hairer-HBC-80 (IOM)' },
      ],
    },
    template: `<nx-breadcrumbs [items]="items"></nx-breadcrumbs>`,
  }),
};
