import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxPopoverComponent } from './popover.component';

/**
 * NxPopoverModule — non-modal floating layer anchored to a trigger.
 * Emits the shared `.nx-popover` classes (Popover.css); import tokens.css and
 * Popover.css for styling. Non-modal: no focus trap / scroll lock (matches React).
 */
@NgModule({
  imports: [CommonModule],
  declarations: [NxPopoverComponent],
  exports: [NxPopoverComponent],
})
export class NxPopoverModule {}
