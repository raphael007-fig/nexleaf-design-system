import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NxBtnComponent,
  NxBtnGroupComponent,
  NxBtnGroupSegmentedComponent,
} from './btn.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NxBtnComponent,
    NxBtnGroupComponent,
    NxBtnGroupSegmentedComponent,
  ],
  exports: [
    NxBtnComponent,
    NxBtnGroupComponent,
    NxBtnGroupSegmentedComponent,
  ],
})
export class NxBtnModule {}
