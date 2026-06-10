import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxSkeletonComponent } from '../projects/nexleaf-angular/src/lib/skeleton/skeleton.component';
import { NxSkeletonModule } from '../projects/nexleaf-angular/src/lib/skeleton/skeleton.module';

/**
 * nx-skeleton — generic pulsing loading placeholder. Styled by the shared
 * Skeleton.css in the bundled @nexleaf/angular/styles.css.
 */
const meta: Meta<NxSkeletonComponent> = {
  title: 'Components/Skeleton',
  component: NxSkeletonComponent,
  decorators: [moduleMetadata({ imports: [NxSkeletonModule] })],
};
export default meta;

type Story = StoryObj<NxSkeletonComponent>;

export const Shapes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:24px; max-width:480px;">
        <!-- Text lines at varying widths -->
        <div style="display:flex; flex-direction:column; gap:8px;">
          <nx-skeleton width="100%" [height]="12" [ariaLabel]="null"></nx-skeleton>
          <nx-skeleton width="80%" [height]="12" [ariaLabel]="null"></nx-skeleton>
          <nx-skeleton width="60%" [height]="12" [ariaLabel]="null"></nx-skeleton>
          <nx-skeleton width="40%" [height]="12" [ariaLabel]="null"></nx-skeleton>
        </div>

        <!-- Block (thumbnail / card area) -->
        <nx-skeleton width="100%" [height]="120" [radius]="8" [ariaLabel]="null"></nx-skeleton>

        <!-- Circles (avatar / icon slots) -->
        <div style="display:flex; gap:16px; align-items:center;">
          <nx-skeleton [circle]="true" [width]="24" [height]="24" [ariaLabel]="null"></nx-skeleton>
          <nx-skeleton [circle]="true" [width]="40" [height]="40" [ariaLabel]="null"></nx-skeleton>
          <nx-skeleton [circle]="true" [width]="56" [height]="56" [ariaLabel]="null"></nx-skeleton>
        </div>
      </div>
    `,
  }),
};
