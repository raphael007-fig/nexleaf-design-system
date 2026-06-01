import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/**
 * nx-tag — removable chip/tag.
 */
@Component({
  selector: 'nx-tag',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="nx-tag"
      [class.nx-tag--magic]="tone === 'magic'"
      [class.nx-tag--disabled]="disabled"
      [class.nx-tag--removable]="removable"
    >
      <span class="nx-tag__icon" *ngIf="icon" [attr.data-icon]="icon"></span>
      <span class="nx-tag__label" *ngIf="label">{{ label }}</span>
      <button
        *ngIf="removable"
        type="button"
        class="nx-tag__remove"
        [disabled]="disabled"
        (click)="remove.emit()"
      >&times;</button>
    </span>
  `,
})
export class NxTagComponent {
  @Input() label?: string;
  @Input() removable = false;
  @Input() tone: 'default' | 'magic' = 'default';
  @Input() icon?: any;
  @Input() disabled = false;
  @Output() remove = new EventEmitter<void>();
}

/** nx-tag-group — wraps tags in a `.nx-tag-group` row. */
@Component({
  selector: 'nx-tag-group',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-tag-group">
      <ng-content></ng-content>
    </div>
  `,
})
export class NxTagGroupComponent {}
