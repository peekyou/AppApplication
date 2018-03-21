import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfigurationService } from '../../../services/configuration.service';

@Component({
    selector: 'app-bottom-toolbar',
    templateUrl: './bottom-toolbar.component.html',
    styleUrls: ['./bottom-toolbar.component.scss'],
})
export class BottomToolbarComponent implements OnInit {
    showSubMenu: boolean = false;

    constructor(private dialog: MatDialog, public s: ConfigurationService, public router: Router) { }

    public ngOnInit() {
    }
}
