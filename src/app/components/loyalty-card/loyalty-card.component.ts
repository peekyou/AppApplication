import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { slideInAnimation } from '../../animations';
import { UserService } from '../../core/services/user.service';
import { ConfigurationService } from '../../core/services/configuration.service';
import { User } from '../../core/models/user';
import { LoyaltyProgramBirthday, LoyaltyProgramBuyGetFree, LoyaltyProgramPoints } from '../../core/models/loyaltyPrograms';
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
    show = 3;
    rewards;

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

    getRewards() {
        if (this.rewards && this.rewards.length > 0) {
            return this.rewards;
        }

        if (this.s.config && this.s.config.loyaltyPrograms) {
            this.s.config.loyaltyPrograms.forEach(x => {
                if (!this.rewards) {
                    this.rewards = [];
                }

                if (x.$type.toLowerCase().indexOf('points') > -1) {
                    (<LoyaltyProgramPoints>x).rewards.forEach(y => {
                        this.rewards.push({
                            threshold: y.pointsThreshold, 
                            reward: y.reward ? y.reward : y.amount + ' ' + this.s.config.discountCurrency
                        });
                    });
                }
    
                if (x.$type.toLowerCase().indexOf('buygetfree') > -1) {
                    this.rewards.push({
                        threshold: (<LoyaltyProgramBuyGetFree>x).threshold,
                        reward: (<LoyaltyProgramBuyGetFree>x).productName
                    });
                }

                if (x.$type.toLowerCase().indexOf('birthday') > -1) {
                    this.rewards.push({
                        gift: (<LoyaltyProgramBirthday>x).gift
                    });
                }
            });
        }
    }
}
