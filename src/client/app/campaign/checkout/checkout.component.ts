import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CampaignViewModel } from '../../../../server/view-models/campaign/campaign.view-model';
import { ProductModel } from '../../../../server/models/campaign/product.model';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @Input() campaign: CampaignViewModel = null;
  @Input() selectedProductUId: string = null;
  loggedInUserId: number = this.authService.getloggedInUserId();

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url } });
  }
}
