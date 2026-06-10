import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxMenuDrawerComponent } from '../projects/nexleaf-angular/src/lib/menu-drawer/menu-drawer.component';
import { NxMenuDrawerModule } from '../projects/nexleaf-angular/src/lib/menu-drawer/menu-drawer.module';

/**
 * nx-menu-drawer — drawer-first global navigation for mobile / tablet.
 * Composes nx-slide-over (placement="left"); NxMenuDrawerModule already imports
 * NxSlideOverModule, so it is the only module needed here.
 *
 * Each story renders the drawer statically open so screenshots are
 * deterministic — these are full-viewport overlays.
 */
const meta: Meta<NxMenuDrawerComponent> = {
  title: 'Patterns/Responsive/MenuDrawer',
  component: NxMenuDrawerComponent,
  decorators: [moduleMetadata({ imports: [NxMenuDrawerModule] })],
};
export default meta;

type Story = StoryObj<NxMenuDrawerComponent>;

const LOGO = `<span logo style="font: 600 16px/1 sans-serif; color: var(--nx-text-default, #202223);">ColdTrace</span>`;

export const Open: Story = {
  render: () => ({
    template: `
      <div style="height:600px;">
        <nx-menu-drawer [open]="true" activeItemId="coldchain">
          ${LOGO}
        </nx-menu-drawer>
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    template: `
      <div style="height:600px;">
        <nx-menu-drawer [open]="true" [loading]="true" activeItemId="coldchain">
          ${LOGO}
        </nx-menu-drawer>
      </div>
    `,
  }),
};
