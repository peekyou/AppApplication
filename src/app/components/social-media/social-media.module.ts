import { SharedModule } from '../../core/shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SocialMediaComponent } from './social-media.component';
import { routes } from './social-media.routes';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SocialMediaComponent
    ]
})
export class SocialMediaModule { }