import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxTooltipComponent } from '../projects/nexleaf-angular/src/lib/tooltip/tooltip.component';
import { NxTooltipModule } from '../projects/nexleaf-angular/src/lib/tooltip/tooltip.module';

/**
 * nx-tooltip — hover/focus tooltip. Styled by the shared Tooltip.css in the
 * bundled @nexleaf/angular/styles.css. Visibility is pure CSS (:hover /
 * :focus-within); the `.nx-tooltip--visible` modifier forces it for demos —
 * applied here via a wrapper since the CSS rule is a descendant selector.
 */
const meta: Meta<NxTooltipComponent> = {
  title: 'Components/Tooltip',
  component: NxTooltipComponent,
  decorators: [moduleMetadata({ imports: [NxTooltipModule] })],
};
export default meta;

type Story = StoryObj<NxTooltipComponent>;

export const Placement: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:64px; padding:64px 32px; align-items:center;">
        <!-- Forced visible (above) via the .nx-tooltip--visible demo modifier -->
        <span class="nx-tooltip--visible">
          <nx-tooltip content="Last reading: 4.2&deg;C at 6:05 AM" position="above">
            <button type="button" class="nx-btn nx-btn--secondary">Above</button>
          </nx-tooltip>
        </span>

        <!-- Forced visible (below) -->
        <span class="nx-tooltip--visible">
          <nx-tooltip content="Serial number VF-2041-TZ" position="below">
            <button type="button" class="nx-btn nx-btn--secondary">Below</button>
          </nx-tooltip>
        </span>

        <!-- Real hover behaviour: hover or focus to reveal -->
        <nx-tooltip content="Hover me to see the tooltip" position="above">
          <button type="button" class="nx-btn nx-btn--secondary">Hover trigger</button>
        </nx-tooltip>
      </div>
    `,
  }),
};
