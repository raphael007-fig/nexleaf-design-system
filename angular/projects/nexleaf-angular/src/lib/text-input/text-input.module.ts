import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxTextInputComponent } from './text-input.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NxTextInputComponent],
  exports: [NxTextInputComponent],
})
export class NxTextInputModule {}
