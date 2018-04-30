import { Component, Inject, Input } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../../../../components/+auth/auth.service';
import { ConfigurationService } from '../../../services/configuration.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() title: string;
    @Input() fixedHeight: boolean = false;
    @Input() showBackButton: boolean = false;

    constructor(public s: ConfigurationService, public location: Location, private auth: AuthService) { 
    }

    back() {
        this.auth.setMobile(null);
        this.location.back();
    }
}