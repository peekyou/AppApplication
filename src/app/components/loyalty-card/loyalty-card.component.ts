import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { slideInAnimation } from '../../animations';
import { UserService } from '../../core/services/user.service';
import { ConfigurationService } from '../../core/services/configuration.service';
import { User } from '../../core/models/user';
import { styleBackgound } from '../../core/helpers/utils';
import { AuthService } from '../+auth/auth.service';

@Component({
    selector: 'loyalty-card',
    templateUrl: './loyalty-card.component.html',
    styleUrls: ['./loyalty-card.component.scss'],
    // animations: [slideInAnimation],
    // host: { '[@slideInAnimation]': '' }
})
export class LoyaltyCardComponent {
    Math: any;
    styleBackgound: any;

    constructor(
        public service: UserService,
        public s: ConfigurationService,
        router: Router,
        auth: AuthService) {

        // if (!auth.isAuthenticated()) {
        //     router.navigate(['/login'], { queryParamsHandling: "preserve" });
        // }

        this.Math = Math;
        this.styleBackgound = styleBackgound;
    }
}
