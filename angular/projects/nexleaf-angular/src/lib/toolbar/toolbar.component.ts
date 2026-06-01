import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface NxToolbarRegion {
  code: string;
  label: string;
}

/**
 * nx-toolbar — top app bar with start / center / end slots.
 * Project content into slots via [nxToolbarStart], [nxToolbarCenter], [nxToolbarEnd].
 */
@Component({
  selector: 'nx-toolbar',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="nx-toolbar"
      [class.nx-toolbar--sticky]="sticky"
      [class.nx-toolbar--elevated]="elevated"
    >
      <div class="nx-toolbar__start"><ng-content select="[nxToolbarStart]"></ng-content></div>
      <div class="nx-toolbar__center"><ng-content select="[nxToolbarCenter]"></ng-content></div>
      <div class="nx-toolbar__end"><ng-content select="[nxToolbarEnd]"></ng-content></div>
    </div>
  `,
})
export class NxToolbarComponent {
  @Input() sticky = false;
  @Input() elevated = false;
}

/** nx-toolbar-aichat — AI chat trigger button. Native (click). */
@Component({
  selector: 'nx-toolbar-aichat',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="nx-toolbar-aichat"
      [class.nx-toolbar-aichat--active]="active"
    >
      <span class="nx-toolbar-aichat__label" *ngIf="label">{{ label }}</span>
      <span class="nx-toolbar-aichat__beta" *ngIf="beta">Beta</span>
      <span
        *ngIf="trailingIcon"
        class="nx-toolbar-aichat__trailing"
        [attr.data-icon]="trailingIcon"
        (click)="trailingClick.emit(); $event.stopPropagation()"
      ></span>
    </button>
  `,
})
export class NxToolbarAichatComponent {
  @Input() label?: string;
  @Input() beta = false;
  @Input() active = false;
  @Input() trailingIcon?: string;
  @Output() trailingClick = new EventEmitter<void>();
}

/** nx-toolbar-region — region selector chip. Native (click). */
@Component({
  selector: 'nx-toolbar-region',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="nx-toolbar-region">
      <span class="nx-toolbar-region__value" *ngIf="value">{{ value }}</span>
    </button>
  `,
})
export class NxToolbarRegionComponent {
  @Input() value?: string;
}

/** nx-toolbar-iconbtn — icon button with optional badge. Native (click). */
@Component({
  selector: 'nx-toolbar-iconbtn',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="nx-toolbar-iconbtn" [attr.aria-label]="ariaLabel">
      <span class="nx-toolbar-iconbtn__icon" [attr.data-icon]="icon"></span>
      <span class="nx-toolbar-iconbtn__badge" *ngIf="badge != null">{{ badge }}</span>
    </button>
  `,
})
export class NxToolbarIconbtnComponent {
  @Input() icon?: string;
  @Input() ariaLabel?: string;
  @Input() badge?: number;
}

/** nx-toolbar-avatar — user avatar button. Native (click). */
@Component({
  selector: 'nx-toolbar-avatar',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="nx-toolbar-avatar">
      <img class="nx-toolbar-avatar__img" [src]="src" [alt]="alt || ''" *ngIf="src" />
    </button>
  `,
})
export class NxToolbarAvatarComponent {
  @Input() src?: string;
  @Input() alt?: string;
}

/** nx-aichat-panel — slide-over AI chat panel. */
@Component({
  selector: 'nx-aichat-panel',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-aichat-panel" [class.nx-aichat-panel--open]="open">
      <div class="nx-aichat-panel__header">
        <span class="nx-aichat-panel__title" *ngIf="title">{{ title }}</span>
        <span class="nx-aichat-panel__beta" *ngIf="beta">Beta</span>
        <button type="button" class="nx-aichat-panel__close" (click)="close.emit()">&times;</button>
      </div>
      <div class="nx-aichat-panel__body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class NxAichatPanelComponent {
  @Input() open = false;
  @Input() title?: string;
  @Input() beta = false;
  @Output() close = new EventEmitter<void>();
}

/** nx-logo — brand logo mark. */
@Component({
  selector: 'nx-logo',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="nx-logo"></span>`,
})
export class NxLogoComponent {}

/** nx-breadcrumbs — breadcrumb trail. */
@Component({
  selector: 'nx-breadcrumbs',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="nx-breadcrumbs" aria-label="Breadcrumb">
      <button
        *ngFor="let item of items; let last = last"
        type="button"
        class="nx-breadcrumbs__item"
        [class.nx-breadcrumbs__item--current]="last"
        (click)="navigate.emit(item)"
      >{{ itemLabel(item) }}</button>
    </nav>
  `,
})
export class NxBreadcrumbsComponent {
  @Input() items: any[] = [];
  @Output() navigate = new EventEmitter<any>();

  itemLabel(item: any): string {
    return item && typeof item === 'object' ? item.label : String(item);
  }
}
