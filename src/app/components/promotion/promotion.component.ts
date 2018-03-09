import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { PromotionService } from './promotion.service';
import { Promotion } from './promotion';
import { PagingResponse } from '../../core/models/paging';

@Component({
    selector: 'promotion',
    templateUrl: './promotion.component.html',
    styleUrls: ['./promotion.component.scss'],
})
export class PromotionComponent {
    loader: Subscription;
    promotions: PagingResponse<Promotion>;
    
    constructor(service: PromotionService) {
        this.loader = service
            .getAll()
            .subscribe(
                promotions => this.promotions = promotions,
                err => console.log(err)
            );
    }
}
