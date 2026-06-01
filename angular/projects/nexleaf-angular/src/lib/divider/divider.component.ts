import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * nx-divider — horizontal rule.
 * Renders the shared `.nx-divider` CSS classes (see src/components/Divider/Divider.css).
 */
@Component({
  selector: 'nx-divider',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hr
      class="nx-divider"
      [class.nx-divider--strong]="variant === 'strong'"
      [class.nx-divider--subtle]="variant === 'subtle'"
    />
  `,
})
export class NxDividerComponent {
  @Input() variant: 'default' | 'strong' | 'subtle' = 'default';
}
