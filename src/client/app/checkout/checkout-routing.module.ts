import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navigation } from '../shared/navigation/navigation/navigation.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':id', component: CheckoutComponent, pathMatch: 'full', data: { title: 'Checkout', nav: Navigation.Back } },
        ])
    ],
    exports: [RouterModule]
})
export class CheckoutRoutingModule { }
