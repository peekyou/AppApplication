import { Routes } from '@angular/router';

import { LoyaltyCardComponent } from './loyalty-card.component';
import { AuthGuard } from '../../guards/auth.guard';

export const routes: Routes = [
    {
        path: 'loyaltycard', canActivate: [AuthGuard], children: [
            { path: '', component: LoyaltyCardComponent }
        ]
    },
];