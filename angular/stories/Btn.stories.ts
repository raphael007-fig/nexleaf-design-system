import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxBtnComponent } from '../projects/nexleaf-angular/src/lib/btn/btn.component';
import { NxBtnModule } from '../projects/nexleaf-angular/src/lib/btn/btn.module';

/**
 * nx-btn — production button. Styled entirely by the shared Btn.css in the
 * bundled @nexleaf/angular/styles.css (what a consuming app imports).
 */
const meta: Meta<NxBtnComponent> = {
  title: 'Components/Btn',
  component: NxBtnComponent,
  decorators: [moduleMetadata({ imports: [NxBtnModule] })],
};
export default meta;

type Story = StoryObj<NxBtnComponent>;

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
        <nx-btn variant="primary">Primary</nx-btn>
        <nx-btn variant="secondary">Secondary</nx-btn>
        <nx-btn variant="ghost">Ghost</nx-btn>
        <nx-btn variant="destructive">Delete</nx-btn>
        <nx-btn variant="plain">Plain</nx-btn>
        <nx-btn variant="primary" [disabled]="true">Disabled</nx-btn>
        <nx-btn variant="secondary" [small]="true">Small</nx-btn>
        <nx-btn variant="secondary" [disclosure]="true">Disclosure</nx-btn>
      </div>
    `,
  }),
};

export const FullWidth: Story = {
  render: () => ({
    template: `
      <div style="max-width:360px; display:flex; flex-direction:column; gap:8px;">
        <nx-btn variant="primary" [fullWidth]="true">Save changes</nx-btn>
        <nx-btn variant="secondary" [fullWidth]="true">Cancel</nx-btn>
      </div>
    `,
  }),
};
