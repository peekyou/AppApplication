import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConfigurationService } from '../../core/services/configuration.service';
import { MerchantConfiguration } from '../../core/models/merchantConfiguration';

@Component({
    selector: 'call',
    templateUrl: './call.component.html',
    styleUrls: ['./call.component.scss'],
})
export class CallComponent {
    config: MerchantConfiguration;
    
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
