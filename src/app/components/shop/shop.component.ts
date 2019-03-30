import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ConfigurationService } from '../../core/services/configuration.service';
import { Merchant } from '../../core/models/merchantConfiguration';

@Component({
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit, OnDestroy {
    configSubscription: Subscription
    lat: number = 25.080526700000000;
    lng: number = 55.144296400000030;
    isLocation: boolean = false;

    _selectedMerchant: Merchant;
    set selectedMerchant(value: Merchant) {
        this._selectedMerchant = value;
    }

    get selectedMerchant(): Merchant {
        if (!this._selectedMerchant && this.s.config && this.s.config.merchants && this.s.config.merchants.length > 0) {
            this._selectedMerchant = this.s.config.merchants[0];
        }
        return this._selectedMerchant;
    }

    constructor(public s: ConfigurationService) {
    }

    ngOnInit() {
       this.configSubscription = this.s.config$.subscribe(config => {
            if (this._selectedMerchant) {
                this._selectedMerchant = config.merchants.filter(x => x.id == this._selectedMerchant.id)[0];
            }
       });
    }

    ngOnDestroy() {
        this.configSubscription.unsubscribe();
    }
}