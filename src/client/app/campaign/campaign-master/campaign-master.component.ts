import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '../campaign.service';
import { CampaignViewModel } from '../../../../server/view-models/campaign/campaign.view-model';

@Component({
  selector: 'app-campaign-master',
  templateUrl: './campaign-master.component.html',
  styleUrls: ['./campaign-master.component.scss']
})
export class CampaignMasterComponent implements OnInit {

  isProcessing = true;
  campaignUId: string;
  selectedProductUId: string = null;
  campaign: CampaignViewModel;
  showReferralPage = false;

  constructor(private route: ActivatedRoute,
    private campaignService: CampaignService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.campaignUId = params.get('uId');

      this.getCampaign();
      window.scroll(0, 0);
    });

    this.route.queryParamMap.subscribe(params => {
      this.selectedProductUId = params.get('productUId') || null;
      window.scroll(0, 0);

      this.showReferralPage = params.get('ref') === 'true';
    });
  }

  getCampaign() {
    this.campaignService.getCampaign(this.campaignUId).subscribe(data => {
      this.isProcessing = false;
      this.campaign = new CampaignViewModel(data.campaign, data.owner, data.milestones, data.products);
    });
  }
}
