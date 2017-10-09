import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile.service';
import { ProfileRoutingModule } from './profile-routing.module';
import { ShareDialogModule } from '../shared/share-dialog/share-dialog.module';
import { ReportDialogModule } from '../shared/report-dialog/report-dialog.module';
import { UploadButtonModule } from '../shared/upload-button/upload-button.module';
import { UpdateBioComponent } from './update-bio/update-bio.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ShowErrorsModule } from '../shared/show-errors/show-errors.module';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { TutorialModule } from '../shared/tutorial/tutorial.module';
import {
  MdButtonModule,
  MdCardModule,
  MdProgressSpinnerModule,
  MdIconModule,
  MdDialogModule,
  MdMenuModule,
  MdSnackBarModule,
  MdTooltipModule,
  MdInputModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdDialogModule,
    MdIconModule,
    MdSnackBarModule,
    MdTooltipModule,
    MdInputModule,
    ShareDialogModule,
    ReportDialogModule,
    UploadButtonModule,
    ShowErrorsModule,
    TutorialModule
  ],
  declarations: [
    ProfileComponent,
    UpdateBioComponent,
    UpdatePasswordComponent,
    DeleteUserDialogComponent
  ],
  providers: [
    ProfileService
  ],
  entryComponents: [
    DeleteUserDialogComponent
  ]
})
export class ProfileModule { }