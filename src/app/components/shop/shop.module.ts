import { SharedModule } from '../../core/shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { ShopComponent } from './shop.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { routes } from './shop.routes';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        AgmCoreModule
    ],
    declarations: [
        ShopComponent,
        ShopPageComponent
    ]
})
export class ShopModule { }