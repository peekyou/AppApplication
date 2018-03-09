import { SharedModule } from '../../core/shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { LoyaltyCardComponent } from './loyalty-card.component';
import { routes } from './loyalty-card.routes';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        NgCircleProgressModule.forRoot({
            "backgroundColor": "#FDB900",
            "backgroundOpacity": 1,
            "backgroundStroke": "#000000",
            "backgroundPadding": 14,
            "radius": 70,
            "space": -7,
            "maxPercent": 100,
            "unitsColor": "#ffffff",
            "outerStrokeWidth": 7,
            "outerStrokeColor": "#ffffff",
            "innerStrokeColor": "#ffdf72",
            "innerStrokeWidth": 7,
            "titleColor": "#ffffff",
            "titleFontSize": "45",
            "subtitleColor": "#ffffff",
            "subtitleFontSize": "17",
            "animationDuration": 500,
            "showUnits": false
        }),
    ],
    declarations: [
        LoyaltyCardComponent
    ]
})
export class LoyaltyCardModule { }