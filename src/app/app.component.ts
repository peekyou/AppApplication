import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { AuthService } from './components/+auth/auth.service';
import { UserService } from './core/services/user.service';
import { Device, PushSubscription } from './core/models/device';
import { ConfigurationService } from './core/services/configuration.service';
import { APP_CONFIG, AppConfig } from './app.config';
import { isMobile, subscribeUser } from './core/helpers/utils';
import { TranslationService } from './core/services/translation.service';
import { LoyaltyCardCacheService } from './components/loyalty-card/loyalty-card-cache.service';
import { LoyaltyCardCache } from './components/loyalty-card/loyalty-card-cache';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
    './app.component.scss'
    ]
})
export class AppComponent implements OnInit {
    isMobile: boolean;
    showLoadingLogo: boolean = false;
    cache: LoyaltyCardCache;
    url: string;

    constructor(
        @Inject(APP_CONFIG) config: AppConfig,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private deviceService: DeviceDetectorService,
        private translate: TranslateService,
        private translation: TranslationService,
        private loyaltyCardCacheService: LoyaltyCardCacheService,
        public userService: UserService,
        public s: ConfigurationService) { 

            var cache = loyaltyCardCacheService.getCache();
            if (!cache || !cache.customerUrl) {
                this.showLoadingLogo = true;
                this.url = this.getUrl();
            }
            else {
                this.loadCache(cache);
            }

            this.isMobile = isMobile();
            translate.setDefaultLang('en');
            translate.use(config.Lang ? config.Lang : 'en');
        }

    public ngOnInit() {
        this.loadCacheLabels();

        this.route.queryParams
            .switchMap(params => {
                var param = params['t'];
                if (param) {
                    this.authService.setParamToken(param);
                    if (this.authService.isAuthenticated()) {
                        return Observable.of(true);
                    }
                    return Observable.of(param);
                }
                else {
                    var token = this.authService.getParamToken();
                    if (token) {
                        return Observable.of(token);
                    }
                }
                var isAuthenticated = this.authService.isAuthenticated();
                return Observable.of(isAuthenticated ? true : null);
            })
            .subscribe(res => {
                if (res === true) {
                    this.afterAuthentication();
                }
                else if (res) {
                    this.login(res);
                }
                else {
                    this.userService.user = null;
                }
            },
            err => this.router.navigate(['/'], { queryParamsHandling: "merge" }));
    }

    public iOSNotStandalone() { 
        if ((window.navigator.userAgent.indexOf('iPhone') != -1 ||
            window.navigator.userAgent.indexOf('iPad') != -1)
            && !(<any>window.navigator).standalone
            && window.location.href.indexOf('website-') == -1) {
           return true; 
        }
        return false;
    }

    private login(token) {
        var codeLength = parseInt(token.charAt(0));
        var customerId = token.slice(1, token.length - codeLength);
        var code = '0' + token.slice(-codeLength);
        this.authService.login(null, null, null, code, customerId)
            .subscribe(
                res => this.afterAuthentication(),
                err => this.router.navigate(['/'], { queryParamsHandling: "merge" })
            );
    }

    private afterAuthentication() {
        if (window.location.href.indexOf('website-') == -1) {
            this.userService.saveDevice(this.getDevice())
            .subscribe(
                deviceId => {
                    this.userService.saveDeviceId(deviceId);
                    this.suscribeToPushNotifications();
                },
                err => console.log(err)
            );
        }

        this.userService.launchTimer();
        if (this.router.url.indexOf('promotion') === -1) {
            this.router.navigate(['/'], { queryParamsHandling: "merge" });
        }
    }

    private suscribeToPushNotifications() {
        if (this.authService.isAuthenticated()) {
            subscribeUser()
            .then(sub => {
                this.savePushSubscription(sub);
            }).catch(e => {
                if ((<any>Notification).permission === 'denied') {
                    console.warn('Permission for notifications was denied');
                    this.savePushSubscription(null);
                } else {
                    console.error('Unable to subscribe to push', e);
                }
            });
        }
    }

    private savePushSubscription(sub) {
        var param: PushSubscription = {
            notificationGranted: false,
            customerId: this.authService.getUserId()
        };
        if (sub) {
            var obj = JSON.parse(JSON.stringify(sub));
            param.endpoint = obj.endpoint;
            param.auth = obj.keys.auth;
            param.p256dh = obj.keys.p256dh;
            param.notificationGranted = true;
        }
        this.userService.savePushSubscription(param);
    }

    private getDevice() : Device {
        var deviceType = '';
        if (this.deviceService.isMobile()) {
            deviceType = 'mobile';
        }
        else if (this.deviceService.isTablet()) {
            deviceType = 'tablet';
        }
        else if (this.deviceService.isDesktop()) {
            deviceType = 'desktop';
        }
        var deviceInfo = this.deviceService.getDeviceInfo();
        return {
            customerId: this.authService.getUserId(),
            browser: deviceInfo.browser,
            browserVersion: deviceInfo.browser_version,
            deviceName: deviceInfo.device,
            deviceType: deviceType,
            os: deviceInfo.os,
            osVersion: deviceInfo.os_version
        };
    }

    private loadCacheLabels() {
        this.translation.getMultiple([
            'LOYALTY.TITLE',
            'LOYALTY.PTS',
            'LOYALTY.POINTS_TO_GOAL'], x => {
                this.loyaltyCardCacheService.cache.title = x['LOYALTY.TITLE'];
                this.loyaltyCardCacheService.cache.pointsLabel = x['LOYALTY.PTS'];
                this.loyaltyCardCacheService.cache.pointsToGoalLabel = x['LOYALTY.POINTS_TO_GOAL'];
        });
    }

    private loadCache(cache: LoyaltyCardCache) {
        this.cache = cache;
        var remainingPoints = 0;
        if (cache.currentPoints >= 0) {
            this.cache.remainingPoints = Math.max(0, cache.discountPointsThreshold - cache.currentPoints);
        }
    }

    private getUrl(): string {
        var url = window.location.href;
        var to = url.lastIndexOf('/');
        to = to == -1 ? url.length : to + 1;
        url = url.substring(0, to);
        if (!url.endsWith('/')) {
            url = url + '/';
        }
        return url;
    }
}