import {
  Component, Input, Output, EventEmitter, HostListener,
  ChangeDetectionStrategy, OnChanges, SimpleChanges, OnDestroy,
} from '@angular/core';
import { NxScrollLockService } from '../overlay/scroll-lock.service';

/**
 * nx-modal — centered, focus-trapped dialog.
 *
 * Angular port of the React Modal (src/components/Modal/Modal.jsx). Renders the
 * shared `.nx-modal` classes (Modal.css): a scrim, a centered white card with a
 * header (title + close), a scrollable body, and a footer action row. Built on
 * the same overlay foundation as nx-slide-over — focus trap (nxFocusTrap) +
 * scroll lock (NxScrollLockService) + Escape/backdrop dismissal.
 *
 * Project body content into the default slot, footer actions into `[footer]`.
 *
 *   <nx-modal [open]="open" title="Edit reading" [hasFooter]="true"
 *             (close)="open = false">
 *     …form…
 *     <div footer>
 *       <button nx-btn variant="secondary" (click)="open = false">Cancel</button>
 *       <button nx-btn variant="primary" (click)="save()">Save</button>
 *     </div>
 *   </nx-modal>
 */
@Component({
  selector: 'nx-modal',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="nx-modal"
      *ngIf="open"
      (mousedown)="onBackdrop($event)"
    >
      <div
        class="nx-modal__panel"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="title ? null : (ariaLabel || null)"
        tabindex="-1"
        nxFocusTrap
        (mousedown)="$event.stopPropagation()"
      >
        <header
          class="nx-modal__header"
          [class.nx-modal__header--close-only]="!title"
          *ngIf="title || showCloseButton"
        >
          <h2 class="nx-modal__title" *ngIf="title">{{ title }}</h2>
          <button
            type="button"
            class="nx-modal__close"
            aria-label="Close"
            *ngIf="showCloseButton"
            (click)="close.emit()"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </button>
        </header>

        <div class="nx-modal__body">
          <ng-content></ng-content>
        </div>

        <div class="nx-modal__footer" *ngIf="hasFooter">
          <ng-content select="[footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class NxModalComponent implements OnChanges, OnDestroy {
  @Input() open = false;
  @Input() title?: string;
  @Input() showCloseButton = true;
  @Input() closeOnBackdrop = true;
  @Input() closeOnEscape = true;
  /** Set true when projecting `[footer]` content. */
  @Input() hasFooter = false;
  /** Accessible name when no `title` is provided. */
  @Input() ariaLabel?: string;

  @Output() close = new EventEmitter<void>();

  constructor(private scrollLock: NxScrollLockService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      if (this.open) this.scrollLock.lock();
      else if (!changes['open'].firstChange) this.scrollLock.unlock();
    }
  }

  ngOnDestroy(): void {
    if (this.open) this.scrollLock.unlock();
  }

  onBackdrop(e: MouseEvent): void {
    if (this.closeOnBackdrop && e.target === e.currentTarget) this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open && this.closeOnEscape) this.close.emit();
  }
}
