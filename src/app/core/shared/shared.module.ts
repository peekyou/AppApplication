import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AppMaterialModules } from './material.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';
import { BottomToolbarComponent } from './components/bottom-toolbar/bottom-toolbar.component';
import { HeaderComponent } from './components/header/header.component';
import { SubMenuComponent } from './components/submenu/submenu.component';
import { LogoComponent } from './components/logo/logo.component';
import { SocialShareDialogComponent } from './components/social-share/social-share.component';
import { PipesModule } from '../../pipes'
import { DirectivesModule } from '../../directives';

const IMPORTS = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule,
    TranslateModule,    
    SwiperModule,
    AppMaterialModules,
    PipesModule,
    DirectivesModule
];

const DECLARATIONS = [
    SpinnerComponent,
    QrCodeComponent,
    TopToolbarComponent,
    BottomToolbarComponent,
    HeaderComponent,
    SubMenuComponent,
    LogoComponent,
    SocialShareDialogComponent
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