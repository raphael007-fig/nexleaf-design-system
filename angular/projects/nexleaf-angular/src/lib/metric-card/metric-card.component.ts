import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export interface NxMetricBadge {
  label: string;
  tone: string;
}

/**
 * nx-metric-card — selectable metric tile.
 * Native host (click) bubbles from the inner button — no @Output needed.
 */
@Component({
  selector: 'nx-metric-card',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="nx-metric-card"
      [class.nx-metric-card--selected]="selected"
      [class.nx-metric-card--loading]="loading"
      [class.nx-metric-card--disabled]="disabled"
      [disabled]="disabled"
    >
      <span class="nx-metric-card__title" *ngIf="title">{{ title }}</span>
      <span class="nx-metric-card__metric" *ngIf="metric">{{ metric }}</span>
      <span
        *ngIf="badge"
        class="nx-metric-card__badge"
        [attr.data-tone]="badge.tone"
      >{{ badge.label }}</span>
    </button>
  `,
})
export class NxMetricCardComponent {
  @Input() title?: string;
  @Input() metric?: string;
  @Input() badge?: NxMetricBadge;
  @Input() selected = false;
  @Input() loading = false;
  @Input() disabled = false;
}
