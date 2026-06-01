import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/**
 * nx-select-input — native dropdown select.
 * Renders the shared `.nx-field` / `.nx-input` CSS classes.
 */
@Component({
  selector: 'nx-select-input',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-field">
      <label
        class="nx-field__label"
        [class.nx-field__label--required]="required"
        *ngIf="label"
      >{{ label }}</label>
      <div class="nx-input-wrap" [class.nx-input-wrap--disabled]="disabled">
        <select
          class="nx-input nx-select"
          [value]="value"
          [disabled]="disabled"
          (change)="onChange($event)"
        >
          <option value="" disabled *ngIf="placeholder">{{ placeholder }}</option>
          <option *ngFor="let opt of options" [value]="opt">{{ opt }}</option>
        </select>
      </div>
    </div>
  `,
})
export class NxSelectInputComponent {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() options: string[] = [];
  @Input() value: any;
  @Output() change = new EventEmitter<any>();
  @Input() required = false;
  @Input() disabled = false;

  onChange(ev: Event): void {
    this.change.emit((ev.target as HTMLSelectElement).value);
  }
}
