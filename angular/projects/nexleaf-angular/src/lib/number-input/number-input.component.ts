import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/**
 * nx-number-input — numeric text input.
 * Renders the shared `.nx-field` / `.nx-input` CSS classes (see src/components/TextInput/TextInput.css).
 */
@Component({
  selector: 'nx-number-input',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-field">
      <label
        class="nx-field__label"
        [class.nx-field__label--required]="required"
        *ngIf="label"
      >{{ label }}</label>
      <div
        class="nx-input-wrap"
        [class.nx-input-wrap--disabled]="disabled"
        [class.nx-input-wrap--error]="!!error"
      >
        <span class="nx-input__prefix" *ngIf="prefix">{{ prefix }}</span>
        <input
          type="number"
          class="nx-input"
          [value]="value"
          [step]="step"
          [min]="min"
          [max]="max"
          [disabled]="disabled"
          (input)="onInput($event)"
        />
        <span class="nx-input__suffix" *ngIf="suffix">{{ suffix }}</span>
      </div>
      <div class="nx-field__help" *ngIf="helpText && !error">{{ helpText }}</div>
      <div class="nx-field__error" *ngIf="error">{{ error }}</div>
    </div>
  `,
})
export class NxNumberInputComponent {
  @Input() label?: string;
  @Input() value: any;
  @Output() change = new EventEmitter<any>();
  @Input() suffix?: string;
  @Input() prefix?: string;
  @Input() step?: number;
  @Input() min?: number;
  @Input() max?: number;
  @Input() required = false;
  @Input() helpText?: string;
  @Input() error?: string;
  @Input() disabled = false;

  onInput(ev: Event): void {
    this.change.emit((ev.target as HTMLInputElement).value);
  }
}
