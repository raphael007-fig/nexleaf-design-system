import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export type NxBadgeTone =
  | 'default'
  | 'success'
  | 'attention'
  | 'critical'
  | 'info'
  | 'warning'
  | 'info-strong'
  | 'success-strong'
  | 'warning-strong'
  | 'attention-strong'
  | 'critical-strong';

/**
 * nx-badge — pill badge.
 * Renders the shared `.nx-badge` CSS classes (see src/components/Badge/Badge.css).
 */
@Component({
  selector: 'nx-badge',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="nx-badge"
      [class.nx-badge--default]="tone === 'default'"
      [class.nx-badge--success]="tone === 'success'"
      [class.nx-badge--attention]="tone === 'attention'"
      [class.nx-badge--critical]="tone === 'critical'"
      [class.nx-badge--info]="tone === 'info'"
      [class.nx-badge--warning]="tone === 'warning'"
      [class.nx-badge--info-strong]="tone === 'info-strong'"
      [class.nx-badge--success-strong]="tone === 'success-strong'"
      [class.nx-badge--warning-strong]="tone === 'warning-strong'"
      [class.nx-badge--attention-strong]="tone === 'attention-strong'"
      [class.nx-badge--critical-strong]="tone === 'critical-strong'"
      [class.nx-badge--lg]="size === 'large'"
      [class.nx-badge--with-dot]="progressIndicator"
      [class.nx-badge--with-leading]="icon"
      [class.nx-badge--with-dismiss]="dismiss.observed"
    >
      <span class="nx-badge__icon-slot" *ngIf="icon">
        <ng-content select="[nxBadgeIcon]"></ng-content>
      </span>
      <span
        *ngIf="progressIndicator"
        class="nx-badge__dot"
        [class.nx-badge__dot--partial]="progress === 'partial'"
        [class.nx-badge__dot--complete]="progress === 'complete'"
        [class.nx-badge__dot--incomplete]="progress === 'incomplete'"
      >
        <span class="nx-badge__dot-inner"></span>
      </span>
      <ng-content></ng-content>
      <button
        *ngIf="dismiss.observed"
        type="button"
        class="nx-badge__dismiss"
        (click)="dismiss.emit()"
      >&times;</button>
    </span>
  `,
})
export class NxBadgeComponent {
  @Input() tone: NxBadgeTone = 'default';
  @Input() size: 'medium' | 'large' = 'medium';
  @Input() progress?: 'partial' | 'complete' | 'incomplete';
  @Input() progressIndicator = false;
  @Input() icon = false;
  @Output() dismiss = new EventEmitter<void>();
}
