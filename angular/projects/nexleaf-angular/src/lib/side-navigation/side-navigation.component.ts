import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges,
} from '@angular/core';

export interface NxSideNavChild { id: string; label: string; disabled?: boolean; }
export interface NxSideNavItem {
  id: string;
  label: string;
  /** Optional inline SVG markup for the leading icon (trusted; rendered via innerHTML). */
  icon?: string;
  children?: NxSideNavChild[];
  disabled?: boolean;
}

/**
 * nx-side-navigation — docked desktop navigation rail.
 *
 * Model 2 split control: a parent row's **label** navigates (the parent is a
 * page too) and the **caret** toggles the group without navigating. Collapses to
 * an icon-only rail (`[collapsed]`). Shares the nav tree + `activeItemId` with
 * nx-menu-drawer so the rail, breadcrumb, and page title stay in lock-step.
 * Project the brand into `[logo]` and the collapse toggle into `[footer]`.
 *
 *   <nx-side-navigation [items]="NAV" activeItemId="coldchain" [collapsed]="c"
 *     (selected)="go($event)">
 *     <span logo>…brand…</span>
 *     <button footer (click)="c = !c">Collapse</button>
 *   </nx-side-navigation>
 */
@Component({
  selector: 'nx-side-navigation',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav
      class="nx-side-navigation"
      [class.nx-side-navigation--collapsed]="collapsed"
      [attr.aria-label]="ariaLabel"
    >
      <div class="nx-side-navigation__top">
        <div class="nx-side-navigation__logo">
          <ng-content select="[logo]"></ng-content>
        </div>

        <!-- Loading / empty: skeleton rows, same 28px row height so the rail
             doesn't reflow when the real nav arrives. -->
        <ul
          class="nx-side-navigation__list"
          *ngIf="loading || !items.length"
          role="status" aria-busy="true" aria-label="Loading navigation"
        >
          <li class="nx-side-navigation__sk-row" *ngFor="let w of skeletonWidthList">
            <span class="nx-skeleton" style="width:20px;height:20px;border-radius:6px"></span>
            <span class="nx-skeleton" *ngIf="!collapsed" [style.width]="w" style="height:12px"></span>
          </li>
        </ul>

        <!-- Nav — Model 2 split control. -->
        <ul class="nx-side-navigation__list" *ngIf="!loading && items.length" [attr.aria-label]="ariaLabel">
          <li *ngFor="let item of items">
            <!-- Parent (label + caret) — only when expandable AND not collapsed. -->
            <div
              *ngIf="item.children?.length && !collapsed; else leafRow"
              class="nx-side-navigation__row"
              [class.nx-side-navigation__row--open]="isExpanded(item)"
            >
              <button
                type="button"
                class="nx-side-navigation__item nx-side-navigation__item--label"
                [class.nx-side-navigation__item--active]="item.id === activeItemId"
                [disabled]="item.disabled"
                [attr.aria-current]="item.id === activeItemId ? 'page' : null"
                (click)="selected.emit(item.id)"
              >
                <span class="nx-side-navigation__icon" *ngIf="item.icon" [innerHTML]="item.icon"></span>
                <span class="nx-side-navigation__label">{{ item.label }}</span>
              </button>
              <button
                type="button"
                class="nx-side-navigation__caret-btn"
                [attr.aria-label]="(isExpanded(item) ? 'Collapse ' : 'Expand ') + item.label"
                [attr.aria-expanded]="isExpanded(item)"
                (click)="toggle(item)"
              >
                <svg class="nx-side-navigation__caret" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>

            <!-- Leaf, OR a collapsed parent → one navigating row (icon only when collapsed). -->
            <ng-template #leafRow>
              <button
                type="button"
                class="nx-side-navigation__item"
                [class.nx-side-navigation__item--active]="item.id === activeItemId"
                [disabled]="item.disabled"
                [attr.title]="collapsed ? item.label : null"
                [attr.aria-current]="item.id === activeItemId ? 'page' : null"
                (click)="selected.emit(item.id)"
              >
                <span class="nx-side-navigation__icon" *ngIf="item.icon" [innerHTML]="item.icon"></span>
                <span class="nx-side-navigation__label" *ngIf="!collapsed">{{ item.label }}</span>
              </button>
            </ng-template>

            <!-- Children (expanded, non-collapsed only). -->
            <div class="nx-side-navigation__children" *ngIf="item.children?.length && !collapsed && isExpanded(item)">
              <button
                *ngFor="let child of item.children"
                type="button"
                class="nx-side-navigation__child"
                [class.nx-side-navigation__child--active]="child.id === activeItemId"
                [disabled]="child.disabled"
                [attr.aria-current]="child.id === activeItemId ? 'page' : null"
                (click)="selected.emit(child.id)"
              >{{ child.label }}</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Pinned footer — typically the collapse toggle. -->
      <div class="nx-side-navigation__footer">
        <ng-content select="[footer]"></ng-content>
      </div>
    </nav>
  `,
})
export class NxSideNavigationComponent implements OnChanges {
  @Input() items: NxSideNavItem[] = [];
  @Input() activeItemId?: string;
  /** Icon-only rail when true (consumer-controlled, like the React `collapsed`). */
  @Input() collapsed = false;
  @Input() loading = false;
  @Input() skeletonRows = 6;
  @Input() ariaLabel = 'Main navigation';

  @Output() selected = new EventEmitter<string>();

  private manuallyExpanded = new Set<string>();

  /** Varied skeleton widths so loading reads as a nav list, not identical bars. */
  private readonly SK_WIDTHS = ['62%', '48%', '55%', '40%', '58%', '44%', '50%', '46%'];
  get skeletonWidthList(): string[] {
    return this.SK_WIDTHS.slice(0, Math.max(1, this.skeletonRows));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeItemId']) this.manuallyExpanded.clear();
  }

  /** Expanded if manually toggled, OR it contains the active child, OR the
   *  parent itself is the active page (parents are pages too). */
  isExpanded(item: NxSideNavItem): boolean {
    if (!item.children?.length) return false;
    if (this.manuallyExpanded.has(item.id)) return true;
    return item.id === this.activeItemId || item.children.some((c) => c.id === this.activeItemId);
  }

  /** Caret only — expand/collapse WITHOUT navigating (Model 2). The label button
   *  emits `selected` directly to navigate. */
  toggle(item: NxSideNavItem): void {
    if (!item.children?.length) return;
    if (this.manuallyExpanded.has(item.id)) this.manuallyExpanded.delete(item.id);
    else this.manuallyExpanded.add(item.id);
  }
}
