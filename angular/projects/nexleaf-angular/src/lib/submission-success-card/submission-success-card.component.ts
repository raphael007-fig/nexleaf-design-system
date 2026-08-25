import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/** One panel line: plain text, a label/value pair, or a status-dot line. */
export type NxSubmissionLine =
  | string
  | { label: string; value: string }
  | { dot: 'success' | 'warning' | 'attention'; text: string };

export interface NxSubmissionSection {
  heading?: string;
  lines: NxSubmissionLine[];
}

export interface NxSubmissionAction {
  label: string;
  onClick?: () => void;
}

/**
 * nx-submission-success-card — generic submission-confirmation layout
 * (mirrors React SubmissionSuccessCard.jsx; styled by SubmissionSuccessCard.css
 * in the bundled @nexleaf/angular/styles.css).
 *
 * An icon in a tinted circle, a centered title, an info-surface detail panel
 * (sections of lines, any of which can carry a tone dot), an optional footer
 * line, and an action row. Any "your submission was recorded" flow composes
 * it — temperature readings, service requests, installations.
 *
 *   <nx-submission-success-card
 *     title="Service Request Submitted"
 *     [sections]="[
 *       { lines: ['Equipment Name: MK 114 Vaccine Refrigerator'] },
 *       { lines: [{ dot: 'warning', text: 'Status: Awaiting Technician' }] },
 *     ]"
 *     footerLabel="Ticket" footerValue="SR-2026-0142"
 *     primaryLabel="Track Request" (primary)="track()"
 *     [secondaryActions]="[{ label: 'Back to Equipment', onClick: back }]"
 *     homeLabel="Go to Home Page" (home)="goHome()" />
 */
@Component({
  selector: 'nx-submission-success-card',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-submission-success">
      <button *ngIf="homeLabel" type="button" class="nx-submission-success__home" (click)="home.emit()">{{ homeLabel }}</button>

      <div class="nx-submission-success__icon">
        <!-- Default icon: document-with-check (inline SVG, per the icon rule) -->
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
          <path d="M9 5h11l5 5v18a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 8 28V6.5A1.5 1.5 0 0 1 9.5 5z" fill="#ffffff" stroke="#616161" stroke-width="1.4"/>
          <path d="M20 5v5h5" stroke="#616161" stroke-width="1.4" stroke-linejoin="round"/>
          <circle cx="24" cy="25" r="7" fill="#12b76a"/>
          <path d="M21 25l2.2 2.2 4-4.4" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="nx-submission-success__title">{{ title }}</p>

      <div class="nx-submission-success__panel">
        <svg class="nx-submission-success__panel-icon" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 7.5C3 6.67 3.67 6 4.5 6H8l2 2h5.5C16.33 8 17 8.67 17 9.5v6c0 .83-.67 1.5-1.5 1.5h-11C3.67 17 3 16.33 3 15.5v-8z" stroke="#00527c" stroke-width="1.2"/>
        </svg>
        <div class="nx-submission-success__lines">
          <ng-container *ngFor="let section of sections; let si = index">
            <div *ngIf="si > 0" class="nx-submission-success__gap"></div>
            <div *ngIf="section.heading" class="nx-submission-success__line nx-submission-success__line--bold">{{ section.heading }}</div>
            <ng-container *ngFor="let line of section.lines">
              <div *ngIf="isDot(line); else plain" class="nx-submission-success__status">
                <span class="nx-submission-success__dot" [ngClass]="'nx-submission-success__dot--' + dotTone(line)"></span>
                {{ dotText(line) }}
              </div>
              <ng-template #plain>
                <div class="nx-submission-success__line">{{ lineText(line) }}</div>
              </ng-template>
            </ng-container>
          </ng-container>
        </div>
      </div>

      <p *ngIf="footerLabel" class="nx-submission-success__footer">
        <strong>{{ footerLabel }}:</strong> {{ footerValue }}
      </p>

      <div class="nx-submission-success__actions" *ngIf="primaryLabel || secondaryActions.length">
        <button *ngIf="primaryLabel" type="button" class="nx-btn nx-btn--primary" (click)="primary.emit()">{{ primaryLabel }}</button>
        <button *ngFor="let a of secondaryActions" type="button" class="nx-btn nx-btn--secondary" (click)="a.onClick && a.onClick()">{{ a.label }}</button>
      </div>
    </div>
  `,
})
export class NxSubmissionSuccessCardComponent {
  @Input() title = '';
  @Input() sections: NxSubmissionSection[] = [];
  @Input() footerLabel?: string;
  @Input() footerValue?: string;
  @Input() primaryLabel?: string;
  @Input() secondaryActions: NxSubmissionAction[] = [];
  @Input() homeLabel?: string;

  @Output() primary = new EventEmitter<void>();
  @Output() home = new EventEmitter<void>();

  isDot(line: NxSubmissionLine): boolean {
    return typeof line === 'object' && 'dot' in line;
  }
  dotTone(line: NxSubmissionLine): string {
    return typeof line === 'object' && 'dot' in line ? line.dot : 'success';
  }
  dotText(line: NxSubmissionLine): string {
    return typeof line === 'object' && 'text' in line ? line.text : '';
  }
  lineText(line: NxSubmissionLine): string {
    if (typeof line === 'string') return line;
    if ('label' in line) return `${line.label}: ${line.value}`;
    return '';
  }
}
