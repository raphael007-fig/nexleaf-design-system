import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxModalComponent } from '../projects/nexleaf-angular/src/lib/modal/modal.component';
import { NxModalModule } from '../projects/nexleaf-angular/src/lib/modal/modal.module';
import { NxSlideOverModule } from '../projects/nexleaf-angular/src/lib/slide-over/slide-over.module';
import { NxBottomSheetModule } from '../projects/nexleaf-angular/src/lib/bottom-sheet/bottom-sheet.module';
import type { NxSheetAction } from '../projects/nexleaf-angular/src/lib/bottom-sheet/bottom-sheet.component';

/**
 * Overlay primitives rendered statically open so screenshots are
 * deterministic. One overlay per story — they are full-viewport layers.
 *
 * nx-popover lives in Popover.stories.ts: its panel is positioned by JS
 * measurement against the trigger's bounding rect, so it gets interactive
 * (click-to-open) stories rather than a statically-open one.
 */
const meta: Meta<NxModalComponent> = {
  title: 'Components/Overlays',
  component: NxModalComponent,
  decorators: [
    moduleMetadata({ imports: [NxModalModule, NxSlideOverModule, NxBottomSheetModule] }),
  ],
};
export default meta;

type Story = StoryObj<NxModalComponent>;

export const ModalOpen: Story = {
  render: () => ({
    template: `
      <div style="height:600px;">
        <nx-modal [open]="true" title="Edit temperature reading" [hasFooter]="true">
          <p style="margin:0; font: 14px/1.5 sans-serif; color: var(--nx-text-default, #202223);">
            Update the manually recorded reading for Hairer-HBC-80 (IOM).
            Changes are logged against your user account.
          </p>
          <div footer style="display:flex; gap:8px; justify-content:flex-end;">
            <button type="button" class="nx-btn nx-btn--secondary">Cancel</button>
            <button type="button" class="nx-btn nx-btn--primary">Save reading</button>
          </div>
        </nx-modal>
      </div>
    `,
  }),
};

export const BottomSheetOpen: Story = {
  render: () => ({
    props: {
      actions: [
        { id: 'edit', label: 'Edit Information' },
        { id: 'view-summary', label: 'View Summary' },
        { id: 'view-plot', label: 'View Plot' },
        { id: 'assign-qr', label: 'Assign QR Code' },
      ] satisfies NxSheetAction[],
    },
    template: `
      <div style="height:600px;">
        <nx-bottom-sheet [open]="true" title="Actions" [actions]="actions"></nx-bottom-sheet>
      </div>
    `,
  }),
};

export const SlideOverOpen: Story = {
  render: () => ({
    template: `
      <div style="height:600px;">
        <nx-slide-over [open]="true" placement="right" title="Equipment details">
          <p style="margin:0; font: 14px/1.5 sans-serif; color: var(--nx-text-default, #202223);">
            Hairer-HBC-80 (IOM) · Serial HBC-2021-0080 · Kakuma Mission Hospital.
          </p>
        </nx-slide-over>
      </div>
    `,
  }),
};
