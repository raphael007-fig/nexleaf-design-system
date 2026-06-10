import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxBottomSheetModule } from '../bottom-sheet/bottom-sheet.module';
import { NxTertiaryActionsComponent } from './tertiary-actions.component';

@NgModule({
  imports: [CommonModule, NxBottomSheetModule],
  declarations: [NxTertiaryActionsComponent],
  exports: [NxTertiaryActionsComponent],
})
export class NxTertiaryActionsModule {}
