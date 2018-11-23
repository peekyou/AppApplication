import { SharedModule } from '../../core/shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration.component';
import { routes } from './registration.routes';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        RegistrationComponent
    ]
})
export class RegistrationModule { }