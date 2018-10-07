import { Routes } from '@angular/router';

import { ContactComponent } from './contact.component';
import { AuthGuard } from '../../guards/auth.guard';

export const routes: Routes = [
    {
        path: 'contact', children: [
            { path: '', component: ContactComponent }
        ]
    },
];