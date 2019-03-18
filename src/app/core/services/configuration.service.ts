import { Injectable, EventEmitter, Inject, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

import { HttpService } from './http.service';
import { LocalForageService } from './local-forage.service';
import { Page, WeekDay } from '../models/page';
import { MerchantConfiguration } from '../models/merchantConfiguration';
import { LoyaltyCardCacheService } from '../../components/loyalty-card/loyalty-card-cache.service';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { styleBackgound } from '../../core/helpers/utils';
import { CustomerCustomFields } from '../../core/models/customerCustomFields';
import { LoyaltyProgramPoints } from '../../core/models/loyaltyPrograms';
import { Product } from '../../core/models/product';

@Injectable()
export class ConfigurationService {
    private api: string;
    private weekDaysLocale = {
        'en': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'fr': ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        'ar': ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
    }

    private monthNamesLocale = {
        'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        'fr': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        'ar': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
    
    private interval: number = 5000; // 10000 = 10 secs
    public config: MerchantConfiguration;
    public customerCustomFields: CustomerCustomFields[] = [];
    public products: Product[];

    private weekDays: WeekDay[] = [];
    public loader: Subscription;
    private timerSubscription: Subscription;        
    public configChanged: EventEmitter<MerchantConfiguration> = new EventEmitter();

    constructor(
        @Inject(APP_CONFIG) private appConfig: AppConfig,
        private loyaltyCardCacheService: LoyaltyCardCacheService,
        private http: HttpService, 
        private localForage: LocalForageService) {
            
            this.api = appConfig.ApiEndpoint + '/merchants';
            var days = this.weekDaysLocale[appConfig.Lang];
            for (var i = 0; i < days.length; i++) { 
                this.weekDays.push({ id: i + 1, name: days[i] });
            }
                    
            let timer = TimerObservable.create(0, this.interval);
            this.timerSubscription = timer.subscribe(t => {
                this.loadConfiguration();
            });

            this.getCustomerCustomFields();
            this.getProducts(null, null);
    }

    getMonthLocale(month: number): string {
       if (this.monthNamesLocale && this.monthNamesLocale[this.appConfig.Lang]) {
           return this.monthNamesLocale[this.appConfig.Lang][month];
       }
       return this.monthNamesLocale['en'][month];
    }
    
    private loadConfiguration() {
        this.localForage.get('merchant').then(merchant => {
            if (merchant && !this.config) {
                this.config = merchant.conf;
            }

            // If there is no config get it from server
            if (!this.config) {
                this.getMerchantConfiguration();
            }
            else {
                // Otherwise check if config needs to be refreshed
                this.getMerchantTimestamp()
                    .subscribe(timestamp => {
                        if (timestamp != null && ((!this.config.timestamp && timestamp) || (timestamp > this.config.timestamp))) {
                            this.getMerchantConfiguration(timestamp);
                        }
                        else {
                            this.setLoyaltyCache();
                        }
                    },
                    err => console.log(err));
            }
        });
    }

    private getMerchantTimestamp(): Observable<number> {
        return this.http.get(this.api + '/' + this.appConfig.MerchantId + '/timestamp');
    }

    private getMerchantConfiguration(timestamp: number = null) {
        this.loader = this.http.get(this.api + '/' + this.appConfig.MerchantId + '/configuration')
            .subscribe(configuration => {
                configuration.timestamp = timestamp;
                this.setConfiguration(configuration);
            },
            err => { });
    }

    private setConfiguration(configuration: MerchantConfiguration) {
        if (configuration) {
            this.config = configuration;
            for (var i = 0; configuration.loyaltyPrograms && i < configuration.loyaltyPrograms.length; i++) {
                if ((<LoyaltyProgramPoints>configuration.loyaltyPrograms[i]).rewards) {
                    (<LoyaltyProgramPoints>configuration.loyaltyPrograms[i]).rewards.sort(function(a,b) {
                        return (a.pointsThreshold > b.pointsThreshold) ? 1 : ((b.pointsThreshold > a.pointsThreshold) ? -1 : 0);
                    });
                }
            }
            
            if (this.config.design) {
                this.config.design.rewardsWheelSecondaryColor = this.calculateSecondaryColor(this.config.design.rewardsWheelColor);
            }

            if (this.config.snapchat) {
                this.config.snapchatLink = 'snapchat://add/' + this.config.snapchat;
            }
            this.localForage.save('merchant', {
                'conf': this.config
            });
            this.setLoyaltyCache();
            this.configChanged.emit(this.config);
        }
    }

    private calculateSecondaryColor(color: string): string {
        if (color) {
            var numbers = color.match(/\d+/g).map(Number);
            var max = 255;
            if (numbers.length >= 3) {
                numbers[0] = numbers[0] + 15 > max ? numbers[0] - 15 : numbers[0] + 15;
                numbers[1] = numbers[1] + 25 > max ? numbers[1] - 25 : numbers[1] + 25;
                numbers[2] = numbers[2] + 10 > max ? numbers[2] - 10 : numbers[2] + 10;
                return 'rgb(' + numbers[0] + ',' + numbers[1] + ',' + numbers[2] + ')';        
            }
        }
        return null;
    }

    private setLoyaltyCache() {
        this.loyaltyCardCacheService.cache.discountAmount = this.config.discountAmount;
        this.loyaltyCardCacheService.cache.discountCurrency = this.config.discountCurrency;
        this.loyaltyCardCacheService.cache.discountPointsThreshold = this.config.discountPointsThreshold;
        this.loyaltyCardCacheService.cache.background = styleBackgound(this.config);
        localStorage.setItem(this.loyaltyCardCacheService.loyaltyCacheKey, JSON.stringify(this.loyaltyCardCacheService.cache));
    }

    public getCustomerCustomFields() {
        this.http
            .get(this.api + '/' + this.appConfig.MerchantId + '/customfields')
            .subscribe(response => {
                if (response) {
                    this.customerCustomFields = response;
                }
            });
    }

    public getProducts(page: number, count: number) {
        this.http.get(this.appConfig.ApiEndpoint + '/products/merchant/' + this.appConfig.MerchantId)
        .subscribe(response => {
            this.products = response;
        });
    }
}

