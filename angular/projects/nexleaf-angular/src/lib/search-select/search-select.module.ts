import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NxSearchSelectComponent,
  NxSearchSelectMultiComponent,
} from './search-select.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NxSearchSelectComponent, NxSearchSelectMultiComponent],
  exports: [NxSearchSelectComponent, NxSearchSelectMultiComponent],
})
export class NxSearchSelectModule {}
