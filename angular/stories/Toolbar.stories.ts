import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxToolbarComponent } from '../projects/nexleaf-angular/src/lib/toolbar/toolbar.component';
import { NxToolbarModule } from '../projects/nexleaf-angular/src/lib/toolbar/toolbar.module';

/**
 * nx-toolbar — global top toolbar shell. Composes the brand logo, region
 * selector, icon buttons, AI chat trigger, and avatar into start / center / end
 * slots ([nxToolbarStart] · [nxToolbarCenter] · [nxToolbarEnd]).
 */
const meta: Meta<NxToolbarComponent> = {
  title: 'Components/Navigation/Toolbar',
  component: NxToolbarComponent,
  decorators: [moduleMetadata({ imports: [NxToolbarModule] })],
};
export default meta;

type Story = StoryObj<NxToolbarComponent>;

export const FullToolbar: Story = {
  render: () => ({
    template: `
      <nx-toolbar>
        <nx-logo nxToolbarStart></nx-logo>
        <nx-toolbar-aichat nxToolbarCenter label="Ask AI" [beta]="true"></nx-toolbar-aichat>
        <ng-container nxToolbarEnd>
          <nx-toolbar-region value="Kenya"></nx-toolbar-region>
          <nx-toolbar-iconbtn ariaLabel="Notifications" [badge]="3"></nx-toolbar-iconbtn>
          <nx-toolbar-iconbtn ariaLabel="Settings"></nx-toolbar-iconbtn>
          <nx-toolbar-avatar alt="Mary A."></nx-toolbar-avatar>
        </ng-container>
      </nx-toolbar>
    `,
  }),
};

export const Minimal: Story = {
  render: () => ({
    template: `
      <nx-toolbar>
        <nx-logo nxToolbarStart></nx-logo>
        <nx-toolbar-avatar nxToolbarEnd alt="Mary A."></nx-toolbar-avatar>
      </nx-toolbar>
    `,
  }),
};
