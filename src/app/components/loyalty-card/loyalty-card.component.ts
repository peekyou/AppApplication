import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { slideInAnimation } from '../../animations';
import { UserService } from '../../core/services/user.service';
import { ConfigurationService } from '../../core/services/configuration.service';
import { User } from '../../core/models/user';
import { LoyaltyProgramBirthday, LoyaltyProgramBuyGetFree, LoyaltyProgramPoints } from '../../core/models/loyaltyPrograms';
import { styleBackgound } from '../../core/helpers/utils';
import { AuthService } from '../+auth/auth.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
    selector: 'loyalty-card',
    templateUrl: './loyalty-card.component.html',
    styleUrls: ['./loyalty-card.component.scss'],
    // animations: [slideInAnimation],
    // host: { '[@slideInAnimation]': '' }
})
export class LoyaltyCardComponent implements OnInit {
    Math: any;
    styleBackgound: any;
    show = 3;
    rewards;
    orLabel: string;
    pointsLabel: string;

    constructor(
        public service: UserService,
        public s: ConfigurationService,
        private translation: TranslationService,
        router: Router,
        auth: AuthService) {

        // if (!auth.isAuthenticated()) {
        //     router.navigate(['/login'], { queryParamsHandling: "preserve" });
        // }

        this.Math = Math;
        this.styleBackgound = styleBackgound;
    }

    ngOnInit() {
        this.translation.getMultiple([
            'COMMON.OR',
            'LOYALTY.POINTS'], x => {
                this.orLabel = x['COMMON.OR'];
                this.pointsLabel = x['LOYALTY.POINTS'];
            });
    }

    hasMultipleRewards() {
        var hasNewLoyalty = this.s.config.merchants && this.s.config.merchants.length > 0 && 
            this.s.config.merchants[0].loyaltyPrograms && 
            this.s.config.merchants[0].loyaltyPrograms.length > 0
     
        if (hasNewLoyalty) {
            if (this.s.config.merchants[0].loyaltyPrograms.length > 1) {
                return true;
            }
            else {
                var program = this.s.config.merchants[0].loyaltyPrograms[0];
                if (program.$type.toLowerCase().indexOf('points') > -1) {
                    return (<LoyaltyProgramPoints>program).rewards.length > 1;
                }
                return true;
            }

        }
        return false;
    }

    getRewards() {
        if (this.rewards && this.rewards.length > 0) {
            return this.rewards;
        }

        if (this.s.config && this.s.config.merchants && this.s.config.merchants.length > 0 && this.s.config.merchants[0].loyaltyPrograms) {
            this.s.config.merchants[0].loyaltyPrograms.forEach(x => {
                if (!this.rewards) {
                    this.rewards = [];
                }

                if (x.$type.toLowerCase().indexOf('points') > -1) {
                    (<LoyaltyProgramPoints>x).rewards.forEach(y => {
                        var rewardLabel = '';
                        if (y.reward && y.amount) {
                            rewardLabel = y.reward + ' ' + this.orLabel + ' ' + y.amount + ' ' + this.s.config.merchants[0].discountCurrency;
                        }
                        else if (y.reward) {
                            rewardLabel = y.reward;
                        }
                        else if (y.pointsReward) {
                            rewardLabel = y.pointsReward + ' ' + this.pointsLabel;
                        }
                        else {
                            rewardLabel = y.amount + ' ' + this.s.config.merchants[0].discountCurrency;
                        }

                        this.rewards.push({
                            threshold: y.pointsThreshold, 
                            reward: rewardLabel
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
