import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navigation } from '../shared/navigation/navigation/navigation.component';
import { ReferralComponent } from './referral/referral.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ReferralComponent, pathMatch: 'full', data: { title: 'Referral', nav: Navigation.Back } },
        ])
    ],
    exports: [RouterModule]
})
export class ReferralRoutingModule { }
