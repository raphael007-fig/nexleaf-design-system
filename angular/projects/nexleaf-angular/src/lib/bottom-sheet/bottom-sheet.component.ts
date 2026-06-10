import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
} from '@angular/core';

export interface NxSheetAction {
  id?: string;
  label: string;
  destructive?: boolean;
  disabled?: boolean;
  hasChevron?: boolean;
  /** Force the interaction fill in docs: 'default' | 'hover' | 'active'. */
  state?: 'default' | 'hover' | 'active';
}
export interface NxSheetGroup {
  title?: string;
  actions: NxSheetAction[];
}

/**
 * nx-bottom-sheet — mobile action-overflow sheet.
 *
 * Composes nx-slide-over (placement="bottom") and renders a flat or grouped
 * action list. Groups are separated by dividers; destructive actions use the
 * critical tone and are visually separated. For filter/sort/selector content,
 * project arbitrary content (omit `groups`/`actions`).
 *
 *   <nx-bottom-sheet [open]="open" title="Actions" [groups]="groups"
 *     (selected)="run($event)" (closed)="open=false"></nx-bottom-sheet>
 */
@Component({
  selector: 'nx-bottom-sheet',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nx-slide-over
      [open]="open"
      placement="bottom"
      [dragHandle]="true"
      [title]="title"
      [showCloseButton]="showCloseButton"
      [flushBody]="!!resolvedGroups || loading"
      (closed)="closed.emit()"
    >
      <!-- Loading: shape-matching skeleton rows in place of the list (no reflow). -->
      <div class="nx-bottom-sheet__list" *ngIf="loading" role="menu" aria-busy="true" aria-label="Loading actions">
        <div class="nx-bottom-sheet__action" *ngFor="let w of skeletonWidths" style="pointer-events:none">
          <span class="nx-skeleton" style="width:20px;height:20px;border-radius:4px;flex-shrink:0"></span>
          <span class="nx-skeleton" [style.width]="w" style="height:13px"></span>
        </div>
      </div>

      <ng-container *ngIf="!loading && resolvedGroups; else projected">
        <div class="nx-bottom-sheet__list" role="menu" [attr.aria-label]="title || 'Actions'">
          <ng-container *ngFor="let group of resolvedGroups; let gi = index">
            <div class="nx-bottom-sheet__sep" *ngIf="gi > 0"></div>
            <div class="nx-bottom-sheet__group-title" *ngIf="group.title">{{ group.title }}</div>
            <button
              *ngFor="let a of group.actions"
              type="button"
              class="nx-bottom-sheet__action"
              [class.nx-bottom-sheet__action--destructive]="a.destructive"
              [class.nx-bottom-sheet__action--hover]="a.state === 'hover'"
              [class.nx-bottom-sheet__action--active]="a.state === 'active'"
              [disabled]="a.disabled"
              role="menuitem"
              (click)="onAction(a)"
            >
              <span class="nx-bottom-sheet__action-label">{{ a.label }}</span>
              <svg *ngIf="a.hasChevron" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M7.5 5l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </ng-container>
        </div>
      </ng-container>
      <ng-template #projected>
        <ng-container *ngIf="!loading"><ng-content></ng-content></ng-container>
      </ng-template>
    </nx-slide-over>
  `,
})
export class NxBottomSheetComponent {
  @Input() open = false;
  @Input() title?: string;
  @Input() actions?: NxSheetAction[];
  @Input() groups?: NxSheetGroup[];
  @Input() showCloseButton = false;
  @Input() closeAfterAction = true;
  /** Render shape-matching skeleton rows in place of the list while data loads. */
  @Input() loading = false;

  /** Varied label widths for the ~5 loading rows (mirrors the React skeleton). */
  readonly skeletonWidths = ['62%', '48%', '70%', '54%', '40%'];

  /** Fires with the action id (or label) when an action row is tapped. */
  @Output() selected = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();

  /** groups win; else a flat actions array becomes one untitled group. */
  get resolvedGroups(): NxSheetGroup[] | null {
    if (this.groups) return this.groups;
    if (this.actions) return [{ actions: this.actions }];
    return null;
  }

  onAction(a: NxSheetAction): void {
    if (a.disabled) return;
    this.selected.emit(a.id || a.label);
    if (this.closeAfterAction) this.closed.emit();
  }
}
