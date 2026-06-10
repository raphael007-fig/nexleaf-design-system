import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/** status → { tone, label } (mirrors STATUS_BADGE_MAP in React). */
const STATUS_MAP: Record<string, { tone: string; label: string }> = {
  functional: { tone: 'success', label: 'Functional' },
  active: { tone: 'success', label: 'Active' },
  faulty: { tone: 'critical', label: 'Faulty' },
  unknown: { tone: 'default', label: 'Unknown' },
  decommissioned: { tone: 'warning', label: 'Decommissioned' },
  'under maintenance': { tone: 'info', label: 'Under Maintenance' },
  'under-maintenance': { tone: 'info', label: 'Under Maintenance' },
  upcoming: { tone: 'attention', label: 'Upcoming' },
  overdue: { tone: 'critical', label: 'Overdue' },
  'approaching decommissioning': { tone: 'warning', label: 'Approaching Decommissioning' },
  'approaching-decommissioning': { tone: 'warning', label: 'Approaching Decommissioning' },
};

/**
 * nx-equipment-card — mobile list card for an equipment record.
 *
 * Shows only decision-critical fields and keeps Health / Maintenance / Lifecycle
 * as separate text badges. The whole card is tappable and routes to the record
 * page. Project a thumbnail into the `[thumb]` slot (or rely on the fallback).
 *
 *   <nx-equipment-card name="Vestfrost MK 144" type="Vaccine Freezer"
 *     serial="DCM-2024-001" facility="Mombasa" health="functional"
 *     maintenance="upcoming" (cardClick)="go(id)"></nx-equipment-card>
 */
@Component({
  selector: 'nx-equipment-card',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Loading: shape-matching skeleton in the same card shell (no reflow). -->
    <div class="nx-equipment-card" *ngIf="loading" aria-busy="true" aria-label="Loading equipment">
      <span class="nx-skeleton" style="width:48px;height:48px;border-radius:8px"></span>
      <div class="nx-equipment-card__body" style="gap:8px;padding-top:2px">
        <span class="nx-skeleton" style="width:60%;height:12px"></span>
        <span class="nx-skeleton" style="width:85%;height:11px"></span>
        <span class="nx-skeleton" style="width:45%;height:11px"></span>
        <div class="nx-equipment-card__statuses">
          <span class="nx-skeleton" style="width:70px;height:18px;border-radius:100px"></span>
          <span class="nx-skeleton" style="width:58px;height:18px;border-radius:100px"></span>
        </div>
      </div>
    </div>

    <div
      *ngIf="!loading"
      class="nx-equipment-card"
      [class.nx-equipment-card--interactive]="interactive"
      [class.nx-equipment-card--hover]="state === 'hover'"
      [attr.role]="interactive ? 'button' : null"
      [attr.tabindex]="interactive ? 0 : null"
      [attr.aria-label]="ariaLabel || name"
      (click)="interactive && cardClick.emit()"
      (keydown.enter)="interactive && cardClick.emit()"
      (keydown.space)="interactive && cardClick.emit()"
    >
      <div class="nx-equipment-card__thumb">
        <img *ngIf="image; else thumbSlot" [src]="image" alt="" />
        <ng-template #thumbSlot><ng-content select="[thumb]"></ng-content></ng-template>
      </div>

      <div class="nx-equipment-card__body">
        <div class="nx-equipment-card__name-row">
          <span class="nx-equipment-card__name">{{ name }}</span>
          <svg *ngIf="interactive" class="nx-equipment-card__chevron" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7.5 5l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

        <span class="nx-equipment-card__meta" *ngIf="type || serial">{{ metaLine }}</span>
        <span class="nx-equipment-card__facility" *ngIf="facility">{{ facility }}</span>

        <div class="nx-equipment-card__statuses" *ngIf="health || maintenance || lifecycle">
          <span class="nx-badge" [ngClass]="'nx-badge--' + tone(health)" *ngIf="health">{{ label(health) }}</span>
          <span class="nx-badge" [ngClass]="'nx-badge--' + tone(maintenance)" *ngIf="maintenance">{{ label(maintenance) }}</span>
          <span class="nx-badge" [ngClass]="'nx-badge--' + tone(lifecycle)" *ngIf="lifecycle">{{ label(lifecycle) }}</span>
        </div>
      </div>
    </div>
  `,
})
export class NxEquipmentCardComponent {
  @Input() name?: string;
  @Input() type?: string;
  @Input() serial?: string;
  @Input() facility?: string;
  @Input() image?: string;
  @Input() health?: string;
  @Input() maintenance?: string;
  @Input() lifecycle?: string;
  @Input() ariaLabel?: string;
  /** Whole-card tap → record page (adds chevron + hover ring). */
  @Input() interactive = true;
  /** Render a shape-matching skeleton in place of the content. */
  @Input() loading = false;
  /** Force the interactive look in docs: 'default' | 'hover'. */
  @Input() state: 'default' | 'hover' = 'default';

  @Output() cardClick = new EventEmitter<void>();

  get metaLine(): string {
    return [this.type, this.serial].filter(Boolean).join(' · ');
  }

  tone(status?: string): string {
    return (status && STATUS_MAP[status.toLowerCase()]?.tone) || 'default';
  }
  label(status?: string): string {
    if (!status) return '';
    return STATUS_MAP[status.toLowerCase()]?.label || status;
  }
}
