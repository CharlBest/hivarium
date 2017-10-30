import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login/login.component';
import { Navigation } from '../shared/navigation/navigation/navigation.component';
import { UserComponent } from '../user/user/user.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':id', component: UserComponent, pathMatch: 'full', data: { title: 'User', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class UserRoutingModule { }
