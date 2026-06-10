import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxFocusTrapDirective } from './focus-trap.directive';

/**
 * NxOverlayModule — shared overlay primitives (focus trap + scroll lock).
 * Imported by NxSlideOverModule, NxMenuDrawerModule, and NxBottomSheetModule.
 * The scroll-lock service is providedIn:'root', so only the directive is declared.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [NxFocusTrapDirective],
  exports: [NxFocusTrapDirective],
})
export class NxOverlayModule {}
