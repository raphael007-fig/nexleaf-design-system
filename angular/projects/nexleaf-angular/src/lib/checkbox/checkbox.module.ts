import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NxCheckboxComponent,
  NxRadioButtonComponent,
  NxChoiceListComponent,
} from './checkbox.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NxCheckboxComponent,
    NxRadioButtonComponent,
    NxChoiceListComponent,
  ],
  exports: [
    NxCheckboxComponent,
    NxRadioButtonComponent,
    NxChoiceListComponent,
  ],
})
export class NxCheckboxModule {}
