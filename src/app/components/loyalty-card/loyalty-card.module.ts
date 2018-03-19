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
            "backgroundOpacity": 1,
            "backgroundStroke": "#000000",
            "backgroundPadding": 14,
            "radius": 87,
            "space": -9,
            "maxPercent": 100,
            "unitsColor": "#ffffff",
            "outerStrokeWidth": 9,
            "outerStrokeColor": "#ffffff",
            "innerStrokeColor": "#ffdf72",
            "innerStrokeWidth": 9,
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