import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxOverlayModule } from '../overlay/overlay.module';
import { NxModalComponent } from './modal.component';

@NgModule({
  imports: [CommonModule, NxOverlayModule],
  declarations: [NxModalComponent],
  exports: [NxModalComponent],
})
export class NxModalModule {}
