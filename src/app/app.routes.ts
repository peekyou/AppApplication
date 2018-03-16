import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NoContentComponent } from './components/no-content';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/contact', pathMatch: 'full' },
    { path: 'reg/:id', component: AppComponent },
    { path: 'loyaltycard', loadChildren: './components/loyalty-card#LoyaltyCardModule' },
    { path: 'shop', loadChildren: './components/shop#ShopModule' },
    { path: 'promotion', loadChildren: './components/promotion#PromotionModule' },
    { path: 'call', loadChildren: './components/call#CallModule' },
    { path: 'contact', loadChildren: './components/contact#ContactModule' },
    { path: 'social', loadChildren: './components/social-media#SocialMediaModule' },
    { path: 'review', loadChildren: './components/review#ReviewModule' },
    { path: 'account', loadChildren: './components/account#AccountModule' },
    { path: '**', component: NoContentComponent },
];