import { NgModule } from '@angular/core';

import { TimeStylingDirective } from './time-styling/time-styling.directive';
import { EnforcedInputsDirective } from './enforced-inputs/enforced-inputs.directive';

const DECLARE_AND_EXPORT = [ TimeStylingDirective, EnforcedInputsDirective ];

@NgModule({
  declarations: DECLARE_AND_EXPORT,
  exports: DECLARE_AND_EXPORT,
})
export class DirectivesModule { }
