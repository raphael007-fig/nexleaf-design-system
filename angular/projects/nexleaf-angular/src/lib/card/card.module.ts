import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NxCardLayoutType1Component,
  NxCardLayoutType2Component,
  NxCardLayoutType3Component,
  NxCardLayoutType4Component,
} from './card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NxCardLayoutType1Component,
    NxCardLayoutType2Component,
    NxCardLayoutType3Component,
    NxCardLayoutType4Component,
  ],
  exports: [
    NxCardLayoutType1Component,
    NxCardLayoutType2Component,
    NxCardLayoutType3Component,
    NxCardLayoutType4Component,
  ],
})
export class NxCardModule {}
