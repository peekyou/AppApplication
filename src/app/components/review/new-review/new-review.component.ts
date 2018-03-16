import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { normalizeNumber } from '../../helpers/utils';
import { ConfigurationService } from '../../../core/services/configuration.service';
import { AuthService } from '../../+auth/auth.service';
import { ReviewService } from '../review.service';
import { Review } from '../review';

@Component({
    selector: 'app-new-review-dialog',
    templateUrl: './new-review.component.html',
    styleUrls: ['./new-review.component.scss']
})
export class NewReviewDialogComponent {
    loading = false;
    success = null;
    
    comment = this.fb.control(null, Validators.required);
    rating1 = this.fb.control('', Validators.required);
    rating2 = this.fb.control('', Validators.required);
    rating3 = this.fb.control('', Validators.required);

    form = this.fb.group({
        comment: this.comment,
        rating1: this.rating1,
        rating2: this.rating2,
        rating3: this.rating3
    });

    constructor(
        private user: AuthService,
        private service: ReviewService,
        private fb: FormBuilder,
        public s: ConfigurationService,
        public dialogRef: MatDialogRef<NewReviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onSubmit() {
        this.loading = true;
        let review: Review = {
            comment: this.comment.value,
            createdDate: new Date(),
            createdBy: this.user.getUserId(),
            rating1: this.rating1.value,
            rating2: this.rating2.value,
            rating3: this.rating3.value
        };
        this.loading = true;
        this.service
            .create(review)
            .subscribe(
                id => {
                    this.success = id != null;
                    this.loading = false;
                    this.close();
                },
                err => {
                    console.log(err);
                    this.loading = false;
                    this.success = false;
                }
            );
    }

    close(): void {
        this.dialogRef.close(this.success);
    }
}