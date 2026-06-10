import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export type NxCellIconTone = 'success' | 'critical' | 'warning' | 'info' | 'neutral';

/**
 * nx-cell — composable list row.
 *
 * Template-only: emits the shared `.nx-cell` CSS classes (see
 * src/components/Cell/Cell.css). Import tokens.css + Cell.css (plus Badge.css /
 * Btn.css for the trailing badge & button) in your app for styling.
 *
 * A single 64px-tall row for list / table-of-contents surfaces. Every slot is
 * optional. Project the icon into the `icon` slot:
 *
 *   <nx-cell title="Equipment Manual" description="Cold chain" [hasChevron]="true">
 *     <svg icon>…</svg>
 *   </nx-cell>
 *
 * Set `buttonLabel` to render a trailing secondary button (emits `buttonClick`),
 * `badge` for a trailing default-tone badge, or `hasChevron` for the forward
 * chevron. For a toggle / radio / custom trailing control, project it into the
 * `trailing` slot. Set `interactive` to make the whole row clickable (emits
 * `cellClick` + hover background); force the hover look with `state="hover"`.
 */
@Component({
  selector: 'nx-cell',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Loading skeleton — shape-matching placeholder (requires Skeleton.css). -->
    <div class="nx-cell nx-cell--loading" *ngIf="loading; else content" aria-busy="true" aria-label="Loading row">
      <span class="nx-skeleton nx-cell__sk-icon" *ngIf="hasIcon"></span>
      <span class="nx-cell__sk-body">
        <span class="nx-skeleton nx-cell__sk-title"></span>
        <span class="nx-skeleton nx-cell__sk-description"></span>
      </span>
      <span class="nx-skeleton nx-cell__sk-trailing"></span>
    </div>

    <ng-template #content>
    <div
      class="nx-cell"
      [class.nx-cell--interactive]="interactive"
      [class.nx-cell--multiline]="!!description"
      [class.is-hover]="state === 'hover'"
      [attr.role]="interactive ? 'button' : null"
      [attr.tabindex]="interactive ? 0 : null"
      [attr.aria-label]="interactive ? ariaLabel : null"
      (click)="interactive && cellClick.emit()"
      (keydown.enter)="interactive && cellClick.emit()"
      (keydown.space)="interactive && cellClick.emit()"
    >
      <div
        class="nx-cell__icon"
        [class.nx-cell__icon--critical]="iconTone === 'critical'"
        [class.nx-cell__icon--warning]="iconTone === 'warning'"
        [class.nx-cell__icon--info]="iconTone === 'info'"
        [class.nx-cell__icon--neutral]="iconTone === 'neutral'"
        *ngIf="hasIcon"
      >
        <ng-content select="[icon]"></ng-content>
      </div>

      <div class="nx-cell__body" *ngIf="title || description">
        <div class="nx-cell__title-row" *ngIf="title">
          <span class="nx-cell__title">{{ title }}</span>
          <span class="nx-badge nx-badge--default" *ngIf="titleBadge">{{ titleBadge }}</span>
        </div>
        <span
          class="nx-cell__description"
          [class.nx-cell__description--clamp]="descriptionLines > 1"
          [class.nx-cell__description--wrap]="!descriptionLines"
          [style.--nx-cell-desc-lines]="descriptionLines > 1 ? descriptionLines : null"
          *ngIf="description"
        >{{ description }}</span>
      </div>

      <div
        class="nx-cell__trailing"
        *ngIf="badge || buttonLabel || hasChevron || hasTrailing"
      >
        <span class="nx-badge nx-badge--default" *ngIf="badge">{{ badge }}</span>

        <button
          type="button"
          class="nx-btn nx-btn--secondary nx-btn--sm"
          *ngIf="buttonLabel"
          (click)="onButtonClick($event)"
        >{{ buttonLabel }}</button>

        <ng-content select="[trailing]"></ng-content>

        <svg
          *ngIf="hasChevron"
          class="nx-cell__chevron"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7.5 5l5 5-5 5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    </ng-template>
  `,
})
export class NxCellComponent {
  /** Render the 32px icon tile (project the glyph into the `icon` slot). */
  @Input() hasIcon = false;
  /** Render a shape-matching skeleton instead of the row content. */
  @Input() loading = false;
  /** Tile tint. */
  @Input() iconTone: NxCellIconTone = 'success';
  @Input() title?: string;
  @Input() titleBadge?: string;
  @Input() description?: string;
  /** Description line clamp: 1 = single line + ellipsis (default); N = clamp to
   *  N lines; 0/null = wrap freely. */
  @Input() descriptionLines = 1;
  /** Trailing default-tone badge text. */
  @Input() badge?: string;
  /** Renders a trailing secondary button when set. */
  @Input() buttonLabel?: string;
  @Input() hasChevron = false;
  /** Set when projecting a toggle / radio / custom control into the `trailing` slot. */
  @Input() hasTrailing = false;
  /** Makes the whole row a clickable button (adds the hover background). */
  @Input() interactive = false;
  @Input() state: 'default' | 'hover' = 'default';
  @Input() ariaLabel?: string;

  /** Fires when the trailing button is clicked. */
  @Output() buttonClick = new EventEmitter<void>();
  /** Fires when an interactive row is clicked/activated. */
  @Output() cellClick = new EventEmitter<void>();

  onButtonClick(ev: Event): void {
    // Don't let the button click also bubble to the row's click handler.
    ev.stopPropagation();
    this.buttonClick.emit();
  }
}
