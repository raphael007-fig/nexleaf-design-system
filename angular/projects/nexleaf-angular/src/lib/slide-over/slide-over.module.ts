import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxOverlayModule } from '../overlay/overlay.module';
import { NxSlideOverComponent } from './slide-over.component';

@NgModule({
  imports: [CommonModule, NxOverlayModule],
  declarations: [NxSlideOverComponent],
  exports: [NxSlideOverComponent],
})
export class NxSlideOverModule {}
