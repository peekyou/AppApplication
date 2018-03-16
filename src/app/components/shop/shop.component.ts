import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { ConfigurationService } from '../../core/services/configuration.service';
//import { MerchantConfiguration } from '../../core/models/merchantConfiguration';

@Component({
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
    //config: MerchantConfiguration;
    loader: Subscription;
    lat: number = 51.678418;
    lng: number = 7.809007;
    isLocation: boolean = false;

    constructor(public s: ConfigurationService) {
        //service
        //    .getConfiguration()
        //    .subscribe(configuration => {
        //        this.config = configuration;
        //    },
        //    err => { console.log(err); }
        //    );
    }
}