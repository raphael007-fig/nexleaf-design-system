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

/**
 * nx-page — page header + content shell.
 * Renders the shared `.nx-page` CSS classes (see src/components/Page/Page.css).
 */
@Component({
  selector: 'nx-page',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
  `,
})
export class NxPageComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() backAction?: NxPageBackAction;
  @Input() metadata: NxPageMetadata[] = [];
  @Input() primaryAction?: NxPageAction;
  @Input() secondaryActions: NxPageAction[] = [];
}
