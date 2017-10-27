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

  hasWebShareApi() {
    if ((<any>navigator).share) {
      return true;
    } else {
      return false;
    }
  }

  webShare() {
    if (this.hasWebShareApi()) {
      (<any>navigator).share({ title: 'Referral link', text: '', url: this.link, });
    }
  }

  openSnackBar() {
    this.snackBar.open('Copied', '', {
      duration: 2000,
    });
  }
}
