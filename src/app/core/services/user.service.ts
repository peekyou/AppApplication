import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

import { AuthHttpService } from './auth-http.service';
import { AuthService } from '../../components/+auth/auth.service';
import { LoyaltyCardCacheService } from '../../components/loyalty-card/loyalty-card-cache.service';
import { User } from '../models/user';
import { Device, PushSubscription } from '../models/device';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Injectable()
export class UserService {
    private api: string;
    public user: User;
    private timerSubscription: Subscription;
    private interval: number = 10000; // 10000 = 10 secs

    constructor(
        @Inject(APP_CONFIG) private appConfig: AppConfig,
        private loyaltyCardCacheService: LoyaltyCardCacheService,
        private http: AuthHttpService,
        private router: Router, 
        private authService: AuthService) {

        this.api = appConfig.ApiEndpoint + '/customers';
        if (this.authService.getUserId()) {
            this.launchTimer();
        }
    }

    getUser(): Observable<User> {
        if (this.user) {
            return Observable.of(this.user);
        }
        return this.http.get(this.api + '/' + this.authService.getUserId() + '/infos');
    }

    launchTimer() {
        // Start after 0 second every interval
        let timer = TimerObservable.create(0, this.interval);
        this.timerSubscription = timer.subscribe(t => {
            this.reloadUser();
        });
    }
    
    reloadUser() {
        var id = this.authService.getUserId();
        if (id) {
            this.http.get(this.api + '/' + id + '/infos')
                .subscribe(
                    (user: User) => {
                        this.user = user;

                        if (!user) {
                            this.logout();
                            this.router.navigate(['/loyaltycard']);
                        }
                        else if (this.authService.isAuthenticated()) {
                            this.loyaltyCardCacheService.cache.customerName = this.user.firstname + ' ' + this.user.lastname;
                            this.loyaltyCardCacheService.cache.currentPoints = this.user.currentPoints;
                            localStorage.setItem(this.loyaltyCardCacheService.loyaltyCacheKey, JSON.stringify(this.loyaltyCardCacheService.cache));
                        }
                    },
                    err => { 
                        if (!this.authService.isAuthenticated()) {
                            this.logout();
                        }
                    }
                );
        }
        else {
            this.logout();
        }
    }

    logout() {
        this.authService.logout();
        this.user = null;
        this.loyaltyCardCacheService.cache = {};
        localStorage.removeItem(this.loyaltyCardCacheService.loyaltyCacheKey);
    }
    
    create(user: User): Observable<any> {
        return this.http.post(this.api + '/' + this.appConfig.MerchantId, user)
            .map(res => {
                this.user = user;
                return res;
            });
    }

    save(user: User): Observable<number> {
        return this.http.put(this.api + '/' + user.id, user)
            .map(res => {
                this.user = user;
                return res;
            });
    }

    sendEmail(fromEmail: string, content: string): Observable<boolean> {
        return this.http.post(this.appConfig.ApiEndpoint + '/email', { email: fromEmail, content: content });
    }
}