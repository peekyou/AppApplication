import { Component, AfterViewInit, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfigurationService } from '../../../services/configuration.service';
import { SocialShareDialogComponent } from '../social-share/social-share.component';

@Component({
    selector: 'app-submenu',
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.scss']
})
export class SubMenuComponent implements AfterViewInit {
    private parentNode: any;
    @Output() private closeEvent: EventEmitter<void> = new EventEmitter();

    constructor(private _element: ElementRef, private dialog: MatDialog, public s: ConfigurationService) { 
    }

    ngAfterViewInit() {
        this.parentNode = this._element.nativeElement.parentNode;
    }

    @HostListener('document:click', ['$event.path'])
    onClickOutside($event: Array<any>) {
       const elementRefInPath = $event.find(node => node === this.parentNode);
       if (!elementRefInPath) {
           this.close();
       }
   }

   close() {
    this.closeEvent.emit();
   }

    openSocialShareDialog() {
        this.close();
        this.dialog.open(SocialShareDialogComponent, {
            width: "250px",
            autoFocus: false,
            panelClass: 'social-share-dialog'
        });
    }
}