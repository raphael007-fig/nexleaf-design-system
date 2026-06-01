import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxBannerComponent } from './banner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NxBannerComponent],
  exports: [NxBannerComponent],
})
export class NxBannerModule {}
