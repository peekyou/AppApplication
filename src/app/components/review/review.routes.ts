import { Routes } from '@angular/router';

import { ReviewComponent } from './review.component';
import { AuthGuard } from '../../guards/auth.guard';

export const routes: Routes = [
    {
        path: 'review', children: [
            { path: '', component: ReviewComponent }
        ]
    },
];