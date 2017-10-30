import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { AuthService } from '../../shared/auth.service';
import { ShippingAddressModel } from '../../../../server/models/user/shipping-address.model';
import { Validators } from '../../../../server/validation/validators';
import { ShippingCountries } from '../../../../server/models/campaign/shipping-countries';

@Component({
    selector: 'app-add-shipping-address-dialog',
    templateUrl: './add-shipping-address-dialog.component.html',
    styleUrls: ['./add-shipping-address-dialog.component.scss']
})
export class AddShippingAddressDialogComponent implements OnInit {

    form: FormGroup;
    serverErrors;
    isProcessing = false;
    shippingCountries = ShippingCountries;

    constructor(private fb: FormBuilder,
        private profileService: ProfileService,
        public dialogRef: MatDialogRef<AddShippingAddressDialogComponent>) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            recipientName: ['', [
                Validators.required
            ]],
            contactNumber: ['', [
                Validators.required,
                Validators.minLength(8)
            ]],
            streetAddress: ['', [
                Validators.required
            ]],
            addressLine2: [''],
            city: ['', [
                Validators.required
            ]],
            postalCode: ['', [
                Validators.required,
                Validators.minLength(3)
            ]],
            // TODO: add validator to be required
            country: ['']
        });
    }

    onSubmit() {
        const viewModel = new ShippingAddressModel();

        viewModel.recipientName = this.form.get('recipientName').value;
        viewModel.contactNumber = this.form.get('contactNumber').value;
        viewModel.streetAddress = this.form.get('streetAddress').value;
        viewModel.addressLine2 = this.form.get('addressLine2').value;
        viewModel.city = this.form.get('city').value;
        viewModel.postalCode = this.form.get('postalCode').value;
        viewModel.country = this.form.get('country').value;

        this.profileService.createShippingAddress(viewModel).subscribe(data => {
            this.dialogRef.close(data);
        }, error => {
        });
    }
}
