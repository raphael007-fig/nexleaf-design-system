import { Injectable } from '@angular/core';

/**
 * NxScrollLockService — locks <body> scroll while an overlay is open,
 * compensating for the scrollbar width so the page doesn't shift sideways.
 *
 * Angular port of the React `useScrollLock` hook. Reference-counted so nested
 * overlays (drawer → bottom sheet) don't unlock prematurely.
 *
 *   constructor(private scrollLock: NxScrollLockService) {}
 *   open()  { this.scrollLock.lock(); }
 *   close() { this.scrollLock.unlock(); }
 */
@Injectable({ providedIn: 'root' })
export class NxScrollLockService {
  private count = 0;
  private prevOverflow = '';
  private prevPaddingRight = '';

  lock(): void {
    if (this.count === 0 && typeof document !== 'undefined') {
      const body = document.body;
      const html = document.documentElement;
      const scrollBarW = window.innerWidth - html.clientWidth;
      this.prevOverflow = body.style.overflow;
      this.prevPaddingRight = body.style.paddingRight;
      body.style.overflow = 'hidden';
      if (scrollBarW > 0) {
        const current = parseFloat(getComputedStyle(body).paddingRight) || 0;
        body.style.paddingRight = `${current + scrollBarW}px`;
      }
    }
    this.count++;
  }

  unlock(): void {
    if (this.count === 0) return;
    this.count--;
    if (this.count === 0 && typeof document !== 'undefined') {
      document.body.style.overflow = this.prevOverflow;
      document.body.style.paddingRight = this.prevPaddingRight;
    }
  }
}
