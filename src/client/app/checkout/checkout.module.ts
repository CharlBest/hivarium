import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService } from './checkout.service';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import {
  MatButtonModule,
  MatCardModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [
    CheckoutComponent
  ],
  providers: [
    CheckoutService
  ]
})
export class CheckoutModule { }
