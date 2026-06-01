import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface NxOption {
  label: string;
  id: string;
  description?: string;
  disabled?: boolean;
}

/**
 * nx-option-list — selectable list of options.
 * Renders the shared `.nx-option-list` CSS classes (see src/components/OptionList/OptionList.css).
 */
@Component({
  selector: 'nx-option-list',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-option-list" role="listbox" [attr.aria-multiselectable]="allowMultiple">
      <ng-container *ngIf="sections; else flatList">
        <div class="nx-option-list__section" *ngFor="let section of sections">
          <div class="nx-option-list__section-title" *ngIf="section.title">{{ section.title }}</div>
          <button
            *ngFor="let opt of section.options"
            type="button"
            role="option"
            class="nx-option"
            [class.nx-option--selected]="isSelected(opt.id)"
            [class.nx-option--disabled]="opt.disabled"
            [disabled]="opt.disabled"
            (click)="change.emit(opt.id)"
          >
            <span class="nx-option__content">
              <span class="nx-option__label-row">
                <span class="nx-option__label">{{ opt.label }}</span>
              </span>
              <span class="nx-option__description" *ngIf="opt.description">{{ opt.description }}</span>
            </span>
            <span class="nx-option__check" *ngIf="isSelected(opt.id)"></span>
          </button>
        </div>
      </ng-container>
      <ng-template #flatList>
        <button
          *ngFor="let opt of options"
          type="button"
          role="option"
          class="nx-option"
          [class.nx-option--selected]="isSelected(opt.id)"
          [class.nx-option--disabled]="opt.disabled"
          [disabled]="opt.disabled"
          (click)="change.emit(opt.id)"
        >
          <span class="nx-option__content">
            <span class="nx-option__label-row">
              <span class="nx-option__label">{{ opt.label }}</span>
            </span>
            <span class="nx-option__description" *ngIf="opt.description">{{ opt.description }}</span>
          </span>
          <span class="nx-option__check" *ngIf="isSelected(opt.id)"></span>
        </button>
      </ng-template>
    </div>
  `,
})
export class NxOptionListComponent {
  @Input() options: NxOption[] = [];
  @Input() sections?: any[];
  @Input() allowMultiple = false;
  @Input() selected: any;
  @Output() change = new EventEmitter<any>();

  isSelected(id: string): boolean {
    return Array.isArray(this.selected)
      ? this.selected.indexOf(id) !== -1
      : this.selected === id;
  }
}
