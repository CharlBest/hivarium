import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { CampaignRoutes } from '../../../server/routes/campaign.routes';
import { UserModel } from '../../../server/models/user/user.model';
import { CreateCampaignViewModel } from '../../../server/view-models/campaign/create-campaign.view-model';
import { CampaignModel } from '../../../server/models/campaign/campaign.model';

@Injectable()
export class CreateCampaignService {

    constructor(private http: HttpClient) { }

    public createCampaign(viewModel: CreateCampaignViewModel): Observable<CampaignModel> {
        return this.http.post<CampaignModel>(`${environment.apiUrlEndpoint}${CampaignRoutes.createCampaign.constructRootUrl()}`, viewModel);
    }
}
