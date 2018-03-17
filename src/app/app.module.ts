import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarRatingModule } from 'angular-star-rating';
import { AgmCoreModule } from '@agm/core';

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
import { CallModule } from './components/call';
import { ContactModule } from './components/contact';
import { ReviewModule } from './components/review';
import { SocialMediaModule } from './components/social-media';
import { AccountModule } from './components/account';
import { NoContentComponent } from './components/no-content';

// Modals
import { EmailDialogComponent } from './components/contact/email/email.component';
import { SocialShareDialogComponent } from './core/shared/components/social-share/social-share.component';
import { NewReviewDialogComponent } from './components/review/new-review/new-review.component';

import '../styles/styles.scss';

// Application wide providers
const PROVIDERS = [
  ...APP_PROVIDERS
];

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
        BrowserModule,
        BrowserAnimationsModule,
        AuthModule,
        LoyaltyCardModule,
        ShopModule,
        PromotionModule,
        CallModule,
        ContactModule,
        ReviewModule,
        SocialMediaModule,
        AccountModule,
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyBQkgT4ArGsST27EW2BESTmZfb9ujngarA' }),
        RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
    ],
    entryComponents: [ 
        EmailDialogComponent,
        SocialShareDialogComponent,
        NewReviewDialogComponent
    ],
    providers: [
        environment.ENV_PROVIDERS,
        PROVIDERS
    ]
})
export class AppModule { }