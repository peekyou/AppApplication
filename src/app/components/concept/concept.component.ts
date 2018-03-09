import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { ConfigurationService } from '../../core/services/configuration.service';
//import { MerchantConfiguration } from '../../core/models/merchantConfiguration';

@Component({
    templateUrl: './concept.component.html',
    styleUrls: ['./concept.component.scss'],
})
export class ConceptComponent {
    //config: MerchantConfiguration;
    loader: Subscription;
    lat: number = 51.678418;
    lng: number = 7.809007;

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