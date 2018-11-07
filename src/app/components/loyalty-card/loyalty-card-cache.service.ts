import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LoyaltyCardCache } from './loyalty-card-cache';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Injectable()
export class LoyaltyCardCacheService {
    public cache: LoyaltyCardCache = { };
    public loyaltyCacheKey = 'loyaltycache';
    
    constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {
        if (appConfig.MerchantId) {
            this.loyaltyCacheKey = this.loyaltyCacheKey + '-' + appConfig.MerchantId;
        }
    }

    getCache(): LoyaltyCardCache {
        var c = localStorage.getItem(this.loyaltyCacheKey);
        if (c) {
            c = JSON.parse(c);
        }
        return <LoyaltyCardCache>c;
    }
}