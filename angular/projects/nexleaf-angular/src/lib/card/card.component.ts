import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface NxCardField {
  label: string;
  value: string;
}

export interface NxCardTab {
  label: string;
}

/** nx-card-layout-type1 — image gallery + field list + notes. */
@Component({
  selector: 'nx-card-layout-type1',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-card nx-card--type1">
      <div class="nx-card__images" *ngIf="images.length">
        <img *ngFor="let src of images" [src]="src" class="nx-card__image" alt="" />
      </div>
      <dl class="nx-card__fields">
        <div class="nx-card__field" *ngFor="let f of fields">
          <dt class="nx-card__field-label">{{ f.label }}</dt>
          <dd class="nx-card__field-value">{{ f.value }}</dd>
        </div>
      </dl>
      <p class="nx-card__notes" *ngIf="notes">{{ notes }}</p>
    </div>
  `,
})
export class NxCardLayoutType1Component {
  @Input() images: string[] = [];
  @Input() fields: NxCardField[] = [];
  @Input() notes?: string;
}

/** nx-card-layout-type2 — titled card with tabs + table. */
@Component({
  selector: 'nx-card-layout-type2',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-card nx-card--type2">
      <div class="nx-card__head" *ngIf="title || description">
        <h3 class="nx-card__title" *ngIf="title">{{ title }}</h3>
        <p class="nx-card__description" *ngIf="description">{{ description }}</p>
      </div>
      <div class="nx-card__tabs" *ngIf="tabs.length">
        <button
          *ngFor="let t of tabs; let i = index"
          type="button"
          class="nx-card__tab"
          [class.nx-card__tab--active]="i === activeTab"
          (click)="tabChange.emit(i)"
        >{{ t.label }}</button>
      </div>
      <table class="nx-card__table" *ngIf="tableRows.length">
        <tr class="nx-card__table-row" *ngFor="let row of tableRows">
          <td *ngFor="let cell of objectValues(row)">{{ cell }}</td>
        </tr>
      </table>
    </div>
  `,
})
export class NxCardLayoutType2Component {
  @Input() title?: string;
  @Input() description?: string;
  @Input() tabs: NxCardTab[] = [];
  @Input() activeTab = 0;
  @Output() tabChange = new EventEmitter<number>();
  @Input() tableRows: any[] = [];
  @Input() defaultOpen = false;

  objectValues(row: any): any[] {
    return row && typeof row === 'object' ? Object.values(row) : [row];
  }
}

/** nx-card-layout-type3 — region + facility link. */
@Component({
  selector: 'nx-card-layout-type3',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-card nx-card--type3">
      <span class="nx-card__region" *ngIf="region">{{ region }}</span>
      <a class="nx-card__facility" *ngIf="facilityName" [href]="facilityHref || '#'">{{ facilityName }}</a>
    </div>
  `,
})
export class NxCardLayoutType3Component {
  @Input() region?: string;
  @Input() facilityName?: string;
  @Input() facilityHref?: string;
}

/** nx-card-layout-type4 — added-by + contact metadata. */
@Component({
  selector: 'nx-card-layout-type4',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-card nx-card--type4">
      <div class="nx-card__meta" *ngIf="addedBy">
        <span class="nx-card__meta-label">Added by</span>
        <span class="nx-card__meta-value">{{ addedBy }}</span>
      </div>
      <div class="nx-card__meta" *ngIf="contactNumber">
        <span class="nx-card__meta-label">Contact</span>
        <span class="nx-card__meta-value">{{ contactNumber }}</span>
      </div>
    </div>
  `,
})
export class NxCardLayoutType4Component {
  @Input() addedBy?: string;
  @Input() contactNumber?: string;
}
