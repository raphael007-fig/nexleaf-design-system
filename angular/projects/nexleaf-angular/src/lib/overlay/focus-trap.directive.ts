import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

/**
 * nxFocusTrap — traps Tab focus inside the host element while it is in the DOM.
 *
 * Angular port of the React `useFocusTrap` hook (src/foundation/overlay/
 * overlayHooks.js). Apply to the panel of any overlay (slide-over, drawer,
 * bottom sheet). On init it moves focus inside (prefers `[data-autofocus]`,
 * else the first focusable, else the host) and restores focus to the previously
 * focused element on destroy.
 *
 *   <div class="nx-slideover__panel" nxFocusTrap>…</div>
 */
@Directive({
  selector: '[nxFocusTrap]',
  standalone: false,
})
export class NxFocusTrapDirective implements OnInit, OnDestroy {
  /**
   * Where focus lands on open. 'auto' (default) focuses the first focusable;
   * 'container' focuses the host panel itself (role=dialog, tabindex -1, no
   * visible ring) — preferred for the nav drawer so a nav row doesn't flash a
   * focus ring the moment it opens. A `[data-autofocus]` descendant still wins.
   */
  @Input('nxFocusTrapInitial') initial: 'auto' | 'container' = 'auto';

  private previouslyFocused: HTMLElement | null = null;
  private readonly selector = [
    'a[href]', 'area[href]', 'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
    'textarea:not([disabled])', 'iframe', 'audio[controls]', 'video[controls]',
    '[contenteditable]:not([contenteditable="false"])', '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.previouslyFocused = document.activeElement as HTMLElement | null;
    // Defer so projected/conditional content is mounted.
    setTimeout(() => {
      const host = this.el.nativeElement;
      const preferred = host.querySelector<HTMLElement>('[data-autofocus]');
      const target = preferred
        || (this.initial === 'container' ? host : this.focusable()[0])
        || host;
      target?.focus();
    });
    this.el.nativeElement.addEventListener('keydown', this.onKeydown);
  }

  ngOnDestroy(): void {
    this.el.nativeElement.removeEventListener('keydown', this.onKeydown);
    const prev = this.previouslyFocused;
    if (prev && typeof prev.focus === 'function' && document.contains(prev)) prev.focus();
  }

  private focusable(): HTMLElement[] {
    return Array.from(this.el.nativeElement.querySelectorAll<HTMLElement>(this.selector))
      .filter(elm => elm.offsetWidth > 0 || elm.offsetHeight > 0 || elm === document.activeElement);
  }

  private onKeydown = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;
    const items = this.focusable();
    const host = this.el.nativeElement;
    if (items.length === 0) { e.preventDefault(); host.focus(); return; }
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey) {
      if (active === first || !host.contains(active)) { e.preventDefault(); last.focus(); }
    } else {
      if (active === last || !host.contains(active)) { e.preventDefault(); first.focus(); }
    }
  };
}
