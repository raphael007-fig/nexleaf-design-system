import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxBadgeComponent } from '../projects/nexleaf-angular/src/lib/badge/badge.component';
import { NxBadgeModule } from '../projects/nexleaf-angular/src/lib/badge/badge.module';

/**
 * nx-badge — pill status badge. Styled by the shared Badge.css in the bundled
 * @nexleaf/angular/styles.css (what a consuming app imports).
 */
const meta: Meta<NxBadgeComponent> = {
  title: 'Components/Badge',
  component: NxBadgeComponent,
  decorators: [moduleMetadata({ imports: [NxBadgeModule] })],
};
export default meta;

type Story = StoryObj<NxBadgeComponent>;

export const Tones: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
          <nx-badge tone="success">Functional</nx-badge>
          <nx-badge tone="critical">Alarm</nx-badge>
          <nx-badge tone="warning">Needs Maintenance</nx-badge>
          <nx-badge tone="info">In Transit</nx-badge>
          <nx-badge tone="attention">Pending Review</nx-badge>
          <nx-badge tone="default">Decommissioned</nx-badge>
        </div>
        <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
          <nx-badge tone="success" size="large">Functional</nx-badge>
          <nx-badge tone="critical" size="large">Alarm</nx-badge>
          <nx-badge tone="default" size="large">Decommissioned</nx-badge>
        </div>
      </div>
    `,
  }),
};
