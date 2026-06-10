import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxTopBarComponent } from '../projects/nexleaf-angular/src/lib/top-bar/top-bar.component';
import { NxTopBarModule } from '../projects/nexleaf-angular/src/lib/top-bar/top-bar.module';

/**
 * nx-top-bar — synchronized progressive top navigation. The `state` input
 * forces a breakpoint state (wide | medium | compact | mobile) so docs render
 * deterministically regardless of viewport width.
 */
const meta: Meta<NxTopBarComponent> = {
  title: 'Components/Navigation/TopBar',
  component: NxTopBarComponent,
  decorators: [moduleMetadata({ imports: [NxTopBarModule] })],
};
export default meta;

type Story = StoryObj<NxTopBarComponent>;

const LOGO = `<span logo style="font: 600 15px/1 sans-serif; color: var(--nx-text-default, #202223);">ColdTrace</span>`;
const CRUMB_FULL = `<nav breadcrumb-full style="font: 13px/1 sans-serif; color: var(--nx-text-subdued, #6d7175);">Home / Inventory Management / ColdChain Equipment</nav>`;
const CRUMB_COMPRESSED = `<nav breadcrumb-compressed style="font: 13px/1 sans-serif; color: var(--nx-text-subdued, #6d7175);">Home / … / ColdChain Equipment</nav>`;

export const States: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:24px;">
        <div>
          <div style="font: 12px/1.4 sans-serif; color: var(--nx-text-subdued, #6d7175); margin-bottom: 8px;">state="wide"</div>
          <nx-top-bar state="wide">
            ${LOGO}
            ${CRUMB_FULL}
            ${CRUMB_COMPRESSED}
          </nx-top-bar>
        </div>
        <div>
          <div style="font: 12px/1.4 sans-serif; color: var(--nx-text-subdued, #6d7175); margin-bottom: 8px;">state="compact"</div>
          <nx-top-bar state="compact">
            ${LOGO}
            ${CRUMB_FULL}
            ${CRUMB_COMPRESSED}
          </nx-top-bar>
        </div>
        <div>
          <div style="font: 12px/1.4 sans-serif; color: var(--nx-text-subdued, #6d7175); margin-bottom: 8px;">state="mobile"</div>
          <div style="max-width:390px;">
            <nx-top-bar state="mobile">
              ${LOGO}
              ${CRUMB_FULL}
              ${CRUMB_COMPRESSED}
            </nx-top-bar>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    template: `
      <nx-top-bar state="wide" [loading]="true">
        ${LOGO}
        ${CRUMB_FULL}
        ${CRUMB_COMPRESSED}
      </nx-top-bar>
    `,
  }),
};
