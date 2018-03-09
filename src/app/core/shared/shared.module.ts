import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QRCodeModule } from 'angular2-qrcode';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AppMaterialModules } from './material.module';
import { SpinnerComponent } from './components/spinner';
import { QrCodeComponent } from './components/qr-code';
import { TopToolbarComponent } from './components/top-toolbar';
import { BottomToolbarComponent } from './components/bottom-toolbar';
import { PipesModule } from '../../pipes';

const IMPORTS = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule,
    QRCodeModule,
    SwiperModule,
    AppMaterialModules,
    PipesModule
];

const DECLARATIONS = [
    SpinnerComponent,
    QrCodeComponent,
    TopToolbarComponent,
    BottomToolbarComponent
];

@NgModule({
  imports: [IMPORTS],
  exports: [IMPORTS, ...DECLARATIONS],
  declarations: [DECLARATIONS]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
      return {
          ngModule: SharedModule,
          providers: []
      };
  }
}