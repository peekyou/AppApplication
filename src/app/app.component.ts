import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { AuthService } from './components/+auth/auth.service';
import { UserService } from './core/services/user.service';
import { PushNotificationService } from './core/services/push-notification.service';
import { Device, PushSubscription } from './core/models/device';
import { ConfigurationService } from './core/services/configuration.service';
import { APP_CONFIG, AppConfig } from './app.config';
import { isMobile } from './core/helpers/utils';
import { subscribeUser } from './core/helpers/push-manager';
import { TranslationService } from './core/services/translation.service';
import { LoyaltyCardCacheService } from './components/loyalty-card/loyalty-card-cache.service';
import { LoyaltyCardCache } from './components/loyalty-card/loyalty-card-cache';
import { getBaseUrl, getTokenFromUrl, styleBackgound, styleTutoColor, iOSNotStandalone } from './core/helpers/utils';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
    './app.component.scss'
    ]
})
export class AppComponent implements OnInit {
    showInstallationTuto: boolean;
    showLoadingLogo: boolean = false;
    cache: LoyaltyCardCache;
    url: string;
    showOnlyMobileScreen: boolean = true;
    styleBackgound: any;
    styleTutoColor: any;

    constructor(
        @Inject(APP_CONFIG) config: AppConfig,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private deviceService: DeviceDetectorService,
        private notificationService: PushNotificationService,
        private translate: TranslateService,
        private translation: TranslationService,
        private loyaltyCardCacheService: LoyaltyCardCacheService,
        public userService: UserService,
        public s: ConfigurationService) { 

            this.styleBackgound = styleBackgound;
            this.styleTutoColor = styleTutoColor;
            this.showInstallationTuto = iOSNotStandalone();
            var cache = loyaltyCardCacheService.getCache();
            if (!cache || !cache.customerUrl) {
                this.showLoadingLogo = true;
                this.url = getBaseUrl();
            }
            else {
                this.loadCache(cache);
            }

            // this.showOnlyMobileScreen = window.location.href.indexOf('registration') === -1;
            translate.setDefaultLang('en');
            translate.use(config.Lang ? config.Lang : 'en');
            // alert('URL: ' + window.location);
        }

    public ngOnInit() {
        this.loadCacheLabels();

        if (this.authService.isAuthenticated()) {
            this.afterAuthentication();
        }
        else {
            var token = getTokenFromUrl();
            token = token ? token : this.authService.getParamToken();
            if (token) {
                this.authService.setParamToken(token);
                this.login(token);
            }
            else {
                this.userService.user = null;
            }
        }
    }

    private login(token) {
        var codeLength = parseInt(token.charAt(0));
        var customerId = token.slice(1, token.length - codeLength);
        var code = '0' + token.slice(-codeLength);
        this.authService.login(null, null, null, code, customerId)
            .subscribe(
                res => this.afterAuthentication(),
                err => this.router.navigate(['/loyaltycard'], { queryParamsHandling: "preserve" })
            );
    }

    private afterAuthentication() {
        if (window.location.href.indexOf('website-') == -1) {
            this.notificationService.saveDevice(this.getDevice())
            .subscribe(
                deviceId => {
                    this.notificationService.saveDeviceId(deviceId);
                    this.suscribeToPushNotifications();
                },
                err => console.log(err)
            );
        }

        this.userService.launchTimer();
        if (window.location.href.indexOf('promotion') === -1) {
            this.router.navigate(['/loyaltycard'], { queryParamsHandling: "preserve" });
        }
    }

    private suscribeToPushNotifications() {
        if (this.authService.isAuthenticated()) {
            subscribeUser()
            .then(sub => {
                this.notificationService.savePushSubscription(sub);
            }).catch(e => {
                if ((<any>Notification).permission === 'denied') {
                    console.warn('Permission for notifications was denied');
                    this.notificationService.savePushSubscription(null);
                } else {
                    console.error('Unable to subscribe to push', e);
                }
            });
        }
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
}