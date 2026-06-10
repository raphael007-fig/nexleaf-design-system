import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxSlideOverModule } from '../slide-over/slide-over.module';
import { NxMenuDrawerComponent } from './menu-drawer.component';

@NgModule({
  imports: [CommonModule, NxSlideOverModule],
  declarations: [NxMenuDrawerComponent],
  exports: [NxMenuDrawerComponent],
})
export class NxMenuDrawerModule {}
