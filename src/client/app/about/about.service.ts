import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { UserRoutes } from '../../../server/routes/user.routes';

@Injectable()
export class AboutService {

    constructor(private http: HttpClient) { }
}
