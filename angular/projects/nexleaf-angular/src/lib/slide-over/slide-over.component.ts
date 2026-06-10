import {
  Component, Input, Output, EventEmitter, HostListener,
  ChangeDetectionStrategy, OnChanges, SimpleChanges, OnDestroy,
} from '@angular/core';
import { NxScrollLockService } from '../overlay/scroll-lock.service';

export type NxSlideOverPlacement = 'right' | 'left' | 'bottom';

/**
 * nx-slide-over — overlay shell anchored to an edge of the viewport.
 *
 * One shell, three placements: right (Right Slider Modal), left (Menu Drawer),
 * bottom (Bottom Sheet). Emits the shared `.nx-slideover` classes (SlideOver.css)
 * and wires focus trap (nxFocusTrap directive) + scroll lock + Escape/backdrop
 * dismissal. Project body content into the default slot, footer into `[footer]`.
 *
 *   <nx-slide-over [open]="open" placement="left" title="Menu" (closed)="open=false">
 *     …body…
 *     <div footer>…</div>
 *   </nx-slide-over>
 */
@Component({
  selector: 'nx-slide-over',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="nx-slideover"
      [class.nx-slideover--right]="placement === 'right'"
      [class.nx-slideover--left]="placement === 'left'"
      [class.nx-slideover--bottom]="placement === 'bottom'"
      *ngIf="open"
      (mousedown)="onBackdrop($event)"
    >
      <div
        class="nx-slideover__panel"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="ariaLabel || null"
        tabindex="-1"
        nxFocusTrap
        [nxFocusTrapInitial]="initialFocus"
        (mousedown)="$event.stopPropagation()"
      >
        <div class="nx-slideover__drag-handle" *ngIf="showDragHandle"></div>

        <header class="nx-slideover__header" *ngIf="title || showCloseButton">
          <div class="nx-slideover__header-row">
            <h2 class="nx-slideover__title" *ngIf="title">{{ title }}</h2>
            <button
              type="button"
              class="nx-slideover__close"
              aria-label="Close"
              *ngIf="showCloseButton"
              (click)="closed.emit()"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </header>

        <div class="nx-slideover__body" [class.nx-slideover__body--flush]="flushBody">
          <ng-content></ng-content>
        </div>

        <div class="nx-slideover__footer" *ngIf="hasFooter">
          <ng-content select="[footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class NxSlideOverComponent implements OnChanges, OnDestroy {
  @Input() open = false;
  @Input() placement: NxSlideOverPlacement = 'right';
  @Input() title?: string;
  @Input() showCloseButton = true;
  @Input() closeOnBackdrop = true;
  @Input() closeOnEscape = true;
  /** Force the drag handle (defaults on for placement="bottom"). */
  @Input() dragHandle?: boolean;
  /** Set true when projecting `[footer]` content. */
  @Input() hasFooter = false;
  /** Remove the default body padding (e.g. when the body hosts a full-bleed nav). */
  @Input() flushBody = false;
  /** 'auto' focuses the first focusable on open; 'container' focuses the panel
   *  itself (no visible ring) — preferred for the nav drawer. */
  @Input() initialFocus: 'auto' | 'container' = 'auto';
  @Input() ariaLabel?: string;

  @Output() closed = new EventEmitter<void>();

  constructor(private scrollLock: NxScrollLockService) {}

  get showDragHandle(): boolean {
    return this.dragHandle ?? this.placement === 'bottom';
  }

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
    if (this.closeOnBackdrop && e.target === e.currentTarget) this.closed.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open && this.closeOnEscape) this.closed.emit();
  }
}
