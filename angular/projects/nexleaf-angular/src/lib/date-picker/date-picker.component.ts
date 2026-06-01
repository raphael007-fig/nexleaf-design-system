import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/**
 * nx-date-picker — date / date-range picker.
 * Two-way bindable via [(value)]. Template-only; emits `.nx-date-picker` classes.
 */
@Component({
  selector: 'nx-date-picker',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="nx-date-picker"
      [class.nx-date-picker--range]="allowRange"
      [class.nx-date-picker--multi-month]="multiMonth"
      [class.nx-date-picker--vertical]="verticalStack"
    >
      <input
        type="date"
        class="nx-date-picker__input"
        [value]="value"
        [min]="minDate"
        [max]="maxDate"
        (input)="onInput($event)"
      />
    </div>
  `,
})
export class NxDatePickerComponent {
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  @Input() allowRange = false;
  @Input() multiMonth = false;
  @Input() verticalStack = false;
  @Input() minDate?: any;
  @Input() maxDate?: any;

  onInput(ev: Event): void {
    this.valueChange.emit((ev.target as HTMLInputElement).value);
  }
}
