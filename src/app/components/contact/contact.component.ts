import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { normalizeNumber } from '../../helpers/utils';
import { ConfigurationService } from '../../core/services/configuration.service';
import { EmailDialogComponent } from './email/email.component';
import { Merchant } from '../../core/models/merchantConfiguration';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
    configSubscription: Subscription
    dataSource;
    private mask = '__:__ - __:__';
    
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
    
    constructor(public s: ConfigurationService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.configSubscription = this.s.config$.subscribe(config => {
             if (this._selectedMerchant) {
                 this._selectedMerchant = config.merchants.filter(x => x.id == this._selectedMerchant.id)[0];
             }
        });
     }
 
     ngOnDestroy() {
         // prevent memory leak when component is destroyed
         this.configSubscription.unsubscribe();
     }

    openEmailDialog() {
        let dialogRef = this.dialog.open(EmailDialogComponent, {
            //width: '250px'
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    applyMask(str: string): string {
        if (!str) {
            return 'Closed';
        }

        var newValue = this.mask;
        for (var n = 0; n < str.length && n < 8; n++) {
            newValue = newValue.replace('_', str.charAt(n));
        }
        return newValue;
    }
}