import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { HttpService } from '../../core/services/http.service';
import { parseJwt } from '../../core/helpers/utils';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Injectable()
export class AuthService {
    public token: string = null;
    private permissions: string[];

    constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private http: HttpService) {
        this.token = localStorage.getItem('cus_token');
        this.setPermissions();
    }

    sendOtpCode(mobileNumber: string): Observable<string> {
        return this.http.post(this.appConfig.ApiEndpoint + '/mobile/verification/init', {
            merchantId: this.appConfig.MerchantId,
            mobileNumber: mobileNumber
        });
    }

    login(firstname: string, lastname: string, mobileNumber: string, otpCode: string, customerId: string = null): Observable<boolean> {
        return this.http.post(this.appConfig.ApiEndpoint + '/customers/register', {
                firstname: firstname,
                lastname: lastname,
                merchantId: this.appConfig.MerchantId,
                mobileNumber: mobileNumber,
                otpCode: otpCode,
                customerId: customerId
            })
            .map(token => {
                this.token = token;
                localStorage.setItem('cus_token', token);
                this.setPermissions();
                return true;
            });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('cus_token');
    }

    isAuthenticated(): boolean {
        return this.token != null;
    }
    
    getUserId(): string {
        if (this.token) {
            var claims = parseJwt(this.token);
            return claims[this.appConfig.UserIdClaim];
        }
        return null;
    }

    setPermissions() {
        if (this.token) {
            var claims = parseJwt(this.token);
            this.permissions = claims[this.appConfig.PermissionsClaim];
        }
        else {
            this.permissions = [];
        }
    }
}

