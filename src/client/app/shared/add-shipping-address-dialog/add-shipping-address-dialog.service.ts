import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ShippingAddressModel } from '../../../../server/models/user/shipping-address.model';
import { Observable } from 'rxjs/Observable';
import { UserRoutes } from '../../../../server/routes/user.routes';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AddShippingAddressDialogService {

    constructor(private http: HttpClient) { }

    public createShippingAddress(viewModel: ShippingAddressModel): Observable<ShippingAddressModel> {
        return this.http.post<ShippingAddressModel>(`${environment.apiUrlEndpoint}${UserRoutes.createShippingAddress.constructRootUrl()}`, viewModel);
    }
}
