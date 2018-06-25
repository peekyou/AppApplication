import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { AuthService } from './components/+auth/auth.service';
import { UserService } from './core/services/user.service';
import { ConfigurationService } from './core/services/configuration.service';
import { APP_CONFIG, AppConfig } from './app.config';
import { isMobile } from './core/helpers/utils';

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

    constructor(
        @Inject(APP_CONFIG) config: AppConfig,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private translate: TranslateService,
        public userService: UserService,
        public s: ConfigurationService) { 

            this.isMobile = isMobile();
            // translate.addLangs(["en", "fr"]);
            translate.setDefaultLang('en');
            translate.use(config.Lang ? config.Lang : 'en');
        }

    public ngOnInit() {
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
                return Observable.of(null);
            })
            .subscribe(res => {
                if (res === true) {
                    this.userService.launchTimer();
                    this.router.navigate(['/'], { queryParamsHandling: "merge" });
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
        // return true;
        if ((window.navigator.userAgent.indexOf('iPhone') != -1 ||
            window.navigator.userAgent.indexOf('iPad') != -1)
            && !(<any>window.navigator).standalone) {
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
                res => {
                    this.userService.launchTimer();
                    this.router.navigate(['/'], { queryParamsHandling: "merge" });
                },
                err => this.router.navigate(['/'], { queryParamsHandling: "merge" })
            );
    }
}