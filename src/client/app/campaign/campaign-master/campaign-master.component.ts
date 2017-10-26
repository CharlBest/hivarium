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
  campaign: CampaignViewModel = null;
  selectedProductUId: string = null;

  showCheckoutSection = false;
  showReferralSection = false;

  constructor(private route: ActivatedRoute,
    private campaignService: CampaignService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.campaignUId = params.get('uId');

      this.getCampaign();
      this.scrollToTop();
    });

    this.route.queryParamMap.subscribe(params => {
      if (params.has('product')) {
        const productUId = params.get('product') || null;
        if (productUId !== null) {
          this.selectedProductUId = productUId;
        }
      }

      this.showReferralSection = params.get('ref') === 'true';
      this.showCheckoutSection = params.get('checkout') === 'true';
      this.scrollToTop();
    });
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  getCampaign() {
    this.campaignService.getCampaign(this.campaignUId).subscribe(data => {
      this.isProcessing = false;
      this.campaign = new CampaignViewModel(data.campaign, data.owner, data.milestones, data.products);
    });
  }
}
