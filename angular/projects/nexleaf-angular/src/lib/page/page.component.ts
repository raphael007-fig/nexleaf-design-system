import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export interface NxPageBackAction {
  onAction: () => void;
}

export interface NxPageMetadata {
  label: string;
  tone?: string;
}

export interface NxPageAction {
  content: string;
  onAction: () => void;
}

/** Health status → badge tone (record variant chip). */
const HEALTH_TONE: Record<string, string> = {
  functional: 'success', active: 'success', faulty: 'critical',
  unknown: 'default', decommissioned: 'warning',
};

/**
 * nx-page — page header + content shell.
 * Renders the shared `.nx-page` CSS classes (see src/components/Page/Page.css).
 *
 * variant="record" renders the focused tertiary record header (back + dominant
 * name + health status chip + serial). Set `mobile` for the compact layout
 * (title 20px, action row below). Project the action row into `[actions]`.
 */
@Component({
  selector: 'nx-page',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Record variant — tertiary record header -->
    <header
      *ngIf="variant === 'record'; else defaultPage"
      class="nx-page nx-page--record"
      [class.nx-page--record-mobile]="mobile"
    >
      <div class="nx-page__record-top">
        <button *ngIf="backAction" type="button" class="nx-record-back" aria-label="Back" (click)="backAction.onAction()">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12 5l-5 5 5 5M7 10h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <div class="nx-page__record-titles">
          <div class="nx-page__record-title-row">
            <h1 class="nx-page__record-title">{{ title }}</h1>
            <span class="nx-page__record-chip" *ngIf="status">
              <span class="nx-badge" [ngClass]="'nx-badge--' + chipTone">{{ statusLabel || status }}</span>
            </span>
          </div>
          <div class="nx-page__record-serial" *ngIf="subtitle">{{ subtitle }}</div>
        </div>
      </div>
      <div class="nx-page__record-actions">
        <ng-content select="[actions]"></ng-content>
      </div>
    </header>

    <!-- Default page header -->
    <ng-template #defaultPage>
    <div class="nx-page">
      <div class="nx-page__header">
        <div class="nx-page__left">
          <button
            *ngIf="backAction"
            type="button"
            class="nx-page__back-btn"
            (click)="backAction.onAction()"
          ></button>
          <div class="nx-page__title-col">
            <div class="nx-page__title-row">
              <h1 class="nx-page__title" *ngIf="title">{{ title }}</h1>
              <div class="nx-page__badges" *ngIf="metadata.length">
                <span
                  *ngFor="let m of metadata"
                  class="nx-page__badge"
                  [attr.data-tone]="m.tone"
                >{{ m.label }}</span>
              </div>
            </div>
            <p class="nx-page__subtitle" *ngIf="subtitle">{{ subtitle }}</p>
          </div>
        </div>
        <div class="nx-page__actions" *ngIf="primaryAction || secondaryActions.length">
          <button
            *ngFor="let a of secondaryActions"
            type="button"
            (click)="a.onAction()"
          >{{ a.content }}</button>
          <button
            *ngIf="primaryAction"
            type="button"
            (click)="primaryAction.onAction()"
          >{{ primaryAction.content }}</button>
        </div>
      </div>
      <div class="nx-page__content">
        <ng-content></ng-content>
      </div>
    </div>
    </ng-template>
  `,
})
export class NxPageComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() backAction?: NxPageBackAction;
  @Input() metadata: NxPageMetadata[] = [];
  @Input() primaryAction?: NxPageAction;
  @Input() secondaryActions: NxPageAction[] = [];

  // Record variant
  @Input() variant: 'default' | 'record' = 'default';
  @Input() status?: string;
  @Input() statusLabel?: string;
  @Input() mobile = false;

  get chipTone(): string {
    return (this.status && HEALTH_TONE[this.status.toLowerCase()]) || 'default';
  }
}
