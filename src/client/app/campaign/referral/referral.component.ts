import { Component, OnInit, Input } from '@angular/core';
import { CampaignViewModel } from '../../../../server/view-models/campaign/campaign.view-model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent {

  @Input() campaign: CampaignViewModel = null;
  link = 'http://localhost:4200/test';

  constructor(public snackBar: MatSnackBar) { }

  onLinkClick() {
    return false;
  }

  openSnackBar() {
    this.snackBar.open('Copied', '', {
      duration: 2000,
    });
  }

}
