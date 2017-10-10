import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '../campaign.service';
import { CampaignViewModel } from '../../../../server/view-models/campaign/campaign.view-model';
import { MatDialog } from '@angular/material';
import { CoinRewardInfoDialogComponent } from '../coin-reward-info-dialog/coin-reward-info-dialog.component';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  isProcessing = true;
  campaignUId: string;
  campaign: CampaignViewModel = null;
  constructor(private route: ActivatedRoute,
    private campaignService: CampaignService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.campaignUId = params.get('uId');

      this.getCampaign();
    });
  }

  getCampaign() {
    this.campaignService.getCampaign(this.campaignUId).subscribe(data => {
      this.isProcessing = false;
      this.campaign = new CampaignViewModel(data.campaign, data.owner, data.milestones, data.products);
    });
  }

  openCoinRewardInfoDialog() {
    this.dialog.open(CoinRewardInfoDialogComponent);
  }
}
