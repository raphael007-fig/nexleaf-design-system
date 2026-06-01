import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * nx-search-select — single-select with search, [(ngModel)] bindable.
 * Implements ControlValueAccessor.
 */
@Component({
  selector: 'nx-search-select',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxSearchSelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="nx-search-select" [class.nx-search-select--error]="!!error">
      <label class="nx-field__label" [class.nx-field__label--required]="required" *ngIf="label">{{ label }}</label>
      <input
        type="text"
        class="nx-search-select__input"
        [value]="displayValue"
        [placeholder]="placeholder || ''"
        [disabled]="disabled"
        (input)="onInput($event)"
        (blur)="onTouched()"
      />
      <ul class="nx-search-select__options">
        <li
          *ngFor="let opt of options"
          class="nx-search-select__option"
          (click)="select(opt)"
        >{{ optLabel(opt) }}</li>
      </ul>
      <div class="nx-field__error" *ngIf="error">{{ error }}</div>
    </div>
  `,
})
export class NxSearchSelectComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() required = false;
  @Input() placeholder?: string;
  @Input() options: any[] = [];
  @Input() error?: string;
  @Input() disabled = false;

  value: any = null;
  displayValue = '';

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
    this.displayValue = value == null ? '' : this.optLabel(value);
  }
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  optLabel(opt: any): string {
    return opt && typeof opt === 'object' ? opt.label : String(opt);
  }

  onInput(ev: Event): void {
    this.displayValue = (ev.target as HTMLInputElement).value;
  }

  select(opt: any): void {
    this.value = opt;
    this.displayValue = this.optLabel(opt);
    this.onChange(opt);
  }
}

/**
 * nx-search-select-multi — multi-select with search + tags, [(ngModel)] bindable.
 * Implements ControlValueAccessor.
 */
@Component({
  selector: 'nx-search-select-multi',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxSearchSelectMultiComponent),
      multi: true,
    },
  ],
  template: `
    <div class="nx-search-select nx-search-select--multi" [class.nx-search-select--error]="!!error">
      <label class="nx-field__label" [class.nx-field__label--required]="required" *ngIf="label">{{ label }}</label>
      <div class="nx-search-select__tags">
        <span class="nx-search-select__tag" *ngFor="let v of value">
          {{ optLabel(v) }}
          <button type="button" (click)="remove(v)">&times;</button>
        </span>
      </div>
      <input
        type="text"
        class="nx-search-select__input"
        [placeholder]="placeholder || ''"
        [disabled]="disabled || (maxTags != null && value.length >= maxTags)"
        (blur)="onTouched()"
      />
      <ul class="nx-search-select__options">
        <li
          *ngFor="let opt of options"
          class="nx-search-select__option"
          (click)="add(opt)"
        >{{ optLabel(opt) }}</li>
      </ul>
      <div class="nx-field__error" *ngIf="error">{{ error }}</div>
    </div>
  `,
})
export class NxSearchSelectMultiComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() required = false;
  @Input() placeholder?: string;
  @Input() options: any[] = [];
  @Input() error?: string;
  @Input() disabled = false;
  @Input() maxTags?: number;

  value: any[] = [];

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = Array.isArray(value) ? value : [];
  }
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  optLabel(opt: any): string {
    return opt && typeof opt === 'object' ? opt.label : String(opt);
  }

  add(opt: any): void {
    if (this.maxTags != null && this.value.length >= this.maxTags) {
      return;
    }
    this.value = [...this.value, opt];
    this.onChange(this.value);
  }

  remove(opt: any): void {
    this.value = this.value.filter((v) => v !== opt);
    this.onChange(this.value);
  }
}
