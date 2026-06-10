import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxSlideOverModule } from '../slide-over/slide-over.module';
import { NxBottomSheetComponent } from './bottom-sheet.component';

@NgModule({
  imports: [CommonModule, NxSlideOverModule],
  declarations: [NxBottomSheetComponent],
  exports: [NxBottomSheetComponent],
})
export class NxBottomSheetModule {}
