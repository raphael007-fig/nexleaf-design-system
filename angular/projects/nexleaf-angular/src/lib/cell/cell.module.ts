import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxCellComponent } from './cell.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NxCellComponent],
  exports: [NxCellComponent],
})
export class NxCellModule {}
