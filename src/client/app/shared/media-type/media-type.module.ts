import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaTypeComponent } from '../../shared/media-type/media-type/media-type.component';
import { ViewMediaDialogComponent } from './view-media-dialog/view-media-dialog.component';
import { ImgErrorDirective } from './img-error.directive';
import {
  MatDialogModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    MediaTypeComponent,
    ViewMediaDialogComponent,
    ImgErrorDirective
  ],
  exports: [
    MediaTypeComponent
  ],
  entryComponents: [
    ViewMediaDialogComponent
  ]
})
export class MediaTypeModule { }
