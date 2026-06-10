import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxTabsComponent, NxTab } from '../projects/nexleaf-angular/src/lib/tabs/tabs.component';
import { NxTabsModule } from '../projects/nexleaf-angular/src/lib/tabs/tabs.module';

/**
 * nx-tabs — tab strip rendering the shared `.nx-tabs` classes.
 */
const meta: Meta<NxTabsComponent> = {
  title: 'Components/Navigation/Tabs',
  component: NxTabsComponent,
  decorators: [moduleMetadata({ imports: [NxTabsModule] })],
};
export default meta;

type Story = StoryObj<NxTabsComponent>;

const TABS: NxTab[] = [
  { label: 'All Equipment', badge: 248 },
  { label: 'Faulty', badge: 12 },
  { label: 'Under Maintenance', badge: 4 },
];

export const Basic: Story = {
  render: () => ({
    props: { tabs: TABS },
    template: `<nx-tabs [tabs]="tabs" [activeIndex]="0"></nx-tabs>`,
  }),
};
