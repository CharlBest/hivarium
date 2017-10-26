import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CampaignViewModel } from '../../../../server/view-models/campaign/campaign.view-model';
import { ProductModel } from '../../../../server/models/campaign/product.model';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnChanges {

  @Input() campaign: CampaignViewModel = null;
  @Input() selectedProductUId: string = null;
  selectedProduct: ProductModel = null;
  loggedInUserId: number = this.authService.getloggedInUserId();

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if ((propName === 'selectedProductUId' || propName === 'campaign') && this.campaign !== null) {
        this.selectedProduct = this.campaign.products.find(x => x.uId === this.selectedProductUId) || null;
      }
    }
  }

  goToLogin() {
    this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url } });
  }
}
