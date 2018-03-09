import { Routes } from '@angular/router';

import { ConceptComponent } from './concept.component';

export const routes: Routes = [
    {
        path: 'concept', children: [
            { path: '', component: ConceptComponent }
        ]
    },
];