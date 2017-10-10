import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignService } from './campaign.service';
import { CampaignComponent } from './campaign/campaign.component';
import { CoinRewardInfoDialogComponent } from './coin-reward-info-dialog/coin-reward-info-dialog.component';
import {
  MatButtonModule,
  MatCardModule,
  MatTabsModule,
  MatIconModule,
  MatProgressBarModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CampaignRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  declarations: [
    CampaignComponent,
    CoinRewardInfoDialogComponent
  ],
  providers: [
    CampaignService
  ],
  entryComponents: [
    CoinRewardInfoDialogComponent
  ]
})
export class CampaignModule { }
