import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxPaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NxPaginationComponent],
  exports: [NxPaginationComponent],
})
export class NxPaginationModule {}
