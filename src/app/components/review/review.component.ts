import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ConfigurationService } from '../../core/services/configuration.service';
import { ReviewService } from './review.service';
import { Review } from './review';
import { AuthService } from '../+auth/auth.service';

@Component({
    selector: 'review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
    loader: Subscription;
    loading = false;
    reviews: Review[] = [];
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
        private service: ReviewService,
        private fb: FormBuilder,
        private router: Router,
        public user: AuthService,
        public s: ConfigurationService) {
        this.getReviews();
    }

    getReviews() {
        this.loader = this.service
            .getAll(null, null)
            .subscribe(
                reviews => { this.reviews = reviews.data },
                err => { console.log(err); }
            );
    }

    onSubmit() {
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
                    this.getReviews();
                    this.loading = false;
                },
                err => {
                    console.log(err);
                    this.loading = false;
                }
            );
    }
}
