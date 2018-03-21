import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfigurationService } from '../../core/services/configuration.service';
import { AuthService } from '../+auth/auth.service';
import { NewReviewDialogComponent } from './new-review/new-review.component';
import { ReviewService } from './review.service';
import { Review } from './review';
import { PagingResponse } from '../../core/models/paging';

@Component({
    selector: 'review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
    loader: Subscription;
    loading = false;
    reviews: PagingResponse<Review>;
    averageAllRatings: number = 0;
    averageRating1: number = 0;
    averageRating2: number = 0;
    averageRating3: number = 0;
        
    constructor(
        private service: ReviewService,
        private router: Router,
        private dialog: MatDialog,
        public user: AuthService,
        public s: ConfigurationService) {
        this.getReviews();
    }

    getReviews() {
        this. loading = true;
        this.loader = this.service
            .getAll(null, null)
            .subscribe(
                reviews => { 
                    this.reviews = reviews;
                    this.calculateAverage();
                    this.loading = false;
                },
                err => { console.log(err); }
            );
    }

    openNewReviewDialog() {
        let dialogRef = this.dialog.open(NewReviewDialogComponent, {
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.getReviews();
            }
        });
    }
    
    private calculateAverage() {
        this.averageRating1 = this.averageRating2 = this.averageRating3 = 0;
        if (this.reviews.paging.itemsCount > 0) {
            this.reviews.data.forEach(r => {
                this.averageRating1 += r.rating1;
                this.averageRating2 += r.rating2;
                this.averageRating3 += r.rating3;
            });
            this.averageRating1 /= this.reviews.paging.totalCount;
            this.averageRating2 /= this.reviews.paging.totalCount;
            this.averageRating3 /= this.reviews.paging.totalCount;
            this.averageAllRatings = (this.averageRating1 + this.averageRating2 + this.averageRating3) / 3;
        }
    }
}
