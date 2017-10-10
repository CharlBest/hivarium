import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalService } from './legal.service';
import { LegalRoutingModule } from './legal-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { HelpComponent } from './help/help.component';
import {
  MatButtonModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LegalRoutingModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [
    HelpComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
  ],
  providers: [
    LegalService
  ]
})
export class LegalModule { }
