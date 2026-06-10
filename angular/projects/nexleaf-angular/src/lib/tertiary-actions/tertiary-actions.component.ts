import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NxSheetAction } from '../bottom-sheet/bottom-sheet.component';

export interface NxTertiaryConfig {
  primary: NxSheetAction;
  more: NxSheetAction[];
}

/** Canonical state → { primary, more } map (mirrors TERTIARY_ACTION_MAP in React). */
export const NX_TERTIARY_ACTION_MAP: Record<string, NxTertiaryConfig> = {
  functional: {
    primary: { id: 'edit', label: 'Edit Information' },
    more: [
      { id: 'view-summary', label: 'View Summary' },
      { id: 'create-service-request', label: 'Create Service Request' },
      { id: 'view-plot', label: 'View Plot' },
      { id: 'view-daily-summary', label: 'View Daily Summary' },
      { id: 'assign-qr', label: 'Assign QR Code' },
    ],
  },
  faulty: {
    primary: { id: 'create-service-request', label: 'Create Service Request' },
    more: [
      { id: 'edit', label: 'Edit Information' },
      { id: 'view-open-issues', label: 'View Open Issues' },
      { id: 'view-plot', label: 'View Plot' },
      { id: 'view-daily-summary', label: 'View Daily Summary' },
      { id: 'assign-qr', label: 'Assign QR Code' },
    ],
  },
  unknown: {
    primary: { id: 'view-monitoring-issue', label: 'View Monitoring Issue' },
    more: [
      { id: 'edit', label: 'Edit Information' },
      { id: 'create-service-request', label: 'Create Service Request' },
      { id: 'view-plot', label: 'View Plot' },
      { id: 'view-daily-summary', label: 'View Daily Summary' },
      { id: 'assign-qr', label: 'Assign QR Code' },
    ],
  },
  decommissioning: {
    primary: { id: 'review-decommissioning', label: 'Review Decommissioning' },
    more: [
      { id: 'edit', label: 'Edit Information' },
      { id: 'create-service-request', label: 'Create Service Request' },
      { id: 'view-history', label: 'View History' },
      { id: 'export-record', label: 'Export Record' },
    ],
  },
};

function resolveState(state?: string): string {
  const key = String(state ?? '').toLowerCase();
  if (key === 'active') return 'functional';
  if (key === 'decommissioned' || key.indexOf('approaching') === 0) return 'decommissioning';
  return NX_TERTIARY_ACTION_MAP[key] ? key : 'functional';
}

/**
 * nx-tertiary-actions — state-driven [Primary][More] record actions.
 *
 * The primary action follows equipment state (never hardcoded to Edit). On
 * mobile, More opens nx-bottom-sheet; on desktop, an inline dropdown menu.
 *
 *   <nx-tertiary-actions state="faulty" [mobile]="isMobile"
 *     (action)="route($event)"></nx-tertiary-actions>
 */
@Component({
  selector: 'nx-tertiary-actions',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-tertiary-actions" [class.nx-tertiary-actions--full]="fullWidth">
      <button
        type="button"
        class="nx-btn nx-btn--primary"
        [class.nx-btn--full]="fullWidth"
        [class.nx-btn--lg]="mobile"
        (click)="action.emit(config.primary.id)"
      >{{ config.primary.label }}</button>

      <ng-container *ngIf="mobile; else desktopMore">
        <button
          type="button"
          class="nx-btn nx-btn--secondary nx-btn--lg"
          [class.nx-btn--full]="fullWidth"
          (click)="sheetOpen = true"
        >{{ moreLabel }}</button>
        <nx-bottom-sheet
          [open]="sheetOpen"
          title="Actions"
          [actions]="config.more"
          (selected)="onMore($event)"
          (closed)="sheetOpen = false"
        ></nx-bottom-sheet>
      </ng-container>

      <ng-template #desktopMore>
        <div style="position: relative; display: inline-flex;">
          <button
            type="button"
            class="nx-btn nx-btn--secondary nx-btn--disclosure"
            aria-haspopup="menu"
            [attr.aria-expanded]="menuOpen"
            (click)="menuOpen = !menuOpen"
          >{{ moreLabel }}</button>
          <div
            class="nx-tertiary-actions__menu"
            role="menu"
            *ngIf="menuOpen"
            style="position: absolute; top: calc(100% + 6px); right: 0; z-index: var(--nx-z-overlay); background: var(--nx-bg-surface); border: 1px solid var(--nx-border-default); border-radius: var(--nx-radius-sm); box-shadow: var(--nx-shadow-overlay);"
          >
            <button
              *ngFor="let a of config.more"
              type="button"
              role="menuitem"
              class="nx-tertiary-actions__menu-item"
              [class.nx-tertiary-actions__menu-item--destructive]="a.destructive"
              (click)="onMore(a.id || a.label)"
            >{{ a.label }}</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class NxTertiaryActionsComponent {
  @Input() state?: string;
  @Input() mobile = false;
  @Input() moreLabel = 'More';
  @Input() fullWidth = false;

  /** Fires with the action id for the primary and any More item. */
  @Output() action = new EventEmitter<string>();

  sheetOpen = false;
  menuOpen = false;

  get config(): NxTertiaryConfig {
    return NX_TERTIARY_ACTION_MAP[resolveState(this.state)];
  }

  onMore(id: string): void {
    this.action.emit(id);
    this.menuOpen = false;
    this.sheetOpen = false;
  }
}
