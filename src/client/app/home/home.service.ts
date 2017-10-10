import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CampaignViewModel } from '../../../server/view-models/campaign/campaign.view-model';
import { environment } from '../../environments/environment';
import { CampaignRoutes } from '../../../server/routes/campaign.routes';

@Injectable()
export class HomeService {

    constructor(private http: HttpClient) { }

    public getCampaigns(skip: number): Observable<CampaignViewModel[]> {
        return this.http.get<CampaignViewModel[]>(`${environment.apiUrlEndpoint}${CampaignRoutes.getCampaigns.constructRootUrl(`/${skip}`)}`);
    }
}
