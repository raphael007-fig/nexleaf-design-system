import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface NxChoice {
  label: string;
  id: string;
  disabled?: boolean;
}

/**
 * nx-checkbox — checkbox control.
 * Renders the shared `.nx-checkbox` CSS classes (see src/components/Checkbox/Checkbox.css).
 */
@Component({
  selector: 'nx-checkbox',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="nx-checkbox">
      <span class="nx-checkbox__row">
        <span
          class="nx-checkbox__control"
          [class.nx-checkbox__control--checked]="checked"
          [class.nx-checkbox__control--disabled]="disabled"
          [class.nx-checkbox__control--error]="error && !checked"
          [class.nx-checkbox__control--error-checked]="error && checked"
        ></span>
        <input
          type="checkbox"
          [checked]="checked"
          [disabled]="disabled"
          (change)="onChange($event)"
          hidden
        />
        <span
          *ngIf="label"
          class="nx-checkbox__label"
          [class.nx-checkbox__label--disabled]="disabled"
        >{{ label }}</span>
      </span>
      <span class="nx-checkbox__error" *ngIf="error">{{ error }}</span>
    </label>
  `,
})
export class NxCheckboxComponent {
  @Input() label?: string;
  @Input() checked = false;
  @Input() disabled = false;
  @Input() error?: string;
  @Output() change = new EventEmitter<boolean>();

  onChange(ev: Event): void {
    this.change.emit((ev.target as HTMLInputElement).checked);
  }
}

/**
 * nx-radio-button — single radio control.
 * Renders the shared `.nx-radio` CSS classes (see src/components/Checkbox/Checkbox.css).
 */
@Component({
  selector: 'nx-radio-button',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="nx-radio">
      <span class="nx-radio__row">
        <span
          class="nx-radio__control"
          [class.nx-radio__control--checked]="checked"
          [class.nx-radio__control--disabled]="disabled"
        ></span>
        <input
          type="radio"
          [checked]="checked"
          [disabled]="disabled"
          (change)="change.emit()"
          hidden
        />
        <span
          *ngIf="label"
          class="nx-radio__label"
          [class.nx-radio__label--disabled]="disabled"
        >{{ label }}</span>
      </span>
    </label>
  `,
})
export class NxRadioButtonComponent {
  @Input() label?: string;
  @Input() checked = false;
  @Input() disabled = false;
  @Output() change = new EventEmitter<void>();
}

/** nx-choice-list — group of checkboxes/radios. */
@Component({
  selector: 'nx-choice-list',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset class="nx-choice-list">
      <legend class="nx-choice-list__title" *ngIf="title">{{ title }}</legend>
      <label class="nx-choice-list__item" *ngFor="let c of choices">
        <input
          type="checkbox"
          [value]="c.id"
          [checked]="isSelected(c.id)"
          [disabled]="c.disabled"
          (change)="change.emit(c.id)"
        />
        <span>{{ c.label }}</span>
      </label>
    </fieldset>
  `,
})
export class NxChoiceListComponent {
  @Input() title?: string;
  @Input() selected: string | string[] = [];
  @Input() choices: NxChoice[] = [];
  @Output() change = new EventEmitter<any>();

  isSelected(id: string): boolean {
    return Array.isArray(this.selected)
      ? this.selected.indexOf(id) !== -1
      : this.selected === id;
  }
}
