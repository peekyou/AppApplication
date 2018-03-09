import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { normalizeNumber } from '../../helpers/utils';
import { ConfigurationService } from '../../core/services/configuration.service';
import { EmailDialogComponent } from './email/email.component';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    dataSource;
    private mask = '__:__ - __:__';
    
    constructor(public s: ConfigurationService, public dialog: MatDialog) {
    }

    openEmailDialog() {
        let dialogRef = this.dialog.open(EmailDialogComponent, {
            width: '250px'
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