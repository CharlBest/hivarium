import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignService } from './campaign.service';
import { CampaignComponent } from './campaign/campaign.component';
import {
  MatButtonModule,
  MatCardModule,
  MatTabsModule,
  MatIconModule,
  MatProgressBarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CampaignRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatProgressBarModule
  ],
  declarations: [
    CampaignComponent
  ],
  providers: [
    CampaignService
  ]
})
export class CampaignModule { }
