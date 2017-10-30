import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { UserRoutes } from '../../../server/routes/user.routes';
import { FeedbackViewModel } from '../../../server/view-models/feedback/feedback.view-model';
import { UserViewModel } from '../../../server/view-models/user/user.view-model';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    public getPublicUser(userId: number): Observable<UserViewModel> {
        return this.http.get<UserViewModel>(`${environment.apiUrlEndpoint}${UserRoutes.getPublicUser.constructRootUrl(`/${userId}`)}`);
    }
}
