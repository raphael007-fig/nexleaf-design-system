import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxRadioGroupComponent, NxRadioComponent } from './radio.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NxRadioGroupComponent, NxRadioComponent],
  exports: [NxRadioGroupComponent, NxRadioComponent],
})
export class NxRadioModule {}
