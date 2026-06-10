import {
  Component, Input, Output, EventEmitter, ElementRef, ViewChild,
  ChangeDetectionStrategy, ChangeDetectorRef, HostListener, OnChanges,
  SimpleChanges, AfterViewChecked,
} from '@angular/core';

export type NxPopoverPlacement =
  | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

/**
 * nx-popover — non-modal floating layer anchored to a trigger element.
 *
 * Angular port of the React Popover (src/components/Popover/Popover.jsx). Project
 * the anchor into the `[trigger]` slot and the panel content into the default
 * slot. The panel is appended to <body> (escaping `overflow:hidden` ancestors),
 * positioned in JS against the trigger's bounding rect, clamped to the viewport,
 * and flipped above the trigger when it would clip the bottom edge. Dismisses on
 * outside-click and Escape; emits both `openChange` (two-way `[(open)]`) and
 * `close`. Like React, it is non-modal: it does NOT trap focus or scroll-lock —
 * it only moves focus to the first focusable item on open.
 *
 *   <nx-popover [(open)]="open" placement="bottom-start" ariaLabel="Row actions">
 *     <button trigger (click)="open = !open" aria-haspopup="menu" [attr.aria-expanded]="open">…</button>
 *     <ul role="menu">…items…</ul>
 *   </nx-popover>
 */
@Component({
  selector: 'nx-popover',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="nx-popover__trigger" #triggerWrap>
      <ng-content select="[trigger]"></ng-content>
    </span>

    <div
      #panel
      *ngIf="open"
      class="nx-popover__panel"
      [class.nx-popover__panel--flush]="!surface"
      [attr.role]="role || null"
      [attr.aria-label]="ariaLabel || null"
      [style.top.px]="pos?.top"
      [style.left.px]="pos?.left"
      [style.minWidth.px]="matchWidth ? null : minWidth"
      [style.width.px]="matchWidth ? pos?.width : null"
      [style.maxWidth.px]="pos?.maxWidth"
      [style.maxHeight]="maxHeight"
      [style.zIndex]="zIndex"
      [style.visibility]="pos ? 'visible' : 'hidden'"
      (mousedown)="$event.stopPropagation()"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class NxPopoverComponent implements OnChanges, AfterViewChecked {
  /** Controlled open state. Use `[(open)]` for two-way binding. */
  @Input() open = false;
  @Input() placement: NxPopoverPlacement = 'bottom-start';
  /** Gap between trigger and panel, px. */
  @Input() gap = 6;
  /** Match the panel width to the trigger width (e.g. select-style menus). */
  @Input() matchWidth = false;
  @Input() minWidth = 200;
  @Input() maxHeight = 'min(60vh, 360px)';
  @Input() role: string | null = 'menu';
  @Input() ariaLabel?: string;
  /** Move focus to the first focusable item on open (non-modal, no trap). */
  @Input() autoFocus = true;
  /** Render the default panel chrome (border/radius/shadow). false = host owns it. */
  @Input() surface = true;
  @Input() zIndex = 1100;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<void>();

  @ViewChild('triggerWrap') triggerWrap!: ElementRef<HTMLElement>;
  @ViewChild('panel') panelRef?: ElementRef<HTMLElement>;

  pos: { top: number; left: number; width?: number; maxWidth: number } | null = null;

  private panelInBody = false;
  private needsReposition = false;
  private didAutoFocus = false;

  constructor(private host: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      if (this.open) {
        this.pos = null;
        this.needsReposition = true;
        this.didAutoFocus = false;
      } else {
        this.pos = null;
        this.detachPanel();
      }
    }
  }

  // Portal the panel to <body>, position it, then (once measured) auto-focus.
  ngAfterViewChecked(): void {
    if (!this.open || !this.panelRef) return;

    if (!this.panelInBody) {
      document.body.appendChild(this.panelRef.nativeElement);
      this.panelInBody = true;
    }

    if (this.needsReposition) {
      this.reposition();
      this.needsReposition = false;
      this.cdr.detectChanges();
    }

    if (this.autoFocus && !this.didAutoFocus) {
      this.didAutoFocus = true;
      this.focusFirst();
    }
  }

  private reposition(): void {
    const trigger = this.triggerEl();
    const panel = this.panelRef?.nativeElement;
    if (!trigger || !panel) return;

    const rect = trigger.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const estWidth = this.matchWidth ? rect.width : Math.max(this.minWidth, panel.offsetWidth);
    const estHeight = panel.offsetHeight || 240;

    const alignEnd = this.placement === 'bottom-end' || this.placement === 'top-end';
    let left = alignEnd ? rect.right - estWidth : rect.left;
    left = Math.max(8, Math.min(left, vw - estWidth - 8));

    const wantsTop = this.placement === 'top-start' || this.placement === 'top-end';
    const clipsBottom = rect.bottom + estHeight + this.gap > vh;
    const placeAbove = wantsTop || clipsBottom;
    const top = placeAbove
      ? Math.max(8, rect.top - estHeight - this.gap)
      : rect.bottom + this.gap;

    this.pos = {
      top,
      left,
      width: this.matchWidth ? rect.width : undefined,
      maxWidth: vw - 16,
    };
  }

  private focusFirst(): void {
    const panel = this.panelRef?.nativeElement;
    if (!panel) return;
    const target = panel.querySelector<HTMLElement>('[data-autofocus]')
      || panel.querySelector<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
      );
    target?.focus();
  }

  private triggerEl(): HTMLElement | null {
    return this.triggerWrap?.nativeElement || null;
  }

  private detachPanel(): void {
    const panel = this.panelRef?.nativeElement;
    if (this.panelInBody && panel?.parentNode) panel.parentNode.removeChild(panel);
    this.panelInBody = false;
  }

  private emitClose(): void {
    this.open = false;
    this.pos = null;
    this.detachPanel();
    this.openChange.emit(false);
    this.close.emit();
    this.cdr.markForCheck();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) this.emitClose();
  }

  @HostListener('document:mousedown', ['$event'])
  onDocMouseDown(e: MouseEvent): void {
    if (!this.open) return;
    const target = e.target as Node;
    const trigger = this.triggerEl();
    const panel = this.panelRef?.nativeElement;
    if (trigger?.contains(target) || panel?.contains(target)) return;
    this.emitClose();
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onViewportChange(): void {
    if (this.open) {
      this.reposition();
      this.cdr.markForCheck();
    }
  }
}
