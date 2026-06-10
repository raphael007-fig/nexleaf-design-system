import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxCellModule } from '../cell/cell.module';
import {
  NxCardLayoutType1Component,
  NxCardLayoutType2Component,
  NxCardLayoutType3Component,
  NxCardLayoutType4Component,
  NxCardLayoutType6Component,
} from './card.component';

@NgModule({
  imports: [CommonModule, NxCellModule],
  declarations: [
    NxCardLayoutType1Component,
    NxCardLayoutType2Component,
    NxCardLayoutType3Component,
    NxCardLayoutType4Component,
    NxCardLayoutType6Component,
  ],
  exports: [
    NxCardLayoutType1Component,
    NxCardLayoutType2Component,
    NxCardLayoutType3Component,
    NxCardLayoutType4Component,
    NxCardLayoutType6Component,
  ],
})
export class NxCardModule {}
