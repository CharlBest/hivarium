import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdRadioModule, MdTabsModule } from '@angular/material';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignService } from './campaign.service';
import { CampaignComponent } from './campaign/campaign.component';

@NgModule({
  imports: [
    CommonModule,
    CampaignRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdRadioModule,
    MdTabsModule
  ],
  declarations: [
    CampaignComponent
  ],
  providers: [
    CampaignService
  ]
})
export class CampaignModule { }
