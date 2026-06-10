import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges,
} from '@angular/core';

export interface NxNavChild { id: string; label: string; disabled?: boolean; }
export interface NxNavItem {
  id: string;
  label: string;
  /** Optional inline SVG markup (sanitized by the host) or omit and project icons. */
  children?: NxNavChild[];
  disabled?: boolean;
}

export interface NxLegalLink { label: string; href: string; }

/** Default ColdTrace navigation tree (mirrors COLDTRACE_NAV_ITEMS in React). */
export const NX_COLDTRACE_NAV_ITEMS: NxNavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'health-status', label: 'Health Status' },
  {
    id: 'inventory', label: 'Inventory', children: [
      { id: 'coldchain', label: 'ColdChain Equipment' },
      { id: 'rtmds', label: 'RTMDs' },
      { id: 'solar', label: 'Solar Equipment' },
      { id: 'passive', label: 'Passive Equipment' },
      { id: 'oxygen', label: 'Oxygen Equipment' },
      { id: 'lab', label: 'Lab Equipment' },
      { id: 'general', label: 'General Equipment' },
    ],
  },
  { id: 'spare-part', label: 'Spare Part' },
  { id: 'performance', label: 'Performance' },
  { id: 'electrification', label: 'Electrification' },
];

/**
 * nx-menu-drawer — drawer-first global navigation for mobile / tablet.
 *
 * Composes nx-slide-over (placement="left") for the overlay shell and renders a
 * nested nav with active parent (auto-expanded) + active child (highlighted).
 * The active parent of the active child opens automatically.
 *
 *   <nx-menu-drawer [open]="open" activeItemId="coldchain"
 *     (selected)="go($event)" (closed)="open=false">
 *     <span logo>…brand…</span>
 *   </nx-menu-drawer>
 */
@Component({
  selector: 'nx-menu-drawer',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nx-slide-over
      class="nx-menu-drawer"
      [open]="open"
      placement="left"
      [showCloseButton]="false"
      [flushBody]="true"
      initialFocus="container"
      ariaLabel="Main menu"
      (closed)="closed.emit()"
    >
      <!-- Fixed header: logo + close -->
      <div class="nx-menu-drawer__header">
        <span class="nx-menu-drawer__logo"><ng-content select="[logo]"></ng-content></span>
        <button type="button" class="nx-slideover__close" aria-label="Close" (click)="closed.emit()">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <!-- Loading: shape-matching skeleton nav rows in place of the live list.
           Seven rows of varied width keep the panel height so it doesn't reflow
           when the real nav arrives; logo header + footer stay intact above. -->
      <nav class="nx-menu-drawer__nav" *ngIf="loading" aria-busy="true" aria-label="Loading navigation">
        <div class="nx-menu-drawer__sk-row" *ngFor="let w of skeletonWidths">
          <span class="nx-skeleton" style="width:20px;height:20px;border-radius:6px"></span>
          <span class="nx-skeleton" [style.width]="w" style="height:12px"></span>
        </div>
      </nav>

      <!-- Nested nav — Model 2 split control: the label navigates (parent is a
           page too), the caret toggles the group without navigating. -->
      <nav class="nx-menu-drawer__nav" *ngIf="!loading" aria-label="Main navigation">
        <ng-container *ngFor="let item of items">
          <!-- Parent: label + caret -->
          <div
            *ngIf="item.children; else leafRow"
            class="nx-menu-drawer__row"
            [class.nx-menu-drawer__item--active]="item.id === activeItemId"
            [class.nx-menu-drawer__item--open]="isExpanded(item)"
          >
            <button
              type="button"
              class="nx-menu-drawer__item nx-menu-drawer__item--label"
              [disabled]="item.disabled"
              [attr.aria-current]="item.id === activeItemId ? 'page' : null"
              (click)="selected.emit(item.id)"
            >
              <span class="nx-menu-drawer__item-label">{{ item.label }}</span>
            </button>
            <button
              type="button"
              class="nx-menu-drawer__caret-btn"
              [attr.aria-label]="(isExpanded(item) ? 'Collapse ' : 'Expand ') + item.label"
              [attr.aria-expanded]="isExpanded(item)"
              (click)="toggle(item)"
            >
              <svg class="nx-menu-drawer__caret" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <!-- Leaf: single navigating row -->
          <ng-template #leafRow>
            <button
              type="button"
              class="nx-menu-drawer__item"
              [class.nx-menu-drawer__item--active]="item.id === activeItemId"
              [disabled]="item.disabled"
              [attr.aria-current]="item.id === activeItemId ? 'page' : null"
              (click)="selected.emit(item.id)"
            >
              <span class="nx-menu-drawer__item-label">{{ item.label }}</span>
            </button>
          </ng-template>

          <div class="nx-menu-drawer__children" *ngIf="item.children && isExpanded(item)">
            <button
              *ngFor="let child of item.children"
              type="button"
              class="nx-menu-drawer__child"
              [class.nx-menu-drawer__child--active]="child.id === activeItemId"
              [disabled]="child.disabled"
              (click)="selected.emit(child.id)"
            >{{ child.label }}</button>
          </div>
        </ng-container>
      </nav>

      <!-- SECONDARY tier (Notification / Profile) — separated by a divider, and
           kept in sync with the top bar: only the controls that have overflowed
           OUT of the bar are listed (see secondaryVisible). -->
      <div class="nx-menu-drawer__footer" *ngIf="!loading">
        <ng-container *ngIf="showNotification || showProfile">
          <div class="nx-menu-drawer__tier-divider" aria-hidden="true"></div>
          <button *ngIf="showNotification" type="button" class="nx-menu-drawer__footer-row" (click)="notification.emit()">Notification</button>
          <button *ngIf="showProfile" type="button" class="nx-menu-drawer__footer-row" (click)="profile.emit()">Profile</button>
        </ng-container>

        <!-- TERTIARY tier (legal links) — always shown, below its own divider. -->
        <div class="nx-menu-drawer__legal" *ngIf="legalLinks.length">
          <a *ngFor="let l of legalLinks" class="nx-menu-drawer__legal-link" [href]="l.href">{{ l.label }}</a>
        </div>
      </div>
    </nx-slide-over>
  `,
})
export class NxMenuDrawerComponent implements OnChanges {
  @Input() open = false;
  @Input() items: NxNavItem[] = NX_COLDTRACE_NAV_ITEMS;
  @Input() activeItemId?: string;
  /** Render shape-matching skeleton nav rows in place of the live navigation. */
  @Input() loading = false;
  /**
   * Secondary-tier items the drawer surfaces. An item only appears once it has
   * overflowed OUT of the top bar — the consuming shell drives this so the bar
   * and drawer stay in sync and never duplicate a control. Defaults to both.
   */
  @Input() secondaryVisible: string[] = ['notification', 'profile'];
  @Input() legalLinks: NxLegalLink[] = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Nexleaf Analytics', href: '#' },
    { label: 'ColdTrace Terms of Service', href: '#' },
  ];

  @Output() selected = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();
  @Output() notification = new EventEmitter<void>();
  @Output() profile = new EventEmitter<void>();

  get showNotification(): boolean { return this.secondaryVisible.includes('notification'); }
  get showProfile(): boolean { return this.secondaryVisible.includes('profile'); }

  /** Varied text-line widths so the skeleton reads as a nav list, not a stack
   *  of identical bars (matches the default ColdTrace tree length). */
  readonly skeletonWidths = ['62%', '48%', '55%', '40%', '58%', '44%', '50%'];

  private manuallyExpanded = new Set<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeItemId']) this.manuallyExpanded.clear();
  }

  /** Expanded if manually toggled, OR it contains the active child, OR the
   *  parent itself is the active page (parents are pages too). */
  isExpanded(item: NxNavItem): boolean {
    if (!item.children) return false;
    if (this.manuallyExpanded.has(item.id)) return true;
    return item.id === this.activeItemId || item.children.some(c => c.id === this.activeItemId);
  }

  /** Caret only — expand/collapse a group WITHOUT navigating (Model 2). The
   *  label button emits `selected` directly to navigate. */
  toggle(item: NxNavItem): void {
    if (!item.children) return;
    if (this.manuallyExpanded.has(item.id)) this.manuallyExpanded.delete(item.id);
    else this.manuallyExpanded.add(item.id);
  }
}
