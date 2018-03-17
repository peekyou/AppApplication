import { Component, Inject } from '@angular/core';
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
export class SocialShareDialogComponent {
    
    facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=';
    twitterUrl = 'https://twitter.com/intent/tweet/?url=';
    googlePlusUrl = 'https://plus.google.com/share?url=';

    constructor(
        public s: ConfigurationService,
        public dialogRef: MatDialogRef<SocialShareDialogComponent>) { 
            this.s.config.url = 'http://godiva.app-wards.com';
            this.facebookUrl += this.s.config.url
            this.twitterUrl += this.s.config.url
            this.googlePlusUrl += this.s.config.url
        }
}