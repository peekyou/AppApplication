import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthHttpService } from '../../core/services/auth-http.service';
import { Review } from './review';
import { PagingResponse } from '../../core/models/paging';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Injectable()
export class ReviewService {
    private api: string;
    
        constructor(@Inject(APP_CONFIG) appConfig: AppConfig, private http: AuthHttpService) { 
            this.api = appConfig.ApiEndpoint  + '/reviews';
        }

    getAll(page: number, count: number): Observable<PagingResponse<Review>> {
        return this.http.get(this.api + '?pageNumber=' + page + '&itemsCount=' + count);
    }
    
    create(review: Review): Observable<string> {
        return this.http.post(this.api, review);
    }
}