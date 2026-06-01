import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/**
 * nx-accordion — expandable section.
 * Renders the shared `.nx-accordion` CSS classes (see src/components/Accordion/Accordion.css).
 */
@Component({
  selector: 'nx-accordion',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-accordion">
      <button
        type="button"
        class="nx-accordion__trigger"
        [class.nx-accordion__trigger--open]="open"
        (click)="toggle.emit()"
      >
        <span
          class="nx-accordion__title"
          [class.nx-accordion__title--required]="required"
        >{{ title }}</span>
        <span
          *ngIf="hasContent && !open"
          class="nx-accordion__dot"
        ></span>
        <span class="nx-accordion__chevron"></span>
      </button>
      <div class="nx-accordion__body" *ngIf="open">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class NxAccordionComponent {
  @Input() title = '';
  @Input() required = false;
  @Input() open = false;
  @Input() hasContent = false;
  @Output() toggle = new EventEmitter<void>();
}
