import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { ConfigurationService } from '../../core/services/configuration.service';
//import { MerchantConfiguration } from '../../core/models/merchantConfiguration';

@Component({
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
    loader: Subscription;
    lat: number = 25.080526700000000;
    lng: number = 55.144296400000030;
    isLocation: boolean = false;

    constructor(public s: ConfigurationService) { }
}