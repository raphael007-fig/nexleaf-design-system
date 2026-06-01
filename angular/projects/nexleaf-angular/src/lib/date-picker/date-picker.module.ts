import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxDatePickerComponent } from './date-picker.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NxDatePickerComponent],
  exports: [NxDatePickerComponent],
})
export class NxDatePickerModule {}
