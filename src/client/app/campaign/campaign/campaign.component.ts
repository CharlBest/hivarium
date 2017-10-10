import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '../campaign.service';
import { CampaignViewModel } from '../../../../server/view-models/campaign/campaign.view-model';

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
    private campaignService: CampaignService) { }

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
}
