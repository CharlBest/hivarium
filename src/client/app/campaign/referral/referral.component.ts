import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CampaignViewModel } from '../../../../server/view-models/campaign/campaign.view-model';
import { MatSnackBar } from '@angular/material';
import { CampaignService } from '../campaign.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnChanges {

  isProcessing = true;
  @Input() campaign: CampaignViewModel = null;
  link: string = null;

  constructor(public snackBar: MatSnackBar,
    private campaignService: CampaignService) { }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'campaign' && this.campaign !== null) {
        this.campaignService.getOrCreateCampaignReferralLink(this.campaign.campaign.uId).subscribe(data => {
          this.isProcessing = false;
          this.link = `${environment.hostUrlForSharingToWeb}/campaign/${this.campaign.campaign.uId}?refcode=${data}`;
        });
      }
    }
  }

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
