import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxPopoverComponent } from '../projects/nexleaf-angular/src/lib/popover/popover.component';
import { NxPopoverModule } from '../projects/nexleaf-angular/src/lib/popover/popover.module';

/**
 * nx-popover — non-modal floating layer anchored to its trigger. The panel is
 * portalled to document.body and positioned by JS measurement against the
 * trigger's bounding rect, so these stories are interactive (click a trigger
 * to open) rather than statically open — a measured position can't be
 * screenshotted deterministically. Dismiss with outside-click or Escape.
 */
const meta: Meta<NxPopoverComponent> = {
  title: 'Components/Popover',
  component: NxPopoverComponent,
  decorators: [moduleMetadata({ imports: [NxPopoverModule] })],
};
export default meta;

type Story = StoryObj<NxPopoverComponent>;

const itemStyle =
  'display:block; width:100%; padding:8px 12px; border:0; border-radius:6px;'
  + ' background:none; text-align:left; cursor:pointer;'
  + ' font: 14px/1.4 sans-serif; color: var(--nx-text-default, #202223);';

export const ActionsMenu: Story = {
  render: () => ({
    props: { open: false },
    template: `
      <div style="padding:32px;">
        <nx-popover [(open)]="open" placement="bottom-start" ariaLabel="Equipment actions">
          <button trigger type="button" class="nx-btn nx-btn--secondary"
            (click)="open = !open" aria-haspopup="menu" [attr.aria-expanded]="open">
            Actions
          </button>
          <button type="button" role="menuitem" style="${itemStyle}">Edit Information</button>
          <button type="button" role="menuitem" style="${itemStyle}">View Summary</button>
          <button type="button" role="menuitem" style="${itemStyle}">View Plot</button>
          <button type="button" role="menuitem" style="${itemStyle}">Assign QR Code</button>
        </nx-popover>
      </div>
    `,
  }),
};

export const Placement: Story = {
  render: () => ({
    props: { openStart: false, openEnd: false },
    template: `
      <div style="display:flex; justify-content:space-between; padding:32px;">
        <nx-popover [(open)]="openStart" placement="bottom-start" ariaLabel="Align start">
          <button trigger type="button" class="nx-btn nx-btn--secondary"
            (click)="openStart = !openStart" aria-haspopup="menu" [attr.aria-expanded]="openStart">
            bottom-start
          </button>
          <button type="button" role="menuitem" style="${itemStyle}">Panel aligns to the trigger's left edge</button>
        </nx-popover>

        <nx-popover [(open)]="openEnd" placement="bottom-end" ariaLabel="Align end">
          <button trigger type="button" class="nx-btn nx-btn--secondary"
            (click)="openEnd = !openEnd" aria-haspopup="menu" [attr.aria-expanded]="openEnd">
            bottom-end
          </button>
          <button type="button" role="menuitem" style="${itemStyle}">Panel aligns to the trigger's right edge</button>
        </nx-popover>
      </div>
    `,
  }),
};
