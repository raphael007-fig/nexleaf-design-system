import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface NxIndexTableColumn {
  key: string;
  title?: string;
  /** 'status' renders the cell value as an .nx-badge status pill. */
  type?: 'status';
  [k: string]: any;
}

export interface NxIndexTableAction {
  label?: string;
  content?: string;
  onAction?: (row?: any) => void;
}

export interface NxIndexTableEmptyState {
  heading: string;
  description: string;
}

/**
 * status → { tone, label } — mirrors STATUS_BADGE_MAP in React Badge.jsx
 * (same approach as equipment-card.component.ts). Keys are matched
 * case-insensitively; unknown statuses fall back to the default tone with the
 * raw value as the label, so new domain statuses degrade gracefully.
 */
const STATUS_MAP: Record<string, { tone: string; label: string }> = {
  // generic workflow
  pending: { tone: 'attention', label: 'Pending' },
  completed: { tone: 'success', label: 'Completed' },
  locked: { tone: 'default', label: 'Locked' },
  critical: { tone: 'critical', label: 'Critical' },
  info: { tone: 'info', label: 'Info' },
  // equipment domain — health
  active: { tone: 'success', label: 'Active' },
  functional: { tone: 'success', label: 'Functional' },
  unknown: { tone: 'default', label: 'Unknown' },
  decommissioned: { tone: 'warning', label: 'Decommissioned' },
  faulty: { tone: 'critical', label: 'Faulty' },
  alarm: { tone: 'critical', label: 'Alarm' },
  // equipment domain — maintenance
  'under maintenance': { tone: 'info', label: 'Under Maintenance' },
  'under-maintenance': { tone: 'info', label: 'Under Maintenance' },
  maintenance: { tone: 'info', label: 'Under Maintenance' },
  'needs maintenance': { tone: 'attention', label: 'Needs Maintenance' },
  'needs-maintenance': { tone: 'attention', label: 'Needs Maintenance' },
  upcoming: { tone: 'attention', label: 'Upcoming' },
  overdue: { tone: 'critical', label: 'Overdue' },
  // equipment domain — lifecycle
  'approaching decommissioning': { tone: 'warning', label: 'Approaching Decommissioning' },
  'approaching-decommissioning': { tone: 'warning', label: 'Approaching Decommissioning' },
};

/**
 * nx-index-table — selectable / sortable data table.
 * Template-only; emits `.nx-index-table` classes (IndexTable.css) and the
 * design-system `.nx-checkbox__control` visuals (Checkbox.css) for the
 * selection column. Footer (pagination) projected.
 *
 * Selection is controlled: pass `selectedRows` (array of row `id`s — pass `[]`
 * to enable the checkbox column with nothing selected) and update it from the
 * `(selectionChange)` output, which emits the full next id array.
 */
@Component({
  selector: 'nx-index-table',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-index-table" [class.nx-index-table--loading]="loading">
      <!-- Bulk-selection bar — shown while rows are selected (React BulkBar) -->
      <div class="nx-index-table__bulk" *ngIf="hasSelection && selectedCount > 0">
        <span class="nx-index-table__bulk-count">{{ selectedCount }} selected</span>
        <div class="nx-index-table__bulk-actions" *ngIf="bulkActions.length">
          <button
            *ngFor="let a of bulkActions"
            type="button"
            class="nx-index-table__bulk-action"
            (click)="onBulkAction(a)"
          >{{ a.content || a.label }}</button>
        </div>
        <button
          type="button"
          class="nx-index-table__bulk-deselect"
          (click)="deselectAll()"
        >Deselect all</button>
      </div>

      <div class="nx-index-table__scroll">
        <table class="nx-index-table__table">
          <thead>
            <tr>
              <th *ngIf="hasSelection" class="nx-index-table__select-col">
                <span
                  role="checkbox"
                  tabindex="0"
                  class="nx-checkbox__control"
                  [class.nx-checkbox__control--checked]="allSelected"
                  [class.nx-checkbox__control--indeterminate]="someSelected"
                  [attr.aria-checked]="allSelected ? 'true' : (someSelected ? 'mixed' : 'false')"
                  aria-label="Select all rows"
                  (click)="toggleAll()"
                  (keydown.space)="$event.preventDefault(); toggleAll()"
                  (keydown.enter)="toggleAll()"
                >
                  <svg *ngIf="allSelected" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8.5L6 11.5L13 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <svg *ngIf="someSelected" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 8h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                  </svg>
                </span>
              </th>
              <th
                *ngFor="let col of columns"
                scope="col"
                class="nx-index-table__th"
                [class.nx-index-table__th--sorted]="sortKey === col.key"
                (click)="sort.emit(col.key)"
              >
                <span class="nx-index-table__th-content">
                  {{ col.title || col.key }}
                  <!-- Sort chevron — active sort column only (React SortIcon) -->
                  <span *ngIf="sortKey === col.key" class="nx-index-table__sort-icon">
                    <svg *ngIf="sortDir !== 'desc'" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2.5 7.5L6 4L9.5 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg *ngIf="sortDir === 'desc'" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                </span>
              </th>
              <th *ngIf="rowActions.length" class="nx-index-table__actions-col"></th>
            </tr>
          </thead>

          <!-- Loading skeleton rows (React SkeletonRow) -->
          <tbody *ngIf="loading">
            <tr *ngFor="let s of skeletonRows" class="nx-index-table__row">
              <td *ngIf="hasSelection" class="nx-index-table__select-col">
                <span class="nx-skeleton" style="width:16px;height:16px;border-radius:3px"></span>
              </td>
              <td *ngFor="let col of columns; let c = index" class="nx-index-table__td">
                <span class="nx-skeleton" style="height:12px;display:block" [style.width]="c === 0 ? '60%' : '75%'"></span>
              </td>
              <td *ngIf="rowActions.length" class="nx-index-table__actions-col"></td>
            </tr>
          </tbody>

          <tbody *ngIf="!loading">
            <tr
              *ngFor="let row of rows"
              class="nx-index-table__row"
              [class.nx-index-table__row--selected]="isSelected(row)"
            >
              <td *ngIf="hasSelection" class="nx-index-table__select-col">
                <span
                  role="checkbox"
                  tabindex="0"
                  class="nx-checkbox__control"
                  [class.nx-checkbox__control--checked]="isSelected(row)"
                  [attr.aria-checked]="isSelected(row)"
                  [attr.aria-label]="'Select row ' + rowId(row)"
                  (click)="toggleRow(row)"
                  (keydown.space)="$event.preventDefault(); toggleRow(row)"
                  (keydown.enter)="toggleRow(row)"
                >
                  <svg *ngIf="isSelected(row)" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8.5L6 11.5L13 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </td>
              <td *ngFor="let col of columns" class="nx-index-table__td">
                <!-- Status columns render design-system badge pills -->
                <span
                  *ngIf="col.type === 'status'; else plainCell"
                  class="nx-badge"
                  [ngClass]="'nx-badge--' + statusTone(row[col.key])"
                >{{ statusLabel(row[col.key]) }}</span>
                <ng-template #plainCell>{{ row[col.key] }}</ng-template>
              </td>
              <td *ngIf="rowActions.length" class="nx-index-table__actions-col">
                <button
                  *ngFor="let a of rowActions"
                  type="button"
                  (click)="a.onAction && a.onAction(row)"
                >{{ a.content || a.label }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="nx-index-table__empty" *ngIf="!loading && !rows.length && emptyState">
        <h4 class="nx-index-table__empty-heading">{{ emptyState.heading }}</h4>
        <p class="nx-index-table__empty-desc">{{ emptyState.description }}</p>
      </div>

      <div class="nx-index-table__footer">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class NxIndexTableComponent {
  @Input() columns: NxIndexTableColumn[] = [];
  /** Row objects — each needs a unique `id` for selection binding. */
  @Input() rows: any[] = [];
  /** Selected row ids. Pass an array (even empty) to enable the checkbox column. */
  @Input() selectedRows?: Array<string | number>;
  /** Emits the full next id array whenever selection changes (toggle/all/none). */
  @Output() selectionChange = new EventEmitter<Array<string | number>>();
  @Input() sortKey?: string;
  @Input() sortDir?: 'asc' | 'desc';
  /** Emits the clicked column key. */
  @Output() sort = new EventEmitter<string>();
  @Input() loading = false;
  /** Buttons shown in the bulk-selection bar while rows are selected. */
  @Input() bulkActions: NxIndexTableAction[] = [];
  /** Emits the clicked bulk action (also calls its `onAction` if provided). */
  @Output() bulkAction = new EventEmitter<NxIndexTableAction>();
  @Input() rowActions: NxIndexTableAction[] = [];
  @Input() emptyState?: NxIndexTableEmptyState;

  /** Fixed skeleton row count while loading (mirrors React's 5 rows). */
  readonly skeletonRows: number[] = [0, 1, 2, 3, 4];

  get hasSelection(): boolean {
    return this.selectedRows !== undefined;
  }

  get selectedCount(): number {
    return this.selectedRows ? this.selectedRows.length : 0;
  }

  get allSelected(): boolean {
    return this.rows.length > 0 && this.rows.every((r) => this.isSelected(r));
  }

  /** Partial selection — drives the indeterminate (dash) select-all state. */
  get someSelected(): boolean {
    return !this.allSelected && this.rows.some((r) => this.isSelected(r));
  }

  rowId(row: any): string | number {
    return row.id;
  }

  isSelected(row: any): boolean {
    return !!this.selectedRows && this.selectedRows.indexOf(this.rowId(row)) !== -1;
  }

  toggleRow(row: any): void {
    const id = this.rowId(row);
    const current = this.selectedRows || [];
    const next =
      current.indexOf(id) !== -1
        ? current.filter((x) => x !== id)
        : [...current, id];
    this.selectionChange.emit(next);
  }

  toggleAll(): void {
    this.selectionChange.emit(this.allSelected ? [] : this.rows.map((r) => this.rowId(r)));
  }

  deselectAll(): void {
    this.selectionChange.emit([]);
  }

  onBulkAction(a: NxIndexTableAction): void {
    if (a.onAction) a.onAction();
    this.bulkAction.emit(a);
  }

  statusTone(value: unknown): string {
    const key = String(value ?? '').toLowerCase();
    return STATUS_MAP[key]?.tone || 'default';
  }

  statusLabel(value: unknown): string {
    const key = String(value ?? '').toLowerCase();
    return STATUS_MAP[key]?.label || String(value ?? 'Unknown');
  }
}
