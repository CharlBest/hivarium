import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navigation } from '../shared/navigation/navigation/navigation.component';
import { CampaignComponent } from './campaign/campaign.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':uId', component: CampaignComponent, pathMatch: 'full', data: { title: 'Campaign', nav: Navigation.Back } },
        ])
    ],
    exports: [RouterModule]
})
export class CampaignRoutingModule { }
