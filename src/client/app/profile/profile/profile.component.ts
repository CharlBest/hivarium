import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UserModel } from '../../../../server/models/user/user.model';
import { ProfileService } from '../profile.service';
import { environment } from '../../../environments/environment';
import { ShareDialogService } from '../../shared/share-dialog/share-dialog.service';
import { ReportDialogService } from '../../shared/report-dialog/report-dialog.service';
import { UpdateAvatarViewModel } from '../../../../server/view-models/profile/update-avatar.view-model';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import * as emojione from 'emojione';
import { TutorialService } from '../../shared/tutorial/tutorial.service';
import { TutorialType } from '../../../../server/view-models/tutorial/tutorial-type.enum';
import { ShippingAddressModel } from '../../../../server/models/user/shipping-address.model';
import { AddShippingAddressDialogComponent } from '../../shared/add-shipping-address-dialog/add-shipping-address-dialog/add-shipping-address-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserModel = null;
  isProcessing = true;
  tutorialTypeEnum = TutorialType;

  constructor(private profileService: ProfileService,
    private shareDialogService: ShareDialogService,
    private reportDialogService: ReportDialogService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private tutorialService: TutorialService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.profileService.getUser().subscribe(data => {
      this.user = data;
      this.isProcessing = false;

      if (this.user !== null && this.user.bio !== null && this.user.bio !== '') {
        this.loadEmoji();
      }
    }, error => {
      this.isProcessing = false;
      // this.serverErrors = this.formService.getServerErrors(error);
    });
  }

  loadEmoji() {
    (<any>emojione).ascii = true;
    const output = emojione.toImage(this.user.bio);
    this.user.bio = output;
  }

  openShareDialog() {
    const link = ['/user', this.user.uId];
    this.shareDialogService.share(link);
  }

  openReportDialog() {
    this.reportDialogService.report(this.user.uId);
  }

  updateAvatar(downloadURL: string) {
    const viewModel = new UpdateAvatarViewModel;
    viewModel.avatarUrl = downloadURL;

    this.profileService.updateAvatar(viewModel).subscribe(data => {
      this.user.avatarUrl = viewModel.avatarUrl;
    }, error => {
    });
  }

  removeAvatar() {
    this.updateAvatar('');
  }

  resendEmailVerificationLink() {
    this.snackBar.open('Sending...', '', {
      duration: 10000,
    });

    this.profileService.resendEmailVerificationLink().subscribe(data => {
      this.snackBar.dismiss();
      this.snackBar.open('Sent', '', {
        duration: 2000,
      });
    }, error => {
    });
  }

  openDeleteAccountDialog() {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent);
    dialogRef.componentInstance.username = this.user.username;
  }

  profileTour() {
    this.tutorialService.activateTutorial(TutorialType.ProfileShare);
  }

  addShippingAddress() {
    const dialogRef = this.dialog.open(AddShippingAddressDialogComponent);
    dialogRef.afterClosed().subscribe((data: ShippingAddressModel) => {
      if (data && data !== null && data !== undefined) {
        if (this.user.shippingAddresses === undefined) {
          this.user.shippingAddresses = [];
        }

        this.user.shippingAddresses.push(data);
      }
    });
  }

  removeShippingAddress(shippingAddress: ShippingAddressModel) {
    this.profileService.deleteShippingAddress(shippingAddress.uId).subscribe(data => {
      const addressUId = this.user.shippingAddresses.findIndex(x => x.uId === shippingAddress.uId);
      if (addressUId !== -1) {
        this.user.shippingAddresses.splice(addressUId, 1);
      }
    }, error => {
    });
  }
}
