import { Component, OnInit, Input } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfigurationService } from '../../../services/configuration.service';

@Component({
    selector: 'app-bottom-toolbar',
    templateUrl: './bottom-toolbar.component.html',
    styleUrls: ['./bottom-toolbar.component.scss'],
})
export class BottomToolbarComponent implements OnInit {
    showSubMenu: boolean = false;

    constructor(private dialog: MatDialog, public s: ConfigurationService, public url: LocationStrategy) { 
    }

    public ngOnInit() {
    }
}
