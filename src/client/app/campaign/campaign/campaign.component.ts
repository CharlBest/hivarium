import { Component, OnInit, Input } from '@angular/core';
import { CampaignViewModel } from '../../../../server/view-models/campaign/campaign.view-model';
import { MatDialog } from '@angular/material';
import { CoinRewardInfoDialogComponent } from '../coin-reward-info-dialog/coin-reward-info-dialog.component';
import { ProductModel } from '../../../../server/models/campaign/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  @Input() campaign: CampaignViewModel = null;
  constructor(public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
  }

  goToProduct(product: ProductModel) {
    this.router.navigate([], { queryParams: { productUId: product.uId } });
  }

  openCoinRewardInfoDialog() {
    this.dialog.open(CoinRewardInfoDialogComponent);
  }
}
