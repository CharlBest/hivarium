import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddShippingAddressDialogComponent } from './add-shipping-address-dialog/add-shipping-address-dialog.component';
import { AddShippingAddressDialogService } from './add-shipping-address-dialog.service';
import { ShowErrorsModule } from '../show-errors/show-errors.module';
import {
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        ShowErrorsModule
    ],
    declarations: [
        AddShippingAddressDialogComponent
    ],
    providers: [
        AddShippingAddressDialogService
    ],
    entryComponents: [
        AddShippingAddressDialogComponent
    ]
})
export class AddShippingAddressDialogModule { }
