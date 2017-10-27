import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignService } from './campaign.service';
import { CampaignComponent } from './campaign/campaign.component';
import { CoinRewardInfoDialogComponent } from './coin-reward-info-dialog/coin-reward-info-dialog.component';
import { CampaignMasterComponent } from './campaign-master/campaign-master.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReferralComponent } from './referral/referral.component';
import { ReferralRewardsComponent } from './referral-rewards/referral-rewards.component';
import { ClipboardModule } from 'ngx-clipboard';
import { MediaModule } from '../shared/media/media.module';
import { NumberTickerComponent } from './number-ticker/number-ticker.component';
import {
  MatButtonModule,
  MatCardModule,
  MatTabsModule,
  MatIconModule,
  MatProgressBarModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CampaignRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatProgressBarModule,
    MatDialogModule,
    MatInputModule,
    ClipboardModule,
    MediaModule
  ],
  declarations: [
    CampaignComponent,
    CampaignMasterComponent,
    CheckoutComponent,
    ReferralComponent,
    ReferralRewardsComponent,
    CoinRewardInfoDialogComponent,
    NumberTickerComponent
  ],
  providers: [
    CampaignService
  ],
  entryComponents: [
    CoinRewardInfoDialogComponent
  ]
})
export class CampaignModule { }
