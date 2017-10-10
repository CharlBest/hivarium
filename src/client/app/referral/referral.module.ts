import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferralService } from './referral.service';
import { ReferralRoutingModule } from './referral-routing.module';
import { ReferralComponent } from './referral/referral.component';
import {
  MatButtonModule,
  MatCardModule,
  MatRadioModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReferralRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule
  ],
  declarations: [
    ReferralComponent
  ],
  providers: [
    ReferralService
  ]
})
export class ReferralModule { }
