import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { toggleAnimation } from '../../../animations';
import { Page } from '../../../core/models/page';

@Component({
    selector: 'app-shop-page',
    templateUrl: './shop-page.component.html',
    styleUrls: ['./shop-page.component.scss'],
})
export class ShopPageComponent implements OnInit {
    @Input() page: Page;
    @Input() level: number;

    config: SwiperConfigInterface = {
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        spaceBetween: 30
    };
   
    ngOnInit() {
        if (!this.level) {
            this.level = 0;
        }
    }
}