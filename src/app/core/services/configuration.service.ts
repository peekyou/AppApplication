import { Injectable, EventEmitter, Inject, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

import { HttpService } from './http.service';
import { LocalForageService } from './local-forage.service';
import { Page, WeekDay } from '../models/page';
import { MerchantConfiguration } from '../models/merchantConfiguration';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Injectable()
export class ConfigurationService {
    private api: string;
    private weekDaysLocale = {
        'en': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'fr': ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        'ar': ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        'sa': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
    
    private interval: number = 5000; // 10000 = 10 secs
    public config: MerchantConfiguration;

    private weekDays: WeekDay[] = [];
    public loader: Subscription;
    private timerSubscription: Subscription;        
    public configChanged: EventEmitter<MerchantConfiguration> = new EventEmitter();

    constructor(
        @Inject(APP_CONFIG) private appConfig: AppConfig,
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
    }

    //getConfiguration(): Observable<MerchantConfiguration> {
    //    if (this.config) {
    //        return Observable.of(this.config);
    //    }
    //    return this.http.get(this.api + '/' + AppSettings.MerchantId + '/configuration');
    //}
    
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
                        if (timestamp != null) {
                            if ((!this.config.timestamp && timestamp) || (timestamp > this.config.timestamp)) {
                                this.getMerchantConfiguration(timestamp);
                            }
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
            this.config.discountPointsThresholdArray = [];
            for (var i = 1; i <= configuration.discountPointsThreshold; i++) {
                this.config.discountPointsThresholdArray.push(i);
            }

            if (this.config.design) {
                this.config.design.rewardsWheelSecondaryColor = this.calculateSecondaryColor(this.config.design.rewardsWheelColor);
            }
            this.localForage.save('merchant', {
                'conf': this.config
            });
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
}

