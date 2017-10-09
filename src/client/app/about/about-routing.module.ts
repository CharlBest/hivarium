import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navigation } from '../shared/navigation/navigation/navigation.component';
import { AboutComponent } from './about/about.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: AboutComponent, pathMatch: 'full', data: { title: 'About', nav: Navigation.Primary } },
        ])
    ],
    exports: [RouterModule]
})
export class AboutRoutingModule { }
