import { Routes } from '@angular/router';

import { SocialMediaComponent } from './social-media.component';
import { AuthGuard } from '../../guards/auth.guard';

export const routes: Routes = [
    {
        path: 'social', children: [
            { path: '', component: SocialMediaComponent }
        ]
    },
];