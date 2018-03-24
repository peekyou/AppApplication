import { Component } from '@angular/core';

import { AuthService } from '../../../../components/+auth/auth.service';
import { AppSettings } from '../../../../app.settings';
import { ConfigurationService } from '../../../../core/services/configuration.service';

@Component({
    selector: 'app-qr-code',
    templateUrl: './qr-code.component.html',
    styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent {
    url: string;

    constructor(private authService: AuthService, public conf: ConfigurationService) {
        if (this.authService.isAuthenticated()) {
            this.url = conf.config.appWardsApplicationUrl + "/merchant/customers/" + authService.getUserId();
        }
    }
}
