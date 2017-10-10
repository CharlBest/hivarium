import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navigation } from '../shared/navigation/navigation/navigation.component';
import { CampaignMasterComponent } from './campaign-master/campaign-master.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':uId', component: CampaignMasterComponent, pathMatch: 'full', data: { title: 'Campaign', nav: Navigation.Back } },
        ])
    ],
    exports: [RouterModule]
})
export class CampaignRoutingModule { }
