import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxSideNavigationComponent } from '../projects/nexleaf-angular/src/lib/side-navigation/side-navigation.component';
import { NxSideNavigationModule } from '../projects/nexleaf-angular/src/lib/side-navigation/side-navigation.module';
import { NX_COLDTRACE_NAV_ITEMS } from '../projects/nexleaf-angular/src/lib/menu-drawer/menu-drawer.component';

/**
 * nx-side-navigation — docked desktop navigation rail (Model 2 split control:
 * the label navigates, the caret toggles the group). Shares the ColdTrace nav
 * tree + activeItemId with nx-menu-drawer.
 */
const meta: Meta<NxSideNavigationComponent> = {
  title: 'Components/Navigation/Side Navigation',
  component: NxSideNavigationComponent,
  decorators: [moduleMetadata({ imports: [NxSideNavigationModule] })],
};
export default meta;

type Story = StoryObj<NxSideNavigationComponent>;

const LOGO = `<span logo style="font: 600 16px/1 sans-serif; color: var(--nx-text-default, #202223);">ColdTrace</span>`;

export const DockedRail: Story = {
  render: () => ({
    props: { items: NX_COLDTRACE_NAV_ITEMS },
    template: `
      <div style="height:600px; display:flex; align-items:stretch;">
        <nx-side-navigation [items]="items" activeItemId="coldchain">
          ${LOGO}
        </nx-side-navigation>
      </div>
    `,
  }),
};

export const Collapsed: Story = {
  render: () => ({
    props: { items: NX_COLDTRACE_NAV_ITEMS },
    template: `
      <div style="height:600px; display:flex; align-items:stretch;">
        <nx-side-navigation [items]="items" activeItemId="coldchain" [collapsed]="true">
          ${LOGO}
        </nx-side-navigation>
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    template: `
      <div style="height:600px; display:flex; align-items:stretch;">
        <nx-side-navigation [loading]="true">
          ${LOGO}
        </nx-side-navigation>
      </div>
    `,
  }),
};
