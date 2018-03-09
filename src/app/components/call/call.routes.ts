import { Routes } from '@angular/router';

import { CallComponent } from './call.component';
import { AuthGuard } from '../../guards/auth.guard';

export const routes: Routes = [
    {
        path: 'call', canActivate: [AuthGuard], children: [
            { path: '', component: CallComponent }
        ]
    },
];