﻿import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

import { AuthHttpService } from './auth-http.service';
import { AuthService } from '../../components/+auth/auth.service';
import { User } from '../models/user';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Injectable()
export class UserService {
    private api: string;
    public user: User;
    private timerSubscription: Subscription;     
    private interval: number = 10000; // 10000 = 10 secs

    constructor(
        @Inject(APP_CONFIG) private appConfig: AppConfig, 
        private http: AuthHttpService, 
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
                    },
                    err => { 
                        this.user = null;
                        console.log(err);
                    }
                );
        }
        else {
            this.user = null;
        }
    }

    logout() {
        this.authService.logout();
        this.user = null;
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