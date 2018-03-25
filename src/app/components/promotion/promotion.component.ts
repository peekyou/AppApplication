import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ConfigurationService } from '../../core/services/configuration.service';
import { PromotionService } from './promotion.service';
import { Promotion } from './promotion';

@Component({
    selector: 'promotion',
    templateUrl: './promotion.component.html',
    styleUrls: ['./promotion.component.scss'],
})
export class PromotionComponent {
    loader: Subscription;
    promotions: Promotion[];
    
    constructor(public s: ConfigurationService, service: PromotionService) {
        this.loader = service
            .getAll()
            .subscribe(
                promotions => this.promotions = promotions,
                err => console.log(err)
            );
    }

    getColor(index:number, even: boolean = false): string {
        var r = even === true ? 1 : 0;
        return index % 2 == r ? this.s.config.design.titlesColor : '#fff';
    }

    getBorderColor(reverse: boolean = false): string {
        return reverse ? 
        this.s.config.design.titlesColor + ' white transparent transparent'
        :
        'white ' + this.s.config.design.titlesColor + ' transparent transparent'
    }
}
