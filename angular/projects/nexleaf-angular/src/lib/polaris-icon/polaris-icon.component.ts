import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * nx-polaris-icon — icon placeholder.
 * Real glyphs are out of scope; renders a sized span carrying the icon name.
 */
@Component({
  selector: 'nx-polaris-icon',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="nx-polaris-icon"
      [attr.data-icon]="name"
      [style.width.px]="size"
      [style.height.px]="size"
      [style.color]="color"
    ></span>
  `,
})
export class NxPolarisIconComponent {
  @Input() name?: string;
  @Input() size = 20;
  @Input() color = 'currentColor';
}
