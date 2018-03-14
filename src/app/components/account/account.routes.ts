import { Routes } from '@angular/router';

import { AccountComponent } from './account.component';
import { AuthGuard } from '../../guards/auth.guard';

export const routes: Routes = [
    {
        path: 'account', canActivate: [AuthGuard], children: [
            { path: '', component: AccountComponent }
        ]
    }
];