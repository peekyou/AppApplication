import { Routes } from '@angular/router';

import { RegistrationComponent } from './registration.component';
import { AuthGuard } from '../../guards/auth.guard';

export const routes: Routes = [
    {
        path: 'registration', children: [
            { path: '', component: RegistrationComponent }
        ]
    },
];