import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxTagComponent, NxTagGroupComponent } from './tag.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NxTagComponent, NxTagGroupComponent],
  exports: [NxTagComponent, NxTagGroupComponent],
})
export class NxTagModule {}
