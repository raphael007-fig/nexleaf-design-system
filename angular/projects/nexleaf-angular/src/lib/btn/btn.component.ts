import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

export type NxBtnVariant =
  | 'primary'
  | 'strong'
  | 'secondary'
  | 'destructive'
  | 'ghost'
  | 'plain'
  | 'tertiary';

export interface NxSegmentedButton {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * nx-btn — Button.
 *
 * Template-only: renders the shared `.nx-btn` CSS classes (see
 * src/components/Btn/Btn.css). Import tokens.css + Btn.css in your app for
 * styling. The host `(click)` is the native button click (bubbles from the
 * inner <button>), so `<nx-btn (click)="fn()">` works without an @Output.
 */
@Component({
  selector: 'nx-btn',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      class="nx-btn"
      [class.nx-btn--primary]="variant === 'primary'"
      [class.nx-btn--strong]="variant === 'strong'"
      [class.nx-btn--secondary]="variant === 'secondary'"
      [class.nx-btn--destructive]="variant === 'destructive'"
      [class.nx-btn--ghost]="variant === 'ghost'"
      [class.nx-btn--plain]="variant === 'plain'"
      [class.nx-btn--tertiary]="variant === 'tertiary'"
      [class.nx-btn--sm]="small"
      [class.nx-btn--full]="fullWidth"
      [class.nx-btn--disclosure]="disclosure"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class NxBtnComponent {
  @Input() variant: NxBtnVariant = 'primary';
  @Input() small = false;
  @Input() fullWidth = false;
  @Input() disclosure = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  /** Icon name (e.g. "plus"). API parity with React; render the glyph via
   *  projected content or a PolarisIcon in the consuming app. */
  @Input() icon?: string;
}

/** nx-btn-group — wraps related buttons in a `.nx-btn-group` row. */
@Component({
  selector: 'nx-btn-group',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="nx-btn-group"
      [class.nx-btn-group--tight]="spacing === 'tight'"
      [class.nx-btn-group--loose]="spacing === 'loose'"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class NxBtnGroupComponent {
  @Input() spacing: 'tight' | 'loose' | 'default' = 'default';
}

/** nx-btn-group-segmented — a connected segmented control of buttons. */
@Component({
  selector: 'nx-btn-group-segmented',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-btn-group nx-btn-group--segmented" role="group">
      <button
        *ngFor="let b of buttons"
        type="button"
        class="nx-btn nx-btn--secondary"
        [disabled]="b.disabled"
        (click)="b.onClick && b.onClick()"
      >
        {{ b.label }}
      </button>
    </div>
  `,
})
export class NxBtnGroupSegmentedComponent {
  @Input() buttons: NxSegmentedButton[] = [];
}
