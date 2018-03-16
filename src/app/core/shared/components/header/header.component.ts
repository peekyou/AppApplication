import { Component, Inject, Input } from '@angular/core';

import { APP_CONFIG, AppConfig } from '../../../../app.config';
// import { UserService } from '../user/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() title: string;
    @Input() fixedHeight: boolean = false;

    constructor(
        @Inject(APP_CONFIG) config: AppConfig) { 
    }
}