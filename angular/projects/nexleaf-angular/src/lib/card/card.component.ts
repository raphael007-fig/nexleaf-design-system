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

export type NxCardTone = 'default' | 'critical';

/**
 * nx-card-layout-type6 — header / action card.
 *
 * Header strip with a leading icon + title + optional badge on the left and an
 * optional action button on the top right; the body is projected content
 * (typically a row/stack of <nx-cell>s). Set `tone="critical"` to tint the card
 * edge red (the "Immediate Action" alert card). Project the header icon into the
 * `icon` slot and the body into the default slot:
 *
 *   <nx-card-layout-type6 tone="critical" title="Action Required"
 *     badge="5 Urgent Issues" actionLabel="View All Issues"
 *     (action)="goTo('/issues')">
 *     <svg icon>…</svg>
 *     <nx-cell …></nx-cell>
 *     <nx-cell …></nx-cell>
 *   </nx-card-layout-type6>
 */
@Component({
  selector: 'nx-card-layout-type6',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Loading skeleton — header + Cell-row placeholders (requires Skeleton.css). -->
    <div
      class="nx-card nx-card--type6 nx-card--loading"
      [class.nx-card--critical]="tone === 'critical'"
      *ngIf="loading; else content"
      aria-busy="true"
      aria-label="Loading card"
    >
      <div class="nx-card__head nx-card__head--action">
        <div class="nx-card__head-lead">
          <span class="nx-skeleton nx-card__sk-head-icon"></span>
          <span class="nx-skeleton nx-card__sk-head-title"></span>
          <span class="nx-skeleton nx-card__sk-head-badge"></span>
        </div>
        <span class="nx-skeleton nx-card__sk-head-action"></span>
      </div>
      <div class="nx-card__body">
        <nx-cell *ngFor="let r of loadingRowArray" [loading]="true"></nx-cell>
      </div>
    </div>

    <ng-template #content>
    <div
      class="nx-card nx-card--type6"
      [class.nx-card--critical]="tone === 'critical'"
    >
      <div class="nx-card__head nx-card__head--action">
        <div class="nx-card__head-lead">
          <span class="nx-card__head-icon" *ngIf="hasIcon">
            <ng-content select="[icon]"></ng-content>
          </span>
          <span class="nx-card__head-title" *ngIf="title">{{ title }}</span>
          <span
            class="nx-badge"
            [class.nx-badge--critical]="resolvedBadgeTone === 'critical'"
            [class.nx-badge--default]="resolvedBadgeTone === 'default'"
            *ngIf="badge"
          >{{ badge }}</span>
        </div>
        <button
          type="button"
          class="nx-btn nx-btn--plain"
          *ngIf="actionLabel"
          (click)="action.emit()"
        >{{ actionLabel }}</button>
      </div>
      <div class="nx-card__body">
        <ng-content></ng-content>
      </div>
    </div>
    </ng-template>
  `,
})
export class NxCardLayoutType6Component {
  /** Render the leading header icon (project the glyph into the `icon` slot). */
  @Input() hasIcon = false;
  @Input() title?: string;
  @Input() badge?: string;
  /** Badge tone; defaults to the card tone (critical when tone='critical'). */
  @Input() badgeTone?: 'default' | 'critical';
  @Input() actionLabel?: string;
  @Input() tone: NxCardTone = 'default';
  /** Render a header + Cell-row skeleton instead of content. */
  @Input() loading = false;
  /** Cell skeleton rows to show when loading. */
  @Input() loadingRows = 2;

  /** Fires when the top-right action button is clicked. */
  @Output() action = new EventEmitter<void>();

  get resolvedBadgeTone(): 'default' | 'critical' {
    return this.badgeTone || (this.tone === 'critical' ? 'critical' : 'default');
  }

  get loadingRowArray(): number[] {
    return Array.from({ length: Math.max(0, this.loadingRows) });
  }
}
