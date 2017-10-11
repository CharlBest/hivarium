import { Component, OnInit, Input } from '@angular/core';
import { CampaignViewModel } from '../../../../server/view-models/campaign/campaign.view-model';

@Component({
  selector: 'app-referral-rewards',
  templateUrl: './referral-rewards.component.html',
  styleUrls: ['./referral-rewards.component.scss']
})
export class ReferralRewardsComponent implements OnInit {

  @Input() campaign: CampaignViewModel = null;
  constructor() { }

  ngOnInit() {
  }

}
