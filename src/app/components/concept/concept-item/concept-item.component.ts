import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { toggleAnimation } from '../../../animations';
import { Page } from '../../../core/models/page';

@Component({
    selector: 'app-concept-item',
    templateUrl: './concept-item.component.html',
    styleUrls: ['./concept-item.component.scss'],
    animations: [toggleAnimation]
})
export class ConceptItemComponent implements OnInit {
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