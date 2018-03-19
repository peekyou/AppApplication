import { NgModule } from '@angular/core';

import { TimeStylingDirective } from './time-styling/time-styling.directive';

const DECLARE_AND_EXPORT = [ TimeStylingDirective ];

@NgModule({
  declarations: DECLARE_AND_EXPORT,
  exports: DECLARE_AND_EXPORT,
})
export class DirectivesModule { }
