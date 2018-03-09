import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IncrementPipe } from './increment';
import { SafeHtmlPipe } from './safe-html';

const PIPES = [
    IncrementPipe,
    SafeHtmlPipe
];

@NgModule({
  imports: [CommonModule],
  exports: PIPES,
  declarations: PIPES
})
export class PipesModule { }
