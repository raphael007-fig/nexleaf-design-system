import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxNavCardComponent } from '../projects/nexleaf-angular/src/lib/nav-card/nav-card.component';
import { NxNavCardModule } from '../projects/nexleaf-angular/src/lib/nav-card/nav-card.module';

/**
 * nx-nav-card — Home / Sub-Home navigation tile. `layout="home"` centers a
 * media block + title + button; `layout="sub"` left-aligns an icon + text.
 */
const meta: Meta<NxNavCardComponent> = {
  title: 'Components/Navigation/NavCard',
  component: NxNavCardComponent,
  decorators: [moduleMetadata({ imports: [NxNavCardModule] })],
};
export default meta;

type Story = StoryObj<NxNavCardComponent>;

export const Home: Story = {
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:16px; max-width:780px;">
        <nx-nav-card layout="home" title="Inventory Management" buttonLabel="Open"></nx-nav-card>
        <nx-nav-card layout="home" title="Temperature Monitoring" buttonLabel="Open"></nx-nav-card>
        <nx-nav-card layout="home" title="Reports" buttonLabel="Open"></nx-nav-card>
      </div>
    `,
  }),
};

export const SubHome: Story = {
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:16px; max-width:560px;">
        <nx-nav-card layout="sub" title="ColdChain Equipment" description="248 devices across 36 facilities" buttonLabel="View"></nx-nav-card>
        <nx-nav-card layout="sub" title="Solar Equipment" description="62 installations" buttonLabel="View"></nx-nav-card>
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:16px; max-width:780px;">
        <nx-nav-card layout="home" [loading]="true"></nx-nav-card>
        <nx-nav-card layout="home" [loading]="true"></nx-nav-card>
        <nx-nav-card layout="sub" [loading]="true"></nx-nav-card>
      </div>
    `,
  }),
};
