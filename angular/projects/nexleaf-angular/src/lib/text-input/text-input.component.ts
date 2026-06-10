import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/**
 * nx-text-input — text input.
 * Renders the shared `.nx-field` / `.nx-input` CSS classes (see src/components/TextInput/TextInput.css).
 */
@Component({
  selector: 'nx-text-input',
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
        <input
          class="nx-input"
          [type]="type"
          [value]="value ?? ''"
          [placeholder]="placeholder || ''"
          [disabled]="disabled"
          (input)="onInput($event)"
        />
        <button
          *ngIf="clearButton && value"
          type="button"
          class="nx-input__suffix"
          (click)="change.emit('')"
        >&times;</button>
        <span class="nx-input__suffix" *ngIf="suffix && !clearButton">{{ suffix }}</span>
      </div>
      <div class="nx-field__help" *ngIf="helpText && !error">{{ helpText }}</div>
      <div class="nx-field__error" *ngIf="error">{{ error }}</div>
    </div>
  `,
})
export class NxTextInputComponent {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() value: any;
  @Output() change = new EventEmitter<any>();
  @Input() type = 'text';
  @Input() required = false;
  @Input() suffix?: string;
  @Input() error?: string;
  @Input() helpText?: string;
  @Input() clearButton = false;
  @Input() disabled = false;

  onInput(ev: Event): void {
    this.change.emit((ev.target as HTMLInputElement).value);
  }
}
