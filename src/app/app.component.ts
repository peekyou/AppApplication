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

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
    './app.component.scss'
    ]
})
export class AppComponent implements OnInit {
  
    constructor(
        @Inject(APP_CONFIG) config: AppConfig,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private translate: TranslateService,
        private userService: UserService,
        public s: ConfigurationService) { 

            // translate.addLangs(["en", "fr"]);
            translate.setDefaultLang('en');
            translate.use(config.Lang ? config.Lang : 'en');
        }

    public ngOnInit() {
        this.route.paramMap
            .switchMap((params: ParamMap) => {
                var param = params.get('id');
                if (param) {
                    if (this.authService.isAuthenticated()) {
                        return Observable.of(true);
                    }
                    var codeLength = parseInt(param.charAt(0));
                    var customerId = param.slice(1, param.length - codeLength);
                    var code = param.slice(-codeLength);
                    return this.authService.login(null, null, null, code, customerId);
                }
                return Observable.of(null);
            })
            .subscribe(success => {
                this.userService.launchTimer();
                if (success) {
                    this.router.navigate(['/']);
                }
            },
            err => this.router.navigate(['/']));
    }

    public iOSNotStandalone () { 
        // return true;
        if ((window.navigator.userAgent.indexOf('iPhone') != -1 ||
            window.navigator.userAgent.indexOf('iPad') != -1)
            && !(<any>window.navigator).standalone) {
           return true; 
        }
        return false;
    }
}