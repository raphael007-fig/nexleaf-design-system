import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxBannerComponent } from '../projects/nexleaf-angular/src/lib/banner/banner.component';
import { NxBannerModule } from '../projects/nexleaf-angular/src/lib/banner/banner.module';

/**
 * nx-banner — contextual banner. Styled by the shared Banner.css in the
 * bundled @nexleaf/angular/styles.css.
 */
const meta: Meta<NxBannerComponent> = {
  title: 'Components/Banner',
  component: NxBannerComponent,
  decorators: [moduleMetadata({ imports: [NxBannerModule] })],
};
export default meta;

type Story = StoryObj<NxBannerComponent>;

export const Types: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; max-width:640px;">
        <nx-banner tone="info" title="Sync in progress">
          Temperature readings from Dodoma Regional Vaccine Store are syncing. New data will appear within a few minutes.
        </nx-banner>
        <nx-banner tone="success" title="Reading recorded">
          The 6:00 AM temperature reading for fridge VF-2041 was saved successfully.
        </nx-banner>
        <nx-banner tone="warning" title="Reading overdue">
          The morning temperature reading for Kilimani Health Centre has not been recorded yet today.
        </nx-banner>
        <nx-banner tone="critical" title="Temperature alarm">
          Fridge VF-1187 at Mbeya District Hospital has been above 8&deg;C for 4 hours. Move vaccines to a backup unit.
        </nx-banner>
      </div>
    `,
  }),
};
