import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from '../../shared/media/media/media.component';
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
    MediaComponent,
    ViewMediaDialogComponent,
    ImgErrorDirective
  ],
  exports: [
    MediaComponent
  ],
  entryComponents: [
    ViewMediaDialogComponent
  ]
})
export class MediaModule { }
