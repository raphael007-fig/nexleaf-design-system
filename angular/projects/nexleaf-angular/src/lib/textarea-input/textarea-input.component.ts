import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/**
 * nx-textarea-input — multi-line text input.
 * Renders the shared `.nx-field` / `.nx-input` CSS classes.
 *
 * DIVERGENCE FROM MDX: the MDX documents both `labelAction="Clear"` (text) and
 * `(labelAction)="fn()"` (event) on the same name. Angular cannot have an
 * @Input and @Output sharing a property name, so the OUTPUT is renamed to
 * `labelActionClick`. Use `(labelActionClick)="fn()"` instead of `(labelAction)`.
 */
@Component({
  selector: 'nx-textarea-input',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-field">
      <div class="nx-field__label-row" *ngIf="label || labelAction">
        <label
          class="nx-field__label"
          [class.nx-field__label--required]="required"
          *ngIf="label"
        >{{ label }}</label>
        <button
          *ngIf="labelAction"
          type="button"
          class="nx-field__label-action"
          (click)="labelActionClick.emit()"
        >{{ labelAction }}</button>
      </div>
      <div
        class="nx-input-wrap"
        [class.nx-input-wrap--disabled]="disabled"
        [class.nx-input-wrap--error]="!!error"
      >
        <textarea
          class="nx-input nx-textarea"
          [value]="value"
          [placeholder]="placeholder || ''"
          [attr.maxlength]="maxLength != null ? maxLength : null"
          [disabled]="disabled"
          (input)="onInput($event)"
        ></textarea>
      </div>
      <div class="nx-field__help" *ngIf="helpText && !error">{{ helpText }}</div>
      <div class="nx-field__error" *ngIf="error">{{ error }}</div>
    </div>
  `,
})
export class NxTextareaInputComponent {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() value: any;
  @Output() change = new EventEmitter<any>();
  @Input() required = false;
  @Input() maxLength?: number;
  @Input() error?: string;
  @Input() helpText?: string;
  @Input() labelAction?: string;
  /** Renamed from MDX `(labelAction)` to avoid input/output name collision. */
  @Output() labelActionClick = new EventEmitter<void>();
  @Input() disabled = false;

  onInput(ev: Event): void {
    this.change.emit((ev.target as HTMLTextAreaElement).value);
  }
}
