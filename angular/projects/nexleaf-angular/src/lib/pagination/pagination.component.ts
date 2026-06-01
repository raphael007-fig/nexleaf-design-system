import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/**
 * nx-pagination — prev/next pagination.
 * Renders the shared `.nx-pagination` CSS classes (see src/components/Pagination/Pagination.css).
 */
@Component({
  selector: 'nx-pagination',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="nx-pagination"
      [class.nx-pagination--table]="type === 'table'"
    >
      <span class="nx-pagination__label" *ngIf="label">{{ label }}</span>
      <div class="nx-pagination__nav">
        <button
          type="button"
          class="nx-pagination__btn nx-pagination__btn--prev"
          [disabled]="!hasPrevious"
          (click)="previous.emit()"
        ></button>
        <button
          type="button"
          class="nx-pagination__btn nx-pagination__btn--next"
          [disabled]="!hasNext"
          (click)="next.emit()"
        ></button>
      </div>
    </div>
  `,
})
export class NxPaginationComponent {
  @Input() type: 'page' | 'table' = 'page';
  @Input() hasPrevious = false;
  @Input() hasNext = false;
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Input() label?: string;
}
