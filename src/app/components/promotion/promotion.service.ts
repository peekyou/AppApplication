import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthHttpService } from '../../core/services/auth-http.service';
import { Promotion } from './promotion';
import { PagingResponse } from '../../core/models/paging';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Injectable()
export class PromotionService {
    private api: string;

    constructor(@Inject(APP_CONFIG) appConfig: AppConfig, private http: AuthHttpService) { 
        this.api = appConfig.ApiEndpoint  + '/promotions';
    }

    getAll(): Observable<Promotion[]> {
        return this.http.get(this.api + '/current');
    }
}

