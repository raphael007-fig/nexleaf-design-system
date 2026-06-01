import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface NxIndexTableColumn {
  key: string;
  title?: string;
  [k: string]: any;
}

export interface NxIndexTableEmptyState {
  heading: string;
  description: string;
}

/**
 * nx-index-table — selectable / sortable data table.
 * Template-only; emits `.nx-index-table` classes. Footer (pagination) projected.
 */
@Component({
  selector: 'nx-index-table',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-index-table" [class.nx-index-table--loading]="loading">
      <div class="nx-index-table__bulk" *ngIf="bulkActions.length">
        <button
          *ngFor="let a of bulkActions"
          type="button"
          class="nx-index-table__bulk-action"
          (click)="a.onAction && a.onAction()"
        >{{ a.content || a.label }}</button>
      </div>
      <table class="nx-index-table__table">
        <thead>
          <tr>
            <th *ngIf="selectedRows !== undefined" class="nx-index-table__select-col"></th>
            <th
              *ngFor="let col of columns"
              class="nx-index-table__th"
              [class.nx-index-table__th--sorted]="sortKey === col.key"
              (click)="sort.emit(col.key)"
            >
              {{ col.title || col.key }}
              <span *ngIf="sortKey === col.key" class="nx-index-table__sort-dir">{{ sortDir }}</span>
            </th>
            <th *ngIf="rowActions.length" class="nx-index-table__actions-col"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            *ngFor="let row of rows; let i = index"
            class="nx-index-table__row"
          >
            <td *ngIf="selectedRows !== undefined" class="nx-index-table__select-col">
              <input type="checkbox" (change)="selectionChange.emit(row)" />
            </td>
            <td *ngFor="let col of columns" class="nx-index-table__td">{{ row[col.key] }}</td>
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
      <div class="nx-index-table__empty" *ngIf="!rows.length && emptyState">
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
  @Input() columns: any[] = [];
  @Input() rows: any[] = [];
  @Input() selectedRows: any;
  @Output() selectionChange = new EventEmitter<any>();
  @Input() sortKey?: string;
  @Input() sortDir?: 'asc' | 'desc';
  @Output() sort = new EventEmitter<any>();
  @Input() loading = false;
  @Input() bulkActions: any[] = [];
  @Input() rowActions: any[] = [];
  @Input() emptyState?: NxIndexTableEmptyState;
}
