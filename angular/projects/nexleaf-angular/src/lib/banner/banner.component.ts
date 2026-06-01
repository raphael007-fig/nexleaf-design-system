import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface NxBannerAction {
  label: string;
  onClick?: () => void;
}

/**
 * nx-banner — contextual banner.
 * Renders the shared `.nx-banner` CSS classes (see src/components/Banner/Banner.css).
 */
@Component({
  selector: 'nx-banner',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="nx-banner"
      [class.nx-banner--info]="tone === 'info'"
      [class.nx-banner--success]="tone === 'success'"
      [class.nx-banner--warning]="tone === 'warning'"
      [class.nx-banner--critical]="tone === 'critical'"
      [class.nx-banner--titled]="!!title"
    >
      <div
        *ngIf="title"
        class="nx-banner__header"
        [class.nx-banner__header--info]="tone === 'info'"
        [class.nx-banner__header--success]="tone === 'success'"
        [class.nx-banner__header--warning]="tone === 'warning'"
        [class.nx-banner__header--critical]="tone === 'critical'"
      >{{ title }}</div>
      <div class="nx-banner__body">
        <div class="nx-banner__text">
          <ng-content></ng-content>
        </div>
        <div class="nx-banner__actions" *ngIf="actions.length">
          <button
            *ngFor="let a of actions"
            type="button"
            (click)="a.onClick && a.onClick()"
          >{{ a.label }}</button>
        </div>
      </div>
      <button
        *ngIf="dismissable"
        type="button"
        class="nx-banner__dismiss"
        (click)="dismiss.emit()"
      >&times;</button>
    </div>
  `,
})
export class NxBannerComponent {
  @Input() tone: 'info' | 'success' | 'warning' | 'critical' = 'info';
  @Input() title?: string;
  @Input() dismissable = false;
  @Input() inCard = false;
  @Input() actions: NxBannerAction[] = [];
  @Output() dismiss = new EventEmitter<void>();
}
