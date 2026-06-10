import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxBannerComponent } from '../projects/nexleaf-angular/src/lib/banner/banner.component';
import { NxBannerModule } from '../projects/nexleaf-angular/src/lib/banner/banner.module';

/**
 * nx-banner — contextual banner. Styled by the shared Banner.css in the
 * bundled @nexleaf/angular/styles.css. Mirrors the React Banner's three
 * variants: simple (tone icon pill), titled (colored header), in-card (tinted).
 */
const meta: Meta<NxBannerComponent> = {
  title: 'Components/Banner',
  component: NxBannerComponent,
  decorators: [moduleMetadata({ imports: [NxBannerModule] })],
};
export default meta;

type Story = StoryObj<NxBannerComponent>;

// Simple variant — mirrors React `AllTones` (white card + tone icon pill).
export const Types: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; max-width:640px;">
        <nx-banner tone="info">Temperature readings from Dodoma Regional Vaccine Store are syncing.</nx-banner>
        <nx-banner tone="success">The 6:00 AM temperature reading for fridge VF-2041 was saved successfully.</nx-banner>
        <nx-banner tone="warning">The morning temperature reading for Kilimani Health Centre has not been recorded yet today.</nx-banner>
        <nx-banner tone="critical">Fridge VF-1187 at Mbeya District Hospital has been above 8&deg;C for 4 hours.</nx-banner>
      </div>
    `,
  }),
};

// Titled variant — colored tone header + white body (React `WithTitle`).
export const WithTitle: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; max-width:640px;">
        <nx-banner tone="warning" title="Reading overdue" [dismissable]="true">
          The morning temperature reading for Kilimani Health Centre has not been recorded yet today.
        </nx-banner>
        <nx-banner tone="critical" title="Temperature alarm">
          Fridge VF-1187 at Mbeya District Hospital has been above 8&deg;C for 4 hours. Move vaccines to a backup unit.
        </nx-banner>
      </div>
    `,
  }),
};

// In-card variant — compact tinted row used inside cards (React `InCard`).
export const InCard: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; max-width:480px; background:var(--nx-bg-surface); border:1px solid var(--nx-border-default); border-radius:12px; padding:16px;">
        <nx-banner tone="info" [inCard]="true">Syncing — new data will appear within a few minutes.</nx-banner>
        <nx-banner tone="success" [inCard]="true">Reading saved successfully.</nx-banner>
        <nx-banner tone="critical" [inCard]="true" [dismissable]="true">Temperature above threshold for 4 hours.</nx-banner>
      </div>
    `,
  }),
};
