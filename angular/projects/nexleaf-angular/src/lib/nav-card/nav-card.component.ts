import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export type NxNavCardLayout = 'home' | 'sub';

/**
 * nx-nav-card — Home / Sub-Home navigation card.
 *
 * Template-only: emits the shared `.nx-nav-card` CSS classes (see
 * src/components/NavCard/NavCard.css). Import tokens.css + NavCard.css in your
 * app for styling.
 *
 *   • layout="home" (default) — illustration + title + description centered.
 *   • layout="sub"            — icon top-left, title + description left-aligned.
 *
 * Project the illustration/icon into the `media` slot:
 *   <nx-nav-card title="Training" buttonLabel="View">
 *     <svg media>…</svg>
 *   </nx-nav-card>
 *
 * Set `buttonLabel` to render the View button (emits `viewClick`). Set
 * `interactive` to make the whole card clickable (emits `cardClick` + adds the
 * blue hover ring).
 */
@Component({
  selector: 'nx-nav-card',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Loading skeleton — honours the layout alignment (requires Skeleton.css). -->
    <div
      class="nx-nav-card nx-nav-card--loading"
      [class.nx-nav-card--sub]="layout === 'sub'"
      *ngIf="loading; else content"
      aria-busy="true"
      aria-label="Loading card"
    >
      <span class="nx-skeleton nx-nav-card__sk-media"></span>
      <span class="nx-skeleton nx-nav-card__sk-title"></span>
      <span class="nx-skeleton nx-nav-card__sk-description"></span>
      <span class="nx-skeleton nx-nav-card__sk-action" *ngIf="hasButton"></span>
    </div>

    <ng-template #content>
    <div
      class="nx-nav-card"
      [class.nx-nav-card--sub]="layout === 'sub'"
      [class.nx-nav-card--interactive]="interactive"
      [attr.role]="interactive ? 'button' : null"
      [attr.tabindex]="interactive ? 0 : null"
      [attr.aria-label]="interactive ? ariaLabel : null"
      (click)="interactive && cardClick.emit()"
      (keydown.enter)="interactive && cardClick.emit()"
      (keydown.space)="interactive && cardClick.emit()"
    >
      <div class="nx-nav-card__media">
        <ng-content select="[media]"></ng-content>
      </div>

      <div class="nx-nav-card__title" *ngIf="title">{{ title }}</div>
      <div class="nx-nav-card__description" *ngIf="description">{{ description }}</div>

      <div class="nx-nav-card__action" *ngIf="buttonLabel">
        <button
          type="button"
          class="nx-btn nx-btn--secondary nx-btn--sm"
          (click)="onButtonClick($event)"
        >
          {{ buttonLabel }}
          <svg
            class="nx-nav-card__action-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 4l4 4-4 4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
    </ng-template>
  `,
})
export class NxNavCardComponent {
  @Input() layout: NxNavCardLayout = 'home';
  @Input() title?: string;
  @Input() description?: string;
  /** Renders the View button when set. */
  @Input() buttonLabel?: string;
  /** Render a shape-matching skeleton instead of the card content. */
  @Input() loading = false;
  /** When loading, render the button skeleton block (defaults to true). */
  @Input() hasButton = true;
  /** Makes the whole card a clickable button (adds the blue hover ring). */
  @Input() interactive = false;
  @Input() ariaLabel?: string;

  /** Fires when the View button is clicked. */
  @Output() viewClick = new EventEmitter<void>();
  /** Fires when an interactive card is clicked/activated. */
  @Output() cardClick = new EventEmitter<void>();

  onButtonClick(ev: Event): void {
    // Don't let the button click also bubble to the card's click handler.
    ev.stopPropagation();
    this.viewClick.emit();
  }
}
