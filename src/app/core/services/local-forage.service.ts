import { Injectable, Inject } from '@angular/core';
import * as localForage from "localforage";
import { APP_CONFIG, AppConfig } from '../../app.config';

@Injectable()
export class LocalForageService {

    constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {
        var cacheSuffix = '';
        if  (appConfig.MerchantId) {
            cacheSuffix = appConfig.MerchantId
        }
        localForage.config({
            //driver: localForage.INDEXEDDB,
            name: 'AppWards-' + cacheSuffix,
            version: 1.0,
            size: 4980736,
            storeName: 'AppWardsStore-' + cacheSuffix
        });
    }

    save(key: string, value: any): Promise<any> {
        return localForage.setItem(key, value);
    }
    
    get(key: string): Promise<any> {
        return localForage.getItem(key);
    }

    remove(key: string): Promise<void> {
        return localForage.removeItem(key);
    }
}