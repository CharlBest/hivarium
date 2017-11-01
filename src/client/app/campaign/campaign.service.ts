import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { CampaignRoutes } from '../../../server/routes/campaign.routes';
import { CampaignViewModel } from '../../../server/view-models/campaign/campaign.view-model';
import { CreateOrderViewModel } from '../../../server/view-models/order/create-order.view-model';
import { UserModel } from '../../../server/models/user/user.model';
import { UserRoutes } from '../../../server/routes/user.routes';

@Injectable()
export class CampaignService {

    constructor(private http: HttpClient) { }

    public getCampaign(uId: string, referralCode: string = null): Observable<CampaignViewModel> {
        return this.http.get<CampaignViewModel>(`${environment.apiUrlEndpoint}${CampaignRoutes.getCampaign.constructRootUrl(`/${uId}?refcode=${referralCode}`)}`);
    }

    public getOrCreateCampaignReferralLink(uId: string): Observable<string> {
        return this.http.get<string>(`${environment.apiUrlEndpoint}${CampaignRoutes.getOrCreateCampaignReferralLink.constructRootUrl(`/${uId}`)}`);
    }

    public createOrder(viewModel: CreateOrderViewModel): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrlEndpoint}${CampaignRoutes.createOrder.constructRootUrl()}`, viewModel);
    }

    public getUser(): Observable<UserModel> {
        return this.http.get<UserModel>(`${environment.apiUrlEndpoint}${UserRoutes.getUser.constructRootUrl()}`);
    }
}
