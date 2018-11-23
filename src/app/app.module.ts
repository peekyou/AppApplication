import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StarRatingModule } from 'angular-star-rating';
import { AgmCoreModule } from '@agm/core';
import { DeviceDetectorModule } from 'ngx-device-detector';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';

import { SharedModule } from './core/shared/shared.module';
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { APP_PROVIDERS } from './app.providers';
import { AuthModule } from './components/+auth/auth.module';
import { LoyaltyCardModule } from './components/loyalty-card';
import { ShopModule } from './components/shop';
import { PromotionModule } from './components/promotion';
import { ContactModule } from './components/contact';
import { ReviewModule } from './components/review';
import { SocialMediaModule } from './components/social-media';
import { AccountModule } from './components/account';
import { RegistrationModule } from './components/registration';
import { NoContentComponent } from './components/no-content';

// Modals
import { EmailDialogComponent } from './components/contact/email/email.component';
import { SocialShareDialogComponent } from './core/shared/components/social-share/social-share.component';
import { NewReviewDialogComponent } from './components/review/new-review/new-review.component';
import { UnregisteredCustomerDialogComponent } from './components/+auth/unregistered-customer/unregistered-customer.component';

import '../styles/styles.scss';

// Application wide providers
const PROVIDERS = [
  ...APP_PROVIDERS
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "/assets/lang/", "-v10.json");
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NoContentComponent
    ],
    /**
     * Import Angular's modules.
     */
    imports: [
        SharedModule.forRoot(),
        StarRatingModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        BrowserModule,
        BrowserAnimationsModule,
        AuthModule,
        LoyaltyCardModule,
        ShopModule,
        PromotionModule,
        ContactModule,
        ReviewModule,
        SocialMediaModule,
        AccountModule,
        RegistrationModule,
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyD2tHPV7C3ehD5O6CFPryF94GJfwj9ARoc' }),
        DeviceDetectorModule.forRoot(),
        RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
    ],
    entryComponents: [ 
        EmailDialogComponent,
        SocialShareDialogComponent,
        NewReviewDialogComponent,
        UnregisteredCustomerDialogComponent
    ],
    providers: [
        environment.ENV_PROVIDERS,
        PROVIDERS
    ]
})
export class AppModule { }