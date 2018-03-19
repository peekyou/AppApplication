import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfigurationService } from '../../../services/configuration.service';
import { SocialShareDialogComponent } from '../social-share/social-share.component';

@Component({
    selector: 'app-bottom-toolbar',
    templateUrl: './bottom-toolbar.component.html',
    styleUrls: ['./bottom-toolbar.component.scss'],
})
export class BottomToolbarComponent implements OnInit {

    constructor(private dialog: MatDialog, public s: ConfigurationService) {}

    public ngOnInit() {
    }

    openSocialShareDialog() {
        this.dialog.open(SocialShareDialogComponent, {
            width: "250px",
            autoFocus: false,
            panelClass: 'social-share-dialog'
        });
    }
}
