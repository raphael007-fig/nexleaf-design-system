import {
  Component, Input, Output, EventEmitter, HostListener,
  ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';

export type NxTopBarState = 'wide' | 'medium' | 'compact' | 'mobile';

/** Width → progressive state (mirrors topBarStateForWidth in React). */
export function nxTopBarStateForWidth(width: number): NxTopBarState {
  if (width >= 1024) return 'wide';
  if (width >= 900) return 'medium';
  if (width >= 768) return 'compact';
  return 'mobile';
}

/**
 * nx-top-bar — synchronized progressive top navigation.
 *
 * One bar that collapses by width: full → compressed → hidden breadcrumb, then
 * Notification → drawer, then Profile → drawer. Control order is fixed; the CSS
 * (TopBar.css) toggles only the breadcrumb / bell / profile. Menu always opens
 * the global drawer; removed controls live there. Project the logo + breadcrumb
 * variants (Angular has no Breadcrumbs component):
 *   [logo] · [breadcrumb-full] · [breadcrumb-compressed]
 *
 *   <nx-top-bar countryName="Kenya" (menu)="open()" (notification)="…">
 *     <span logo>…leaf…</span>
 *     <nav breadcrumb-full>Home / Inventory / ColdChain</nav>
 *     <nav breadcrumb-compressed>Home / … / ColdChain</nav>
 *   </nx-top-bar>
 */
@Component({
  selector: 'nx-top-bar',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="nx-top-bar"
      [class.nx-top-bar--sticky]="sticky"
      [class.nx-top-bar--wide]="resolved === 'wide'"
      [class.nx-top-bar--medium]="resolved === 'medium'"
      [class.nx-top-bar--compact]="resolved === 'compact'"
      [class.nx-top-bar--mobile]="resolved === 'mobile'"
    >
      <header class="nx-toolbar nx-top-bar__bar" [class.nx-toolbar--mobile]="resolved === 'mobile'">
        <div class="nx-toolbar__start">
          <button type="button" class="nx-toolbar__icon-btn" aria-label="Open menu" (click)="menu.emit()">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </button>
          <!-- Logo is dropped in the mobile state so Ask AI + Country stop
               colliding; the brand still lives in the drawer the menu opens. -->
          <span class="nx-top-bar__logo" *ngIf="resolved !== 'mobile'"><ng-content select="[logo]"></ng-content></span>
          <!-- Loading: the breadcrumb (data-bearing) becomes a wide line skeleton;
               the projected breadcrumb slots are suppressed by the state classes. -->
          <span
            *ngIf="loading && resolved !== 'compact' && resolved !== 'mobile'"
            class="nx-skeleton"
            aria-label="Loading navigation"
            style="width: 200px; height: 20px;"
          ></span>
          <ng-container *ngIf="!loading">
            <span class="nx-top-bar__breadcrumb-full"><ng-content select="[breadcrumb-full]"></ng-content></span>
            <span class="nx-top-bar__breadcrumb-compressed"><ng-content select="[breadcrumb-compressed]"></ng-content></span>
          </ng-container>
        </div>

        <div class="nx-toolbar__center">
          <button type="button" class="nx-btn nx-btn--ask-ai" (click)="askAi.emit()">
            <span class="nx-top-bar__ask-ai-mark"></span>{{ askAiLabel }}
          </button>
        </div>

        <div class="nx-toolbar__end">
          <!-- Loading: the region/country pill (data-bearing) becomes an ~80px
               pill-shaped skeleton (8px radius, matching the pill). -->
          <span
            *ngIf="loading"
            class="nx-skeleton"
            style="width: 80px; height: 36px;"
          ></span>
          <button type="button" class="nx-toolbar__region" *ngIf="!loading" (click)="country.emit()">
            <span class="nx-top-bar__flag">{{ countryFlag }}</span> {{ countryName }}
          </button>
          <button type="button" class="nx-toolbar__icon-btn" aria-label="Apps" (click)="apps.emit()">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="3.5" y="3.5" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4" />
              <rect x="11.5" y="3.5" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4" />
              <rect x="3.5" y="11.5" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4" />
              <rect x="11.5" y="11.5" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4" />
            </svg>
          </button>
          <button type="button" class="nx-toolbar__icon-btn nx-top-bar__bell" aria-label="Notifications" (click)="notification.emit()">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 3a4 4 0 0 0-4 4c0 4-1.5 5-1.5 5h11S14 11 14 7a4 4 0 0 0-4-4ZM8.5 15a1.5 1.5 0 0 0 3 0" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
            </svg>
          </button>
          <!-- Loading: the avatar (data-bearing) becomes a 36px circle skeleton;
               it keeps the __profile class so it follows the same collapse rules. -->
          <span
            *ngIf="loading"
            class="nx-skeleton nx-skeleton--circle nx-top-bar__profile"
            style="width: 36px; height: 36px;"
          ></span>
          <button type="button" class="nx-toolbar__avatar nx-top-bar__profile" *ngIf="!loading" aria-label="Profile" (click)="profile.emit()">{{ userInitials }}</button>
        </div>
      </header>
    </div>
  `,
})
export class NxTopBarComponent {
  /** Force a state, or leave undefined to derive from window width. */
  @Input() set state(v: NxTopBarState | undefined) { this._state = v; }
  get state(): NxTopBarState | undefined { return this._state; }
  private _state?: NxTopBarState;

  @Input() sticky = false;
  /**
   * Swap the data-bearing bits — breadcrumb, region/country pill, and avatar —
   * for `.nx-skeleton` placeholders while data loads. Menu / logo / Ask AI / apps
   * stay as static chrome. Mirrors the React TopBar `loading` prop. Requires
   * Skeleton.css (`.nx-skeleton` / `.nx-skeleton--circle`).
   */
  @Input() loading = false;
  @Input() countryName = 'Kenya';
  @Input() countryFlag = '🇰🇪';
  @Input() askAiLabel = 'Ask AI';
  @Input() userInitials = 'NA';

  @Output() menu = new EventEmitter<void>();
  @Output() askAi = new EventEmitter<void>();
  @Output() country = new EventEmitter<void>();
  @Output() apps = new EventEmitter<void>();
  @Output() notification = new EventEmitter<void>();
  @Output() profile = new EventEmitter<void>();

  private width = typeof window !== 'undefined' ? window.innerWidth : 1280;

  constructor(private cdr: ChangeDetectorRef) {}

  get resolved(): NxTopBarState {
    return this._state || nxTopBarStateForWidth(this.width);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this._state) return; // explicit state wins
    this.width = window.innerWidth;
    this.cdr.markForCheck();
  }
}
