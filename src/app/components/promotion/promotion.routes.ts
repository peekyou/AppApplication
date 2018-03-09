import { Routes } from '@angular/router';

import { PromotionComponent } from './promotion.component';
import { AuthGuard } from '../../guards/auth.guard';

export const routes: Routes = [
    {
        path: 'promotion', canActivate: [AuthGuard], children: [
            { path: '', component: PromotionComponent }
        ]
    },
];