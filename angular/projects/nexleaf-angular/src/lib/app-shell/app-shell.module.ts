import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxAppShellComponent } from './app-shell.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NxAppShellComponent],
  exports: [NxAppShellComponent],
})
export class NxAppShellModule {}
