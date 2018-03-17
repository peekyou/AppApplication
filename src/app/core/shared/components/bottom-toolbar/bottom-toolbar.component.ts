import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SocialShareDialogComponent } from '../social-share/social-share.component';

@Component({
    selector: 'app-bottom-toolbar',
    templateUrl: './bottom-toolbar.component.html',
    styleUrls: ['./bottom-toolbar.component.scss'],
})
export class BottomToolbarComponent implements OnInit {

    constructor(private dialog: MatDialog) {}

    public ngOnInit() {
    }

    openSocialShareDialog() {
        this.dialog.open(SocialShareDialogComponent, {
            width: "250px",
            panelClass: 'social-share-dialog'
        });
    }
}
