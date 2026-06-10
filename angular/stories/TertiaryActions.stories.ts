import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxTertiaryActionsComponent } from '../projects/nexleaf-angular/src/lib/tertiary-actions/tertiary-actions.component';
import { NxTertiaryActionsModule } from '../projects/nexleaf-angular/src/lib/tertiary-actions/tertiary-actions.module';

/**
 * nx-tertiary-actions — state-driven [Primary][More] record actions. The
 * primary action follows the equipment state (never hardcoded to Edit). On
 * mobile the More button opens nx-bottom-sheet (module already imported by
 * NxTertiaryActionsModule).
 */
const meta: Meta<NxTertiaryActionsComponent> = {
  title: 'Patterns/Responsive/TertiaryActions',
  component: NxTertiaryActionsComponent,
  decorators: [moduleMetadata({ imports: [NxTertiaryActionsModule] })],
};
export default meta;

type Story = StoryObj<NxTertiaryActionsComponent>;

const STATES = ['functional', 'faulty', 'unknown', 'decommissioning'] as const;

const rows = (mobile: boolean) => STATES.map((s) => `
  <div>
    <div style="font: 12px/1.4 sans-serif; color: var(--nx-text-subdued, #6d7175); margin-bottom: 8px;">state="${s}"</div>
    <nx-tertiary-actions state="${s}"${mobile ? ' [mobile]="true" [fullWidth]="true"' : ''}></nx-tertiary-actions>
  </div>
`).join('');

export const Desktop: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:24px;">
        ${rows(false)}
      </div>
    `,
  }),
};

export const Mobile: Story = {
  render: () => ({
    template: `
      <div style="max-width:380px; display:flex; flex-direction:column; gap:24px;">
        ${rows(true)}
      </div>
    `,
  }),
};
