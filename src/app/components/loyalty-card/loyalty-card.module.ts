import { SharedModule } from '../../core/shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoyaltyCardComponent } from './loyalty-card.component';
import { routes } from './loyalty-card.routes';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        LoyaltyCardComponent
    ]
})
export class LoyaltyCardModule { }