import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { normalizeNumber } from '../../helpers/utils';
import { ConfigurationService } from '../../../services/configuration.service';
import { AuthService } from '../../+auth/auth.service';
import { ReviewService } from '../review.service';
import { Review } from '../review';

@Component({
    templateUrl: './social-share.component.html',
    styleUrls: ['./social-share.component.scss']
})
export class SocialShareDialogComponent implements OnInit {
    
    facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=';
    twitterUrl = 'https://twitter.com/intent/tweet/?url=';
    googlePlusUrl = 'https://plus.google.com/share?url=';

    constructor(
        public s: ConfigurationService,
        public dialogRef: MatDialogRef<SocialShareDialogComponent>) {
            this.facebookUrl += this.s.config.appWardsApplicationUrl
            this.twitterUrl += this.s.config.appWardsApplicationUrl
            this.googlePlusUrl += this.s.config.appWardsApplicationUrl
        }

    ngOnInit() {
        if (this.s.config && this.s.config.design) {
            (<any>this.dialogRef._containerInstance)._elementRef.nativeElement.style.backgroundColor = this.s.config.design.buttonsColor;            
        }
    }
}