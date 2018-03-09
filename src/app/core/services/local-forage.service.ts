import { Injectable } from '@angular/core';
import * as localForage from "localforage";

@Injectable()
export class LocalForageService {

    constructor() {
        localForage.config({
            //driver: localForage.INDEXEDDB,
            name: 'soApp',
            version: 1.0,
            size: 4980736,
            storeName: 'soAppStore'
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