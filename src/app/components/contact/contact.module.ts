import { SharedModule } from '../../core/shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import { EmailDialogComponent } from './email/email.component';
import { routes } from './contact.routes';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ContactComponent,
        EmailDialogComponent
    ]
})
export class ContactModule { }