import { Component, OnInit, Input } from '@angular/core';
import { CampaignViewModel } from '../../../../server/view-models/campaign/campaign.view-model';
import { MatDialog } from '@angular/material';
import { CoinRewardInfoDialogComponent } from '../coin-reward-info-dialog/coin-reward-info-dialog.component';
import { ProductModel } from '../../../../server/models/campaign/product.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  selectedTab: number;
  @Input() campaign: CampaignViewModel = null;
  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  buyNowButton() {
    this.selectedTab = 1;

    const element = document.getElementById('app-tab-group');
    // element.scrollIntoView(element);
    window.scrollTo(0, element.offsetTop);
  }

  goToRefferalSection() {
    this.router.navigate([], { queryParams: { ref: true } });
  }

  goToProduct(product: ProductModel) {
    this.router.navigate([], { queryParams: { product: product.uId, checkout: true } });
  }

  openCoinRewardInfoDialog() {
    this.dialog.open(CoinRewardInfoDialogComponent);
  }
}
