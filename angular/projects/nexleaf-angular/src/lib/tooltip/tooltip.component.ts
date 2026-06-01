import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * nx-tooltip — tooltip wrapper. Projects the trigger; shows `content` on hover.
 */
@Component({
  selector: 'nx-tooltip',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="nx-tooltip" [class.nx-tooltip--above]="position === 'above'" [class.nx-tooltip--below]="position === 'below'">
      <span class="nx-tooltip__trigger">
        <ng-content></ng-content>
      </span>
      <span class="nx-tooltip__bubble" role="tooltip" *ngIf="content">{{ content }}</span>
    </span>
  `,
})
export class NxTooltipComponent {
  @Input() content?: string;
  @Input() position: 'above' | 'below' = 'above';
}
