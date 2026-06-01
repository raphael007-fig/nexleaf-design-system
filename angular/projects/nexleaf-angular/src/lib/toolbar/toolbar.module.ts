import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NxToolbarComponent,
  NxToolbarAichatComponent,
  NxToolbarRegionComponent,
  NxToolbarIconbtnComponent,
  NxToolbarAvatarComponent,
  NxAichatPanelComponent,
  NxLogoComponent,
  NxBreadcrumbsComponent,
} from './toolbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NxToolbarComponent,
    NxToolbarAichatComponent,
    NxToolbarRegionComponent,
    NxToolbarIconbtnComponent,
    NxToolbarAvatarComponent,
    NxAichatPanelComponent,
    NxLogoComponent,
    NxBreadcrumbsComponent,
  ],
  exports: [
    NxToolbarComponent,
    NxToolbarAichatComponent,
    NxToolbarRegionComponent,
    NxToolbarIconbtnComponent,
    NxToolbarAvatarComponent,
    NxAichatPanelComponent,
    NxLogoComponent,
    NxBreadcrumbsComponent,
  ],
})
export class NxToolbarModule {}
