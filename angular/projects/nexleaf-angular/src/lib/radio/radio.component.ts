import {
  Component,
  Input,
  Output,
  EventEmitter,
  Optional,
  ChangeDetectionStrategy,
} from '@angular/core';

/**
 * nx-radio-group — two-way bindable radio group via [(value)].
 * Child <nx-radio> components read/write the group's selected value.
 */
@Component({
  selector: 'nx-radio-group',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-radio-group" [class.nx-radio-group--error]="!!error" role="radiogroup">
      <ng-content></ng-content>
      <div class="nx-radio-group__error" *ngIf="error">{{ error }}</div>
    </div>
  `,
})
export class NxRadioGroupComponent {
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  @Input() error?: string;

  select(value: any): void {
    this.value = value;
    this.valueChange.emit(value);
  }

  isSelected(value: any): boolean {
    return this.value === value;
  }
}

/**
 * nx-radio — single option within an nx-radio-group.
 * Reads selected state from the parent group (injected @Optional).
 */
@Component({
  selector: 'nx-radio',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label
      class="nx-radio-option"
      [class.nx-radio-option--magic]="tone === 'magic'"
      [class.nx-radio-option--disabled]="disabled"
    >
      <input
        type="radio"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onSelect()"
      />
      <span class="nx-radio-option__label" *ngIf="label">{{ label }}</span>
      <span class="nx-radio-option__help" *ngIf="helpText">{{ helpText }}</span>
    </label>
  `,
})
export class NxRadioComponent {
  @Input() value: any;
  @Input() label?: string;
  @Input() helpText?: string;
  @Input() tone: 'default' | 'magic' = 'default';
  @Input() disabled = false;

  constructor(@Optional() private group: NxRadioGroupComponent | null) {}

  get checked(): boolean {
    return this.group ? this.group.isSelected(this.value) : false;
  }

  onSelect(): void {
    if (this.group) {
      this.group.select(this.value);
    }
  }
}
