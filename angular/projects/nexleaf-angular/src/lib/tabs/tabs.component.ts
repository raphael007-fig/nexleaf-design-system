import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface NxTab {
  label: string;
  badge?: number;
  disabled?: boolean;
}

/**
 * nx-tabs — tab strip.
 * Renders the shared `.nx-tabs` CSS classes (see src/components/Tabs/Tabs.css).
 */
@Component({
  selector: 'nx-tabs',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-tabs" [class.nx-tabs--fitted]="fitted" role="tablist">
      <button
        *ngFor="let tab of tabs; let i = index"
        type="button"
        role="tab"
        class="nx-tab"
        [class.nx-tab--active]="i === activeIndex"
        [class.nx-tab--disabled]="tab.disabled"
        [disabled]="tab.disabled"
        [attr.aria-selected]="i === activeIndex"
        (click)="change.emit(i)"
      >
        {{ tab.label }}
        <span class="nx-tab__badge" *ngIf="tab.badge != null">{{ tab.badge }}</span>
      </button>
    </div>
  `,
})
export class NxTabsComponent {
  @Input() tabs: NxTab[] = [];
  @Input() activeIndex = 0;
  @Output() change = new EventEmitter<number>();
  @Input() fitted = false;
}
