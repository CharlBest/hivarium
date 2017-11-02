import { Component, OnInit, Input } from '@angular/core';
import { CampaignViewModel } from '../../../../server/view-models/campaign/campaign.view-model';
import { ProductModel } from '../../../../server/models/campaign/product.model';

@Component({
  selector: 'app-hive-coin-rewards',
  templateUrl: './hive-coin-rewards.component.html',
  styleUrls: ['./hive-coin-rewards.component.scss']
})
export class HiveCoinRewardsComponent implements OnInit {

  @Input() campaign: CampaignViewModel = null;
  @Input() product: ProductModel = null;
  @Input() loggedInUsername: string = null;
  @Input() showDecimal = false;

  constructor() { }

  ngOnInit() {
  }
}
