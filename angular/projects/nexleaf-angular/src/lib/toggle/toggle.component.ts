import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/**
 * nx-toggle — switch / toggle control.
 */
@Component({
  selector: 'nx-toggle',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-toggle" [class.nx-toggle--error]="!!error">
      <label class="nx-toggle__row">
        <input
          type="checkbox"
          class="nx-toggle__input"
          [checked]="checked"
          [disabled]="disabled"
          (change)="onChange($event)"
        />
        <span
          class="nx-toggle__track"
          [class.nx-toggle__track--checked]="checked"
          [class.nx-toggle__track--disabled]="disabled"
        ></span>
        <span class="nx-toggle__label" *ngIf="label">{{ label }}</span>
      </label>
      <div class="nx-toggle__help" *ngIf="helpText && !error">{{ helpText }}</div>
      <div class="nx-toggle__error" *ngIf="error">{{ error }}</div>
    </div>
  `,
})
export class NxToggleComponent {
  @Input() label?: string;
  @Input() checked = false;
  @Output() change = new EventEmitter<boolean>();
  @Input() helpText?: string;
  @Input() error?: string;
  @Input() disabled = false;

  onChange(ev: Event): void {
    this.change.emit((ev.target as HTMLInputElement).checked);
  }
}
