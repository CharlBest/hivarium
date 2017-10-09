import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { Navigation } from '../shared/navigation/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CreateCampaignComponent, pathMatch: 'full', data: { title: 'Start project', nav: Navigation.Primary } }
        ])
    ],
    exports: [RouterModule]
})
export class CreateCampaignRoutingModule { }
