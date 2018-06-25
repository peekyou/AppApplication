import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { HttpService } from '../../core/services/http.service';
import { LocalForageService } from '../../core/services/local-forage.service';
import { parseJwt } from '../../core/helpers/utils';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Injectable()
export class AuthService {
    private permissions: string[];
    private tokenKey = 'cus_token';
    private paramTokenKey = 'param_token';
    private mobileKey = 'mobile';
    public token: string = null;
    public mobile: string;

    constructor(
        @Inject(APP_CONFIG) private appConfig: AppConfig, 
        private http: HttpService,
        private localForage: LocalForageService) {

        if (appConfig.MerchantId) {
            this.tokenKey = this.tokenKey + '-' + appConfig.MerchantId;
            this.paramTokenKey = this.paramTokenKey + '-' + appConfig.MerchantId;
            this.mobileKey = this.mobileKey + '-' + appConfig.MerchantId;
        }
        this.token = localStorage.getItem(this.tokenKey);
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
                localStorage.setItem(this.tokenKey, token);
                this.setPermissions();
                return true;
            });
    }

    logout(): void {
        this.token = null;
        this.mobile = null;
        this.permissions = [];
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.paramTokenKey);
        localStorage.removeItem(this.mobileKey);
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
    
    getMobile(): string {
        return localStorage.getItem(this.mobileKey);
    }

    setMobile(value: any) {
        this.mobile = value;
        if (!value) {
            localStorage.removeItem(this.mobileKey);
        }
        else {
            localStorage.setItem(this.mobileKey, value);
        }
    }

    getParamToken(): string {
        return localStorage.getItem(this.paramTokenKey);
    }

    setParamToken(value: any) {
        localStorage.setItem(this.paramTokenKey, value);
    }
}