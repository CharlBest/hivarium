import { Component, OnInit, Input, SimpleChanges, OnChanges, AfterViewChecked } from '@angular/core';
import { CampaignViewModel } from '../../../../server/view-models/campaign/campaign.view-model';
import { ProductModel } from '../../../../server/models/campaign/product.model';
import { AuthService } from '../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PaymentRequestViewModel } from '../../../../server/view-models/payment/payment-request.view-model';
import { CampaignService } from '../campaign.service';
import { UserModel } from '../../../../server/models/user/user.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ShippingAddressModel } from '../../../../server/models/user/shipping-address.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnChanges, AfterViewChecked {

  isProcessing = false;
  @Input() campaign: CampaignViewModel = null;
  @Input() selectedProductUId: string = null;
  selectedProduct: ProductModel = null;
  loggedInUserId: number = this.authService.getloggedInUserId();
  referralCode: string = null;

  totalQuantity = 1;
  totalHiveCoins = 0;
  totalAmount: number = null;

  stripe = null;
  stripeCard = null;

  user: UserModel = null;

  form: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private campaignService: CampaignService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.has('refcode')) {
        this.referralCode = params.get('refcode');
      } else {
        this.referralCode = null;
      }
    });

    if (this.loggedInUserId) {
      this.getUser();
    }

    this.buildForm();
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

  ngAfterViewChecked() {
    if (document.getElementById('card-element') !== null && this.stripe === null) {
      this.buildStripe();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      selectedShippingAddress: null
    });
  }

  getUser() {
    this.campaignService.getUser().subscribe(data => {
      this.user = data;
      this.isProcessing = false;
    }, error => {
      this.isProcessing = false;
      // this.serverErrors = this.formService.getServerErrors(error);
    });
  }

  goToLogin() {
    this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url } });
  }

  goToCreateUser() {
    this.router.navigate(['create-user'], { queryParams: { returnUrl: this.router.url } });
  }

  quantityValueChanges(quantity: number) {
    this.totalQuantity = quantity;
    this.totalAmount = (this.selectedProduct.cost * this.totalQuantity) - this.totalHiveCoins;
  }

  hiveCoinsValueChanges(quantity: number) {
    this.totalHiveCoins = quantity;
    this.totalAmount = (this.selectedProduct.cost * this.totalQuantity) - this.totalHiveCoins;
  }

  doesShipToUser() {
    // TODO
    const selectedShippingAddressCountry = (<ShippingAddressModel>this.form.get('selectedShippingAddress').value).country;
    return false;
  }

  shippingCost() {
    // TODO
    return 50;
  }

  buildStripe() {
    // Create a Stripe client
    this.stripe = window['Stripe'](environment.stripe.publishableKey);

    // Create an instance of Elements
    const elements = this.stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    const style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element
    this.stripeCard = elements.create('card', { style: style });

    // Add an instance of the card Element into the `card-element` <div>
    this.stripeCard.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    this.stripeCard.addEventListener('change', function (event) {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
  }

  onSubmit() {
    this.isProcessing = true;

    this.stripe.createToken(this.stripeCard).then((result) => {
      if (result.error) {
        // Inform the user if there was an error
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server
        this.sendPaymentToServer(result.token.id);
      }
    });
  }

  sendPaymentToServer(token: string) {
    const viewModel = new PaymentRequestViewModel();
    viewModel.token = token;
    viewModel.productUId = this.selectedProduct.uId;
    viewModel.quantity = this.totalQuantity;
    viewModel.hiveCoins = this.totalHiveCoins;
    viewModel.referralCode = this.referralCode;
    viewModel.shippingAddressUId = (<ShippingAddressModel>this.form.get('selectedShippingAddress').value).uId;

    this.campaignService.processPaymentRequest(viewModel).subscribe(
      data => {
        this.isProcessing = false;
      }, error => {
        this.isProcessing = false;
        // this.serverErrors = this.formService.getServerErrors(error);
      });
  }
}
