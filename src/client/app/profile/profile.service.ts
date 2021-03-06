import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { UserRoutes } from '../../../server/routes/user.routes';
import { UserModel } from '../../../server/models/user/user.model';
import { ReportUserViewModel } from '../../../server/view-models/profile/report-user.view-model';
import { UpdatePasswordViewModel } from '../../../server/view-models/profile/update-password.view-model';
import { UpdateAvatarViewModel } from '../../../server/view-models/profile/update-avatar.view-model';
import { UpdateBioViewModel } from '../../../server/view-models/profile/update-bio.view-model';
import { ShippingAddressModel } from '../../../server/models/user/shipping-address.model';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  public getUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.apiUrlEndpoint}${UserRoutes.getUser.constructRootUrl()}`);
  }

  public updateAvatar(viewModel: UpdateAvatarViewModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrlEndpoint}${UserRoutes.updateAvatar.constructRootUrl()}`, viewModel);
  }

  public updateBio(viewModel: UpdateBioViewModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrlEndpoint}${UserRoutes.updateBio.constructRootUrl()}`, viewModel);
  }

  public updatePassword(viewModel: UpdatePasswordViewModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrlEndpoint}${UserRoutes.updatePassword.constructRootUrl()}`, viewModel);
  }

  public deleteUser(): Observable<UserModel> {
    return this.http.delete<UserModel>(`${environment.apiUrlEndpoint}${UserRoutes.deleteUser.constructRootUrl()}`);
  }

  public resendEmailVerificationLink(): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrlEndpoint}${UserRoutes.resendEmailVerificationLink.constructRootUrl()}`, null);
  }

  public deleteShippingAddress(uId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrlEndpoint}${UserRoutes.deleteShippingAddress.constructRootUrl(`/${uId}`)}`);
  }
}
