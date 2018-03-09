import { SharedModule } from '../../core/shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PromotionComponent } from './promotion.component';
import { routes } from './promotion.routes';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        PromotionComponent
    ]
})
export class PromotionModule { }