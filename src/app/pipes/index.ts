import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LocaleDatePipe } from './locale-date';
import { IncrementPipe } from './increment';
import { SafeHtmlPipe } from './safe-html';
import { SafeStylePipe } from './safe-style';


const PIPES = [
    LocaleDatePipe,
    IncrementPipe,
    SafeHtmlPipe,
    SafeStylePipe
];

@NgModule({
  imports: [CommonModule],
  exports: PIPES,
  declarations: PIPES
})
export class PipesModule { }
