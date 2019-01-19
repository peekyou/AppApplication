import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthHttpService } from './auth-http.service';
import { UserService } from './user.service';
import { AuthService } from '../../components/+auth/auth.service';
import { Device, PushSubscription } from '../models/device';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Injectable()
export class PushNotificationService {
    private deviceIdKey = 'deviceId';

    constructor(
        @Inject(APP_CONFIG) private appConfig: AppConfig,
        private http: AuthHttpService,
        private user: UserService,
        private authService: AuthService) {
    }

    saveDeviceId(deviceId: string) {
        if (deviceId) {
            localStorage.setItem(this.deviceIdKey, deviceId);
        }
    }

    saveDevice(device: Device): Observable<string> {
        if (!localStorage.getItem(this.deviceIdKey)) {
            return this.http.post(this.appConfig.ApiEndpoint + '/device', device);
        }
        return Observable.of('');
    }
        
    savePushSubscription(sub) {
        var subscription: PushSubscription = {
            notificationGranted: false,
            customerId: this.authService.getUserId()
        };
        if (sub) {
            var obj = JSON.parse(JSON.stringify(sub));
            subscription.endpoint = obj.endpoint;
            subscription.auth = obj.keys.auth;
            subscription.p256dh = obj.keys.p256dh;
            subscription.notificationGranted = true;
        }
        
        subscription.deviceId = localStorage.getItem(this.deviceIdKey);
        this.http.post(this.appConfig.ApiEndpoint + '/push/subscription', subscription)
            .subscribe(
                res => {},
                err => console.log(err)
            );
    }
}