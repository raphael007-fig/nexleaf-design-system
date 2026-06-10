import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface NxBannerAction {
  label: string;
  onClick?: () => void;
}

/**
 * nx-banner — contextual banner (mirrors React Banner.jsx, Figma 109293:4284).
 *
 * Three forms, styled by the shared `.nx-banner` CSS (Banner.css):
 *   • Simple (default) — white card row: 28px tone icon pill + message
 *   • Titled (`title`) — colored tone header (icon + title + dismiss) + white body
 *   • In-card (`inCard`) — compact tinted row used inside cards
 *
 *   <nx-banner tone="success">Reading saved.</nx-banner>
 *   <nx-banner tone="critical" title="Temperature alarm" [dismissable]="true"
 *     (dismiss)="…">Fridge VF-1187 has been above 8°C for 4 hours.</nx-banner>
 *   <nx-banner tone="info" [inCard]="true">Syncing…</nx-banner>
 */
@Component({
  selector: 'nx-banner',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Titled form: colored header (icon + title + dismiss) over a white body -->
    <div *ngIf="title; else untitled" class="nx-banner nx-banner--titled" [ngClass]="toneClass" role="status">
      <div class="nx-banner__header">
        <span class="nx-banner__header-icon">
          <ng-container *ngTemplateOutlet="toneIcon; context: { $implicit: 14 }"></ng-container>
        </span>
        <span class="nx-banner__title">{{ title }}</span>
        <button *ngIf="dismissable" type="button" class="nx-banner__dismiss" aria-label="Dismiss" (click)="dismiss.emit()">
          <ng-container *ngTemplateOutlet="xIcon"></ng-container>
        </button>
      </div>
      <div class="nx-banner__body">
        <p class="nx-banner__message"><ng-content></ng-content></p>
        <div class="nx-banner__actions" *ngIf="actions.length">
          <button *ngFor="let a of actions" type="button" class="nx-banner__action-btn" (click)="a.onClick && a.onClick()">{{ a.label }}</button>
        </div>
      </div>
    </div>

    <ng-template #untitled>
      <!-- In-card form: compact tinted row -->
      <div *ngIf="inCard; else simple" class="nx-banner nx-banner--in-card" [ngClass]="toneClass" role="status">
        <span class="nx-banner__icon">
          <ng-container *ngTemplateOutlet="toneIcon; context: { $implicit: 20 }"></ng-container>
        </span>
        <p class="nx-banner__message"><ng-content></ng-content></p>
        <button *ngIf="dismissable" type="button" class="nx-banner__dismiss" aria-label="Dismiss" (click)="dismiss.emit()">
          <ng-container *ngTemplateOutlet="xIcon"></ng-container>
        </button>
      </div>
    </ng-template>

    <ng-template #simple>
      <!-- Simple form: white card row with the 28px tone icon pill -->
      <div class="nx-banner" [ngClass]="toneClass" role="status">
        <span class="nx-banner__icon-pill">
          <ng-container *ngTemplateOutlet="toneIcon; context: { $implicit: 20 }"></ng-container>
        </span>
        <p class="nx-banner__message"><ng-content></ng-content></p>
        <div class="nx-banner__actions" *ngIf="actions.length">
          <button *ngFor="let a of actions" type="button" class="nx-banner__action-btn" (click)="a.onClick && a.onClick()">{{ a.label }}</button>
        </div>
        <button *ngIf="dismissable" type="button" class="nx-banner__dismiss" aria-label="Dismiss" (click)="dismiss.emit()">
          <ng-container *ngTemplateOutlet="xIcon"></ng-container>
        </button>
      </div>
    </ng-template>

    <!-- Tone icons — paths from Banner.jsx (Nexleaf Icons V2); currentColor follows the tone text -->
    <ng-template #toneIcon let-size>
      <svg *ngIf="tone === 'info'" [attr.width]="size" [attr.height]="size" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 14a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75Z" />
        <path d="M9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
        <path fill-rule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
      </svg>
      <svg *ngIf="tone === 'success'" [attr.width]="size" [attr.height]="size" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M13.28 9.03a.75.75 0 0 0-1.06-1.06l-2.97 2.97-1.22-1.22a.75.75 0 0 0-1.06 1.06l1.75 1.75a.75.75 0 0 0 1.06 0l3.5-3.5Z" />
        <path fill-rule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
      </svg>
      <svg *ngIf="tone === 'warning'" [attr.width]="size" [attr.height]="size" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 6.75a.75.75 0 0 1 .75.75v3.5a.75.75 0 1 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z" />
        <path d="M11 13.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
        <path fill-rule="evenodd" d="M10 3.5c-1.045 0-1.784.702-2.152 1.447a449.26 449.26 0 0 1-2.005 3.847l-.028.052a403.426 403.426 0 0 0-2.008 3.856c-.372.752-.478 1.75.093 2.614.57.863 1.542 1.184 2.464 1.184h7.272c.922 0 1.895-.32 2.464-1.184.57-.864.465-1.862.093-2.614-.21-.424-1.113-2.147-2.004-3.847l-.032-.061a429.497 429.497 0 0 1-2.005-3.847c-.368-.745-1.107-1.447-2.152-1.447Zm-.808 2.112c.404-.816 1.212-.816 1.616 0 .202.409 1.112 2.145 2.022 3.88a418.904 418.904 0 0 1 2.018 3.875c.404.817 0 1.633-1.212 1.633h-7.272c-1.212 0-1.617-.816-1.212-1.633.202-.408 1.113-2.147 2.023-3.883a421.932 421.932 0 0 0 2.017-3.872Z" />
      </svg>
      <svg *ngIf="tone === 'critical'" [attr.width]="size" [attr.height]="size" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z" />
        <path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
        <path fill-rule="evenodd" d="M11.237 3.177a1.75 1.75 0 0 0-2.474 0l-5.586 5.585a1.75 1.75 0 0 0 0 2.475l5.586 5.586a1.75 1.75 0 0 0 2.474 0l5.586-5.586a1.75 1.75 0 0 0 0-2.475l-5.586-5.585Zm-1.414 1.06a.25.25 0 0 1 .354 0l5.586 5.586a.25.25 0 0 1 0 .354l-5.586 5.585a.25.25 0 0 1-.354 0l-5.586-5.585a.25.25 0 0 1 0-.354l5.586-5.586Z" />
      </svg>
    </ng-template>

    <ng-template #xIcon>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z" />
      </svg>
    </ng-template>
  `,
})
export class NxBannerComponent {
  @Input() tone: 'info' | 'success' | 'warning' | 'critical' = 'info';
  /** Renders the titled variant (colored header + white body). */
  @Input() title?: string;
  /** Compact tinted variant for use inside cards. */
  @Input() inCard = false;
  @Input() dismissable = false;
  @Input() actions: NxBannerAction[] = [];
  @Output() dismiss = new EventEmitter<void>();

  get toneClass(): string {
    return 'nx-banner--' + this.tone;
  }
}
