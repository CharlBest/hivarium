import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserService } from '../../app/create-user/create-user.service';
import { LoginService } from '../login/login.service';
import { ShowErrorsModule } from '../shared/show-errors/show-errors.module';
import { CreateCampaignRoutingModule } from './create-campaign-routing.module';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { CreateCampaignService } from './create-campaign.service';
import {
  MatButtonModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CreateCampaignRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ShowErrorsModule
  ],
  declarations: [
    CreateCampaignComponent
  ],
  providers: [
    CreateCampaignService
  ]
})
export class CreateCampaignModule { }
