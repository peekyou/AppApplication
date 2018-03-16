import { Routes } from '@angular/router';

import { ShopComponent } from './shop.component';

export const routes: Routes = [
    {
        path: 'shop', children: [
            { path: '', component: ShopComponent }
        ]
    },
];