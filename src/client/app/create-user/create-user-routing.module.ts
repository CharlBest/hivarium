import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { Navigation } from '../shared/navigation/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CreateUserComponent, pathMatch: 'full', data: { title: 'Create profile', nav: Navigation.Primary } }
        ])
    ],
    exports: [RouterModule]
})
export class CreateUserRoutingModule { }
