import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface NxUploadFile {
  id: string;
  name: string;
  size: number;
  uploadedAt?: Date | string | null;
  status: 'uploading' | 'done' | 'error';
  progress?: number;
  errorMessage?: string;
}

/**
 * nx-upload — file upload dropzone + file list.
 */
@Component({
  selector: 'nx-upload',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-upload" [class.nx-upload--disabled]="disabled">
      <label class="nx-field__label" [class.nx-field__label--required]="required" *ngIf="label">{{ label }}</label>
      <div class="nx-upload__dropzone">
        <input
          type="file"
          class="nx-upload__input"
          [accept]="accept || ''"
          [multiple]="multiple"
          [disabled]="disabled"
          (change)="onSelect($event)"
        />
        <p class="nx-upload__helper" *ngIf="helperText">{{ helperText }}</p>
      </div>
      <ul class="nx-upload__list" *ngIf="files.length">
        <li
          *ngFor="let f of files"
          class="nx-upload__item"
          [class.nx-upload__item--error]="f.status === 'error'"
        >
          <span class="nx-upload__name">{{ f.name }}</span>
          <span class="nx-upload__status">{{ f.status }}</span>
          <span class="nx-upload__progress" *ngIf="f.status === 'uploading'">{{ f.progress }}%</span>
          <span class="nx-upload__error-msg" *ngIf="f.errorMessage">{{ f.errorMessage }}</span>
          <button type="button" *ngIf="f.status === 'uploading'" (click)="cancel.emit(f)">Cancel</button>
          <button type="button" *ngIf="f.status === 'error'" (click)="retry.emit(f)">Retry</button>
          <button type="button" *ngIf="f.status === 'done'" (click)="remove.emit(f)">Remove</button>
        </li>
      </ul>
    </div>
  `,
})
export class NxUploadComponent {
  @Input() label?: string;
  @Input() required = false;
  @Input() helperText?: string;
  @Input() accept?: string;
  @Input() multiple = false;
  @Input() maxFiles?: number;
  @Input() files: NxUploadFile[] = [];
  @Input() disabled = false;
  @Output() addFiles = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() retry = new EventEmitter<any>();

  onSelect(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    this.addFiles.emit(input.files);
  }
}
