import { SharedModule } from '../../core/shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConceptComponent } from './concept.component';
import { ConceptItemComponent } from './concept-item/concept-item.component';
import { routes } from './concept.routes';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ConceptComponent,
        ConceptItemComponent
    ]
})
export class ConceptModule { }