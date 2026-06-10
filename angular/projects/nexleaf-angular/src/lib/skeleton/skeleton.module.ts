import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxSkeletonComponent } from './skeleton.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NxSkeletonComponent],
  exports: [NxSkeletonComponent],
})
export class NxSkeletonModule {}
