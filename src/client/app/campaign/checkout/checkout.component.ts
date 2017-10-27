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

  totalQuantity = 1;
  totalHiveCoins = 0;
  totalAmount: number = null;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if ((propName === 'selectedProductUId' || propName === 'campaign') && this.campaign !== null) {
        this.selectedProduct = this.campaign.products.find(x => x.uId === this.selectedProductUId) || null;
        if (this.selectedProduct !== null) {
          this.totalAmount = this.selectedProduct.cost;
        }
      }
    }
  }

  goToLogin() {
    this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url } });
  }

  quantityValueChanges(quantity: number) {
    this.totalQuantity = quantity;
    this.totalAmount = (this.selectedProduct.cost * this.totalQuantity) - this.totalHiveCoins;
  }

  hiveCoinsValueChanges(quantity: number) {
    this.totalHiveCoins = quantity;
    this.totalAmount = (this.selectedProduct.cost * this.totalQuantity) - this.totalHiveCoins;
  }
}
