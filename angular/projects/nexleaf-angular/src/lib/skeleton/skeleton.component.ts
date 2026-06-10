import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * nx-skeleton — generic pulsing loading placeholder.
 *
 * Mirrors the React <Skeleton> primitive: a single rectangular block in
 * `bg-skeleton` (#e8e8e8) pulsing on a 1.4s cycle. Visuals come entirely from
 * the shared `.nx-skeleton` class (Skeleton.css) — this template only sizes the
 * block and toggles the circle modifier.
 *
 * Use directly for any placeholder that isn't text or a circle (thumbnail,
 * card area, custom shape). Set `circle` for avatars / dots / icon slots, and
 * size both axes equally. Numbers are coerced to px; strings pass through.
 *
 *   <nx-skeleton width="60%" height="12"></nx-skeleton>
 *   <nx-skeleton [circle]="true" width="40" height="40"></nx-skeleton>
 *
 * Accessibility: `ariaLabel` (default 'Loading') sets role="status" +
 * aria-busy. Pass null/'' to suppress — do this when many skeletons sit inside
 * one busy region so screen readers announce the region once, not per block.
 */
@Component({
  selector: 'nx-skeleton',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="nx-skeleton"
      [class.nx-skeleton--circle]="circle"
      [style.width]="px(width)"
      [style.height]="px(height)"
      [style.border-radius]="circle ? null : px(radius)"
      [attr.role]="ariaLabel ? 'status' : null"
      [attr.aria-busy]="ariaLabel ? 'true' : null"
      [attr.aria-label]="ariaLabel || null"
    ></span>
  `,
})
export class NxSkeletonComponent {
  /** CSS width. Numbers → px. Default '100%'. */
  @Input() width: string | number = '100%';
  /** CSS height. Numbers → px. Default 16. */
  @Input() height: string | number = 16;
  /** Border radius. Numbers → px. Default 4. Ignored when `circle` (CSS sets 50%). */
  @Input() radius: string | number = 4;
  /** Force a circle via the `.nx-skeleton--circle` modifier. Size both axes equally. */
  @Input() circle = false;
  /** Accessible name. Adds role="status" + aria-busy when set. Pass null/'' to suppress. */
  @Input() ariaLabel: string | null = 'Loading';

  /** Coerce a number to a px string; pass strings through untouched. */
  px(value: string | number): string {
    return typeof value === 'number' ? `${value}px` : value;
  }
}
