import { Component, Input, Inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import { AuthService } from '../../../../components/+auth/auth.service';
import { AppSettings } from '../../../../app.settings';
import { ConfigurationService } from '../../../../core/services/configuration.service';
import { LoyaltyCardCacheService } from '../../../../components/loyalty-card/loyalty-card-cache.service';
import { APP_CONFIG, AppConfig } from '../../../../app.config';
// import { QRCode } from './qrcode';

@Component({
    selector: 'app-qr-code',
    templateUrl: './qr-code.component.html',
    styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements AfterViewInit {
    url: string;

    @Input() id: string;
    @ViewChild('script') script: ElementRef;
    
    constructor(
        @Inject(APP_CONFIG) private appConfig: AppConfig, 
        private authService: AuthService,
        private loyaltyCardCacheService: LoyaltyCardCacheService,
        public conf: ConfigurationService) {

        if (this.authService.isAuthenticated()) {
            if (conf.config) {
                this.url = authService.getUserId();
                this.loyaltyCardCacheService.cache.customerUrl = this.url;
            }
            else {
                var cache = loyaltyCardCacheService.getCache();
                if (conf.config && cache.customerUrl) {
                    this.url = cache.customerUrl;
                }
            }
            (<any>document).customerUrl = this.url;
        }
    }

    ngAfterViewInit() {
        this.injectScript();
    }

    injectScript() {
        var element = this.script.nativeElement;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = 'qrCode("' + this.id + '", document.customerUrl)';
        var parent = element.parentElement;
        parent.replaceChild(script, element);
    }
}
